---
title: Прикрепление частиц
author: Noya
steamId: '76561198046984233'
date: 13.01.2015
---

# Прикрепление частиц

## Типы частиц

Каждая система частиц в Доте предназначена для определенной цели, например:

- Эффект баффа/дебаффа или окружения
- Взрывы и другие эффекты, ограниченные по времени.
- Круговые индикаторы AoE
- Линейные индикаторы
- Снаряды (линейные или отслеживающие)
- Другие

Пытаясь использовать некоторые из доступных частиц, имейте в виду, каково было их первоначальное поведение.

Например, если вы попытаетесь использовать частицу снаряда в качестве баффа или взрыв в качестве снаряда, вы получите катастрофический эффект или вообще не получите никакого эффекта.

Вы можете просматривать частицы в браузере активов. Для фильтрации просто напишите ключевые слова, например «частица» или `.vpcf`.

Также каждый раз, когда вы используете частицу, не забывайте добавлять ее в блок предварительного кэширования, управляемый данными, для возможности:
```
"precache"
{
    "particle"  "particles/units/heroes/hero_magnataur/magnataur_shockwave.vpcf"
}
```
В противном случае вы не увидите их, если они изначально не принадлежали герою, который их применяет.

## Родители и дети

Родительская частица обозначается буквой P в браузере ресурсов.

![img](/images/external/esM9P-998defaf12.jpg)

Обычно вы хотите использовать Parent, потому что он покажет полный эффект частиц. Детей труднее отображать, и они могут отображаться неправильно.
![img](/images/external/esz6V-b4912e2ca5.png)

Скопируйте весь этот путь для имя_частицы.

## Вложения

Частицы должны быть прикреплены к какому-то месту объекта, чтобы начать свое поведение.
Это может быть так же просто, как одна строка `"Target" "TARGET"`, или содержать множество странных точек подключения, которые вам придется обнаружить путем многочисленных попыток проб и ошибок.

Ниже приведен список всех типов прикреплений в порядке важности/релевантности.

| Константа | Строка | Описание вложения |
| ------------------------------- | ---------------------------- | ---------------------------------------------------------------------- |
| PATTACH_ABSORIGIN_FOLLOW | следовать_происхождение | Следит за движением цели в исходном положении |
| PATTACH_OVERHEAD_FOLLOW | следовать_накладные расходы | Следит за движением цели над головой |
| ПАТТАЧ_АБСОРИГИН | Attach_origin | Начинается в начале цели и остается там |
| PATTACH_POINT | Attach_hitloc | Обычно тело модели, куда попадают атакующие снаряды |
| PATTACH_POINT_FOLLOW | следовать_hitloc | Следит за телом |
| ПАТТАЧ_CUSTOMORIGIN | start_at_customorigin | Включает привязку к пользовательскому источнику |
| PATTACH_CUSTOMORIGIN_FOLLOW | Follow_customorigin | Следите за движением пользовательского исходного набора |
| PATTACH_WORLDORIGIN | мир_происхождение | Нацеливается на объект Point в мире, используйте с ключом «TargetPoint» |
| PATTACH_EYES_FOLLOW | следовать_глазам | Заполняет экран и используется для индикатора оглушения или выпадения тайны.   |
| PATTACH_POINT_FOLLOW_SUBSTEPPED | Follow_attachment_substepped |
| PATTACH_RENDERORIGIN_FOLLOW | Follow_renderorigin |
| PATTACH_ROOTBONE_FOLLOW | следовать_rootbone |
| Прикрепить к определенной кости | Attach_attack1 | Вы можете проверить это, открыв файл VMDL героя в редакторе моделей. |
| - | start_at_origin |
| - | start_at_attachment |
| - | следовать_прикреплению |

По сути, движок попытается найти «кость» или точку присоединения и тип используемой константы/строки.
если она есть в модели и частица спроектирована так, чтобы правильно прикрепляться к этой точке, вы получите хорошее поведение.

Много раз при работе со сложными системами частиц вы сталкивались с такими ошибками, как:

- Дети-частицы отображаются в векторе (0,0,0).
  - Это то, что обычно происходит, когда вы пропускаете контрольную точку (объясняется позже).
- Эффект появляется в другом положении, чем ожидалось.
  - Неправильное прикрепление или частица не может прикрепить это место.

## Контрольные точки

Контрольные точки — это значения x,y,z, которые используются для установки частицы в местоположение целевого объекта или вектора для радиуса, цвета, продолжительности, скорости и т. д.

Их легче понять на примерах, поэтому мы пройдемся по некоторым базовым частицам, которым не нужны определенные контрольные точки, а затем рассмотрим те, которым они нужны для правильного отображения.

### Декомпилированные частицы
В Reborn теперь частицы Dota по умолчанию можно открывать непосредственно в редакторе частиц и делать их копии. Подробнее об этом читайте на вики в [Particle Copy Tool](https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Particle_Copy_Tool).

## Примеры

### 1. Простые усиливающие частицы, управляемые данными

Этот тип частиц легче всего прикрепить. Они привязаны к модификатору и автоматически прекращают работу после уничтожения модификатора.

Для этого также продолжительность системы частиц обычно должна быть бесконечной, спроектированной как простой бафф, внутри они имеют единственную контрольную точку, которая устанавливается с помощью ключа `EffectAttachType`.

**Пример**
```
"modifier_borrowed_time"
{
    "EffectName" "particles/units/heroes/hero_abaddon/abaddon_borrowed_time.vpcf"
    "EffectAttachType" "follow_origin"

    "StatusEffectName" "particles/status_fx/status_effect_abaddon_borrowed_time.vpcf"
    "StatusEffectPriority" "15"
}
```
Эффекты статуса — это особый тип частиц, который обычно применяется для изменения цвета текстуры героя, например, для иллюзий, призраков и т. д.

### 2. Базовое крепление

Если вы хотите, чтобы к модификатору было прикреплено более одной частицы или частице нужны дополнительные контрольные точки, вам нужно сделать это в блоке `"FireEffect"` или `"AttachEffect"`.
```
"modifier_stampede"
{
    "OnCreated"
    {
        "AttachEffect"
        {
            "EffectName" "particles/units/heroes/hero_centaur/centaur_stampede_overhead.vpcf"
            "EffectAttachType" "follow_overhead"
            "Target" "TARGET"
        }
    }
}
`
```
"Target"` использует те же целевые правила, что и любой блок, управляемый данными.

### 3. Контрольные точки

Если процедура простого присоединения не удалась, это означает, что частица имеет контрольные точки для управления определенными свойствами, такими как радиус, положение нескольких элементов, цвет и т. д.

Чтобы узнать, чем управляет каждый CP, вам нужно открыть частицу в Редакторе частиц. Теперь вы сможете дважды щелкнуть любую из скопированных частиц в браузере активов и попытаться понять, как установить каждый CP.

Контрольные точки могут быть установлены либо в управляемом данными `"AttachEffect"`, либо в lua.
Преимущество выполнения этого в Lua заключается в том, что вы можете динамически перезагружать контрольные точки, выполнив script_reload после изменения кода.

#### 3.1 Прикрепление частиц Lua с помощью `SetParticleControl`

**Пример**
```
lua
local particle = ParticleManager:CreateParticle("particles/units/heroes/hero_omniknight/omniknight_purification.vpcf", PATTACH_ABSORIGIN_FOLLOW, target)
ParticleManager:SetParticleControl(particle, 0, target:GetAbsOrigin())
ParticleManager:SetParticleControl(particle, 1, Vector(particle_radius,0,0))
```
CP0 на самом деле не нужен (поскольку этот тип присоединения уже заставляет частицу следовать за AbsOrigin), но его приятно иметь.

CP1.x управляет радиусом частицы, как это видно в редакторе частиц после игры со значениями.

![img](/images/external/esEVP-9c852a02ca.png)

Наведение курсора на кнопку сообщает нам, что это «Положение вдоль кольца».

