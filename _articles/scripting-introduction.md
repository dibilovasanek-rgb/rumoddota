---
title: Введение в создание сценариев
author: Noya
steamId: '76561198046984233'
date: 18.02.2015
---
ение в создание сценариев

Это руководство, часть 2 [Getting Started With Dota 2 Modding](getting-started), предназначено для объяснения основ программирования пользовательских модов Dota 2.

## Скрипты

Итак, теперь, когда у вас запущен только что созданный игровой режим и вы немного поигрались с редактором карт, пришло время перейти к программированию пользовательских карт Dota 2.

Зайдите в папку &lt;addonName&gt;/scripts/. Две основные папки сценариев — `npc` и `vscripts`. Первая содержит следующие файлы `.txt`:

- `npc_abilities_custom.txt` - Содержит все пользовательские возможности игрового режима.
- `npc_heroes_custom.txt` — Герои со своими способностями и характеристиками.
- `npc_items_custom.txt` - Предметы - это способности, которые входят в инвентарь юнитов.
- `npc_units_custom.txt` - Все данные для юнитов, не являющихся героями, таких как здания или существа.
- `npc_abilities_override.txt` - Модифицированные способности/предметы доты с измененными значениями.
- `herolist.txt` - Список героев, доступных для выбора.

Эти файлы определяются с помощью KeyValues ​​(KV) и являются ядром **системы DataDriven**. Хотя они соответствуют определению языка программирования, они больше похожи на большую таблицу, содержащую все возможные данные в статическом документе. Он использует относительно простой синтаксис, единственными специальными символами которого являются фигурные скобки и кавычки, с чередующимися наборами пар «Ключ» и «Значение» или «Ключ» `{table}`, где `table` — еще один набор KeyValues.

KV будет определять данные способностей/предметов/юнитов, а более детальное поведение обрабатывается с помощью Lua или TypeScript.

