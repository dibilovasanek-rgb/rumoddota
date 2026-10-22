---
title: Ключевые значения способностей
author: Noya
steamId: '76561198046984233'
date: 10.12.2014
---
начения способностей

## Способность, управляемая данными

Способность DataDriven — это коллекция _KeyValues_. KeyValues ​​— это простые древовидные структуры, используемые для хранения вложенных разделов, содержащих пары ключ/значение.

Возможности DataDriven определены внутри `scripts/npc/npc_abilities_custom.txt` в папке дополнений к игре.

Этот скелет содержит множество ключевых значений, которые будут подробно описаны в этой документации.
```
"datadriven_skeleton"
{
    // General
    // ----------------------------------------------------------------------------------------
    "BaseClass"              "ability_datadriven"
    "AbilityBehavior"        "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET"
    "AbilityTextureName"     "spellicon"
    "AbilityUnitTargetTeam"  "DOTA_UNIT_TARGET_TEAM_ENEMY"
    "AbilityUnitTargetType"  "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC"
    "AbilityUnitTargetFlags" "DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES"
    "AbilityUnitDamageType"  "DAMAGE_TYPE_MAGICAL"

    "AbilityType"            "DOTA_ABILITY_TYPE_BASIC"
    "MaxLevel"               "7"
    "RequiredLevel"          "-4"
    "LevelsBetweenUpgrades"  "7"

    "AbilityCastPoint"       "0.0"
    "AbilityCastAnimation"   "ACT_DOTA_ATTACK"
    "AnimationPlaybackRate"  "1"
    "AnimationIgnoresModelScale" "1"

    // Stats
    //----------------------------------------------------------------------------------------
    "AbilityDamage"           "0 0 0 0"
    "AbilityManaCost"         "0 0 0 0"
    "AbilityCooldown"         "0.0 0.0 0.0 0.0"
    "AbilityCastRange"        "0"
    "AbilityCastRangeBuffer"  "250"
    "AbilityChannelTime"      "0.0 0.0 0.0 0.0"
    "AbilityChannelledManaCostPerSecond" "30 35 40 45"
    "AbilityDuration"         "0.0 0.0 0.0 0.0"
    "AoERadius"               "250"

    // ...
}
```

## Базовый класс

BaseClass может быть любым именем способности Dota по умолчанию или «ability_datadriven», что позволяет использовать всю систему способностей, управляемую данными.

Использование способности dota в качестве базового класса может осуществляться либо как переопределение способности (входит в `npc_abilities_override.txt`), либо просто как новая способность в `npc_abilities_custom.txt`, которая наследует открытые переменные. Однако это не позволяет нам изменять/добавлять его внутреннюю структуру, поскольку этот код заблокирован в коде C++.

Здесь мы сосредоточимся на всем, что касается написания пользовательских способностей с нуля, используя `"BaseClass" "ability_datadriven"`.

## СпособностьПоведение
Здесь описывается, как работает способность, и общее поведение при ее применении.

Вы можете использовать разные варианты поведения вместе, разделяя их пробелами и | трубы.

Пример:
```
"DOTA_ABILITY_BEHAVIOR_CHANNELLED | DOTA_ABILITY_BEHAVIOR_NO_TARGET"
```

### Список всех возможных способностейПоведение

| **СпособностьПоведение** | **Описание** |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DOTA_ABILITY_BEHAVIOR_NO_TARGET | Для применения не требуется цель. <br/> Способность срабатывает при нажатии кнопки.                                                                             |
| DOTA_ABILITY_BEHAVIOR_UNIT_TARGET | Нужна цель для применения. <br/> Требуются `AbilityUnitTargetTeam` и `AbilityUnitTargetType`, см. раздел «Нацеливание».                                                        |
| DOTA_ABILITY_BEHAVIOR_POINT | Можно использовать в любом месте, где находится курсор мыши. <br/> Если щелкнуть по юниту, он будет применен туда, где он стоял.                                                 |
| DOTA_ABILITY_BEHAVIOR_PASSIVE | Невозможно применить.                                                                                                                                                         |
| DOTA_ABILITY_BEHAVIOR_CHANNELLED | Направляемая способность.<br/>Если пользователь двигается или находится в состоянии молчания/оглушения, способность прерывается.                                                                           |
| DOTA_ABILITY_BEHAVIOR_TOGGLE | Можно включить/выключить.                                                                                                                                                  |
| DOTA_ABILITY_BEHAVIOR_AURA | Способность — это аура. <br/> На самом деле не используется, кроме как для обозначения способности как таковой.                                                                                          |
| DOTA_ABILITY_BEHAVIOR_AUTOCAST | Может быть применено автоматически. <br/>Обычно не работает сам по себе ни в чем, кроме способности АТАКИ.                                                                |
| DOTA_ABILITY_BEHAVIOR_HIDDEN | Невозможно применить и не отображается в HUD.                                                                                                                            |
| DOTA_ABILITY_BEHAVIOR_AOE | Можно нарисовать радиус, в котором способность будет иметь эффект. <br/>Как ТОЧКА, но с отображением области действия. <br/>Использует `AOERadius`.                                 |
| DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE | Невозможно изучить, нажав на HUD.<br/>Пример: способности Invoker.                                                                                             |
| DOTA_ABILITY_BEHAVIOR_ITEM | Способность привязана к предмету. Нет необходимости использовать это, игра внутренне назначит такое поведение любому `"item_datadriven"`.                                     |
| DOTA_ABILITY_BEHAVIOR_DIRECTIONAL | Имеет направление от героя.<br/>Примеры: Стрела Мираны или Крюк Пуджа.                                                                                           |
| DOTA_ABILITY_BEHAVIOR_IMMEDIATE | Можно использовать мгновенно, не переходя в очередь действий.                                                                                                             |
| DOTA_ABILITY_BEHAVIOR_NOASSIST | Способность не имеет помощи прицела. (?) |
| DOTA_ABILITY_BEHAVIOR_ATTACK | Является атакой и не может поразить цели с иммунитетом к атаке.                                                                                                                     |
| DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES | Невозможно использовать при рутировании.                                                                                                                                             |
| DOTA_ABILITY_BEHAVIOR_UNRESTRICTED | Способность разрешена, когда команды ограничены. <br/>Пример: Поглощение Lifestealer.                                                                                    |
| DOTA_ABILITY_BEHAVIOR_DONT_ALERT_TARGET | Не предупреждает врагов при применении к ним цели. <br/>Пример: Spirit Breaker Charge.                                                                                  |
| DOTA_ABILITY_BEHAVIOR_DONT_RESUME_MOVEMENT | Не должно возобновлять движение после завершения.<br/>Применимо только к нецелевым и немгновенным способностям.                                                                |
| DOTA_ABILITY_BEHAVIOR_DONT_RESUME_ATTACK | Способность не должна возобновлять командную атаку предыдущей цели после ее завершения. <br/>Применимо только к нецелевым, немгновенным способностям и способностям, нацеленным на юнит. |
| DOTA_ABILITY_BEHAVIOR_NORMAL_WHEN_STOLEN | При краже способности по-прежнему используется обычная точка применения.<br/>Примеры: Пуф Мипо, Телепорт Фуриона.                                                                    |
| DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING | Способность игнорирует псевдоочередь обратного хода.                                                                                                                                  |
| DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE | Может быть выполнен во время оглушения, произнесения заклинания или силовой атаки. Применимо только к переключаемым способностям. <br/>Пример: изменение атрибута Морфлинга.                             |
| DOTA_ABILITY_BEHAVIOR_RUNE_TARGET | Целевые руны.                                                                                                                                                          |
| DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL | Не отменяет способности с поведением `_CHANNELED`.                                                                                                                    |
| DOTA_ABILITY_BEHAVIOR_OPTIONAL_UNIT_TARGET | Бутылка и варды.                                                                                                                                                       |
| DOTA_ABILITY_BEHAVIOR_OPTIONAL_NO_TARGET | (?) |

### Подсказки по поведению
Следующие действия приведут к появлению строки во всплывающей подсказке способности. Вам нужно хотя бы одно поведение из этого списка. Остальные варианты поведения способностей пока не поддерживаются пользовательским интерфейсом.

Пользовательский интерфейс может отображать только одну всплывающую подсказку о поведении, но внутри он будет вести себя так, как ожидалось, пока два противоречащих друг другу ключа не используются вместе (например, _NO_TARGET_ с _UNIT_TARGET_).

| **СпособностьПоведение** | **СПОСОБНОСТЬ: _Всплывающая подсказка_** | **Имеет приоритет над:** |
| --------------------------------- | ---------------------- | -------------------------- |
| DOTA_ABILITY_BEHAVIOR_NO_TARGET | **Нет цели** |                            |
| DOTA_ABILITY_BEHAVIOR_UNIT_TARGET | **Цель подразделения** | ТОЧКА |
| DOTA_ABILITY_BEHAVIOR_POINT | **Точечная цель** |                            |
| DOTA_ABILITY_BEHAVIOR_PASSIVE | **Пассивный** |                            |
| DOTA_ABILITY_BEHAVIOR_CHANNELLED | **Направленный** | ТОЧКА и ЕДИНИЦА |
| DOTA_ABILITY_BEHAVIOR_TOGGLE | **Переключить** | ТОЧКА и ЕДИНИЦА |
| DOTA_ABILITY_BEHAVIOR_AURA | **Аура** | ПАССИВНЫЙ |
| DOTA_ABILITY_BEHAVIOR_AUTOCAST | **Автотрансляция** | UNIT_TARGET |

