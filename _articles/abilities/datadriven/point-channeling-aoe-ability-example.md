---
title: Пример способности AoE для точечного направления
author: Noya
steamId: '76561198046984233'
date: 27.01.2015
---
особности AoE для точечного направления

Здесь я объясню метод эффективного применения способностей этого типа на основе примера с землетрясением:

<StaticVideo path="/videos/CarefreeAridBantamrooster.mp4" />

Мы рассмотрим каждый важный раздел кода с комментариями, в том числе о том, как заставить частицы отображаться.

## Общее определение:
```
"far_seer_earthquake"
{
    "BaseClass"          "ability_datadriven"
    "AbilityTextureName" "far_seer_earthquake"
    "MaxLevel"           "1"
    "AbilityType"        "DOTA_ABILITY_TYPE_ULTIMATE"

    "AbilityBehavior"	"DOTA_ABILITY_BEHAVIOR_CHANNELLED | DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_AOE"
    "AbilityUnitTargetTeam"	"DOTA_UNIT_TARGET_TEAM_ENEMY"
    "AbilityUnitTargetType"	"DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC | DOTA_UNIT_TARGET_BUILDING"
    "AbilityUnitDamageType"	"DAMAGE_TYPE_MAGICAL"
    "AbilityCastAnimation"  "ACT_DOTA_SPAWN"

    "AbilityCastRange"   "1000"
    "AbilityCastPoint"   "0.5"
    "AbilityCooldown"    "90.0"

    "AbilityManaCost"    "150"
    "AbilityChannelTime" "25.0"

    "AOERadius"          "%radius"

//...
```
Target Team/Type и DamageType нужны только для отображения всплывающих подсказок.

`"AbilityChannelTime"` — обязательный атрибут, который определяет, сколько времени можно поддерживать заклинание.

Обратите внимание на `"AOERadius"`, который принимает в своем значении `"%radius"` изabilityValues. «AOERadius» требует `"DOTA_ABILITY_BEHAVIOR_AOE"` для отображения круга AoE.

---

## Специальный блок способностей
```
"AbilityValues"
{
  "duration" "25.0"
  "building_damage_per_sec" "50"
  "radius" "250"
  "movement_speed_slow_pct" "-75"
  "wave_interval" "1.0"
}
```
Ничего интересного, кроме замечания о том, что `"%duration"` **нельзя** использовать в качестве значения для `"AbilityChannelTime"` (это приведет к бесконечному циклу), поэтому эта возможность будет просто ссылаться на продолжительность, а при изменении значения также изменится время канала.

---

## Блок прекэширования
```
"precache"
{
  "particle"	"particles/units/heroes/hero_leshrac/leshrac_split_earth.vpcf"
  "particle"	"particles/units/heroes/hero_warlock/warlock_rain_of_chaos_explosion.vpcf"
  "particle"	"particles/units/heroes/hero_earthshaker/temp_eruption_dirt.vpcf"
  "particle"	"particles/dire_fx/dire_lava_falling_rocks.vpcf"
  "particle"	"particles/units/heroes/hero_earthshaker/earthshaker_echoslam_start_fallback_mid.vpcf"
  "particle" "particles/econ/items/earthshaker/egteam_set/hero_earthshaker_egset/earthshaker_echoslam_start_egset.vpcf"
  "soundfile"	"soundevents/game_sounds_heroes/game_sounds_leshrac.vsndevts"
}
```
Загружены все использованные частицы и звуковой файл Leshrac.

Пути были скопированы непосредственно из браузера активов, немодифицированные частицы. Я объясню каждое из его дополнений, когда мы до них доберемся.

---

## Начало заклинания

Когда приведение точки завершено, выполните следующие действия:
```
"OnSpellStart"
{
    "RunScript"
    {
        "ScriptFile"	"heroes/far_seer/earthquake.lua"
        "Function"   "EarthquakeStart"
        "Target"     "POINT"
    }

//...
```
Это вызывает очень простой сценарий Lua, который создает фиктивную единицу для применения модификатора мыслителя, который выполняет «волны».

При использовании `"AbilityBehavior" "DOTA_ABILITY_BEHAVIOR_POINT"` вы можете передать целевую POINT в качестве дополнительного параметра функции (он не будет передан автоматически, как CASTER или TARGET). Доступ к нему можно получить как **target_points[1]**.
на мероприятии.

