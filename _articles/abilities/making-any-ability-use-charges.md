---
title: Создание зарядов за использование любой способности
author: DoctorGester
steamId: '76561198046920629'
date: 28.12.2015
---
а использование любой способности

Руководство/фрагмент, который поможет вам использовать заряды любых способностей, таких как Shrapnel или Stone Caller.

Сначала сохраните следующий код под именем `modifier_charges.lua` в папке `vscripts` (или в любой подпапке внутри нее).
```
lua
modifier_charges = class({})

if IsServer() then
    function modifier_charges:Update()
        if self:GetDuration() == -1 then
            self:SetDuration(self.kv.replenish_time, true)
            self:StartIntervalThink(self.kv.replenish_time)
        end

        if self:GetStackCount() == 0 then
            self:GetAbility():StartCooldown(self:GetRemainingTime())
        end
    end

    function modifier_charges:OnCreated(kv)
        self:SetStackCount(kv.start_count or kv.max_count)
        self.kv = kv

        if kv.start_count and kv.start_count ~= kv.max_count then
            self:Update()
        end
    end

    function modifier_charges:DeclareFunctions()
        local funcs = {
            MODIFIER_EVENT_ON_ABILITY_EXECUTED
        }

        return funcs
    end

    function modifier_charges:OnAbilityExecuted(params)
        if params.unit == self:GetParent() then
            local ability = params.ability

            if params.ability == self:GetAbility() then
                self:DecrementStackCount()
                self:Update()
            end
        end

        return 0
    end

    function modifier_charges:OnIntervalThink()
        local stacks = self:GetStackCount()

        if stacks < self.kv.max_count then
            self:SetDuration(self.kv.replenish_time, true)
            self:IncrementStackCount()

            if stacks == self.kv.max_count - 1 then
                self:SetDuration(-1, true)
                self:StartIntervalThink(-1)
            end
        end
    end
end

function modifier_charges:DestroyOnExpire()
    return false
end

function modifier_charges:IsPurgable()
    return false
end

function modifier_charges:RemoveOnDeath()
    return false
end
```
Затем добавьте строку инициализации в `addon_game_mode.lua`:
```
lua
LinkLuaModifier("modifier_charges", LUA_MODIFIER_MOTION_NONE)
```
Если ваш файл находится в подпапке, вы можете сделать это следующим образом
```
lua
LinkLuaModifier("modifier_charges", "subfolder/anothersubfolder/modifier_charges", LUA_MODIFIER_MOTION_NONE)
```
Грац, вы успешно установили!

Теперь вы можете добавить заряды к любой способности с помощью этого кода:
```
lua
unit:AddNewModifier(unit, unit:FindAbilityByName("ability_name"), "modifier_charges", {
    max_count = 2,
    start_count = 1,
    replenish_time = 6
})
```
Настройки, в конце концов, говорят сами за себя. Если хотите, вы можете опустить start_count.

Вот и все.