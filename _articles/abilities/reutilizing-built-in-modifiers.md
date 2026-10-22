---
title: Повторное использование встроенных модификаторов
author: Noya
steamId: '76561198046984233'
date: 18.01.2015
---
ьзование встроенных модификаторов

Здесь будет объяснено, как повторно использовать любой встроенный модификатор через систему, управляемую данными.

Это имеет множество применений, так как иногда невозможно воспроизвести некоторые эффекты, которые очень скрыты/жестко запрограммированы в движке.

В предыдущем примере [Illusion Ability Example](/abilities/datadriven/illusion-ability-example) использовал `"modifier_illusion modifier"` в Lua следующим образом:
```
lua
illusion:AddNewModifier(caster, ability, "modifier_illusion", { duration = duration,
                                                                outgoing_damage = outgoingDamage,
                                                                incoming_damage = incomingDamage })
```
Поля между { } **очень** специфичны.

Полный список встроенных модификаторов можно найти [on the wiki](https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Scripting/Built-In_Modifier_Names).

`AddNewModifier` можно заменить управляемым данными блоком действий `"ApplyNewModifier"` следующим образом:

**Базовый пример:** будет применен 1 кадр MODIFIER_STATE_NO_UNIT_COLLISION.
```
"ApplyModifier"
{
    "ModifierName"	"modifier_phased"
    "Target"       "TARGET"
    "Duration"     "0.03"
}
```
Однако это не более чем ярлык, позволяющий избежать создания нового модификатора с состоянием. Настоящая сила этого метода заключается в применении модификаторов с очень настраиваемыми свойствами, которые нелегко воспроизвести с помощью базовых свойств/состояний и т. д.

<br />

Например, в способности `alchemist_chemical_rage` Alchemist меняет анимацию атаки/холостого хода/бега, эффект модели, звук атаки, а также получает бонус способности.

Если бы мы хотели получить все косметические свойства, но с разными эффектами способностей, нам нужно было бы переписать навык с нуля, но, к сожалению, звук автоатаки и анимацию атаки/холостого хода/бега изменить нелегко, и нам пришлось бы найти дурацкий обходной путь для этого.

Вместо этого мы можем использовать `"modifier_alchemist_chemical_rage_transform"`, который будет обрабатывать все, трансформируя героя и применяя `"modifier_alchemist_chemical_rage"` с именно той способностью, которую мы хотим.
<br />

Теперь, чтобы узнать имена полей и передать значения модификатору, выполните следующие действия:

## Шаг 1. Находим модификатор способности

