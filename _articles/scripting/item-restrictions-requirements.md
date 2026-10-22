---
title: Ограничения и требования к предмету
author: Noya
steamId: '76561198046984233'
date: 13.12.2014
---
Ограничения и требования к предмету

Это реализует следующую механику:

<StaticVideo path="/videos/OfficialAdorableJabiru.mp4" />

## Шаг 1. Таблица ключевых значений

Сначала создайте текстовый файл, чтобы записать свойства вашего элемента. Имя файла, расширение и путь могут быть любыми, если структура файла представляет собой правильную таблицу.

В этом примере мы будем использовать этот путь: `scripts/maps/item_info.kv`.

```
"Items"
{
    "item_name_here" //change it to a custom items
    {
        "levelRequired"	"10"
        "classRequired"	"Warrior"
    }

    "item_other_name_here"
    {
        "levelRequired"	"25"
    }
}
```
Чтобы загрузить стол в игровой режим, вам необходимо использовать функцию Lua `LoadKeyValues( "path/to/file" )`. Это можно вызвать в GameMode:InitGameMode() внутри вашего основного дополнения Lua. GameMode = сам
```
lua
self.ItemInfoKV = LoadKeyValues( "scripts/maps/item_info.kv" )
```
Если ваша таблица неправильно сформирована (например, вы пропустили кавычку или скобку), это не удастся, и при запуске игры вы получите ошибку консоли Lua.

Обратите внимание, что я не добавил «classRequired» ко второму элементу. При попытке доступа значение `GameMode.ItemInfoKV[itemNane].classRequired` будет равно нулю, что означает отсутствие ограничений по классу (но все равно проверяет уровень)

Есть много способов установить класс, самый простой из них — индексация `.class` в дескрипторе героя при первом входе героя в игру (с использованием вызовов barebones.lua по умолчанию).
```
lua
function GameMode:OnHeroInGame(hero)

    if heroName == "npc_dota_hero_axe" then
        hero.class = "Warrior"
        print("Axe is ready!")
    end

end
```

## Шаг 2. Событие способности OnEquip

Добавьте это событие, управляемое данными, для каждого элемента, которому необходимо выполнить проверку на наличие ограничений. Он вызывает сценарий lua для выполнения логической проверки таблицы.

Это необходимо, поскольку прослушиватель изменений инвентаря не работает, а перехватчик событий Lua `OnItemPickedUp` не учитывает перетаскивание кем-то предмета в инвентарь другого игрока.
```
"OnEquip"
{
    "RunScript"
    {
        "ScriptFile"	"items.lua"
        "Function"	"ItemCheck"
    }
}
```

## Шаг 3. Lua-скрипт

В этом примере я буду искать требования к уровню и классу.

Используйте [CustomError Flash UI by zedor](https://github.com/zedor/CustomError) для отображения красного сообщения об ошибке, если элемент не соответствует ни одному из критериев, найденных в таблице.

Есть несколько `DeepPrintTable` и `print`, чтобы проверить, что таблица просматривается так, как вы ожидаете.
```
lua
function ItemCheck( event )
    local itemName = event.ability:GetAbilityName()
    local hero = EntIndexToHScript( event.caster_entindex )
    local itemTable = GameMode.ItemInfoKV[itemName]
    print("Checking Restrictions for "..itemName)
    DeepPrintTable(itemTable)

    -- if there is no subtable for this item, end this script
    if itemTable == nil then
        return true
    end

    -- This timer is needed because OnEquip triggers before the item actually being in inventory
    Timers:CreateTimer(0.1,function()
        -- Go through every item slot
        for itemSlot = 0, 5, 1 do
            local Item = hero:GetItemInSlot( itemSlot )
            -- When we find the item we want to check
            if Item ~= nil and itemName == Item:GetName() then
                DeepPrintTable(Item)

                -- Check Level Restriction
                if itemTable.levelRequired then
                    print("Name","Level Req","Hero Level")
                    print(itemName,itemTable.levelRequired,hero:GetLevel())
                    -- If the hero doesn't meet the level required, show message and call DropItem
                    if itemTable.levelRequired > hero:GetLevel() then
                        FireGameEvent( 'custom_error_show', { player_ID = pID, _error = "You need level "..itemTable.levelRequired.." to use this." } )
                        DropItem(Item, hero)
                    end
                end

                -- Check Class Restriction
                if itemTable.classRequired then
                    print("Name","Class Req","Hero Class")
                    print(itemName,itemTable.classRequired,hero.class)
                    -- If the item is for an specific class, message and drop
                    if itemTable.classRequired ~= hero.class then
                        FireGameEvent( 'custom_error_show', { player_ID = pID, _error = "Requires ".. hero.class .." to use." } )
                        DropItem(Item, hero)
                    end
                end
            end
        end
    end)
end

function DropItem( item, hero )
    -- Error Sound
    EmitSoundOnClient("General.CastFail_InvalidTarget_Hero", hero:GetPlayerOwner())

    -- Create a new empty item
    local newItem = CreateItem( item:GetName(), nil, nil )
    newItem:SetPurchaseTime( 0 )

    -- This is needed if you are working with items with charges, uncomment it if so.
    -- newItem:SetCurrentCharges( goldToDrop )

    -- Make a new item and launch it near the hero
    local spawnPoint = Vector( 0, 0, 0 )
    spawnPoint = hero:GetAbsOrigin()
    local drop = CreateItemOnPositionSync( spawnPoint, newItem )
    newItem:LaunchLoot( false, 200, 0.75, spawnPoint + RandomVector( RandomFloat( 50, 150 ) ) )

    --finally, remove the item
    hero:RemoveItem(item)
end

```
