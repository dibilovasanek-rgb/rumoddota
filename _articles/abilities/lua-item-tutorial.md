---
title: Учебное пособие по элементам Lua
author: DrTeaSpoon
steamId: '76561197975484185'
date: 07.08.2015
---
бие по элементам Lua

Это руководство представляет собой пошаговое руководство по созданию совершенно нового элемента с помощью нового базового класса `item_lua`.
В этом первом уроке мы создадим обновление Blink Dagger до Blink Staff. Это будет работать так: при нацеливании на любую точку на земле он будет работать так же, как Blink Dagger, но если вы нацеливаетесь на союзный юнит, вы можете «пометить» его, чтобы он мигал вместо вас. Мы также добавим пассивные бонусы от предмета, который будет в рецепте.

## Посох Блинка

Сначала откройте `npc_items_custom.txt` в своем любимом текстовом редакторе. Если у вас нет этого файла в папке `scripts/npc/`, создайте его и скопируйте в него следующее.
```
"DOTAAbilities"
{
}
```
Первое и самое важное — это дать название вашему предмету. В этом примере я буду использовать «item_blink_staff». Обратите внимание, что использование одного и того же имени при упоминании этого предмета важно, поскольку в dota 2 используются некоторые схемы именования.<br />
Мы также настроим уникальный идентификатор для предмета и базовый класс, который сообщит игре, что мы собираемся создать предмет Lua.
```
"DOTAAbilities"
{
	"item_blink_staff"
	{
		"ID"							"1250" // anything above 1250 should be safe to use.
		"BaseClass"						"item_lua"
	}
}
```
Далее нам нужно изображение предмета. Для этого мы используем «AbilityTextureName», поскольку предметы в Dota 2 классифицируются как способности. Важно, чтобы наш файл изображения находился в правильном месте и имел правильное имя. <br />Для элемента в этом примере файл должен быть найден по следующему пути:
```
 dota 2 beta\game\dota_addons\{your addon name}\resource\flash3\images\items\blink_staff.png
```
обратите внимание, что имя файла — «blink_staff.png», а не «item_blink_staff.png». Это связано с тем, что Dota будет читать имя текстуры способности «item_blink_staff» как «item\blink_staff.png»<br />. Также важно отметить, что использование одного и того же имени для вашей текстуры способности вдвойне важно, поскольку изображение в магазине не будет отображаться правильно, если вы используете другое имя. <br />
Изображение, которое я буду использовать для этого предмета, следующее: ![enter image description here](/images/external/yz4ghPc.png 'blink_staff.png')<br />.
```
"DOTAAbilities"
{
	"item_blink_staff"
	{
		"ID"							"1250" // anything above 1250 should be safe to use.
		"BaseClass"						"item_lua"
		"AbilityTextureName"			"item_blink_staff"
	}
}
```
Последняя часть, которую мы должны добавить, — это ссылка на файл сценария. Вам следует создать новый файл `*.lua` где-нибудь в папке `scripts/vscripts`. Вы даже можете создать для него подпапку, если хотите систематизировать. Теперь ваш `npc_items_custom.txt` должен выглядеть примерно так.
```
"DOTAAbilities"
{
	"item_blink_staff"
	{
		"ID"							"1250" // anything above 1250 should be safe to use.
		"BaseClass"						"item_lua"
		"AbilityTextureName"			"item_blink_staff"
		"ScriptFile"					"lua_items/blink_staff/blink_staff.lua"
	}
}
```
Суть предметов и способностей lua в том, что все, что вам действительно нужно определить для них в файле lua, — это их таблица классов. Итак, давайте добавим это в наш lua-файл:
```
lua
if item_blink_staff == nil then
	item_blink_staff = class({})
end
```
ВАЖНО: Убедитесь, что вы используете то же имя, которое вы определили в `npc_items_custom.txt`<br />.
Теперь мы хотим определить время восстановления и стоимость маны для нашего посоха. Это можно сделать через `npc_items_custom.txt` или через lua. Обратите внимание, что всем, что мы определяем через lua, мы можем манипулировать более динамично. Например, мы могли бы сократить время восстановления вдвое в ночное время или удвоить затраты маны, если у игрока положительное соотношение k/d.<br />
Также преимуществом их определения в `npc_items_custom.txt` является то, что все, что отображается в магазине (до того, как игрок получит предмет), — это значения, определенные там. Также в настоящее время существует проблема, заключающаяся в том, что манакост всегда будет отображать значение, определенное `npc_items_custom.txt`, но предмет по-прежнему будет серым (синим?) Неактивен, когда ваша мана ниже, чем определено в lua для стоимости маны. <br />
Поскольку мы хотим, чтобы все выглядело гладко, давайте определим некоторые основные параметры, которые мы позже сможем изменить в lua по своему усмотрению:
```
"DOTAAbilities"
{
	"item_blink_staff"
	{
		"ID"							"1250" // anything above 1250 should be safe to use.
		"BaseClass"						"item_lua"
		"AbilityTextureName"			"item_blink_staff"
		"ScriptFile"					"lua_items/blink_staff/blink_staff.lua"
		// Casting
		//--------------------------------------------
		"AbilityCastRange"				"0" //We could define limit here but blink dagger has unlimited range to let player use it more efficiently. The range limiting comes in the script. 0 means unlimited.
		"AbilityCastPoint"				"0.3" //It's the wind up time of spell.
		"AbilityCooldown"				"10.0"
		"AbilityManaCost"				"50"
	}
}
```
Для получения дополнительной информации о ключах и значениях предметов используйте руководство Noyas: [Datadriven items](item-keyvalues)

<br /> Это отличный справочник, но давайте продолжим с lua!

## Определение правил приведения

Сначала мы добавляем поведение. Это определит, что произойдет, когда игрок активирует горячую клавишу предмета.
```
lua
function item_blink_staff:GetBehavior()
	local behav = DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_UNIT_TARGET + DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES
	return behav
end
```
Функция GetBehaviour() вызывается движком, когда ему необходимо знать, как способность должна действовать в различных случаях. «Возврат» должен возвращать числовое значение «int». Valve упростила нам определение этого, предоставив их в виде ключей, которые мы можем просто суммировать. Эти значения используют преимущества битового диапазона, например:
```
Key ------ Value ------ Bytes
DOTA_ABILITY_BEHAVIOR_UNIT_TARGET ------ 8 ------ 01000
DOTA_ABILITY_BEHAVIOR_POINT ------ 16 ------ 10000
DOTA_ABILITY_BEHAVIOR_UNIT_TARGET + DOTA_ABILITY_BEHAVIOR_POINT ------ 24 ------ 11000
```
Как вы можете видеть по байтам, хотя значение может выглядеть произвольным, байты действуют как переключатель включения/выключения поведения.
Для доступных значений поведения используйте следующую ссылку: https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Scripting/API#DOTA_ABILITY_BEHAVIOR.

Далее мы добавляем стоимость маны и время восстановления.
```
lua
function item_blink_staff:GetManaCost()
	return 50
end

function item_blink_staff:GetCooldown( nLevel )
	return 10
end
```
Поскольку предметы определяются как способности, функция GetCooldown имеет вспомогательный параметр для уровня способности. Вы можете полностью игнорировать его для предметов, поскольку уровень почти всегда будет 1 (за исключением угловых случаев, таких как bkb или dagon).

