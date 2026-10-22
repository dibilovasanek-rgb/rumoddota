---
title: Написание простого ИИ для нейтралов
author: Perry
steamId: '76561198046986723'
date: 25.01.2020
---
Написание простого ИИ для нейтралов

::: информация
Эта статья представляет собой переработку очень старого руководства по искусственному интеллекту: [http://yrrep.me/dota/dota-simple-ai.html](https://web.archive.org/web/20191231104348/https://yrrep.me/dota/dota-simple-ai.html).
:::

За это время я столкнулся со многими вопросами об ИИ в irc по моддингу, поэтому решил написать руководство по очень простому ИИ, который можно использовать в Lua. Термин ИИ может показаться пугающим программисту, у которого практически нет опыта работы с ним. Однако я постараюсь изложить процесс создания простого ИИ, управляемого состоянием, как можно более понятно. Надеюсь, к концу этой статьи написание собственного ИИ перестанет казаться таким страшным.

## Что мы делаем

Мы создадим небольшой управляемый государством ИИ, который будет имитировать поведение нейтральных людей в DotA 2. Это значит, что он будет делать следующее:

- Он будет стоять на своем месте до тех пор, пока враг не подойдет к нему.
- Заметив врага, он побежит атаковать его.
- Если нейтраль уйдет слишком далеко от своего исходного «холостой позиции», она вернется обратно в нее.
- Повторяем с первого пункта.

Первым этапом создания надежного ИИ (в том смысле, что он всегда будет делать то, что вы от него ожидаете) является планирование. Лично я считаю, что создание диаграммы, представляющей различные состояния и переходы между этими состояниями, очень поможет при создании такого ИИ. Чем больше усилий вы вложите в эту диаграмму, тем проще будет фактическая реализация вашего ИИ.

Для нашего нейтрального примера я перевел текст, описывающий поведение объекта, в диаграмму состояний, содержащую все возможные состояния и условия перехода между этими состояниями. В результате получается следующая диаграмма:

![State transition diagram](/images/external/TWgPSJx.png)
Эти диаграммы можно создать с помощью любого программного обеспечения с возможностями рисования, такого как Paint, Photoshop или Word. Мне очень нравится использовать https://www.draw.io/, — онлайн-инструмент для рисования, специализирующийся на рисовании диаграмм и графиков.

На диаграмме вы можете увидеть различные состояния, представленные прямоугольниками, и переходы, обозначенные стрелками. Метки на стрелках описывают, когда происходит этот переход.

## Реализация одного состояния

Чтобы показать, как преобразовать одно состояние в код, я приведу пример реализации агрессивного состояния. Я реализую каждое состояние как функцию «думания», которая проверит, истинно ли какое-либо из условий перехода, и выполнит этот переход, если они верны.

Посмотрите на «агрессивное» состояние на диаграмме выше. У него есть два перехода, поэтому я ожидаю, что функция «AggressiveThink» будет содержать одну проверку «Цель умерла», одну проверку «Вне зоны действия поводка», а также некоторое агрессивное поведение, происходящее внутри состояния.

Это переводится в следующий код:
```
lua
function modifier_ai:AggressiveThink()
    -- Check if the unit has walked outside its leash range
    if (self.spawnPos - self.unit:GetAbsOrigin()):Length() > self.leashRange then
        self.unit:MoveToPosition(self.spawnPos) --Move back to the spawnpoint
        self.state = AI_STATE_RETURNING --Transition the state to the 'Returning' state(!)
        return -- Stop processing this state
    end

    -- Check if the target has died
    if not self.aggroTarget:IsAlive() then
        self.unit:MoveToPosition(self.spawnPos) --Move back to the spawnpoint
        self.state = AI_STATE_RETURNING --Transition the state to the 'Returning' state(!)
        return -- Stop processing this state
    end

    -- Still in the aggressive state, so do some aggressive stuff.
    self.unit:MoveToTargetToAttack(self.aggroTarget)
end
```
Этот способ перевода диаграммы состояний в код всегда будет работать, пока вы можете написать код, описывающий условия перехода.

## AI как модификатор Lua

Теперь у нас есть одна функция, которая описывает один «тик» одного из наших состояний ИИ. Как нам убедиться, что она вызывается?

Самый простой способ создать ИИ, привязанный к одному юниту, — сделать ИИ модификатором Lua. Этот модификатор имеет несколько очень удобных встроенных свойств:

- ИИ остановится, как только юнит умрет.
- Модификатор предоставляет удобные обработчики создания/уничтожения для настройки/очистки вашего ИИ.
- Модификатор обеспечивает интервальное мышление

Итак, на самом деле, сама суть вашего ИИ сводится к вызову `StartIntervalThink(interval)` в `OnCreated` вашего модификатора, а затем в `OnIntervalThink` вызов правильной функции «состояния», которую вы создали, как в предыдущем разделе.

## Полный модификатор ИИ

Ниже приведена полная диаграмма состояний, приведенная выше, реализованная как AI. Этот ИИ можно добавить в `unit`, вызвав:
```
lua
unit:AddNewModifier(nil, nil, "modifier_ai", { aggroRange = 600, leashRange = 600 });
```
Когда я применяю его, я передаю некоторые параметры поведению ИИ, что позволяет настраивать каждую единицу. Имейте в виду, что этот модификатор аналогичен любому другому модификатору Lua, поэтому вы можете выполнять любой код, который также можно вызывать с помощью обычных модификаторов.
```
lua
modifier_ai = class({})

local AI_STATE_IDLE = 0
local AI_STATE_AGGRESSIVE = 1
local AI_STATE_RETURNING = 2

local AI_THINK_INTERVAL = 0.5

function modifier_ai:OnCreated(params)
    -- Only do AI on server
    if IsServer() then
        -- Set initial state
        self.state = AI_STATE_IDLE

        -- Store parameters from AI creation:
        -- unit:AddNewModifier(caster, ability, "modifier_ai", { aggroRange = X, leashRange = Y })
        self.aggroRange = params.aggroRange
        self.leashRange = params.leashRange

        -- Store unit handle so we don't have to call self:GetParent() every time
        self.unit = self:GetParent()

        -- Set state -> action mapping
        self.stateActions = {
            [AI_STATE_IDLE] = self.IdleThink,
            [AI_STATE_AGGRESSIVE] = self.AggressiveThink,
            [AI_STATE_RETURNING] = self.ReturningThink,
        }

        -- Start thinking
        self:StartIntervalThink(AI_THINK_INTERVAL)
    end
end

function modifier_ai:OnIntervalThink()
    -- Execute action corresponding to the current state
    self.stateActions[self.state](self)
end

function modifier_ai:IdleThink()
    -- Find any enemy units around the AI unit inside the aggroRange
    local units = FindUnitsInRadius(self.unit:GetTeam(), self.unit:GetAbsOrigin(), nil,
        self.aggroRange, DOTA_UNIT_TARGET_TEAM_ENEMY, DOTA_UNIT_TARGET_ALL, DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER, false)

    -- If one or more units were found, start attacking the first one
    if #units > 0 then
        self.spawnPos = self.unit:GetAbsOrigin() -- Remember position to return to
        self.aggroTarget = units[1] -- Remember who to attack
        self.unit:MoveToTargetToAttack(self.aggroTarget) --Start attacking
        self.state = AI_STATE_AGGRESSIVE --State transition
        return -- Stop processing this state
    end

    -- Nothing else to do in Idle state
end

function modifier_ai:AggressiveThink()
    -- Check if the unit has walked outside its leash range
    if (self.spawnPos - self.unit:GetAbsOrigin()):Length() > self.leashRange then
        self.unit:MoveToPosition(self.spawnPos) --Move back to the spawnpoint
        self.state = AI_STATE_RETURNING --Transition the state to the 'Returning' state(!)
        return -- Stop processing this state
    end

    -- Check if the target has died
    if not self.aggroTarget:IsAlive() then
        self.unit:MoveToPosition(self.spawnPos) --Move back to the spawnpoint
        self.state = AI_STATE_RETURNING --Transition the state to the 'Returning' state(!)
        return -- Stop processing this state
    end

    -- Still in the aggressive state, so do some aggressive stuff.
    self.unit:MoveToTargetToAttack(self.aggroTarget)
end

function modifier_ai:ReturningThink()
    -- Check if the AI unit has reached its spawn location yet
    if (self.spawnPos - self.unit:GetAbsOrigin()):Length() < 10 then
        self.state = AI_STATE_IDLE -- Transition the state to the 'Idle' state(!)
        return -- Stop processing this state
    end

    -- If not at return position yet, try to move there again
    self.unit:MoveToPosition(self.spawnPos)
end
```

## Ваш следующий (более сложный) ИИ

В этом уроке рассматриваются только самые базовые концепции создания вашего первого ИИ, но если вы хотите расширить его, вот еще несколько интересных идей:

- Поскольку вы используете модификатор lua, вам не нужно менять состояние в функции think, вы также можете просто зарегистрировать прослушиватель событий модификатора и изменять состояние внутри него!
- Обобщите классы состояний и дайте каждому состоянию функции `OnStateEnter`, `OnStateThink` и `OnStateLeave`.
- Вы можете вкладывать эти ИИ! Вы можете сделать внутреннее поведение одного государства собственным ИИ, созданным таким же образом.