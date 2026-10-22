---
title: Реагировать в панораме
author: ark120202
---
агировать в панораме

React — это библиотека JavaScript для создания пользовательских интерфейсов. Это позволяет разбить пользовательский интерфейс на небольшие повторно используемые строительные блоки (компоненты) и упрощает управление состоянием.

Обычно React используется для создания веб-сайтов и веб-приложений, но [`react-panorama`](https://github.com/ark120202/react-panorama) позволяет вам использовать возможности React в Dota 2.

## Установка

Чтобы не тратить время на настройку, рекомендуется начать с шаблонов [JavaScript](https://github.com/ark120202/dota-templates/tree/webpack-react) или [TypeScript](https://github.com/ark120202/dota-templates/tree/webpack-typescript-react), даже если вы интегрируете их в существующий проект.

В качестве альтернативы, если вы хотите настроить инструменты сборки самостоятельно или использовать их без каких-либо шагов сборки (UMD), вы можете воспользоваться [`react-panorama` installation guide](https://github.com/ark120202/react-panorama#installation).

## JSX

Вот базовое приложение hello-world, созданное с помощью React:
```
jsx
import React from 'react';
import { render } from 'react-panorama';

render(<Label text="Hello, world!" />, $.GetContextPanel());
```
Первый параметр, который передается функции `render`, представляет собой дерево компонентов, построенное с использованием JSX — расширения синтаксиса JavaScript.

Дерево JSX — это обычное выражение JavaScript, подобное строке или литералу объекта. Это означает, что вы можете манипулировать им, как любым обычным значением JS: хранить его в переменных, использовать в условиях или возвращать из функций.

Для получения дополнительной информации о JSX вы можете проверить [official React documentation](https://reactjs.org/docs/introducing-jsx.html).

## Компоненты

Вместо того, чтобы хранить весь ваш пользовательский интерфейс в монолитном XML-файле, React предлагает вам разделить функциональность на небольшие строительные блоки — компоненты.
В React компоненты — это простые функции, возвращающие JSX:
```
jsx
import React from 'react';
import { render } from 'react-panorama';

function App() {
  return <Label text="Hello, world!" />;
}

render(<App />, $.GetContextPanel());
```
Компоненты могут принимать параметры в качестве аргумента функции:
```
tsx
import React from 'react';
import { render } from 'react-panorama';

function HeroRow({ heroName }: { heroName: string }) {
  // [!code highlight]
  return (
    <Panel style={{ flowChildren: 'right' }}>
      <DOTAHeroImage heroimagestyle="icon" heroname={heroName} />
      <Label style={{ marginLeft: '5px' }} localizedText={heroName} />
    </Panel>
  );
}

function HeroList() {
  return (
    <Panel style={{ flowChildren: 'down' }}>
      <HeroRow heroName="npc_dota_hero_abaddon" />
      <HeroRow heroName="npc_dota_hero_abyssal_underlord" />
      <HeroRow heroName="npc_dota_hero_alchemist" />
    </Panel>
  );
}

render(<HeroList />, $.GetContextPanel());
```

## Государство

В современных приложениях React состояние обычно управляется с помощью [hooks](https://reactjs.org/docs/hooks-intro.html). Один из базовых перехватчиков, [`useState`](https://reactjs.org/docs/hooks-state.html), позволяет вам объявить переменную области компонента, которая повторно отображает компонент каждый раз, когда его значение изменяется. Вот базовый пример счетчика:
```
jsx
import React, { useState } from 'react';
import { render } from 'react-panorama';

function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);

  return (
    <Panel style={{ flowChildren: 'down' }}>
      <Label text={`Count: ${count}`} />
      <TextButton className="ButtonBevel" text="Increment" onactivate={increment} />
    </Panel>
  );
}

render(<Counter />, $.GetContextPanel());
```
Аналогичным образом вы можете использовать `useState` для привязки состояния к элементам ввода:

::: кодовая группа
```
jsx [ToggleButton]
import React, { useState } from 'react';
import { render } from 'react-panorama';

function ConditionalRendering() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Panel style={{ flowChildren: 'down' }}>
      <ToggleButton
        text="Show details"
        selected={showDetails}
        onactivate={() => setShowDetails(!showDetails)}
      />

      {showDetails && <Label text="Details!" />}
    </Panel>
  );
}

render(<ConditionalRendering />, $.GetContextPanel());
```

```
jsx [Slider]
import React, { useState } from 'react';
import { render } from 'react-panorama';

function ColorPicker() {
  const [red, setRed] = useState(0.5);
  const [green, setGreen] = useState(0.5);
  const [blue, setBlue] = useState(0.5);

  return (
    <Panel style={{ flowChildren: 'right' }}>
      <Slider value={red} onvaluechanged={(p) => setRed(p.value)} />
      <Slider value={green} onvaluechanged={(p) => setGreen(p.value)} />
      <Slider value={blue} onvaluechanged={(p) => setBlue(p.value)} />
      <Panel
        style={{
          backgroundColor: `rgb(${red * 255}, ${green * 255}, ${blue * 255})`,
          width: '125px',
          height: '125px',
        }}
      />
    </Panel>
  );
}

render(<ColorPicker />, $.GetContextPanel());
```

```
jsx [TextEntry]
import React, { useState } from 'react';
import { render } from 'react-panorama';

function ReservedText() {
  const [text, setText] = useState('');

  return (
    <Panel style={{ flowChildren: 'down' }}>
      <TextEntry text={text} ontextentrychange={(p) => setText(p.text)} />
      <Label text={`Reversed text: ${[...text].reverse().join('')}`} />
    </Panel>
  );
}

render(<ReservedText />, $.GetContextPanel());
```

:::

## Listening to events

In React, the only things that should affect what component shows are its props and state. So, in order to make component update data when a certain game event happens, you need to make event listener update component's state.

Since we can update component state only within the component itself, we also have to put our `GameEvents.Subscribe` call inside the component. However you can't register it in the render function itself, because it gets executed more often than we need to, since we need to register our listener only when the component gets mounted for the first time. That's when we have to use another builtin hook - [`useEffect`](https://reactjs.org/docs/hooks-effect.html).

`useEffect` hook is a function that usually gets called with 2 parameters. First one is the callback we want to execute, which would register our listener. The second is the list of state variables that our listener depends on. Since we don't use any state for our listener, we can just use an empty array (`[]`). Also, optionally our callback can return a cleanup function, which is called either when one of dependencies changes, or when component gets unmounted.

```
jsx
import React, { useEffect, useState } from 'react';
import { render } from 'react-panorama';

function KDA() {
  const [kills, setKills] = useState(() => Game.GetLocalPlayerInfo().player_kills);
  const [deaths, setDeaths] = useState(() => Game.GetLocalPlayerInfo().player_deaths);
  const [assists, setAssists] = useState(() => Game.GetLocalPlayerInfo().player_assists);

  useEffect(() => {
    // [!code highlight]
    const handle = GameEvents.Subscribe('dota_player_kill', () => {
      // [!code highlight]
      const playerInfo = Game.GetLocalPlayerInfo(); // [!code highlight]
      setKills(playerInfo.player_kills); // [!code highlight]
      setDeaths(playerInfo.player_deaths); // [!code highlight]
      setAssists(playerInfo.player_assists); // [!code highlight]
    }); // [!code highlight]
    // [!code highlight]
    return () => GameEvents.Unsubscribe(handle); // [!code highlight]
  }, []); // [!code highlight]

  return <Label style={{ color: 'white' }} text={`KDA: ${kills}/${deaths}/${assists}`} />;
}

render(<KDA />, $.GetContextPanel());
`
```
react-panorama` предоставляет специальный хук, который немного упрощает прослушивание игровых событий:
```
jsx
import React, { useState } from 'react';
import { render, useGameEvent } from 'react-panorama';

function KDA() {
  const [kills, setKills] = useState(() => Game.GetLocalPlayerInfo().player_kills);
  const [deaths, setDeaths] = useState(() => Game.GetLocalPlayerInfo().player_deaths);
  const [assists, setAssists] = useState(() => Game.GetLocalPlayerInfo().player_assists);

  useGameEvent(
    'dota_player_kill',
    () => {
      // [!code highlight]
      const playerInfo = Game.GetLocalPlayerInfo(); // [!code highlight]
      setKills(playerInfo.player_kills); // [!code highlight]
      setDeaths(playerInfo.player_deaths); // [!code highlight]
      setAssists(playerInfo.player_assists); // [!code highlight]
    },
    [],
  ); // [!code highlight]

  return <Label style={{ color: 'white' }} text={`KDA: ${kills}/${deaths}/${assists}`} />;
}

render(<KDA />, $.GetContextPanel());
```
Таким же образом вы можете прослушивать события пользовательского интерфейса, обновления пользовательских сетевых таблиц или просто время. `react-panorama` предоставляет [a few more custom hooks](https://github.com/ark120202/react-panorama#hooks) для распространенных случаев использования.

### Пользовательские крючки

Одна из вещей, которую React Hooks упрощает, — это повторное использование кода. Например, мы можем извлечь логику, используемую для прослушивания изменений KDA, в специальный хук `useKDA`.
```
jsx
import React, { useState } from 'react';
import { render, useGameEvent } from 'react-panorama';

function useKDA() {
  // [!code highlight]
  // Since both initializing and updating state is the same process,
  // we can extract it into a regular function
  function getKDA() {
    const playerInfo = Game.GetLocalPlayerInfo();
    return {
      kills: playerInfo.player_kills,
      deaths: playerInfo.player_deaths,
      assists: playerInfo.player_assists,
    };
  }

  const [kda, setKDA] = useState(getKDA);

  useGameEvent('dota_player_kill', () => setKDA(getKDA()), []);

  return kda;
}

function KDA() {
  const { kills, deaths, assists } = useKDA(); // [!code highlight]

  return <Label style={{ color: 'white' }} text={`KDA: ${kills}/${deaths}/${assists}`} />;
}

function KDARatio() {
  const { kills, deaths, assists } = useKDA(); // [!code highlight]
  const ratio = (kills + assists) / (deaths || 1);

  return <Label style={{ color: 'white' }} text={`KDA Ratio: ${ratio}`} />;
}

function App() {
  return (
    <Panel style={{ flowChildren: 'down' }}>
      <KDA />
      <KDARatio />
    </Panel>
  );
}

render(<App />, $.GetContextPanel());
```

## Следующие шаги

В этом руководстве рассмотрены только основы React. React имеет большую экосистему библиотек, шаблонов и статей, многие из которых применимы к Panorama. В качестве отправной точки вы можете проверить [the official React website](https://reactjs.org/) (хотя некоторые его части — [a little](https://github.com/reactjs/reactjs.org/issues/1782) [outdated](https://github.com/reactjs/reactjs.org/issues/1788)).