**Пример**
```
lua
local target = event.unit
local player = PlayerResource:GetPlayer( caster:GetPlayerID() )
local particleName = "particles/units/heroes/hero_alchemist/alchemist_lasthit_coins.vpcf"
local particle = ParticleManager:CreateParticleForPlayer( particleName, PATTACH_ABSORIGIN, target, player )
ParticleManager:SetParticleControl( particle, 0, target:GetAbsOrigin() )
ParticleManager:SetParticleControl( particle, 1, target:GetAbsOrigin() )
```
В данном конкретном случае мы используем `CreateParticleForPlayer`, чтобы отображать его только одному конкретному игроку. Также можно использовать PATTACH_OVERHEAD_FOLLOW.

#### 3.2 Блок `"ControlPoints"`, управляемый данными

То же самое можно перевести в datadriven, за исключением случаев, когда вам нужно, чтобы контрольные точки определялись во время выполнения (например, выполнение радиуса \* какой-либо переменной)
```
"FireEffect"
{
    "Target" "TARGET"
    "EffectName" "particles/units/heroes/hero_omniknight/omniknight_purification.vpcf"
    "EffectAttachType" "follow_origin"

    "ControlPoints"
    {
        "00" "0 0 0"
        "01" "%radius %radius %radius"
    }
}
```
Имейте в виду, что действие `"FireEffect"` или `"AttachEffect"` может находиться внутри любого события способности или модификатора, а не только в событиях модификатора `"OnCreated"` / `"OnDestroy"`.

**Пример:**
```
"OnSpellStart"
{
    "FireEffect"
    {
        "EffectName"       "particles/units/heroes/hero_lina/lina_spell_light_strike_array_ray_team.vpcf"
        "EffectAttachType" "start_at_customorigin"
        "TargetPoint"      "POINT" //This also works with world_origin

        "ControlPoints"
        {
            "01" "%light_strike_array_aoe 0 0"
            "03" "0 0 0"
        }
    }
}
```

### 4. Объекты контрольной точки

Иногда точки присоединения частиц могут стать еще более сложными, когда их необходимо прикрепить к определенным местам или объектам.
Если ваше вложение не работает с простым методом Lua, вам нужно попробовать следующий уровень настройки контрольной точки, **Сущности контрольной точки**, либо в Lua, либо в Keyvalues.

#### 4.1 Луа `SetParticleControlEnt`

**Пример**: Это правильное вложение Lua для частицы афотического щита Абаддона:
```
lua
target.ShieldParticle = ParticleManager:CreateParticle("particles/units/heroes/hero_abaddon/abaddon_aphotic_shield.vpcf", PATTACH_ABSORIGIN_FOLLOW, target)
ParticleManager:SetParticleControl(target.ShieldParticle, 1, Vector(shield_size,0,shield_size))
ParticleManager:SetParticleControl(target.ShieldParticle, 2, Vector(shield_size,0,shield_size))
ParticleManager:SetParticleControl(target.ShieldParticle, 4, Vector(shield_size,0,shield_size))
ParticleManager:SetParticleControl(target.ShieldParticle, 5, Vector(shield_size,0,0))

ParticleManager:SetParticleControlEnt(target.ShieldParticle, 0, target, PATTACH_POINT_FOLLOW, "attach_hitloc", target:GetAbsOrigin(), true)
```
В этом случае PATTACH_POINT_FOLLOW помещает частицу в тело цели. PATTACH_ABSORIGIN_FOLLOW поместит его у ног, а PATTACH_OVERHEAD_FOLLOW — у его головы.

Обратите внимание, что частица определена под дескриптором `target.`. Это потому, что нам нужно будет уничтожить ее позже в Lua, потому что прикрепление частицы таким образом
не остановит эффект частицы сам по себе после уничтожения модификатора, поскольку мы просто привязываем частицу к цели.
Это не проблема, если частица предназначена для кратковременного действия (в отличие от частиц баффа, которые сохраняются навсегда, пока не будут удалены).

#### 4.2 DataDriven `"ControlPointEntities"`

