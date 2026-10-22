---
title: Ключевые значения единиц измерения
author: Noya
steamId: '76561198046984233'
date: 22.04.2015
---
 единиц измерения

В этом документе описаны все значения ключа файла `npc_units_custom.txt`.

![img](/images/external/T7W828Q.png)

## Общие

Большинство названий юнитов начинаются с `npc_`, но это не обязательно. Базовое определение единицы измерения выглядит следующим образом:
```
"human_footman"
{
	// General
	//----------------------------------------------------------------
	"BaseClass"		"npc_dota_creature"
	"Model"			"models/heroes/dragon_knight/dragon_knight.vmdl"
	"ModelScale"		"0.8"
	"Level"			"2"
	"HealthBarOffset"	"140"
	"HasInventory"		"1"

	// Abilities
	//----------------------------------------------------------------
	"Ability1"		"human_defend"
	"Ability2"		"human_backpack"

	// Armor
	//----------------------------------------------------------------
	"ArmorPhysical"		"2"
	"MagicalResistance"	"0"

	// Attack
	//----------------------------------------------------------------
	"AttackCapabilities"	"DOTA_UNIT_CAP_MELEE_ATTACK"
	"AttackDamageType"	"DAMAGE_TYPE_ArmorPhysical"
	"AttackDamageMin"	"12.0"
	"AttackDamageMax"	"13.0"
	"AttackRate"		"1.35"
	"AttackAnimationPoint"	"0.5"
	"AttackAcquisitionRange" "500"
	"AttackRange"		"90"

	// Bounty
	//----------------------------------------------------------------
	"BountyGoldMin"		"26.0"
	"BountyGoldMax"		"38.0"

	// Bounds
	//----------------------------------------------------------------
	"BoundsHullName"	"DOTA_HULL_SIZE_HERO"
	"RingRadius"		"70"

	// Movement
	//----------------------------------------------------------------
	"MovementCapabilities"	"DOTA_UNIT_CAP_MOVE_GROUND"
	"MovementSpeed"		"270"
	"MovementTurnRate"	"0.6"

	// Status
	//----------------------------------------------------------------
	"StatusHealth"		"420"
	"StatusHealthRegen"	"0.25"
	"StatusMana"		"0"
	"StatusManaRegen"	"0"

	// Vision
	//----------------------------------------------------------------
	"VisionDaytimeRange"	"1400"
	"VisionNighttimeRange"	"800"

	// Team
	//----------------------------------------------------------------
	"TeamName"		"DOTA_TEAM_NEUTRALS"
	"CombatClassAttack"	"DOTA_COMBAT_CLASS_ATTACK_BASIC"
	"CombatClassDefend"	"DOTA_COMBAT_CLASS_DEFEND_STRONG"
	"UnitRelationShipClass"	"DOTA_NPC_UNIT_RELATIONSHIP_TYPE_DEFAULT"

	// Creature Data
	//----------------------------------------------------------------
	"Creature"
	{
		"DisableClumpingBehavior"	"1"
		"AttachWearables"
		{
			"Wearable1" { "ItemDef" "63" }
			"Wearable2" { "ItemDef" "64" }
			"Wearable3" { "ItemDef" "65" }
			"Wearable4" { "ItemDef" "66" }
			"Wearable5" { "ItemDef" "67" }
			"Wearable6" { "ItemDef" "68" }
		}
	}
}
```
Определение единиц измерения по умолчанию можно найти в [npc_units.txt](https://github.com/dotabuff/d2vpk/blob/master/dota_pak01/scripts/npc/npc_units.txt).

### Базовые классы

Существует множество классов для юнитов, но поскольку у нас нет особого контроля над их свойствами, лишь некоторые из них действительно полезны для пользовательских юнитов в целом:

- **_npc_dota_creature_**

  Самый полезный базовый класс, он не имеет каких-либо критических жестко запрограммированных свойств, поэтому это основной тип модуля для большинства модулей. Это также позволяет использовать блок «Существо», который рассматривается в следующем разделе. Он связан с типом цели `"DOTA_UNIT_TARGET_BASIC"` в способностях.
Однако есть одно простое свойство, налагаемое на этот тип юнита, которое по большей части полезно, но о нем полезно помнить: **способности автоматически улучшаются** до максимального уровня, если это возможно (ограничено уровнем\*2 существа, что означает, что существо 1-го уровня будет автоматически изучать свои способности до 2-го ранга). Конечно, это можно изменить с помощью Lua `SetLevel` для каждой способности.

- **_npc_dota_building_**

  Этот базовый класс, связанный с `"DOTA_UNIT_TARGET_BUILDING"`, может оказаться полезным во многих ситуациях.

  Ему наложены следующие свойства, над которыми мы **не имеем контроля**:
  - Неуязвим по умолчанию. Очень раздражает, его можно удалить через Lua с помощью `building_handle:RemoveModifierByName("modifier_invulnerable")`.
  - Видно сквозь туман. Это проблематично и вынуждает любую игру, которая хочет иметь стратегии строительства, использовать npc_dota_creature и определять индивидуальный урон здания, с некоторыми другими недостатками.
  - Никакого визуального поворота, даже если внутри юнит действительно меняет свой вектор движения вперед. Обычно это хорошо, эквивалентом такого поведения существа является состояние оглушения.
    <br />
    Стоит упомянуть, что `npc_dota_tower` является подклассом здания и запрограммирован для запуска таких вещей, как
дикторы, командный обмен золотом и агрессивный искусственный интеллект. Используйте npc_dota_building с атакой, чтобы строить башни.
    которые не вынуждены использовать эту механику.

- **_npc_dota_thinker_**

  Для фиктивных единиц. Подробнее об этом позже

<br />
В оставшейся части этого руководства мы будем использовать `"BaseClass" "npc_dota_creature"`.

### Уровень
```
"Level"                        "32"
```
![img](/images/external/ho10S-fe733ccd2e.jpg)

Доступ к этому уровню и его изменение можно получить с помощью Lua, используя различные функции существ.

### Модель и масштаб
```
"Model"                        "models/heroes/dragon_knight/dragon_knight.vmdl"
"ModelScale"                    "0.8"
```
Самоочевидно: получите модели через браузер ресурсов и установите их размер (по умолчанию будет использоваться «1»).

Существа, использующие модели, разобранные на косметическое оборудование, будут «голыми», если мы не прикрепим к ним носимые устройства. Подробнее об этом позже.

### Иконки мини-карты
```
"MinimapIcon" 				"minimap_candybucket"
"MinimapIconSize" 			"1000"
```
Производит:
![img](/images/external/ho19t-c5c7f7bb39.jpg)

### Метка устройства
```
"UnitLabel"                    "healing_ward"
```
Это может быть любое имя, его единственная полезная цель — использовать Lua `GetUnitLabel()`, который может работать как простой метод маркировки модулей.

## Логические значения и флаги
```
"HasInventory"                "1"
```
Связанные функции Lua: `HasInventory()` и `SetHasInventory(bool)`.

::: информация
`SetHasInventory(true)` не будет работать с устройствами, для которых ранее не был определен `"HasInventory"  "1"`.
:::
```
"IsSummoned"				"1"
"CanBeDominated"			"0"
```
Само собой разумеется, значения по умолчанию — 0 для призванных (поэтому lua IsSummoned всегда будет возвращать false, если вы не установите это) и 1 для доминируемых существ.

<br />
```
 "ConsideredHero" "1" 
```
`"DOTA_UNIT_TARGET_FLAG_NOT_CREEP_HERO"` флаг, управляемый данными. Дает юниту полосу здоровья в стиле героя:

![img](/images/external/ho2pt-c687566db4.jpg)

<br />
```
 "IsAncient" "1" 
```Связанная функция Lua: `IsAncient()`<br />`"DOTA_UNIT_TARGET_FLAG_NOT_ANCIENTS"` флаг, управляемые данные.

<br />```
 "IsNeutralUnitType" "1" 
```Связанная функция Lua: `IsNeutralUnitType()`

<br />```
 "CanBeDominated" "0" 
```
Специальный шлем Доминатора. Нет связанной функции Lua, но при желании ее легко прочитать из этого значения.

<br />
```
 "AutoAttacksByDefault" "0" 
```
Игнорирует настройку поведения автоматической атаки, запрещает автоатаку. Используется на Visage Familiars.

<br />
```
 "ShouldDoFlyHeightVisual" "0" 
```![img](/images/external/ho2MV-7f3e6d0fd8.jpg)

Выглядит сломанным, разницы нет.

<br />```
 "WakesNeutrals" "1" 
```
Отряд не будет агрессировать отряды нейтральной команды в пределах своего диапазона захвата.

## Свойства выбора
```
"SelectionGroup"               "string"
"SelectOnSpawn"                "1"
"IgnoreAddSummonedToSelection" "1"
```

- **SelectionGroup** сделает так, что все объекты этого типа будут в группе, доступ к которой можно получить через вкладку.

![img](/images/external/ho1rl-d0d5e48cd3.jpg)
_Я нажал Tab один раз, и все эти юниты были выбраны после определения их в одной контрольной группе_

- **SelectOnSpawn** заставляет юнит выбирать героя, даже если настройка «Автоматический выбор вызванных юнитов» отключена. Он используется в Visage Familiars.

- **IgnoreAddSummonedToSelection**, если установлено значение 1, заставляет функцию «Автоматический выбор вызванных юнитов» игнорировать этот юнит при его появлении. Используется на устройствах Brewmaster Primal Split.

## Звуки

```
"SoundSet"                     "Hero_DragonKnight"
"GameSoundsFile"               "soundevents/game_sounds_heroes/game_sounds_dragon_knight.vsndevts"
"IdleSoundLoop"                "Hero_DragonKnight.Tutorial_Intro"
```

- **SoundSet** с соответствующим соответствующим **GameSoundsFile** обрабатывает такие звуки, как атаки и шаги. Строка SoundSet должна быть первой частью каждого звука героя, что можно легко увидеть через [Dota 2 Sound Editor](https://github.com/pingzing/dota2-sound-editor).

- **IdleSoundLoop** будет воспроизводиться постоянно после появления юнита. У некоторых героев не определен зацикленный звук, но, как в примере выше, его можно использовать в качестве звука появления юнита, если добавить строку не зацикливающегося звука.

## Способности
```
"AbilityLayout"               "4"
"Ability1"                    ""            // Ability 1.
//"Ability2" ... up to "Ability16"
```
Юнит может одновременно иметь до 16 способностей.

`"AbilityLayout"` используется для встроенного пользовательского интерфейса Flash, чтобы изменить количество отображаемых способностей, и в настоящее время оно ограничено 4, 5 и 6 (все остальное будет работать неправильно)

## Статистика

По :valve: причинам статистика юнитов не отображается, но она есть.

### Физическая и магическая защита
```
"ArmorPhysical"                "0"
"MagicalResistance"            "0"
```

### Возможности атаки
```
"AttackCapabilities"         "DOTA_UNIT_CAP_NO_ATTACK"
```
Список возможностей атаки:

- `DOTA_UNIT_CAP_NO_ATTACK`
- `DOTA_UNIT_CAP_MELEE_ATTACK`
- `DOTA_UNIT_CAP_RANGED_ATTACK`

### Другие характеристики атак:
```
"AttackDamageMin"            "50"       // Damage range min.
"AttackDamageMax"            "40"       // Damage range max.
"AttackRate"                 "1.7"     // Speed of attack.
"AttackAnimationPoint"       "0.75"    // Normalized time in animation cycle to attack.
"AttackAcquisitionRange"     "800"     // Range within a target can be acquired.
"AttackRange"                "600"     // Range within a target can be attacked.
"AttackRangeBuffer"          "250"     // Extra range the target can move without canceling the attack
```

### Снаряды дальнего боя
```
"ProjectileModel"            "particles/units/heroes/hero_lina/lina_base_attack.vpcf"
"ProjectileSpeed"            "900"
```
Найдите частицы атаки героя/юнита с помощью браузера ресурсов, отфильтровав имя героя + «attack vpcf».

Если у вас есть механика «от ближнего боя до дальнего боя», в определении юнита должна быть указана скорость снаряда, иначе по умолчанию она будет равна 0, что фактически приведет к тому, что они никогда не достигнут своей цели.

### То, что мы могли бы сделать...
```
"AttackDamageType"           "DAMAGE_TYPE_ArmorPhysical"
```
Это видно в каждом файле модуля, но оно бесполезно/не поддерживается. В будущем мы можем увидеть, что его можно будет использовать для простого определения атак с воздуха/земли, магических атак и т. д., для чего в настоящее время требуются заскриптованные способности для имитации такого поведения.

### Статистика атрибутов

Атрибуты игнорируются для всего, что не является юнитом-героем, но поскольку все, что используется для определения юнитов, также может использоваться для npc_heroes_custom, это ключевые значения, все говорят сами за себя:
```
"AttributePrimary"             "DOTA_ATTRIBUTE_STRENGTH"
"AttributeBaseStrength"        "0"            // Base strength
"AttributeStrengthGain"        "0"            // Strength bonus per level.
"AttributeBaseAgility"         "0"            // Base agility
"AttributeAgilityGain"         "0"            // Agility bonus per level.
"AttributeBaseIntelligence"    "0"            // Base intelligence
"AttributeIntelligenceGain"    "0"            // Intelligence bonus per level.
```

### Баунти

Если вы хотите сделать какое-то сложное правило для опыта/золота, например, давать меньше опыта от этого отряда героям на определенном уровне, лучше оставить значения 0 и предоставлять его через lua.
```
"BountyXP"                    "0"            // Experience earn.
"BountyGoldMin"                "0"           // Gold earned min.
"BountyGoldMax"                "0"           // Gold earned max.
```

## Границы

Это определяет столкновение юнита с другими юнитами.
```
"BoundsHullName"            "DOTA_HULL_SIZE_HERO"
```Ссылка на размер:

| Значение | Радиус в точках Hammer |
| ----------------------- | ---------------------- |
| DOTA_HULL_SIZE_SMALL | 8 |
| DOTA_HULL_SIZE_REGULAR | 16 |
| DOTA_HULL_SIZE_SIEGE | 16 |
| DOTA_HULL_SIZE_HERO | 24 |
| DOTA_HULL_SIZE_HUGE | 80 |
| DOTA_HULL_SIZE_BUILDING | 81 |
| DOTA_HULL_SIZE_FILLER | 96 |
| DOTA_HULL_SIZE_BARRACKS | 144 |
| DOTA_HULL_SIZE_TOWER | 144 |

- Lua `SetHullRadius(float)` может изменить это значение на любое значение между 144 или даже выше.
```
"RingRadius"                "70"
```
Видимое кольцо выбора при выборе единицы измерения

![img](/images/external/ho2lF-02ab15803e.jpg)
```
"HealthBarOffset"           "250"
```
Высота от земли, на которой должна быть размещена шкала здоровья. По умолчанию для этого значения установлено значение «-1», чтобы использовать высоту модели по умолчанию. Чем больше Model и ModelScale, тем больше значение следует отрегулировать, чтобы это не выглядело странно.

![img](/images/external/ho2CK-8ae5a734d8.jpg)

## Движение
```
"MovementCapabilities"        "DOTA_UNIT_CAP_MOVE_NONE"
"MovementSpeed"               "300"       // Speed
"MovementTurnRate"            "0.5"       // Turning rate.
```
Список возможностей передвижения

- `DOTA_UNIT_CAP_MOVE_NONE`
- `DOTA_UNIT_CAP_MOVE_GROUND`
- `DOTA_UNIT_CAP_MOVE_FLY`

### Менее используемые значения, связанные с движением:
```
"HasAggressiveStance"         "0"
```
Воспроизводит альтернативную анимацию простоя/бега, когда рядом с врагами, например Модель Абаддона
```
"FollowRange"                 "100"
```
Расстояние, которое следует соблюдать при следовании. Healing Ward/Sigil имеет значение 250.

## Здоровье и мана
```
"StatusHealth"                "150"       // Base health.
"StatusHealthRegen"           "0"         // Health regeneration rate.
"StatusMana"                  "0"         // Base mana.
"StatusManaRegen"             "0"         // Mana regeneration rate.
```
**Примечания:**

- Отрицательное восстановление здоровья/маны не работает.
— Установка StatusMana на 0 приведет к отсутствию полосы маны.
- В настоящее время **нет возможности установить МАКСИМАЛЬНУЮ ману** в Lua! Модификацию запаса маны юнита необходимо выполнять с помощью блока существ и уровней.

### Редко используется:
```
"StatusStartingMana"          "-1"
```
-1 означает, что по умолчанию используется полная мана, что является значением по умолчанию. Его можно изменить на любое целочисленное значение, чтобы юниты не появлялись с заполненным пулом.

## Типы брони и атаки

Таблицу физических атак и типов брони можно найти [here in this link to the dota wiki](https://dota2.gamepedia.com/Attack_damage#Attack_damage_types).
```
"CombatClassAttack"           "DOTA_COMBAT_CLASS_ATTACK_HERO"
"CombatClassDefend"           "DOTA_COMBAT_CLASS_DEFEND_HERO"
```

### Таблица типового решения

| Имя | Дота-эквивалент |
| ------ | ------------------------------- |
| Нормальный | DOTA_COMBAT_CLASS_ATTACK_BASIC |
| Пирс | DOTA_COMBAT_CLASS_ATTACK_PIERCE |
| Осада | DOTA_COMBAT_CLASS_ATTACK_SIEGE |
| Хаос | DOTA_COMBAT_CLASS_ATTACK_LIGHT |
| Герой | DOTA_COMBAT_CLASS_ATTACK_HERO |
### Таблица типов брони
| Имя | Дота-эквивалент |
| --------- | ---------------------------------- |
| Небронированный | DOTA_COMBAT_CLASS_DEFEND_SOFT |
| Свет | DOTA_COMBAT_CLASS_DEFEND_WEAK |
| Средний | DOTA_COMBAT_CLASS_DEFEND_BASIC |
| Тяжелый | DOTA_COMBAT_CLASS_DEFEND_STRONG |
| Укрепленный | DOTA_COMBAT_CLASS_DEFEND_STRUCTURE |
| Герой | DOTA_COMBAT_CLASS_DEFEND_HERO |

## Зрение```
"VisionDaytimeRange"        "1200"        // Range of vision during day light.
"VisionNighttimeRange"      "1800"        // Range of vision at night time.
```
Обзор любого юнита не может превышать 1800, любое значение выше этого значения по умолчанию будет равно 1800.

<br />
## Класс отношений юнитов

Кажется, это не имеет никакого значения, может быть устарело или просто используется для внутренней маркировки вещей.
```
"UnitRelationshipClass"       "DOTA_NPC_UNIT_RELATIONSHIP_TYPE_DEFAULT"
```Список:

- `DOTA_NPC_UNIT_RELATIONSHIP_TYPE_BARRACKS`
- `DOTA_NPC_UNIT_RELATIONSHIP_TYPE_BUILDING`
- `DOTA_NPC_UNIT_RELATIONSHIP_TYPE_COURIER`
- `DOTA_NPC_UNIT_RELATIONSHIP_TYPE_DEFAULT`
- `DOTA_NPC_UNIT_RELATIONSHIP_TYPE_HERO`
- `DOTA_NPC_UNIT_RELATIONSHIP_TYPE_SIEGE`
- `DOTA_NPC_UNIT_RELATIONSHIP_TYPE_WARD`
## Lua VScript AI```
"vscripts"                    "path_to_ai_script.lua"
```
Это загрузит файл сценария Lua, как только модуль будет создан. С помощью функции Spawn (entityKeyValues) можно побудить мыслителя выполнять любую логику. Это очень простой пример отряда, который проходит серию путевых точек во время произнесения заклинаний в любое время, когда это возможно: [ai_tank_miniboss.lua](https://github.com/MNoya/Warchasers/blob/master/game/dota_addons/warchasers/scripts/vscripts/ai_tank_miniboss.lua).

## Нейтральное поведение

Когда вы добавляете крипа на карту и назначаете его нейтральной команде, по умолчанию он становится нейтральным. Если вы хотите использовать собственное поведение, отключите его:
```
"UseNeutralCreepBehavior" 	"0"
```

## Блок существ

Блок существ позволяет применять различные функции из KV, такие как базовый искусственный интеллект, бонусы к характеристикам в зависимости от уровня существа и носимые устройства.
Все эти настройки можно и нужно поместить в **один** блок существ, но в этом руководстве они будут разделены по категориям.

### Настройки и элементы статистики
```
"Creature"
{
  "CanRespawn"        "0"

  //Pathing Setting
  "DisableClumpingBehavior" "1"

  //Level Up Parameters
  "HPGain"           "10"
  "DamageGain"       "20"
  "ArmorGain"        "0.25"
  "MagicResistGain"  "0"
  "MoveSpeedGain"    "1"
  "BountyGain"       "3"
  "XPGain"           "15"

  "DisableResistance" "80.0"

  //Starting Items | Note: requires "HasInventory" "1" outside of creature block
  "EquippedItems"
  {
    "Maelstrom" { "Item"  "item_maelstrom" }
    "Treads" { "Item"  "item_power_treads" }
    "SnY" { "Item"  "item_sange_and_yasha" }
  }
}
```

### Носимые устройства

Дополнительную информацию см. в руководстве [this](/units/create-creature-attachwearable-blocks-directly-from-the-keyvalues).
```
"Creature"
{
  "AttachWearables"
  {
    "Wearable1" { "ItemDef" "101" }
    "Wearable2" { "ItemDef" "102" }
    "Wearable3" { "ItemDef" "103" }
  }
}
```

### Существо ИИ

Я настоятельно рекомендую вместо этого использовать [Lua for AI](#lua-vscript-ai), но все равно оставлю здесь некоторую информацию.
```
"Creature"
{
  // ?
  "PermanentDesire"  "1"

  "DefaultState"  "Invade"

  "States"
  {
    "Invade"
    {
      "Name"          "Invade"
      "Aggression"    "100.0"
      "Avoidance"     "0.0"
      "Support"       "0.0"
      "RoamDistance"  "2000.0"
    }
  }

  "OffensiveAbilities"
  {
    "Ability1"
    {
      "Name"        "broodmother_spawn_spiderlings"
    }
    "Ability2"
    {
      "Name"        "centaur_hoof_stomp"

      //Targeting Parameters
      "Radius"             "275"
      "MinimumTargets"     "2"
      "UseAtHealthPercent" "50"
      "UseSelfishly"       "1"

      //Ability Descriptors
      "AOE"          "1"
      "Debuff"       "1"
      "Buff"         "1"
      "Stun"         "1"
      "Damage"       "1"
      "Heal"         "1"
    }
  }
  "DefensiveAbilities"
  {
    "Ability1"
    {
      "Name"           "undying_tombstone"
      "AOE"            "1"
      "Radius"         "1000"
      "MinimumTargets" "1"
    }
  }
}
```
