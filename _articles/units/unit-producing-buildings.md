---
title: Здания, производящие единицы
author: Noya
steamId: '76561198046984233'
date: 08.03.2015
---
дания, производящие единицы

Это руководство по ответам на ветку вопросов. Я собираюсь объяснить подходы к написанию сценариев для полного создания юнитов в здании, включая обеспечение их управляемости и определение начальных приказов.

## Шаг 1. Файлы `npc_units_custom.txt`

Прежде всего, вам понадобится определение KeyValue для здания и отряда, который вы хотите создать.

В репозиториях [Warchasers](https://github.com/MNoya/Warchasers/tree/master/game/dota_addons/warchasers/scripts/npc/units) и [DotaCraft](https://github.com/MNoya/DotaCraft/tree/master/game/dota_addons/dotacraft/scripts/npc/units) есть много примеров модулей, поэтому я не думаю, что мне нужно много объяснять по этому поводу.

Однако здесь я хочу сделать одно особое замечание. **"BaseClass" "npc_dota_building" видно сквозь туман**.
Так что, если у вас есть проблемы с этим, не делайте свой отряд зданием, а вместо этого сделайте **npc_dota_creature**.

Здесь возникает проблема с существами, имеющими скорость поворота, поэтому дополнительно вам нужно будет применить к ним MODIFIER_STATE_STUNNED, сделать их невосприимчивыми к магии, чтобы большинство заклинаний не наносило им урона, и создать специальное правило для заклинаний, которые должны повреждать здания таким образом.

При этом мы не будем беспокоиться об этом в рамках данного руководства.

Я буду использовать упрощенную версию определения `human_barracks` со способностью «human_train_footman», возможности которой я раскрою позже.
```
"human_barracks"
{
	// General
	//----------------------------------------------------------------
	"BaseClass"					"npc_dota_building"
	"Model"						"models/props_structures/good_barracks_melee001.vmdl"
	"ModelScale"				"1"
	"Level"						"1"
	"HealthBarOffset"			"140"

	// Abilities
	//----------------------------------------------------------------
	"AbilityLayout"				"1"
	"Ability1"				"human_train_footman"

	// Armor
	//----------------------------------------------------------------
	"ArmorPhysical"				"5"
	"MagicalResistance"			"0"

	// Attack
	//----------------------------------------------------------------
	"AttackCapabilities"		"DOTA_UNIT_CAP_NO_ATTACK"
	"AttackDamageType"			"DAMAGE_TYPE_ArmorPhysical"
	"AttackDamageMin"			"0"
	"AttackDamageMax"			"0"

	// Bounty
	//----------------------------------------------------------------
	"BountyGoldMin"				"0.0"
	"BountyGoldMax"				"0.0"

	// Bounds
	//----------------------------------------------------------------
	"BoundsHullName"			"DOTA_HULL_SIZE_BARRACKS"
	"RingRadius"				"220"
	"CollisionSize"				"144"

	// Movement
	//----------------------------------------------------------------
	"MovementCapabilities"		"DOTA_UNIT_CAP_MOVE_NONE"	// Needed to cast Point abilities
	"MovementSpeed"				"0"

	// Status
	//----------------------------------------------------------------
	"StatusHealth"				"1200"
	"StatusHealthRegen"			"0"
	"StatusMana"				"0"
	"StatusManaRegen"			"0"

	// Vision
	//----------------------------------------------------------------
	"VisionDaytimeRange"		"900"
	"VisionNighttimeRange"		"600"

	// Team
	//----------------------------------------------------------------
	"TeamName"					"DOTA_TEAM_NEUTRALS"
	"CombatClassAttack"			"DOTA_COMBAT_CLASS_ATTACK_BASIC"
	"CombatClassDefend"			"DOTA_COMBAT_CLASS_DEFEND_STRUCTURE"
	"UnitRelationShipClass"		"DOTA_NPC_UNIT_RELATIONSHIP_TYPE_BUILDING"

}
```

## Шаг 2. Размещение вашего отряда на карте.

Для этого есть два основных варианта: один ориентирован на Hammer, а другой — полностью скриптовый подход.

### Молотовые отряды

Как описано в первой теме, вы можете указать и щелкнуть, чтобы добавить объект на карту со всеми видами свойств.

Проблема такого подхода в том, что хоть здание и является «частью вашей команды», вы не имеете над ним контроля, точно так же, как вы не можете контролировать автоатаки Башен в Доте.
Чтобы решить эту проблему, нам нужно использовать пару строк в lua, в основном `SetOwner` и `SetControllableByPlayer` [API functions](https://moddota.com/api/#!/vscripts/CBaseEntity).

`[CBaseEntity] void SetOwner( handle_owningEntity )` **-- Устанавливает владельца объекта**

`[CDOTA_BaseNPC] void SetControllableByPlayer( int, bool )` **-- Сделайте этот юнит управляемым игроком.**

Чтобы правильно вызывать эти функции, я предполагаю, что вы уже знаете основы, описанные в [Beginners Guide to Scripting](/scripting-introduction), и просто объясню, где вам следует их вызывать, на примере.

Хороший хук GameMode для их вызова будет после dota_player_picked_hero, поэтому при наличии стандартного прослушивателя, такого как этот:
```
lua
ListenToGameEvent('dota_player_pick_hero', Dynamic_Wrap(GameMode, 'OnPlayerPickHero'), self)
```
В OnPlayerPickHero вам нужно **найти дескриптор BaseEntity/BaseNPC**, то есть устройства, которому вы хотите изменить владение и состояние управления.

Это можно сделать несколькими способами, например, используя функции, определенные в [CEntities](https://moddota.com/api/#!/vscripts/CEntities). Мы хотим, чтобы у этого здания был уникальный идентификатор, чтобы его было легко найти, поэтому в Hammer выберите его, зайдите в его свойства и дайте ему имя (я использую для этого горячую клавишу Alt+Enter):

![img](/images/external/gs6Ec-c0a81f34ae.jpg)

Теперь вы можете выполнить поиск по зданию и получить для него локальную переменную с помощью этой строки:
```
lua
local building = Entities:FindByName(nil, "building_barracks1")
```
Примечание. **Не забудьте выбрать «Объекты» при построении карты**!

Функция OnPlayerPickHero должна выглядеть следующим образом:
```
lua
function GameMode:OnPlayerPickHero(keys)
    local hero = EntIndexToHScript(keys.heroindex)
    local player = EntIndexToHScript(keys.player)
    local playerID = hero:GetPlayerID()

    local building = Entities:FindByName(nil, "building_barracks1")
    building:SetOwner(hero)
    building:SetControllableByPlayer(playerID, true)
end
```
Теперь ваше здание должно быть полностью управляемым для использования способностей и даже вычитать золото из игрока, если вы используете способности, требующие стоимости золота.

### Скриптовый подход

Эй, Хаммер хорош и все такое, но его поведение очень статично. Вам нужно иметь заранее определенные позиции для юнитов, строить карту каждый раз, когда вы вносите изменения, и не можете не создавать ни одного из них, если игроков меньше, чем ожидалось, и т. д.

Существует полностью скриптовый метод размещения юнитов на карте, который осуществляется с помощью функции `CreateUnitByName` с некоторыми дополнительными преимуществами.

`handle CreateUnitByName( szUnitName, vLocation, bFindClearSpace, hNPCOwner, hUnitOwner, iTeamNumber )`
По-прежнему работая внутри того же OnPlayerPickHero, мы можем либо создать статическую позицию для каждого playerID, например _Vector(450,322,128)_, выполняя случайные позиции с именованными объектами info_target в Hammer, либо динамическую позицию, основанную на месте появления героя. Давайте сделаем последнее:
```
lua
local origin = hero:GetAbsOrigin() -- Spawn position
local fv = hero:GetForwardVector() -- Vector the hero is facing
local distance = 300
local position = origin + fv * distance
```
Это определит вектор, обращенный на 300 единиц в направлении, в котором смотрит герой.

Теперь CreateUnitByName следует вызывать следующим образом:
```
lua
local building = CreateUnitByName("human_barracks", position, true, hero, hero, hero:GetTeamNumber())
```
Несмотря на то, что мы установили hNPCOwner и hUnitOwner, SetOwner и SetControllableByPlayer по-прежнему необходимы.

#### Создание неуязвимости

Есть небольшая проблема с базовым классом npc_dota_building, которая заключается в том, что по умолчанию они появляются с «modifier_invulnerable». Чтобы избавиться от этого, запустите эту строку:
```
lua
building:RemoveModifierByName("modifier_invulnerable")
```

#### Я уже упоминал, что в зданиях могут быть ошибки?

Есть еще одна проблема: здания иногда создаются не там, где вы хотите, а вместо этого застревают в позиции (0,0,0), поэтому, если это произойдет, добавьте это:
```
lua
Timers:CreateTimer(function() building:SetAbsOrigin(position) end)
```
Подождите 1 кадр, и с помощью timers4life BMD ваше здание наконец появится в правильном положении.

#### Прекэш

И последнее, это требование Unit's Precache. В отличие от юнитов, добавленных в Hammer, lua CreateUnitByName не будет запускать блоки precache {} способностей юнита или модели, поэтому нам нужно сделать это вручную либо в `addon_game_mode.lua`, либо в PostLoadPrecache(), если вы беспокоитесь о том, что ваши клиенты не загружаются должным образом. В этом случае я просто воспользуюсь первым методом:
```
lua
function Precache( context ) -- Find this in addon_game_mode.lua
    PrecacheUnitByNameSync("human_barracks", context)
end
```
Сделанный! Полный код спауна здания перед героем выглядит так:
```
lua
function GameMode:OnPlayerPickHero(keys)
    local hero = EntIndexToHScript(keys.heroindex)
    local player = EntIndexToHScript(keys.player)
    local playerID = hero:GetPlayerID()

    -- Choose a Position
    local origin = hero:GetAbsOrigin() -- Spawn position
    local fv = hero:GetForwardVector() -- Vector the hero is facing
    local distance = 300
    local position = origin + fv * distance

    -- Spawning
local building = CreateUnitByName("human_barracks", position, true, hero, hero, hero:GetTeamNumber())
    building:SetOwner(hero)
    building:SetControllableByPlayer(playerID, true)
    building:SetAbsOrigin(position)
    building:RemoveModifierByName("modifier_invulnerable")
```
<br />

## Шаг 3. Написание скрипта возможности появления юнитов внутри здания

Теперь, когда у нас есть полностью работающее здание в игре, давайте перейдем к npc_abilities_custom.txt и созданию существ, появляющихся из этого здания.

Есть два основных способа сделать это: с помощью действия DataDriven «SpawnUnit» или просто с помощью функции `CreateUnitByName` Lua, как объяснялось ранее.

### DataDriven "SpawnUnit"
На самом деле я предпочитаю это действие DD и широко использую его на всех этапах появления юнитов в DotaCraft, потому что оно имеет доступ к очень полезному подсобытию `"OnSpawn"`, которое доступно только через это действие, а также имеет некоторые другие параметры для количества юнитов, ограничения (поэтому вы не можете иметь более X юнитов одного и того же юнита одновременно), интеграции modifier_kill и т. д.

Конечно, вы можете прослушивать игровое событие появления юнита и делать там свои действия OnSpawn, но это делает эту возможность менее модульной и ее сложнее поддерживать.

SpawnUnit следует использовать следующим образом и он включен во фрагменты Sublime Dota KV:
```
"SpawnUnit"
{
    "UnitName"       "npc_name"
    "Target"         "CASTER"
    "Duration"       "%duration"
    "UnitCount"      "1"
    "UnitLimit"      "0"
    "GrantsGold"     "1"
    "GrantsXP"       "1"
    "SpawnRadius"    "10"
    "OnSpawn"
    {
        "ApplyModifier"
        {
            "ModifierName"  "modifier_phased"
            "Target"        "TARGET"
            "Duration"      "0.03"
        }
        [ACTIONS]
    }
}
```
Применение «modifier_phased» на 1 кадр предназначено для предотвращения застревания юнитов, например, если вы применяете способность непосредственно к заклинателю, без фазировки, она застрянет в одной и той же точке, и оба юнита не смогут двигаться. Это похоже на запуск Lua `FindClearSpaceForUnit`, потому что как только фазировка закончится, юниты попытаются найти пустую позицию.

Юниты, созданные этой функцией, уже находятся под контролем владельца здания.

Внутри «OnSpawn», заменяющего [ACTIONS], полезно отправлять приказы отряду, на который в lua можно ссылаться как на event.target.

Вот полный пример:
```
"human_train_footman"
{
    "BaseClass"             "ability_datadriven"
    "AbilityTextureName"    "footman"
    "MaxLevel"              "1"

    "AbilityBehavior"    "DOTA_ABILITY_BEHAVIOR_NO_TARGET"

    "AbilityGoldCost"    "10"

    "OnSpellStart"
    {

        "SpawnUnit"
        {
            "UnitName"    "footman"
            "Target"      "CASTER"
            "UnitCount"   "1"
            "UnitLimit"   "0"
            "GrantsGold"  "1"
            "GrantsXP"    "1"
            "SpawnRadius" "100"
            "OnSpawn"
            {
                "ApplyModifier"
                {
                    "ModifierName" "modifier_phased"
                    "Target"       "TARGET"
                    "Duration"     "0.03"
                }
                "RunScript"
                {
                    "ScriptFile"    "buildings/rally_point.lua"
                    "Function"      "MoveToRallyPoint"
                }
            }
        }
    }
}
```
Определение лакея — это просто Рыцарь-Дракон с некоторыми носимыми устройствами:
```
//=================================================================================
// Creature: Footman
//=================================================================================
"human_footman"
{
	// General
	//----------------------------------------------------------------
	"BaseClass"					"npc_dota_creature"
	"Model"						"models/heroes/dragon_knight/dragon_knight.vmdl"
	"ModelScale"				"0.8"
	"Level"						"2"
	"HealthBarOffset"			"140"

	// Armor
	//----------------------------------------------------------------
	"ArmorPhysical"				"2"
	"MagicalResistance"			"0"

	// Attack
	//----------------------------------------------------------------
	"AttackCapabilities"		"DOTA_UNIT_CAP_MELEE_ATTACK"
	"AttackDamageType"			"DAMAGE_TYPE_ArmorPhysical"
	"AttackDamageMin"			"12.0"
	"AttackDamageMax"			"13.0"
	"AttackRate"				"1.35"
	"AttackAnimationPoint"		"0.5"
	"AttackAcquisitionRange"	"500"
	"AttackRange"				"90"

	// Bounty
	//----------------------------------------------------------------
	"BountyGoldMin"				"26.0"
	"BountyGoldMax"				"38.0"

	// Bounds
	//----------------------------------------------------------------
	"BoundsHullName"			"DOTA_HULL_SIZE_HERO"
	"RingRadius"				"70"
	"CollisionSize"				"31"
	"FormationRank"				"0"

	// Building Cost Stats
	//----------------------------------------------------------------
	"GoldCost"					"135"
	"LumberCost"				"0"
	"FoodCost"					"2"
	"BuildTime"					"20"

	// Movement
	//----------------------------------------------------------------
	"MovementCapabilities"		"DOTA_UNIT_CAP_MOVE_GROUND"
	"MovementSpeed"				"270"
	"MovementTurnRate"			"0.6"

	// Status
	//----------------------------------------------------------------
	"StatusHealth"				"420"
	"StatusHealthRegen"			"0.25"
	"StatusMana"				"0"
	"StatusManaRegen"			"0"

	// Vision
	//----------------------------------------------------------------
	"VisionDaytimeRange"		"1400"
	"VisionNighttimeRange"		"800"

	// Team
	//----------------------------------------------------------------
	"TeamName"					"DOTA_TEAM_NEUTRALS"
	"CombatClassAttack"			"DOTA_COMBAT_CLASS_ATTACK_BASIC"
	"CombatClassDefend"			"DOTA_COMBAT_CLASS_DEFEND_STRONG"
	"UnitRelationShipClass"		"DOTA_NPC_UNIT_RELATIONSHIP_TYPE_DEFAULT"

	// Creature Data
	//----------------------------------------------------------------
	"Creature"
	{
		"DisableClumpingBehavior"	"1"
		"AttachWearables"
		{
			"Wearable1"		{	"ItemDef"		"6789"		} //"Shield of Ascension"
			"Wearable2"		{	"ItemDef"		"6791"		} //"Pauldrons of Ascension"
			"Wearable3" 	        {	"ItemDef"		"6790"		} //"Gauntlets of Ascension"
			"Wearable4"		{	"ItemDef"		"6788"		} //"Drapes of Ascension"
			"Wearable5"		{	"ItemDef"		"6787"		} //"Sword of Ascension"
			"Wearable6"		{	"ItemDef"		"6792"		} //"Helm of Ascension"
		}
	}
}
```
Обратите внимание на использование RunScript для вызова функции MoveToRallyPoint. Это познакомит вас с четвертым и последним шагом этого руководства.

## Заказы

После появления юнита можно выполнять различные приказы.

Попробуйте использовать `ExecuteOrderFromTable`, чтобы избежать потери приказов из-за того, что юнит делает что-то еще (например, нерестится). Если вы хотите использовать более простые функции, такие как `MoveToPosition`, вам может потребоваться добавить таймеры, чтобы убедиться, что юнит готов выполнить приказ.

Кроме того, необходимо изменить Владение отрядом на **дескриптор героя**, поскольку заклинатель — это существо, и оно не может получить золото!
```
lua
function MoveToRallyPoint( event )
    local caster = event.caster
    local target = event.target

    -- Change this to your desired Vector, usually as an hscript:GetAbsOrigin()
    local position = Vector(420,322,128)

    ExecuteOrderFromTable({ UnitIndex = target:GetEntityIndex(),
                            OrderType = DOTA_UNIT_ORDER_MOVE_TO_POSITION,
                            Position = position, Queue = true })
    print(target:GetUnitName().." moving to position",position)

    local player = caster:GetPlayerOwner()
    local hero = player:GetAssignedHero()
    target:SetOwner(hero)
end
```
