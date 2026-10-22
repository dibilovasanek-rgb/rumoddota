---
title: Передача значенийabilityValues ​​в Lua
author: Noya
steamId: '76561198046984233'
date: 12.12.2014
---
# Передача значенийabilityValues в Lua

Учитывая этот блок «AbilityValues» в способности:
```
"AbilityValues"
{
  "radius" "300"
  "mana_per_second" "5 10 15 20"
}
```
Есть две функции для их подключения: `GetSpecialValueFor` и `GetLevelSpecialValueFor`. Оба применяются к способности.
```
lua
local ability = event.ability
local radius = ability:GetSpecialValueFor("radius")
local mana_per_second = ability:GetLevelSpecialValueFor("mana_per_second", (ability:GetLevel() - 1))
```
Первый получит значение **текущего уровня** способности.

Второй получит значение для **указанного уровня** способности.

Первый из них является наиболее распространенным, и его следует **использовать каждый раз**, если только вам не требуется значение для определенного уровня.

Обратите внимание на использование `(ability:GetLevel() - 1)` в качестве второго параметра (который сообщает сценарию, какой уровень выбрать). Это необходимо, поскольку уровни способностей имеют индекс 1, а `GetLevelSpecialValueFor` — индекс 0.