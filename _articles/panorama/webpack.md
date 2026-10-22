---
title: Объединение скриптов с веб-пакетом
author: ark120202
---
ъединение скриптов с веб-пакетом

## Что такое веб-пакет и зачем мне его использовать?

При работе с большой базой кода существует два способа организации кода. Первый — просто хранить всю логику в одном файле `.js`, который быстро становится трудно изменить и понять. Второй подход — разделение кода по функциональности, создание нескольких файлов `.js` и включение их всех в файл макета.

Хотя второй подход предпочтительнее, он также имеет некоторые проблемы. Отсутствие явных ссылок на определения значений затрудняет отслеживание происхождения определенного значения, а поскольку все файлы используют одну общую область, могут возникнуть конфликты имен.

В Lua эти проблемы решаются с помощью функции `require`, которая позволяет одному скрипту включать другой. JavaScript также получил официальное решение этой проблемы в EcmaScript 2015 — модули.

Концепция модулей довольно проста. Сначала вам нужно пометить вещи, которые вы хотите раскрыть из файла, с помощью ключевого слова `export`:

```
ts title="utils.js"
export function sayHello() {
  $.Msg('Hello, world!');
}
```
И тогда вы можете `import` его в другом файле:
```
ts title="script.js"
import { sayHello } from './utils';

sayHello();
```
Однако есть одна загвоздка: хотя модули уже давно являются частью JavaScript, многие интеграции (включая Panorama) его пока не поддерживают.

Вот где веб-пакет полезен. webpack берет ваши модули, разрешает зависимости и объединяет их в один простой файл `.js`, который можно использовать в Panorama.

Кроме того, вебпак:

