---
title: Пример физических способностей — экзорцизм
author: Noya
steamId: '76561198046984233'
date: 02.02.2015
---
р физических способностей — экзорцизм

Вот описание способности, которая порождает юнитов и перемещает их с вращением, используя [Physics library](https://github.com/bmddota/barebones/blob/source2/game/dota_addons/barebones/scripts/vscripts/physics.lua).

Конечный результат, пока нет врагов, к которым можно было бы пойти, будет таким:

<StaticVideo path="/videos/UniformLikableDavidstiger.mp4" />

Я включаю логическое значение Debug, которое можно включить для отображения пути и получения различных состояний:

<StaticVideo path="/videos/MeekPortlyCrocodileskink.mp4" />
Полные коды способности можно найти по следующим ссылкам [SpellLibrary](https://github.com/Pizzalol/SpellLibrary):

- [death_prophet_exorcism_datadriven](https://github.com/Pizzalol/SpellLibrary/blob/SpellLibrary/game/dota_addons/spelllibrary/scripts/npc/abilities/death_prophet_exorcism_datadriven.txt)

- [exorcism.lua](https://github.com/Pizzalol/SpellLibrary/blob/SpellLibrary/game/dota_addons/spelllibrary/scripts/vscripts/heroes/hero_death_prophet/exorcism.lua)

Весь файл Lua содержит комментарии для каждого решения, чтобы помочь понять и адаптировать этот навык к различным типам поведения.

---

Строки, связанные с физикой, я просто оставлю здесь, отдельное спасибо BMD за помощь на протяжении всего процесса переписывания этой способности.
Первый шаг — сделать каждую порожденную единицу физической единицей и применить свойства. <br />[Physics Readme](https://github.com/bmddota/barebones/blob/source2/PhysicsReadme.txt), чтобы узнать, что они делают.
```
lua
-- Make the spirit a physics unit
Physics:Unit(unit)

-- General properties
unit:PreventDI(true)
unit:SetAutoUnstuck(false)
unit:SetNavCollisionType(PHYSICS_NAV_NOTHING)
unit:FollowNavMesh(false)
unit:SetPhysicsVelocityMax(spirit_speed)
unit:SetPhysicsVelocity(spirit_speed * RandomVector(1))
unit:SetPhysicsFriction(0)
unit:Hibernate(false)
unit:SetGroundBehavior(PHYSICS_GROUND_LOCK)
```
После этого мы хотим контролировать поведение юнитов в каждом кадре, используя функцию OnPhysicsFrame.
```
lua
-- This is set to repeat on each frame
unit:OnPhysicsFrame(function(unit)

    -- Move the unit orientation to adjust the particle
    Unit:SetForwardVector( ( unit:GetPhysicsVelocity() ):Normalized() )

    -- Movement and Collision detection are state independent

    -- MOVEMENT
    -- Get the direction
    local diff = point - unit:GetAbsOrigin()
    diff.z = 0
    local direction = diff:Normalized()

    -- Calculate the angle difference
    local angle_difference = RotationDelta(VectorToAngles(unit:GetPhysicsVelocity():Normalized()), VectorToAngles(direction)).y

    -- Set the new velocity
    if math.abs(angle_difference) < 5 then
    -- CLAMP
	local newVel = unit:GetPhysicsVelocity():Length() * direction
	unit:SetPhysicsVelocity(newVel)
    elseif angle_difference > 0 then
	local newVel = RotatePosition(Vector(0,0,0), QAngle(0,10,0), unit:GetPhysicsVelocity())
	unit:SetPhysicsVelocity(newVel)
    else
	local newVel = RotatePosition(Vector(0,0,0), QAngle(0,-10,0), unit:GetPhysicsVelocity())
	unit:SetPhysicsVelocity(newVel)
    end

    -- COLLISION CHECK
    local distance = (point - current_position):Length()
    local collision = distance < 50

    -- STATE DEPENDENT LOGIC
    -- Damage, Healing and Targeting are state dependent.
    -- Check the full script on SpellLibrary
```
Наконец, нужно остановить юниты, это очень просто:
```
lua
unit:SetPhysicsVelocity(Vector(0,0,0))
unit:OnPhysicsFrame(nil)
```

---

For a different logic, check [Locust Swarm](https://github.com/MNoya/DotaCraft/blob/master/scripts/vscripts/heroes/crypt_lord/locust_swarm.lua) from **[DotaCraft](https://github.com/MNoya/DotaCraft)** repository, it uses the same movement physics but has different acquire and return logic, to fit Warcraft 3 behavior.

<StaticVideo path="/videos/TartSlowAfricangroundhornbill.mp4" />