**Луа**
```
lua
function EarthquakeStart( event )
    -- Variables
    local caster = event.caster
    local point = event.target_points[1]

    caster.earthquake_dummy = CreateUnitByName("dummy_unit", point, false, caster, caster, caster:GetTeam())
    event.ability:ApplyDataDrivenModifier(caster, caster.earthquake_dummy, "modifier_earthquake_thinker", nil)
end
```
Существует функция Datadriven, которая делает что-то подобное, **"CreateThinker"**, но поскольку нам нужно остановить способность от создания волн, если герой перестает использовать способность, лучше, чтобы манекен был "индексирован" в _caster handle_, чтобы мы могли запустить другой скрипт для его удаления без необходимости его поиска.

Возвращаясь к фиктивной единице, вот ее определение:
```
"dummy_unit_vulnerable"
{
    "BaseClass"            "npc_dota_creature"
    "AttackCapabilities"   "DOTA_UNIT_CAP_NO_ATTACK"
    "VisionDaytimeRange"   "0"
    "VisionNighttimeRange"	"0"
    "UnitRelationshipClass"	"DOTA_NPC_UNIT_RELATIONSHIP_TYPE_WARD"
    "MovementCapabilities"	"DOTA_UNIT_CAP_MOVE_NONE"
    "Ability1"             "dummy_passive_vulnerable"
}
```
И пассивная способность:
```
"dummy_passive_vulnerable"
{
    "BaseClass"       "ability_datadriven"
    "AbilityBehavior" "DOTA_ABILITY_BEHAVIOR_PASSIVE"
    "Modifiers"
    {
        "dummy_modifier"
        {
            "Passive" "1"
            "States"
            {
                "MODIFIER_STATE_NO_UNIT_COLLISION"  "MODIFIER_STATE_VALUE_ENABLED"
                "MODIFIER_STATE_NO_TEAM_MOVE_TO"    "MODIFIER_STATE_VALUE_ENABLED"
                "MODIFIER_STATE_NO_TEAM_SELECT"     "MODIFIER_STATE_VALUE_ENABLED"
                "MODIFIER_STATE_COMMAND_RESTRICTED" "MODIFIER_STATE_VALUE_ENABLED"
                "MODIFIER_STATE_ATTACK_IMMUNE"      "MODIFIER_STATE_VALUE_ENABLED"
                "MODIFIER_STATE_MAGIC_IMMUNE"       "MODIFIER_STATE_VALUE_ENABLED"
                "MODIFIER_STATE_NOT_ON_MINIMAP"     "MODIFIER_STATE_VALUE_ENABLED"
                "MODIFIER_STATE_UNSELECTABLE"       "MODIFIER_STATE_VALUE_ENABLED"
                "MODIFIER_STATE_NO_HEALTH_BAR"      "MODIFIER_STATE_VALUE_ENABLED"
            }
        }
    }
}
```

::: warning
The dummy doesn't have `MODIFIER_STATE_INVULNERABLE` enabled, because that state is problematic — it usually prevents applying modifiers even if they have `MODIFIER_ATTRIBUTE_IGNORE_INVULNERABLE`. That's why it's called `_vulnerable` even though it can't take damage.
:::

---

Back to the OnSpellStart, 2 more actions:

```
"OnSpellStart"
{   //...

    "DestroyTrees"
    {
        "Target" "POINT"
        "Radius"	"%radius"
    }

    "DelayedAction"
    {
        "Delay" "0.5"
        "Action"
        {
            "ApplyModifier"
            {
                "ModifierName"	"modifier_earthquake_channelling"
                "Target" "CASTER"
            }
        }
    }
 }
```
Первое действие уничтожит деревья вокруг целевой ТОЧКИ, а второе действие применит модификатор, который отвечает за анимацию направления, используя тот же метод, который описан в [Channeling Animations Tutorial](/abilities/datadriven/channeling-animations).

Анимация должна запускаться на полсекунды позже, чтобы синхронизироваться с уроном, это вопрос экспериментов с таймфреймами.

---

## Завершение канала