Теперь давайте перейдем к самой части произнесения заклинаний.

Сначала мы создаем функцию OnSpellStart() и определяем некоторые начальные ключи для использования в скрипте.
```
lua
function item_blink_staff:OnSpellStart()
	local hCaster = self:GetCaster() --We will always have Caster.
	local hTarget = false --We might not have target so we make fail-safe so we do not get an error when calling - self:GetCursorTarget()
	if not self:GetCursorTargetingNothing() then
		hTarget = self:GetCursorTarget()
	end
	local vPoint = self:GetCursorPosition() --We will always have Vector for the point.
	local vOrigin = hCaster:GetAbsOrigin() --Our caster's location
	local nMaxBlink = 1200 --How far can we actually blink?
	local nClamp = 960 --If we try to over reach we use this value instead. (this is mechanic from blink dagger.)
end
```
Обратите внимание: пока мы находимся в классе «item_blink_staff», мы можем использовать «self» в качестве быстрой ссылки на него. <br />
Теперь, когда мы все настроили, давайте начнем моргать нашим заклинателем!
```
lua
function item_blink_staff:OnSpellStart()
	local hCaster = self:GetCaster() --We will always have Caster.
	local hTarget = false --We might not have target so we make fail-safe so we do not get an error when calling - self:GetCursorTarget()
	if not self:GetCursorTargetingNothing() then
		hTarget = self:GetCursorTarget()
	end
	local vPoint = self:GetCursorPosition() --We will always have Vector for the point.
	local vOrigin = hCaster:GetAbsOrigin() --Our caster's location
	local nMaxBlink = 1200 --How far can we actually blink?
	local nClamp = 960 --If we try to over reach we use this value instead. (this is mechanic from blink dagger.)

	ProjectileManager:ProjectileDodge(hCaster)  --We disjoint disjointable incoming projectiles.
	ParticleManager:CreateParticle("particles/items_fx/blink_dagger_start.vpcf", PATTACH_ABSORIGIN, hCaster) --Create particle effect at our caster.
	hCaster:EmitSound("DOTA_Item.BlinkDagger.Activate") --Emit sound for the blink
	local vDiff = vPoint - vOrigin --Difference between the points
	if vDiff:Length2D() > nMaxBlink then  --Check caster is over reaching.
		vPoint = vOrigin + (vPoint - vOrigin):Normalized() * nClamp -- Recalculation of the target point.
	end
	hCaster:SetAbsOrigin(vPoint) --We move the caster instantly to the location
	FindClearSpaceForUnit(hCaster, vPoint, false) --This makes sure our caster does not get stuck
	ParticleManager:CreateParticle("particles/items_fx/blink_dagger_end.vpcf", PATTACH_ABSORIGIN, hCaster) --Create particle effect at our caster.
end
```
ВАЖНО: мы используем звуки и эффекты частиц, уже предварительно кэшированные по умолчанию. Если вы хотите использовать эффекты частиц и звуки других героев или ваших собственных героев, вам необходимо выполнить предварительное кэширование этих ресурсов. <br />
Вот что наш предмет должен делать прямо сейчас:

<StaticVideo path="/videos/RepentantYellowishDiscus.mp4" />

## Применить к союзникам

Теперь мы собираемся создать деталь, которая сделает этот предмет уникальным по сравнению с Blink Dagger. Сначала мы добавляем оператор if в нашу функцию приведения, который определяет, как он должен действовать в зависимости от цели. В то же время мы следим за тем, чтобы двойное нажатие на предмет работало так же, как и в случае с Blink Dagger (самоприцеливание мигает в сторону базы).

Поскольку с этими возможностями Lua все еще есть некоторые незначительные проблемы, нам придется вернуться к нашему файлу npc_items_custom.txt, чтобы добавить некоторую помощь по таргетингу. Просто добавьте следующее к элементу.

```
		"AbilityUnitTargetTeam"			"DOTA_UNIT_TARGET_TEAM_FRIENDLY"
		"AbilityUnitTargetType"			"DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC"
```
Теперь, взглянув на наш Lua-код, вы увидите, что мы можем использовать большую часть нашего написанного блинк-кода в нескольких местах. Вот почему мы собираемся немного изменить ситуацию следующим образом:
```
lua
function item_blink_staff:OnSpellStart()
	local hCaster = self:GetCaster() --We will always have Caster.
	local hTarget = false --We might not have target so we make fail-safe so we do not get an error when calling - self:GetCursorTarget()
	if not self:GetCursorTargetingNothing() then
		hTarget = self:GetCursorTarget()
	end
	local vPoint = self:GetCursorPosition() --We will always have Vector for the point.
	local vOrigin = hCaster:GetAbsOrigin() --Our caster's location
	local nMaxBlink = 1200 --How far can we actually blink?
	local nClamp = 960 --If we try to over reach we use this value instead. (this is mechanic from blink dagger.)
	self:Blink(hCaster, vPoint, nMaxBlink, nClamp)
end


function item_blink_staff:Blink(hTarget, vPoint, nMaxBlink, nClamp)
	local vOrigin = hTarget:GetAbsOrigin() --Our units's location
	ProjectileManager:ProjectileDodge(hTarget)  --We disjoint disjointable incoming projectiles.
	ParticleManager:CreateParticle("particles/items_fx/blink_dagger_start.vpcf", PATTACH_ABSORIGIN, hTarget) --Create particle effect at our caster.
	hTarget:EmitSound("DOTA_Item.BlinkDagger.Activate") --Emit sound for the blink
	local vDiff = vPoint - vOrigin --Difference between the points
	if vDiff:Length2D() > nMaxBlink then  --Check caster is over reaching.
		vPoint = vOrigin + (vPoint - vOrigin):Normalized() * nClamp -- Recalculation of the target point.
	end
	hTarget:SetAbsOrigin(vPoint) --We move the caster instantly to the location
	FindClearSpaceForUnit(hTarget, vPoint, false) --This makes sure our caster does not get stuck
	ParticleManager:CreateParticle("particles/items_fx/blink_dagger_end.vpcf", PATTACH_ABSORIGIN, hTarget) --Create particle effect at our caster.
end
```
Теперь мы можем просто использовать недавно определенную функцию Blink, чтобы моргать нашему заклинателю и союзникам, не записывая все это заново. <br />
Давайте сейчас напишем кастинг. Сначала мы создаем оператор IF, чтобы проверить, есть ли у нас hTarget. Затем мы проверяем, совпадает ли цель с заклинателем или нет. Также, если у нас нет hTarget, мы по умолчанию моргаем сами. Чтобы получить местоположение, к которому мы хотим мигнуть, нам нужно найти какое-то целевое местоположение. Для этого мы воспользуемся фонтаном. (ent_dota_fountain)
```
lua
function item_blink_staff:OnSpellStart()
	local hCaster = self:GetCaster() --We will always have Caster.
	local hTarget = false --We might not have target so we make fail-safe so we do not get an error when calling - self:GetCursorTarget()
	if not self:GetCursorTargetingNothing() then
		hTarget = self:GetCursorTarget()
	end
	local vPoint = self:GetCursorPosition() --We will always have Vector for the point.
	local vOrigin = hCaster:GetAbsOrigin() --Our caster's location
	local nMaxBlink = 1200 --How far can we actually blink?
	local nClamp = 960 --If we try to over reach we use this value instead. (this is mechanic from blink dagger.)
	if hTarget then
		if hCaster == hTarget then
			if not self.hFountain and not self.bNoFountain then --We check if we have ever tried finding the fountain before.
			local hFountain = Entities:FindByClassname(nil, "ent_dota_fountain") --Find first fountain
			local bFound = false --Make the boolean for while statement.
				while not bFound do
					if hFountain then --Is there a fountain entity?
						if hFountain:GetTeamNumber() == hCaster:GetTeamNumber() then -- Is it the right team?
							self.hFountain = hFountain --Store it so we don't have to trouble finding the foundtain again.
							bFound = true --Make sure while statement ends
						else
							hFountain = Entities:FindByClassname(hFountain, "ent_dota_fountain") --Find the next fountain if we didn't find the right team.
						end
					else
						self.bNoFountain = true --We have concluded that there is no fountain entity for this team. Lets not do that again!
						bFound = true --We could alternatively use 'Break' but I find this more funny.
					end
				end
			end
			if self.hFountain then --Do we have fountain?
				vPoint = self.hFountain:GetAbsOrigin() --Lets change our target location there then.
				self:Blink(hCaster, vPoint, nMaxBlink, nClamp) --BLINK!
			else
				self:EndCooldown()
				self:RefundManaCost()
			end
		end
	else
		self:Blink(hCaster, vPoint, nMaxBlink, nClamp) --BLINK!
	end
end
```
Как видите, на этот раз мы использовали оператор while, чтобы просмотреть все фонтанные сущности и сохранить результаты поиска в способности. Если он не находит объектов, он сохраняет логическое значение, чтобы в следующий раз не пытаться найти фонтан. Также, как и в случае с Blink Dagger, если цель не может быть найдена, мы вообще не будем мигать.

