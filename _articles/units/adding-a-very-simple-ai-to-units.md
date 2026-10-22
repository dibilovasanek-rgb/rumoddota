---
title: Добавление очень простого ИИ к юнитам
author: wigguno
steamId: '76561198004447135'
date: 27.07.2015
---
бавление очень простого ИИ к юнитам

В этом уроке рассказывается, как отдавать очень простые приказы подразделениям. В этом руководстве используется порядок движения, позволяющий юниту случайно бродить внутри области, и порядок применения, позволяющий юниту случайным образом произносить нецелевое заклинание.

Это руководство предполагает базовые знания сценариев Lua.

## Недостатки

- Этот метод не следует использовать для подразделений, каждое из которых должно выполнять более одного вида приказов. Если требуется более продвинутый ИИ, вам следует проверить сценарии lua ai Holdout_example.
- Некоторые функции жестко запрограммированы в этом скрипте. Если вы хотите повторять свою игру и часто менять ее поведение, я бы предложил использовать некоторые глобальные константы или загружать значения из внешнего файла KV. Это позволит вам хранить все значения в одном месте.
## Ссылки

Я скопировал несколько юнитов из Holdout_example для тестирования и скопировал Berserkers Call из [Spell Library](https://github.com/Pizzalol/SpellLibrary).

Если вам нужна помощь в создании собственных юнитов или способностей, отличным ресурсом станет документация Noya:
[Datadriven Units](unit-keyvalues)
[DataDriven Ability Breakdown - Documentation](/abilities/ability-keyvalues)

## Настройка молотка

В Hammer я поместил объект info_target с именем «spawn_loc_test», который можно найти в lua. Это позволяет мне размещать места появления юнитов в Hammer, не меняя Lua-скрипты. Если вы хотите сделать это, дайте каждому объекту уникальное имя и разместите его в том месте, где вы хотите, чтобы точка появления была на вашей карте.
## Настройка Луа

В функции InitGameMode() мы делаем несколько вещей: запускаем генератор случайных чисел, создаем пустую таблицу, чтобы отслеживать поведение каждого юнита, создаем несколько юнитов и запускаем функцию мыслителя.

Настройки, не относящиеся к этому руководству, опущены, но с помощью этой функции вы можете настроить такие вещи, как GameRules, для вашего игрового режима.
```
lua
function CAITesting:InitGameMode()
	print( "Loading AI Testing Game Mode." )
	-- SEEDING RNG IS VERY IMPORTANT
	math.randomseed(Time())

	-- Set up a table to hold all the units we want to spawn
	self.UnitThinkerList = {}

	-- Spawn some units
	for i = 1,5 do
		self:SpawnAIUnitWanderer()
	end
	for i = 1,3 do
		self:SpawnAIUnitCaster()
	end

	-- Set the unit thinker function
	GameRules:GetGameModeEntity():SetThink( "OnUnitThink", self, "UnitThink", 1 )
end
```

## Создание странника

Эта функция создаст юнит с блуждающим поведением. Границы, между которыми перемещается юнит, жестко запрограммированы. Самый простой способ определить эти границы — создать в Hammer простой объект (например, info_target), переместить его и прочитать координаты. В этом примере моя сущность info_target называется «spawn_loc_test».
```
lua
function CAITesting:SpawnAIUnitWanderer()
	--Start an iteration finding each entity with this name
	--If you've named everything with a unique name, this will return your entity on the first go
	local spawnVectorEnt = Entities:FindByName(nil, "spawn_loc_test")

	-- GetAbsOrigin() is a function that can be called on any entity to get its location
	local spawnVector = spawnVectorEnt:GetAbsOrigin()

	-- Spawn the unit at the location on the neutral team
	local spawnedUnit = CreateUnitByName("npc_dota_creature_kobold_tunneler", spawnVector, true, nil, nil, DOTA_TEAM_NEUTRALS)

	-- make this unit passive
	spawnedUnit:SetIdleAcquire(false)

	-- Add some variables to the spawned unit so we know its intended behaviour
	-- You can store anything here, and any time you get this entity the information will be intact
	spawnedUnit.ThinkerType = "wander"
	spawnedUnit.wanderBounds = {}
	spawnedUnit.wanderBounds.XMin = -768
	spawnedUnit.wanderBounds.XMax = 768
	spawnedUnit.wanderBounds.YMin = -64
	spawnedUnit.wanderBounds.YMax = 768

	-- Add a random amount to the game time to randomise the behaviour a bit
	spawnedUnit.NextOrderTime = GameRules:GetGameTime() + math.random(5, 10)

	-- finally, insert the unit into the table
	table.insert(self.UnitThinkerList, spawnedUnit)
end
```

## Создание заклинателя

Эта функция создаст юнит с кастинговым поведением. Границы, в которых появляется юнит, жестко запрограммированы. Это заклинание не является целевым, для его применения не требуются дополнительные переменные.
```
lua
function CAITesting:SpawnAIUnitCaster()
	-- Generate a random location inside the neutrals area
	local spawnVector = Vector(math.random(-768, 768), math.random(-64, 768), 128)

	-- Spawn the unit at the location on the neutral team
	local spawnedUnit = CreateUnitByName("npc_dota_creature_gnoll_assassin", spawnVector, true, nil, nil, DOTA_TEAM_NEUTRALS)

	-- make this unit passive
	spawnedUnit:SetIdleAcquire(false)

	-- Add some variables to the spawned unit so we know its intended behaviour
	-- You can store anything here, and any time you get this entity the information will be intact
	spawnedUnit.ThinkerType = "caster"
	spawnedUnit.CastAbilityIndex = spawnedUnit:GetAbilityByIndex(0):entindex()

	-- Add a random amount to the game time to randomise the behaviour a bit
	spawnedUnit.NextOrderTime = GameRules:GetGameTime() + math.random(5, 10)

	-- finally, insert the unit into the table
	table.insert(self.UnitThinkerList, spawnedUnit)
end
```

## Функция мыслителя

Эта функция вызывается каждую секунду. Он прочитает каждое из подразделений и определит, следует ли им отдать новый приказ, а затем отдаст этот приказ.
```
lua
function CAITesting:OnUnitThink()
	if GameRules:State_Get() == DOTA_GAMERULES_STATE_GAME_IN_PROGRESS then

		local deadUnitCount = 0

		-- Check each of the units in this table for their thinker behaviour
		for ind, unit in pairs(self.UnitThinkerList) do

			-- The first check should be to see if the units are still alive or not.
			-- Keep track of how many units are removed from the table, as the indices will change by that amount
			if unit:IsNull() or not unit:IsAlive() then
				table.remove(self.UnitThinkerList, ind - deadUnitCount)
				deadUnitCount = deadUnitCount + 1

			-- Check if the game time has passed our random time for next order
			elseif GameRules:GetGameTime() > unit.NextOrderTime then

				if unit.ThinkerType == "wander" then
					--print("thinker unit is a wanderer")
					--print("time: " .. GameRules:GetGameTime() .. ". next wander: " .. unit.NextWanderTime)

					-- Generate random coordinates to wander to
					local x = math.random(unit.wanderBounds.XMin, unit.wanderBounds.XMax)
					local y = math.random(unit.wanderBounds.YMin, unit.wanderBounds.YMax)
					local z = GetGroundHeight(Vector(x, y, 128), nil)

					print("wandering to x: " .. x .. " y: " .. y)

					-- Issue the movement order to the unit
					unit:MoveToPosition(Vector(x, y, z))


				elseif unit.ThinkerType == "caster" then

					-- If you want a more complicated order, use this syntax
					-- Some more documentation: https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Scripting/API/Global.ExecuteOrderFromTable
					-- Unit order list is here: https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Panorama/Javascript/API#dotaunitorder_t
					-- (Ignore the dotaunitorder_t. on each one)

					print("casting ability " .. EntIndexToHScript(unit.CastAbilityIndex):GetName())

					local order = {
						UnitIndex = unit:entindex(),
						AbilityIndex = unit.CastAbilityIndex,
						OrderType = DOTA_UNIT_ORDER_CAST_NO_TARGET,
						Queue = false
					}
					ExecuteOrderFromTable(order)
				end

				-- Generate the next time for the order
				unit.NextOrderTime = GameRules:GetGameTime() + math.random(5, 10)
			end
		end

		-- Make sure our testing map stays on day time
		if not GameRules:IsDaytime() then
			GameRules:SetTimeOfDay(0.26)
		end

	elseif GameRules:State_Get() >= DOTA_GAMERULES_STATE_POST_GAME then
		return nil
	end

	-- this return statement means that this thinker function will be called again in 1 second
	-- returning nil will cause the thinker to terminate and no longer be called
	return 1
end
```

## Завершение

Если вам нужно более продвинутое поведение, следует использовать сценарий AI. Однако метод, описанный в этом руководстве, можно до некоторой степени расширить, например, применение способности, нацеленной на землю, в случайной области будет возможно, используя только код, опубликованный здесь.

Полные файлы для этого примера можно найти здесь:
https://github.com/Wigguno/AITesting

Если у вас есть вопросы, [Telegram-канал ModdotaRU](https://t.me/+4wTdvuzBPzUxOTgy) всегда рад помочь.