Перейдите к исходной способности из списка, использующей модификатор, который вы хотите повторно использовать. [SpellLibrary](https://github.com/Pizzalol/SpellLibrary/tree/SpellLibrary/game/dota_addons/spelllibrary/scripts/npc/abilities) содержит разделенный список всех способностей Dota со своими именами, найти поля там очень легко.

<br />

## Шаг 2. Установка полейabilityValues
Скопируйте специальные способности из основной способности в управляемый данными блок «AbilityValues». Если у пользовательской способности нет поля, модификатор по умолчанию будет равен 0, поэтому вы можете удалить те, которые хотите игнорировать.

**Пример:** блок [alchemist_chemical_rage](https://github.com/Pizzalol/SpellLibrary/blob/SpellLibrary/game/dota_addons/spelllibrary/scripts/npc/abilities/alchemist_chemical_rage_datadriven.txt#L30)abilityValues ​​с двумя добавленными значениями и удаленной большей частью бонуса способностей.
```
"AbilityValues"
{
  "duration" "25.0"
  "transformation_time" "0.35"
  "bonus_movespeed_percent" "50"
  "bonus_attack_speed" "322"
}
```
<br />

## Шаг 3. Применение модификатора

К нужному событию способности или модификатора добавьте действие ApplyModifier:
```
"ApplyModifier"
{
    "ModifierName" "modifier_alchemist_chemical_rage_transform"
    "Target"       "CASTER"
    "Duration"     "%transformation_time"
}
```
**Без поля «Длительность»** модификатор может быть применен для продолжительности = nil, что означает бесконечную продолжительность.

<br />

## Шаг 4. Настройка всплывающей подсказки

![img](/images/external/eHc3N-2b62c46b84.jpg)

Всплывающую подсказку modifier_alchemist_chemical_rage необходимо настроить так, чтобы она игнорировала ненужные нам значенияabilityValue и вместо этого использовала наши `bonus_attack_speed` и `bonus_movespeed_percent`.
1. Перейдите к `dota_english.txt`, который можно найти в основном файле Dota или в [this repository link](https://raw.githubusercontent.com/dotabuff/d2vpk/master/dota/resource/dota_english.txt).

2. Найдите всплывающую подсказку модификатора заклинания, которое мы хотим изменить, скопируйте ее в свой `addon_english.txt` и отредактируйте:
```
"DOTA_Tooltip_modifier_alchemist_chemical_rage"             "Legacy Chemical Rage"
"DOTA_Tooltip_modifier_alchemist_chemical_rage_Description"	"Increasing attack and movement speed."
```
После изменения `addon_english.txt`:

![img](/images/external/eHpXB-8fe79a1d57.jpg)

Обратите внимание, что вы не можете ссылаться на новый пользовательский `%dMODIFIER_PROPERTY_`[CONSTANT_LIST](/abilities/ability-keyvalues)`%` в подсказке, поскольку он не имеет пользовательских значений в своем модификаторе.

Вместо этого вы можете сделать эти всплывающие подсказки в отдельном модификаторе или напрямую добавить числа в исходную всплывающую подсказку модификатора, если они являются статическими значениями (например, в этом случае я мог бы написать 50 и 322). К сожалению, вы также не можете сделать встроенный модификатор скрытым.

<br />
## Полный пример
```
"alchemist_chemical_rage_warcraft"
{
    "BaseClass"            "ability_datadriven"
    "AbilityTextureName"   "alchemist_chemical_rage_warcraft"
    "MaxLevel"             "3"

    "AbilityBehavior"      "DOTA_ABILITY_BEHAVIOR_NO_TARGET"
    "AbilityCastAnimation" "ACT_DOTA_ALCHEMIST_CHEMICAL_RAGE_START"

    "AbilityCastRange"      "700"
    "AbilityCastPoint"      "0.0"
    "AbilityCooldown"       "30.0"

    "AbilityManaCost"       "25"

    "AbilityValues"
    {
        "duration" "15.0"
        "transformation_time" "0.35"
        "bonus_movespeed_percent" "50"
        "bonus_attack_speed" "25 75 125"
    }

    "precache"
    {
        "soundfile" "soundevents/game_sounds_heroes/game_sounds_alchemist.vsndevts"
        "particle"  "particles/status_fx/status_effect_chemical_rage.vpcf"
        "particle"  "particles/units/heroes/hero_alchemist/alchemist_chemical_rage.vpcf"
    }

    "OnSpellStart"
    {
        "FireSound"
        {
            "EffectName"   "Hero_Alchemist.ChemicalRage.Cast"
            "Target"       "CASTER"
        }

        "ApplyModifier"
        {
            "ModifierName" "modifier_alchemist_chemical_rage_transform"
            "Target"       "CASTER"
            "Duration"     "%transformation_time"
        }

        // Extra Modifier with what we need to add for the custom ability
        "ApplyModifier"
        {
            "ModifierName" "modifier_chemical_rage_warcraft"
            "Target"       "CASTER"
        }
  }

    "Modifiers"
    {

        "modifier_chemical_rage_warcraft"
        {
            "IsBuff"   "1"
            "IsHidden" "1"
            "Duration" "%duration"

            "Properties"
            {
                "MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT" "%bonus_attack_speed"
                "MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE" "%bonus_movespeed_percent"
            }
        }
    }
}
```
<br />

Надеемся, это поможет вам получить больше возможностей, если способность, которую вы хотите изменить, еще не была переписана, или получить определенный эффект, который трудно воспроизвести обычными способами.