<br />
Далее нам нужно разрешить нацеливание заклинания на союзников, но вместо моргания мы сохраняем их идентификатор для
в следующий раз мы сделаем «точечное» наведение на землю. Есть несколько способов сделать это, но это было бы справедливо.
если мы дадим им какое-то предупреждение о том, что происходит. Итак, давайте создадим два модификатора. Один будет
просто воздействовать на целевого союзника, и один из них будет скрытым модификатором для хранения индекса объекта цели.
на короткий срок.

Сначала нам нужно связать предполагаемые модификаторы со способностью. Верхняя часть вашего lua-файла Blink Staff должна выглядеть так:

```
lua
if item_blink_staff == nil then
	item_blink_staff = class({})
end

LinkLuaModifier( "item_blink_staff_effect_modifier", "lua_items/blink_staff/effect_modifier.lua", LUA_MODIFIER_MOTION_NONE )
```
Затем нам понадобится объявленный файл модификатора эффекта. В этом уроке мы будем использовать эффект частиц для браслета, чтобы мы могли снова пропустить прекэш.
```
lua
if item_blink_staff_effect_modifier == nil then
	item_blink_staff_effect_modifier = class({})
end

function item_blink_staff_effect_modifier:OnCreated( kv )
	if IsServer() then
		if self:GetCaster() ~= self:GetParent() then
			local nFXIndex = ParticleManager:CreateParticle("particles/items_fx/armlet.vpcf", PATTACH_ROOTBONE_FOLLOW, self:GetParent())
			self:AddParticle( nFXIndex, false, false, -1, false, false )
		end
	end
end

function item_blink_staff_effect_modifier:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE + MODIFIER_ATTRIBUTE_IGNORE_INVULNERABLE
end

function item_blink_staff_effect_modifier:IsHidden()
	if self:GetCaster() == self:GetParent() then
	return true
	else
	return false
	end
end
```
Как видите, мы впервые использовали функцию IsServer(). Это используется для того, чтобы часть игровой логики не запускалась несколько раз (поскольку некоторые части кода выполняются как на клиентах, так и на сервере).
Также в этом уроке мы будем использовать один и тот же эффект как для заклинателя, так и для цели посоха. Мы могли бы создать два модификатора, но это было бы расточительно. Вот почему мы добавили к модификатору некоторые дополнительные функции, чтобы мы могли различать, является ли целью модификатора заклинатель или нет. Также, если в игре более одного посоха для блинка, мы позаботимся о том, чтобы на одном юните могло быть несколько модификаторов одного и того же типа.

