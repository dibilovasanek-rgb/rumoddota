---
title: Урон от лавы
author: DiNaSoR
steamId: '76561197974680917'
date: 20.08.2015
---
# Урон от лавы

Сегодня мы собираемся создать область лавы — когда герой наступает на лаву, он будет получать урон в секунду, пока не умрет.

**Сначала вам нужно создать блок и назначить ему текстуру триггера**

Сначала нажмите Shift+B и перетащите нужную рамку для области лавы.

После того, как вы создали свой блок, нам нужно назначить ему триггерный материал.  
Это можно сделать, зайдя в библиотеку материалов и назвав фильтрацию «триггер», затем перетащив этот материал на блок.  
Он должен измениться на указанный (триггерный) материал.
<StaticVideo path="/videos/WaterloggedQuarrelsomeDutchshepherddog.mp4" />

Затем преобразуйте сетку в объект, нажав Ctrl+T, или найдите `Outliner` => щелкните правой кнопкой мыши => выбранные сетки => привяжите к объекту.
Затем дайте ему имя и назначьте этот скрипт Entity для lavatrigger.lua <- вы можете назвать его как хотите.

![](/images/external/5eZycip.png)

Затем перейдите на вкладку «Выходы» вверху, нажмите на нее и добавьте следующее, как показано на рисунке.

![](/images/external/nvr9nhv.png)
Теперь перейдите в папку `vscripts`, создайте файл с именем `lavatrigger.lua` и поместите туда этот скрипт.
```
lua
LAVA_MODIFIER_NAME = "lava_modifier"
LAVA_DAMAGE_AMOUNT = 10

lava_modifier = lava_modifier or class({})

local LAVA_DAMAGE_TICK_RATE = 0.5

function lava_modifier:IsHidden()
    return true
end

function lava_modifier:IsPurgable()
    return false
end

function lava_modifier:IsDebuff()
    return false
end

function lava_modifier:DeclareFunctions()
    local funcs = {}
    return funcs
end

-- Modifiers exist both on server and client, so take care what methods you use
function lava_modifier:OnCreated()
    if IsServer() then
        self:SetStackCount(0)
        self:StartIntervalThink(LAVA_DAMAGE_TICK_RATE)
    end
end

function lava_modifier:OnIntervalThink()
    if IsServer() then
        if self:GetStackCount() > 0 then
            local ent = self:GetCaster()
            local damageTable = {
                victim = ent,
                attacker = ent,
                damage = LAVA_DAMAGE_AMOUNT,
                damage_type = DAMAGE_TYPE_PURE,
            }
            ApplyDamage(damageTable)
        end
    end
end

LinkLuaModifier(LAVA_MODIFIER_NAME, "lavatrigger", LUA_MODIFIER_MOTION_NONE)

function applyLava(trigger, delta)
    if not IsServer() then
        return
    end

    local ent = trigger.activator

    if not ent then
        return
    end
    if not ent:HasModifier(LAVA_MODIFIER_NAME) then
        ent:AddNewModifier(ent, nil, LAVA_MODIFIER_NAME, nil)
    end
    local originalStacks = ent:GetModifierStackCount(LAVA_MODIFIER_NAME, nil)
    local newStacks = originalStacks + delta
    ent:SetModifierStackCount(LAVA_MODIFIER_NAME, ent, newStacks)
end

function lavaEnter(trigger)
    applyLava(trigger, 1)
end

function lavaExit(trigger)
    applyLava(trigger, -1)
end
```
Тебе пора закончить!