Каждый файл .txt содержит свои конкретные KV, и при запуске игры каждый клиент (и сервер) будет их интерпретировать. Изменения в этих файлах не вступят в силу, пока игра не будет запущена снова, поэтому внимательно следите за синтаксисом, поскольку любые дополнительные/отсутствующие `"` или `{` `}` обычно делают все значения ключей, которые появляются после этой ошибки, непригодными для использования. Последовательный [indentation](https://en.wikipedia.org/wiki/Indent_style) — хорошая практика для раннего обучения! KV чувствителен к регистру, поэтому обратите внимание на то, чтобы писать все так, как того требует игра. Если ваш КВ не работает, попробуйте поместить его в [the KV checker](https://arhowk.github.io/) для поиска ошибок.
Теперь самое время подготовить вашу среду для написания скриптов Dota. Для этого лучше всего получить [Visual Studio Code](https://code.visualstudio.com/). Используйте VSCode, чтобы открыть корневой каталог аддона, выбрав «Файл» > «Открыть папку…».

## Запуск и тестирование вашей игры

После того, как ваша среда настроена, вы можете попробовать запустить дополнение. Откройте инструменты мастерской (если вы не можете их найти, они находятся в `/Steam/steamapps/common/dota 2 beta/game/bin/win64/dota2cfg.exe`, добавьте это в закладки) и выберите свой аддон.

После запуска браузера ресурсов откройте консоль с помощью кнопок вверху. Чтобы запустить аддон, просто введите следующую команду в нижней части консоли:
```
dota_launch_custom_game <custom_game_name> <map_name>
```
Если вы этого не сделали, вам сначала нужно будет создать карту с помощью Hammer, прежде чем вы сможете запустить на ней игру. Вы также можете запустить игру на карте Dota 2 по умолчанию, используя:
```
dota_launch_custom_game <custom_game_name> dota
```
После этой команды вы войдете в игру по правилам вашего аддона. Если вы хотите перезапустить игру, чтобы перезагрузить скрипты, просто повторите команду запуска (нажав стрелку вверх в консоли) или набрав `restart` в консоли.

## Сценарии Lua/TypeScript

Возвращаясь к папке game/scripts, мы видим папку `vscripts`. Здесь размещаются все скрипты Lua/TypeScript.

### Игровая логика

В каждом игровом режиме должен присутствовать файл с именем `addon_game_mode.lua`. Хотя в этот файл можно добавить игровую логику (и, по сути, Valve так и сделала в своем тестовом примере), рекомендуется зарезервировать этот файл только для этих двух функций:
- `Precache`, когда игра запускается и игроки выбирают своих героев, движок попытается загрузить соответствующие модели/частицы/звуки этим героям. Если мы динамически используем ресурс в Lua перед предварительной загрузкой, он не будет отображаться должным образом.
- `Activate`, создает объект основного игрового режима и вызывает функцию инициализации.
```
lua
--[[
    Basic Barebones
]]

-- Required files to be visible from anywhere
require( 'timers' )
require( 'barebones' )

function Precache( context )
    -- Precache things here
end

-- Create the game mode when we activate
function Activate()
    GameRules.GameMode = GameMode()
    GameRules.GameMode:InitGameMode()
end
```
Используя наши barebone-системы, вам не нужно трогать этот файл, за исключением очень специфических ситуаций, и вся основная игровая логика будет закодирована в `gamemode.lua` (для более старых версий это `barebones.lua`), что уже требовалось. С этого момента мы будем называть его вашим _основным lua-файлом_.

После завершения `addon_game_mode` `Precache` и `Activate` первой функцией, которая будет выполнена в файле `barebones.lua`, будет `GameMode:InitGameMode()`.

Здесь игра начинается с инициализации всевозможных правил и функций, которые регистрируются в объектах GameRules и GameMode. Для этого в файле `settings.lua` определено множество переменных, которые помогают организовать такие параметры, как настройки золота, убийства, пользовательские уровни и т. д.

Это синтаксис функции, применяемой к GameRules, с одним логическим параметром:

`GameRules:SetHeroRespawnEnabled( ENABLE_HERO_RESPAWN )`
Как и KV, Lua чувствителен к регистру. Кроме того, размещение функций в вашем основном файле Lua обычно не имеет значения. Все строки сценария внутри вызова функции будут выполняться одна за другой, возможно, в одном и том же _frame_; один кадр в Доте составляет 1/30 секунды.

Обратите внимание на использование двоеточия `:` перед функцией. В Lua мы получаем доступ к различным **функциям Game API**. Мы говорим, что `GameRules` — это **HScript** или **дескриптор**. Дескрипторы — это, по сути, огромные таблицы со всей необходимой информацией об объекте. В [Scripting API page](https://moddota.com/api/#!/vscripts) вы увидите множество различных типов функций, которые могут использовать разные дескрипторы.

Глобальным функциям не нужен префикс дескриптора `:`. Герои, существа, способности и предметы имеют разные классы дескрипторов, и попытка вызвать функцию через несовместимый класс приведет к ошибке VScript, в виде розового текста в консоли и красного текста на игровом экране.

### Консоль

Вы можете получить доступ к игровой консоли, нажав клавишу `.

Это предоставит массу полезной информации для отладки. Различные цвета представляют различные «каналы» информации. По умолчанию все каналы находятся в одной вкладке «Журнал: по умолчанию». Настоятельно рекомендуется создать свои собственные вкладки, чтобы разделить средство просмотра журналов.
![img](/images/external/y2BUNcS.png)

Для сценариев Lua нам нужна вкладка VScript. Сообщения о системе DataDriven находятся в общем канале желтым цветом вместе с некоторой другой информацией, для этого тоже сделайте отдельный просмотрщик.

![img](/images/external/g2nWY-22554172f6.png)

Новые вкладки:

![img](/images/external/g2o1O-b46e113293.png)

Консоль будет уведомлять всякий раз, когда происходит ошибка сценария Lua, либо при загрузке игры (ошибка компиляции синтаксиса), либо во время выполнения. В этой ошибке я написал GameRules.SetHeroRespawnEnabled с `.` вместо `:`.
![img](/images/external/g2jo2-6c85128308.png)

Затем вы можете отследить ошибку до этой строки и попытаться ее устранить, написав **script_reload** в консоли, чтобы перезагрузить скрипт и проверить, действительно ли он был исправлен.

Синтаксическая ошибка DataDriven обычно выглядит следующим образом:

![img](/images/external/g3HVp-27ef775669.png)

### События движка

Второй сегмент функции InitGameMode — это **Слушатели**:
`ListenToGameEvent('dota_player_gained_level', Dynamic_Wrap(GameMode, 'OnPlayerLevelUp'), self)`

Структура этого ListenToGameEvent читается так:

**Каждый раз, когда срабатывает событие dota_player_gained_level, выполняйте сценарии внутри функции OnPlayerLevelUp.**

`OnPlayerLevelUp` и `GameMode` (или `barebones` в обновленной версии) — это просто имена функции и имени основного класса, которые мы придумали, обычно вам не нужно о них беспокоиться, все прослушиватели и функции уже доступны в базовой версии и готовы к расширению. `Dynamic_Wrap` — это функция, гарантирующая, что команда `script_reload` также перезагружает прослушиватели. `script_reload` перезапускает сценарии Lua во время выполнения, в отличие от файлов DataDriven, которые требуют полного перезапуска игры. Как вы можете видеть на примере barebone-системы, существует множество возможных событий, и не все из них там перечислены, это только наиболее используемые.

Третья и последняя часть `InitGameMode` в упрощенных Barebone-системах — это самостоятельно определяемые переменные для отслеживания информации. Они используют объект `self.`, который является локальной ссылкой на объект GameMode, видимый через все функции внутри основного файла lua. Добавление информации к такой сущности, как `entity.`, широко называется «индексированием» и по сути представляет собой добавление еще одной записи в большую таблицу этой сущности. Это очень полезно, поскольку эта информация хранится под дескриптором сущности, видимым повсюду, и не изменится, пока мы не переназначим ее или не уничтожим.

Хватит теории, давайте посмотрим, как все это устроено. Давайте взглянем на функцию OnNPCSpawned, которая является прослушивателем `npc_spawned` и срабатывает каждый раз, когда на карту добавляется объект юнита или героя.
Давайте проанализируем содержимое функции по умолчанию `OnNPCSpawned`:

::: кодовая группа
```
lua [Lua]
-- An NPC has spawned somewhere in game.  This includes heroes
function GameMode:OnNPCSpawned(keys)
    print("[BAREBONES] NPC Spawned")
    DeepPrintTable(keys)
    local npc = EntIndexToHScript(keys.entindex)

    if npc:IsRealHero() and npc.bFirstSpawned == nil then
        npc.bFirstSpawned = true
        GameMode:OnHeroInGame(npc)
    end
end
```

```
ts [TypeScript]
// An NPC has spawned somewhere in game.  This includes heroes
public OnNPCSpawned(event: NpcSpawnedEvent) {
    print("[BAREBONES] NPC Spawned");
    DeepPrintTable(event);
    const npc = EntIndexToHScript(event.entindex);

    if (npc.IsRealHero() && npc.bFirstSpawned == undefined) {
        npc.bFirstSpawned = true;
        OnHeroInGame(npc);
    }
}
```

:::

First line will print the string in the VConsole. The print function is native to Lua, and accepts multiple parameters separated by commas.

`DeepPrintTable` is a Global Valve-made function which will display the information of the table passed. For keys in this case, it will be the .entindex and .splitscreenplayer. The **entity index** is a very important number to reference the entity. Ignore splitscreenplayer, it's just legacy source stuff and never used in Dota 2.

![img](/images/external/g2iLY-54583b0b65.png)

The next line defines a local variable. In Lua local variables have their scope limited to the block where they are declared. It is good programming style to use local variables whenever possible. Local variables help you avoid cluttering the global environment with unnecessary names. Moreover, access to local variables is faster than to global ones.

`local npc = EntIndexToHScript(keys.entindex)`

По сути, это чтение информации, предоставленной событием, и сохранение ее в локальной переменной внутри этого вызова функции. В этом примере все прослушиватели и их функции уже обработаны, но для справки вы всегда можете проверить [Built-In_Engine_Events wiki page](https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Scripting/Built-In_Engine_Events), чтобы точно знать, какие параметры передаются каждым событием.

Локальная переменная npc — это HScript типа дескриптора. Все изменения, внесенные в переменную npc, отразятся на созданном юните.

Следующая строка является условной: сначала она проверяет, является ли NPC настоящим героем (это исключает иллюзии), а также проверяет, не присвоен ли еще индекс .bFirstSpawned (самоопределяемая переменная). Если оба условия истинны, изменяет логическое значение на true и вызывает функцию OnHeroInGame.

Чтобы закончить это базовое руководство по Dota Lua, давайте изменим функцию OnNPCSpawned так, чтобы при появлении юнита с именем npc_dota_neutral_kobold подождал 1 секунду, а затем уничтожил себя. К первому оператору if добавлено условие else-if:

::: кодовая группа
```
lua [Lua]
function GameMode:OnNPCSpawned(keys)
    local npc = EntIndexToHScript(keys.entindex)

    if npc:IsRealHero() and npc.bFirstSpawned == nil then
        npc.bFirstSpawned = true
        GameMode:OnHeroInGame(npc)
    elseif npc:GetUnitName() == "npc_dota_neutral_kobold" then
        Timers:CreateTimer( 1.0 , function()
            npc:ForceKill(true)
        end)
    end
end
```

```
ts [TypeScript]
public OnNPCSpawned(event: NpcSpawnedEvent) {
    const npc = EntIndexToHScript(keys.entindex);

    if (npc.IsRealHero() && npc.bFirstSpawned == undefined) {
        npc.bFirstSpawned = true;
        OnHeroInGame(npc);
    } else if (npc.GetUnitName() == "npc_dota_neutral_kobold") {
        Timers.CreateTimer(1.0, () => {
            npc.ForceKill(true);
        });
    }
}
```

:::

Here we make use of the Timers library for a simple 1.0 second delay, there are many different timer functions included and explained in `timers.lua`. The bool on ForceKill is to enable the death animation.

<StaticVideo path="/videos/DigitalDefinitiveChimpanzee.mp4" />

### Tables

Tables are the most important structure we will have to use. As mentioned before, all the info on entities can be seen as a table (even though it's technically a pointer to a C++ object), and you Get and Set the values through the various Game API functions.

В API есть несколько функций, которые возвращают таблицу дескрипторов объектов.

Допустим, вы хотите найти все юниты рядом с появившимся кобольдом и убить их. Для этой цели можно использовать функцию `FindUnitsInRadius`, которая принимает множество параметров разных типов, что стоит объяснить:

`table FindUnitsInRadius(int teamNumber, Vector position, handle cacheUnit, float radius, int teamFilter, int typeFilter, int flagFilter, int order, bool canGrowCache)`

Параметры должны быть именно в этом порядке. Эта функция является глобальной, поэтому `handle:` не требуется, но нам нужно сохранить таблицу в переменной, например:

`local units = FindUnitsInRadius(...)`

Для команды TeamNumber узнать, в какой команде находится объект, можно с помощью `GetTeamNumber()` в дескрипторе NPC. Что касается других параметров фильтра, то вместо целых чисел мы используем группу **Констант**, которые представляют различные числовые значения. Полный список констант — [found on this wiki page](https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Scripting/Constants).
Вектор представлен как координаты Vector(x,y,z). Функция получения положения конкретного юнита называется `GetAbsOrigin` и принимает дескриптор NPC.

Что касается параметров кэша, просто оставьте их равными нулю и false, в целом они бесполезны.

Полный вызов функции для получения героев в радиусе 500 от порожденного кобольда будет:

::: кодовая группа
```
lua [Lua]
local units = FindUnitsInRadius(npc:GetTeamNumber(), npc:GetAbsOrigin(), nil, 500,
                                DOTA_UNIT_TARGET_TEAM_ENEMY, bit.bor(DOTA_UNIT_TARGET_BASIC, DOTA_UNIT_TARGET_HERO),
                                DOTA_UNIT_TARGET_FLAG_NONE, FIND_ANY_ORDER, false)
```

```
ts [TypeScript]
const units = FindUnitsInRadius(
  npc.GetTeamNumber(),
  npc.GetAbsOrigin(),
  undefined,
  500,
  UnitTargetTeam.ENEMY,
  UnitTargetType.Basic | UnitTargetType.HERO,
  UnitTargetFlags.NONE,
  FindOrder.FIND_ANY_ORDER,
  false,
);
```

:::

The use of extra break lines is just to make it more readable. Now we want to **iterate over the entities of this table**, which is done like this:

::: code-group

```
lua [Lua]
for key, unit in pairs(units) do
    print(key, value)
    unit:ForceKill(true)
end
```

```
ts [TypeScript]
for (const unit of units) {
  unit.ForceKill(true);
}
```

:::

The `key` and `unit` are the chosen names to refer to the position and value inside the _units_ table, which will be read in pairs. Using `_` as the name of the key is a good convention when you want to make it clear that the first parameter won't be used. The 2nd parameter, unit, is used to iterate handles of the units found.

There is one more thing to consider: the "wait one frame" issue. Because all units are actually spawned at the (0,0,0) coordinates and then moved to the desired position, many times you'll need to create a 0 second timer (executes next frame) for some scripts to work, and this is one of those cases.

So, `OnNPCSpawned` is looking like this:

::: code-group

```
lua [Lua]
function GameMode:OnNPCSpawned(keys)
    local npc = EntIndexToHScript(keys.entindex)

    if npc:IsRealHero() and npc.bFirstSpawned == nil then
        npc.bFirstSpawned = true
        GameMode:OnHeroInGame(npc)
    elseif npc:GetUnitName() == "npc_dota_neutral_kobold" then
        Timers:CreateTimer(0, function()
            local units = FindUnitsInRadius(npc:GetTeamNumber(), npc:GetAbsOrigin(), nil, 500,
                                            DOTA_UNIT_TARGET_TEAM_ENEMY, DOTA_UNIT_TARGET_HERO,
                                            DOTA_UNIT_TARGET_FLAG_NONE, FIND_ANY_ORDER, false)

            for key, value in pairs(units) do
                print(key, value)
                value:ForceKill(true)
            end
        end)
    end
end
```

```
ts [TypeScript]
public OnNPCSpawned(event: NpcSpawnedEvent) {
    const npc = EntIndexToHScript(keys.entindex);

    if (npc.IsRealHero() && npc.bFirstSpawned == undefined) {
        npc.bFirstSpawned = true;
        OnHeroInGame(npc);
    } else if (npc.GetUnitName() == "npc_dota_neutral_kobold") {
        Timers.CreateTimer(() => {
            const units = FindUnitsInRadius(npc.GetTeamNumber(), npc.GetAbsOrigin(), undefined, 500,
                                            UnitTargetTeam.ENEMY, UnitTargetType.Basic | UnitTargetType.HERO,
                                            UnitTargetFlags.NONE, FindOrder.FIND_ANY_ORDER, false);

            for (const unit of units) {
                unit.ForceKill(true);
            }
        });
    }
}
```

:::

And the result in-game:

<StaticVideo path="/videos/SkeletalIcyDalmatian.mp4" />

## Scripting Examples and Sources

There are plenty of examples spread all across GitHub and with the contents of this guide you should now be able to understand the scripting flow of game logic and scripted abilities.
The best GitHub repo to look for Dota 2 spells is [Elfansoer's dota 2 abilities library](https://github.com/Elfansoer/dota-2-lua-abilities).
Если вы хотите проверить скрипты определенной игры на [Custom Games Workshop](https://steamcommunity.com/workshop/browse/?appid=570&browsesort=trend&section=readytouseitems), которые не опубликовали свой исходный код на GitHub (потому что они дураки), просто выполните следующие действия:

1. Подпишитесь на игру. Загрузите [Source 2 Viewer](https://s2v.app/), если вы еще этого не сделали.
2. Откройте Проводник в приложении.
3. Откройте мастерскую впк.

Вручную:

1. Проверьте URL-адрес, steamcommunity.com/sharedfiles/filedetails/?id=**скопируйте этот номер**.
2. Заходим в папку Steam -> SteamApps -> мастерская -> контент -> 570 (это папка dota)
3. Найдите папку со скопированным номером.
4. Откройте файл `.vpk` с помощью GCFScape или S2V и извлеките его содержимое куда угодно. Теперь вы можете получить доступ к его скриптам и скомпилированным моделям/частицам/звукам.

![img](/images/external/g2zNP-d1e018010e.png)

Всякий раз, когда у вас возникают сомнения по поводу того, как использовать ту или иную функцию GameAPI, можно найти примеры по всему GitHub, просто написав ее имя, дополнительно отфильтровав по lua, например:

![img](/images/external/g2yTG-93f1641866.png)

Просто убедитесь, что это действительно Dota Lua, а не другой игровой API, поскольку некоторые функции могут иметь одинаковые имена с другими движками.

Это всё, что касается основ написания скриптов. Если у вас возникнут дополнительные вопросы, [Telegram-канал](https://t.me/+4wTdvuzBPzUxOTgy) сообщества доступен круглосуточно.