Например, способность с```
"AbilityBehavior" "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET | DOTA_ABILITY_BEHAVIOR_CHANNELED"
```
будет показано так:

![img](/images/external/xYjIXM8.jpg)

## Тип Способности

Если этого не сделать, по умолчанию будет DOTA_ABILITY_TYPE_BASIC.

| **Тип способности** | **Описание** |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| DOTA_ABILITY_TYPE_BASIC | Обычная способность, которую можно изучить на уровне 1 и улучшать каждые 2 уровня.                                                               |
| DOTA_ABILITY_TYPE_ULTIMATE | Между улучшениями 5 уровней, и для того, чтобы потратить на него первое очко, требуется уровень 6. <br/>Также помечает эту способность как максимальную для HUD. |
| DOTA_ABILITY_TYPE_ATTRIBUTES | Используется для атрибута_bonus.                                                                                                          |
| DOTA_ABILITY_TYPE_HIDDEN | Зачем?                                                                                                                          |

Кроме того, интервалы и ограничения уровней способностей можно напрямую изменить с помощью этих ключевых значений внутри блока способностей:

### Максимальный уровень

В настоящее время пользовательский интерфейс поддерживает следующие уровни способностей: 1, 3, 4 и 7.

Вы по-прежнему можете использовать любое целочисленное значение в качестве MaxLevel, и оно будет назначать правильные значения уровней внутри, но оно будет использовать комбинацию этих номеров отображения пользовательского интерфейса, а затем «начнет заново» для другого пользовательского интерфейса.
_Пример_:
```
"MaxLevel" "10"
```

### Требуемый уровень

На каком уровне впервые можно изучить эту способность? Это принимает отрицательные значения, чтобы навыки можно было развивать в любой момент, поскольку следующее значение устанавливает уровни между рангами способностей, включая первый.

### УровниМеждуОбновлениями

Сколько уровней нужно подождать, чтобы получить возможность выучить следующий ранг.

_Пример_:
```
"MaxLevel"              "7"
"RequiredLevel"         "-4"
"LevelsBetweenUpgrades" "7"
```
В результате появляется способность, которую можно сначала освоить на уровнях 3/10/17/24/31/38/45.

Максимальный уровень героев можно изменить с помощью Lua `SetCustomHeroMaxLevel(MAX_LEVEL)` [API function](https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Scripting/API).

## ИмяТекстуры Способности

Имя файла значка, которое следует использовать в пользовательском интерфейсе для этой возможности. Вы можете повторно использовать значок из другого, просто указав здесь имя этой способности, если хотите. Внутреннее имя каждой способности Dota по умолчанию можно найти в: [Built-In Ability Names](https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Scripting/Built-In_Ability_Names).

Чтобы использовать свои собственные значки, поместите их в `resources/flash3/images/spellicons` в папке дополнений к игре и просто ссылайтесь на имя изображения без пути или расширения.
**Формат**: 128 x 128 PNG.
```
"AbilityTextureName" "warchasers_buff"
```
![img](/images/external/PvTBUis.png)

### Отклонить самоиспользование

Добавлено в Reborn:
```
"CastFilterRejectCaster" "1"
```

### В ролях, находясь в скрытом состоянии

Добавлено в Reborn:
```
"IsCastableWhileHidden" "1"
```

## Таргетинг

