---
title: Пример способности вращения
author: Noya
steamId: '76561198046984233'
date: 23.01.2015
---
имер способности вращения

**Блокировать**
```
"Rotate"
{
    "Target"       "TARGET"
    "PitchYawRoll"	"0 0 0" //x y z values
}
```
**Пример:** вращайте ролик через каждый интервал.
```
"OnSpellStart"
{
    "ApplyModifier"
    {
        "ModifierName"	"modifier_rotating"
        "Target"       "CASTER"
    }
}

"Modifiers"
{
    "modifier_rotating"
    {
        "ThinkInterval" "%interval"
        "OnIntervalThink"
        {
            "Rotate"
            {
                "Target"       "TARGET"
                "PitchYawRoll"	"%x %y %z"
            }
        }
    }
}
```<br />

**Шаг** Поворот, 15 в каждом кадре (интервал 0,03)

<StaticVideo path="/videos/BothImpureHeterodontosaurus.mp4" />

<br />

**Отклонение** Вращение, 15 в каждом кадре.
<StaticVideo path="/videos/MemorableAcceptableDikdik.mp4" />
<br />
**Roll** Поворот, 15 в каждом кадре

<StaticVideo path="/videos/GraciousWebbedHamadryad.mp4" />