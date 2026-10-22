import{_ as n,o as a,c as p,ag as e}from"./chunks/framework.DUTPmUpA.js";const m=JSON.parse('{"title":"Объединение скриптов с веб-пакетом","description":"","frontmatter":{"title":"Объединение скриптов с веб-пакетом","author":"ark120202"},"headers":[],"relativePath":"panorama/webpack.md","filePath":"panorama/webpack.md"}'),l={name:"panorama/webpack.md"};function i(r,s,c,t,o,b){return a(),p("div",null,[...s[0]||(s[0]=[e(`<p>ъединение скриптов с веб-пакетом</p><h2 id="что-такое-веб-пакет-и-зачем-мне-его-использовать" tabindex="-1">Что такое веб-пакет и зачем мне его использовать? <a class="header-anchor" href="#что-такое-веб-пакет-и-зачем-мне-его-использовать" aria-label="Permalink to &quot;Что такое веб-пакет и зачем мне его использовать?&quot;">​</a></h2><p>При работе с большой базой кода существует два способа организации кода. Первый — просто хранить всю логику в одном файле <code>.js</code>, который быстро становится трудно изменить и понять. Второй подход — разделение кода по функциональности, создание нескольких файлов <code>.js</code> и включение их всех в файл макета.</p><p>Хотя второй подход предпочтительнее, он также имеет некоторые проблемы. Отсутствие явных ссылок на определения значений затрудняет отслеживание происхождения определенного значения, а поскольку все файлы используют одну общую область, могут возникнуть конфликты имен.</p><p>В Lua эти проблемы решаются с помощью функции <code>require</code>, которая позволяет одному скрипту включать другой. JavaScript также получил официальное решение этой проблемы в EcmaScript 2015 — модули.</p><p>Концепция модулей довольно проста. Сначала вам нужно пометить вещи, которые вы хотите раскрыть из файла, с помощью ключевого слова <code>export</code>:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ts title=&quot;utils.js&quot;</span></span>
<span class="line"><span>export function sayHello() {</span></span>
<span class="line"><span>  $.Msg(&#39;Hello, world!&#39;);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>И тогда вы можете <code>import</code> его в другом файле:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ts title=&quot;script.js&quot;</span></span>
<span class="line"><span>import { sayHello } from &#39;./utils&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sayHello();</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Однако есть одна загвоздка: хотя модули уже давно являются частью JavaScript, многие интеграции (включая Panorama) его пока не поддерживают.</p><p>Вот где веб-пакет полезен. webpack берет ваши модули, разрешает зависимости и объединяет их в один простой файл <code>.js</code>, который можно использовать в Panorama.</p><p>Кроме того, вебпак:</p><ul><li>Предоставляет вам доступ к <a href="https://www.npmjs.com/" target="_blank" rel="noreferrer">a large ecosystem</a> пакетов JavaScript.</li><li>Облегчает обмен кодом с другими пользовательскими играми с помощью пользовательских пакетов и <a href="https://www.npmjs.com/" target="_blank" rel="noreferrer">npm</a>.</li><li>Позволяет обмениваться кодом с другими средами, такими как веб-серверы на базе Node.js или Lua-часть вашей пользовательской игры, созданной с помощью <a href="https://typescripttolua.github.io/" target="_blank" rel="noreferrer">TypeScriptToLua</a>.</li><li>Объединяет все ваши инструменты преобразования кода Panorama, такие как TypeScript, Sass и генераторы кода.</li></ul><h2 id="начало-работы" tabindex="-1">Начало работы <a class="header-anchor" href="#начало-работы" aria-label="Permalink to &quot;Начало работы&quot;">​</a></h2><p>:::информация Вы можете пропустить большую часть ручной настройки в этом руководстве, используя шаблоны <a href="https://github.com/ark120202/dota-templates/tree/webpack" target="_blank" rel="noreferrer">JavaScript</a> или <a href="https://github.com/ark120202/dota-templates/tree/webpack-typescript" target="_blank" rel="noreferrer">TypeScript</a>. :::</p><h3 id="установка" tabindex="-1">Установка <a class="header-anchor" href="#установка" aria-label="Permalink to &quot;Установка&quot;">​</a></h3><ol><li>Установите <a href="https://nodejs.org/" target="_blank" rel="noreferrer">Node.js</a>.</li><li>Создайте файл <code>package.json</code> в корневом каталоге вашего проекта со следующим содержимым:</li></ol><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>json</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  &quot;scripts&quot;: {</span></span>
<span class="line"><span>    &quot;build&quot;: &quot;node --preserve-symlinks node_modules/webpack/bin/webpack.js --config content/panorama/webpack.config.js&quot;,</span></span>
<span class="line"><span>    &quot;dev&quot;: &quot;node --preserve-symlinks node_modules/webpack/bin/webpack.js --config content/panorama/webpack.config.js --watch&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p>We have to use <code>node --preserve-symlinks node_modules/webpack/bin/webpack.js</code> instead of just <code>webpack</code> because of reverse symlinking.</p></div><ol start="3"><li>Install dependencies by opening a command prompt and executing <code>npm install -D webpack@next webpack-cli webpack-panorama</code>.</li></ol><h3 id="basic-configuration" tabindex="-1">Basic Configuration <a class="header-anchor" href="#basic-configuration" aria-label="Permalink to &quot;Basic Configuration&quot;">​</a></h3><p>webpack requires you to pass a configuration file, telling it how to transform your files. As you might have noticed in the previous step, in this tutorial we&#39;ll store it in <code>content/panorama/webpack.config.js</code>.</p><p>Вот базовая конфигурация:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>js title=&quot;content/panorama/webpack.config.js&quot;</span></span>
<span class="line"><span>const path = require(&#39;path&#39;);</span></span>
<span class="line"><span>const { PanoramaTargetPlugin } = require(&#39;webpack-panorama&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/** @type {import(&#39;webpack&#39;).Configuration} */</span></span>
<span class="line"><span>module.exports = {</span></span>
<span class="line"><span>  entry: {</span></span>
<span class="line"><span>    hud: &#39;./hud/script.js&#39;,</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  mode: &#39;development&#39;,</span></span>
<span class="line"><span>  context: path.resolve(__dirname, &#39;src&#39;),</span></span>
<span class="line"><span>  output: {</span></span>
<span class="line"><span>    path: path.resolve(__dirname, &#39;scripts/custom_game&#39;),</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  resolve: {</span></span>
<span class="line"><span>    // Required because of reverse symlinking</span></span>
<span class="line"><span>    symlinks: false,</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  plugins: [new PanoramaTargetPlugin()],</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>Теперь давайте создадим несколько файлов для работы с веб-пакетом:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>js title=&quot;content/panorama/src/hud/script.js&quot;</span></span>
<span class="line"><span>import { sayHello } from &#39;../utils&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sayHello();</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>js title=&quot;content/panorama/src/utils.js&quot;</span></span>
<span class="line"><span>export function sayHello() {</span></span>
<span class="line"><span>  $.Msg(&#39;Hello, world!&#39;);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>И файлы макета, чтобы Panorama запускала наш скрипт:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>xml{4} title=&quot;content/panorama/layout/custom_game/hud.xml&quot;</span></span>
<span class="line"><span>&lt;root&gt;</span></span>
<span class="line"><span>  &lt;scripts&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;include src=&quot;file://{resources}/scripts/custom_game/hud.js&quot; /&gt;</span></span>
<span class="line"><span>  &lt;/scripts&gt;</span></span>
<span class="line"><span>  &lt;Panel /&gt;</span></span>
<span class="line"><span>&lt;/root&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>xml{4} title=&quot;content/panorama/layout/custom_game/custom_ui_manifest.xml&quot;</span></span>
<span class="line"><span>&lt;root&gt;</span></span>
<span class="line"><span>  &lt;Panel&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;CustomUIElement type=&quot;Hud&quot; layoutfile=&quot;file://{resources}/layout/custom_game/hud.xml&quot; /&gt;</span></span>
<span class="line"><span>  &lt;/Panel&gt;</span></span>
<span class="line"><span>&lt;/root&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>Теперь вы можете запустить <code>npm run build</code> в своем терминале, чтобы собрать проект один раз, или <code>npm run dev</code>, чтобы он перестраивал проект каждый раз, когда вы меняете свои скрипты.</p><p>После сборки проекта веб-пакет выведет пакет <code>content/panorama/scripts/custom_game/hud.js</code>.</p><h3 id="использование-внешних-пакетов" tabindex="-1">Использование внешних пакетов <a class="header-anchor" href="#использование-внешних-пакетов" aria-label="Permalink to &quot;Использование внешних пакетов&quot;">​</a></h3><p>Помимо локальных файлов сценариев, модули позволяют использовать код, написанный другими разработчиками.</p><p>Для примера добавим популярную служебную библиотеку <a href="https://lodash.com/" target="_blank" rel="noreferrer"><code>lodash</code></a>. Сначала вам нужно добавить его в свой проект с помощью npm:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>shell</span></span>
<span class="line"><span>npm install lodash</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>И затем вы можете импортировать его, как любой другой модуль:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>js</span></span>
<span class="line"><span>import * as _ from &#39;lodash&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$.Msg(_.uniq([1, 2, 1, 3, 1, 2])); // =&gt; [1,2,3]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Аналогичным образом вы можете использовать пакеты, созданные специально для Panorama, например <a href="./react">react-panorama</a> или <a href="https://www.npmjs.com/package/panorama-polyfill" target="_blank" rel="noreferrer"><code>panorama-polyfill</code></a>.</p><p>Вы можете найти больше пакетов, созданных для Panorama, используя этот поисковый запрос: <a href="https://www.npmjs.com/search?q=keywords%3Adota%2C%20panorama" target="_blank" rel="noreferrer">keywords:dota, panorama</a>.</p><h2 id="загрузчики-и-typescript" tabindex="-1">Загрузчики и TypeScript <a class="header-anchor" href="#загрузчики-и-typescript" aria-label="Permalink to &quot;Загрузчики и TypeScript&quot;">​</a></h2><p>Загрузчики веб-пакетов — это пакеты, которые обрабатывают ваши файлы перед тем, как веб-пакет помещает их в пакет.</p><p>Хорошим примером загрузчика является <a href="https://www.npmjs.com/package/babel-loader" target="_blank" rel="noreferrer"><code>babel-loader</code></a>, который обрабатывает ваш код с помощью Babel, позволяя вам использовать новые функции JavaScript и нестандартные расширения синтаксиса, такие как <a href="./react#jsx">JSX</a>. Сначала вам нужно установить несколько зависимостей:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>shell</span></span>
<span class="line"><span>npm install -D babel-loader @babel/core @babel/preset-react</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Теперь вам нужно указать веб-пакету, когда и как использовать этот загрузчик, используя раздел конфигурации <code>module.rules</code>:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>diff title=&quot;content/panorama/webpack.config.js&quot;</span></span>
<span class="line"><span>  resolve: {</span></span>
<span class="line"><span>    symlinks: false,</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>+ module: {</span></span>
<span class="line"><span>+   rules: [</span></span>
<span class="line"><span>+     { test: /\\.js$/, loader: &#39;babel-loader&#39;, options: { presets: [&#39;@babel/preset-react&#39;] } },</span></span>
<span class="line"><span>+   ],</span></span>
<span class="line"><span>+ },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  plugins: [new PanoramaTargetPlugin()],</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="typescript" tabindex="-1">TypeScript <a class="header-anchor" href="#typescript" aria-label="Permalink to &quot;TypeScript&quot;">​</a></h3><p>В настоящее время поддержка <a href="./introduction-to-panorama-ui-with-typescript">TypeScript</a> для Panorama не может быть обеспечена только с помощью загрузчика из-за способа обработки файлов сценариев, на которые имеются ссылки. Чтобы решить эту проблему, вам также необходимо использовать <a href="https://www.npmjs.com/package/fork-ts-checker-webpack-plugin" target="_blank" rel="noreferrer"><code>fork-ts-checker-webpack-plugin</code></a>.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>shell</span></span>
<span class="line"><span>npm install -D typescript ts-loader fork-ts-checker-webpack-plugin</span></span>
<span class="line"><span>npm install panorama-types</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>diff title=&quot;content/panorama/webpack.config.js&quot;</span></span>
<span class="line"><span>+const ForkTsCheckerWebpackPlugin = require(&quot;fork-ts-checker-webpack-plugin&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>module.exports = {</span></span>
<span class="line"><span>  entry: {</span></span>
<span class="line"><span>-   hud: &#39;./hud/script.js&#39;,</span></span>
<span class="line"><span>+   hud: &#39;./hud/script.ts&#39;,</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  resolve: {</span></span>
<span class="line"><span>+   extensions: [&#39;.ts&#39;, &#39;.tsx&#39;, &#39;...&#39;],</span></span>
<span class="line"><span>    symlinks: false,</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>+ module: {</span></span>
<span class="line"><span>+   rules: [</span></span>
<span class="line"><span>+     { test: /\\.tsx?$/, loader: &#39;ts-loader&#39;, options: { transpileOnly: true } },</span></span>
<span class="line"><span>+   ],</span></span>
<span class="line"><span>+ },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  plugins: [</span></span>
<span class="line"><span>    new PanoramaTargetPlugin(),</span></span>
<span class="line"><span>+   new ForkTsCheckerWebpackPlugin({</span></span>
<span class="line"><span>+     typescript: {</span></span>
<span class="line"><span>+       configFile: path.resolve(__dirname, &quot;tsconfig.json&quot;),</span></span>
<span class="line"><span>+     },</span></span>
<span class="line"><span>+   }),</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>json title=&quot;content/panorama/tsconfig.json&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  &quot;include&quot;: [&quot;src&quot;],</span></span>
<span class="line"><span>  &quot;compilerOptions&quot;: {</span></span>
<span class="line"><span>    &quot;target&quot;: &quot;es2017&quot;,</span></span>
<span class="line"><span>    &quot;lib&quot;: [&quot;es2017&quot;],</span></span>
<span class="line"><span>    &quot;types&quot;: [&quot;panorama-types&quot;],</span></span>
<span class="line"><span>    &quot;moduleResolution&quot;: &quot;node&quot;,</span></span>
<span class="line"><span>    &quot;strict&quot;: true</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="xml-фаилы-макета" tabindex="-1">XML-файлы макета <a class="header-anchor" href="#xml-фаилы-макета" aria-label="Permalink to &quot;XML-файлы макета&quot;">​</a></h2><p>На предыдущих шагах веб-пакет использовался только для ресурсов сценариев. Это не идеально, потому что вам придется вручную синхронизировать точки входа, структура каталогов не централизована, и вы не можете использовать веб-пакет для обработки ресурсов .css.</p><p>Решение состоит в том, чтобы позволить веб-пакету позаботиться обо всех ваших файлах Panorama.</p><p>И измените <code>webpack.config.js</code> следующим образом:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>diff title=&quot;content/panorama/webpack.config.js&quot;</span></span>
<span class="line"><span>const path = require(&#39;path&#39;);</span></span>
<span class="line"><span>const { PanoramaTargetPlugin } = require(&#39;webpack-panorama&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/** @type {import(&#39;webpack&#39;).Configuration} */</span></span>
<span class="line"><span>module.exports = {</span></span>
<span class="line"><span>  entry: {</span></span>
<span class="line"><span>-   hud: &#39;./hud/script.js&#39;,</span></span>
<span class="line"><span>+   hud: { filename: &#39;hud/layout.xml&#39;, import: &#39;./hud/layout.xml&#39; },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  mode: &#39;development&#39;,</span></span>
<span class="line"><span>  context: path.resolve(__dirname, &#39;src&#39;),</span></span>
<span class="line"><span>  output: {</span></span>
<span class="line"><span>    path: path.resolve(__dirname, &#39;layout/custom_game&#39;),</span></span>
<span class="line"><span>+   publicPath: &#39;file://{resources}/layout/custom_game/&#39;,</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  resolve: {</span></span>
<span class="line"><span>    symlinks: false,</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>+ module: {</span></span>
<span class="line"><span>+   rules: [</span></span>
<span class="line"><span>+     { test: /\\.xml$/, loader: &#39;webpack-panorama/lib/layout-loader&#39; },</span></span>
<span class="line"><span>+     { test: /\\.js$/, issuer: /\\.xml$/, loader: &#39;webpack-panorama/lib/entry-loader&#39; },</span></span>
<span class="line"><span>+   ],</span></span>
<span class="line"><span>+ },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  plugins: [new PanoramaTargetPlugin()],</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><p>Теперь вам нужно переместить файл макета в исходный каталог и использовать относительный путь к скрипту:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>xml{4} title=&quot;content/panorama/src/hud/layout.xml&quot;</span></span>
<span class="line"><span>&lt;root&gt;</span></span>
<span class="line"><span>  &lt;scripts&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;include src=&quot;./script.js&quot; /&gt;</span></span>
<span class="line"><span>  &lt;/scripts&gt;</span></span>
<span class="line"><span>  &lt;Panel /&gt;</span></span>
<span class="line"><span>&lt;/root&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="пользовательскии-манифест-пользовательского-интерфеиса" tabindex="-1">Пользовательский манифест пользовательского интерфейса <a class="header-anchor" href="#пользовательскии-манифест-пользовательского-интерфеиса" aria-label="Permalink to &quot;Пользовательский манифест пользовательского интерфейса&quot;">​</a></h2><p>Теперь вам не нужно синхронизировать точки входа в скрипты и ссылки на скрипты макета, однако вам все равно придется это делать для <code>custom_ui_manifest.xml</code>. <code>PanoramaManifestPlugin</code> позволяет вам определять точки входа в простом формате и генерирует <code>custom_ui_manifest.xml</code>, включая их.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>diff title=&quot;content/panorama/webpack.config.js&quot;</span></span>
<span class="line"><span>const path = require(&#39;path&#39;);</span></span>
<span class="line"><span>-const { PanoramaTargetPlugin } = require(&#39;webpack-panorama&#39;);</span></span>
<span class="line"><span>+const { PanoramaManifestPlugin, PanoramaTargetPlugin } = require(&#39;webpack-panorama&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/** @type {import(&#39;webpack&#39;).Configuration} */</span></span>
<span class="line"><span>module.exports = {</span></span>
<span class="line"><span>- entry: {</span></span>
<span class="line"><span>-   hud: { filename: &#39;hud/layout.xml&#39;, import: &#39;./hud/layout.xml&#39; },</span></span>
<span class="line"><span>- },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  mode: &#39;development&#39;,</span></span>
<span class="line"><span>  context: path.resolve(__dirname, &#39;src&#39;),</span></span>
<span class="line"><span>  output: {</span></span>
<span class="line"><span>    path: path.resolve(__dirname, &#39;layout/custom_game&#39;),</span></span>
<span class="line"><span>    publicPath: &#39;file://{resources}/layout/custom_game/&#39;,</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  module: ...,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  plugins: [</span></span>
<span class="line"><span>    new PanoramaTargetPlugin(),</span></span>
<span class="line"><span>+   new PanoramaManifestPlugin({</span></span>
<span class="line"><span>+     entries: [{ import: &#39;./hud/layout.xml&#39;, type: &#39;Hud&#39; }]</span></span>
<span class="line"><span>+   }),</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p>Since webpack 5 is currently in beta, some transitive dependencies might yield deprecation warnings. They can be safely ignored.</p></div><p><code>entries</code> option of <code>PanoramaManifestPlugin</code> accepts a list of entrypoints following this schema:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ts</span></span>
<span class="line"><span>interface ManifestEntry {</span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>   * Module(s) that are loaded upon startup.</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span>  import: string;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>   * Specifies the name of the output file on disk.</span></span>
<span class="line"><span>   *</span></span>
<span class="line"><span>   * @example</span></span>
<span class="line"><span>   * { import: &#39;./loading-screen/layout.xml&#39;, filename: &#39;custom_loading_screen.xml&#39; }</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span>  filename?: string | null;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>   * Type of a Custom UI.</span></span>
<span class="line"><span>   *</span></span>
<span class="line"><span>   * When not provided, this entry would be omitted from \`custom_ui_manifest.xml\` file.</span></span>
<span class="line"><span>   *</span></span>
<span class="line"><span>   * Can be defined only for XML entrypoints.</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span>  type?: ManifestEntryType | null;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type ManifestEntryType =</span></span>
<span class="line"><span>  | &#39;GameSetup&#39;</span></span>
<span class="line"><span>  | &#39;HeroSelection&#39;</span></span>
<span class="line"><span>  | &#39;Hud&#39;</span></span>
<span class="line"><span>  | &#39;HudTopBar&#39;</span></span>
<span class="line"><span>  | &#39;FlyoutScoreboard&#39;</span></span>
<span class="line"><span>  | &#39;GameInfo&#39;</span></span>
<span class="line"><span>  | &#39;EndScreen&#39;;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><h2 id="css" tabindex="-1">CSS <a class="header-anchor" href="#css" aria-label="Permalink to &quot;CSS&quot;">​</a></h2><p>Поскольку теперь все файлы макета обрабатываются с помощью веб-пакета, добавление нового типа ресурса ничем не отличается от добавления нового типа ресурса для JavaScript.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>shell</span></span>
<span class="line"><span>npm install -D file-loader</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>diff title=&quot;content/panorama/webpack.config.js&quot;</span></span>
<span class="line"><span>  module: {</span></span>
<span class="line"><span>    rules: [</span></span>
<span class="line"><span>      { test: /\\.xml$/, loader: &#39;webpack-panorama/lib/layout-loader&#39; },</span></span>
<span class="line"><span>      { test: /\\.js$/, issuer: /\\.xml$/, loader: &#39;webpack-panorama/lib/entry-loader&#39; },</span></span>
<span class="line"><span>+     {</span></span>
<span class="line"><span>+       test: /\\.css$/,</span></span>
<span class="line"><span>+       issuer: /\\.xml$/,</span></span>
<span class="line"><span>+       loader: &#39;file-loader&#39;,</span></span>
<span class="line"><span>+       options: { name: &#39;[path][name].css&#39;, esModule: false },</span></span>
<span class="line"><span>+     },</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>  },</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="сасс" tabindex="-1">САСС <a class="header-anchor" href="#сасс" aria-label="Permalink to &quot;САСС&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>shell</span></span>
<span class="line"><span>npm install -D sass-loader sass</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>diff title=&quot;content/panorama/webpack.config.js&quot;</span></span>
<span class="line"><span>  module: {</span></span>
<span class="line"><span>    rules: [</span></span>
<span class="line"><span>      { test: /\\.xml$/, loader: &#39;webpack-panorama/lib/layout-loader&#39; },</span></span>
<span class="line"><span>      { test: /\\.js$/, issuer: /\\.xml$/, loader: &#39;webpack-panorama/lib/entry-loader&#39; },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>-       test: /\\.css$/,</span></span>
<span class="line"><span>+       test: /\\.(css|s[ac]ss)$/,</span></span>
<span class="line"><span>        issuer: /\\.xml$/,</span></span>
<span class="line"><span>        loader: &#39;file-loader&#39;,</span></span>
<span class="line"><span>        options: { name: &#39;[path][name].css&#39;, esModule: false },</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>+     { test: /\\.s[ac]ss$/, loader: &#39;sass-loader&#39; }</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>  },</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div>`,71)])])}const d=n(l,[["render",i]]);export{m as __pageData,d as default};
