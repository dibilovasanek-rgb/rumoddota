---
title: Введение в пользовательский интерфейс Panorama с TypeScript
author: Perry
steamId: '76561198046986723'
date: 26.07.2017
---
льзовательский интерфейс Panorama с TypeScript

## Что такое TypeScript и почему мне следует его использовать

[TypeScript](https://www.typescriptlang.org/) — это язык, созданный людьми и для людей, которые были недовольны Javascript и всеми его особенностями и недостатками. TypeScript — это язык со своим собственным синтаксисом (хотя и похожим на Javascript), который компилируется в Javascript таким образом, что позволяет избежать многих проблем Javascript.

Название TypeScript происходит от того факта, что язык по сути представляет собой Javascript с проверкой типов, но, кроме того, он поддерживает все новейшие языковые конструкции Javascript, которые не поддерживаются Panorama.

**Плюсы использования TypeScript:**

- Проверка типа
- Дополнение кода по типу (также для API!)
- Предотвращает проблемы с обзором
- Правильные конструкции ООП (такие как классы, интерфейсы, наследование...)

**Минусы использования TypeScript:**

- Требует некоторой настройки
- Не забудьте скомпилировать
- Требуются хорошие определения для панорамы.

## Как установить TypeScript
1. Установите [Node.js](https://nodejs.org/en/), который используется для компиляции TypeScript.
2. Создайте файл `package.json` в корневом каталоге вашего проекта с содержимым как минимум `{}`.
3. Установите необходимые зависимости, открыв командную строку и выполнив `npm install -D typescript panorama-types`.

Вот и все, после этих трех шагов вы готовы начать использовать TypeScript.

[Visual Studio Code](https://code.visualstudio.com/) поддерживает TypeScript «из коробки». Для других редакторов вам, возможно, придется установить плагин, чтобы получить языковые функции (например, [Sublime TypeScript plugin](https://github.com/Microsoft/TypeScript-Sublime-Plugin#installation), доступный через менеджер пакетов Sublime Text).

## Как настроить TypeScript для вашего дополнения к Dota

Для TypeScript требуется `tsconfig.json`, используемый для его настройки для вашего проекта. Поместите его в каталог `content/panorama` вашего дополнения. Вы можете настроить все настройки самостоятельно, но я обычно ставлю это на самые строгие настройки. Моя предпочтительная конфигурация:
```
json
{
  "compilerOptions": {
    "target": "es2017",
    "lib": ["es2017"],
    "types": ["panorama-types"],
    "strict": true
  }
}
```
Структура каталогов содержимого вашего аддона должна быть примерно такой:
```
content/dota_addons/[addon]/
    ...
    panorama/
        layout/
        scripts/
        styles/
        tsconfig.json
```

## Ваш первый пользовательский интерфейс TypeScript

Чтобы проиллюстрировать, почему мне нравится использовать TypeScript для модульного пользовательского интерфейса, я приведу небольшой пример. Мы будем делать портреты героев с именем игрока и полоской здоровья: ![What we are making](/images/external/ZrqqlFo.png 'Example UI').

Поскольку это руководство посвящено TypeScript, я просто кратко приведу xml и css, это стандартные вещи:
```
xml
<root>
    <styles>
        <include src="file://{resources}/styles/custom_game/example.css" />
    </styles>

    <scripts>
        <include src="file://{resources}/scripts/custom_game/PlayerPortrait.js" />
        <include src="file://{resources}/scripts/custom_game/ExampleUI.js" />
    </scripts>

    <snippets>
        <snippet name="PlayerPortrait">
            <Panel class="PlayerPortrait" hittest="false">
                <Image id="HeroImage" hittest="false" />
                <Label id="PlayerName" />
                <Panel class="HealthContainer">
                    <Panel id="HealthBar" />
                </Panel>
            </Panel>
        </snippet>
    </snippets>

    <Panel hittest="false" style="width: 100%; height: 100%;">
        <Panel id="HeroPortraits" />
    </Panel>
</root>
```
CSS:
```
css
#HeroPortraits {
  width: 300px;
  height: 650px;
  margin-top: 150px;
  flow-children: down;
}
.PlayerPortrait {
  background-color: blue;
  height: 80px;
  width: 300px;
  margin-bottom: 10px;
}
#HeroImage {
  width: 80px;
  height: 80px;
  background-color: black;
}
#PlayerName {
  color: white;
  font-size: 25px;
  margin-top: 10px;
  margin-left: 90px;
}
.HealthContainer {
  width: 200px;
  height: 20px;
  x: 90px;
  y: 50px;
  background-color: black;
}
#HealthBar {
  height: 20px;
  width: 50%;

  background-color: green;
}
```
Как вы можете видеть, XML этой части пользовательского интерфейса содержит фрагмент, содержащий XML портрета игрока, содержащий изображение героя, метку для имени игрока, а также контейнер здоровья и полосу здоровья внутри этого контейнера. CSS применяет к этому простую компоновку.

## Написание TypeScript для вашего пользовательского интерфейса

Сначала мы хотим определить класс нашего пользовательского интерфейса и связать его с XML. Мы делаем это, беря существующую панель и оборачивая ее в машинописный класс следующим образом:
```
typescript
class ExampleUI {
  // Instance variables
  panel: Panel;

  // ExampleUI constructor
  constructor(panel: Panel) {
    this.panel = panel;
    $.Msg(panel); // Print the panel
  }
}

let ui = new ExampleUI($.GetContextPanel());
```
Ничего особенного: мы по сути создаем новый объект exampleUI в файле exampleUI.ts из контекстной панели, так что весь этот XML-файл теперь является экземпляром класса exampleUI. Если вы создадите это, нажав **ctrl+b** в Sublime, вы увидите, что он создает новый скомпилированный файл exampleUI.js с тем же именем. Этот скомпилированный файл загружается Panorama. Если вы загрузите игровой режим на этом этапе, вы должны увидеть в консоли отпечаток вашей панели пользовательского интерфейса.

Теперь создадим класс для портрета героя. В этом случае мы не оборачиваем существующий элемент, а создаем панель в конструкторе. Для этого нам все еще нужна родительская панель, поэтому мы требуем ее в качестве параметра для конструктора, а также имя героя и имя игрока. После создания панели и загрузки в нее фрагмента мы ищем некоторые из ее дочерних элементов и сохраняем их на будущее.
```
typescript
class PlayerPortrait {
  // Instance variables
  panel: Panel;
  heroImage: ImagePanel;
  playerLabel: LabelPanel;
  hpBar: Panel;

  constructor(parent: Panel, heroName: string, playerName: string) {
    // Create new panel
    const panel = $.CreatePanel('Panel', parent, '');
    this.panel = panel;

    // Load snippet into panel
    panel.BLoadLayoutSnippet('PlayerPortrait');

    // Find components
    this.heroImage = panel.FindChildTraverse('HeroImage') as ImagePanel;
    this.playerLabel = panel.FindChildTraverse('PlayerName') as LabelPanel;
    this.hpBar = panel.FindChildTraverse('HealthBar')!;

    // Set player name label
    this.playerLabel.text = playerName;

    // Set hero image
    this.heroImage.SetImage('s2r://panorama/images/heroes/' + heroName + '_png.vtex');

    // Initialise health at 100%
    this.SetHealthPercent(100);
  }

  // Set the health bar to a certain percentage (0-100)
  SetHealthPercent(percentage: number) {
    this.hpBar.style.width = Math.floor(percentage) + '%';
  }
}
```
Это сохраняется во втором файле **PlayerPortrait.ts**, который компилируется в PlayerPortrait.js. Поэтому этот файл также включен в раздел сценариев XML (см. выше).

Конструктор просто создает новую панель и загружает в нее фрагмент, а затем устанавливает некоторые значения по умолчанию. Класс также определяет функцию SetHealthPercent, которая управляет полосой здоровья.

Теперь мы возвращаемся к классу exampleUI и создаем пару экземпляров PlayerPortrait для элемента PlayerPortraits:
```
typescript
class ExampleUI {
  // Instance variables
  panel: Panel;

  // ExampleUI constructor
  constructor(panel: Panel) {
    this.panel = panel;

    // Find container element
    const container = this.panel.FindChild('HeroPortraits')!;

    // Create portrait for player 0, 1 and 2
    const portrait0 = new PlayerPortrait(container, 'npc_dota_hero_juggernaut', 'Player0');
    const portrait1 = new PlayerPortrait(container, 'npc_dota_hero_omniknight', 'Player1');
    const portrait2 = new PlayerPortrait(container, 'npc_dota_hero_invoker', 'Player2');

    // Set HP of player 1 and 2 to a different value
    portrait0.SetHealthPercent(80);
    portrait2.SetHealthPercent(20);
  }
}

let ui = new ExampleUI($.GetContextPanel());
```
Теперь ваш пользовательский интерфейс должен выглядеть так, как на снимке экрана, который мы собирались сделать вначале.

## Расширенный типскриптинг

Этот пользовательский интерфейс бесполезен для реальной игры, поэтому давайте сделаем что-нибудь посложнее. Мы хотим сохранить портреты игроков, а затем всякий раз, когда мы получаем событие об изменении HP игрока, мы хотим получить правильный экземпляр PlayerPortrait.

Мы делаем это, добавляя в exampleUI еще одну переменную экземпляра — карту, которая сопоставляет идентификаторы playerID с правильным экземпляром PlayerPortrait. При создании экземпляров PlayerPortrait мы помещаем их на карту. Когда мы получаем событие hp_changed, мы обновляем соответствующую панель. Тип этой карты можно выразить в TypeScript как `{[playerID: number]: PlayerPortrait}`.

Одним из преимуществ TypeScript является то, что вы можете явно определить, какие события вы получаете и каково их содержимое. Мы определяем событие HPChanged следующим образом:
```
typescript
interface HPChangedEvent {
  playerID: PlayerID;
  hpPercentage: number;
}
```
Объединив все это, наш файл exampleUI.ts теперь выглядит следующим образом:
```
typescript
interface HPChangedEvent {
  playerID: PlayerID;
  hpPercentage: number;
}

class ExampleUI {
  // Instance variables
  panel: Panel;
  playerPanels: Partial<Record<PlayerID, PlayerPortrait>> = {}; // A map with number keys and PlayerPortrait values

  // ExampleUI constructor
  constructor(panel: Panel) {
    this.panel = panel;

    const container = this.panel.FindChild('HeroPortraits')!;
    container.RemoveAndDeleteChildren();

    // Create portrait for player 0, 1 and 2
    this.playerPanels[0] = new PlayerPortrait(container, 'npc_dota_hero_juggernaut', 'Player0');
    this.playerPanels[1] = new PlayerPortrait(container, 'npc_dota_hero_omniknight', 'Player1');
    this.playerPanels[2] = new PlayerPortrait(container, 'npc_dota_hero_invoker', 'Player2');

    // Listen for health changed event, when it fires, handle it with this.OnHPChanged
    GameEvents.Subscribe<HPChangedEvent>('hp_changed', (event) => this.OnHPChanged(event));
  }

  // Event handler for HP Changed event
  OnHPChanged(event: HPChangedEvent) {
    // Get portrait for this player
    const playerPortrait = this.playerPanels[event.playerID];

    // Set HP on the player panel
    playerPortrait.SetHealthPercent(event.hpPercentage);
  }
}

let ui = new ExampleUI($.GetContextPanel());
```
Мы просто связали обработчик события `hp_changed` в конструкторе нашего примера пользовательского интерфейса, и всякий раз, когда это происходит, вызывается OnHPChanged, который ищет портрет игрока на карте и вызывает SetHealthPercent для портрета.

## Резюме

В заключение я надеюсь, что убедил вас, что TypeScript помогает писать читаемые модульные сценарии пользовательского интерфейса в Panorama. TypeScript помогает вам находить ошибки ввода перед компиляцией и даже предотвращает ошибки, принимая во внимание область видимости. Кроме того, очень полезно автодополнение кода для API панорамы. Чем больше я использую TypeScript для написания Panorama, тем больше меня впечатляет его полезность. Надеюсь, вы попробуете и откроете для себя.