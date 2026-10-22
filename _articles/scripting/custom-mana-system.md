---
title: Пользовательская система маны
author: Noya
steamId: '76561198046984233'
date: 01.12.2014
---
тельская система маны

Это руководство по созданию простой пользовательской системы маны. Предполагается работающий аддон barebone-системы.

В этом примере мы создадим классическую систему _Rage_, что означает:

1. Нет нормальной регенерации маны, стартовая мана 0.
2. Получите ману после атаки, которая зависит от уровня.
3. Получите ману после атаки, которая зависит от уровня.
4. Получите ману при произнесении определенного заклинания.
5. Уменьшайте ману с течением времени, масштабируясь с уровнем.

## Нет нормальной регенерации маны, стартовая мана с 0.

Более простой подход — свести на нет интеллект вашего героя.
Для этого вам нужно установить следующее в определении вашего героя:
```
//KV code inside npc_heroes_custom.txt
"AttributeBaseIntelligence" "0" // Base intelligence
"AttributeIntelligenceGain" "0" // Intelligence bonus per level.

"StatusMana"	"50"    // Initial Max Mana
"StatsManaRegen"	"0"	// Base Mana Regen (KV doesn't like negative numbers here)
```
Если вам нужно сохранить свой показатель Интеллекта, но у вас по-прежнему 0 естественной регенерации маны, вам нужно будет применить модификаторы для каждого очка Интеллекта с отрицательной регенерацией маны, чтобы компенсировать это.

Я не буду подробно описывать этот процесс в этом руководстве, но вы можете ознакомиться с руководством [on the wiki](https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Scripting/Using_Bitfields_To_Adjust_Stat_Value_Bonuses).