Теперь нам нужно добавить код, который позволит нам добавить модификатор к цели и сохранить индекс сущности этой цели в нашем модификаторе, а при приведении точки снова получить цель. В этом уроке мы даем игроку пять секунд на перекаст. Мы также прекращаем перезарядку и возвращаем мана-затраты союзнику.
```
lua
function item_blink_staff:OnSpellStart()
	local hCaster = self:GetCaster() --We will always have Caster.
	local hTarget = false --We might not have target so we make fail-safe so we do not get an error when calling - self:GetCursorTarget()
	if not self:GetCursorTargetingNothing() then
		hTarget = self:GetCursorTarget()
	end
	local vPoint = self:GetCursorPosition() --We will always have Vector for the point.
	local vOrigin = hCaster:GetAbsOrigin() --Our caster's location
	local nMaxBlink = 1200 --How far can we actually blink?
	local nClamp = 960 --If we try to over reach we use this value instead. (this is mechanic from blink dagger.)
	if hTarget then
		if hCaster == hTarget then
			if not self.hFountain and not self.bNoFountain then --We check if we have ever tried finding the fountain before.
			local hFountain = Entities:FindByClassname(nil, "ent_dota_fountain") --Find first fountain
			local bFound = false --Make the boolean for while statement.
				while not bFound do
					if hFountain then --Is there a fountain entity?
						if hFountain:GetTeamNumber() == hCaster:GetTeamNumber() then -- Is it the right team?
							self.hFountain = hFountain --Store it so we don't have to trouble finding the foundtain again.
							bFound = true --Make sure while statement ends
						else
							hFountain = Entities:FindByClassname(hFountain, "ent_dota_fountain") --Find the next fountain if we didn't find the right team.
						end
					else
						self.bNoFountain = true --We have concluded that there is no fountain entity for this team. Lets not do that again!
						bFound = true --We could alternatively use 'Break' but I find this more funny.
					end
				end
			end
			if self.hFountain then --Do we have fountain?
				vPoint = self.hFountain:GetAbsOrigin() --Lets change our target location there then.
				self:Blink(hCaster, vPoint, nMaxBlink, nClamp) --BLINK!
			else
				self:EndCooldown() --Cooldown refund if we could not find fountain on self cast
				self:RefundManaCost() --Manacost refund if we could not find fountain on self cast
			end
		else
			hTarget:AddNewModifier( hCaster, self, "item_blink_staff_effect_modifier", { duration = 5 } ) --lets add modifier to target
			hCaster:AddNewModifier( hCaster, self, "item_blink_staff_effect_modifier", { duration = 5 } ) --lets add modifier to caster
			local hModifier = hCaster:FindModifierByNameAndCaster("item_blink_staff_effect_modifier", hCaster) --find that modifier (they really should fix this by returning handle when adding new modifier.
			local nTargetIndex = hTarget:GetEntityIndex() --lets find the targets entity index
			hModifier:SetStackCount(nTargetIndex) --add that index to the modifier as it's stack count
			self:EndCooldown() --Cooldown refund so can cast again
			self:RefundManaCost() --Manacost refund
		end
	else

		local hModifier = hCaster:FindModifierByNameAndCaster("item_blink_staff_effect_modifier", hCaster) --Check if we have someone selected
		if hModifier then
			hTarget = EntIndexToHScript(hModifier:GetStackCount()) --Find the target with the ent index
			if hTarget:FindModifierByNameAndCaster("item_blink_staff_effect_modifier", hCaster) then --Check if the target is not purged.
				self:Blink(hTarget, vPoint, nMaxBlink, nClamp) --BLINK!
			else --Someone purged our target
			self:Blink(hCaster, vPoint, nMaxBlink, nClamp) --BLINK!
			end
		else
			self:Blink(hCaster, vPoint, nMaxBlink, nClamp) --BLINK!
		end
	end
end
```
Теперь нам нужно сделать еще две вещи, прежде чем мы закончим работу с нашим lua-скриптом. На данный момент этот предмет имеет неограниченную дальность применения для поражения союзного юнита. У нас также есть проблема со злоупотреблением этим предметом, когда цель не хочет, чтобы кто-то «помогал» ей. (Ака. Отключить справку) <br /> К счастью, у нас есть один инструмент для них обоих: CastFilterResultTarget и GetCustomCastErrorTarget.<br />Давайте добавим следующие функции в скрипт нашего элемента:
```
lua

function item_blink_staff:CastFilterResultTarget( hTarget ) -- hTarget is the targeted NPC.
	local hCaster = self:GetCaster() --We will always have Caster.
	local vOrigin = hCaster:GetAbsOrigin() --Our caster's location
	local vPoint = hTarget:GetAbsOrigin() --Our target's location
	local nMaxRange = 1200 --How far can we actually target?
	local vDiff = vPoint - vOrigin --Difference between the points
	local nTargetID = hTarget:GetPlayerOwnerID() --getting targets owner id
	local nCasterID = hCaster:GetPlayerOwnerID() --getting casters owner id
	if nTargetID and nCasterID then --making sure they both exist
		if PlayerResource:IsDisableHelpSetForPlayerID(nTargetID, nCasterID) then --target hates having caster help him out.
			return UF_FAIL_CUSTOM
		end
	end

	if vDiff:Length2D() > nMaxRange then  --Check caster is over reaching.
	return UF_FAIL_CUSTOM
	else
	return UF_SUCCESS
	end
end

function item_blink_staff:GetCustomCastErrorTarget( hTarget) -- hTarget is the targeted NPC.
	local hCaster = self:GetCaster() --We will always have Caster.
	local vOrigin = hCaster:GetAbsOrigin() --Our caster's location
	local vPoint = hTarget:GetAbsOrigin() --Our target's location
	local nMaxRange = 1200 --How far can we actually target?
	local vDiff = vPoint - vOrigin --Difference between the points
	local nTargetID = hTarget:GetPlayerOwnerID() --getting targets owner id
	local nCasterID = hCaster:GetPlayerOwnerID() --getting casters owner id
	if nTargetID and nCasterID then --making sure they both exist
		if PlayerResource:IsDisableHelpSetForPlayerID(nTargetID, nCasterID) then --target hates having caster help him out.
			return "#dota_hud_error_target_has_disable_help"
		end
	end
	if vDiff:Length2D() > nMaxRange then  --Check caster is over reaching.
	return "#dota_hud_error_target_out_of_range" --returning error from localization
	end
end
```
Теперь, чтобы сэкономить время и здравомыслие, вы можете добавить в свой скрипт «специальные» значения. Это значения, которые вы можете легко изменить, не открывая скрипт и не ища их там. Это чрезвычайно полезно, когда вы используете эти значения в нескольких местах. Он также позволяет отображать значения в описании вашего предмета. <br />Сначала добавьте следующий блок к вашему предмету в «npc_items_custom.txt».
```
		"AbilityValues"
		{
      "max_blink" "1200"
      "blink_clamp" "960"
      "help_range" "3000"
      "help_duration" "5.0"
		}
```
Теперь, чтобы использовать эти значения, вы можете использовать эту функцию:
```
lua
self:GetSpecialValueFor( "max_blink" )
```
Или в вашем модификаторе вы должны сначала получить дескриптор своей способности:
```
lua
self:GetAbility():GetSpecialValueFor( "max_blink" )
```
Теперь мы находим и заменяем все эти значения правильным получением специального значения, и в итоге мы должны получить следующий результат:
```
lua

function item_blink_staff:OnSpellStart()
	local hCaster = self:GetCaster() --We will always have Caster.
	local hTarget = false --We might not have target so we make fail-safe so we do not get an error when calling - self:GetCursorTarget()
	if not self:GetCursorTargetingNothing() then
		hTarget = self:GetCursorTarget()
	end
	local vPoint = self:GetCursorPosition() --We will always have Vector for the point.
	local vOrigin = hCaster:GetAbsOrigin() --Our caster's location
	local nMaxBlink = self:GetSpecialValueFor( "max_blink" ) --How far can we actually blink?
	local nClamp = self:GetSpecialValueFor( "blink_clamp" ) --If we try to over reach we use this value instead. (this is mechanic from blink dagger.)
	if hTarget then
		if hCaster == hTarget then
			if not self.hFountain and not self.bNoFountain then --We check if we have ever tried finding the fountain before.
			local hFountain = Entities:FindByClassname(nil, "ent_dota_fountain") --Find first fountain
			local bFound = false --Make the boolean for while statement.
				while not bFound do
					if hFountain then --Is there a fountain entity?
						if hFountain:GetTeamNumber() == hCaster:GetTeamNumber() then -- Is it the right team?
							self.hFountain = hFountain --Store it so we don't have to trouble finding the foundtain again.
							bFound = true --Make sure while statement ends
						else
							hFountain = Entities:FindByClassname(hFountain, "ent_dota_fountain") --Find the next fountain if we didn't find the right team.
						end
					else
						self.bNoFountain = true --We have concluded that there is no fountain entity for this team. Lets not do that again!
						bFound = true --We could alternatively use 'Break' but I find this more funny.
					end
				end
			end
			if self.hFountain then --Do we have fountain?
				vPoint = self.hFountain:GetAbsOrigin() --Lets change our target location there then.
				self:Blink(hCaster, vPoint, nMaxBlink, nClamp) --BLINK!
			else
				self:EndCooldown() --Cooldown refund if we could not find fountain on self cast
				self:RefundManaCost() --Manacost refund if we could not find fountain on self cast
			end
		else
			hTarget:AddNewModifier( hCaster, self, "item_blink_staff_effect_modifier", { duration = self:GetSpecialValueFor( "help_duration" ) } ) --lets add modifier to target
			hCaster:AddNewModifier( hCaster, self, "item_blink_staff_effect_modifier", { duration = self:GetSpecialValueFor( "help_duration" ) } ) --lets add modifier to caster
			local hModifier = hCaster:FindModifierByNameAndCaster("item_blink_staff_effect_modifier", hCaster) --find that modifier (they really should fix this by returning handle when adding new modifier.
			local nTargetIndex = hTarget:GetEntityIndex() --lets find the targets entity index
			hModifier:SetStackCount(nTargetIndex) --add that index to the modifier as it's stack count
			self:EndCooldown() --Cooldown refund so can cast again
			self:RefundManaCost() --Manacost refund
		end
	else

		local hModifier = hCaster:FindModifierByNameAndCaster("item_blink_staff_effect_modifier", hCaster) --Check if we have someone selected
		if hModifier then
			hTarget = EntIndexToHScript(hModifier:GetStackCount()) --Find the target with the ent index
			if hTarget:FindModifierByNameAndCaster("item_blink_staff_effect_modifier", hCaster) then --Check if the target is not purged.
				self:Blink(hTarget, vPoint, nMaxBlink, nClamp) --BLINK!

			else --Someone purged our target
			self:Blink(hCaster, vPoint, nMaxBlink, nClamp) --BLINK!
			end
		else
			self:Blink(hCaster, vPoint, nMaxBlink, nClamp) --BLINK!
		end
	end
end


function item_blink_staff:Blink(hTarget, vPoint, nMaxBlink, nClamp)
	local vOrigin = hTarget:GetAbsOrigin() --Our units's location
	ProjectileManager:ProjectileDodge(hTarget)  --We disjoint disjointable incoming projectiles.
	ParticleManager:CreateParticle("particles/items_fx/blink_dagger_start.vpcf", PATTACH_ABSORIGIN, hTarget) --Create particle effect at our caster.
	hTarget:EmitSound("DOTA_Item.BlinkDagger.Activate") --Emit sound for the blink
	local vDiff = vPoint - vOrigin --Difference between the points
	if vDiff:Length2D() > nMaxBlink then  --Check caster is over reaching.
		vPoint = vOrigin + (vPoint - vOrigin):Normalized() * nClamp -- Recalculation of the target point.
	end
	hTarget:SetAbsOrigin(vPoint) --We move the caster instantly to the location
	FindClearSpaceForUnit(hTarget, vPoint, false) --This makes sure our caster does not get stuck
	ParticleManager:CreateParticle("particles/items_fx/blink_dagger_end.vpcf", PATTACH_ABSORIGIN, hTarget) --Create particle effect at our caster.
end

function item_blink_staff:CastFilterResultTarget( hTarget ) -- hTarget is the targeted NPC.
	local hCaster = self:GetCaster() --We will always have Caster.
	local vOrigin = hCaster:GetAbsOrigin() --Our caster's location
	local vPoint = hTarget:GetAbsOrigin() --Our target's location
	local nMaxRange = self:GetSpecialValueFor( "help_range" ) --How far can we actually target?
	local vDiff = vPoint - vOrigin --Difference between the points
	local nTargetID = hTarget:GetPlayerOwnerID() --getting targets owner id
	local nCasterID = hCaster:GetPlayerOwnerID() --getting casters owner id
	if nTargetID and nCasterID then --making sure they both exist
		if PlayerResource:IsDisableHelpSetForPlayerID(nTargetID, nCasterID) then --target hates having caster help him out.
			return UF_FAIL_CUSTOM
		end
	end

	if vDiff:Length2D() > nMaxRange then  --Check caster is over reaching.
	return UF_FAIL_CUSTOM
	else
	return UF_SUCCESS
	end
end

function item_blink_staff:GetCustomCastErrorTarget( hTarget) -- hTarget is the targeted NPC.
	local hCaster = self:GetCaster() --We will always have Caster.
	local vOrigin = hCaster:GetAbsOrigin() --Our caster's location
	local vPoint = hTarget:GetAbsOrigin() --Our target's location
	local nMaxRange = self:GetSpecialValueFor( "help_range" ) --How far can we actually target?
	local vDiff = vPoint - vOrigin --Difference between the points
	local nTargetID = hTarget:GetPlayerOwnerID() --getting targets owner id
	local nCasterID = hCaster:GetPlayerOwnerID() --getting casters owner id
	if nTargetID and nCasterID then --making sure they both exist
		if PlayerResource:IsDisableHelpSetForPlayerID(nTargetID, nCasterID) then --target hates having caster help him out.
			return "#dota_hud_error_target_has_disable_help"
		end
	end
	if vDiff:Length2D() > nMaxRange then  --Check caster is over reaching.
	return "#dota_hud_error_target_out_of_range" --returning error from localization
	end
end
```
Теперь, если мы хотим убедиться в полной согласованности между npc_items_custom.txt и нашим файлом lua, мы можем использовать self.BaseClass для таких вещей, как время восстановления или диапазон применения. Давайте заменим наши функции затрат маны и времени восстановления, чтобы увидеть, как это работает.
```
lua
function item_blink_staff:GetManaCost()
	return self.BaseClass.GetManaCost( self, nLevel )
end

function item_blink_staff:GetCooldown( nLevel )
	return self.BaseClass.GetCooldown( self, nLevel )
end
```
Теперь все, что нам нужно сделать, это сделать локализацию предмета. В папке «dota 2 beta\game\dota_addons\{имя аддона}\resource» у вас должен быть файл addon_english.txt<br />. Если вы используете другой язык, вы можете использовать файл с другим именем. Но если другие языки не работают, по умолчанию используется английский. <br />
Откройте его и добавьте в микс следующие строки.
```

		"DOTA_Tooltip_ability_item_blink_staff"                                           "Blink Staff"
		"DOTA_Tooltip_ability_item_blink_staff_Description"                               "Teleport to a target point up to 1200 units away. Can be used on allied units to select them to blink instead of you."
		"DOTA_Tooltip_ability_item_blink_staff_max_blink"                                 "Max Blink Distance:"
		"DOTA_Tooltip_ability_item_blink_staff_help_range"                                "Help Range:"

		"DOTA_Tooltip_item_blink_staff_effect_modifier"                                             "Blink Staff"
		"DOTA_Tooltip_item_blink_staff_effect_modifier_Description"                                 "Targeted by Blink Staff"
```
Давайте посмотрим, что мы имеем сейчас:

<StaticVideo path="/videos/FrankBleakChihuahua.mp4" />

Нам еще предстоит кое-что сделать, но сначала давайте исправим самую очевидную проблему. В настоящее время существует ошибка: <br />.
"AbilityUnitTargetTeam" "DOTA_UNIT_TARGET_TEAM_FRIENDLY"<br />
Игнорируется!<br />
Мы можем это исправить, добавив проверку команды в наши фильтры приведения:
```
lua

function item_blink_staff:CastFilterResultTarget( hTarget ) -- hTarget is the targeted NPC.
	local hCaster = self:GetCaster() --We will always have Caster.
	local vOrigin = hCaster:GetAbsOrigin() --Our caster's location
	local vPoint = hTarget:GetAbsOrigin() --Our target's location
	local nMaxRange = self:GetSpecialValueFor( "help_range" ) --How far can we actually target?
	local vDiff = vPoint - vOrigin --Difference between the points
	local nTargetID = hTarget:GetPlayerOwnerID() --getting targets owner id
	local nCasterID = hCaster:GetPlayerOwnerID() --getting casters owner id
	if hCaster:GetTeamNumber() ~= hTarget:GetTeamNumber() then
		return UF_FAIL_CUSTOM
	end
	if nTargetID and nCasterID then --making sure they both exist
		if PlayerResource:IsDisableHelpSetForPlayerID(nTargetID, nCasterID) then --target hates having caster help him out.
			return UF_FAIL_CUSTOM
		end
	end

	if vDiff:Length2D() > nMaxRange then  --Check caster is over reaching.
	return UF_FAIL_CUSTOM
	else
	return UF_SUCCESS
	end
end

function item_blink_staff:GetCustomCastErrorTarget( hTarget) -- hTarget is the targeted NPC.
	local hCaster = self:GetCaster() --We will always have Caster.
	local vOrigin = hCaster:GetAbsOrigin() --Our caster's location
	local vPoint = hTarget:GetAbsOrigin() --Our target's location
	local nMaxRange = self:GetSpecialValueFor( "help_range" ) --How far can we actually target?
	local vDiff = vPoint - vOrigin --Difference between the points
	local nTargetID = hTarget:GetPlayerOwnerID() --getting targets owner id
	local nCasterID = hCaster:GetPlayerOwnerID() --getting casters owner id
	if hCaster:GetTeamNumber() ~= hTarget:GetTeamNumber() then
		return "#dota_hud_error_cant_cast_on_enemy"
	end
	if nTargetID and nCasterID then --making sure they both exist
		if PlayerResource:IsDisableHelpSetForPlayerID(nTargetID, nCasterID) then --target hates having caster help him out.
			return "#dota_hud_error_target_has_disable_help"
		end
	end
	if vDiff:Length2D() > nMaxRange then  --Check caster is over reaching.
	return "#dota_hud_error_target_out_of_range" --returning error from localization
	end
end
```
Проблема этого метода в том, что пользователю легче моргнуть в сторону врага, чем даже попытаться «помочь» ему/ей. Но в этом уроке мы предполагаем, что вы сами сможете понять, как отредактировать код, чтобы он мигал, когда у заклинателя и цели разные команды, используя в качестве примера изменения фильтра каста. <br />
Теперь то, что делает блинк-кинжал менее эффективным, чем инструмент побега, — это время восстановления при ранении. Давайте добавим это! Для этого мы создаем модификатор Intrinsic. Давайте свяжем наш новый модификатор:
```
lua
LinkLuaModifier( "item_blink_staff_passive_modifier", "lua_items/blink_staff/passive_modifier.lua", LUA_MODIFIER_MOTION_NONE )
function item_blink_staff:GetIntrinsicModifierName()
	return "item_blink_staff_passive_modifier"
end
```
Теперь создайте для него наш объявленный lua-файл, и его содержимое должно быть примерно таким:
```
lua
if item_blink_staff_passive_modifier == nil then
	item_blink_staff_passive_modifier = class({})
end

function item_blink_staff_passive_modifier:IsHidden()
	return true --we want item's passive abilities to be hidden most of the times
end

function item_blink_staff_passive_modifier:DeclareFunctions() --we want to use these functions in this item
	local funcs = {
		MODIFIER_EVENT_ON_TAKEDAMAGE
	}

	return funcs
end

function item_blink_staff_passive_modifier:OnTakeDamage( params ) --When ever the unit takes damage this is called
	if IsServer() then --this should be only run on server.
		local hAbility = self:GetAbility() --we get the ability where this modifier is from
		if params.attacker ~= self:GetParent() and params.unit == self:GetParent() and  params.attacker:IsHero()  then
		hAbility:StartCooldown(hAbility:GetSpecialValueFor( "hurt_cooldown" )) --we start the cooldown
		end
	end
end
```
Как вы можете видеть, используются функции объявления, чтобы сообщить игре, чего ожидать от этого модификатора. Это гарантирует, что игра не будет проверять этот модификатор при каждом событии, которое может быть затронуто. <br />
Мы также добавили новое особое значение для времени восстановления, когда заклинатель получает травму. Не забудьте добавить это в ваш «npc_items_custom.txt» в качестве значения с плавающей запятой.
```
			"05"
			{
				"var_type"				"FIELD_FLOAT"
				"hurt_cooldown"			"3.0"
			}
```
Теперь мы должны были осветить все основные вопросы. Далее мы добавляем рецепт предмета и добавляем характеристики компонентов.

