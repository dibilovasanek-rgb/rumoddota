---
title: Направление анимации
author: Noya
steamId: '76561198046984233'
date: 18.01.2015
---


# Направление анимации

## Краткая версия:

ApplyModifier с короткой длительностью в OnThinkInterval, модификатор канала имеет OverrideAnimation с `ACT_` из [Action List](https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Actions_List) или с помощью метода, описанного позже.

**Пример короткой версии:**
```
"Modifiers"
{
    "modifier_channeling"
    {
        "ThinkInterval" "1.0"
        "OnIntervalThink"
        {
            // Looping Animation
            "ApplyModifier"
            {
                "ModifierName"  "channelling_animation"
                "Target"        "CASTER"
            }
        }
    }

    "channelling_animation"
    {
        "IsHidden" "1"
        "Duration" "0.9"
        "OverrideAnimation" "ACT_DOTA_CAST_ABILITY_2"
    }
}
```

## Полная версия

<StaticVideo path="/videos/FlusteredBigBoa.mp4" />

Вместо того, чтобы искать нужную анимацию в списке действий на вики, вы можете просмотреть анимации модели, которую вы пытаетесь использовать, и их соответствующие имена.

Для этого перейдите в браузер ресурсов, введите имя своего героя + `.vmdl`, в данном случае я буду использовать `drow.vmdl`. Дважды щелкните по нему, и вы войдете в редактор моделей. Здесь вам нужно перейти на верхние вкладки и нажать «Инструменты» -> «Просмотреть последовательности».

После этого вы можете выбрать любую анимацию, и она анимирует белые блоки справа. Чтобы получить имя `ACT_`, вы можете нажать «Свойства», затем открыть окно «Действия» или просто установить флажок «Активность» в окне «Последовательности», который покажет, как все анимации упоминаются в игре.
::: info
Игнорируйте +строку.
:::

**Полный пример**:
```
"dark_ranger_life_drain"
{
    "BaseClass" "ability_datadriven"
    "AbilityTextureName" "dark_ranger_life_drain"
    "MaxLevel" "3"

    "AbilityBehavior" "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET | DOTA_ABILITY_BEHAVIOR_CHANNELLED | DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING"
    "AbilityUnitTargetTeam" "DOTA_UNIT_TARGET_TEAM_ENEMY"
    "AbilityUnitTargetType" "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC"
    "AbilityUnitDamageType" "DAMAGE_TYPE_MAGICAL"
    "AbilityCastAnimation" "ACT_DOTA_CAST_ABILITY_2"

    "AbilityCastRange" "700"
    "AbilityCastPoint" "0.3"
    "AbilityCooldown" "8.0"

    "AbilityManaCost" "50"
    "AbilityChannelTime" "8"

    "precache"
    {
        "particle" "particles/units/heroes/hero_pugna/pugna_life_drain.vpcf"
        "soundfile" "soundevents/game_sounds_heroes/game_sounds_pugna.vsndevts"
    }

    "AbilityValues"
    {
      "hp_drain_per_second" "25 40 55"
    }

    "OnSpellStart"
    {
        "ApplyModifier"
        {
            "ModifierName" "modifier_life_drain"
            "Target" "TARGET"
        }

        "FireSound"
        {
            "EffectName" "Hero_Pugna.LifeDrain.Target"
            "Target" "CASTER"
        }
    }

    "OnChannelFinish"
    {
        "RemoveModifier"
        {
            "ModifierName" "modifier_life_drain"
            "Target" "TARGET"
        }
    }

    "Modifiers"
    {
        "modifier_life_drain"
        {
            "IsDebuff" "1"
            "OnCreated"
            {
                "AttachEffect"
                {
                    "Target" "TARGET"
                    "EffectName" "particles/units/heroes/hero_pugna/pugna_life_drain.vpcf"
                    "EffectAttachType" "start_at_customorigin"

                    "ControlPointEntities"
                    {
                        "CASTER" "attach_hitloc"
                        "TARGET" "attach_hitloc"
                    }

                }
            }

            "ThinkInterval" "1.0"
            "OnIntervalThink"
            {
                // Health Transfer
                "Damage"
                {
                    "Type" "DAMAGE_TYPE_MAGICAL"
                    "Target" "TARGET"
                    "Damage" "%hp_drain_per_second"
                }

                "Heal"
                {
                    "Target" "CASTER"
                    "HealAmount" "%hp_drain_per_second"
                }

                // Looping Animation
                "ApplyModifier"
                {
                    "ModifierName" "channelling_animation"
                    "Target" "CASTER"
                }
            }
        }

        "channelling_animation"
        {
            "IsHidden" "0"
            "Duration" "0.9"
            "OverrideAnimation" "ACT_DOTA_CAST_ABILITY_2"
        }
    }
}
```