Когда способность завершает произнесение либо потому, что время произнесения закончилось, либо из-за того, что оно было отменено, нам нужно остановить анимацию и фиктивный мыслитель:
```
"OnChannelFinish"
{
    "RunScript"
    {
        "ScriptFile"	"heroes/far_seer/earthquake.lua"
        "Function"   "EarthquakeEnd"
    }

    "RemoveModifier"
    {
        "ModifierName"	"modifier_earthquake_channelling"
        "Target"       "CASTER"
    }
}
```
Вторая функция lua еще короче, имеет только один вызов API для мгновенного удаления пустышки:
```
lua
function EarthquakeEnd( event )
    local caster = event.caster

    caster.earthquake_dummy:RemoveSelf()
end
```

---

## Modifiers

Now let's move to the Modifiers block, the first couple handles the animation:

```
"Modifiers"
{
    "modifier_earthquake_channelling"
    {
        "IsHidden"          "1"
        "ThinkInterval"     "1.0"
        "OverrideAnimation" "ACT_DOTA_KINETIC_FIELD"
        "OnIntervalThink"
        {
            "ApplyModifier"
            {
                "ModifierName"	"modifier_channeling"
                "Target"       "CASTER"
                "Duration"     "0.9"
            }
        }
    }

    "modifier_channeling"
    {
        "IsHidden"          "1"
        "OverrideAnimation" "ACT_DOTA_KINETIC_FIELD"
    }

//...
```
«modifier_earthquake_thinker» — это модификатор, применяемый в Lua к манекену, и он содержит основную логику для всех необходимых повреждений, частиц, звуков и других эффектов. В нем много действий, поэтому я разобью его на части.
```
"modifier_earthquake_thinker"
{
    "Aura"        "modifier_eartquake_slow"
    "Aura_Radius" "%radius"
    "Aura_Teams"  "DOTA_UNIT_TARGET_TEAM_ENEMY"
    "Aura_Types"  "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC"

//...
```
Это постоянно применяет еще один модификатор ко всем юнитам в радиусе целевой точки, в этой способности это простой эффект замедления:
```
"modifier_eartquake_slow"
{
   "IsDebuff"	"1"
   "Properties"
   {
       "MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE" "%movement_speed_slow_pct"
   }
}
```

---

Back to the "modifier_earthquake_thinker", we have to have actions on 2 instances: When the modifier is created, and then on each wave interval.

## Main modifier created

```
"OnCreated"
{
    "FireSound"
    {
        "EffectName"	"Hero_Leshrac.Split_Earth"
        "Target"     "TARGET"
    }

    // Many simple particle attachments:
    "AttachEffect"
    {
        "EffectName" "particles/econ/items/earthshaker/egteam_set/hero_earthshaker_egset/earthshaker_echoslam_start_egset.vpcf"
        "EffectAttachType" "follow_origin"
        "Target"           "TARGET"
    }

    "AttachEffect"
    {
        "Target"	"TARGET"
        "EffectAttachType" "follow_origin"
        "EffectName"	"particles/dire_fx/dire_lava_falling_rocks.vpcf"
    }

    "AttachEffect"
    {
        "Target"	"TARGET"
        "EffectAttachType" "follow_origin"
        "EffectName"	"particles/units/heroes/hero_leshrac/leshrac_pulse_nova.vpcf"
    }

//...
```
«ЦЕЛЬ» во всей этой области будет относиться к отряду, имеющему модификатор, то есть к манекену.

Я использовал одну дополнительную частицу, для которой контрольная точка 1 должна быть прикреплена к цели, иначе она будет отображаться в центре карты.
```
    "AttachEffect"
    {
        "Target"           "TARGET"
        "EffectAttachType" "follow_origin"
        "EffectName"       "particles/units/heroes/hero_earth_spirit/espirit_spawn.vpcf"
        "ControlPointEntities"
        {
            "TARGET"	"attach_origin"
            "TARGET"	"attach_origin"
        }
    }
```
«ControlPointEntities» установит CP0 в начало координат манекена и сделает то же самое для CP1.

Чтобы понять, что необходимо установить CP1, иначе частица не будет отображаться должным образом, выполните следующую процедуру:

1. Откройте систему частиц в редакторе частиц, дважды щелкнув по ней (нужны **декомпилированные частицы**!)

2. Выберите контрольную точку №1 в списке контрольных точек:

3. Удерживайте и перетащите контрольную точку в другое место, нажав на синий прямоугольник:
![img](/images/external/f61MV-9d913ef133.jpg)

4. Обратите внимание, что вместе с контрольной точкой переместилось немного пыли.

**Это означает, что вам необходимо его установить!** В противном случае он останется непривязанным и будет находиться в позиции (0,0,0) на карте.

---

## Действия основного модификатора волнового интервала

Все еще следите за этим? Отлично, он почти закончен, не хватает только действий `"OnIntervalThink"`, которые наносят урон +эффекты каждый `"wave_interval"`
```
"ThinkInterval" "%wave_interval"
"OnIntervalThink"
{
    "Damage"
    {
        "Target"
        {
            "Center" "TARGET"
            "Radius" "%radius"
            "Teams"  "DOTA_UNIT_TARGET_TEAM_BOTH"
            "Types"  "DOTA_UNIT_TARGET_BUILDING"
        }
        "Type"   "DAMAGE_TYPE_MAGICAL"
        "Damage"	"%building_damage_per_sec"
    }

    "FireSound"
    {
        "EffectName"  "Hero_Leshrac.Split_Earth"
        "Target"      "TARGET"
    }

    // Simple particle attachment
    "FireEffect"
    {
        "EffectName"       "particles/units/heroes/hero_warlock/warlock_rain_of_chaos_explosion.vpcf"
        "EffectAttachType" "follow_origin"
        "Target"           "TARGET"
    }
    "FireEffect"
    {
        "EffectName"       "particles/units/heroes/hero_earthshaker/temp_eruption_dirt.vpcf"
        "EffectAttachType" "follow_origin"
        "Target"           "TARGET"
    }
//...
```
Есть несколько конкретных случаев запуска частиц, которые требуют отдельного объяснения:

Чтобы узнать, что делает каждая контрольная точка, следуйте тому же методу, что и в случае с espirit_spawn.vpcf, но, зная, что эти частицы были разработаны для эффектов AoE, вам следует вместо этого написать числа радиуса-диапазона на контрольных точках и увидеть эффект в редакторе частиц.
```
    "AttachEffect"
    {
        "Target"           "TARGET"
        "EffectAttachType" "follow_origin"
        "EffectName"       "particles/units/heroes/hero_leshrac/leshrac_split_earth.vpcf"
        "ControlPoints"
        {
            "01"	"%radius 50 50"
        }
    }

    "AttachEffect"
    {
        "Target"           "TARGET"
        "EffectAttachType" "follow_origin"
        "EffectName"       "particles/units/heroes/hero_leshrac/leshrac_pulse_nova.vpcf"
        "ControlPoints"
        {
           "01"	"%radius 0 %radius"
        }
    }

    "AttachEffect"
    {
        "Target"           "TARGET"
        "EffectAttachType" "follow_origin"
        "EffectName" "particles/units/heroes/hero_earthshaker/earthshaker_echoslam_start_fallback_mid.vpcf"
        "ControlPoints"
        {
            "01"	"1 0 0"
        }
    }
}
```
Не буду врать, это в основном метод проб и ошибок и просто чтение информации о ПЭТ, которая может вас просветить:

---

---

## Полный код можно найти по следующим ссылкам:

## [DataDriven](https://github.com/MNoya/DotaCraft/blob/master/game/dota_addons/dotacraft/scripts/npc/abilities/heroes/far_seer_earthquake.txt)
## [Lua](https://github.com/MNoya/DotaCraft/blob/master/scripts/vscripts/heroes/far_seer/earthquake.lua)

- Дополнительные примеры этого стиля способностей см. в разделе:
  - [Blizzard](https://github.com/MNoya/DotaCraft/blob/master/scripts/npc/abilities/archmage_blizzard.txt)
  - [Rain of Fire](https://github.com/MNoya/DotaCraft/blob/master/scripts/npc/abilities/pit_lord_rain_of_fire.txt)
  - [Tornado](https://github.com/MNoya/DotaCraft/blob/master/scripts/npc/abilities/naga_sea_witch_tornado.txt)

---

Если вы найдете способ улучшить этот метод или у вас возникнут какие-либо вопросы, не стесняйтесь внести свой вклад в эту статью.