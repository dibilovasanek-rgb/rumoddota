---
title: События и модификаторы способностей, управляемых данными
author: Noya
steamId: '76561198046984233'
date: 10.12.2014
---
каторы способностей, управляемых данными

Руководство, которое пытается охватить все события способностей и модификаторов системы _ability_datadriven_ с примерами.

![img](/images/external/T7W828Q.png)

Это руководство среднего уровня, требующее некоторых знаний о наиболее распространенных ключах-значениях первого уровня.
Если вы не уверены в значении любого из них, проверьте [DataDriven Ability
Breakdown](/abilities/ability-keyvalues).

## Введение
В системе, управляемой данными, событие — это нечто, что срабатывает, когда происходит определенное внутриигровое событие, например, завершение применения способности.

Они имеют вид On[*EventTriggerKeyword*], например `OnSpellStart` `OnCreated` и т. д.

Существует полный (по большей части) [list of Events in the Workshop Tools Wiki](https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Scripting/Abilities_Data_Driven#Ability_Events_and_Actions), но я собираюсь объяснить каждый из них на примерах того, как и когда их использовать.

В процессе я также буду использовать различные [Actions](https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Scripting/Abilities_Data_Driven#Actions) внутри событий, некоторые из них говорят сами за себя, а некоторые требуют подробного объяснения того, как их использовать.

Существует два типа: **События способностей** и **События-модификаторы**.

События способностей происходят на «первом уровне» способности. События модификатора должны находиться внутри блока модификатора.
Базовый скелет выглядит так:
```
"ability_custom"
{
    // AbilityBehavior and General values
    // AbilityValues block
    // precache block

    // Ability Events
    "OnSpellStart"
    { [ACTIONS] }

    "Modifiers"
    {
        "modifier_custom"
          {
            // Modifier Events
            "OnCreated"
            { [ACTIONS] }
        }
    }
}
```
Когда событие срабатывает, все действия, определенные в его блоке, будут выполнены.

Чтобы проверить, действительно ли ваше событие происходит тогда, когда вы ожидаете, вы можете добавить в него следующий блок действий:
```
"RunScript"
{
    "ScriptFile" "utilities.lua"
    "Function" "Test"
}
`
```
RunScript` — одно из самых распространенных и мощных действий, которые вы будете использовать для создания сложных способностей. Чтобы это работало, вам необходимо иметь файл сценария, в данном случае _utilities.lua_, внутри папки vscripts.

Вызываемая функция может иметь следующее:
```
lua
function Test( event )
    print("It works!")
end
```
Это отобразит на консоли переданные значения (обычно огромную таблицу), если ваш триггер события обнаружен правильно.

Я постараюсь держаться подальше от RunScript как действия, чтобы не превращать это в стену текста Dota Lua API, которая будет рассмотрена в другом, более продвинутом руководстве.

---

## События способностей

### При запуске заклинания
Это срабатывает после завершения `AbilityCastPoint`. Если у вашего заклинания его нет (по умолчанию 0), оно будет применено, как только юнит окажется в точке применения.

Это событие встречается у каждой способности, чье свойство «AbilityBehavior» отлично от `DOTA_ABILITY_BEHAVIOR_PASSIVE`.

_Пример_: Когда заклинание завершает свое применение, оно наносит урон всем юнитам в радиусе 500 от выбранной точки.
```
"ability_active"
{
    // General
    //-------------------------------------------------------------------------------------
    "BaseClass"             "ability_datadriven"
    "AbilityBehavior"       "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_AOE"
    "AbilityUnitTargetTeam" "DOTA_UNIT_TARGET_TEAM_ENEMY"
    "AbilityUnitTargetType" "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC"
    "AbilityUnitDamageType" "DAMAGE_TYPE_MAGICAL"

    // Stats
    //-------------------------------------------------------------------------------------
    "AbilityCastRange" "700"   // This will  also show a circle when hovering over the spell
    "AbilityCastPoint" "0.5"   // Cast animation time
    "AbilityCooldown"  "7"
    "AbilityManaCost"  "50 100 150 200"
    "AbilityDamage"    "100 200 300 400"
    "AOERadius" "500"  // This displays the AoE Helper, it doesn't have a real impact on the spell

    // Special
    //-------------------------------------------------------------------------------------
    "AbilitySpecial"
    {
        "01"
        {
            "var_type" "FIELD_INTEGER"
            "radius" "500"
        }
    }

    // Data Driven
    //-------------------------------------------------------------------------------------
    "OnSpellStart"
    {
        "Damage"
        {
            "Target"
            {
                "Center" "POINT"
                "Radius" "%radius"
                "Teams" "DOTA_UNIT_TARGET_TEAM_ENEMY"
                "Types" "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC"
            }
            "Type" "DAMAGE_TYPE_MAGICAL"
            "Damage" "%AbilityDamage"
         }
     }
 }
```
**Обратите внимание на использование `%radius` и других замен переменных, взятых из значенийabilitySpecial**. Это настоятельно рекомендуется, так как это облегчит получение всплывающих подсказок и будущие изменения баланса.

Внутри действия по повреждению также есть блок `"Target"`. Это могла бы быть простая линия `"Target" "TARGET"` вместо блока с центральным радиусом и типами целей, если бы мы просто хотели, чтобы заклинание было нацелено на одну цель.

---

### Переключаемые способности

#### Требуется способностьBehavior: DOTA_ABILITY_BEHAVIOR_TOGGLE
- OnToggleOn
- Вкл.ToggleВыкл.

_Пример_: включите ауру, которая усиливает ближайших союзников двойным уроном.

Для этого заклинания нам также необходимо использовать блок `precache`, который необходим для того, чтобы использованная вставка частицы отображалась в игре.
```
"ability_toggle"
{
    // General
    //-------------------------------------------------------------------------------------
    "BaseClass"        "ability_datadriven"
    "AbilityBehavior"  "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_TOGGLE"

    // Stats
    //-------------------------------------------------------------------------------------
    "AbilityCastPoint" "0.5"
    "AbilityCooldown"  "0"
    "AbilityManaCost"  "20 30 40 50"

    // Special
    //-------------------------------------------------------------------------------------
    "AbilitySpecial"
    {
        "01"
        {
            "var_type" "FIELD_INTEGER"
            "damage_bonus_percent" "100"
        }
        "02"
        {
            "var_type" "FIELD_INTEGER"
            "radius" "900"
        }
    }

    "precache"
    {
        "particle" "particles/units/heroes/hero_medusa/medusa_mana_shield_snakeskin.vpcf"
    }

    // Data Driven
    //-------------------------------------------------------------------------------------
    "OnToggleOn"
    {
        "ApplyModifier"
        {
            "Target"       "CASTER"
            "ModifierName" "modifier_toggle"
        }
    }
    "OnToggleOff"
    {
        "RemoveModifier"
        {
            "Target"       "CASTER"
            "ModifierName" "modifier_toggle"
        }
    }

    "Modifiers"
    {
        "modifier_toggle"
        {
            "Passive"    "0"
            "IsBuff"     "1"
            "IsPurgable" "0"
            "IsHidden"   "1"

            "Aura" "toggle_aura"
            "Aura_Radius" "%radius"
            "Aura_Teams" "DOTA_UNIT_TARGET_TEAM_FRIENDLY"
            "Aura_Types" "DOTA_UNIT_TARGET_ALL"
        }
        "toggle_aura"
        {
            "IsBuff" "1"
            "IsHidden" "0"
            "Properties"
            {
                "MODIFIER_PROPERTY_BASEDAMAGEOUTGOING_PERCENTAGE" "%damage_bonus_percent"
            }
            "EffectName" "particles/units/heroes/hero_medusa/medusa_mana_shield_snakeskin.vpcf"
            "EffectAttachType" "follow_origin"
        }
    }
}
```

---

##### _Optional_: Cost to Maintain

For toggleable abilities, it's common to have a cost to maintain the ability. For this, we need to spend some mana at a time rate.

This requires the use of `OnIntervalThink` with a `RunScript` Action to spend the mana (which is done with Lua).

`OnIntervalThink` is a Modifier Event (so it needs to be inside a modifier to work) used to repeat an effect every `ThinkInterval` seconds.

---

### Channeled Abilities

#### AbilityBehavior Needed: DOTA_ABILITY_BEHAVIOR_CHANNELLED

There are 3 Events that control channels:

- OnChannelFinish
- OnChannelInterrupted
- OnChannelSucceeded

`OnChannelSucceeded` предназначен для завершенных каналов, `OnChannelInterrupted` для неисправных каналов, а `OnChannelFinish` срабатывает в любом случае. Как и в случае с любой способностью, вы можете добавить столько событий, сколько необходимо.

_Пример_: Направленное поглощение HP. Эта способность также требует использования `OnIntervalThink` (событие-модификатор) для лечения и нанесения урона каждую секунду.

**Обратите внимание на `"AbilityChannelTime" "10"`**. Это ключевое значение также является обязательным для такого рода способностей.
```
"ability_channel"
{
    // General
    //-------------------------------------------------------------------------------------
    "BaseClass" "ability_datadriven"
    "AbilityBehavior" "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET | DOTA_ABILITY_BEHAVIOR_CHANNELLED"
    "AbilityUnitTargetTeam" "DOTA_UNIT_TARGET_TEAM_ENEMY"
    "AbilityUnitTargetType" "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC"
    "AbilityUnitDamageType" "DAMAGE_TYPE_MAGICAL"

    // Stats
    //-------------------------------------------------------------------------------------
    "AbilityCastRange" "700"
    "AbilityCastPoint" "0.5"
    "AbilityCooldown" "3"
    "AbilityManaCost" "50"
    "AbilityDuration" "10"
    "AbilityChannelTime" "10"   // This sets the max time the spell can be channeled

    // Special
    //-------------------------------------------------------------------------------------
    "AbilitySpecial"
    {
        "01"
        {
            "var_type" "FIELD_INTEGER"
            "damage" "25"
        }
    }

    // Data Driven
    //-------------------------------------------------------------------------------------
    "OnSpellStart"
    {
        "ApplyModifier"
        {
            "Target" "TARGET"
            "ModifierName" "modifier_drain"
        }
    }
    "OnChannelFinish"
    {
        "RemoveModifier"
        {
            "Target" "TARGET"
            "ModifierName" "modifier_drain"
        }
    }
    "OnChannelInterrupted"
    {
        "RemoveModifier"
        {
            "Target" "TARGET"
            "ModifierName" "modifier_drain"
        }
    }

    "Modifiers"
    {
        "modifier_drain"
        {
            "IsDebuff" "1"
            "ThinkInterval" "1.0"
            "OnIntervalThink"
            {
                "Damage"
                {
                    "Target" "TARGET"
                    "Type"   "DAMAGE_TYPE_MAGICAL"
                    "Damage" "%damage"
                }
                "Heal"
                {
                    "HealAmount" "%damage"
                    "Target" "CASTER"
                }
            }
        }
    }
}
```

---

### Owner died or spawned

- OnOwnerDied
- OnOwnerSpawned

_Example_: When the player with this spell dies, show an explosion and drop an item.

For the explosion, we need to use the CreateThinker action, which serves as a dummy to attach a particle effect (as trying to do so on the dead target usually won't work).
Модификатор мыслителя player_death_fx имеет событие модификатора `OnCreated`, которое будет объяснено более подробно позже, но, как следует из названия, оно срабатывает, как только модификатор создан.

Удаление элемента выполняется с помощью действия `CreateItem`, которое имеет разные значения для управления свойствами создания.
```
"ability_unit_died"
{
    // General
    //-------------------------------------------------------------------------------------
    "BaseClass" "ability_datadriven"
    "AbilityBehavior" "DOTA_ABILITY_BEHAVIOR_PASSIVE"

    "precache"
    {
        "particle" "particles/units/heroes/hero_lina/lina_spell_light_strike_array_explosion.vpcf"
    }

    // Data Driven
    //-------------------------------------------------------------------------------------
    "OnOwnerDied"
    {
        // Create a dummy at the dead units position to attach the particle effects
        "CreateThinker"
        {
            "ModifierName" "player_death_fx"
            "Target" "CASTER"
        }

        "CreateItem"
        {
            // This Target block is needed to be able to target dead units.
            "Target"
            {
                "Center" "CASTER"
                "Flags" "DOTA_UNIT_TARGET_FLAG_DEAD"
            }

            "ItemName"       "item_rapier"
            "ItemCount"      "1"
            "SpawnRadius"    "1"
            "LaunchHeight"   "300"
            "LaunchDistance"    "?1 100" // Min Max
            "LaunchDuration"    "1.0"
            // Optional
            //"ItemChargeCount" "1" // This is used for charged consumable items
            //"AutoUse" "1"         // If this is uncommented, item will be used when walking over
        }
    }

    "Modifiers"
    {
        "player_death_fx"
        {
            "OnCreated"
            {
                "AttachEffect"
                {
                    "EffectName" "particles/units/heroes/hero_lina/lina_spell_light_strike_array_explosion.vpcf"
                    "EffectAttachType" "follow_origin"
                    "Target" "TARGET"
                }
            }
        }
    }
}
```

---

### Projectiles

#### Action Needed: TrackingProjectile or LinearProjectile

- OnProjectileHitUnit
- OnProjectileFinish

These 2 Events provide detection for Projectile collision.
`OnProjectileHitUnit` срабатывает при соединении с допустимым юнитом, а `OnProjectileFinish` срабатывает как при попадании в действующий юнит, так и при завершении его фиксированного расстояния.

**Примечание**: _Необходимо полное руководство по двум различным действиям со снарядами. Это лишь краткое объяснение для поддержки базового примера_.

Есть два Действия, которые могут создавать снаряды. `LinearProjectile` нацелен на точку и будет следовать по прямой линии, а `TrackingProjectile` нацелен на объект и изменит свою траекторию, чтобы следовать за целью.

Ниже приведен пример значений для обоих действий.

#### Отслеживающий снаряд
```
"TrackingProjectile"
{
    "Target"           "TARGET"
    "EffectName"       "particles/units/heroes/hero_enchantress/enchantress_impetus.vpcf"
    "Dodgeable"        "1"
    "ProvidesVision"   "1"
    "VisionRadius"     "300"
    "MoveSpeed"        "1000"
    "SourceAttachment"  "DOTA_PROJECTILE_ATTACHMENT_ATTACK_1"
}
```

#### ЛинейныйСнаряд
```
"LinearProjectile"
{
    "Target"      "POINT"
    "EffectName"  "particles/units/heroes/hero_mirana/mirana_spell_arrow.vpcf"
    "MoveSpeed"   "1100"
    "StartRadius"   "125"
    "StartPosition" "attach_attack1"
    "EndRadius"     "125"
    "FixedDistance" "1000"
    "TargetTeams"   "DOTA_UNIT_TARGET_TEAM_ENEMY"
    "TargetTypes"   "DOTA_UNIT_TARGET_BASIC | DOTA_UNIT_TARGET_HERO"
    "TargetFlags"   "DOTA_UNIT_TARGET_FLAG_NONE"
    "HasFrontalCone"    "0"
    "ProvidesVision" "1"
    "VisionRadius" "300"
}
```
Стоит отметить, что очень важно, чтобы система частиц `EffectName` имела необходимые свойства для каждого типа снаряда, а это означает, что если вы попытаетесь использовать частицу, предназначенную для отслеживания, в качестве LinearProjectile, это не сработает.

---

_Пример 1_: Линейный снаряд, который оглушает в радиусе, когда проходит фиксированное расстояние.
```
"ability_projectile_linear"
{
    // General
    //-------------------------------------------------------------------------------------
    "BaseClass" "ability_datadriven"
    "AbilityBehavior" "DOTA_ABILITY_BEHAVIOR_POINT"
    "AbilityUnitTargetTeam" "DOTA_UNIT_TARGET_TEAM_ENEMY"
    "AbilityUnitTargetType" "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC"
    "AbilityUnitDamageType" "DAMAGE_TYPE_PURE"

    // Stats
    //-------------------------------------------------------------------------------------
    "AbilityCastRange" "600"
    "AbilityDamage" "100"

    // Special
    //-------------------------------------------------------------------------------------
    "AbilitySpecial"
    {
        "01"
        {
            "var_type" "FIELD_INTEGER"
            "distance" "600"
        }
        "02"
        {
            "var_type" "FIELD_INTEGER"
            "damage_aoe" "300"
        }
    }

    "precache"
    {
        "particle" "particles/units/heroes/hero_mirana/mirana_spell_arrow.vpcf" //linear
    }

    // Data Driven
    //-------------------------------------------------------------------------------------
    "OnSpellStart"
    {
        "LinearProjectile"
        {
            "Target" "POINT"
            "EffectName" "particles/units/heroes/hero_mirana/mirana_spell_arrow.vpcf"
            "MoveSpeed" "600"
            "StartRadius" "125"
            "StartPosition" "attach_attack1"
            "EndRadius" "125"
            "FixedDistance" "500"
            "TargetTeams" "DOTA_UNIT_TARGET_TEAM_ENEMY"
            "TargetTypes" "DOTA_UNIT_TARGET_BASIC | DOTA_UNIT_TARGET_HERO"
            "TargetFlags" "DOTA_UNIT_TARGET_FLAG_NONE"
            "HasFrontalCone" "0"
            "ProvidesVision" "1"
            "VisionRadius" "300"
        }
    }

    "OnProjectileHitUnit"
    {
        "DeleteOnHit" "0" // This will make the projectile continues its trajectory after hitting
    }

    "OnProjectileFinish"
    {
        "ActOnTargets"
        {
            "Target"
            {
                "Center" "POINT"
                "Radius" "%damage_aoe"
                "Teams" "DOTA_UNIT_TARGET_TEAM_ENEMY"
                "Types" "DOTA_UNIT_TARGET_BASIC | DOTA_UNIT_TARGET_HERO"
            }
            "Action"
            {
                "Stun"
                {
                    "Duration" "1"
                    "Target" "TARGET"
                }
            }
        }
    }
}
```

---

_Example 2_: Spell without targeting that creates many TrackingProjectile-targeted enemies in radius, damaging them on hit.

```
"ability_projectile_tracking"
{
    // General
    //-------------------------------------------------------------------------------------
    "BaseClass" "ability_datadriven"
    "AbilityBehavior" "DOTA_ABILITY_BEHAVIOR_NO_TARGET"
    "AbilityUnitTargetTeam" "DOTA_UNIT_TARGET_TEAM_ENEMY"
    "AbilityUnitTargetType" "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC"
    "AbilityUnitDamageType" "DAMAGE_TYPE_PURE"

    // Stats
    //-------------------------------------------------------------------------------------
    "AbilityCastRange" "600"
    "AbilityDamage" "100"

    // Special
    //-------------------------------------------------------------------------------------
    "AbilitySpecial"
    {
        "01"
        {
            "var_type" "FIELD_INTEGER"
            "radius" "1000"
        }
    }

    "precache"
    {
        "particle" "particles/units/heroes/hero_enchantress/enchantress_impetus.vpcf"
    }

    // Data Driven
    //-------------------------------------------------------------------------------------
    "OnSpellStart"
    {
        "ActOnTargets"
        {
            "Target"
            {
                "Center" "CASTER"
                "Radius" "%radius"
                "Teams" "DOTA_UNIT_TARGET_TEAM_ENEMY"
                "Types" "DOTA_UNIT_TARGET_BASIC | DOTA_UNIT_TARGET_HERO"
            }
            "Action"
            {
                "TrackingProjectile"
                {
                    "Target" "TARGET"
                    "EffectName" "particles/units/heroes/hero_enchantress/enchantress_impetus.vpcf"
                    "Dodgeable" "1"
                    "ProvidesVision" "1"
                    "VisionRadius" "300"
                    "MoveSpeed" "1000"
                    "SourceAttachment" "DOTA_PROJECTILE_ATTACHMENT_ATTACK_1"
                }
            }
        }
    }

    "OnProjectileHitUnit"
    {
        "DeleteOnHit" "1"
        "Damage"
        {
            "Type" "DAMAGE_TYPE_PHYSICAL"
            "Damage" "%AbilityDamage"
            "Target" "TARGET"
        }
    }
}
```

---

**TODO:** More on projectiles in a new tutorial

---

### Item Equip

These 2 Events are only to be used in _item_datadriven_

- ОнЕкип
- OnUnequip (не указан в вики)

Важно помнить, что каждое Событие и Действие, которое работает для способности, также может быть использовано внутри _item_datadriven_. Предметы — это, по сути, способности, которые занимают разные слоты в пользовательском интерфейсе.

`OnEquip` проверяется перед применением каких-либо модификаторов или бонусов, поэтому чрезвычайно полезно устанавливать ограничения на предметы (не разрешать герою носить определенный предмет, если соблюдено условие) и выполнять эффекты, как только предмет подбирается.

`OnUnequip` — это самый прямой способ определить, когда предмет был выброшен (событие инвентаризации Lua нарушено). Это может быть полезно для удаления эффектов, добавленных с помощью сценариев, например добавления/улучшения способности.

Однако для этого потребуется некоторый тяжелый Lua, поэтому давайте упростим задачу и создадим событие для DataDriven Item, которое воспроизводит звук победы при выборе и звук поражения при падении.

Звуки мы пока не использовали, это обычный процесс:

#### 1. Получите звуковую струнную линию.

Для этой цели я использую [Dota 2 Sound Editor](https://github.com/pingzing/dota2-sound-editor/releases) от pingzip.

В этом примере я хочу использовать звук Legion Commander Duel и немного жуткого звука Diretide, поэтому строки — `"Hero_LegionCommander.Duel.Victory"` и `"diretide_roshdeath_Stinger"`.

![img](/images/external/5321426cdb.png)

**Выберите навык и нажмите Ctrl+C**

#### 2. Предварительно кэшируйте звуковой файл.
Чтобы найти его, зайдите в браузер ресурсов в инструментах и ​​введите _sounds_ плюс часть героя/предмета/файла, в котором хранится звук. Поиск по «звукам легиона» и «звукам диретида» дает нам полные пути к звуковым файлам:

- `"soundevents/game_sounds_heroes/game_sounds_legion_commander.vsndevts"`
- `"soundevents/game_sounds_stingers_diretide.vsndevts"`

_Пример_: Предмет со специальным звуком экипировки и выпадения. Многие значения предметов (например, стоимость или значок) опущены, чтобы сделать их короче, игра будет использовать множество значений по умолчанию.
```
"item_custom"
{
    "ID" "1100"
    "BaseClass" "item_datadriven"
    "AbilityTexture" "item_rapier"
    "Model" "models/props_gameplay/recipe.vmdl"
    "Effect" "particles/generic_gameplay/dropped_item.vpcf"

    "precache"
    {
        "soundfile" "soundevents/game_sounds_heroes/game_sounds_legion_commander.vsndevts"
        "soundfile" "soundevents/game_sounds_stingers_diretide.vsndevts"
    }

    "OnEquip"
    {
        "FireSound"
        {
            "EffectName" "Hero_LegionCommander.Duel.Victory"
            "Target"     "CASTER"
        }
    }

    "OnUnequip"
    {
        "FireSound"
        {
            "EffectName" "diretide_roshdeath_Stinger"
            "Target"     "CASTER"
        }
    }

}
```

---

**Tip**: You can write _-item item_custom_ with cheats enabled to give your main hero this item.

---

**TODO:** More on sounds in a new tutorial

---

### Другие менее распространенные события способностей

Никогда не пробовал это, нужно поэкспериментировать и дать несколько примеров ссылок. Некоторыми событиями также можно глобально управлять с помощью событий Lua, поэтому вы не увидите много кодов, использующих их.

### При обновлении

Обновление способности из HUD. Полезно для способностей, содержащих несколько заклинаний, которые необходимо повышать вместе.

_Пример_: уровень Spirit Bear повышается при обновлении заклинания, дополнительный мипо появляется при использовании ультимейта.

### OnAbilityPhaseStart
Срабатывает при применении способности (до того, как юнит повернется к цели). Фаза способности — это время между применением способности и моментом, когда отряду было приказано применить способность.

_Пример_: Снайперский ульт

---

## События модификатора

### Создавать и разрушать

- OnCreated — модификатор создан.
- OnDestroy - модификатор удален.
Чтобы применить или уничтожить модификатор (без значения `Passive`), есть два очень распространенных действия, которые обычно применяются событием способности, например `OnSpellStart`:
```
"ApplyModifier"
{
    "ModifierName" "modifier_test"
    "Target" TARGETKEY
}

"RemoveModifier"
{
    "ModifierName" "modifier_test"
    "Target" TARGETKEY
}
```
При попытке `ApplyModifier` с `ModifierName`, который уже существует в цели, он переопределит его, если у него нет значения ключа `"Attributes" "MODIFIER_ATTRIBUTE_MULTIPLE"`.

Попытка использовать `RemoveModifier`, которого нет на устройстве, не вызовет никаких проблем.

_Пример_: переключитесь, чтобы применить/удалить эффект частиц гниения на отряде с помощью этого заклинания.

`AttachEffect` использует блок `ControlPoints` для управления радиусом системы частиц. В этом нет необходимости для большинства частиц, которые созданы как самоусиливающиеся, но поскольку в данном случае частица допускает переменный радиус, мы можем этим воспользоваться.

_Каждая частица имеет свои собственные контрольные точки, и их обнаружение и управление ими — это тема для другого урока._
```
"ability_modifier_test"
{
    // General
    //-------------------------------------------------------------------------------------
    "BaseClass" "ability_datadriven"
    "AbilityBehavior" "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_TOGGLE"

    // Stats
    //-------------------------------------------------------------------------------------
    "AbilityManaCost" "0"
    "AbilityCooldown" "0"

    // Special
    //-------------------------------------------------------------------------------------
    "AbilitySpecial"
    {
        "01"
        {
            "var_type" "FIELD_INTEGER"
            "radius" "500"
        }
    }

    "precache"
    {
        "particle" "particles/units/heroes/hero_pudge/pudge_rot.vpcf"
    }

    // Data Driven
    //-------------------------------------------------------------------------------------
    "OnToggleOn"
    {
        "ApplyModifier"
        {
            "ModifierName" "modifier_example"
            "Target" "CASTER"
        }
    }

    "OnToggleOff"
    {
        "RemoveModifier"
        {
            "ModifierName" "modifier_example"
            "Target" "CASTER"
        }
    }

    "Modifiers"
    {
        "modifier_example"
        {
            "IsBuff" "1"
            "IsHidden" "0"
            "Passive" "0"

            // Modifier Events
            //-----------------------------------------------------------------------------
            "OnCreated"
            {
                "AttachEffect"
                {
                    "Target" "CASTER"
                    "EffectName" "particles/units/heroes/hero_pudge/pudge_rot.vpcf"
                    "EffectAttachType" "follow_origin"

                    "ControlPoints"
                    {
                        "00" "0 0 0"
                        "01" "%radius 0 0"
                    }
                }
            }
        }
    }
}
```

---

For the following examples I'm gonna skip the AbilityBehavior, AbilitySpecials and other values and jump straight into the modifier blocks. You should be able to replace "modifier_rot" for a new modifier and change the Apply & Remove, or just add new ones.

Every value with a % is a replacement of an AbilitySpecial, so make sure to also add those when adding new modifier examples.

---

**TODO:** More on Particle Attachments.

---

### Repeating actions

- OnIntervalThink

Together with `"ThinkInterval" "%value"` this will repeat the actions in this block every %value seconds.

_Example_: Do damage per second for the duration of the modifier.

```
"modifier_dot"
{
    "Duration" "%duration"
    "ThinkInterval" "1"
    "OnIntervalThink"
    {
        "Damage"
        {
            "Type" "DAMAGE_TYPE_MAGICAL"
            "Damage" "%AbilityDamage"
            "Target"    "TARGET"
        }
    }
}
```

---

_Example 2_: Expanding on the Toggle example, adding this to a modifier will call a Script Function every `ThinkInterval`. In this case, it calls a function to spend the mana and deactivate the ability when the cost per second can't be met.

```
    "ThinkInterval" "1"
    "OnIntervalThink"
    {
        "RunScript"
        {
            "ScriptFile" "abilities.lua"
            "Function"   "maintain_toggle"
        }
    }
```
Скрипт очень прост:
```
lua
function maintain_toggle( event )
    local manacost_per_second = 10
    -- if the caster has enough mana left to maintain the spell, spend it. Else, toggle the ability off
    if event.caster:GetMana() >= manacost_per_second then
        event.caster:SpendMana( manacost_per_second, event.ability)
    else
        event.ability:ToggleAbility()
   end
end
```
Поместите его в файл сценария с именем `abilities.lua` внутри папки vscripts или измените путь к ScriptFile (он принимает относительные пути к vscripts).

---

### Атакующие, стартовые и приземляющиеся атаки

Существует 6 различных событий-модификаторов для обнаружения атак в разных точках:

- При атаке
- При атаке
- OnAttackStart
- OnAttackLanded
- Ошибка при атаке
- OnAttackAllied

---

### При атаке

Юнит, к которому прикреплен этот модификатор, завершил атаку.

_Пример_: экземпляр магического урона при каждой атаке.
_Это сработает даже при промахах_. Для более управляемого триггера используйте события `OnAttackStart` и `OnAttackLanded`.
```
"modifier_magic_attack"
{
    "IsBuff" "1"
    "Passive" "1"
    "IsHidden" "0"

    "OnAttack"
    {
        "Damage"
        {
           "Type" "DAMAGE_TYPE_MAGICAL"
           "Damage" "%MagicDamage"
           "Target" "TARGET"
        }
    }
}
```

### OnAttacked

Юнит, к которому прикреплен этот модификатор, был атакован (срабатывает в конце атаки).

_Пример_: Имитирует усиление «Вне боя» с 7-секундным «обнаружением боя».

Пассивно он обеспечивает усиление регенерации, но как в `OnAttack`, так и в `OnAttacked` применяется дебафф, добавляющий ту же регенерацию здоровья в качестве отрицательного значения. Поскольку модификатор уникален, если мы явно не сделаем его MULTIPLE, он будет применен только один раз.
```
"modifier_out_of_combat_buff"
{
    "IsBuff" "1"
    "Passive" "1"
    "IsHidden" "0"
    "Properties"
    {
        "MODIFIER_PROPERTY_HEALTH_REGEN_PERCENTAGE" "10"
    }

    // Particle Effect to visualize it
    "OnCreated"
    {
        "AttachEffect"
        {
            "Target" "CASTER"
            "EffectName" "particles/units/heroes/hero_legion_commander/legion_commander_press.vpcf"
            "EffectAttachType" "follow_origin"
            "EffectLifeDurationScale" "1"
        }
    }

    "OnAttacked"
    {
        "ApplyModifier"
        {
            "ModifierName" "modifier_warchasers_solo_buff_combat"
            "Target" "CASTER"
        }
    }
    "OnAttack"
    {
        "ApplyModifier"
        {
            "ModifierName" "modifier_warchasers_solo_buff_combat"
            "Target" "CASTER"
        }
    }
}

"modifier_warchasers_solo_buff_combat"
{
    "EffectName" "particles/items2_fx/satanic_buff.vpcf"
    "EffectAttachType" "follow_origin"

    "IsHidden" "1"
    "Duration" "7"
    "Properties"
    {
        "MODIFIER_PROPERTY_HEALTH_REGEN_PERCENTAGE" "-10"
    }
    "Attributes" "MODIFIER_ATTRIBUTE_IGNORE_INVULNERABLE"
}
```

### OnAttackStart

Юнит, к которому прикреплен этот модификатор, начал атаковать цель (когда начинается анимация атаки, а не когда создается снаряд автоатаки). Это можно использовать для применения модификаторов перед атакой, таких как крит.

_Пример_: при начале атаки задайте случайный модификатор, который будет удален после ее окончания. Половина атак наносит критический урон, половина атак ненадолго оглушает заклинателя.
```
"modifier_luck"
{
    "IsHidden" "1"
    "IsBuff" "1"
    "Passive" "1"

    "OnAttackStart"
    {
        // Remove the modifier on each attack start to disable people
        // from canceling attacks to get a guaranteed crit.
        "RemoveModifier"
        {
            "ModifierName" "modifier_good_luck"
            "Target" "CASTER"
        }
        "Random"
        {
            "Chance" "50"
            "OnSuccess"
            {
                "ApplyModifier"
                {
                    "ModifierName" "modifier_good_luck"
                    "Target" "CASTER"
                }
            }
            "OnFailure"
            {
                "Stun"
                {
                    "Target" "CASTER"
                    "Duration" "0.5"
                }
            }
        }
    }
}

"modifier_good_luck"
{
    "IsHidden" "1"
    "Properties"
    {
        "MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE" "%crit_bonus"
    }

    "OnAttackLanded"
    {
        "RemoveModifier"
        {
            "ModifierName" "modifier_good_luck"
            "Target" "CASTER"
        }
    }
}
```

### OnAttackLanded

Юнит, к которому прикреплен этот модификатор, атаковал цель.

Помимо использования его для удаления модификатора срабатывания атаки, как в последнем примере, мы можем использовать его для срабатывания эффектов только тогда, когда атака действительно попадает в цель (промахи не учитываются).

_Пример_: Статический прирост здоровья и процент вампиризма.
```
"modifier_lifesteal"
{
    "IsHidden" "1"
    "IsBuff" "1"
    "Passive" "1"
    "OnAttackLanded"
    {
        "Lifesteal"
        {
            "Target" "ATTACKER"
            "LifestealPercent" "%lifesteal"
        }
        "Heal"
        {
            "HealAmount" "20"
            "Target" "CASTER"
        }
    }
}
```

### OnAttackFailed

AttackFailed срабатывает при промахе. Вы можете использовать это, чтобы повторно применить модификатор, который не должен теряться при промахе, или сделать что-либо, связанное с эффектами после уклонения.

_Пример_: после промаха дает дополнительную скорость атаки на некоторое время.
```
"modifier_on_miss"
{
    "IsHidden" "1"
    "IsBuff" "1"
    "Passive" "1"

    "OnAttackFailed"
    {
        "ApplyModifier"
        {
            "ModifierName" "modifier_extra_attackspeed"
            "Target" "CASTER"
        }
    }
}

"modifier_extra_attackspeed"
{
    "Duration" "%duration"
    "IsHidden" "0"
    "IsBuff"   "1"

    "Properties"
    {
        "MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT"  "%attack_speed_bonus"
    }
}
```

### OnAttackAllied

AttackAllied срабатывает при атаке юнитов одной команды. Это можно включить, добавив это к модификатору отряда, которого вы хотите атаковать:
```
  "States"
  {
      "MODIFIER_STATE_SPECIALLY_DENIABLE" "MODIFIER_STATE_VALUE_ENABLED"
  }
```
_Пример_: Отбрасывает союзников, атакуя их.
```
"modifier_knockback_attack"
{
    "IsHidden" "0"
    "IsBuff" "1"
    "Passive" "1"

    "OnAttackAllied"
    {
        "Knockback"
        {
            "Target" "TARGET"
            "Distance" "250"
            "Height" "75"
            "Duration" "0.5"
        }
    }
}
```

---

## Damage Events

- OnDealDamage
- OnTakeDamage

---

### OnDealDamage
Юнит, к которому прикреплен этот модификатор, нанес урон.

_Пример_: Вампиризм от всех источников урона.
```
"modifier_much_lifesteal"
{
    "IsBuff"    "1"
    "IsHidden" "0"

    "OnDealDamage"
    {
        "Lifesteal"
        {
            "Target"    "ATTACKER"
            "LifestealPercent"  "%lifesteal"
        }
    }
}
```

### OnTakeDamage

Юнит, к которому прикреплен этот модификатор, получил урон. `%attack_damage` устанавливается на значение урона после смягчения.

_Пример_: Возвратите весь полученный урон.
```
"modifier_return"
{
    "IsBuff"    "1"
    "IsHidden" "0"
    "Duration" "%duration"

    "OnTakeDamage"
    {
        "Damage"
        {
            "Target" "ATTACKER"
            "Type"   "DAMAGE_TYPE_PHYSICAL"
            "Damage" "%attack_damage"
        }
    }
}
```

---

## Killing and Dying

- OnDeath
- OnKill
- OnHeroKill
- OnRespawn

---

### При смерти

Аналогично OnOwnerDied, но в качестве события-модификатора.

Имейте в виду, что действие `ApplyModifier` намного более управляемо и чисто, чем добавление способности к отряду, поэтому это ключ к заклинаниям типа «если отряд умрет с этим эффектом, он подойдет…».

_Пример_: Когда юнит с этим модификатором умирает, он наносит урон в _радиусе_. Он имеет ограниченную _длительность_.
```
"modifier_damage_ondeath"
{
    "IsHidden" "0"
    "IsDebuff" "1"
    "Duration" "%duration"

    "OnDeath"
    {
        "Damage"
        {
            "Target"
            {
                "Center" "UNIT"
                "Radius" "%radius"
                "Teams" "DOTA_UNIT_TARGET_TEAM_ENEMY"
                "Types" "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC"
            }
            "Type"   "DAMAGE_TYPE_MAGICAL"
            "Damage" "%AbilityDamage"
        }
    }
}
```

### При убийстве

Это срабатывает, если юнит с модификатором убивает что-нибудь.

_Пример_: Дайте бонусный_урон за каждого крипа, суммируясь.
```
"modifier_damage_onkill"
{
    "Passive" "1"

    "OnKill"
    {
        "ApplyModifier"
        {
            "ModifierName"   "modifier_damage_per_kill"
            "Target"         "CASTER"
        }
    }
}

"modifier_damage_per_kill"
{
    "IsHidden" "1"
    "IsBuff" "1"

    "Properties"
    {
        "MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE" "%bonus_damage"
    }
}
```
В этом модификаторе индикатор усиления для каждого убийства скрыт, потому что в противном случае он бы отображал один значок усиления для каждого убитого юнита и быстро достигал бы предела. Значения `IsHidden` и `IsBuff` опущены в первом модификаторе, чтобы показать, что он будет использовать значения по умолчанию: `"IsHidden" "0"` и `"IsBuff" "1"`.

Для обработки стеков нам нужно использовать Lua.

### При убийстве героя

В отличие от OnKill, это срабатывает только после убийства вражеского героя.

- Примеры: Урна, счетчики убийств Глушителем/Паджем, Кровавый камень.
### При возрождении

- Пример: возрождение нескольких персонажей при возрождении основного.

---

## Эффекты сфер

#### Требуется способностьПоведение: DOTA_ABILITY_BEHAVIOR_ATTACK

Эти три предназначены для совместного использования внутри модификатора:
- Сфера
- ОнОрбФайр
- ОнОрбИмпакт

Сферы — это уникальные модификаторы атаки, которые не суммируются с другими сферами.

Наряду с атакующим поведением к этому типу способностей обычно добавляют `DOTA_ABILITY_BEHAVIOR_AUTOCAST`, `DOTA_ABILITY_BEHAVIOR_UNIT_TARGET` или `DOTA_ABILITY_BEHAVIOR_PASSIVE`.

_Пример_: это автоматическое применение `Orb` со снарядом магической ракеты, который тратит ману как `OnOrbFire` и применяет модификатор, урон и звук `OnOrbImpact`. Modifier_black_arrow не учитывается — это может быть все, что мы уже видели.
```
"orb_example"
{
    // General
    //-------------------------------------------------------------------------------------
    "BaseClass" "ability_datadriven"
    "AbilityBehavior"   "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET | DOTA_ABILITY_BEHAVIOR_AUTOCAST | DOTA_ABILITY_BEHAVIOR_ATTACK"
    "AbilityUnitTargetTeam" "DOTA_UNIT_TARGET_TEAM_ENEMY"
    "AbilityUnitTargetType" "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC"

    // Stats
    //-------------------------------------------------------------------------------------
    "AbilityCastRange"  "600"
    "AbilityManaCost"   "10"

    "precache"
    {
        "particle"  "particles/units/heroes/hero_vengeful/vengeful_magic_missle.vpcf"
        "soundfile" "soundevents/game_sounds_heroes/game_sounds_medusa.vsndevts"
    }

    // Special
    //-------------------------------------------------------------------------------------
    "AbilitySpecial"
    {
        "01"
        {
            "var_type"  "FIELD_INTEGER"
            "bonus_damage"  "10 20 30 40"
        }
    }

    // Data Driven
    //-------------------------------------------------------------------------------------
    "Modifiers"
    {
        "modifier_orb"
        {
            "Passive"   "1"
            "IsHidden"  "1"
            "Orb"
            {
                "Priority"  "DOTA_ORB_PRIORITY_ABILITY"
                "ProjectileName" "particles/units/heroes/hero_vengeful/vengeful_magic_missle.vpcf"
                "CastAttack"    "1" //This ensures the effect doesn't fire every time
            }

            "OnOrbFire"
            {
                "SpendMana"
                {
                    "Mana" "%AbilityManaCost"
                }
            }

            "OnOrbImpact"
            {
                "ApplyModifier"
                {
                    "ModifierName"  "modifier_black_arrow"
                    "Target"    "TARGET"
                }

               "FireSound"
               {
                   "EffectName" "Hero_Medusa.MysticSnake.Target"
                   "Target" "CASTER"
               }

               "Damage"
               {
                   "Type" "DAMAGE_TYPE_PHYSICAL"
                   "Damage" "%bonus_damage"
                   "Target" "TARGET"
               }
          }
     }
}
```

---

## Other less common Modifier Events

- Ability casting
  - OnAbilityExecuted
  - OnAbilityEndChannel
- Health and Mana
  - OnHealReceived
  - OnHealthGained
  - OnManaGained
  - OnSpentMana
- Движение
  - На заказ
  - ОнUnitMoved
  - При телепортации
  - При телепортации
- Мисс Венеции
  - OnProjectileDodge
- Другие
  - OnStateChanged
### OnAbilityExecuted

Любая способность (включая предметы) использовалась отрядом с этим модификатором.

_Пример_: Шанс обновления используемой способности. Блок `DelayedAction` предназначен для ожидания начала перезарядки навыка. Здесь используется простой сценарий Lua, поясняемый после кода способности, управляемой данными.
```
"ability_preparation"
{
    // General
    //-------------------------------------------------------------------------------------
    "BaseClass" "ability_datadriven"
    "AbilityBehavior"   "DOTA_ABILITY_BEHAVIOR_PASSIVE"
    "MaxLevel" "1"

    "precache"
    {
        "particle"  "particles/items2_fx/refresher.vpcf"
    }

    // Special
    //-------------------------------------------------------------------------------------
    "AbilitySpecial"
    {
        "01"
        {
            "var_type"  "FIELD_INTEGER"
            "refresh_chance"    "5"
        }
    }

    // Data Driven
    //-------------------------------------------------------------------------------------
    "Modifiers"
    {
        "preparation_modifier"
        {
            "Passive"   "1"
            "IsBuff"    "1"
            "IsHidden"  "1"

            "OnAbilityExecuted"
            {
                "Random"
                {
                    "Chance"    "%refresh_chance"
                    "OnSuccess"
                    {
                        "DelayedAction"
                        {
                            "Delay" "0.1"
                            "Action"
                            {
                                "RunScript"
                                {
                                    "ScriptFile"    "abilities.lua"
                                    "Function"  "refresh_cooldowns"
                                }
                            }
                        }

                        "FireSound"
                        {
                            "EffectName"    "DOTA_Item.Refresher.Activate"
                            "Target" "CASTER"
                        }

                        "AttachEffect"
                        {
                            "EffectName" "particles/items2_fx/refresher.vpcf"
                            "EffectAttachType" "follow_origin"
                        }
                    }
                }
            }
        }
    }
}
```
Это очень простой Lua-скрипт. Она проходит через каждую способность, выполняя EndCooldown (проверять `ability:IsCooldownReady()` нам не нужно, функция в любом случае сработает).
```
lua
function refresh_cooldowns( event )
    print("refreshing cooldowns")

    local hero = event.caster

    for i=0,4 do
        local ability = hero:GetAbilityByIndex(i)
        ability:EndCooldown()
    end
end
```

---

### OnAbilityEndChannel

This triggers when the unit that has this modifier ends a channel (be it in any of the 3 types: `OnChannelFinish`, `Interrupted` or `Succeeded`).

---

### OnAbilityStart (doesn't work)

Отличие от OnSpellStart заключается в том, что это событие-модификатор, и вы можете применить его к цели, чтобы вызвать любые действия.

_Пример_: примените модификатор, который убьет цель, как только она наложит заклинание, или заставит размер цели изменяться случайным образом каждый раз, когда она накладывает заклинание.

---

### Модификаторы для обнаружения изменений исцеления и маны в отряде

#### OnHealReceived

_Пример_: Oracle ult
#### OnHealthGained
_Пример_: Wisp Tether

#### OnManaGained

_Пример_: Wisp Tether

#### OnSpentMana

_Пример_: Оберег Пустоты
---
### Модификатор событий для обнаружения движения

#### При заказе

Срабатывает при движении/применении/удержании/остановке

#### OnUnitMoved

_Пример_: ультимейт Bloodseeker

#### При телепортации
#### При телепортации

---

### OnProjectileDodge

Юнит с этим модификатором увернулся от снаряда.

---
### Онстатечанжед

(Может) Срабатывает, когда юнит получает модификатор.