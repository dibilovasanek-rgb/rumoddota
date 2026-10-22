---
title: Ключевые значения элемента
author: Noya
steamId: '76561198046984233'
date: 01.12.2014
---
значения элемента

Полное руководство по npc_items_custom и кодированию элементов.

## Общие

Начните с `item_` и названия вашего предмета. Если вы **не** поместите `item_` в начало элемента, произойдут плохие вещи.
```
"item_custom"
{ ... }
```
Для покупки в магазине каждому предмету нужен свой идентификатор, хотя вы можете определять предметы без идентификатора, если планируете создавать их только через Lua.
Не переопределяйте идентификаторы Dota, используйте идентификаторы в диапазоне от 1000 до 2000.

`"ID" "1100"`

Далее идет базовый класс. Это может быть DataDriven или переопределение существующего элемента из [default dota item_names](https://github.com/dotabuff/d2vpk/blob/master/dota_pak01/scripts/npc/items.txt).
```
"BaseClass" "item_datadriven"
            "item_aegis"
```
Если вы хотите переопределить элемент, вы не сможете изменять/добавлять способности, вы будете ограничены в изменении значений из файла items.txt (а некоторые значения даже невозможно изменить).
Поэтому рекомендуется всегда пытаться создать версию элемента, управляемую данными, если вы хотите иметь полную свободу в том, что делает ваш элемент.

Теперь, когда мы с этим разобрались, я рассмотрю наиболее распространенные значения ключей, встречающиеся в элементах.

### Основные правила
```
"ItemCost" "322"
"ItemKillable" "0"
"ItemSellable" "1"
"ItemPurchasable" "1"
"ItemDroppable" "1"
```
ItemKillable позволяет как союзникам, так и врагам уничтожить выпавший предмет, атаковав его.

### Запас
```
"ItemStockMax" "1"
"ItemStockTime" "100"
"ItemStockInitial" "3"
```

### Право собственности

Если вы опустите следующее, его поведение будет NOT_SHAREABLE.
```
"ItemShareability" "ITEM_NOT_SHAREABLE"             //Rapier
                   "ITEM_PARTIALLY_SHAREABLE"       //Ring of Regen
                   "ITEM_FULLY_SHAREABLE"           //Gem
                   "ITEM_FULLY_SHAREABLE_STACKING"  //Consumables
```

### Сборы
```
"ItemInitialCharges" "1" //How many charges should the item start with - Tango x3
"ItemDisplayCharges" "1" //Hide the charges of the item - Aegis
"ItemRequiresCharges" "1" //The active ability needs charges to be used - Urn
```
Также не забудьте добавить это где-нибудь, обычно в начале блока OnSpellStart.

`"SpendCharge" {}`

### Штабелирование, Расходный материал
```
"ItemStackable" "1"
"ItemPermanent" "0"
```
Если для параметра «ItemPermanent» установлено значение 1, заряженные предметы не исчезнут, когда их заряд достигнет 0 (Бутылка, Урна и т. д.).
Если его опустить, по умолчанию будет установлено значение 1.

### Автотрансляция

Это значение является ключевым для томов статистики и других расходуемых предметов:

`"ItemCastOnPickup" "1"`

### Обновляемые предметы

```
"MaxUpgradeLevel" "5" // Dagon - 5
"ItemBaseLevel" "1" //You'll need 5 different items, and change each accordingly
```

### Рецепты
```
"item_recipe_custom"
{
    "ID" "1200"
    "BaseClass"           "item_datadriven"
    "ItemRecipe"          "1" //destroyed after combine
    "ItemCost"            "0" //if its 0, it will combine without needing a recipe.
    "ItemResult"          "item_custom" //the result of combining the ItemRequirements
    "ItemRequirements"
    {
        "01" "item_ingredient_1;item_ingredient_2;item_ingredient_3"
        "02" "item_ingredient_1;item_ingredient_2;item_ingredient_alternative_3"
    }
}
```
**ВАЖНОЕ ПРИМЕЧАНИЕ:** Ваше имя предмета для рецепта, которое будет распознаваться пользовательским интерфейсом Dota Shop, ДОЛЖНО иметь следующий формат:
```
"item_recipe_(name of your item)"
```
Это означает, что если ItemResult, который вы хотите получить, называется _"item_capuchino"_, ваш рецепт будет таким: _"item_recipe_capuchino"_

![img](/images/external/dyDFL-f0a814100d.jpg)

Если вы этого не сделаете, предмет все равно можно будет комбинировать, но на нем не будут видны четкие линии возможных улучшений.

### Разборка
```
"ItemDisassembleRule" "DOTA_ITEM_DISASSEMBLE_ALWAYS"
                      "DOTA_ITEM_DISASSEMBLE_NEVER"
```

## Общие значения ключей-модификаторов для предметов

Теперь у нас есть элемент, но сам по себе он ничего не делает.
Чтобы добавить характеристики или усиления, нам нужно установить модификаторы внутри определения предмета.
Дополнительную информацию о модификаторах можно найти в разделе [Константы в вики].
```
"Modifiers"
{
    "item_custom_modifier"
    {
        "Passive" "1"
        "IsHidden" "0"
        "Attributes" "MODIFIER_ATTRIBUTE_MULTIPLE" //This makes duplicate items stack their properties
        "Properties"
        {
            "MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT" "%movement_speed"
            "MODIFIER_PROPERTY_EVASION_CONSTANT" "%evasion"
            "MODIFIER_PROPERTY_STATS_STRENGTH_BONUS" "%bonus_str_agi"
            "MODIFIER_PROPERTY_STATS_AGILITY_BONUS" "%bonus_agi"
            "MODIFIER_PROPERTY_STATS_INTELLECT_BONUS" "%bonus_int"
            "MODIFIER_PROPERTY_BASEDAMAGEOUTGOING_PERCENTAGE" "%damage_bonus_percent"
        }

        "States"
        {
            "MODIFIER_STATE_SPECIALLY_DENIABLE" "MODIFIER_STATE_VALUE_ENABLED"
            "MODIFIER_STATE_MAGIC_IMMUNE" "MODIFIER_STATE_VALUE_ENABLED"
            "MODIFIER_STATE_NO_HEALTH_BAR" "MODIFIER_STATE_VALUE_ENABLED"
        }
    }
}

```

## Добавление функциональности заклинаний

Помимо этих значений, специально связанных с элементами, вы можете добавить **_everything_**, которое может быть частью способности, управляемой данными, например:
```
"AbilityBehavior" "DOTA_ABILITY_BEHAVIOR_PASSIVE"
"AbilityUnitTargetTeam" "DOTA_UNIT_TARGET_TEAM_BOTH"
"AbilityUnitTargetType" "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC"
"AbilityCastAnimation" "ACT_DOTA_CAST_ABILITY_1"
"AbilityManaCost" "100"
"AbilityValues"
{...}
```
**[Ability Events](datadriven/datadriven-ability-events-modifiers)**, например `"OnSpellStart"`, `"OnOwnerDied"` или `"OnEquip"`, также размещаются здесь, в главном блоке.

Вам необходимо, по крайней мере, установить для свойстваabilityBehavior неактивный элемент (если вы этого не сделаете, по умолчанию будет установлено значение `DOTA_ABILITY_BEHAVIOR_UNIT_TARGET`).

Узнайте больше о полной комплектации [DataDriven Ability Breakdown](ability-keyvalues).

## Иконки и пользовательские магазины

Чтобы у вашего предмета был значок, вам нужно перейти в папку аддонов по этому пути:
`/resource/flash3/images/items`

И поместите файл `.PNG` размером **86 x 64** с тем же именем, что и у `item_custom`, БЕЗ `item_`.

![img](/images/external/4Jr9cpF.png)

Затем в код «item_custom» вы добавляете следующее:

`"AbilityTextureName" "item_custom"`

Вы также можете использовать названия значков Dota. Просто убедитесь, что эта строка начинается с `"item_`, чтобы движок знал, что нужно искать изображение в папке элементов.
Добавление товара в магазин. Макет [Здесь]
Для этого в папке аддона вам нужно зайти в `scripts/shops` и создать/отредактировать файл `.txt` со следующей структурой имени:

`mapName_shops.txt`

имя_карты должно быть именем ВАШЕЙ КАРТЫ (файл `.vmap` в Hammer или папке содержимого), а НЕ именем вашего аддона (оба могут быть одинаковыми, или у вас может быть несколько карт с разными магазинами)

Добавление `_shops` к имени карты также является обязательным.

Файл шаблона магазина:
```
//<map_name>_shops.txt inside a scripts\shops\ folder

"dota_shops"
{
	"consumables"
	{
		"item" 		"item_ingredient"
		"item"		"item_result"
	}

	"attributes"
	{

	}

	"weapons_armor"
	{

	}

	"misc"
	{

	}

	// Level 1 - Green Recipes
	"basics"
	{

	}

	// Level 2 - Blue Recipes
	"support"
	{

	}

	"magics"
	{

	}

	// Level 3 - Purple Recipes
	"defense"
	{

	}

	"weapons"
	{

	}

	// Level 4 - Orange / Orb / Artifacts
	"artifacts"
	{

	}

	"sideshop1"
	{

	}

	"sideshop2"
	{

	}

	"secretshop"
	{

	}
}
```
Помимо этого файла, ваш предмет может иметь правила ключевого значения, определяющие, где его можно купить.
```
"SideShop" "1"
"SecretShop" "0"
```
На момент написания этого руководства мы можем открыть только 3 разных магазина (домашний, боковой и секретный).
Вы можете изменить категории и названия вкладок магазина с помощью [addon_english modding]

Чтобы создать настоящую зону магазина внутри вашей карты в Hammer, ознакомьтесь с другим руководством [tutorial_creating_a_custom_shop_step_by_step](https://www.reddit.com/r/Dota2Modding/comments/2dpts1/tutorial_creating_a_custom_shop_step_by_step/).

Чтобы отключить элементы Dota, используйте `npc_abilities_override.txt` внутри папки `scripts/npc`:

::: подробности npc_abilities_override.txt
```
// Dota Abilities Override File
"DOTAAbilities"
{

// ITEM SHOPS---------------------------------------------------

	"item_blink"			"REMOVE"
	"item_blades_of_attack"			"REMOVE"
	"item_broadsword"			"REMOVE"
	"item_chainmail"			"REMOVE"
	"item_claymore"			"REMOVE"
	"item_helm_of_iron_will"			"REMOVE"
	"item_javelin"			"REMOVE"
	"item_mithril_hammer"			"REMOVE"
	"item_platemail"			"REMOVE"
	"item_quarterstaff"			"REMOVE"
	"item_quelling_blade"			"REMOVE"
	"item_ring_of_protection"			"REMOVE"
	"item_stout_shield"			"REMOVE"
	"item_gauntlets"			"REMOVE"
	"item_slippers"			"REMOVE"
	"item_mantle"			"REMOVE"
	"item_branches"			"REMOVE"
	"item_belt_of_strength"			"REMOVE"
	"item_boots_of_elves"			"REMOVE"
	"item_robe"			"REMOVE"
	"item_circlet"			"REMOVE"
	"item_ogre_axe"			"REMOVE"
	"item_blade_of_alacrity"			"REMOVE"
	"item_staff_of_wizardry"			"REMOVE"
	"item_ultimate_orb"			"REMOVE"
	"item_gloves"			"REMOVE"
	"item_lifesteal"			"REMOVE"
	"item_ring_of_regen"			"REMOVE"
	"item_sobi_mask"			"REMOVE"
	"item_boots"			"REMOVE"
	"item_gem"			"REMOVE"
	"item_cloak"			"REMOVE"
	"item_talisman_of_evasion"			"REMOVE"
	"item_cheese"			"REMOVE"
	"item_magic_stick"			"REMOVE"
	"item_recipe_magic_wand"			"REMOVE"
	"item_magic_wand"			"REMOVE"
	"item_ghost"			"REMOVE"
	"item_clarity"			"REMOVE"
	"item_flask"			"REMOVE"
	"item_dust"			"REMOVE"
	"item_bottle"			"REMOVE"
	"item_ward_observer"			"REMOVE"
	"item_ward_sentry"			"REMOVE"
	"item_tango"			"REMOVE"
	"item_tango_single"			"REMOVE"
	"item_courier"			"REMOVE"
	"item_tpscroll"			"REMOVE"
	"item_recipe_travel_boots"			"REMOVE"
	"item_travel_boots"			"REMOVE"
	"item_recipe_phase_boots"			"REMOVE"
	"item_phase_boots"			"REMOVE"
	"item_demon_edge"			"REMOVE"
	"item_eagle"			"REMOVE"
	"item_reaver"			"REMOVE"
	"item_relic"			"REMOVE"
	"item_hyperstone"			"REMOVE"
	"item_ring_of_health"			"REMOVE"
	"item_void_stone"			"REMOVE"
	"item_mystic_staff"			"REMOVE"
	"item_energy_booster"			"REMOVE"
	"item_point_booster"			"REMOVE"
	"item_vitality_booster"			"REMOVE"
	"item_recipe_power_treads"			"REMOVE"
	"item_power_treads"			"REMOVE"
	"item_recipe_hand_of_midas"			"REMOVE"
	"item_hand_of_midas"			"REMOVE"
	"item_recipe_oblivion_staff"			"REMOVE"
	"item_oblivion_staff"			"REMOVE"
	"item_recipe_pers"			"REMOVE"
	"item_pers"			"REMOVE"
	"item_recipe_poor_mans_shield"			"REMOVE"
	"item_poor_mans_shield"			"REMOVE"
	"item_recipe_bracer"			"REMOVE"
	"item_bracer"			"REMOVE"
	"item_recipe_wraith_band"			"REMOVE"
	"item_wraith_band"			"REMOVE"
	"item_recipe_null_talisman"			"REMOVE"
	"item_null_talisman"			"REMOVE"
	"item_recipe_mekansm"			"REMOVE"
	"item_mekansm"			"REMOVE"
	"item_recipe_vladmir"			"REMOVE"
	"item_vladmir"			"REMOVE"
	"item_flying_courier"			"REMOVE"
	"item_recipe_buckler"			"REMOVE"
	"item_buckler"			"REMOVE"
	"item_recipe_ring_of_basilius"			"REMOVE"
	"item_ring_of_basilius"			"REMOVE"
	"item_recipe_pipe"			"REMOVE"
	"item_pipe"			"REMOVE"
	"item_recipe_urn_of_shadows"			"REMOVE"
	"item_urn_of_shadows"			"REMOVE"
	"item_recipe_headdress"			"REMOVE"
	"item_headdress"			"REMOVE"
	"item_recipe_sheepstick"			"REMOVE"
	"item_sheepstick"			"REMOVE"
	"item_recipe_orchid"			"REMOVE"
	"item_orchid"			"REMOVE"
	"item_recipe_cyclone"			"REMOVE"
	"item_cyclone"			"REMOVE"
	"item_recipe_force_staff"			"REMOVE"
	"item_force_staff"			"REMOVE"
	"item_recipe_dagon"			"REMOVE"
	"item_recipe_dagon_2"			"REMOVE"
	"item_recipe_dagon_3"			"REMOVE"
	"item_recipe_dagon_4"			"REMOVE"
	"item_recipe_dagon_5"			"REMOVE"
	"item_dagon"			"REMOVE"
	"item_dagon_2"			"REMOVE"
	"item_dagon_3"			"REMOVE"
	"item_dagon_4"			"REMOVE"
	"item_dagon_5"			"REMOVE"
	"item_recipe_necronomicon"			"REMOVE"
	"item_recipe_necronomicon_2"			"REMOVE"
	"item_recipe_necronomicon_3"			"REMOVE"
	"item_necronomicon"			"REMOVE"
	"item_necronomicon_2"			"REMOVE"
	"item_necronomicon_3"			"REMOVE"
	"item_recipe_ultimate_scepter"			"REMOVE"
	"item_ultimate_scepter"			"REMOVE"
	"item_recipe_refresher"			"REMOVE"
	"item_refresher"			"REMOVE"
	"item_recipe_assault"			"REMOVE"
	"item_assault"			"REMOVE"
	"item_recipe_heart"			"REMOVE"
	"item_heart"			"REMOVE"
	"item_recipe_black_king_bar"			"REMOVE"
	"item_black_king_bar"			"REMOVE"
	"item_aegis"			"REMOVE"
	"item_recipe_shivas_guard"			"REMOVE"
	"item_shivas_guard"			"REMOVE"
	"item_recipe_bloodstone"			"REMOVE"
	"item_bloodstone"			"REMOVE"
	"item_recipe_sphere"			"REMOVE"
	"item_sphere"			"REMOVE"
	"item_recipe_reflex_energy_regen_booster"			"REMOVE"
	"item_vanguard"			"REMOVE"
	"item_recipe_blade_mail"			"REMOVE"
	"item_blade_mail"			"REMOVE"
	"item_recipe_soul_booster"			"REMOVE"
	"item_soul_booster"			"REMOVE"
	"item_recipe_hood_of_defiance"			"REMOVE"
	"item_hood_of_defiance"			"REMOVE"
	"item_recipe_rapier"			"REMOVE"
	"item_rapier"			"REMOVE"
	"item_recipe_monkey_king_bar"			"REMOVE"
	"item_monkey_king_bar"			"REMOVE"
	"item_recipe_radiance"			"REMOVE"
	"item_radiance"			"REMOVE"
	"item_recipe_butterfly"			"REMOVE"
	"item_butterfly"			"REMOVE"
	"item_recipe_greater_crit"			"REMOVE"
	"item_greater_crit"			"REMOVE"
	"item_recipe_basher"			"REMOVE"
	"item_basher"			"REMOVE"
	"item_recipe_bfury"			"REMOVE"
	"item_bfury"			"REMOVE"
	"item_recipe_manta"			"REMOVE"
	"item_manta"			"REMOVE"
	"item_recipe_lesser_crit"			"REMOVE"
	"item_lesser_crit"			"REMOVE"
	"item_recipe_armlet"			"REMOVE"
	"item_armlet"			"REMOVE"
	"item_recipe_invis_sword"			"REMOVE"
	"item_invis_sword"			"REMOVE"
	"item_recipe_sange_and_yasha"			"REMOVE"
	"item_sange_and_yasha"			"REMOVE"
	"item_recipe_satanic"			"REMOVE"
	"item_satanic"			"REMOVE"
	"item_recipe_mjollnir"			"REMOVE"
	"item_mjollnir"			"REMOVE"
	"item_recipe_skadi"			"REMOVE"
	"item_skadi"			"REMOVE"
	"item_recipe_sange"			"REMOVE"
	"item_sange"			"REMOVE"
	"item_recipe_helm_of_the_dominator"			"REMOVE"
	"item_helm_of_the_dominator"			"REMOVE"
	"item_recipe_maelstrom"			"REMOVE"
	"item_maelstrom"			"REMOVE"
	"item_recipe_desolator"			"REMOVE"
	"item_desolator"			"REMOVE"
	"item_recipe_yasha"			"REMOVE"
	"item_yasha"			"REMOVE"
	"item_recipe_mask_of_madness"			"REMOVE"
	"item_mask_of_madness"			"REMOVE"
	"item_recipe_diffusal_blade"			"REMOVE"
	"item_recipe_diffusal_blade_2"			"REMOVE"
	"item_diffusal_blade"			"REMOVE"
	"item_diffusal_blade_2"			"REMOVE"
	"item_recipe_ethereal_blade"			"REMOVE"
	"item_ethereal_blade"			"REMOVE"
	"item_recipe_soul_ring"			"REMOVE"
	"item_soul_ring"			"REMOVE"
	"item_recipe_arcane_boots"			"REMOVE"
	"item_arcane_boots"			"REMOVE"
	"item_orb_of_venom"			"REMOVE"
	"item_recipe_ancient_janggo"			"REMOVE"
	"item_ancient_janggo"			"REMOVE"
	"item_recipe_medallion_of_courage"			"REMOVE"
	"item_medallion_of_courage"			"REMOVE"
	"item_smoke_of_deceit"			"REMOVE"
	"item_recipe_veil_of_discord"			"REMOVE"
	"item_veil_of_discord"			"REMOVE"
	"item_recipe_rod_of_atos"			"REMOVE"
	"item_rod_of_atos"			"REMOVE"
	"item_recipe_abyssal_blade"			"REMOVE"
	"item_abyssal_blade"			"REMOVE"
	"item_recipe_heavens_halberd"			"REMOVE"
	"item_heavens_halberd"			"REMOVE"
	"item_recipe_ring_of_aquila"			"REMOVE"
	"item_ring_of_aquila"			"REMOVE"
	"item_recipe_tranquil_boots"			"REMOVE"
	"item_tranquil_boots"			"REMOVE"
	"item_shadow_amulet"			"REMOVE"
	"item_halloween_candy_corn"			"REMOVE"
	"item_mystery_hook"			"REMOVE"
	"item_mystery_arrow"			"REMOVE"
	"item_mystery_missile"			"REMOVE"
	"item_mystery_toss"			"REMOVE"
	"item_mystery_vacuum"			"REMOVE"
	"item_halloween_rapier"			"REMOVE"
	"item_greevil_whistle"			"REMOVE"
	"item_greevil_whistle_toggle"			"REMOVE"
	"item_present"			"REMOVE"
	"item_winter_stocking"			"REMOVE"
	"item_winter_skates"			"REMOVE"
	"item_winter_cake"			"REMOVE"
	"item_winter_cookie"			"REMOVE"
	"item_winter_coco"			"REMOVE"
	"item_winter_ham"			"REMOVE"
	"item_winter_kringle"			"REMOVE"
	"item_winter_mushroom"			"REMOVE"
	"item_winter_greevil_treat"			"REMOVE"
	"item_winter_greevil_garbage"			"REMOVE"
	"item_winter_greevil_chewy"			"REMOVE"
}
```

:::

## Cosmetic Values: Models, Effects, Tags and others.

These values are optional but greatly improve the quality of your item

### Sounds when Picked, Dropped

```
"UIPickupSound" "Item.PickUpRingShop" //Sound when acquiring the item
"UIDropSound" "Item.DropRecipeShop" //Sound when dropping the item manually
"WorldDropSound" "Item.DropGemWorld" //Sound when dropping the item on death (?)
```

### Модель и сияние в мире.

Файлы VMDL и Particle можно просмотреть через [Обозреватель ресурсов].
```
"Model" "models/chest_worlddrop.vmdl"
"Effect" "particles/generic_gameplay/dropped_item.vpcf"
```
Вы можете найти хорошие модели в /props_gameplay, /econ или использовать свои собственные настройки.

Важно: если вы создаете элемент через lua [CreateItemOnPositionSync], вам необходимо предоставить представление о мировой позиции, в которой создается элемент, хотя бы на короткое время, чтобы правильно отобразить эффект частиц.

### Изменить отображаемый цвет элемента
```
"ItemQuality"    "artifact" //Orange
                 "epic" //Purple
                 "rare" //Blue
                 "common" //Green
                 "component" //White
                 "consumable" //White
```

### Теги и псевдонимы

Теги определены в `addon_english.txt`, найдите их в [dota_english] в `// Tags`.
Псевдонимы помогают строке поиска быстро найти товар с помощью сокращений.
```
"ItemShopTags" "int;str;agi;mana_pool;health_pool;hard_to_tag"
"ItemAliases" "this;appears_in;search"
```
Опустить, чтобы не объявлять.
```
"ItemDeclarations" "DECLARE_PURCHASES_TO_TEAMMATES"
                   "DECLARE_PURCHASES_IN_SPEECH"
                   "DECLARE_PURCHASES_TO_SPECTATORS"
```

### Ограничения

Вот почему Башер запрещен для некоторых героев.
```
"InvalidHeroes" "npc_dota_hero_spirit_breaker;npc_dota_hero_faceless_void"
```
Более мощную версию со сценарием читайте на [Item Restrictions & Requirements](/scripting/item-restrictions-requirements).

## Alt-клик

Удерживая клавишу Alt, щелкните текст на предметах в инвентаре и бросьте их на землю. Берет строки из `resource/addon_english.txt`.
или любые другие языки.

### PingOverrideText

Переопределяет значение по умолчанию «[СОЮЗНИКИ] **ItemName** добавлено сюда».
Он будет искать _#DOTA_Chat_Text_String_ (_Text_String_ может быть любым) в строках вашего дополнения.
<StaticVideo path="/videos/RemarkableImportantAnt.mp4" />

В item_datadriven:```
"PingOverrideText" "DOTA_Chat_Text_String"
```В addon_english.txt:```
"DOTA_Chat_Text_String" "[VOLVO] Giff"
```

### ItemAlertable

Отображается «[СОЮЗНИКИ] Собирайтесь для **ItemName** здесь».

![img](/images/external/duiGf-025d66f1cd.jpg)
```
"ItemAlertable"	"1"
```

## Скелет базового предмета

Скопируйте это, чтобы начать элемент
```
"item_custom"
{
    "ID"           "1100"
    "BaseClass"    "item_datadriven"
    "AbilityTextureName" "item_rapier"
    "Model"        "models/props_gameplay/recipe.vmdl"
    "Effect"       "particles/generic_gameplay/dropped_item.vpcf"
    "ItemQuality"  "artifact"

    "ItemCost"     "322"
    "ItemKillable" "0"
    "ItemSellable" "1"
    "ItemPurchasable" "1"
    "ItemDroppable" "1"
    "ItemShareability" "ITEM_NOT_SHAREABLE"

    "SideShop"     "1"
    "SecretShop"   "0"

    "ItemStackable" "1"
    "ItemPermanent" "1"
    "ItemDisassembleRule" "DOTA_ITEM_DISASSEMBLE_ALWAYS"

    "AbilitySpecial"
    {
        "01"
        {
            "var_type"      "FIELD_INTEGER"
            "bonus_stat"    "100"
        }
    }

    "Modifiers"
    {
        "modifier_item_custom"
        {
            "Passive"  "1"
            "IsHidden" "1"
            "Attributes" "MODIFIER_ATTRIBUTE_MULTIPLE"
            "Properties"
            {
                "MODIFIER_PROPERTY_STATS_STRENGTH_BONUS" "%bonus_stat"
            }
        }
    }
}
```
Это самые важные ценности. Для зарядов, обновлений, звуков, псевдонимов и объявлений добавьте строки, описанные ранее. Я исключил их из основного макета, поскольку они не нужны для большинства элементов.

Я также добавил очень простой пассивный модификатор, который берет _bonus_stat_ из `AbilitySpecial` и дает 1 бонус к силе. Использование `AbilitySpecial` упрощает создание всплывающих подсказок и последующую настройку значений элементов без необходимости изменять указанные всплывающие подсказки.

## Добавление дополнительной статистики

Любое значение из [Modifier Constants](https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Scripting/Constants#Modifier_Properties) может быть добавлено в блок `"Properties"`, вот некоторые наиболее распространенные примеры:
```
    "Properties"
    {
        "MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT" "%bonus_attackspeed"
        "MODIFIER_PROPERTY_STATS_STRENGTH_BONUS" "%bonus_str"
        "MODIFIER_PROPERTY_STATS_AGILITY_BONUS" "%bonus_agi"
        "MODIFIER_PROPERTY_STATS_INTELLECT_BONUS" "%bonus_int"
        "MODIFIER_PROPERTY_HEALTH_BONUS"    "%bonus_hp"
        "MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT" "%bonus_health_regen"
        "MODIFIER_PROPERTY_MANA_BONUS"  "%bonus_hp"
        "MODIFIER_PROPERTY_MANA_REGEN_PERCENTAGE"  "%bonus_mana_regen"
        "MODIFIER_PROPERTY_BASEDAMAGEOUTGOING_PERCENTAGE"   "%bonus_damage_percent"
    }
```

## Заряженные расходные материалы

### Фолиант статистики

[item_tome_of_knowledge](https://github.com/MNoya/Warchasers/blob/master/scripts/npc/npc_items_custom.txt#L1475)

### Зелье здоровья

[item_potion_of_healing](https://github.com/MNoya/Warchasers/blob/master/scripts/npc/npc_items_custom.txt#L1844)
### Вызов

[item_demonic_figurine](https://github.com/MNoya/Warchasers/blob/master/scripts/npc/npc_items_custom.txt#L2967)

## Обновляемые предметы и рецепты

- См. [Reflex](https://github.com/bmddota/reflexdota/blob/source2/game/dota_addons/reflex/scripts/npc/npc_items_custom.txt).

Помимо этих значений, код предмета использует те же значения, управляемые данными, что и способности. См. [DataDriven Ability Breakdown](ability-keyvalues).

## Пассивные умения
### Ауры

`"AbilityBehavior" "DOTA_ABILITY_BEHAVIOR_AURA | DOTA_ABILITY_BEHAVIOR_PASSIVE"`

В блоке модификаторов:
```
    "Aura"  "custom_aura"
    "Aura_Teams"    "DOTA_UNIT_TARGET_TEAM_FRIENDLY"
    "Aura_Radius"   "%radius"
    "Aura_Types"    "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC"
    "Aura_Flags" "DOTA_UNIT_TARGET_FLAG_RANGED_ONLY"
```
Затем создайте новый блок модификаторов с именем Ауры и желаемыми эффектами.

### Постепенный урон

Внутри модификатора используйте `"ThinkInterval" "1"` и создайте блок `"OnIntervalThink"`, в котором вы наносите урон.
```
    "ThinkInterval" "1"
    "OnIntervalThink"
    {
        "Damage"
        {
             "Target"
             {
                 "Center" "CASTER"
                 "Radius" "%radius"
                 "Teams" "DOTA_UNIT_TARGET_TEAM_ENEMY"
                 "Types" "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC"
             }
             "Type" "DAMAGE_TYPE_MAGICAL"
             "Damage"   "%damage_per_second"
        }
    }
```

### Раскалывать

Внутри модификатора. Имейте в виду, что это будет работать на дальнем бою, поэтому вам нужно ограничить его при применении этого модификатора, если вам нужно.
```
    "OnAttackLanded"
    {
        "CleaveAttack"
        {
            "CleavePercent" "10"
            "CleaveRadius"  "140"
            "CleaveEffect"  "particles/units/heroes/hero_sven/sven_spell_great_cleave.vpcf"
        }
    }
```

### Крит

Существует свойство `MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE`, но оно не включает в себя шанс, поэтому вам нужно использовать DataDriven `Random` при запуске атаки и применить модификатор с критическим уроном, удалив его позже `OnAttackLanded`.

Первый `RemoveModifier` добавлен, чтобы запретить людям отменять атаки для получения гарантированного критического удара.
```
"modifier_crit"
{
    "Passive"   "1"
    "IsHidden"  "1"
    "OnAttackStart"
    {
        "RemoveModifier"
        {
            "ModifierName" "crit"
            "Target" "CASTER"
        }
        "Random"
        {
            "Chance" "%crit_chance"
            "OnSuccess"
            {
                "ApplyModifier"
                {
                    "ModifierName" "crit"
                    "Target"    "CASTER"
                }
            }
        }
    }
}

"crit"
{
    "IsHidden"  "1"
    "Properties"
    {
        "MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE" "%crit_bonus"
    }

    "OnAttackLanded"
    {
        "RemoveModifier"
        {
            "ModifierName"  "crit"
            "Target"    "CASTER"
        }

        // Basic blood particle effect
        "FireEffect"
        {
            "EffectName" "particles/units/heroes/hero_phantom_assassin/phantom_assassin_crit_impact.vpcf"
            "EffectAttachType"  "follow_origin"
            "Target"    "TARGET"
        }
    }
}
```

### Сфера: замедление и вампиризм с помощью специального снаряда.
```
"modifier_orb_of_frost"
{
    "Passive" "1"
    "IsHidden"  "1"
    "Attributes"    "MODIFIER_ATTRIBUTE_MULTIPLE"
    "Properties"
    {
        "MODIFIER_PROPERTY_BASEATTACK_BONUSDAMAGE" "6"
    }

    "Orb"
    {
        "Priority"  "DOTA_ORB_PRIORITY_ABILITY"
        "ProjectileName" "particles\items2_fx\skadi_projectile.vpcf"
    }

    "OnOrbImpact"
    {
        "Lifesteal"
        {
            "Target"    "ATTACKER"
            "LifestealPercent" "%bonus_lifesteal"
        }

        "ApplyModifier"
        {
            "Target"    "TARGET"
            "ModifierName"  "modifier_orb_of_frost_slow"
            "Duration"  "%slow_duration"
        }
    }
}

"modifier_orb_of_frost_slow"
{
    "IsDebuff" "1"
    "Duration"  "3"
    "Properties"
    {
        "MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE"  "%move_speed_slow"
        "MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT"  "%attack_speed_slow"
    }
    "EffectName"    "particles/generic_gameplay/generic_slowed_cold.vpcf"
    "EffectAttachType" "attach_hitloc"
    "Target" "TARGET"
}
```
Примечание. DataDriven Lifesteal может украсть вещи, которые вы не хотите воровать, лучше это сделать через [lua](https://github.com/MNoya/Warchasers/blob/master/scripts/npc/npc_abilities_custom.txt#L7041).

### Блокировать

Это непростая задача. Обратите внимание, что модификаторов снова 2.

Первый имеет `OnAttacked`, который случайным образом определяет вероятность блока, `OnSuccess` применяет модификатор блока, `OnFailure` удаляет его. Внутри block_modifier `OnAttacked` удаляет себя.

`OnCreated` предназначен для того, чтобы можно было заблокировать первый удар после надевания щита.
```
"shield_modifier"
{
    "Passive" "1"
    "IsHidden" "1"
    "Properties"
    {
        "MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS" "%magic_resistance"
    }
    "OnCreated"
    {
        "Random"
        {
            "Chance" "%block_chance"
            "OnSuccess"
            {
                "ApplyModifier"
                {
                    "Target" "CASTER"
                    "ModifierName" "block_modifier"
                }
            }
        }
    }
    "OnAttacked"
    {
        "Random"
        {
            "Chance" "%block_chance"
            "OnSuccess"
            {
                "ApplyModifier"
                {
                    "Target" "CASTER"
                    "ModifierName" "block_modifier"
                }
            }
            "OnFailure"
            {
                "RemoveModifier"
                {
                    "Target" "CASTER"
                    "ModifierName" "block_modifier"
                }
            }
        }
    }
}

"block_modifier"
{
    "IsBuff" "1"
    "IsHidden" "1"
    "Properties"
    {
        "MODIFIER_PROPERTY_PHYSICAL_CONSTANT_BLOCK" "%damage_blocked"
    }
    "OnAttacked"
    {
        "RemoveModifier"
        {
            "Target" "CASTER"
            "ModifierName" "block_modifier"
        }
    }
}
```