Три ключевых элемента задают правила выбора целей: [**Team**](#team), [**Type**](#type) и [**Flags**](#flags).

### Команда

| **AbilityUnitTargetTeam** | **Описание** |
| ------------------------------ | -------------------------- |
| DOTA_UNIT_TARGET_TEAM_BOTH | Все |
| DOTA_UNIT_TARGET_TEAM_ENEMY | Враг |
| DOTA_UNIT_TARGET_TEAM_FRIENDLY | Союзники |
| DOTA_UNIT_TARGET_TEAM_NONE | Значение по умолчанию при отсутствии. |
| DOTA_UNIT_TARGET_TEAM_CUSTOM | (?) |

### Тип

| **AbilityUnitTargetType** | **Цели** |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| DOTA_UNIT_TARGET_ALL | Всё, включая скрытые сущности.                                                                                                       |
| DOTA_UNIT_TARGET_HERO | npc_dota_hero Heroes.<br/>DOTA_NPC_UNIT_RELATIONSHIP_TYPE_HERO |
| DOTA_UNIT_TARGET_BASIC | Основные юниты, включая призывы.                                                                                                              |
| DOTA_UNIT_TARGET_MECHANICAL | `npc_dota_creep_siege`<br/>DOTA_NPC_UNIT_RELATIONSHIP_TYPE_SIEGE |
| DOTA_UNIT_TARGET_BUILDING | `npc_dota_tower`, `npc_dota_building`<br/>DOTA_NPC_UNIT_RELATIONSHIP_TYPE_BUILDING |
| DOTA_UNIT_TARGET_TREE | `ent_dota_tree`<br/>Примеры: Танго, Подавляющий клинок.                                                                                        |
| DOTA_UNIT_TARGET_CREEP | `npc_dota_creature`, `npc_dota_creep`<br/>То же, что и BASIC, но _может_ не включать в себя такие вещи, как некоторые призывы.<br/>Примеры: «Пакт смерти», «Пожирание». |
| DOTA_UNIT_TARGET_COURIER | `npc_dota_courier`, `npc_dota_flying_courier`<br/>DOTA_NPC_UNIT_RELATIONSHIP_TYPE_COURIER |
| DOTA_UNIT_TARGET_NONE | Ничего!                                                                                                                                     |
| DOTA_UNIT_TARGET_OTHER | Все, что не входит в предыдущие виды.                                                                                               |
| DOTA_UNIT_TARGET_CUSTOM | Не раскрыто? <br/>Примеры: Репликация, Разделение, Демоническое обращение, Привязь, Заражение... |

### Флаги

Флаги позволяют нацеливаться на юниты, которые игнорируются по умолчанию (например, враги с иммунитетом к магии), или игнорировать определенные типы юнитов, которые в противном случае могут быть выбраны в качестве цели (например, Древние или союзники с иммунитетом к магии).
| **AbilityUnitTargetFlags** | **Цели/игнорирует** |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DOTA_UNIT_TARGET_FLAG_NONE | Значение по умолчанию при отсутствии.                                                                                                                                           |
| DOTA_UNIT_TARGET_FLAG_DEAD | Мертвые юниты, которые в случае неудачи взимаются.                                                                                                                             |
| DOTA_UNIT_TARGET_FLAG_MELEE_ONLY | Юниты с возможностями применяют DOTA_UNIT_CAP_MELEE_ATTACK.                                                                                                            |
| DOTA_UNIT_TARGET_FLAG_RANGED_ONLY | Юниты с возможностями применяют DOTA_UNIT_CAP_RANGED_ATTACK.                                                                                                           |
| DOTA_UNIT_TARGET_FLAG_MANA_ONLY | Юниты с маной, без `"StatusMana" "0"` в файле `npc_units`.                                                                                                 |
| DOTA_UNIT_TARGET_FLAG_CHECK_DISABLE_HELP | Юниты с отключенной справкой on.<br/>Не знаете, как лучше использовать способность DataDriven?                                                                                    |
| DOTA_UNIT_TARGET_FLAG_NO_INVIS | Игнорирует невидимые юниты (с MODIFIER_STATE_INVISIBLE.) |
| DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES | Нацеливается на вражеские отряды с помощью `MODIFIER_STATE_MAGIC_IMMUNE`.<br/>Примеры: Ensnare, Culling Blade, Primal Roar... |
| DOTA_UNIT_TARGET_FLAG_NOT_MAGIC_IMMUNE_ALLIES | Игнорирует ДРУЖЕСТВЕННЫЕ юниты с `MODIFIER_STATE_MAGIC_IMMUNE`.<br/>Пример: Кошмар Бэйна.                                                                            |
| DOTA_UNIT_TARGET_FLAG_NOT_ATTACK_IMMUNE | Игнорирует юниты с `MODIFIER_STATE_ATTACK_IMMUNE`.                                                                                                                   |
| DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE | Разрушается отряд, когда погружается в туман войны.<br/>Примеры: Похищение маны, Похищение жизни.                                                                                 |
| DOTA_UNIT_TARGET_FLAG_INVULNERABLE | Юниты с `MODIFIER_STATE_INVULNERABLE`.<br/>Примеры: Убийство, Возврат, Разрушение валуна... |
| DOTA_UNIT_TARGET_FLAG_NOT_ANCIENTS | Игнорирует отряды с обязательствами `"IsAncient" "1"`. <br/>Пример: Рука Мидаса.                                                                                            |
| DOTA_UNIT_TARGET_FLAG_NOT_CREEP_HERO | Игнорирует юнитов с обязательствами `"ConsideredHero" "1"`. <br/>Примеры: Астральное заключение, Разрушение, Раскол.                                                            |
| DOTA_UNIT_TARGET_FLAG_NOT_DOMINATED | Игнорирует юниты с `MODIFIER_STATE_DOMINATED`.                                                                                                                       |
| DOTA_UNIT_TARGET_FLAG_NOT_ILLUSIONS | Игнорирует юниты с `MODIFIER_PROPERTY_IS_ILLUSION`.                                                                                                                  |
| DOTA_UNIT_TARGET_FLAG_NOT_NIGHTMARED | Игнорирует юниты с `MODIFIER_STATE_NIGHTMARED`.                                                                                                                      |
| DOTA_UNIT_TARGET_FLAG_NOT_SUMMONED | Игнорирует юниты, созданные с помощью `SpawnUnit` [action](https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Scripting/Abilities_Data_Driven#Actions).      |
| DOTA_UNIT_TARGET_FLAG_OUT_OF_WORLD | Устройства с `MODIFIER_STATE_OUT_OF_GAME`.                                                                                                                             |
| DOTA_UNIT_TARGET_FLAG_PLAYER_CONTROLLED | Юниты, управляемые игроком, доступны с помощью [Lua](https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Scripting/API) `IsControllableByAnyPlayer()`. |
| DOTA_UNIT_TARGET_FLAG_PREFER_ENEMIES | Отдает приоритет юнитам над деревьями, если оба доступны для выбора.                                                                                                               |
**Чистый список**:
- DOTA_UNIT_TARGET_FLAG_NONE
- DOTA_UNIT_TARGET_FLAG_DEAD
- DOTA_UNIT_TARGET_FLAG_MELEE_ONLY
- DOTA_UNIT_TARGET_FLAG_RANGED_ONLY
- DOTA_UNIT_TARGET_FLAG_MANA_ONLY
- DOTA_UNIT_TARGET_FLAG_CHECK_DISABLE_HELP
- DOTA_UNIT_TARGET_FLAG_NO_INVIS
- DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES
- DOTA_UNIT_TARGET_FLAG_NOT_MAGIC_IMMUNE_ALLIES
- DOTA_UNIT_TARGET_FLAG_NOT_ATTACK_IMMUNE
- DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE
- DOTA_UNIT_TARGET_FLAG_INVULNERABLE
- DOTA_UNIT_TARGET_FLAG_NOT_ANCIENTS
- DOTA_UNIT_TARGET_FLAG_NOT_CREEP_HERO
- DOTA_UNIT_TARGET_FLAG_NOT_DOMINATED
- DOTA_UNIT_TARGET_FLAG_NOT_ILLUSIONS
- DOTA_UNIT_TARGET_FLAG_NOT_NIGHTMARED
- DOTA_UNIT_TARGET_FLAG_NOT_SUMMONED
- DOTA_UNIT_TARGET_FLAG_OUT_OF_WORLD
- DOTA_UNIT_TARGET_FLAG_PLAYER_CONTROLLED
- DOTA_UNIT_TARGET_FLAG_PREFER_ENEMIES
#### Веселье с флагами

Флаги рассматривались как преимущества свойстваUnitTargetFlags, но это не представляет возможности их применения.
То же самое относится к командам и типам.

- `"Flags"` и `"ExcludeFlags"` в блоке `"Target"` дают контроль над тем, как нацеливаться на юниты, чтобы впоследствии применить к ним действия:
```
"Target"
{
    "Center"    "CASTER"
    "Flags"     "DOTA_UNIT_TARGET_FLAG_DEAD"
}
```

- `"TargetFlags"` в действии `"LinearProjectile"` позволяет `LinearProjectile` игнорировать единицы, которые в противном случае были бы включены по умолчанию в значения Team+Type, например те, которые имеют `MODIFIER_STATE_INVISIBLE`.
- `"Aura_Flags"` в модификаторе с другими клавишами `"Aura"` можно использовать, например, чтобы модификатор ауры влиял только на отряды дальнего боя, добавив `DOTA_UNIT_TARGET_FLAG_RANGED_ONLY`.

То же самое относится к **Командам** и **Типам**.

_Пример_: Нацеливается на все дружественные юниты в радиусе заклинателя, включая курьеров, здания и осадные юниты. Исключает героев, призываемых существ и другие юниты, управляемые игроком.
```
"Target"
{
    "Center"        "CASTER"
    "Radius"        "%radius"

    // AbilityUnitTargetTeam values.
    "Teams"         "DOTA_UNIT_TARGET_TEAM_FRIENDLY"

    // AbilityUnitTargetTypes
    "Types"         "DOTA_UNIT_TARGET_ALL"
    "ExcludeTypes"  "DOTA_UNIT_TARGET_HERO"

    // AbilityUnitTargetFlags
    "Flags"         "DOTA_UNIT_TARGET_FLAG_NOT_SUMMONED"
    "ExcludeFlags"  "DOTA_UNIT_TARGET_FLAG_PLAYER_CONTROLLED"
}
```
_Пример_: Переписан снаряд Стрелы Мираны, который поражает только героев, включая тех, кто невосприимчив к магии:
```
"LinearProjectile"
{
    "Target"            "POINT"
    "EffectName"        "particles/units/heroes/hero_mirana/mirana_spell_arrow.vpcf"
    "MoveSpeed"         "857"
    "StartRadius"       "115"
    "EndRadius"         "115"
    "StartPosition"     "attach_attack1"
    "FixedDistance"     "3000"
    "TargetTeams"       "DOTA_UNIT_TARGET_TEAM_ENEMY"
    "TargetTypes"       "DOTA_UNIT_TARGET_HERO"
    "TargetFlags"       "DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES"
    "HasFrontalCone"    "0"
    "ProvidesVision"    "1"
    "VisionRadius"      "650"
}
```
С `DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES` и с `DOTA_UNIT_TARGET_FLAG_NONE`:

<StaticVideo path="/videos/FloweryUnevenHorseshoeBat.mp4" />

### Другие ключевые значения блока Action Target

#### Линия

Чтобы нацелиться на юнитов, находящихся на линии между заклинателем и целевой точкой.
Вместо ключевого значения `"Radius"`, которое принимает только один параметр, `Line` принимает целочисленные значения `Length` и `Thickness` в следующем блоке:
```
"Line"
{
    "Length"    "600"
    "Thickness" "250"
}
```

#### Ограничение количества целей

`MaxTargets` принимает целочисленное значение, чтобы ограничить количество целей, которые будет выбирать целевой блок.
```
"MaxTargets"    "10"
`
```
Random` также принимает целое число как «случайным образом взять до этого количества единиц».
```
"Random"    "1"
```
(Для более сложного таргетинга ответом могут стать сценарии Lua.)

#### ScriptSelectPoints

Его использование очень редко, обычно, когда таргетинг сложный, мы просто используем `RunScript` lua и выполняем все действия внутри скрипта.
```
ScriptSelectPoints
{
    ScriptFile
    Function
    Radius
    Count
}
```
Для объяснения полного использования блока Target необходимо более подробное объяснение, поскольку понимание _scope_ значения ключа «Target» «TARGET» является одной из самых сложных задач в системе, управляемой данными.

**Источники**

- [Constants wiki](https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Scripting/Constants)
- [Abilities Data Driven wiki](https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Scripting/Abilities_Data_Driven)
- Извлеченный файл [npc_abilities.txt](https://raw.githubusercontent.com/dotabuff/d2vpk/master/dota_pak01/scripts/npc/npc_abilities.txt).
- значения ключей Holdout_example
- случайный майнинг данных [github](https://github.com/)
- перебор всего в течение бесчисленных часов!

## Подсказки по таргетингу

![img](/images/external/dwspY.jpg)

Это комбинации `AbilityUnitTargetTeam` + `AbilityUnitTargetType` и то, как они выглядят как **AFFECTS:** в пользовательском интерфейсе.

Важно уточнить, что `AbilityUnitTargetTeam` и `AbilityUnitTargetType` ограничивают только поведение способностей с `DOTA_ABILITY_BEHAVIOR_UNIT_TARGET` — это напрямую меняет то, на что можно применить заклинание. В других случаях эти теги используются просто для отображения дополнительной информации для игроков.

Например, способность `DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_AOE` найдет свои цели любым способом и не будет ограничена тем, что указано в значениях `AbilityUnitTarget`.

### Без любого типа способностиUnitTargetType
| **AbilityUnitTargetTeam** | **ВЛИЯНИЕ:** Подсказка |
| ------------------------------ | -------------------- |
| DOTA_UNIT_TARGET_TEAM_ENEMY | Враги |
| DOTA_UNIT_TARGET_TEAM_FRIENDLY | Союзники |
| DOTA_UNIT_TARGET_TEAM_BOTH | Единицы |

### WithabilityUnitTargetTeam DOTA_UNIT_TARGET_TEAM_BOTH

| **AbilityUnitTargetType** | **ВЛИЯНИЕ:** Подсказка |
| --------------------------------------------- | -------------------- |
| DOTA_UNIT_TARGET_HERO | Герои |
| DOTA_UNIT_TARGET_ALL | Единицы |
| DOTA_UNIT_TARGET_BASIC | Единицы |
| DOTA_UNIT_TARGET_CREEP | Единицы |
| DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC | Единицы |

> Самого `"AFFECTS: Buildings"` пока не существует. `DOTA_UNIT_TARGET_BUILDING` по умолчанию — «Союзники/Враги». `"AFFECTS: Creeps"` тоже не дело.
>
> `"DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC"` — наиболее распространенный тип цели; если вы не уверены, что это должно быть ориентиром на ваше заклинание.

### WithabilityUnitTargetTeam DOTA_UNIT_TARGET_TEAM_ENEMY

| **AbilityUnitTargetType** | **ВЛИЯНИЕ:** Подсказка |
| -------------------------------------------------------------------------- | -------------------------- |
| DOTA_UNIT_TARGET_BASIC | Вражеские крипы |
| DOTA_UNIT_TARGET_HERO | Вражеские герои |
| DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC | Вражеские юниты |
| DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BUILDING | Вражеские герои и здания |
| DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC + DOTA_UNIT_TARGET_BUILDING | Вражеские юниты и постройки |

### WithabilityUnitTargetTeam DOTA_UNIT_TARGET_TEAM_FRIENDLY

| **AbilityUnitTargetType** | **ВЛИЯНИЕ:** Подсказка |
| -------------------------------------------------------------------------- | --------------------------- |
| DOTA_UNIT_TARGET_BASIC | Союзные крипы |
| DOTA_UNIT_TARGET_HERO | Герои-союзники |
| DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC | Союзные юниты |
| DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BUILDING | Союзные герои и здания |
| DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC + DOTA_UNIT_TARGET_BUILDING | Союзные объединения и здания |

> Добавление `DOTA_UNIT_TARGET_MECHANICAL` не повлияет на депутатскую подсказку AFFECTS.

### Любая способностьUnitTargetTeam

| **AbilityUnitTargetType** | **ВЛИЯНИЕ:** Подсказка |
| ------------------------------- | -------------------- |
| DOTA_UNIT_TARGET_TREE | События |
| В строках, но это невозможно | Я |
### Строки ошибок приведения

Следующие строки из `dota_english.txt` управляют сообщениями об ошибках, отображаемыми, когда заклинание не может быть применено к цели. Многие из них еще не раскрыты:
```
"dota_hud_error_cant_cast_on_hero"              "Ability Can't Target Heroes"
"dota_hud_error_cant_cast_on_considered_hero"   "Ability Can't Target Creep Heroes"
"dota_hud_error_cant_cast_on_creep"             "Ability Can't Target Creeps"
"dota_hud_error_cant_cast_on_mechanical"        "Ability Can't Target Mechanical Units"
"dota_hud_error_cant_cast_on_building"          "Ability Can't Target Buildings"
"dota_hud_error_cant_cast_on_courier"           "Ability Can't Target Couriers"
"dota_hud_error_cant_cast_on_other"             "Ability Can't Target That"
"dota_hud_error_cant_cast_on_self"              "Ability Can't Target Self"
"dota_hud_error_cant_cast_on_ally"              "Ability Can't Target Allies"
"dota_hud_error_cant_cast_on_enemy"             "Ability Can't Target Enemies"
"dota_hud_error_cant_cast_on_roshan"            "Ability Can't Target Roshan"
"dota_hud_error_cant_cast_on_non_tree_ward"     "Ability Can Only Target Trees and Enemy Wards"
"dota_hud_error_cant_target_shop"               "Can't Target Shop"
"dota_hud_error_cant_target_rune"               "Can't Target Rune"
"dota_hud_error_cant_target_item"               "Can't Target Item"
"dota_hud_error_cant_cast_on_ancient"           "Ability Can't Target Ancients"
"dota_hud_error_cant_cast_on_own_illusion"      "Ability Can't Target Own Illusion"
"dota_hud_error_cant_cast_on_summoned"          "Ability Can't Target Summoned Units"
"dota_hud_error_cant_cast_on_dominated"         "Ability Can't Target Dominated Units"
"dota_hud_error_cant_cast_enemy_hero"           "Ability Can't Target Enemy Heroes"
"dota_hud_error_cant_cast_creep_level"          "Ability Can't Target Creeps of This Level"
```

## СпособностьЕдиницаУронТип

Физический урон можно уменьшить с помощью физической брони или блокировки урона. Магический урон можно уменьшить с помощью сопротивления магическому урону. Чистый урон не может быть уменьшен ни тем, ни другим.

- `DAMAGE_TYPE_MAGICAL`
- `DAMAGE_TYPE_PHYSICAL`
- `DAMAGE_TYPE_PURE
```
`
"AbilityUnitDamageType" "DAMAGE_TYPE_MAGICAL"
```
![img](/images/external/dwrPc.jpg)

Это ключевое значение также показывает строку **DAMAGE:** во всплывающей подсказке способности, сразу после **ABILITY:** и **AFFECTS:**.

Имейте в виду, что `AbilityUnitDamageType` предназначен только для отображения всплывающей подсказки в пользовательском интерфейсе. Реальный урон наносится посредством действий `Damage`, которые имеют собственный `Type` и не ограничены определенным здесь значением (заклинание может иметь несколько экземпляров урона разных типов).
```
"Damage"
{
    "Target"  "TARGET"
    "Type"    "DAMAGE_TYPE_PHYSICAL"
    "Damage"  "%AbilityDamage"
}
```

## Тип иммунитета к заклинаниям

Определяет, пробивает ли способность иммунитет к заклинаниям (ранее «Магический иммунитет»).

- `SPELL_IMMUNITY_ENEMIES_NO`
- `SPELL_IMMUNITY_ENEMIES_YES`

Подсказки способностей показывают два связанных поля:

- **Тип урона:** Физический/Магический/Чистый
- **Иммунитет к заклинаниям Пирса:** Да / Нет

Если тип урона не Магический или он пробивает иммунитет к заклинаниям, подсказка окрашена в другой цвет, чтобы ее было легче заметить.

![img](/images/external/dykwZ.jpg)

## Анимация

Как будет двигаться и действовать герой после того, как игрок решит применить способность.

###AbilityCastPoint
Время до того, как заклинание сработает при применении; можно отменить командой «Стоп». Принимает значение с плавающей запятой.
```
"AbilityCastPoint" "0.3"
```

### СпособностьКастАнимация

Обычно слот способности определяет анимацию, используемую по умолчанию. С помощью этой клавиши вы можете вызвать другую анимацию применения.

Общие значения активности:

- `ACT_DOTA_ATTACK`
- `ACT_DOTA_CAST_ABILITY_1` (2, 3, 4, 5, 6)
- `ACT_DOTA_CHANNEL_ABILITY_1` (2, 3, 4, 5, 6)
- `ACT_DOTA_DISABLED`
- `ACT_DOTA_RUN`
- `ACT_DOTA_SPAWN`
- `ACT_DOTA_TELEPORT`
- `ACT_DOTA_VICTORY`

[Full ACT List](https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Actions_List) — многие из них не работают или будут работать только на известных героев.```
"AbilityCastAnimation" "ACT_DOTA_ATTACK"
```

### АнимацияИгнорируетсяМодельМасштаб

Анимации имеют предопределенное время, предназначенное для юнитов в масштабе модели по умолчанию (1). Если установлено значение `1` (по умолчанию), юнит с увеличенным масштабом модели по-прежнему будет использовать время анимации по умолчанию, благодаря чему оно будет выглядеть быстрее на больших моделях (или медленнее на маленьких).

Установите значение `0`, чтобы время анимации масштабировалось вместе с моделью:
```
"AnimationIgnoresModelScale" "0"
```

### Скорость воспроизведения анимации

Множитель скорости анимации. Занимает время анимации и делает ее в несколько раз быстрее или медленнее. Точка применения независима и не зависит от этого значения.
```
"AnimationPlaybackRate" "2"
```

## Общая статистика способностей

### Урон
```
"AbilityDamage" "100 200 300 400"
```
Это значение урона не будет нанесено само по себе — позже вы будете ссылаться на `%AbilityDamage` в блоке действий `Damage`, чтобы игра могла адаптироваться к уровню способностей. В подсказке автоматически создается строка **DAMAGE:** на основе этого значения.

![img](/images/external/dvKmu.jpg)

Однако это единичный случай; если вам нужны разные экземпляры повреждений или разные метки всплывающих подсказок (например, «УРОВЕНЬ В СЕКУНДУ:»), вам нужно будет использовать вместо этого блоки `AbilitySpecial`.

### Стоимость маны

Показывает стоимость маны в пользовательском интерфейсе и блокирует применение, если маны недостаточно.
```
"AbilityManaCost" "30 35 40 45"
```
![img](/images/external/dvKIm.jpg)

### Время восстановления

Показывает время восстановления в пользовательском интерфейсе и блокирует применение во время перезарядки. Принимает числа с плавающей запятой, но округляет до целого числа, если десятичная точка не указана.
```
"AbilityCooldown" "10.5 8 6 3.22"
```
![img](/images/external/dvKB7.jpg)

### Диапазон применения способностей

Для `DOTA_ABILITY_BEHAVIOR_UNIT_TARGET` и `DOTA_ABILITY_BEHAVIOR_POINT` это устанавливает максимальный диапазон. Если цель находится за пределами этого расстояния, перед применением юнит переместится в пределах дальности применения.
```
"AbilityCastRange" "600"
```
![img](/images/external/dvDnc.jpg)

###AbilityCastRangeBuffer

Заклинание отменит действие, если цель выйдет за пределы `CastRange + CastRangeBuffer`. Обычно используется с высоким значением `AbilityCastPoint`.
```
"AbilityCastRangeBuffer" "250"
```
Примеры: Убийство, Удар Пустоты.

###abilityCastMinimumRange

Не подключен в большинстве версий, но его можно найти в Holdout_example:
```
"AbilityCastMinimumRange" "500"
```

### СпособностьПродолжительность
```
"AbilityDuration" "20"
```
Это ярлык, которого обычно следует избегать. В отличие от `AbilityDamage`, он **не** генерирует всплывающую подсказку «DURATION:» сам по себе. Если вы хотите отобразить продолжительность, вам все равно необходимо создать запись `AbilitySpecial`. Используйте `AbilityDuration` только в том случае, если вас не беспокоит его отображение в виде подсказки переменной (например, когда вы просто пишете «Длится 5 секунд» в способности `_Description`).

Если вы когда-нибудь измените значение, вам придется обновить `AbilityDuration` и строку подсказки вручную.

### АоERадиус

Требуется `"AbilityBehavior" "DOTA_ABILITY_BEHAVIOR_AOE"` (вместе с POINT и/или UNIT_TARGET). Отображает круг области действия на земле.

**Важно!** Это влияет только на визуальный индикатор, а не на фактическое поведение заклинания. Реальные значения радиуса следует контролировать с помощью записей `AbilitySpecial`.
```
"AoERadius" "250"
```
![img](/images/external/dvN2a.jpg)

### Ченнелинг

Для `"AbilityBehavior" "DOTA_ABILITY_BEHAVIOR_CHANNELLED"`:

**Время канала** — по умолчанию установлено значение 0, поэтому очень важно установить это значение, иначе канал мгновенно завершится:
```
"AbilityChannelTime" "5.0"
```![img](/images/external/dvMa4.jpg)

**Channelled Mana Cost Per Second** — дополнительные затраты на поддержание канала:```
"AbilityChannelTime"                 "5.0"
"AbilityChannelledManaCostPerSecond" "30 35 40 45"
```

## Другие ключевые значения первого уровня

###AbilitySharedCooldown

Связывает способности/предметы вместе с общим временем восстановления. Используйте одно и то же строковое значение для каждой способности, которую хотите связать:
```
"AbilitySharedCooldown" "linkedProjectile"
```
При использовании любой из связанных способностей все остальные одновременно перезаряжаются.

### СпособностьSharedWithTeammate

Способность отряда, контролируемого командой, которую может использовать каждый член этой команды (например, здание с улучшениями, которые команда может купить).
```
"AbilitySharedWithTeammates" "1"
```

## Стоимость золота

### СпособностьGoldCost

Стоимость использования способности каждый раз в золоте.

###AbilityUpgradeGoldCost

Стоимость изучения и улучшения способности в золоте.
```
"AbilityGoldCost"        "100"
"AbilityUpgradeGoldCost" "300"
```
![img](/images/external/dwtYR.jpg)

## Отслеживание статистики

Относится к подсчету очков фантазии.

###abilityModifierSupportValue

Плавающее значение от 0,0 до 1,0. Способности, которые наносят меньший урон, но важны для гарантированного убийства, имеют большую ценность.
- `"AbilityModifierSupportValue" "0.6"` — применяет несколько модификаторов (например, Beastmaster: Primal Roar)
- `"AbilityModifierSupportValue" "0.5"` — В первую очередь о призыве (например, Дождь Хаоса Чернокнижника)
- `"AbilityModifierSupportValue" "0.1"` — Просто министан (например, Zeus: Lightning Bolt)
- `"AbilityModifierSupportValue" "0.0"` — В первую очередь про урон (например Lich: Chain Frost)

###AbilityModifierSupportBonus

Целое число. Способности с более высоким влиянием на убийство имеют более высокий бонус.

- `"AbilityModifierSupportBonus" "5"` — Ликан: Вой
- `"AbilityModifierSupportBonus" "35"` — Жидкий огонь Джакиро
- `"AbilityModifierSupportBonus" "100"` — Тамплиер-убийца: Ловушка
- `"AbilityModifierSupportBonus" "120"` — Алхимик: Бросок нестабильной смеси

## Волшебная палка

### СпособностьProcsMagicStick

Полезно для пользовательских способностей с временем восстановления 0 секунд, если в игровом режиме используется предмет «Волшебная палочка» по умолчанию.
```
"AbilityProcsMagicStick" "1"
```

## Унаследованные ключи

###Переопределение горячих клавиш

Если Legacy Keys включены, возможность будет использовать эту горячую клавишу. Примечание. Работает только с устаревшими ключами, и невозможно заставить игроков использовать их.
```
"HotKeyOverride" "K"
```
![img](/images/external/dwsVq.jpg)

## Пользовательский интерфейс Meepo/Lone Druid

### Отображение дополнительных героев

Если добавить это к способности, в левом верхнем углу пользовательского интерфейса будет отображаться главный герой и любые дополнительные герои, находящиеся под контролем игрока (аналогично Meepo или Lone Druid).
```
"DisplayAdditionalHeroes" "1"
```
![img](/images/external/duhkK.jpg)

**Примечания:**

- DataDriven `SpawnUnit` с `npc_dota_hero` в качестве UnitName и Lua приведет к сбою игры. Вместо этого используйте `CreateHeroForPlayer`.
- `npc_dota_lone_druid_bear4` не отображается в пользовательском интерфейсе как новый герой.

## FightRecapLevel

Используется пользовательским интерфейсом Fight Recap для определения приоритета наиболее важных способностей и предметов, используемых в бою.

- Уровень 2: Cheese, Mek, Hex, BKB, Aegis и большинство ультимейтов с большим временем восстановления.
- Уровень 1: Все остальное
```
"FightRecapLevel" "2"
```
![img](/images/external/duf9w.jpg)

## OnCastbar / OnLearnbar

Присутствие Темного Лорда и Некромастерство имеют значение 0, но изменение их на 1 не дает заметных эффектов. Вместо этого используйте `DOTA_ABILITY_BEHAVIOR_HIDDEN`, чтобы скрыться от панели применения, и `DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE`, чтобы скрыться от панели обучения.
```
"OnCastbar"  "1"
"OnLearnbar" "1"
```

## СпособностьСпециальный блок

Этот блок служит двум целям:

1. Определение значений, которые изменяются по мере повышения уровня способности, на которые ссылается `%value`.
2. Подсказки о возможностях форматирования

### Структура
```
"AbilitySpecial"
{
    "01"
    {
        "var_type"  "FIELD_INTEGER"
        "value"     "3 4 5 6 7 8"
    }
    "02"
    {
        "var_type"      "FIELD_FLOAT"
        "another_value" "3.0"
    }
}
```

### Значения переменных

Везде, где требуется значение, используйте `"%name"`, чтобы получить его из блока `AbilitySpecial` с таким именем.

### Подсказки

Для каждого блока `AbilitySpecial` вы можете добавить соответствующую строку подсказки, которая автоматически будет отображать значения во всплывающей подсказке способности. Учитывая приведенный выше пример внутри способности с именем `datadriven_skeleton`, строки в `addon_english.txt` будут такими:
```
"DOTA_Tooltip_Ability_datadriven_skeleton"             "Tooltip Example"
"DOTA_Tooltip_Ability_datadriven_skeleton_Description" "This shows the basic tooltip syntax"
"DOTA_Tooltip_Ability_datadriven_skeleton_Note0"       "This shows when hovering with Alt pressed"
"DOTA_Tooltip_Ability_datadriven_skeleton_Lore"        "And then, there was Documentation."
"DOTA_Tooltip_Ability_datadriven_skeleton_value"       "SOME:"
"DOTA_Tooltip_Ability_datadriven_skeleton_another_value" "DATA:"
```
![img](/images/external/dx036.jpg)

## блокировать предварительное кэширование

Если при использовании частицы, звука или модели внутри пользовательской способности или предмета ресурс не предварительно загружен, он не появится в игре. Это особенно важно при использовании контента от героев, которые не были загружены игроками.
```
"precache"
{
    "particle"  "particles/units/heroes/hero_legion_commander/legion_commander_duel_victory.vpcf"
    "particle"  "particles/units/heroes/hero_legion_commander/legion_commander_duel_buff.vpcf"
    "soundfile" "soundevents/game_sounds_heroes/game_sounds_legion_commander.vsndevts"
    "model"     "models/particle/legion_duel_banner.vmdl"
}
```
Относительный путь к активу можно скопировать непосредственно из Обозревателя активов:

![img](/images/external/azMPMIQ.png)

Родительская частица — это система со вторичными дочерними частицами. Предварительное кэширование родительской системы частиц обычно приводит к предварительному кэшированию всех ее дочерних элементов.

Полные папки также можно предварительно кэшировать с помощью `"particle_folder"` и `"model_folder"`, но это не рекомендуется, поскольку это увеличивает использование памяти.

### Предварительный кэш Lua
Функция `Precache()` в `addon_game_mode.lua` имеет проблемы с клиентами, которые правильно предварительно кэшируют ресурсы. Если это произойдет, клиент никогда не будет предварительно кэшировать элементы, настроенные в этом блоке.

Вы протестируете свой аддон в Инструментах, и он будет работать нормально, поскольку вы являетесь хостом, но как только вы загрузите его в Мастерскую и создадите лобби с 2 или более игроками, многие частицы, звуки и модели не будут видны клиентам, если вы не используете эту функцию с осторожностью.

![img](/images/external/dx4q0.jpg)

Старайтесь всегда использовать управляемый данными блок `precache` — он всегда предварительно загружает то, что определено внутри, при выборе героя. Используйте `PostLoadPrecache()`, если вам нужно предварительно загрузить юниты или элементы, создаваемые динамически.

## События способностей

См. подробное руководство по [Ability Events with Actions](/abilities/datadriven/datadriven-ability-events-modifiers).
| **Событие способностей** | **Триггеры** |
| -------------------- | ------------------------------------------ |
| OnSpellStart | После завершения `AbilityCastPoint` |
| OnToggleOn | Активация `DOTA_ABILITY_BEHAVIOR_TOGGLE` |
| Вкл.ToggleВыкл. | Деактивация `_TOGGLE` |
| OnChannelFinish | Прекращение направленной способности при любых условиях |
| OnChannelInterrupted | Преждевременное завершение канала |
| OnChannelУспешно | Окончание после завершения `AbilityChannelTime` |
| OnOwnerDied | Юнит с этой способностью умирает |
| OnOwnerSpawned | Юнит с этой способностью появляется |
| OnProjectileHitUnit | Снаряд сталкивается с допустимым юнитом |
| OnProjectileFinish | Снаряд проходит фиксированную дистанцию ​​|
| ОнЭкип | Товар взят |
| OnUnequip | Предмет покидает инвентарь |
| При обновлении | Обновление способностей из HUD |
| OnAbilityPhaseStart | При применении способности (до того, как юнит повернется к цели) |

### Список действий

Событие может поддерживать столько Действий, сколько необходимо.

| **Действие** | **Параметры** |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Возможность Добавить | Цель, Имя Способности |
| АктОнТаргетс | Цель, Действие |
| ПрименитьМодификатор | Цель, Имя модификатора, Продолжительность |
| ПрименитьMotionController | Цель, ScriptFile, HorizontalControlFunction, ВертикальнаяControlFunction, TestGravityFunc |
| При подключенииЭффект | EffectName, EffectAttachType, Target, TargetPoint, ControlPoints, ControlPointEntities, EffectRadius, EffectDurationScale, EffectLifeDurationScale, EffectColorA, EffectColorB, EffectAlphaScale |
| Мигать | Цель |
| Рассекающая атака | CleaveEffect, CleavePercent, CleaveRadius |
| СоздатьБонусАтака | Цель |
| СоздатьМыслитель | Цель, Имя Модификатора |
| СоздатьThinkerWall | Цель, Имя модификатора, Ширина, Длина, Вращение |
| СоздатьЭлемент | Цель, ItemName, ItemCount, ItemChargeCount, SpawnRadius, LaunchHeight, LaunchDistance, LaunchDuration |
| Урон | Цель, Тип, Мин.Урон/Макс.Урон, Урон, ТекущийHealthPercentBasedDamage, MaxHealthPercentBasedDamage |
| Задержанное действие | Задержка, Действие |
| Уничтожить деревья | Цель, Радиус |
| ОгнеЭффект | EffectName, EffectAttachType, Target, TargetPoint, ControlPoints, EffectRadius, EffectDurationScale, EffectLifeDurationScale, EffectColorA, EffectColorB, EffectAlphaScale |
| Фаерзвук | Имя Эффект, Цель |
| Грант XPGold | Цель, XPAmount, GoldAmount, ReliableGold, SplitEvenly |
| Исцелить | Сумма исцеления, Цель |
| IsCasterAlive | При успехе, при неудаче |
| Отбрасывание | Цель, Центр, Продолжительность, Расстояние, Высота, IsFixedDistance, MustStun |
| LevelUpAbility | Цель, Имя Способности |
| Вампиризм | Цель, LifestealPercent |
| линейный снаряд | Target, EffectName, MoveSpeed, StartRadius, EndRadius, фиксированное расстояние, StartPosition, TargetTeams, TargetTypes, TargetFlags, HasFrontalCone, ProvidesVision, VisionRadius |
| MoveUnit | Цель, MoveToTarget |
| Случайный | Шанс, Псевдослучайный, При успехе, При неудаче |
| Удалить способность | Цель, Имя Способности |
| УдалитьМодификатор | Цель, Имя Модификатора |
| УдалитьЮнит | Цель |
| ЗаменитьЕдиницу | UnitName, Цель |
| Повернуть | Цель, PitchYawRoll |
| RunScript | Цель, ScriptFile, Функция, (дополнительные параметры) |
| SpawnUnit | UnitName, UnitCount, UnitLimit, SpawnRadius, Duration, Target, GrantsGold, GrantsXP, OnSpawn { [ДЕЙСТВИЯ] } |
| Оглушить | Цель, продолжительность |
| ТратитьМану | Мана |
| Отслеживающий снаряд | Target, EffectName, Dodgeable, ProvidesVision, VisionRadius, MoveSpeed, SourceAttachment |

> **Примечание:** При использовании внутри модификатора `AttachEffect` автоматически остановит частицу после уничтожения модификатора, а `FireEffect` — нет. Если вы используете `FireEffect` с частицей бесконечной продолжительности внутри модификатора, она сохранится после окончания действия модификатора.

## Модификаторы

[![Modifiers](/images/external/XEFsYCD.png)](#модификаторы)

Блок `Modifiers` содержит определения каждого модификатора:
```
"Modifiers"
{
    "modifier_example"
    {
        // ...
    }
    "another_modifier"
    {
        // ...
    }
}
```

### Модификатор Скелет
```
"modifier_example"
{
    "Attributes"       "MODIFIER_ATTRIBUTE_MULTIPLE"
    "Duration"         "10"
    "Passive"          "0"
    "TextureName"      "spellicon"

    "IsDebuff"         "0"
    "IsHidden"         "0"
    "IsPurgable"       "0"

    "EffectName"        "particles/effect_name.vpcf"
    "EffectAttachType"  "follow_origin"

    "StatusEffectName"     "particles/status_fx/status_effect_frost_lich.vpcf"
    "StatusEffectPriority" "10"

    "OverrideAnimation" "ACT_DOTA_VICTORY"

    // Properties {}
    // States {}
    // Modifier Events
}
```

### Атрибуты

| **Атрибут** | **Описание** |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| MODIFIER_ATTRIBUTE_NONE | Значение по умолчанию, то же самое, что и отсутствие этого ключа |
| MODIFIER_ATTRIBUTE_MULTIPLE | Можно применить несколько экземпляров одного и того же модификатора, которые не будут переопределять друг друга |
| MODIFIER_ATTRIBUTE_PERMANENT | Сохраняется даже после смерти |
| MODIFIER_ATTRIBUTE_IGNORE_INVULNERABLE | Остается на устройствах с `MODIFIER_STATE_INVULNERABLE`. Чтобы _применить_ к неуязвимому юниту, вам также понадобится `DOTA_UNIT_TARGET_FLAG_INVULNERABLE` |
```
"Attributes" "MODIFIER_ATTRIBUTE_MULTIPLE"
```
![img](/images/external/dxfQW.jpg)

### Продолжительность

Модификатор отменяется и удаляется по истечении времени в секундах. Опустите, чтобы оно длилось бесконечно (или пока что-то не удалит его).
```
"Duration" "10"
```

### Пассивный

Модификатор автоматически применяется к отряду при получении способности. По умолчанию — `0`. Используется для большинства предметов и пассивных способностей.
```
"Passive" "1"
```

### Имя текстуры

Позволяет использовать другой значок на панели баффов. По умолчанию использует значок способности из `AbilityTextureName`.

### IsBuff / IsDebuff / IsPurgable

По умолчанию каждый из них имеет значение `0`, если он опущен. По умолчанию каждый модификатор отображается с зеленой рамкой, но не считается усилением, если не установлен `"IsBuff" "1"`. Параметр `"IsDebuff" "1"` отображает красную рамку, указывающую на отрицательный эффект.
```
"IsDebuff" "1"
```
![img](/images/external/dxgFV.jpg)

Если `"IsPurgable" "1"`, механика очистки и рассеивания будет действовать в соответствии со значениями `IsBuff`/`IsDebuff`:

- Модификаторы `"IsDebuff" "1"` удалены из дружественных отрядов.
- Модификаторы `"IsBuff" "1"` удалены из вражеских юнитов.

Установка `"IsStunDebuff" "true"` требует удаления сильного развеивания (например, «Щита Абаддона» или «Отталкивания»).

### Частицы на модификаторах
Чтобы прикрепить эффект частицы на время действия модификатора, используйте эти две клавиши вместе:

**EffectName** — имя используемой системы частиц. Большинство частиц типа баффа работают. Обязательно используйте родительскую частицу.

**EffectAttachType** — где на юните отображается частица. Наиболее распространенные значения:

- `follow_origin` — тело/ноги, перемещается вместе с отрядом
- `follow_overhead` — сверху модели, перемещается вместе с агрегатом

![img](/images/external/dxyOB.jpg)
```
"modifier_golden"
{
    "Passive"          "1"
    "EffectName"       "particles/econ/courier/courier_golden_roshan/golden_roshan_ambient.vpcf"
    "EffectAttachType" "follow_origin"
}
```
Дополнительные или сложные частицы следует прикреплять с помощью действия `AttachEffect` внутри события-модификатора `OnCreated`. Пример с несколькими эффектами:
```
"modifier_much_gold"
{
    "Duration" "3"
    "States"
    {
        "MODIFIER_STATE_NO_HEALTH_BAR" "MODIFIER_STATE_VALUE_ENABLED"
    }
    "OnCreated"
    {
        "AttachEffect"
        {
            "Target"           "CASTER"
            "EffectName"       "particles/econ/items/gyrocopter/hero_gyrocopter_gyrotechnics/gyro_calldown_marker.vpcf"
            "EffectAttachType" "follow_origin"
            "EffectRadius"     "100"
        }
        "AttachEffect"
        {
            "Target"                "CASTER"
            "EffectName"            "particles/units/heroes/hero_alchemist/alchemist_lasthit_coins.vpcf"
            "EffectAttachType"      "start_at_customorigin"
            "ControlPointEntities"
            {
                "CASTER" "attach_origin"
                "CASTER" "attach_origin"
            }
        }
        "AttachEffect"
        {
            "EffectName"       "particles/units/heroes/hero_alchemist/alchemist_acid_spray.vpcf"
            "EffectAttachType" "follow_origin"
            "Target"           "CASTER"
            "ControlPoints"
            {
                "00" "0 0 0"
                "01" "200 1 1"   // Radius
                "15" "255 200 0" // Color
                "16" "1 0 0"
            }
        }
    }
}
```

### Частицы эффекта статуса

Они накладывают текстуру на устройство. Найдите `status_effect` в браузере ресурсов.

![img](/images/external/dxnHX.jpg)
```
"StatusEffectName"     "particles/status_fx/status_effect_frost_lich.vpcf"
"StatusEffectPriority" "10"
`
```StatusEffectPriority определяет более важные последствия для переопределения других приоритетов с более низкими значениями.

![img](/images/external/dxotU.jpg)

**status_effect_frost_lich** · **status_effect_medusa_stone_gaze**

![img](/images/external/dxp3d.jpg)

**status_effect_forcestaff** · **status_effect_avatar**
![img](/images/external/dxoIy.jpg)
**status_effect_doom** · **status_effect_gods_strength**

### Переопределить анимацию

Вызывает определенную анимацию, пока модификатор активен. Можно использовать любое значение `ACT_` из [Animation section](#animation).
```
"modifier_sleep"
{
    "EffectName"        "particles/newplayer_fx/npx_sleeping.vpcf"
    "EffectAttachType"  "follow_overhead"
    "OverrideAnimation" "ACT_DOTA_DISABLED"
    "States"
    {
        "MODIFIER_STATE_NO_HEALTH_BAR" "MODIFIER_STATE_VALUE_ENABLED"
    }
}
```

### Аура

Модификатор с ключами Aura автоматически применяет указанный модификатор к каждому допустимому юниту в пределах `Aura_Radius`, удаляя его, когда юниты покидают радиус.
```
"Modifiers"
{
    "modifier_armor_aura"
    {
        "Passive"   "1"
        "IsHidden"  "1"

        "Aura"              "armor_aura_effect"
        "Aura_Radius"       "%radius"
        "Aura_Teams"        "DOTA_UNIT_TARGET_TEAM_FRIENDLY"
        "Aura_Types"        "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC"
        "Aura_Flags"        "DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES"
        "Aura_ApplyToCaster" "0"
    }

    "armor_aura_effect"
    {
        "Properties"
        {
            "MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS" "%armor_bonus"
        }
    }
}
```

### Иллюзии (AllowIllusionDuulate)

По умолчанию иллюзии не наследуют модификаторы исходного героя. Установите это, чтобы модификатор копировался на иллюзии:
```
"modifier_armor_oncopies"
{
    "Passive"                "1"
    "AllowIllusionDuplicate" "1"
    "Properties"
    {
        "MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS" "1 2 3"
    }
}
```
![img](/images/external/dxlFL.jpg)

### Повторяющиеся действия (ThinkInterval)

Используется с событием-модификатором `OnIntervalThink` для выполнения действий по таймеру:
```
"modifier_midas_effect"
{
    "ThinkInterval"  "1"
    "OnIntervalThink"
    {
        "FireEffect"
        {
            "EffectName"       "particles/items2_fx/hand_of_midas.vpcf"
            "Target"           "CASTER"
            "EffectAttachType" "follow_origin"
        }
    }
}
```

### Приоритет

Делает такое состояние, как невидимость, не переопределяемым эффектами с более низким приоритетом.
```
"Priority" "MODIFIER_PRIORITY_ULTRA"
```
Возможные значения: `MODIFIER_PRIORITY_ULTRA` и `MODIFIER_PRIORITY_HIGH`.

###Название модели

Управляемый данными способ изменить модель юнита изнутри модификатора:
```
"ModelName" "models/heroes/doom/doom.vmdl"
```

## Блок свойств

[![Properties](/images/external/HFXTmij.png)](#properties-block)

Этот блок внутри модификатора дает числовые бонусы к характеристикам из списка свойств модификатора. Поддерживает ссылки `AbilitySpecial` и отрицательные значения.
```
"modifier_slow"
{
    "IsDebuff"  "1"
    "Duration"  "%duration"
    "Properties"
    {
        "MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT"  "%attackspeed_reduction"
        "MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE"  "%movespeed_reduction_percentage"
    }
}
```

### Список модификаторов свойств

- MODIFIER_PROPERTY_ABILITY_LAYOUT
- MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_MAGICAL
- MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PHYSICAL
- MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PURE
- MODIFIER_PROPERTY_ABSORB_SPELL
- MODIFIER_PROPERTY_ATTACK_RANGE_BONUS
- MODIFIER_PROPERTY_ATTACK_RANGE_BONUS_UNIQUE
- MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT
- MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT_POWER_TREADS
- MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT_SECONDARY
- MODIFIER_PROPERTY_AVOID_CONSTANT
- MODIFIER_PROPERTY_AVOID_SPELL
- MODIFIER_PROPERTY_BASEATTACK_BONUSDAMAGE
- MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT
- MODIFIER_PROPERTY_BASEDAMAGEOUTGOING_PERCENTAGE
- MODIFIER_PROPERTY_BASE_MANA_REGEN
- MODIFIER_PROPERTY_BONUS_DAY_VISION
- MODIFIER_PROPERTY_BONUS_NIGHT_VISION
- MODIFIER_PROPERTY_BONUS_VISION_PERCENTAGE
- MODIFIER_PROPERTY_CAST_RANGE_BONUS
- MODIFIER_PROPERTY_CHANGE_ABILITY_VALUE
- MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE
- MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE_STACKING
- MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE
- MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE_ILLUSION
- MODIFIER_PROPERTY_DEATHGOLDCOST
- MODIFIER_PROPERTY_DISABLE_AUTOATTACK
- MODIFIER_PROPERTY_DISABLE_HEALING
- MODIFIER_PROPERTY_DISABLE_TURNING
- MODIFIER_PROPERTY_EVASION_CONSTANT
- MODIFIER_PROPERTY_FORCE_DRAW_MINIMAP
- MODIFIER_PROPERTY_HEALTH_BONUS
- MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT
- MODIFIER_PROPERTY_HEALTH_REGEN_PERCENTAGE
- MODIFIER_PROPERTY_IGNORE_CAST_ANGLE
- MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE
- MODIFIER_PROPERTY_INCOMING_PHYSICAL_DAMAGE_CONSTANT
- MODIFIER_PROPERTY_INCOMING_PHYSICAL_DAMAGE_PERCENTAGE
- MODIFIER_PROPERTY_INCOMING_SPELL_DAMAGE_CONSTANT
- MODIFIER_PROPERTY_INVISIBILITY_LEVEL
- MODIFIER_PROPERTY_IS_ILLUSION
- MODIFIER_PROPERTY_IS_SCEPTER
- MODIFIER_PROPERTY_LIFETIME_FRACTION
- MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS
- MODIFIER_PROPERTY_MAGICAL_RESISTANCE_DECREPIFY_UNIQUE
- MODIFIER_PROPERTY_MAGICAL_RESISTANCE_ITEM_UNIQUE
- MODIFIER_PROPERTY_MAGICDAMAGEOUTGOING_PERCENTAGE
- MODIFIER_PROPERTY_MANA_BONUS
- MODIFIER_PROPERTY_MANA_REGEN_CONSTANT
- MODIFIER_PROPERTY_MANA_REGEN_CONSTANT_UNIQUE
- MODIFIER_PROPERTY_MANA_REGEN_PERCENTAGE
- MODIFIER_PROPERTY_MANA_REGEN_TOTAL_PERCENTAGE
- MODIFIER_PROPERTY_MAX_ATTACK_RANGE
- MODIFIER_PROPERTY_MIN_HEALTH
- MODIFIER_PROPERTY_MISS_PERCENTAGE
- MODIFIER_PROPERTY_MODEL_CHANGE
- MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE
- MODIFIER_PROPERTY_MOVESPEED_BASE_OVERRIDE
- MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT
- MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE
- MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE_UNIQUE
- MODIFIER_PROPERTY_MOVESPEED_BONUS_UNIQUE
- MODIFIER_PROPERTY_NEGATIVE_EVASION_CONSTANT
- MODIFIER_PROPERTY_OVERRIDE_ANIMATION
- MODIFIER_PROPERTY_OVERRIDE_ANIMATION_RATE
- MODIFIER_PROPERTY_OVERRIDE_ANIMATION_WEIGHT
- MODIFIER_PROPERTY_OVERRIDE_ATTACK_MAGICAL
- MODIFIER_PROPERTY_PERSISTENT_INVISIBILITY
- MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS
- MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS_ILLUSIONS
- MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS_UNIQUE
- MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS_UNIQUE_ACTIVE
- MODIFIER_PROPERTY_PHYSICAL_CONSTANT_BLOCK
- MODIFIER_PROPERTY_POST_ATTACK
- MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE
- MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE_POST_CRIT
- MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE
- MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_COMPOSITE
- MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_MAGICAL
- MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_PHYSICAL
- MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_PURE
- MODIFIER_PROPERTY_PROCATTACK_FEEDBACK
- MODIFIER_PROPERTY_PROVIDES_FOW_POSITION
- MODIFIER_PROPERTY_RESPAWNTIME
- MODIFIER_PROPERTY_RESPAWNTIME_PERCENTAGE
- MODIFIER_PROPERTY_RESPAWNTIME_STACKING
- MODIFIER_PROPERTY_STATS_AGILITY_BONUS
- MODIFIER_PROPERTY_STATS_INTELLECT_BONUS
- MODIFIER_PROPERTY_STATS_STRENGTH_BONUS
- MODIFIER_PROPERTY_SUPER_ILLUSION_WITH_ULTIMATE
- MODIFIER_PROPERTY_TOTAL_CONSTANT_BLOCK
- MODIFIER_PROPERTY_TOTAL_CONSTANT_BLOCK_UNAVOIDABLE_PRE_ARMOR
- MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS
- MODIFIER_PROPERTY_TRANSLATE_ATTACK_SOUND
- MODIFIER_PROPERTY_TURN_RATE_PERCENTAGE

### Необработанные свойства

Эти объекты недвижимости не работают уже несколько первых лет. Управление данными:

| **Недвижимость** | **Альтернатива** |
| ------------------------------------------------ | ------------------------------------- |
| MODIFIER_PROPERTY_MODEL_SCALE | Используйте Lua `SetModelScale(float scale)` |
| MODIFIER_PROPERTY_MODEL_CHANGE | Используйте ключ `"ModelName"` в модификаторе |
| MODIFIER_PROPERTY_MOVESPEED_LIMIT | — |
| MODIFIER_PROPERTY_MOVESPEED_MAX | — |
| MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE | — |
| MODIFIER_PROPERTY_REINCARNATION | — |
| MODIFIER_PROPERTY_EXTRA_STRENGTH_BONUS | — |
| MODIFIER_PROPERTY_EXTRA_HEALTH_BONUS | — |
| MODIFIER_PROPERTY_EXTRA_MANA_BONUS | — |
| MODIFIER_PROPERTY_COOLDOWN_REDUCTION_CONSTANT | — |
| MODIFIER_PROPERTY_TOOLTIP | — |

## Блокировка разрешения
[![States](/images/external/ACfQMmq.png)](#states-block)

Состояния аналогичны свойствам, за исключением того, что они принимают одно из трех значений:

- `MODIFIER_STATE_VALUE_NO_ACTION` — по умолчанию; не меняй состояние
- `MODIFIER_STATE_VALUE_ENABLED` — включить состояние
- `MODIFIER_STATE_VALUE_DISABLED` — отключить состояние
```
"Modifiers"
{
    "modifier_magic_immune_and_no_healthbar"
    {
        "Passive" "1"
        "States"
        {
            "MODIFIER_STATE_NO_HEALTH_BAR" "MODIFIER_STATE_VALUE_ENABLED"
            "MODIFIER_STATE_MAGIC_IMMUNE"  "MODIFIER_STATE_VALUE_ENABLED"
        }
    }

    "modifier_stun"
    {
        "EffectName"       "particles/generic_gameplay/generic_stunned_old.vpcf"
        "EffectAttachType" "follow_origin"
        "States"
        {
            "MODIFIER_STATE_MAGIC_IMMUNE" "MODIFIER_STATE_VALUE_DISABLED"
            "MODIFIER_STATE_STUNNED"      "MODIFIER_STATE_VALUE_ENABLED"
        }
    }
}
```

### Список обработки модификатора

- `MODIFIER_STATE_ATTACK_IMMUNE`
- `MODIFIER_STATE_BLIND`
- `MODIFIER_STATE_BLOCK_DISABLED`
- `MODIFIER_STATE_CANNOT_MISS`
- `MODIFIER_STATE_COMMAND_RESTRICTED`
- `MODIFIER_STATE_DISARMED`
- `MODIFIER_STATE_DOMINATED`
- `MODIFIER_STATE_EVADE_DISABLED`
- `MODIFIER_STATE_FLYING`
- `MODIFIER_STATE_FROZEN`
- `MODIFIER_STATE_HEXED`
- `MODIFIER_STATE_INVISIBLE`
- `MODIFIER_STATE_INVULNERABLE`
- `MODIFIER_STATE_LOW_ATTACK_PRIORITY`
- `MODIFIER_STATE_MAGIC_IMMUNE`
- `MODIFIER_STATE_MUTED`
- `MODIFIER_STATE_NIGHTMARED`
- `MODIFIER_STATE_NO_HEALTH_BAR`
- `MODIFIER_STATE_NO_TEAM_MOVE_TO`
- `MODIFIER_STATE_NO_TEAM_SELECT`
- `MODIFIER_STATE_NOT_ON_MINIMAP`
- `MODIFIER_STATE_NOT_ON_MINIMAP_FOR_ENEMIES`
- `MODIFIER_STATE_NO_UNIT_COLLISION`
- `MODIFIER_STATE_OUT_OF_GAME`
- `MODIFIER_STATE_PASSIVES_DISABLED`
- `MODIFIER_STATE_PROVIDES_VISION`
- `MODIFIER_STATE_ROOTED`
- `MODIFIER_STATE_SILENCED`
- `MODIFIER_STATE_SOFT_DISARMED`
- `MODIFIER_STATE_SPECIALLY_DENIABLE`
- `MODIFIER_STATE_STUNNED`
- `MODIFIER_STATE_UNSELECTABLE`
Добавлено в Реборн:

- `MODIFIER_STATE_FAKE_ALLY`
- `MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY`
- `MODIFIER_STATE_TRUESIGHT_IMMUNE`
- `MODIFIER_STATE_LAST`

## Модификатор событий

[![Modifier Events](/images/external/LWPALN8.png)](#modifier-events)
См. Подробное руководство по [Modifier Events with Actions](/abilities/datadriven/datadriven-ability-events-modifiers).
Любой из них может находиться внутри модификатора и содержать столько Действий, сколько необходимо.

| **Событие модификатора** | **Триггеры** |
| ------------------- | ------------------------------------------------------------------------------ |
| При создании | Модификатор создан |
| OnDestroy | Модификатор удален |
| OnIntervalThink | Каждые `ThinkInterval` секунд |
| НаАтаке | Отряд, на котором установлен этот модификатор, завершил атаку |
| OnAttacked | Юнит, на котором действует этот модификатор, был атакован (стреляет в конце атаки) |
| OnAttackStart | Начинается анимация атаки юнита (не при создании снаряда) |
| OnAttackLanded      | Подразделение нанесло удар по цели |
| OnAttackFailed | Юнит пропускает атаку |
| OnAttackAllied | При атаке отрядов одной команды |
| OnDealDamage        | Отряд нанес урон |
| OnTakeDamage        | Юнит получил урон (`%attack_damage` настроен на урон после смягчения) |
| OnDeath             | Юнит с этим модификатором умер |
| При убийстве | Юнит убивает что угодно |
| OnHeroKill          | Юнит убивает героя |
| OnRespawn           | Юнит возрождается после таймера смерти |
| OnOrbFire           | `OnAttackStart` сферы (срабатывает при каждой атаке, если сфера используется) |
| OnOrbImpact         | `OnAttackLanded` сферы |
| OnAbilityExecuted   | Любая способность (включая предметы) использовалась отрядом с этим модификатором |
| ОнАбилитиСтарт | Юнит запускает способность (то же, что и `OnSpellStart`, но как событие-модификатор) |
| OnAbilityEndChannel | Когда устройство каким-либо образом завершает канал |
| OnHealReceived | Юнит получил здоровье любым способом (срабатывает даже при полном HP) |
| OnHealthGained | Юнит получил здоровье из внешнего источника |
| OnManaGained | Юнит получил ману (срабатывает даже при полной мане) |
| OnSpentMana | Единица потраченной маны |
| На заказ | Срабатывает при движении/применении/удержании/остановке |
| ОнUnitMoved | Триггеры при движении |
| OnTeleported | Срабатывает при завершении телепортации |
| О телепортации | Срабатывает при запуске телепорта |
| OnProjectileDodge | Юнит увернулся от снаряда |
| Онстатечанжед | Может сработать, когда юнит получает модификатор |