Это работает путем установки каждого CP в соответствии с его ключом. Если вам нужно установить CP8 в положение Targets, вам **нужно** 8 строк «TARGET» (или «CASTER» или что-то еще).
**Пример**
```
"modifier_aphotic_shield"
{
    "OnDestroy"
    {
        "AttachEffect"
        {
             "EffectName" "particles/units/heroes/hero_abaddon/abaddon_aphotic_shield_explosion.vpcf"
             "EffectAttachType" "follow_origin"
             "Target" "UNIT"
             "ControlPointEntities"
            {
                "TARGET" "attach_origin"
                "TARGET" "attach_origin"
            }
        }
    }
}
```
**Пример 2**
```
"modifier_return"
{
    "Passive" "1"
    "OnAttacked"
    {
        "RunScript"
        {
            "ScriptFile" "heroes/hero_centaur/return.lua"
            "Function" "Return"
        }
        "FireEffect"
        {
            "EffectName" "particles/units/heroes/hero_centaur/centaur_return.vpcf"
            "EffectAttachType" "attach_hitloc"
            "Target" "CASTER"
            "ControlPointEntities"
            {
                "CASTER" "attach_hitloc"
                "ATTACKER" "attach_hitloc"
            }
        }
    }
}
```
**Пример 3**
```
"OnProjectileHitUnit"
{
    "FireEffect"
    {
    "EffectName" "particles/units/heroes/hero_alchemist/alchemist_unstable_concoction_explosion.vpcf"
        "EffectAttachType" "attach_hitloc"
        "Target" "TARGET"
        "ControlPointEntities"
        {
            "TARGET" "attach_hitloc"
            "TARGET" "attach_hitloc"
            "TARGET" "attach_hitloc"
            "TARGET" "attach_hitloc"
        }
    }
}
```
**Пример 4**

Пользовательские кости!
```
"AttachEffect"
{
    "Target" "CASTER"
    "EffectName" "particles/units/heroes/hero_kunkka/kunkka_weapon_tidebringer.vpcf"
    "EffectAttachType" "start_at_customorigin"
    "ControlPointEntities"
    {
        "CASTER" "attach_sword"
        "CASTER" "attach_sword"
        "CASTER" "attach_sword"
    }
}
```
ControlPointEntities — самый сложный метод прикрепления частиц. Используйте его с осторожностью и гордостью.

### 5. Остановка частицы Lua

Если сущность умирает, она обычно уничтожает частицу.

Чтобы остановить что-то вроде того, что мы создали в примере с Aphotic Shield, добавьте модификатор `"OnDestroy"` с помощью RunScript, который вызывает что-то вроде этого:
```
lua
function EndShieldParticle( event )
    local target = event.target
    target:EmitSound("Hero_Abaddon.AphoticShield.Destroy")
    ParticleManager:DestroyParticle(target.ShieldParticle,false)
end
```
Если частица имеет фиксированную продолжительность, вы также можете легко использовать таймеры BMD:
```
lua
Timers:CreateTimer(duration, function()
    ParticleManager:DestroyParticle(particle,false))
end)
```

### 6. Разница между «FireEffect» и «AttachEffect»

При использовании внутри модификатора _AttachEffect_ автоматически останавливает частицу после уничтожения модификатора, а _FireEffect_ этого не делает (если длительность частицы бесконечна).

В этом смысле FireEffect во многом аналогичен выполнению lua `ParticleManager:CreateParticle`.

Таким образом, если вы используете FireEffect с частицей бесконечной продолжительности внутри модификатора, она все равно будет жить после окончания действия модификатора.

Если длительность частицы небольшая, использование любого из двух действий «Эффект» приведет к тем же результатам.
### 7. Частицы-снаряды

Существует два типа частиц-снарядов: линейные и следящие.

Линейные следуют по прямой и сталкиваются со всем на своем пути.
Используйте `"DeleteOnHit" "0"` внутри события способности `"OnProjectileHitUnit"`, если вы хотите, чтобы они продолжали подниматься на фиксированное расстояние.

Отслеживание может изгибаться и следовать за движением цели. Каждая частица дальней атаки относится к этому типу.