Чтобы ваша мана начиналась с 0, мы начнем с создания пассивной скрытой способности, которая станет основой нашей системы ярости:
```
//KV code inside npc_abilities_custom.txt
"barbarian_rage"
{
    "BaseClass" "ability_datadriven"
    "AbilityTextureName"	"barbarian_rage"
    "MaxLevel" "1"
    "AbilityBehavior"	"DOTA_ABILITY_BEHAVIOR_PASSIVE | DOTA_ABILITY_BEHAVIOR_HIDDEN"

    "Modifiers"
    {
        "rage_modifier"
        {
            "Passive"	"1"	//Auto apply this modifier when the spell is learned
            "IsBuff"	"1"	//Display as a green modifier
            "IsHidden"	"0"	//Show in the UI

            "OnCreated"
            {
                "RunScript"
                {
                    "ScriptFile"	"barbarian.lua"
                    "Function"	"ZeroManaOnSpawn"
                }
            }
        }
    }
}
```
Для этого требуется скрипт `barbarian.lua` внутри папки _your_addon/scripts/vscripts_.
Скрипт очень простой:
```
lua
 -- lua code inside barbarian.lua
    function ZeroManaOnSpawn( event )
        local hero = event.caster
        Timers:CreateTimer(.01, function()
        -- Set Mana to 0 on created
        hero:SetMana(0)
    end)
 end
```
Нам нужно немного подождать, чтобы герой появился правильно, иначе это может потерпеть неудачу. Обратите внимание на использование [BMD's Timers](https://github.com/bmddota/barebones/blob/source2/game/dota_addons/barebones/scripts/vscripts/timers.lua).

### Прежде чем мы продолжим:

Сейчас наше заклинание даже не доступно герою, и мы хотим, чтобы оно было изучено при появлении.
Для этого нам нужно добавить следующее в наш прослушиватель `OnHeroInGame`* (*функция npc_spawned, см. [barebones Event Hooks](https://github.com/bmddota/barebones/blob/source2/game/dota_addons/barebones/scripts/vscripts/barebones.lua#L443) )
```
lua
-- lua code inside OnHeroInGame(hero)
local heroName = hero:GetUnitName()
if heroName == "npc_dota_hero_beastmaster" then
    -- Add the spell
    hero:AddAbility("barbarian_rage")
    -- Level it up
    hero:FindAbilityByName("barbarian_rage"):SetLevel(1)
end
```
Если это не совсем необходимо, но вам нужно будет как-то отфильтровать желаемого героя. В нашем примере мы будем использовать Beastmaster.

## Получает ману после атаки, масштабируется с уровнем

Наш блок rage_modifier получает еще одно событие-модификатор:
```
"OnAttackLanded"
{
    "RunScript"
    {
        "ScriptFile"	"barbarian.lua"
        "Function"	"ManaOnAttack"
    }
}
```
Я буду использовать для этого базовую формулу, которая дает базовую ману за атаку, но также немного увеличивается с уровнем.
Имейте в виду, что эта функция используется для системы уровня героя 200, поэтому, если у вас есть что-то другое или большие затраты маны, вам нужно настроить ее по своему вкусу.
```
lua
-- lua code inside barbarian.lua
function ManaOnAttack( event )
    local hero = event.caster
    local level = hero:GetLevel()

    hero:GiveMana(0.01 * level + 3)
end
```

## Получите ману после атаки, которая зависит от уровня.

Наш блок модификаторов получает еще одно событие-модификатор:
```
"OnAttacked"
{
   "RunScript"
    {
        "ScriptFile"	"barbarian.lua"
        "Function"	"ManaOnAttacked"
    }
}
```
Как и раньше, можно использовать другую формулу: мы будем давать немного меньше маны при атаке.
```
lua
function ManaOnAttacked( event )
   local hero = event.caster
   local level = hero:GetLevel()

   hero:GiveMana(0.01 * level + 0.4)
end
```

## Получите ману при использовании определенного заклинания.
```
"OnSpellStart"
{
    "RunScript"
    {
        "ScriptFile"	"barbarian.lua"
        "Function"	"leap"
    }
}
```
Тогда в вашем скрипте заклинания lua нам нужно где-то это указать:
```
lua
local manaGain = event.ability:GetSpecialValueFor("mana_gain")
event.caster:GiveMana(manaGain)
```
Это возьмет ваш «mana_gain» из «AbilityValues», в моем примере с прыжком это будет:
```
"AbilityValues"
{
  "mana_gain" "8 16 25 35 47 60 72 85"
}
```

## Уменьшение маны с течением времени, масштабируемое с уровнем

Вначале мы установили для нашего StatsManaRegen значение 0. Это сделано для правильного динамического управления регенерацией маны в нашем основном файле lua.

Базовую регенерацию маны необходимо будет обновлять, когда герой порождает `OnHeroInGame`, а затем каждый раз, когда он повышает уровень `OnPlayerLevelUp`, если мы хотим, чтобы он масштабировался.

Для этого мы создаем локальную функцию где-то внутри нашего основного lua-файла дополнения и вызываем ее всякий раз, когда нам нужно (хотя бы один раз `OnHeroInGame`):
```
lua
function AdjustWarriorClassMana( hero )
    Timers:CreateTimer(0.1,function()
        local heroLevel = hero:GetLevel()
        -- Adjust the new mana regen
        hero:SetBaseManaRegen( -(0.01 * heroLevel) - 0.25)
    end)
end

```
При этом мана нашего героя будет уменьшаться со временем примерно на 0,3 и немного быстрее на более высоких уровнях.

Проверьте исходные полные файлы сценариев в TBR Github.

- [main lua scripts](https://github.com/Aleteh/TBR3/blob/master/scripts/vscripts/tbr.lua)

- [barbarian lua scripts](https://github.com/Aleteh/TBR3/blob/master/scripts/vscripts/abilities/barbarian.lua)

- [heroes_custom file](https://github.com/Aleteh/TBR3/blob/master/scripts/npc/npc_heroes_custom.txt)
- [abilities file](https://github.com/Aleteh/TBR3/blob/master/scripts/npc/npc_abilities_custom.txt)