## Рецепт и статистика

Как вы могли заметить, тестируя наш предмет, сейчас его покупка не требует затрат золота. Здесь мы можем сделать две вещи. Мы можем либо добавить ItemCost в наш файл npc_items_custom.txt, либо создать рецепт для предмета. Когда вы создаете рецепт предмета, игра автоматически рассчитывает стоимость предмета. Мы также можем добавить ItemCost в наш новый рецепт, чтобы игра знала, что вам также нужно купить его, а не автоматически объединять предметы в один. Мы также добавляем характеристики наших компонентов, поэтому обязательно добавляйте к вашему предмету специальные значения, отражающие характеристики компонента.

Для своих компонентов я буду использовать item_quarterstaff, item_robe и item_blink. Я также делаю рецепт стоимостью 325 золотых. При создании рецепта следует учитывать одну важную вещь — схему именования. Название рецепта всегда должно быть
'item_recipe_your_item'<br />
мой предмет: item_blink_staff<br />
мой рецепт: item_recipe_blink_staff<br />
Также вы должны указать уникальный идентификатор каждого элемента в npc_items_custom.txt. Если вы этого не сделаете, вы можете обнаружить странные ошибки, например, невозможность покупки предмета. Вот мои текущие записи в npc_items_custom.txt
```

	"item_blink_staff"
	{
		"ID"							"1250"
		"BaseClass"						"item_lua"
		"ScriptFile"					"lua_items/blink_staff/blink_staff.lua"
		"AbilityTextureName"			"item_blink_staff"
		"AbilityUnitTargetTeam"			"DOTA_UNIT_TARGET_TEAM_FRIENDLY"
		"AbilityUnitTargetType"			"DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC"
		"AbilityCastRange"				"0"
		"AbilityCastPoint"				"0.3"
		"AbilityCooldown"				"10.0"
		"AbilityManaCost"				"50"
		//// Item Info
		////-------------------------------------------------------------------------------------------------------------
		"ItemCost"						"3900"
		"ItemShopTags"					"blink;staff"
		"ItemQuality"					"rare"
		"ItemAliases"					"blink;staff"
    //
		"AbilityValues"
		{
      // Blink
      "max_blink" "1200"
      "blink_clamp" "960"
      "help_range" "3000"
      "help_duration" "5.0"
      "hurt_cooldown" "3.0"

			// Quearterstaff
      "bonus_damage" "10"
      "bonus_attack_speed" "10"

      // Robe Of Magi
      "bonus_int" "6"
		}
	}

	"item_recipe_blink_staff"
	{
		// General
		//-------------------------------------------------------------------------------------------------------------
		"BaseClass"                     "item_datadriven"
		"ID"							"1251"

		// Item Info
		//-------------------------------------------------------------------------------------------------------------
		"ItemCost"						"325"
		"ItemShopTags"					""

		// Recipe
		//-------------------------------------------------------------------------------------------------------------
		"ItemRecipe"					"1"
		"ItemResult"					"item_blink_staff"
		"ItemRequirements"
		{
			"01"						"item_quarterstaff;item_robe;item_blink"
		}
	}
```
Обратите внимание, что в разделе «Требования к элементам» перечислены те элементы, которые вам нужны. Для клапанов, определяемых клапаном, используйте это в качестве ссылки: <br /> https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Scripting/Built-In_Item_Names <br />
Также обратите внимание, как первая запись определяется как «01». Это потому, что вы можете создать рецепт, который можно использовать с разными наборами компонентов. Это используется клапаном в Power Threads, где вы можете использовать любой из основных элементов атрибута стоимости 450.<br />
Хотя мы определили специальные значения для характеристик нашего посоха, мы фактически нигде не использовали эти значения. Давайте вернемся к нашему Lua-файлу пассивного модификатора посоха, который мы использовали для восстановления при получении урона. <br />
Здесь нам нужно объявить новые функции для необходимой нам статистики.
```
lua
function item_blink_staff_passive_modifier:DeclareFunctions() --we want to use these functions in this item
	local funcs = {
		MODIFIER_EVENT_ON_TAKEDAMAGE,
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS
	}

	return funcs
end
```
Теперь, когда мы объявили, чего мы хотим добиться в игре с помощью этого модификатора, давайте добавим функции, которые игра может вызывать при правильных событиях.
```
lua
function item_blink_staff_passive_modifier:GetModifierBonusStats_Intellect()
	local hAbility = self:GetAbility() --we get the ability where this modifier is from
	return hAbility:GetSpecialValueFor( "bonus_int" )
end

function item_blink_staff_passive_modifier:GetModifierAttackSpeedBonus_Constant()
	local hAbility = self:GetAbility() --we get the ability where this modifier is from
	return hAbility:GetSpecialValueFor( "bonus_attack_speed" )
end

function item_blink_staff_passive_modifier:GetModifierPreAttack_BonusDamage()
	local hAbility = self:GetAbility() --we get the ability where this modifier is from
	return hAbility:GetSpecialValueFor( "bonus_damage" )
end
```
Теперь последнее, что нам нужно сделать, это рассказать игроку о впечатляющих характеристиках, которые дает ему этот предмет. Давайте добавим нашу новую статистику в addon_english.txt<br />.
После этого наш файл должен иметь что-то вроде этого:
```

		"DOTA_Tooltip_ability_item_blink_staff"                                           "Blink Staff"
		"DOTA_Tooltip_ability_item_blink_staff_Description"                               "Teleport to a target point up to 1200 units away. Can be used on allied units to select them to blink instead of you."
		"DOTA_Tooltip_ability_item_blink_staff_max_blink"                                 "Max Blink Distance:"
		"DOTA_Tooltip_ability_item_blink_staff_help_range"                                "Help Range:"
		"DOTA_Tooltip_ability_item_blink_staff_bonus_damage"                              "+$damage"
		"DOTA_Tooltip_ability_item_blink_staff_bonus_attack_speed"                        "+$attack"
		"DOTA_Tooltip_ability_item_blink_staff_bonus_int"                                 "+$int"

		"DOTA_Tooltip_item_blink_staff_effect_modifier"                                             "Blink Staff"
		"DOTA_Tooltip_item_blink_staff_effect_modifier_Description"                                 "Targeted by Blink Staff"
```
Теперь мы почти закончили. Но поскольку самым большим преимуществом элементов Lua является то, что мы можем определять очень много вещей динамически, поэтому в оставшейся части этого урока мы проведем несколько экспериментов, которые могут показаться не очень сбалансированными или разумными с точки зрения игрового процесса, но просто потому, что мы можем!