#### Линейный снаряд

**Пример управления данными**

```
"LinearProjectile"
{
    "Target" "POINT"
    "EffectName" "particles/units/heroes/hero_nyx_assassin/nyx_assassin_impale.vpcf"
    "StartRadius" "%width"
    "EndRadius" "%width"
    "MoveSpeed" "%speed"
    "TargetTeams" "DOTA_UNIT_TARGET_TEAM_ENEMY"
    "TargetTypes" "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC"
    "TargetFlags" "DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES"
    "FixedDistance" "%length"
    "ProvidesVision" "0"
    "HasFrontalCone" "0"
}
```
**Пример Lua**
```
lua
--[[
    Author: kritth
    Date: 10.01.2015
    Start traversing the ship
]]
function ghostship_start_traverse( keys )
  local ability = keys.ability
  local casterPoint = caster:GetAbsOrigin()
  local targetPoint = keys.target_points[1]
  local spawnDistance = ability:GetLevelSpecialValueFor( "ghostship_distance", ability:GetLevel() - 1 )
  local projectileSpeed = ability:GetLevelSpecialValueFor( "ghostship_speed", ability:GetLevel() - 1 )
  local radius = ability:GetLevelSpecialValueFor( "ghostship_width", ability:GetLevel() - 1 )

    -- Get necessary vectors
    local forwardVec = targetPoint - casterPoint
            forwardVec = forwardVec:Normalized()
    local backwardVec = casterPoint - targetPoint
            backwardVec = backwardVec:Normalized()
    local spawnPoint = casterPoint + ( spawnDistance * backwardVec )
    local impactPoint = casterPoint + ( spawnDistance * forwardVec )
    local velocityVec = Vector( forwardVec.x, forwardVec.y, 0 )

    -- Spawn projectile
    local projectileTable = {
        Ability = ability,
        EffectName = "particles/units/heroes/hero_kunkka/kunkka_ghost_ship.vpcf",
        vSpawnOrigin = spawnPoint,
        fDistance = spawnDistance * 2,
        fStartRadius = radius,
        fEndRadius = radius,
        fExpireTime = GameRules:GetGameTime() + 5,
        Source = caster,
        bHasFrontalCone = false,
        bReplaceExisting = false,
        bProvidesVision = false,
        iUnitTargetTeam = targetBuffTeam,
        iUnitTargetType = targetType,
        vVelocity = velocityVec * projectileSpeed
    }
    ProjectileManager:CreateLinearProjectile( projectileTable )

end
```

#### Отслеживающий снаряд

**Пример управления данными**
```
"TrackingProjectile"
{
    "Target" "TARGET"
    "EffectName" "particles/units/heroes/hero_alchemist/alchemist_unstable_concoction_projectile.vpcf"
    "Dodgeable" "0"
    "ProvidesVision" "1"
    "VisionRadius" "%vision_range"
    "MoveSpeed" "%movement_speed"
    "SourceAttachment" "DOTA_PROJECTILE_ATTACHMENT_ATTACK_1"
}
```
**Пример Lua**
```
lua
local projectile_speed = ability:GetSpecialValueFor( "projectile_speed" )
local particle_name = "particles/units/heroes/hero_abaddon/abaddon_death_coil.vpcf"

-- Create the projectile
    local info = {
        Target = target,
        Source = caster,
        Ability = ability,
        EffectName = particle_name,
        bDodgeable = false,
        bProvidesVision = true,
        iMoveSpeed = projectile_speed,
        iVisionRadius = 0,
        iVisionTeamNumber = caster:GetTeamNumber(),
        iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_ATTACK_1
    }
    ProjectileManager:CreateTrackingProjectile( info )
```
<br />

::: информация
Обычно вы не можете использовать частицу, предназначенную для линейного действия, в действии отслеживания и наоборот.
:::

Возможно, вам удастся имитировать линейное поведение с помощью следящего снаряда, если вы сделаете так, чтобы отслеживать манекен, который не может двигаться, но вам понадобится еще один невидимый линейный снаряд для выполнения эффектов попадания.