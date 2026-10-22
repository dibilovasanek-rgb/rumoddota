---
title: Создание юнитов с продолжительностью
author: Pizzalol
steamId: '76561198015886976'
date: 15.01.2015
---
дание юнитов с продолжительностью

Это краткое руководство о том, как создавать собственные юниты, чтобы они отображались с круговым таймером рядом с полосой их здоровья и оставшимся временем на шкале опыта.

Если вы не уверены, о чем я говорю, посмотрите на эти изображения ![img](/images/external/NL1Gqmr.png) и ![img](/images/external/GOeKyp7.png).

Нам понадобится `modifier_kill`.

Вы можете применить его в KV, используя `ApplyModifier`, или в Lua, используя `AddNewModifier`.

Это обеспечивает большую гибкость и позволяет правильно создавать вызванные по времени юниты через Lua.

## пример КВ

Вот пример этого в КВ; один паук спаунится без `modifier_kill`, а другой с ним.

**_Примечание:_** В этом примере нет разницы между применением `modifier_kill` или использованием встроенного параметра `Duration` блока действий `SpawnUnit`.
```
"test_ability"
{
    // General
    "BaseClass"                "ability_datadriven"
    "AbilityBehavior"                "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE"
    "AbilityType"                    "DOTA_ABILITY_TYPE_BASIC"
    // Time
    "AbilityCooldown"                "0.0"
    // Cost
    "AbilityManaCost"                "0"
    // Special
    "AbilityValues"
    {
        "duration"                    "10.0"
    }
    "OnSpellStart"
    {
        "SpawnUnit"
        {
            "UnitName"    "npc_dota_broodmother_spiderling"
            "UnitCount"    "1"
            "SpawnRadius"    "200"
            "Target"        "CASTER"

            "OnSpawn"
            {
                "ApplyModifier"
                {
                    "ModifierName"    "modifier_kill"
                    "Target"        "TARGET"
                    "Duration"        "%duration"
                }
            }
        }
        "SpawnUnit"
        {
            "UnitName"    "npc_dota_broodmother_spiderling"
            "UnitCount"    "1"
            "SpawnRadius"    "200"
            "Target"        "CASTER"
        }
    }
}
```
и короткое видео вместе с ним

<StaticVideo path="/videos/AmusedScientificHoneybadger.mp4" />

## Пример Lua

Это действительно простой пример того, как использовать его с Lua.

эта функция применит модификатор `modifier_kill` длительностью 10 секунд, после чего заклинатель умрет.
```
lua
function KillCaster( keys )
    local caster = keys.caster

    caster:AddNewModifier(caster, nil, "modifier_kill", {duration = 10})
end
```