## Расширенное использование

Сначала давайте попробуем повлиять на дальность применения помощи, если мы имеем дело с героем с большим запасом маны. Поскольку мы используем фильтры приведения для ограничения диапазона помощи, мы можем сделать эту часть там. Для этого мы используем уже определенный дескриптор hCaster и функцию :GetMaxMana() для возврата запаса маны героя. Затем мы добавляем это значение к уже существующему диапазону справки. Это означает, что если у нашего заклинателя есть 5000 маны для использования в поздней игре, у него или нее будет огромный диапазон поддержки в 8000 юнитов.<br />
Итак, давайте изменим цель CastFilterResult и функции ошибок следующим образом:
```
lua
	local nRangeBonus = hCaster:GetMaxMana() --Get our caster's mana pool
	local nMaxRange = self:GetSpecialValueFor( "help_range" ) + nRangeBonus--How far can we actually target?
```
Конечный результат должен выглядеть примерно так
```
lua
function item_blink_staff:CastFilterResultTarget( hTarget ) -- hTarget is the targeted NPC.
	local hCaster = self:GetCaster() --We will always have Caster.
	local vOrigin = hCaster:GetAbsOrigin() --Our caster's location
	local vPoint = hTarget:GetAbsOrigin() --Our target's location
	local nRangeBonus = hCaster:GetMaxMana() --Get our caster's mana pool
	local nMaxRange = self:GetSpecialValueFor( "help_range" ) + nRangeBonus--How far can we actually target?
	local vDiff = vPoint - vOrigin --Difference between the points
	local nTargetID = hTarget:GetPlayerOwnerID() --getting targets owner id
	local nCasterID = hCaster:GetPlayerOwnerID() --getting casters owner id
	if hCaster:GetTeamNumber() ~= hTarget:GetTeamNumber() then
		return UF_FAIL_CUSTOM
	end
	if nTargetID and nCasterID then --making sure they both exist
		if PlayerResource:IsDisableHelpSetForPlayerID(nTargetID, nCasterID) then --target hates having caster help him out.
			return UF_FAIL_CUSTOM
		end
	end

	if vDiff:Length2D() > nMaxRange then  --Check caster is over reaching.
	return UF_FAIL_CUSTOM
	else
	return UF_SUCCESS
	end
end

function item_blink_staff:GetCustomCastErrorTarget( hTarget) -- hTarget is the targeted NPC.
	local hCaster = self:GetCaster() --We will always have Caster.
	local vOrigin = hCaster:GetAbsOrigin() --Our caster's location
	local vPoint = hTarget:GetAbsOrigin() --Our target's location
	local nRangeBonus = hCaster:GetMaxMana() --Get our caster's mana pool
	local nMaxRange = self:GetSpecialValueFor( "help_range" ) + nRangeBonus--How far can we actually target?
	local vDiff = vPoint - vOrigin --Difference between the points
	local nTargetID = hTarget:GetPlayerOwnerID() --getting targets owner id
	local nCasterID = hCaster:GetPlayerOwnerID() --getting casters owner id
	if hCaster:GetTeamNumber() ~= hTarget:GetTeamNumber() then
		return "#dota_hud_error_cant_cast_on_enemy"
	end
	if nTargetID and nCasterID then --making sure they both exist
		if PlayerResource:IsDisableHelpSetForPlayerID(nTargetID, nCasterID) then --target hates having caster help him out.
			return "#dota_hud_error_target_has_disable_help"
		end
	end
	if vDiff:Length2D() > nMaxRange then  --Check caster is over reaching.
	return "#dota_hud_error_target_out_of_range" --returning error from localization
	end
end
```
Возможно, вы заметили, что мы используем почти один и тот же код как для фильтра приведения, так и для функции ошибки. Вот способ уменьшить избыточность:
```
lua
function item_blink_staff:CastFilterResultTarget( hTarget ) -- hTarget is the targeted NPC.
	return self:CCastFilter( hTarget, false )
end

function item_blink_staff:GetCustomCastErrorTarget( hTarget) -- hTarget is the targeted NPC.
	return self:CCastFilter( hTarget, true )
end

function item_blink_staff:CCastFilter( hTarget, bError )
	if IsServer() then --this should be only run on server.
		local hCaster = self:GetCaster() --We will always have Caster.
		local vOrigin = hCaster:GetAbsOrigin() --Our caster's location
		local vPoint = hTarget:GetAbsOrigin() --Our target's location
		local nRangeBonus = hCaster:GetMaxMana() --Get our caster's mana pool
		local nMaxRange = self:GetSpecialValueFor( "help_range" ) + nRangeBonus--How far can we actually target?
		local vDiff = vPoint - vOrigin --Difference between the points
		local nTargetID = hTarget:GetPlayerOwnerID() --getting targets owner id
		local nCasterID = hCaster:GetPlayerOwnerID() --getting casters owner id
		if hCaster:GetTeamNumber() ~= hTarget:GetTeamNumber() then
			if bError then
				return "#dota_hud_error_cant_cast_on_enemy"
			else
				return UF_FAIL_CUSTOM
			end
		end
		if nTargetID and nCasterID then --making sure they both exist
			if PlayerResource:IsDisableHelpSetForPlayerID(nTargetID, nCasterID) then --target hates having caster help him out.
				if bError then
					return "#dota_hud_error_target_has_disable_help"
				else
					return UF_FAIL_CUSTOM
				end
			end
		end
		if vDiff:Length2D() > nMaxRange then  --Check caster is over reaching.
			if bError then
				return "#dota_hud_error_target_out_of_range" --returning error from localization
			else
				return UF_FAIL_CUSTOM
			end
		end
		if not bError then
			return UF_SUCCESS
		end
	end
end
```