- Предоставляет вам доступ к [a large ecosystem](https://www.npmjs.com/) пакетов JavaScript.
- Облегчает обмен кодом с другими пользовательскими играми с помощью пользовательских пакетов и [npm](https://www.npmjs.com/).
- Позволяет обмениваться кодом с другими средами, такими как веб-серверы на базе Node.js или Lua-часть вашей пользовательской игры, созданной с помощью [TypeScriptToLua](https://typescripttolua.github.io/).
- Объединяет все ваши инструменты преобразования кода Panorama, такие как TypeScript, Sass и генераторы кода.

## Начало работы

:::информация
Вы можете пропустить большую часть ручной настройки в этом руководстве, используя шаблоны [JavaScript](https://github.com/ark120202/dota-templates/tree/webpack) или [TypeScript](https://github.com/ark120202/dota-templates/tree/webpack-typescript).
:::

### Установка

1. Установите [Node.js](https://nodejs.org/).
2. Создайте файл `package.json` в корневом каталоге вашего проекта со следующим содержимым:
```
json
{
  "scripts": {
    "build": "node --preserve-symlinks node_modules/webpack/bin/webpack.js --config content/panorama/webpack.config.js",
    "dev": "node --preserve-symlinks node_modules/webpack/bin/webpack.js --config content/panorama/webpack.config.js --watch"
  }
}
```

:::info
We have to use `node --preserve-symlinks node_modules/webpack/bin/webpack.js` instead of just `webpack` because of reverse symlinking.
:::

3. Install dependencies by opening a command prompt and executing `npm install -D webpack@next webpack-cli webpack-panorama`.

### Basic Configuration

webpack requires you to pass a configuration file, telling it how to transform your files. As you might have noticed in the previous step, in this tutorial we'll store it in `content/panorama/webpack.config.js`.

Вот базовая конфигурация:
```
js title="content/panorama/webpack.config.js"
const path = require('path');
const { PanoramaTargetPlugin } = require('webpack-panorama');

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: {
    hud: './hud/script.js',
  },

  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  output: {
    path: path.resolve(__dirname, 'scripts/custom_game'),
  },

  resolve: {
    // Required because of reverse symlinking
    symlinks: false,
  },

  plugins: [new PanoramaTargetPlugin()],
};
```
Теперь давайте создадим несколько файлов для работы с веб-пакетом:
```
js title="content/panorama/src/hud/script.js"
import { sayHello } from '../utils';

sayHello();
```

```
js title="content/panorama/src/utils.js"
export function sayHello() {
  $.Msg('Hello, world!');
}
```
И файлы макета, чтобы Panorama запускала наш скрипт:
```
xml{4} title="content/panorama/layout/custom_game/hud.xml"
<root>
  <scripts>

    <include src="file://{resources}/scripts/custom_game/hud.js" />
  </scripts>
  <Panel />
</root>
```

```
xml{4} title="content/panorama/layout/custom_game/custom_ui_manifest.xml"
<root>
  <Panel>

    <CustomUIElement type="Hud" layoutfile="file://{resources}/layout/custom_game/hud.xml" />
  </Panel>
</root>
```
Теперь вы можете запустить `npm run build` в своем терминале, чтобы собрать проект один раз, или `npm run dev`, чтобы он перестраивал проект каждый раз, когда вы меняете свои скрипты.

После сборки проекта веб-пакет выведет пакет `content/panorama/scripts/custom_game/hud.js`.

### Использование внешних пакетов

Помимо локальных файлов сценариев, модули позволяют использовать код, написанный другими разработчиками.

Для примера добавим популярную служебную библиотеку [`lodash`](https://lodash.com/).
Сначала вам нужно добавить его в свой проект с помощью npm:
```
shell
npm install lodash
```
И затем вы можете импортировать его, как любой другой модуль:
```
js
import * as _ from 'lodash';

$.Msg(_.uniq([1, 2, 1, 3, 1, 2])); // => [1,2,3]
```
Аналогичным образом вы можете использовать пакеты, созданные специально для Panorama, например [react-panorama](react) или [`panorama-polyfill`](https://www.npmjs.com/package/panorama-polyfill).

Вы можете найти больше пакетов, созданных для Panorama, используя этот поисковый запрос: [keywords:dota, panorama](https://www.npmjs.com/search?q=keywords%3Adota%2C%20panorama).

## Загрузчики и TypeScript

Загрузчики веб-пакетов — это пакеты, которые обрабатывают ваши файлы перед тем, как веб-пакет помещает их в пакет.

Хорошим примером загрузчика является [`babel-loader`](https://www.npmjs.com/package/babel-loader), который обрабатывает ваш код с помощью Babel, позволяя вам использовать новые функции JavaScript и нестандартные расширения синтаксиса, такие как [JSX](react#jsx).
Сначала вам нужно установить несколько зависимостей:
```
shell
npm install -D babel-loader @babel/core @babel/preset-react
```
Теперь вам нужно указать веб-пакету, когда и как использовать этот загрузчик, используя раздел конфигурации `module.rules`:
```
diff title="content/panorama/webpack.config.js"
  resolve: {
    symlinks: false,
  },

+ module: {
+   rules: [
+     { test: /\.js$/, loader: 'babel-loader', options: { presets: ['@babel/preset-react'] } },
+   ],
+ },

  plugins: [new PanoramaTargetPlugin()],
```

### TypeScript

В настоящее время поддержка [TypeScript](introduction-to-panorama-ui-with-typescript) для Panorama не может быть обеспечена только с помощью загрузчика из-за способа обработки файлов сценариев, на которые имеются ссылки. Чтобы решить эту проблему, вам также необходимо использовать [`fork-ts-checker-webpack-plugin`](https://www.npmjs.com/package/fork-ts-checker-webpack-plugin).
```
shell
npm install -D typescript ts-loader fork-ts-checker-webpack-plugin
npm install panorama-types
```

```
diff title="content/panorama/webpack.config.js"
+const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  entry: {
-   hud: './hud/script.js',
+   hud: './hud/script.ts',
  },

  resolve: {
+   extensions: ['.ts', '.tsx', '...'],
    symlinks: false,
  },

+ module: {
+   rules: [
+     { test: /\.tsx?$/, loader: 'ts-loader', options: { transpileOnly: true } },
+   ],
+ },

  plugins: [
    new PanoramaTargetPlugin(),
+   new ForkTsCheckerWebpackPlugin({
+     typescript: {
+       configFile: path.resolve(__dirname, "tsconfig.json"),
+     },
+   }),
  ],
};
```

```
json title="content/panorama/tsconfig.json"
{
  "include": ["src"],
  "compilerOptions": {
    "target": "es2017",
    "lib": ["es2017"],
    "types": ["panorama-types"],
    "moduleResolution": "node",
    "strict": true
  }
}
```

## XML-файлы макета

На предыдущих шагах веб-пакет использовался только для ресурсов сценариев. Это не идеально, потому что вам придется вручную синхронизировать точки входа, структура каталогов не централизована, и вы не можете использовать веб-пакет для обработки ресурсов .css.

Решение состоит в том, чтобы позволить веб-пакету позаботиться обо всех ваших файлах Panorama.

И измените `webpack.config.js` следующим образом:
```
diff title="content/panorama/webpack.config.js"
const path = require('path');
const { PanoramaTargetPlugin } = require('webpack-panorama');

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: {
-   hud: './hud/script.js',
+   hud: { filename: 'hud/layout.xml', import: './hud/layout.xml' },
  },

  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  output: {
    path: path.resolve(__dirname, 'layout/custom_game'),
+   publicPath: 'file://{resources}/layout/custom_game/',
  },

  resolve: {
    symlinks: false,
  },

+ module: {
+   rules: [
+     { test: /\.xml$/, loader: 'webpack-panorama/lib/layout-loader' },
+     { test: /\.js$/, issuer: /\.xml$/, loader: 'webpack-panorama/lib/entry-loader' },
+   ],
+ },

  plugins: [new PanoramaTargetPlugin()],
};
```
Теперь вам нужно переместить файл макета в исходный каталог и использовать относительный путь к скрипту:
```
xml{4} title="content/panorama/src/hud/layout.xml"
<root>
  <scripts>

    <include src="./script.js" />
  </scripts>
  <Panel />
</root>
```

## Пользовательский манифест пользовательского интерфейса

Теперь вам не нужно синхронизировать точки входа в скрипты и ссылки на скрипты макета, однако вам все равно придется это делать для `custom_ui_manifest.xml`. `PanoramaManifestPlugin` позволяет вам определять точки входа в простом формате и генерирует `custom_ui_manifest.xml`, включая их.
```
diff title="content/panorama/webpack.config.js"
const path = require('path');
-const { PanoramaTargetPlugin } = require('webpack-panorama');
+const { PanoramaManifestPlugin, PanoramaTargetPlugin } = require('webpack-panorama');

/** @type {import('webpack').Configuration} */
module.exports = {
- entry: {
-   hud: { filename: 'hud/layout.xml', import: './hud/layout.xml' },
- },

  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  output: {
    path: path.resolve(__dirname, 'layout/custom_game'),
    publicPath: 'file://{resources}/layout/custom_game/',
  },

  module: ...,

  plugins: [
    new PanoramaTargetPlugin(),
+   new PanoramaManifestPlugin({
+     entries: [{ import: './hud/layout.xml', type: 'Hud' }]
+   }),
  ],
};
```

:::info
Since webpack 5 is currently in beta, some transitive dependencies might yield deprecation warnings. They can be safely ignored.
:::

`entries` option of `PanoramaManifestPlugin` accepts a list of entrypoints following this schema:

```
ts
interface ManifestEntry {
  /**
   * Module(s) that are loaded upon startup.
   */
  import: string;

  /**
   * Specifies the name of the output file on disk.
   *
   * @example
   * { import: './loading-screen/layout.xml', filename: 'custom_loading_screen.xml' }
   */
  filename?: string | null;

  /**
   * Type of a Custom UI.
   *
   * When not provided, this entry would be omitted from `custom_ui_manifest.xml` file.
   *
   * Can be defined only for XML entrypoints.
   */
  type?: ManifestEntryType | null;
}

type ManifestEntryType =
  | 'GameSetup'
  | 'HeroSelection'
  | 'Hud'
  | 'HudTopBar'
  | 'FlyoutScoreboard'
  | 'GameInfo'
  | 'EndScreen';
```

## CSS

Поскольку теперь все файлы макета обрабатываются с помощью веб-пакета, добавление нового типа ресурса ничем не отличается от добавления нового типа ресурса для JavaScript.
```
shell
npm install -D file-loader
```

```
diff title="content/panorama/webpack.config.js"
  module: {
    rules: [
      { test: /\.xml$/, loader: 'webpack-panorama/lib/layout-loader' },
      { test: /\.js$/, issuer: /\.xml$/, loader: 'webpack-panorama/lib/entry-loader' },
+     {
+       test: /\.css$/,
+       issuer: /\.xml$/,
+       loader: 'file-loader',
+       options: { name: '[path][name].css', esModule: false },
+     },
    ],
  },
```

### САСС
```
shell
npm install -D sass-loader sass
```

```
diff title="content/panorama/webpack.config.js"
  module: {
    rules: [
      { test: /\.xml$/, loader: 'webpack-panorama/lib/layout-loader' },
      { test: /\.js$/, issuer: /\.xml$/, loader: 'webpack-panorama/lib/entry-loader' },
      {
-       test: /\.css$/,
+       test: /\.(css|s[ac]ss)$/,
        issuer: /\.xml$/,
        loader: 'file-loader',
        options: { name: '[path][name].css', esModule: false },
      },
+     { test: /\.s[ac]ss$/, loader: 'sass-loader' }
    ],
  },
```
