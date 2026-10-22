---
title: Использование свойств модификатора во всплывающих подсказках
author: DankBud
steamId: '76561198157673452'
date: 05.12.2021
---
в модификатора во всплывающих подсказках

Каждый раз, когда вы видите всплывающую подсказку модификатора, использующую нестатический номер, она получает свое значение из одного из [`MODIFIER_PROPERTY_`](https://moddota.com/api/#!/vscripts/modifierfunction) этого модификатора.

несколько примеров:
![img](/images/external/dngijaZ.png)
```
"DOTA_Tooltip_modifier_fountain_aura_buff_Description"				"Heals %dMODIFIER_PROPERTY_HEALTH_REGEN_PERCENTAGE%%% HP and %dMODIFIER_PROPERTY_MANA_REGEN_TOTAL_PERCENTAGE%%% mana per second."
```![img](/images/external/bzU8GAF.png)```
"DOTA_Tooltip_modifier_smoke_of_deceit_Description"	"Invisible, moving %dMODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE%%% faster, and hidden from the minimap. Attacking or moving within %dMODIFIER_PROPERTY_TOOLTIP% range of an enemy hero or tower will break the invisibility."
```![img](/images/external/Xy0hTsD.png)```
"DOTA_Tooltip_modifier_tower_aura_bonus_Description"    "Armor increased by %dMODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS% and health regeneration by %dMODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT%."
```
и еще примерно 560 примеров в файле assets_english.txt от Valve.

Как видите, все эти числа не записываются в описание модификатора вручную, они динамически извлекаются из модификатора.

## Почему это полезно?

Потому что, если вы вручную записываете числа во всплывающую подсказку, то каждый раз, когда вы меняете число в способности, вам придется не забывать обновлять каждую связанную всплывающую подсказку, и, не говоря уже о хлопотах, вы обязательно что-то пропустите.

Используя динамическую подсказку, вам нужно изменить число только в одном месте, и оно обновится повсюду.
И вы можете изменить возвращаемый номер в своем скрипте во время игры.

## Как это сделать

Во-первых, обратите внимание, что это работает только с модификаторами Lua и встроенными модификаторами Valve. Это невозможно сделать с помощью модификаторов, управляемых данными.

Каждый раз, когда вы используете свойство модификатора в модификаторе lua, значение `return`, которое вы используете, будет доступно для использования во всплывающей подсказке описания модификатора.

В вашем скрипте модификатора:
```lua
function modifier_example:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
	}
end

function modifier_example:GetModifierPreAttack_BonusDamage()
	return 100
end
```В вашем `addon_<language>.txt`:```json
"DOTA_Tooltip_modifier_example_Description" "Granting %dMODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE% bonus damage!"
```
В результате появится всплывающая подсказка: **`Granting 100 bonus damage!`**.

В подсказке знак процента `%` окружает `MODIFIER_PROPERTY_`, чтобы пометить его как текст, который будет заменен значением свойства-модификатора.
Если содержимое между % не соответствует формату, это не сработает.

## Формат

`%<-><number><d|f>MODIFIER_PROPERTY_%`

Фрагмент из assets_english.txt:

```
// substitution for modifier tooltips
// %dMODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS% - 'd' prints the value returned by the function as an integer
// 'd' for integer
// 'f' for float
// optional '-' to not abs() the values
// optional number to specify the number of decimals to print after a float
// eg: %-2fMODIFIER_PROPERTY_BASEDAMAGEOUTGOING_PERCENTAGE%
// use %% to draw a percentage sign
test
```
Первое, что необходимо, — это `d` для целого числа (целого числа) или `f` для float (числа с плавающей запятой).
Обратите внимание, что здесь учитывается регистр, они должны быть строчными.
И один из них обязателен, если вы попытаетесь его пропустить, не получится.

`%d...%`
`%f...%`

Далее следует имя свойства модификатора, убедитесь, что нет пустого места.

`%dMODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT%`
`%fMODIFIER_PROPERTY_TOOLTIP%`

Вот и все, что вам нужно для отображения всплывающей подсказки.

Но есть еще 2 варианта, которые вы можете использовать.

По умолчанию возвращаемое число будет абсолютным.
Это означает, что даже если вы вернете отрицательное число, во всплывающей подсказке оно будет положительным.
Поставив знак тире/минус `-` перед d/f, вы сделаете его не абс() числом, поэтому оно может быть отрицательным.

`%-dMODIFIER_PROPERTY_COOLDOWN_REDUCTION_CONSTANT%`
`%-fMODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT%`
А с помощью числа с плавающей запятой вы можете добавить число перед `f`, чтобы выбрать, сколько десятичных знаков отображать (по умолчанию 1).

`%-2fMODIFIER_PROPERTY_MANA_REGEN_CONSTANT%`
`%3fMODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT%`

и, наконец, если вы хотите написать знак процента `%` во всплывающей подсказке модификатора, вы просто помещаете 2 `%%` рядом друг с другом в любом месте всплывающей подсказки.

`"This is a percentage sign: %%"`

`"Gaining %dMODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE%%% bonus movement speed"`
## MODIFIER_PROPERTY_TOOLTIP

Я оставлю здесь особое примечание для MODIFIER_PROPERTY_TOOLTIP и MODIFIER_PROPERTY_TOOLTIP2.
Эти свойства-модификаторы не выполняют никакой функциональной функции, они существуют только для отображения произвольного числа в вашей всплывающей подсказке.

Простым примером может быть:
```
lua
function modifier_example:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOOLTIP,
		MODIFIER_PROPERTY_TOOLTIP2,
	}
end

function modifier_example:OnTooltip()
	return self:GetStackCount()
end
function modifier_example:OnTooltip2()
	return self.number_of_killed_units
end
```

## Мой %property% всегда показывает 0 ??

Если у вас возникла эта проблема, то возвращаемое значение, вероятно, будет видно только на сервере, а не на клиенте.
Инструкции см. в этом руководстве: [Sending Server values to the Client](/abilities/server-to-client).
