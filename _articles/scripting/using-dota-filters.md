---
title: Использование фильтра заказов и других фильтров
author: Perry
steamId: '76561198046986723'
date: 26.06.2016
---
льзование фильтра заказов и других фильтров

## Фильтры в целом

В этом руководстве объясняется использование различных функций фильтра, имеющихся в настоящее время в API, и иллюстрируется это на небольшом примере в фильтре заказов.

В настоящее время в lua API доступно 9 фильтров, а именно:

- **AbilityTuningFilter** — фильтрует способности и все значения, которые они используют при применении.
- **BountyRunePickupFilter** — Фильтрует подбор рун за добычу.
- **DamageFilter** — фильтрует события повреждения.
- **ExecuteOrderFilter** — фильтрует приказы (обычно отдаваемые игроками).
- **ModifierGainedFilter** — фильтрует события модификаторов, когда они впервые применяются к отряду.
- **ModifyExperienceFilter** — фильтрует изменения опыта.
- **ModifyGoldFilter** — Фильтрует модификации золота.
- **RuneSpawnFilter** — Фильтрует появление рун.
- **TrackingProjectileFilter** — фильтрует отслеживание запусков снарядов.

Эти фильтры устанавливаются с использованием таких функций, как `CDOTABaseGameMode:SetExecuteOrderFilter(function, context)`. Проверьте [API declarations](https://github.com/TypeScriptToLua/Dota2Declarations/blob/master/dota-api.d.ts#L1193), чтобы узнать точное имя функции для каждой функции. Затем фильтры можно снова очистить с помощью таких функций, как `CDOTABaseGameMode:ClearExecuteOrderFilter()` и подобных функций — опять же, см. [API declarations](https://github.com/TypeScriptToLua/Dota2Declarations/blob/master/dota-api.d.ts#L1193).

## Общая идея

**(Это самый важный раздел всего руководства)**
Движок Source 2 прослушивает события, генерируемые игроками или юнитами в игре. В движке имеется множество обработчиков, определяющих, что делать при получении определенного события. Фильтры анализируют эти события до того, как они достигнут движка, и имеют возможность принять решение не доставлять событие или, возможно, доставить измененную версию события.

Это можно объяснить аналогией с компанией, получающей почту. Обычной ситуацией является то, что компания (движок) получает почту (события) и читает их как обычно. Теперь представьте, что нанят новый секретарь (фильтр), который читает каждое полученное письмо и решает, достаточно ли важно письмо, чтобы его можно было обработать, или нет. Эта система проиллюстрирована на следующем рисунке:

![Filtering visualized](/images/external/Op4u0Oa.png)

## Фильтры в Lua

Итак, теперь мы знаем, как работают фильтры, и как их использовать? В этом объяснении будет использоваться `ExecuteOrderFilter`, имейте в виду, что все фильтры используют одну и ту же основную идею.

Первым шагом является установка фильтра с помощью вызова API `CDOTABaseGameMode:SetExecuteOrderFilter(function, context)`. Давайте проанализируем, что ожидает эта функция. Есть два параметра:
**Параметр: функция** – функция фильтра. Эта функция является вашим настоящим фильтром. Он вызывается каждый раз, когда вызывается событие, которое вы фильтруете (в данном случае, когда поступает заказ). Функция фильтра получает два параметра: **self** и **event**. Параметр **self** — это всего лишь контекст функции (и он скрыт, если вы используете Dynamic_Wrap и оператор :). Действительно интересный параметр — это параметр **event**. Этот параметр содержит все данные события. Ваша функция фильтра должна просмотреть это событие и принять решение. Есть три возможных результата:

1. Вы хотите ничего не делать и принимаете событие, вы `return true`.
2. Если вы хотите отклонить событие, оно будет выглядеть так, как будто этого события никогда не было, `return false`.
3. Вы хотите принять событие с некоторыми изменениями. Все, что вам нужно сделать, это **изменить таблицу событий** и `return true`.

**Параметр: контекст** – этот параметр передается в функцию фильтра как **self**.

## Пример 1: отключение глифа

Пришло время применить на практике то, что мы только что узнали. Мы знаем, что глиф — это приказ игрока, поэтому нам следует использовать фильтр приказов, чтобы отключить его. Все, что нам нужно сделать, это найти любые порядки глифов и вернуть false. Конечно, вы можете добавить любое ограничение на основе содержимого параметра события. Просто `DeepPrintTable( event )`, чтобы увидеть, какие данные вам доступны.
Чтобы проверить, какие типы ордеров существуют, посмотрите [API](https://moddota.com/api/#!/vscripts/dotaunitorder_t).

Обратите внимание, что в этом примере оператор : для `GameMode:OrderFilter` скрывает первый параметр (`self`).
```
lua
--First set the filter to start catching events, usually this is in your init
GameRules:GetGameModeEntity():SetExecuteOrderFilter(Dynamic_Wrap(GameMode, "OrderFilter"), self)

--......................

--Add the order filter to your game mode entity
function GameMode:OrderFilter(event)
    --Check if the order is the glyph type
    if event.order_type == DOTA_UNIT_ORDER_GLYPH then
        return false
    end

    --Return true by default to keep all other orders the same
    return true
end
```

## Пример 2: Изменение заказа

Этот пример имитирует своего рода «пьяное» состояние юнита, добавляя случайное смещение к любым приказам о движении. Код довольно прост: все, что вам нужно сделать, это изменить входящий заказ и вернуть true.
```
lua
--First set the filter to start catching events, usually this is in your init
GameRules:GetGameModeEntity():SetExecuteOrderFilter(Dynamic_Wrap(GameMode, "OrderFilter"), self)

--......................

--Add the order filter to your game mode entity
function GameMode:OrderFilter(event)
    --Check if the order is the glyph type
    if event.order_type == DOTA_UNIT_ORDER_MOVE_TO_POSITION then
        local offsetVector = RandomVector(100)
        event.position_x = event.position_x + offsetVector.x
        event.position_y = event.position_y + offsetVector.y
        return true
    end

    --Return true by default to keep all other orders the same
    return true
end
```