## Уровни предметов

Как я упоминал ранее в руководстве, такие вещи, как bkb и dagon, используют уровни предметов. Dagon использует отдельные элементы для определения уровней, в то время как bkb имеет встроенное выравнивание при каждом его использовании. Мы собираемся написать код, в котором мы будем уменьшать диапазон помощи посоху, когда он используется для помощи игроку. <br />Сначала нам нужно добавить новые значения для наших диапазонов помощи между уровнями. Они просто разделены пробелами между значениями.
```
			"03"
			{
				"var_type"				"FIELD_INTEGER"
				"help_range"			"3000 2500 2000 1500 1000"
			}
```
Поскольку тут и там встречаются некоторые странные ошибки, значение MaxLevel, которое мы использовали бы для обычных способностей, не работает для предметов. Чтобы помочь нам определить его в скрипте, мы создаем для него новое специальное значение.
```
			"09"
			{
				"var_type"				"FIELD_INTEGER"
				"max_level"				"5"
			}
```
Возвращаясь к скрипту lua, нам нужно улучшать предмет только тогда, когда союзник телепортируется, а не когда мы просто помечаем нашего союзника для телепортации. Сначала найдите эту строку:
```
lua
self:Blink(hTarget, vPoint, nMaxBlink, nClamp) --BLINK!
```
Под ним добавим часть обновления. Обратите внимание, что мы должны проверить, не обновляем ли предмет, когда он полностью обновлен.
```
lua
if self:GetLevel() < self:GetSpecialValueFor( "max_level" ) then --We can't define max level for item like we can with abilities. Best to create special value for it.
	self:UpgradeAbility(true)
end
```
Мы также могли бы добавить условие, при котором, если игра сейчас находится в ночное время, обновление не произойдет. Позвольте нашему герою бесплатно помогать своим союзникам!
```
lua
if self:GetLevel() < self:GetSpecialValueFor( "max_level" ) and GameRules:IsDaytime() then
	self:UpgradeAbility(true)
end
```
Теперь, если мы хотим позволить нашему герою обновить уровни диапазона помощи, мы можем либо написать какое-нибудь событие, в котором мы сбрасываем уровень предмета с помощью:
```
lua
self:SetLevel(1)
```
Или мы можем использовать более элегантный вариант, изменив наш рецепт, чтобы он действовал как обновление заряда для барабанов выносливости.
```

	"item_recipe_blink_staff"
	{
		// General
		//-------------------------------------------------------------------------------------------------------------
		"BaseClass"                     "item_datadriven"
		"ID"							"1251"

		// Item Info
		//-------------------------------------------------------------------------------------------------------------
		"ItemCost"						"325"
		"ItemShopTags"					""

		// Recipe
		//-------------------------------------------------------------------------------------------------------------
		"ItemRecipe"					"1"
		"ItemResult"					"item_blink_staff"
		"ItemRequirements"
		{
			"01"						"item_quarterstaff;item_robe;item_blink"
			"02"						"item_blink_staff"
		}
	}
```
Обратите внимание, что мы добавили «02» к требованиям к предмету, и теперь требуется только предмет «item_blink_staff». Это означает, что мы можем объединить наш исходный посох для блинка, чтобы создать совершенно новый, с уровнем, установленным на значение по умолчанию. <br />Теперь вам следует не забыть изменить описание предмета, а не заставлять игрока гадать.
```
		"DOTA_Tooltip_ability_item_blink_staff_Description"                               "Teleport to a target point up to 1200 units away. Can be used on allied units to select them to blink instead of you. If you take damage the Blink Staff is put on 3.0 second cooldown. Every time you help ally the help range is reduced by 500. This doesn't apply if used during night time. You maximum mana is added to the help distance."
```

## Конец

Это конец этого урока.
Вы можете найти этот и другие предметы и способности Lua в моем репозитории Dota2Overflow на GitHub.
https://github.com/DrTeaSpoon/Dota2Overflow

<br />
Чтобы облегчить объявление функций-модификаторов, используйте это для ресурса:
<br />
https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Lua_Abilities_and_Modifiers#Modifier_Functions
<br />
Большое спасибо BMD за бербоны. Хотя этот урок не имеет ничего общего с его репозиторием, я использовал его для
полигон и создание наглядных пособий.
<br />
Большое спасибо всем, кто внес свой вклад в https://github.com/Pizzalol/SpellLibrary.
<br />

Приятного мигания!

<StaticVideo path="/videos/AthleticEminentAnnashummingbird.mp4" />