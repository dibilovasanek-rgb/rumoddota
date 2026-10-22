---
title: Отправка значений Сервера Клиенту в модификаторе.
author: DankBud
steamId: '76561198157673452'
date: 05.12.2021
---


# Отправка значений Сервера Клиенту в модификаторе.

Скрипты модификаторов запускаются как на сервере, так и на каждом клиенте игры.
Многие из [Lua API](https://moddota.com/api/#!/vscripts) — это серверные функции, которые клиент не может использовать.

Итак, часто при использовании модификаторов вам придется использовать только серверные функции для вычислений или для каких-либо других целей.

Обычно сервер отвечает за функциональность, а клиент предназначен только для отображения информации.

Таким образом, если вы, например, дали своему герою бонусный урон, который вы рассчитали или сохранили только на сервере, вы увидите, что ваш герой наносит дополнительный урон, но он не отображается в пользовательском интерфейсе или во всплывающих подсказках.
Пример, который увеличивает ваш основной атрибут в 2 раза в качестве бонусного урона:
```
lua
modifier_example = class({})

function modifier_example:DeclareFunction()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE
	}
end

function modifier_example:GetModifierPreAttack_BonusDamage()
	if not IsServer() then return end
	--GetPrimaryStatValue is a server-only function
	return self:GetParent():GetPrimaryStatValue() * 2
end
```
С этим модификатором вы столкнетесь с упомянутой проблемой, когда ваш урон от атаки не обновляется в пользовательском интерфейсе, но вы все равно будете наносить дополнительный урон.

Чтобы это исправить, нам нужно каким-то образом отправить клиенту это значение, предназначенное только для сервера.
Есть два основных способа сделать это, хотя есть и другие, менее удобные способы.

## Количество модификаторов стека {#stacks}

Это самый простой метод, при котором все, что вам нужно сделать, это установить счетчик стека модификаторов на сервере, и счетчик автоматически синхронизируется с клиентом.

Пример использования этого метода:

```
lua
modifier_example = class({})

function modifier_example:DeclareFunction()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE
	}
end

function modifier_example:GetModifierPreAttack_BonusDamage()
	if IsServer() then
		local stat = self:GetParent():GetPrimaryStatValue()
		self:SetStackCount(stat)
	end

	return self:GetStackCount() * 2
end
```
Отлично, теперь урон наносится и отображается корректно!

Но есть некоторые ограничения на использование стеков модификаторов.

- Вы можете устанавливать только целые значения. Никаких чисел с плавающей запятой, логических значений, строк или таблиц.
- Вы можете установить только одно количество стеков для каждого модификатора.
- Количество стаков отображается на значке баффа модификатора, а это не всегда нужно.

Так что же делать, если вам нужно отправить одно из этих неподдерживаемых значений или даже отправить клиенту несколько значений?
Что ж, есть несколько обходных путей, но вам следует использовать передатчики-модификаторы.

## Модификатор Передатчики {#transmitters}

Передатчики модификаторов позволяют вам отправлять любое количество значений любых типов с сервера клиенту в вашем модификаторе.
Но они требуют некоторой настройки.

Для использования передатчиков необходимы 3 функции.

- `SetHasCustomTransmitterData`
  Это должно быть вызвано в функции `OnCreated` вашего модификатора.
  сообщить серверу, что вы хотите, чтобы ваш модификатор передавал данные клиенту

- `AddCustomTransmitterData`
  Здесь вы выбираете данные, которые хотите отправить клиенту, запускаемые только на стороне сервера.

- `HandleCustomTransmitterData`
  Сюда отправляются данные сервера, работающие только на стороне клиента.

- а также `SendBuffRefreshToClients` для обновления передаваемых данных при необходимости.

Пример, который дает дополнительный урон и скорость атаки в зависимости от вашего текущего здоровья.
```
lua
modifier_example = class({})

function modifier_example:OnCreated( kv )
	if not IsServer() then return end
	--grab some values from the ability's KV
	local percent_health_to_damage = self:GetAbility():GetSpecialValueFor("percent_health_to_damage")
	local percent_health_to_atk_spd = self:GetAbility():GetSpecialValueFor("percent_health_to_atk_spd")

	--GetHealth is a server-only function
	local health = self:GetParent():GetHealth()

	--calculate our values on the server.
	self.damage = health * percent_health_to_damage
	self.attack_speed = health * percent_health_to_atk_spd

	--tell the server we are ready to send data to the client
	self:SetHasCustomTransmitterData(true)

	--we want to think so we can periodically refresh the data we are sending to the client
	--note: this can be called on client, but in this script its only called on server, so it only thinks on server.
	self:StartIntervalThink(0.1)
end

--refresh the modifier on every think
function modifier_example:OnIntervalThink()
	self:OnRefresh()
end

--this function is called when a modifier is reapplied, or manually refreshed in a script.
function modifier_example:OnRefresh( kv )
	if IsServer() then
    --call OnCreated again to recalculate our values
    self:OnCreated()

		--SendBuffRefreshToClients is a server-only function
		self:SendBuffRefreshToClients()
	end
end

--this is a server-only function that is called whenever modifier:SetHasCustomTransmitterData(true) is called,
-- and also whenever modifier:SendBuffRefreshToClients() is called
function modifier_example:AddCustomTransmitterData()
	return {
		damage = self.damage,
		attack_speed = self.attack_speed,
	}
end

--this is a client-only function that is called with the table returned by modifier:AddCustomTransmitterData()
function modifier_example:HandleCustomTransmitterData( data )
	self.damage = data.damage
	self.attack_speed = data.attack_speed
end

function modifier_example:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
	}
end

function modifier_example:GetModifierAttackSpeedBonus_Constant()
	return self.attack_speed
end

function modifier_example:GetModifierPreAttack_BonusDamage()
	return self.damage
end
```
Множество других примеров передатчиков-модификаторов вы можете найти на [GitHub](https://github.com/search?l=Lua&q=SetHasCustomTransmitterData&type=Code).