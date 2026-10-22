---
title: Система выпадения предметов
author: Noya
steamId: '76561198046984233'
date: 17.05.2015
---
выпадения предметов

Здесь я расскажу о реализации гибкой системы выпадения предметов для любого игрового режима, которая в основном полезна для ролевых игр.

Есть несколько способов сделать это, например [Warchasers uses a pure datadriven system](https://github.com/MNoya/Warchasers/blob/master/scripts/npc/npc_abilities_custom.txt#L3687-L5667), который содержит более 2 тысяч строк способностей, каждая для своего типа дропа... да, вы не хотите этого делать :sweat_smile:

Лучший способ для этого — иметь текстовый файл, в котором можно указать, какие предметы могут выпасть из каждого юнита, сколько их, его шансы и т. д. Затем, когда юнит умирает, если в нем есть запись для выпадения предметов, обрабатывайте шансы и выпадения соответствующим образом, с несколькими вариантами, которые при необходимости можно расширить.

<StaticVideo path="/videos/PowerlessCourageousAsiantrumpetfish.mp4" />

## Шаг 1. Таблица ключевых значений
Я рекомендую иметь папку `kv` в сценариях для хранения этого и других подобных файлов таблиц. Файл может иметь любое расширение, но лучше всего использовать `.kv`.
```
"Drops"
{
    "creature_name1"
    {
        "item_name1" "10"
        "item_name2" "50"
        "item_name3" "100"
    }
}
```
Эта таблица заставит существо выбросить первый предмет с вероятностью 10%, второй с вероятностью 50%, а третий предмет будет выпадать каждый раз.

После сохранения и присвоения имени файлу эту таблицу необходимо загрузить в Lua, в идеале при инициализации игрового режима, используя `LoadKeyValues("relative/path/to/file")` следующим образом:
```
lua
GameRules.DropTable = LoadKeyValues("scripts/kv/item_drops.kv")
```
В этой первоначальной версии шанс выпадения каждого предмета не зависит от других. От одного и того же существа может быть 1 дроп, все или ни одного (если шансы всех меньше 100). Позже это поведение будет расширено, чтобы обеспечить некоторые классические варианты удаления.

## Шаг 2. Событие OnEntityKilled Lua

Просто послушайте `entity_killed` и вызовите специальную функцию RollDrops с убитым юнитом в качестве параметра.
```
lua
ListenToGameEvent('entity_killed', Dynamic_Wrap(GameMode, 'OnEntityKilled'), self)
```

```
lua
function GameMode:OnEntityKilled( keys )
    local killedUnit = EntIndexToHScript( keys.entindex_killed )
    if killedUnit:IsCreature() then
        RollDrops(killedUnit)
    end
end
```

## Шаг 3. Lua-скрипт RollDrops

Теперь, учитывая подтаблицу имени юнита, содержащуюся в основной таблице выпадения, если она существует, переберите элементы, перебирая каждое значение шанса.

Если бросок успешен, перейдите к созданию дескриптора предмета с именем и `LaunchLoot` с некоторыми причудливыми параметрами (также можно просто использовать `CreateItemOnPositionSync`, чтобы мгновенно отбросить предмет в позицию смерти)
```
lua
function RollDrops(unit)
    local DropInfo = GameRules.DropTable[unit:GetUnitName()]
    if DropInfo then
        for item_name,chance in pairs(DropInfo) do
            if RollPercentage(chance) then
                -- Create the item
                local item = CreateItem(item_name, nil, nil)
                local pos = unit:GetAbsOrigin()
                local drop = CreateItemOnPositionSync( pos, item )
                local pos_launch = pos+RandomVector(RandomFloat(150,200))
                item:LaunchLoot(false, 200, 0.75, pos_launch, nil)
            end
        end
    end
end
```

## Шаг 4. Расширение решения, позволяющее несколько раз выбрасывать один и тот же предмет.

Таблицы Lua KV работают так, что невозможно иметь более одного одного и того же индекса, поэтому, если бы мы добавили 2 записи «item_name1», обе с некоторым шансным значением, LoadKeyValues потерпит неудачу.

Чтобы обойти это, таблица должна использовать другой уровень и сделать так, чтобы каждый возможный предмет, выпадающий из юнита, был отдельной таблицей:
```
"Drops"
{
    "creature_name1"
    {
        "1"
        {
            "Item"     "item_name1"
            "Chance"   "10"
            "Multiple" "3"
        }
        "2"
        {
            "Item"     "item_name2"
            "Chance"   "50"
            "Multiple" "1"
        }
    }
}
```
Эта структура вместе со значением Multiple позволит выронить предмет из одного и того же существа более одного раза. _"Несколько" "1"_ будет составлять максимум 1 каплю.

Функцию RollDrops необходимо настроить, чтобы она читала подтаблицы и элемент/шанс немного по-другому:
```
lua
function RollDrops(unit)
    local DropInfo = GameRules.DropTable[unit:GetUnitName()]
    if DropInfo then
        for k,ItemTable in pairs(DropInfo) do
            local chance = ItemTable.Chance or 100
            local max_drops = ItemTable.Multiple or 1
            local item_name = ItemTable.Item
            for i=1,max_drops do
                if RollPercentage(chance) then
                    print("Creating "..item_name)
                    local item = CreateItem(item_name, nil, nil)
                    item:SetPurchaseTime(0)
                    local pos = unit:GetAbsOrigin()
                    local drop = CreateItemOnPositionSync( pos, item )
                    local pos_launch = pos+RandomVector(RandomFloat(150,200))
                    item:LaunchLoot(false, 200, 0.75, pos_launch, nil)
                end
            end
        end
    end
end
```
«Или 100» и «или 1» предназначены только для того, чтобы убедиться, что если строки «Шанс» или «Несколько» отсутствуют, будет использоваться значение по умолчанию («отбрасывать всегда» и «отбрасывать 1»).

## Шаг 5. Расширение до «100% удаления одного из этих»

Иногда выполнение «50% предмета 1 и 50% предмета 2» является слишком случайным, потому что это будет означать, что иногда из моба ничего не выпадет, а иногда может выпасть 2. Чтобы уменьшить случайность и гарантировать выпадение определенной комбинации предметов, наиболее распространенный подход состоит в том, чтобы иметь набор возможных выпадений и сделать так, чтобы из отряда выпадал только один из этого набора случайным образом.

Для этого вместо того, чтобы привязывать по одному предмету к каждой таблице предметов, будет еще одна таблица из \{возможного набора предметов\}, которую мы хотим, чтобы это существо сбросило:
```
"Drops"
{
    "creature_name1"
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_name_set1"
                "2" "item_name_set2"
                "3" "item_name_set3"
            }
            "Chance"   "100" //of dropping 1 of the set
        }
        "2"
        {
            "Item"     "item_name2"
            "Chance"   "50"
            "Multiple" "3"
        }
    }
}
```
Запись ItemSets также могла бы иметь «Несколько» kv, если бы мы хотели сценарий типа «2 из этих 3», но это не может гарантировать, что при втором броске не выпадет тот же предмет, что и при первом, если бы он это сделал.

И RollDrops теперь выглядит так:
```
lua
function RollDrops(unit)
    local DropInfo = GameRules.DropTable[unit:GetUnitName()]
    if DropInfo then
        print("Rolling Drops for "..unit:GetUnitName())
        for k,ItemTable in pairs(DropInfo) do
            -- If its an ItemSet entry, decide which item to drop
            local item_name
            if ItemTable.ItemSets then
            	-- Count how many there are to choose from
            	local count = 0
            	for i,v in pairs(ItemTable.ItemSets) do
            		count = count+1
            	end
                local random_i = RandomInt(1,count)
                item_name = ItemTable.ItemSets[tostring(random_i)]
            else
                item_name = ItemTable.Item
            end
            local chance = ItemTable.Chance or 100
            local max_drops = ItemTable.Multiple or 1
            for i=1,max_drops do
            	print("Rolling chance "..chance)
                if RollPercentage(chance) then
                    print("Creating "..item_name)
                    local item = CreateItem(item_name, nil, nil)
                    item:SetPurchaseTime(0)
                    local pos = unit:GetAbsOrigin()
                    local drop = CreateItemOnPositionSync( pos, item )
                    local pos_launch = pos+RandomVector(RandomFloat(150,200))
                    item:LaunchLoot(false, 200, 0.75, pos_launch, nil)
                end
            end
        end
    end
end
```

## Пример файла item_drops.kv
```
"Drops"
{
    //===============================================
    // ItemDrops UI Configuration
    //===============================================

    "MaxTime"        "60"
    "MaxDropsOnScreen"  "3"

    "ItemQualityColors"
    {
        "artifact"  "#FFA500" //Orange
        "epic"      "#8847FF" //Purple
        "rare"      "#4B69FF" //Blue
        "common"    "#00FF00" //Lime Green
        "component" "#FFFFFF" //White
        "consumable" "#FFFFFF" //White
    }

    // Don't fire the item_drop event for these
    "ExcludedQualities"
    {
        "consumable" "1"
        "component"  "1"
    }

    //===============================================
    // Roll Drops Configuration
    // Zone Specific
    //===============================================

    //===============================================
    // Titans
    //===============================================

    "titan_Avatar_of_Earth"
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_boots_of_agility_16"
                "2" "item_cloak_of_flames_25"
                "3" "item_gauntlets_of_might_16"
                "4" "item_orb_of_mana"
                "5" "item_life_gem"
                "6" "item_firehand_gauntlets_20"
                "7" "item_robes_of_enlightenment_16"
            }
            "Chance"   "100"
        }
    }
    "titan_Avatar_of_Nature"
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_boots_of_agility_16"
                "2" "item_heros_blade"
                "3" "item_gauntlets_of_might_16"
                "4" "item_orb_of_mana"
                "5" "item_ring_of_spell_power"
                "6" "item_heros_hauberk"
                "7" "item_robes_of_enlightenment_16"
                "8" "item_ring_of_healing_power"
            }
            "Chance"   "100"
        }
    }
    "titan_Avatar_of_Justice"
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_boots_of_agility_16"
                "2" "item_cloak_of_flames_25"
                "3" "item_gauntlets_of_might_16"
                "4" "item_orb_of_mana"
                "5" "item_life_gem"
                "6" "item_firehand_gauntlets_20"
                "7" "item_robes_of_enlightenment_16"
            }
            "Chance"   "100"
        }
    }
    "titan_Avatar_of_Death"
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_ring_of_regeneration"
                "2" "item_tbr_ring_of_health"
                "3" "item_pendant_of_energy"
            }
            "Chance"   "100"
        }
    }
    "titan_Avatar_of_the_Sky"
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_ring_of_regeneration"
                "2" "item_tbr_ring_of_health"
                "3" "item_pendant_of_energy"
            }
            "Chance"   "100"
        }
    }
    "titan_Avatar_of_Sacrifice"
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_ring_of_regeneration"
                "2" "item_tbr_ring_of_health"
                "3" "item_pendant_of_energy"
            }
            "Chance"   "100"
        }
    }
    "titan_Avatar_of_the_Sea"
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_ring_of_regeneration"
                "2" "item_tbr_ring_of_health"
                "3" "item_pendant_of_energy"
            }
            "Chance"   "100"
        }
    }
    "titan_Mother_of_Earth"
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_ring_of_regeneration"
                "2" "item_tbr_ring_of_health"
                "3" "item_pendant_of_energy"
            }
            "Chance"   "100"
        }
    }

    //===============================================
    // Demon Area
    //===============================================

	"demon_imp"     // noob tier
    {
        "1"
        {
            "Item"     "item_potion_of_minor_healing"
            "Chance"   "10"
        }
        "2"
        {
            "Item"     "item_gold_bag_100"
            "Chance"   "10"
        }
        "3"
        {
            "ItemSets"
            {
                "1" "item_talisman_of_health"
                "2" "item_ring_of_regeneration"
                "3" "item_apprentice_robes"
                "4" "item_hard_leather_armor"
                "5" "item_ring_mail"
            }
            "Chance"   "3"
        }
    }

    "demon_hound"   // noob tier
    {
        "1"
        {
            "Item"     "item_potion_of_minor_healing"
            "Chance"   "10"
        }
        "2"
        {
            "Item"     "item_potion_of_minor_healing"
            "Chance"   "10"
        }
        "3"
        {
            "Item"     "item_gold_bag_100"
            "Chance"   "10"
        }
        "4"
        {
            "ItemSets"
            {
                "1" "item_talisman_of_health"
                "2" "item_ring_of_regeneration"
                "3" "item_apprentice_robes"
                "4" "item_hard_leather_armor"
                "5" "item_ring_mail"
            }
            "Chance"   "8"
        }
    }

    "demon_fire"    // noob tier
    {
        "1"
        {
            "Item"     "item_potion_of_minor_healing"
            "Chance"   "10"
        }
        "2"
        {
            "Item"     "item_potion_of_minor_healing"
            "Chance"   "10"
        }
        "3"
        {
            "Item"     "item_gold_bag_100"
            "Chance"   "10"
        }
        "4"
        {
            "ItemSets"
            {
                "1" "item_talisman_of_health"
                "2" "item_ring_of_regeneration"
                "3" "item_apprentice_robes"
                "4" "item_hard_leather_armor"
                "5" "item_ring_mail"
            }
            "Chance"   "5"
        }
    }

    "forest_bear"   // tier 1
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_ring_of_regeneration"
                "2" "item_boots_of_agility_8"
                "3" "item_tbr_broadsword"
                "4" "item_tbr_circlet_of_nobility"
                "5" "item_cloak_of_flames_25"
                "6" "item_firehand_gauntlets_20"
                "7" "item_gauntlets_of_might_8"
                "8" "item_mail_shirt"
                "9" "item_pendant_of_energy" // This item doesn't exist, needs to be made
                "10" "item_ring_of_dodging"
                "11" "item_tbr_ring_of_health"  // This item doesn't exist, needs to be made
                "12" "item_ring_of_vigor"
                "13" "item_robes_of_enlightenment_8"
                "14" "item_wand_of_healing_power"
                "15" "item_wand_of_spell_power"
            }
            "Chance"   "5" //of dropping 1 of the set
        }
        "2"
        {
            "ItemSets"
            {
                "1" "item_potion_of_lesser_healing"
                "2" "item_potion_of_lesser_mana"
            }
            "Chance"   "10" //of dropping 1 of the set
        }
    }

    "nukacha"
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_ring_of_regeneration"
                "2" "item_tbr_ring_of_health"
                "3" "item_pendant_of_energy"
                //"4" "item_goldbag" // It spawns between 1 to 6 Gold Bags of 50 gold each
            }
            "Chance"   "100"
        }
    }

    //===============================================
    // Goblin Area
    //===============================================

    "goblin"        // tier 1
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_ring_of_regeneration"
                "2" "item_boots_of_agility_8"
                "3" "item_tbr_broadsword"
                "4" "item_tbr_circlet_of_nobility"
                "5" "item_cloak_of_flames_25"
                "6" "item_firehand_gauntlets_20"
                "7" "item_gauntlets_of_might_8"
                "8" "item_mail_shirt"
                "9" "item_pendant_of_energy" // This item doesn't exist, needs to be made
                "10" "item_ring_of_dodging"
                "11" "item_tbr_ring_of_health"  // This item doesn't exist, needs to be made
                "12" "item_ring_of_vigor"
                "13" "item_robes_of_enlightenment_8"
                "14" "item_wand_of_healing_power"
                "15" "item_wand_of_spell_power"
            }
            "Chance"   "5" //of dropping 1 of the set
        }
        "2"
        {
            "ItemSets"
            {
                "1" "item_potion_of_lesser_healing"
                "2" "item_potion_of_lesser_mana"
            }
            "Chance"   "10" //of dropping 1 of the set
        }
    }

    "shaman"        // tier 1
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_ring_of_regeneration"
                "2" "item_boots_of_agility_8"
                "3" "item_tbr_broadsword"
                "4" "item_tbr_circlet_of_nobility"
                "5" "item_cloak_of_flames_25"
                "6" "item_firehand_gauntlets_20"
                "7" "item_gauntlets_of_might_8"
                "8" "item_mail_shirt"
                "9" "item_pendant_of_energy" // This item doesn't exist, needs to be made
                "10" "item_ring_of_dodging"
                "11" "item_tbr_ring_of_health"  // This item doesn't exist, needs to be made
                "12" "item_ring_of_vigor"
                "13" "item_robes_of_enlightenment_8"
                "14" "item_wand_of_healing_power"
                "15" "item_wand_of_spell_power"
            }
            "Chance"   "5" //of dropping 1 of the set
        }
        "2"
        {
            "ItemSets"
            {
                "1" "item_potion_of_lesser_healing"
                "2" "item_potion_of_lesser_mana"
            }
            "Chance"   "10" //of dropping 1 of the set
        }
    }
    //===============================================
    // Black Goblin Area
    //===============================================

    "black_goblin"  // tier 1
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_ring_of_regeneration"
                "2" "item_boots_of_agility_8"
                "3" "item_tbr_broadsword"
                "4" "item_tbr_circlet_of_nobility"
                "5" "item_cloak_of_flames_25"
                "6" "item_firehand_gauntlets_20"
                "7" "item_gauntlets_of_might_8"
                "8" "item_mail_shirt"
                "9" "item_pendant_of_energy" // This item doesn't exist, needs to be made
                "10" "item_ring_of_dodging"
                "11" "item_tbr_ring_of_health"  // This item doesn't exist, needs to be made
                "12" "item_ring_of_vigor"
                "13" "item_robes_of_enlightenment_8"
                "14" "item_wand_of_healing_power"
                "15" "item_wand_of_spell_power"
            }
            "Chance"   "5" //of dropping 1 of the set
        }
        "2"
        {
            "ItemSets"
            {
                "1" "item_potion_of_lesser_healing"
                "2" "item_potion_of_lesser_mana"
            }
            "Chance"   "10" //of dropping 1 of the set
        }
    }

    "black_shaman"  // tier 1
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_ring_of_regeneration"
                "2" "item_boots_of_agility_8"
                "3" "item_tbr_broadsword"
                "4" "item_tbr_circlet_of_nobility"
                "5" "item_cloak_of_flames_25"
                "6" "item_firehand_gauntlets_20"
                "7" "item_gauntlets_of_might_8"
                "8" "item_mail_shirt"
                "9" "item_pendant_of_energy" // This item doesn't exist, needs to be made
                "10" "item_ring_of_dodging"
                "11" "item_tbr_ring_of_health"  // This item doesn't exist, needs to be made
                "12" "item_ring_of_vigor"
                "13" "item_robes_of_enlightenment_8"
                "14" "item_wand_of_healing_power"
                "15" "item_wand_of_spell_power"
            }
            "Chance"   "5" //of dropping 1 of the set
        }
        "2"
        {
            "ItemSets"
            {
                "1" "item_potion_of_lesser_healing"
                "2" "item_potion_of_lesser_mana"
            }
            "Chance"   "10" //of dropping 1 of the set
        }
    }

    "ogre"          // tier 1
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_ring_of_regeneration"
                "2" "item_boots_of_agility_8"
                "3" "item_tbr_broadsword"
                "4" "item_tbr_circlet_of_nobility"
                "5" "item_cloak_of_flames_25"
                "6" "item_firehand_gauntlets_20"
                "7" "item_gauntlets_of_might_8"
                "8" "item_mail_shirt"
                "9" "item_pendant_of_energy" // This item doesn't exist, needs to be made
                "10" "item_ring_of_dodging"
                "11" "item_tbr_ring_of_health"  // This item doesn't exist, needs to be made
                "12" "item_ring_of_vigor"
                "13" "item_robes_of_enlightenment_8"
                "14" "item_wand_of_healing_power"
                "15" "item_wand_of_spell_power"
            }
            "Chance"   "5" //of dropping 1 of the set
        }
        "2"
        {
            "ItemSets"
            {
                "1" "item_potion_of_lesser_healing"
                "2" "item_potion_of_lesser_mana"
            }
            "Chance"   "10" //of dropping 1 of the set
        }
    }

    "rokthul"
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_boots_of_agility_8"
                "2" "item_medallion_of_stamina"
                "3" "item_pendant_of_mana"
                "4" "item_gauntlets_of_might_8"
                "5" "item_robes_of_enlightenment_8"
                "6" "item_tbr_circlet_of_nobility"
            }
            "Chance"   "100"
        }
    }
    //===============================================
    // Bandit Area
    //===============================================

    "bandit"        // tier 1
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_ring_of_regeneration"
                "2" "item_boots_of_agility_8"
                "3" "item_tbr_broadsword"
                "4" "item_tbr_circlet_of_nobility"
                "5" "item_cloak_of_flames_25"
                "6" "item_firehand_gauntlets_20"
                "7" "item_gauntlets_of_might_8"
                "8" "item_mail_shirt"
                "9" "item_pendant_of_energy" // This item doesn't exist, needs to be made
                "10" "item_ring_of_dodging"
                "11" "item_tbr_ring_of_health"  // This item doesn't exist, needs to be made
                "12" "item_ring_of_vigor"
                "13" "item_robes_of_enlightenment_8"
                "14" "item_wand_of_healing_power"
                "15" "item_wand_of_spell_power"
            }
            "Chance"   "5" //of dropping 1 of the set
        }
        "2"
        {
            "ItemSets"
            {
                "1" "item_potion_of_lesser_healing"
                "2" "item_potion_of_lesser_mana"
            }
            "Chance"   "10" //of dropping 1 of the set
        }
    }

    "mance_swiftsword"
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_pendant_of_energy"
                "2" "item_tbr_ring_of_health"
                "3" "item_orb_of_unending_life"
                "4" "item_ring_of_vigor"
                //"5" "item_goldbag" // drops between 1 to 12 goldbags of 50 gold each
            }
            "Chance"   "100"
        }
    }
    //===============================================
    // Spider Area
    //===============================================

    "forest_spider" // tier 1
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_ring_of_regeneration"
                "2" "item_boots_of_agility_8"
                "3" "item_tbr_broadsword"
                "4" "item_tbr_circlet_of_nobility"
                "5" "item_cloak_of_flames_25"
                "6" "item_firehand_gauntlets_20"
                "7" "item_gauntlets_of_might_8"
                "8" "item_mail_shirt"
                "9" "item_pendant_of_energy" // This item doesn't exist, needs to be made
                "10" "item_ring_of_dodging"
                "11" "item_tbr_ring_of_health"  // This item doesn't exist, needs to be made
                "12" "item_ring_of_vigor"
                "13" "item_robes_of_enlightenment_8"
                "14" "item_wand_of_healing_power"
                "15" "item_wand_of_spell_power"
            }
            "Chance"   "5" //of dropping 1 of the set
        }
        "2"
        {
            "ItemSets"
            {
                "1" "item_potion_of_lesser_healing"
                "2" "item_potion_of_lesser_mana"
            }
            "Chance"   "10" //of dropping 1 of the set
        }
    }

    "forest_lurker" // tier 2
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_ring_of_regeneration"
                "2" "item_boots_of_agility_8"
                "3" "item_tbr_broadsword"
                "4" "item_tbr_circlet_of_nobility"
                "5" "item_cloak_of_flames_25"
                "6" "item_firehand_gauntlets_20"
                "7" "item_gauntlets_of_might_8"
                "8" "item_mail_shirt"
                "9" "item_pendant_of_energy" // This item doesn't exist, needs to be made
                "10" "item_ring_of_dodging"
                "11" "item_tbr_ring_of_health"  // This item doesn't exist, needs to be made
                "12" "item_ring_of_vigor"
                "13" "item_robes_of_enlightenment_8"
                "14" "item_wand_of_healing_power"
                "15" "item_wand_of_spell_power"
            }
            "Chance"   "5" //of dropping 1 of the set
        }
        "2"
        {
            "ItemSets"
            {
                "1" "item_potion_of_lesser_healing"
                "2" "item_potion_of_lesser_mana"
            }
            "Chance"   "10" //of dropping 1 of the set
        }
    }

    "giant_spider"  // tier 2
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_ring_of_regeneration"
                "2" "item_boots_of_agility_8"
                "3" "item_tbr_broadsword"
                "4" "item_tbr_circlet_of_nobility"
                "5" "item_cloak_of_flames_25"
                "6" "item_firehand_gauntlets_20"
                "7" "item_gauntlets_of_might_8"
                "8" "item_mail_shirt"
                "9" "item_pendant_of_energy" // This item doesn't exist, needs to be made
                "10" "item_ring_of_dodging"
                "11" "item_tbr_ring_of_health"  // This item doesn't exist, needs to be made
                "12" "item_ring_of_vigor"
                "13" "item_robes_of_enlightenment_8"
                "14" "item_wand_of_healing_power"
                "15" "item_wand_of_spell_power"
            }
            "Chance"   "5" //of dropping 1 of the set
        }
        "2"
        {
            "ItemSets"
            {
                "1" "item_potion_of_lesser_healing"
                "2" "item_potion_of_lesser_mana"
            }
            "Chance"   "10" //of dropping 1 of the set
        }
    }

    "forest_terror"
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_boots_of_agility_8"
                "2" "item_tbr_broadsword"
                "3" "item_mail_shirt"
                "4" "item_gauntlets_of_might_8"
                "5" "item_robes_of_enlightenment_8"
                "6" "item_wand_of_healing_power"
                "7" "item_wand_of_spell_power"
            }
            "Chance"   "100"
        }
    }
    //===============================================
    // Sea Servant Area
    //===============================================

    "sea_servant_huntsman"  // tier 1
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_ring_of_regeneration"
                "2" "item_boots_of_agility_8"
                "3" "item_tbr_broadsword"
                "4" "item_tbr_circlet_of_nobility"
                "5" "item_cloak_of_flames_25"
                "6" "item_firehand_gauntlets_20"
                "7" "item_gauntlets_of_might_8"
                "8" "item_mail_shirt"
                "9" "item_pendant_of_energy" // This item doesn't exist, needs to be made
                "10" "item_ring_of_dodging"
                "11" "item_tbr_ring_of_health"  // This item doesn't exist, needs to be made
                "12" "item_ring_of_vigor"
                "13" "item_robes_of_enlightenment_8"
                "14" "item_wand_of_healing_power"
                "15" "item_wand_of_spell_power"
            }
            "Chance"   "5" //of dropping 1 of the set
        }
        "2"
        {
            "ItemSets"
            {
                "1" "item_potion_of_lesser_healing"
                "2" "item_potion_of_lesser_mana"
            }
            "Chance"   "10" //of dropping 1 of the set
        }
    }
    "sea_servant_wavecaller"    // tier 2
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_ring_of_regeneration"
                "2" "item_boots_of_agility_8"
                "3" "item_tbr_broadsword"
                "4" "item_tbr_circlet_of_nobility"
                "5" "item_cloak_of_flames_25"
                "6" "item_firehand_gauntlets_20"
                "7" "item_gauntlets_of_might_8"
                "8" "item_mail_shirt"
                "9" "item_pendant_of_energy" // This item doesn't exist, needs to be made
                "10" "item_ring_of_dodging"
                "11" "item_tbr_ring_of_health"  // This item doesn't exist, needs to be made
                "12" "item_ring_of_vigor"
                "13" "item_robes_of_enlightenment_8"
                "14" "item_wand_of_healing_power"
                "15" "item_wand_of_spell_power"
            }
            "Chance"   "5" //of dropping 1 of the set
        }
        "2"
        {
            "ItemSets"
            {
                "1" "item_potion_of_lesser_healing"
                "2" "item_potion_of_lesser_mana"
            }
            "Chance"   "10" //of dropping 1 of the set
        }
    }

    //===============================================
    // Mountain Wolf Area
    //===============================================

    "mountain_wolf"
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_ring_of_regeneration"
                "2" "item_boots_of_agility_8"
                "3" "item_tbr_broadsword"
                "4" "item_tbr_circlet_of_nobility"
                "5" "item_cloak_of_flames_25"
                "6" "item_firehand_gauntlets_20"
                "7" "item_gauntlets_of_might_8"
                "8" "item_mail_shirt"
                "9" "item_pendant_of_energy" // This item doesn't exist, needs to be made
                "10" "item_ring_of_dodging"
                "11" "item_tbr_ring_of_health"  // This item doesn't exist, needs to be made
                "12" "item_ring_of_vigor"
                "13" "item_robes_of_enlightenment_8"
                "14" "item_wand_of_healing_power"
                "15" "item_wand_of_spell_power"
            }
            "Chance"   "5" //of dropping 1 of the set
        }
        "2"
        {
            "ItemSets"
            {
                "1" "item_potion_of_lesser_healing"
                "2" "item_potion_of_lesser_mana"
            }
            "Chance"   "10" //of dropping 1 of the set
        }
    }

    //===============================================
    // Minotaur Area
    //===============================================

    "minotaur_grunt"    // tier 1
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_ring_of_regeneration"
                "2" "item_boots_of_agility_8"
                "3" "item_tbr_broadsword"
                "4" "item_tbr_circlet_of_nobility"
                "5" "item_cloak_of_flames_25"
                "6" "item_firehand_gauntlets_20"
                "7" "item_gauntlets_of_might_8"
                "8" "item_mail_shirt"
                "9" "item_pendant_of_energy" // This item doesn't exist, needs to be made
                "10" "item_ring_of_dodging"
                "11" "item_tbr_ring_of_health"  // This item doesn't exist, needs to be made
                "12" "item_ring_of_vigor"
                "13" "item_robes_of_enlightenment_8"
                "14" "item_wand_of_healing_power"
                "15" "item_wand_of_spell_power"
            }
            "Chance"   "5" //of dropping 1 of the set
        }
        "2"
        {
            "ItemSets"
            {
                "1" "item_potion_of_lesser_healing"
                "2" "item_potion_of_lesser_mana"
            }
            "Chance"   "10" //of dropping 1 of the set
        }
    }

    "minotaur_warlock"  // tier 2
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_ring_of_regeneration"
                "2" "item_boots_of_agility_8"
                "3" "item_tbr_broadsword"
                "4" "item_tbr_circlet_of_nobility"
                "5" "item_cloak_of_flames_25"
                "6" "item_firehand_gauntlets_20"
                "7" "item_gauntlets_of_might_8"
                "8" "item_mail_shirt"
                "9" "item_pendant_of_energy" // This item doesn't exist, needs to be made
                "10" "item_ring_of_dodging"
                "11" "item_tbr_ring_of_health"  // This item doesn't exist, needs to be made
                "12" "item_ring_of_vigor"
                "13" "item_robes_of_enlightenment_8"
                "14" "item_wand_of_healing_power"
                "15" "item_wand_of_spell_power"
            }
            "Chance"   "5" //of dropping 1 of the set
        }
        "2"
        {
            "ItemSets"
            {
                "1" "item_potion_of_lesser_healing"
                "2" "item_potion_of_lesser_mana"
            }
            "Chance"   "10" //of dropping 1 of the set
        }
    }

    "minotaur_beastman" // tier 2
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_ring_of_regeneration"
                "2" "item_boots_of_agility_8"
                "3" "item_tbr_broadsword"
                "4" "item_tbr_circlet_of_nobility"
                "5" "item_cloak_of_flames_25"
                "6" "item_firehand_gauntlets_20"
                "7" "item_gauntlets_of_might_8"
                "8" "item_mail_shirt"
                "9" "item_pendant_of_energy" // This item doesn't exist, needs to be made
                "10" "item_ring_of_dodging"
                "11" "item_tbr_ring_of_health"  // This item doesn't exist, needs to be made
                "12" "item_ring_of_vigor"
                "13" "item_robes_of_enlightenment_8"
                "14" "item_wand_of_healing_power"
                "15" "item_wand_of_spell_power"
            }
            "Chance"   "5" //of dropping 1 of the set
        }
        "2"
        {
            "ItemSets"
            {
                "1" "item_potion_of_lesser_healing"
                "2" "item_potion_of_lesser_mana"
            }
            "Chance"   "10" //of dropping 1 of the set
        }
    }

    "giant_of_the_seas" // tier 2 or 3 (its lvl 29)
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_ring_of_regeneration"
                "2" "item_boots_of_agility_8"
                "3" "item_tbr_broadsword"
                "4" "item_tbr_circlet_of_nobility"
                "5" "item_cloak_of_flames_25"
                "6" "item_firehand_gauntlets_20"
                "7" "item_gauntlets_of_might_8"
                "8" "item_mail_shirt"
                "9" "item_pendant_of_energy" // This item doesn't exist, needs to be made
                "10" "item_ring_of_dodging"
                "11" "item_tbr_ring_of_health"  // This item doesn't exist, needs to be made
                "12" "item_ring_of_vigor"
                "13" "item_robes_of_enlightenment_8"
                "14" "item_wand_of_healing_power"
                "15" "item_wand_of_spell_power"
            }
            "Chance"   "5" //of dropping 1 of the set
        }
        "2"
        {
            "ItemSets"
            {
                "1" "item_potion_of_lesser_healing"
                "2" "item_potion_of_lesser_mana"
            }
            "Chance"   "10" //of dropping 1 of the set
        }
    }
    //===============================================
    // Area
    //===============================================

    "bandit"
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_ring_of_regeneration"
                "2" "item_boots_of_agility_8"
                "3" "item_tbr_broadsword"
                "4" "item_tbr_circlet_of_nobility"
                "5" "item_cloak_of_flames_25"
                "6" "item_firehand_gauntlets_20"
                "7" "item_gauntlets_of_might_8"
                "8" "item_mail_shirt"
                "9" "item_pendant_of_energy" // This item doesn't exist, needs to be made
                "10" "item_ring_of_dodging"
                "11" "item_tbr_ring_of_health"  // This item doesn't exist, needs to be made
                "12" "item_ring_of_vigor"
                "13" "item_robes_of_enlightenment_8"
                "14" "item_wand_of_healing_power"
                "15" "item_wand_of_spell_power"
            }
            "Chance"   "5" //of dropping 1 of the set
        }
        "2"
        {
            "ItemSets"
            {
                "1" "item_potion_of_lesser_healing"
                "2" "item_potion_of_lesser_mana"
            }
            "Chance"   "10" //of dropping 1 of the set
        }
    }

    "bandit"
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_ring_of_regeneration"
                "2" "item_boots_of_agility_8"
                "3" "item_tbr_broadsword"
                "4" "item_tbr_circlet_of_nobility"
                "5" "item_cloak_of_flames_25"
                "6" "item_firehand_gauntlets_20"
                "7" "item_gauntlets_of_might_8"
                "8" "item_mail_shirt"
                "9" "item_pendant_of_energy" // This item doesn't exist, needs to be made
                "10" "item_ring_of_dodging"
                "11" "item_tbr_ring_of_health"  // This item doesn't exist, needs to be made
                "12" "item_ring_of_vigor"
                "13" "item_robes_of_enlightenment_8"
                "14" "item_wand_of_healing_power"
                "15" "item_wand_of_spell_power"
            }
            "Chance"   "5" //of dropping 1 of the set
        }
        "2"
        {
            "ItemSets"
            {
                "1" "item_potion_of_lesser_healing"
                "2" "item_potion_of_lesser_mana"
            }
            "Chance"   "10" //of dropping 1 of the set
        }
    }

    "bandit"
    {
       "1"
        {
            "ItemSets"
            {
                "1" "item_ring_of_regeneration"
                "2" "item_boots_of_agility_8"
                "3" "item_tbr_broadsword"
                "4" "item_tbr_circlet_of_nobility"
                "5" "item_cloak_of_flames_25"
                "6" "item_firehand_gauntlets_20"
                "7" "item_gauntlets_of_might_8"
                "8" "item_mail_shirt"
                "9" "item_pendant_of_energy" // This item doesn't exist, needs to be made
                "10" "item_ring_of_dodging"
                "11" "item_tbr_ring_of_health"  // This item doesn't exist, needs to be made
                "12" "item_ring_of_vigor"
                "13" "item_robes_of_enlightenment_8"
                "14" "item_wand_of_healing_power"
                "15" "item_wand_of_spell_power"
            }
            "Chance"   "5" //of dropping 1 of the set
        }
        "2"
        {
            "ItemSets"
            {
                "1" "item_potion_of_lesser_healing"
                "2" "item_potion_of_lesser_mana"
            }
            "Chance"   "10" //of dropping 1 of the set
        }
    }

    "bandit"
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_ring_of_regeneration"
                "2" "item_boots_of_agility_8"
                "3" "item_tbr_broadsword"
                "4" "item_tbr_circlet_of_nobility"
                "5" "item_cloak_of_flames_25"
                "6" "item_firehand_gauntlets_20"
                "7" "item_gauntlets_of_might_8"
                "8" "item_mail_shirt"
                "9" "item_pendant_of_energy" // This item doesn't exist, needs to be made
                "10" "item_ring_of_dodging"
                "11" "item_tbr_ring_of_health"  // This item doesn't exist, needs to be made
                "12" "item_ring_of_vigor"
                "13" "item_robes_of_enlightenment_8"
                "14" "item_wand_of_healing_power"
                "15" "item_wand_of_spell_power"
            }
            "Chance"   "5" //of dropping 1 of the set
        }
        "2"
        {
            "ItemSets"
            {
                "1" "item_potion_of_lesser_healing"
                "2" "item_potion_of_lesser_mana"
            }
            "Chance"   "10" //of dropping 1 of the set
        }
    }

    "bandit"
    {
        "1"
        {
            "ItemSets"
            {
                "1" "item_ring_of_regeneration"
                "2" "item_boots_of_agility_8"
                "3" "item_tbr_broadsword"
                "4" "item_tbr_circlet_of_nobility"
                "5" "item_cloak_of_flames_25"
                "6" "item_firehand_gauntlets_20"
                "7" "item_gauntlets_of_might_8"
                "8" "item_mail_shirt"
                "9" "item_pendant_of_energy" // This item doesn't exist, needs to be made
                "10" "item_ring_of_dodging"
                "11" "item_tbr_ring_of_health"  // This item doesn't exist, needs to be made
                "12" "item_ring_of_vigor"
                "13" "item_robes_of_enlightenment_8"
                "14" "item_wand_of_healing_power"
                "15" "item_wand_of_spell_power"
            }
            "Chance"   "5" //of dropping 1 of the set
        }
        "2"
        {
            "ItemSets"
            {
                "1" "item_potion_of_lesser_healing"
                "2" "item_potion_of_lesser_mana"
            }
            "Chance"   "10" //of dropping 1 of the set
        }
    }
}
```
