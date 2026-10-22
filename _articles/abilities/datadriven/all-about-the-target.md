---
title: Все о цели
author: Noya
steamId: '76561198046984233'
date: 23.01.2015
---
.2015
---

# Все о цели

Первоначально это была статья, в которой собрана документация о целевом ключе, которая нигде не была хорошо документирована:

> «Цель» — это один хитрый ключ.

И все же, это, пожалуй, самый важный KV, который нужно понимать, поскольку он встречается почти в каждом действии, управляемом данными.

Наличие неправильного блока `"Target"` — это причина номер один, по которой приходится перезапускать игру, тестируя множество комбинаций, пока, наконец, не получите правильный контекст.

Цитируя [wiki](https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Scripting/Abilities_Data_Driven#Action_Target_Values) по этому поводу:

> Примечание. В разных событиях эти имена означают разные вещи. Возможно, потребуется некоторое экспериментирование, чтобы выяснить, что именно происходит в каждом конкретном случае.

В этой статье мы собираем все решения, связанные с Target.

Чтобы все протестировать и получить результаты, я использовал несколько простых скриптов, чтобы проверить, какие параметры видны в каждом контексте события. Сценарии KV и Lua приведены ниже вместе со всеми отладочными данными.

Проведя множество тестов с различным поведением способностей, я получил вот что:

## КОНТЕКСТЫ СОБЫТИЙ СПОСОБНОСТЕЙ

### Поведение: DOTA_ABILITY_BEHAVIOR_NO_TARGET
| Событие | Цель |
| ------------------- | ---------------------- |
| OnSpellStart | КАСТЕР, ЮНИТ, АТАКУЕР |
| OnAbilityPhaseStart | КАСТЕР, ЮНИТ, АТАКУЕР |

### DOTA_ABILITY_BEHAVIOR_UNIT_TARGET

Такое поведение добавляет TARGET в качестве возможного значения для ключа Target:

| Событие | Цель |
| ------------------- | ------------------------------ |
| OnSpellStart | КАСТЕР, ЦЕЛЬ, ЮНИТ, АТАКУЮЩИЙ |
| OnAbilityPhaseStart | КАСТЕР, ЦЕЛЬ, ЮНИТ, АТАКУЮЩИЙ |

###AbilityChannelTime > 0

Единственная цель `DOTA_ABILITY_BEHAVIOR_CHANNELLED` — изменить подсказку способности на _"Направляемую"_. На самом деле, `BEHAVIOR_CHANNELED` даже не нужен, `"AbilityChannelTime"` — это все, что имеет значение для реального поведения способностей.

| Событие | Цель |
| -------------------- | ------------------------------ |
| OnChannelFinish | КАСТЕР, ЦЕЛЬ, ЮНИТ, АТАКУЮЩИЙ |
| OnChannelInterrupted | КАСТЕР, ЦЕЛЬ, ЮНИТ, АТАКУЮЩИЙ |
| OnChannelУспешно | КАСТЕР, ЦЕЛЬ, ЮНИТ, АТАКУЮЩИЙ |

### С линейными и отслеживающими действиями снарядов

| Событие | Цель |
| ------------------- | -------------------------- |
| OnProjectileFinish | КАСТЕР, МИШЕНЬ, СНАРЯД |
| OnProjectileHitUnit | КАСТЕР, МИШЕНЬ, СНАРЯД |

### DOTA_ABILITY_BEHAVIOR_TOGGLE

| Событие | Цель |
| ----------- | ------ |
| Вкл.ToggleВыкл. | КАСТЕР |
| OnToggleOn | КАСТЕР |

### Подбор и выдача предметов

| Событие | Цель |
| --------- | ------ |
| ОнЭкип | КАСТЕР |
| OnUnequip | КАСТЕР |

### Любое поведение
| Событие | Цель |
| -------------- | ------ |
| OnOwnerDied | КАСТЕР |
| OnOwnerSpawned | КАСТЕР |
| При обновлении | КАСТЕР |

## КОНТЕКСТЫ СОБЫТИЙ МОДИФИКАТОРА

### Цель-заклинатель

Цель всегда относится к владельцу модификатора.
| Событие | Цель |
| ----------------- | -------------- |
| При создании | КАСТЕР, ЦЕЛЬ |
| OnDestroy | КАСТЕР, ЦЕЛЬ |
| OnIntervalThink | КАСТЕР, ЦЕЛЬ |
| OnProjectileDodge | КАСТЕР, ЦЕЛЬ |

### Урон

В этих событиях мы можем отправить дополнительный параметр, называемый %attack_damage.

Обратите внимание, что это значение не взято из «AbilityValues», а генерируется системой для использования в очень конкретных событиях.
| Событие | Цель | Значение %attack_damage |
| ------------ | ---------------------- | -------------------- |
| OnTakeDamage | КАСТЕР, ЮНИТ, АТАКУЕР | сокращение постов |
| OnDealDamage | КАСТЕР, ЮНИТ, АТАКУЕР | сокращение постов |

### Атаки

В некоторых событиях атаки мы также можем использовать %attack_damage.

| Событие | Цель | Значение %attack_damage |
| -------------- | ------------------------ | ------------------------------------------- |
| НаАтаке | КАСТЕР, ЦЕЛЬ, АТАКУЕР | 0 |
| OnAttackStart | КАСТЕР, ЦЕЛЬ, АТАКУЕР | 0 |
| OnAttackAllied | КАСТЕР, ЦЕЛЬ, АТАКУЕР | 0 |
| OnAttacked | КАСТЕР, ЦЕЛЬ, АТАКУЕР | сокращение постов |
| OnAttackLanded | КАСТЕР, ЦЕЛЬ, АТАКУЕР | **до** снижения, реальная величина атаки |
| OnAttackFailed | КАСТЕР, ЦЕЛЬ, АТАКУЕР | **до** снижения, реальная величина атаки |

### Убийство

| Событие | Цель |
| ------------ | ------------------------ |
| О смерти | КАСТЕР, ЮНИТ, АТАКУЕР |
| При убийстве | КАСТЕР, ЮНИТ, АТАКУЕР |
| OnHeroKilled | КАСТЕР, ЦЕЛЬ, АТАКУЕР |

### Кастер

| Событие | Цель | Экстра |
| ------------------- | ------------ | --------------------------------------------- |
| OnAbilityEndChannel | КАСТЕР, БЛОК | TARGET, если способность не NO_TARGET |
| OnAbilityExecuted | КАСТЕР, БЛОК | TARGET, если способность не NO_TARGET |
| На заказ | КАСТЕР, БЛОК | ЦЕЛЬ, если Приказ представляет собой способность с целью |
| OnRespawn | КАСТЕР, БЛОК | нужны «Атрибуты» «ПОСТОЯННЫЕ» в модификаторе |
| OnManaGained | КАСТЕР, БЛОК |
| OnSpentMana | КАСТЕР, БЛОК |
| Онстатечанжед | КАСТЕР, БЛОК |
| О телепортации | КАСТЕР, БЛОК |
| OnTeleported | КАСТЕР, БЛОК |
| ОнUnitMoved | КАСТЕР, БЛОК |
| OnHealReceived | КАСТЕР, БЛОК |
| OnHealthGained | КАСТЕР, БЛОК |

### Никогда не срабатывает

OnAbilityStart — сломан?
## Необработанные данные

В этом разделе представлены необработанные данные, использованные для составления вышеизложенного.

Скрипты:

**КВ**
```
OnSomethingEvent
{
     "RunScript"
     {
         "ScriptFile"   "test.lua"
         "Function" "TargetTest"
         "EventName" "OnSomethingEvent"
     }
}
```
Полный сценарий проверки их всех в одном исполнении находится в [full test ability script](#full-test-ability-script) внизу этой статьи.

**Луа**
```
lua
function TargetTest( event )
    local caster = event.caster
    local target = event.target
    local unit = event.unit
    local attacker = event.attacker
    local ability = event.ability

    -- Tables
    local target_points = event.target_points
    local target_entities = event.target_entities

    -- Extra parameter
    local EventName = event.EventName
    local Damage = event.Damage

    print("**"..EventName.."**")
    print("~~~")
    if caster then print("CASTER: "..caster:GetUnitName()) end
    if target then print("TARGET: "..target:GetUnitName()) end
    if unit then print("UNIT: "..unit:GetUnitName()) end
    if attacker then print("ATTACKER: "..attacker:GetUnitName()) end
    if Damage then print("DAMAGE: "..Damage) end

    if target_points then
        for k,v in pairs(target_points) do
            print("POINT",k,v)
        end
    end

    -- Multiple Targets
    if target_entities then
        for k,v in pairs(target_entities) do
            print("TARGET "..k..": "..v:GetUnitName())
        end
    end

    --DeepPrintTable(event)
    print("~~~")
end
```
Будет выдавать консольные сообщения следующим образом:

**Начало фазы способности**
```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_abaddon
UNIT: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_alchemist
```**OnSpellStart**```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_abaddon
UNIT: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_alchemist
```
Результаты применения способностей с помощью [every Ability Event at the same time](#full-test-ability-script), Алхимик — наш заклинатель, Абаддон — вражеский герой.

## Контекст события способности

---

Любое поведение

**При обновлении**
```
CASTER: npc_dota_hero_alchemist
```

---

`DOTA_ABILITY_BEHAVIOR_NO_TARGET`

**OnAbilityPhaseStart**

```
CASTER: npc_dota_hero_alchemist
UNIT: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_alchemist
```**OnSpellStart**```
CASTER: npc_dota_hero_alchemist
UNIT: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_alchemist
```

---

`DOTA_ABILITY_BEHAVIOR_UNIT_TARGET`

**OnAbilityPhaseStart**

```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_abaddon
UNIT: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_alchemist
```**OnSpellStart**```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_abaddon
UNIT: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_alchemist
```

---

`DOTA_ABILITY_BEHAVIOR_UNIT_TARGET | DOTA_ABILITY_BEHAVIOR_CHANNELLED`

_Without an AbilityChannelTime value it will just do the OnSpellStart and OnAbilityPhaseStart, AbilityChannelTime is "0" by default._

In fact, the BEHAVIOR_CHANNELED isn't even needed, AbilityChannelTime is all that matters for the actual ability behavior while the BEHAVIOR_CHANNELED is just for tooltip.

`"AbilityChannelTime" "1.0"`

**Начало фазы способности**
```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_abaddon
UNIT: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_alchemist
```**OnSpellStart**```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_abaddon
UNIT: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_alchemist
```
Через 1 секунду отображается:

**По завершению канала**
```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_abaddon
UNIT: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_alchemist
```
**На канале выполнено**
```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_abaddon
UNIT: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_alchemist
```
Перемещение после начала произнесения заклинания приводит к:

**Начало фазы способности**
```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_abaddon
UNIT: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_alchemist
```**OnSpellStart**```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_abaddon
UNIT: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_alchemist
```
**По завершению канала**
```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_abaddon
UNIT: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_alchemist
```**OnChannelInterrupted**```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_abaddon
UNIT: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_alchemist
```

---

DOTA_ABILITY_BEHAVIOR_POINT

If you don't pass POINT to the RunScript, you'll get this:

**OnAbilityPhaseStart**

```
CASTER: npc_dota_hero_alchemist
UNIT: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_alchemist
```**OnSpellStart**```
CASTER: npc_dota_hero_alchemist
UNIT: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_alchemist
```
Если вы добавите UNIT_TARGET к поведению, это приведет к такому результату, но только тогда, когда вы нацеливаетесь на врага, а не на землю:

**Начало фазы способности**
```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_abaddon
UNIT: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_alchemist
```**OnSpellStart**```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_abaddon
UNIT: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_alchemist
```
Добавление `"Target" "POINT"` в RunScript дает нам целевую точку при переборе таблицы target_points.
```
"RunScript"
{
    "ScriptFile" "test.lua"
    "Function" "TargetTest"
    "EventName" "OnAbilityPhaseStart"
    "Target" "POINT"
}
```**OnSpellStart**```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_abaddon
UNIT: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_alchemist
POINT   1   Vector 000000000322E9D8 [-296.343750 -84.625000 128.000000]
```
На самом деле, для создания точечного объекта не обязательно должна быть способность поведения POINT.

---

СНАРЯД

К способности event_test в OnSpellStart добавлен линейный снаряд, DOTA_ABILITY_BEHAVIOR_UNIT_TARGET.
```
"LinearProjectile"
{
    "Target" "POINT"
    "EffectName"    "particles/units/heroes/hero_mirana/mirana_spell_arrow.vpcf"
    "MoveSpeed" "1000"
    "StartRadius"   "100"
    "StartPosition" "attach_attack1"
    "EndRadius" "100"
    "HasFrontalCone" "0"
    "FixedDistance" "1000"
    "TargetTeams"   "DOTA_UNIT_TARGET_TEAM_ENEMY"
    "TargetTypes"   "DOTA_UNIT_TARGET_BASIC | DOTA_UNIT_TARGET_HERO"
    "TargetFlags"   "DOTA_UNIT_TARGET_FLAG_NONE"
}
```
Запускает это действие, когда снаряд сталкивается с вражеским героем. Изменение линейного типа на отслеживание не меняет базовый таргетинг.

**OnProjectileHitUnit**
```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_abaddon
```
Если я выстрелю снарядом и он пролетит все фиксированное расстояние, это приведет к следующему:

**По завершению проекта**
```
CASTER: npc_dota_hero_alchemist
```
Прохождение Точки и мы получим ТОЧКУ 1

Теперь с помощью этого теста мы можем проверить, являются ли ТОЧКА и ПРОЕКТИЛЬ одним и тем же вектором:
```
"OnSpellStart"
{
    "RunScript"
    {
        "ScriptFile"  "test.lua"
        "Function"    "TargetTest"
        "EventName"   "OnSpellStart"
        "Target"      "POINT"
    }
}

"OnProjectileHitUnit"
{
    "DeleteOnHit"  "1"
    "RunScript"
    {
        "ScriptFile"  "test.lua"
        "Function"    "TargetTest"
        "EventName"   "OnProjectileHitUnitUnit"
        "Target"      "POINT"
    }

    "RunScript"
    {
        "ScriptFile"  "test.lua"
        "Function"    "TargetTest"
        "EventName"   "OnProjectileHitUnitProjectile"
        "Target"      "PROJECTILE"
    }
}
```
Результат после попадания пары единиц:

**OnSpellStart**
```
CASTER: npc_dota_hero_alchemist
UNIT: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_alchemist
POINT   1   Vector 0000000003255BA0 [-513.468750 -16.468750 128.000000]
```**OnProjectileHitUnitUnit**```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_neutral_kobold
POINT   1   Vector 0000000003244688 [-742.161560 22.603647 162.187149]
```**OnProjectileHitUnitProjectile**```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_neutral_kobold
POINT   1   Vector 000000000322FA00 [-742.161560 22.603647 162.187149]
```**OnProjectileHitUnitUnit**```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_neutral_kobold
POINT   1   Vector 000000000325CCC8 [-676.447083 11.376265 162.187149]
```**OnProjectileHitUnitProjectile**```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_neutral_kobold
POINT   1   Vector 000000000326CDA8 [-676.447083 11.376265 162.187149]
```**OnProjectileFinishPoint**```
CASTER: npc_dota_hero_alchemist
POINT   1   Vector 0000000003231680 [210.698059 -140.193390 162.187149]
```**OnProjectileFinishProjectile**```
CASTER: npc_dota_hero_alchemist
POINT   1   Vector 00000000032692B8 [210.698059 -140.193390 162.187149]
```
Мы видим, что OnSpellStart имеет ТОЧКУ, в которой мы нажали.

Примечание. Снаряды не являются сущностью.

---

УМИРАНИЕ

**OnOwnerDied**
```
CASTER: npc_dota_hero_alchemist
```
ВОЗРОЖДЕНИЕ ПОЗЖЕ

**OnOwnerSpawned**
```
CASTER: npc_dota_hero_alchemist
```

---

ITEM

**OnEquip**

```
CASTER: npc_dota_hero_alchemist
```
**При снятии экипировки**
```
CASTER: npc_dota_hero_alchemist
```

---

## Modifier Event Context

Applying a modifier on an enemy abaddon with [all the modifier events](#full-test-ability-script) (2nd ability in the full script below)

**OnManaGained**

```
CASTER: npc_dota_hero_alchemist
UNIT: npc_dota_hero_abaddon
```**OnHealReceived**```
CASTER: npc_dota_hero_alchemist
UNIT: npc_dota_hero_abaddon
```
Эти двое сильно спамят консоль (даже если у цели полное здоровье и мана), поэтому я перейду к другим.

---

Впервые срабатывает после применения модификатора

**При создании**
```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_abaddon
```

---

Enemy learned an ability triggered the OnOrder function, pressing Stop key repeatedly did the same

**OnOrder**

```
CASTER: npc_dota_hero_alchemist
UNIT: npc_dota_hero_abaddon
```

---

Enemy moved only triggered this (meaning OnOrder doesn't count moving)

**OnUnitMoved**

```
CASTER: npc_dota_hero_alchemist
UNIT: npc_dota_hero_abaddon
```
В скрипт добавлен `if ability then print("ABILITY: "..ability:GetAbilityName()) end`, чтобы проверять, что дескриптор способности всегда является именем модификатора.

Враг применил заклинание, наносящее урон целевому отряду, на заклинателя модификатора, эти 3 события срабатывают в следующем порядке:

**Под заказ**
```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_alchemist
UNIT: npc_dota_hero_abaddon
ABILITY: event_test
```**OnAbilityExecuted**```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_alchemist
UNIT: npc_dota_hero_abaddon
ABILITY: event_test
```
**При сделке**
```
CASTER: npc_dota_hero_alchemist
UNIT: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_abaddon
ABILITY: event_test
```

---

Now testing the Damage events, making use of the magic %attack_damage that Valve added at some point.

```
"OnTakeDamage"
{
    "RunScript"
    {
        "ScriptFile"  "test.lua"
        "Function"    "TargetTest"
        "EventName"   "OnTakeDamage"
        "Damage"      "%attack_damage"
    }
}

"OnDealDamage"
{
    "RunScript"
    {
        "ScriptFile"  "test.lua"
        "Function"    "TargetTest"
        "EventName"   "OnDealDamage"
        "Damage"      "%attack_damage"
    }
}
```
Это начало активировать OnHealthGained как цель с модификатором _gained_ health, в отличие от OnHealReceived, который срабатывал каждый раз.

**OnHealthGained**
```
CASTER: npc_dota_hero_alchemist
UNIT: npc_dota_hero_abaddon
```
Возвращаясь к тестированию событий Damage, я добавил в скрипт `local Damage = event.Damage` и подтвердил, что и OnTakeDamage, и OnDealDamage имеют доступ к Attack_damage:

**При получении урона**
```
CASTER: npc_dota_hero_alchemist
UNIT: npc_dota_hero_abaddon
ATTACKER: npc_dota_hero_alchemist
DAMAGE: 56.208053588867
```**OnAttackLanded**```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_abaddon
```
Мы также получаем триггеры от событий OnAttack, когда Абаддон атакует заклинателя Алхимика:

**OnAttackStart**
```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_abaddon
```
**При атаке**
```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_abaddon
```**OnAttackLanded**```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_abaddon
```
**При сделке**
```
CASTER: npc_dota_hero_alchemist
UNIT: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_abaddon
DAMAGE: 67.154029846191
```
Алхимик атакует Абаддона с помощью нашего тестового модификатора на Абаддоне:

**При нападении**
```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_abaddon
ATTACKER: npc_dota_hero_alchemist
DAMAGE: 55.369129180908
```
**При получении урона**
```
CASTER: npc_dota_hero_alchemist
UNIT: npc_dota_hero_abaddon
ATTACKER: npc_dota_hero_alchemist
DAMAGE: 55.369129180908
```
Таким образом, и OnDealDamage, и OnTakeDamage имеют доступ к %attack_damage.

Что, если мы добавим Attack_damage к нанесенной атаке?

2 действия:

**OnAttackStart**
```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_abaddon
DAMAGE: 0
```
**При атаке**
```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_abaddon
DAMAGE: 0
```**OnAttackLanded**```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_abaddon
DAMAGE: 83
```
**При сделке**
```
CASTER: npc_dota_hero_alchemist
UNIT: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_abaddon
DAMAGE: 70.554229736328
```**OnAttackStart**```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_abaddon
DAMAGE: 0
```
**При атаке**
```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_abaddon
DAMAGE: 0
```**OnAttackLanded**```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_abaddon
DAMAGE: 80
```
**При сделке**
```
CASTER: npc_dota_hero_alchemist
UNIT: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_abaddon
DAMAGE: 68.004081726074
```
У Абаддона дальность атаки от 79 до 89.

![Abaddon attack stats](/images/external/asdgiouzv.jpg)

**OnAttackLanded Attack_damage передает значение атаки!**

---

Использование свитка телепортации:
**При телепортации**
```
CASTER: npc_dota_hero_alchemist
UNIT: npc_dota_hero_alchemist
```**OnAbilityExecuted**```
CASTER: npc_dota_hero_alchemist
TARGET: npc_building_hut
UNIT: npc_dota_hero_alchemist
```
После успешного завершения:

**При телепортации**
```
CASTER: npc_dota_hero_alchemist
UNIT: npc_dota_hero_alchemist
```**OnAbilityEndChannel**```
CASTER: npc_dota_hero_alchemist
UNIT: npc_dota_hero_alchemist
```
Если прокрутка отменена, OnTeleported не запускается.

---

Я дал Абаддону некоторое Уклонение:

**Ошибка при атаке**
```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_abaddon
ATTACKER: npc_dota_hero_alchemist
DAMAGE: 69
```
OnAttackFailed также имеет **реальный, предваряющий смягчение атак_урон АТАКУЕРА.**

---

Убить какого-нибудь кобольда

**При убийстве**
```
CASTER: npc_dota_hero_alchemist
UNIT: npc_dota_neutral_kobold
ATTACKER: npc_dota_hero_alchemist
```
Убит Абаддон, активирован

**При убийстве героя**
```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_abaddon
ATTACKER: npc_dota_hero_alchemist
```

---

I used Chemical Rage, which is NO_TARGET, triggered these:

**OnSpentMana**

```
CASTER: npc_dota_hero_alchemist
UNIT: npc_dota_hero_alchemist
```**OnAbilityExecuted**```
CASTER: npc_dota_hero_alchemist
UNIT: npc_dota_hero_alchemist
```**OnStateChanged**```
CASTER: npc_dota_hero_alchemist
UNIT: npc_dota_hero_alchemist
```
OnStateChanged срабатывает каждый раз, когда применяется новое состояние (состояние изменено, потому что способность применяет короткое состояние НЕУЯВИМОСТЬ)

---

При смерти событие OnDeath происходит до того, как модификаторы будут уничтожены.

**При смерти**
```
CASTER: npc_dota_hero_alchemist
UNIT: npc_dota_hero_alchemist
ATTACKER: npc_dota_hero_abaddon
```
**При уничтожении**
```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_alchemist
```
OnRespawn сработает только с ПОСТОЯННЫМИ модификаторами, потому что без этого ключа моды будут уничтожены после смерти владельца.
```
"Attributes"    "MODIFIER_ATTRIBUTE_PERMANENT"
"OnRespawn"
{
    "RunScript"
    {
        "ScriptFile"    "test.lua"
        "Function"      "TargetTest"
        "EventName"     "OnRespawn"
    }
}
```
**При возрождении**
```
CASTER: npc_dota_hero_alchemist
UNIT: npc_dota_hero_alchemist
```

---

Dodging a projectile

**OnProjectileDodge**

```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_alchemist
```

---

OnDestroy has the same scope as OnCreated

**OnDestroy**

```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_abaddon
```

---

OnIntervalThink same as OnCreated

**OnIntervalThink**

```
CASTER: npc_dota_hero_alchemist
TARGET: npc_dota_hero_alchemist
```

---

## Full Test Ability Script {#full-test-ability-script}

```
// Ability Events
"event_test"
{
	"BaseClass"             		"ability_datadriven"

	"AbilityBehavior"				"DOTA_ABILITY_BEHAVIOR_UNIT_TARGET"	//Change this to trigger different events
	"AbilityUnitTargetTeam"			"DOTA_UNIT_TARGET_TEAM_BOTH"
	"AbilityUnitTargetType"			"DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC"

	"AbilityCastRange"				"700"
	"AbilityCastPoint"				"0.3"
	"AbilityCooldown"				"0.0"

	"OnSpellStart"
	{
		"RunScript"
		{
			"ScriptFile"	"test.lua"
			"Function"		"TargetTest"
			"EventName"		"OnSpellStart"
		}
	}

	"OnAbilityPhaseStart"
	{
		"RunScript"
		{
			"ScriptFile"	"test.lua"
			"Function"		"TargetTest"
			"EventName"		"OnAbilityPhaseStart"
		}
	}

	"OnToggleOff"
	{
		"RunScript"
		{
			"ScriptFile"	"test.lua"
			"Function"		"TargetTest"
			"EventName"		"OnToggleOff"
		}
	}

	"OnToggleOn"
	{
		"RunScript"
		{
			"ScriptFile"	"test.lua"
			"Function"		"TargetTest"
			"EventName"		"OnToggleOn"
		}
	}

	"OnChannelFinish"
	{
		"RunScript"
		{
			"ScriptFile"	"test.lua"
			"Function"		"TargetTest"
			"EventName"		"OnChannelFinish"
		}
	}

	"OnChannelInterrupted"
	{
		"RunScript"
		{
			"ScriptFile"	"test.lua"
			"Function"		"TargetTest"
			"EventName"		"OnChannelInterrupted"
		}
	}

	"OnChannelSucceeded"
	{
		"RunScript"
		{
			"ScriptFile"	"test.lua"
			"Function"		"TargetTest"
			"EventName"		"OnChannelSucceeded"
		}
	}


	"OnEquip"
	{
		"RunScript"
		{
			"ScriptFile"	"test.lua"
			"Function"		"TargetTest"
			"EventName"		"OnEquip"
		}
	}

	"OnUnequip"
	{
		"RunScript"
		{
			"ScriptFile"	"test.lua"
			"Function"		"TargetTest"
			"EventName"		"OnUnequip"
		}
	}

	"OnOwnerDied"
	{
		"RunScript"
		{
			"ScriptFile"	"test.lua"
			"Function"		"TargetTest"
			"EventName"		"OnOwnerDied"
		}
	}

	"OnOwnerSpawned"
	{
		"RunScript"
		{
			"ScriptFile"	"test.lua"
			"Function"		"TargetTest"
			"EventName"		"OnOwnerSpawned"
		}
	}

	"OnProjectileFinish"
	{
		"RunScript"
		{
			"ScriptFile"	"test.lua"
			"Function"		"TargetTest"
			"EventName"		"OnProjectileFinish"
		}
	}

	"OnProjectileHitUnit"
	{
		"RunScript"
		{
			"ScriptFile"	"test.lua"
			"Function"		"TargetTest"
			"EventName"		"OnProjectileHitUnit"
		}
	}

	"OnUpgrade"
	{
		"RunScript"
		{
			"ScriptFile"	"test.lua"
			"Function"		"TargetTest"
			"EventName"		"OnUpgrade"
		}
	}

	"OnSpawn"
	{
		"RunScript"
		{
			"ScriptFile"	"test.lua"
			"Function"		"TargetTest"
			"EventName"		"OnSpawn"
		}
	}
}


// Modifier Events
"event_test"
{
	"BaseClass"             		"ability_datadriven"

	"AbilityBehavior"				"DOTA_ABILITY_BEHAVIOR_UNIT_TARGET"	//Change this to trigger different events
	"AbilityUnitTargetTeam"			"DOTA_UNIT_TARGET_TEAM_BOTH"
	"AbilityUnitTargetType"			"DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC"

	"AbilityCastRange"				"700"
	"AbilityCastPoint"				"0.3"
	"AbilityCooldown"				"0.0"

	"OnSpellStart"
	{
		"ApplyModifier"
		{
			"ModifierName"	"modifier_test"
			"Target" 		"TARGET"
		}
	}

	"Modifiers"
	{
		"modifier_test"
		{
			"OnCreated"
			{
				"RunScript"
				{
					"ScriptFile"	"test.lua"
					"Function"		"TargetTest"
					"EventName"		"OnCreated"
				}
			}

			"OnAbilityEndChannel"
			{
				"RunScript"
				{
					"ScriptFile"	"test.lua"
					"Function"		"TargetTest"
					"EventName"		"OnAbilityEndChannel"
				}
			}

			"OnAbilityExecuted"
			{
				"RunScript"
				{
					"ScriptFile"	"test.lua"
					"Function"		"TargetTest"
					"EventName"		"OnAbilityExecuted"
				}
			}

			"OnManaGained"
			{
				"RunScript"
				{
					"ScriptFile"	"test.lua"
					"Function"		"TargetTest"
					"EventName"		"OnManaGained"
				}
			}

			"OnRespawn"
			{
				"RunScript"
				{
					"ScriptFile"	"test.lua"
					"Function"		"TargetTest"
					"EventName"		"OnRespawn"
				}
			}

			"OnSpentMana"
			{
				"RunScript"
				{
					"ScriptFile"	"test.lua"
					"Function"		"TargetTest"
					"EventName"		"OnSpentMana"
				}
			}

			"OnStateChanged"
			{
				"RunScript"
				{
					"ScriptFile"	"test.lua"
					"Function"		"TargetTest"
					"EventName"		"OnStateChanged"
				}
			}

			"OnTakeDamage"
			{
				"RunScript"
				{
					"ScriptFile"	"test.lua"
					"Function"		"TargetTest"
					"EventName"		"OnTakeDamage"
				}
			}

			"OnDealDamage"
			{
				"RunScript"
				{
					"ScriptFile"	"test.lua"
					"Function"		"TargetTest"
					"EventName"		"OnDealDamage"
				}
			}

			"OnTeleported"
			{
				"RunScript"
				{
					"ScriptFile"	"test.lua"
					"Function"		"TargetTest"
					"EventName"		"OnTeleported"
				}
			}

			"OnTeleporting"
			{
				"RunScript"
				{
					"ScriptFile"	"test.lua"
					"Function"		"TargetTest"
					"EventName"		"OnTeleporting"
				}
			}

			"OnOrder"
			{
				"RunScript"
				{
					"ScriptFile"	"test.lua"
					"Function"		"TargetTest"
					"EventName"		"OnOrder"
				}
			}

			"OnProjectileDodge"
			{
				"RunScript"
				{
					"ScriptFile"	"test.lua"
					"Function"		"TargetTest"
					"EventName"		"OnProjectileDodge"
				}
			}

			"OnUnitMoved"
			{
				"RunScript"
				{
					"ScriptFile"	"test.lua"
					"Function"		"TargetTest"
					"EventName"		"OnUnitMoved"
				}
			}

			"OnHealReceived"
			{
				"RunScript"
				{
					"ScriptFile"	"test.lua"
					"Function"		"TargetTest"
					"EventName"		"OnHealReceived"
				}
			}

			"OnHealthGained"
			{
				"RunScript"
				{
					"ScriptFile"	"test.lua"
					"Function"		"TargetTest"
					"EventName"		"OnHealthGained"
				}
			}

			"OnAttack"
			{
				"RunScript"
				{
					"ScriptFile"	"test.lua"
					"Function"		"TargetTest"
					"EventName"		"OnAttack"
				}
			}

			"OnAttackStart"
			{
				"RunScript"
				{
					"ScriptFile"	"test.lua"
					"Function"		"TargetTest"
					"EventName"		"OnAttackStart"
				}
			}

			"OnAttackAllied"
			{
				"RunScript"
				{
					"ScriptFile"	"test.lua"
					"Function"		"TargetTest"
					"EventName"		"OnAttackAllied"
				}
			}

			"OnAttacked"
			{
				"RunScript"
				{
					"ScriptFile"	"test.lua"
					"Function"		"TargetTest"
					"EventName"		"OnAttacked"
				}
			}

			"OnAttackFailed"
			{
				"RunScript"
				{
					"ScriptFile"	"test.lua"
					"Function"		"TargetTest"
					"EventName"		"OnAttackFailed"
				}
			}

			"OnAttackLanded"
			{
				"RunScript"
				{
					"ScriptFile"	"test.lua"
					"Function"		"TargetTest"
					"EventName"		"OnAttackLanded"
				}
			}

			"OnDeath"
			{
				"RunScript"
				{
					"ScriptFile"	"test.lua"
					"Function"		"TargetTest"
					"EventName"		"OnDeath"
				}
			}

			"OnKill"
			{
				"RunScript"
				{
					"ScriptFile"	"test.lua"
					"Function"		"TargetTest"
					"EventName"		"OnKill"
				}
			}

			"OnHeroKilled"
			{
				"RunScript"
				{
					"ScriptFile"	"test.lua"
					"Function"		"TargetTest"
					"EventName"		"OnHeroKill"
				}
			}

			// "ThinkInterval" "1.0"
			"OnIntervalThink"
			{
				"RunScript"
				{
					"ScriptFile"	"test.lua"
					"Function"		"TargetTest"
					"EventName"		"OnIntervalThink"
				}
			}

			"OnDestroy"
			{
				"RunScript"
				{
					"ScriptFile"	"test.lua"
					"Function"		"TargetTest"
					"EventName"		"OnDestroy"
				}
			}

			// This doesn't trigger.
			"OnAbilityStart"
			{
				"RunScript"
				{
					"ScriptFile"	"test.lua"
					"Function"		"TargetTest"
					"EventName"		"OnAbilityStart"
				}
			}
		}
	}
}
```
OnAbilityStart -> ОТРИЦАТЕЛЬНО, Сбой.