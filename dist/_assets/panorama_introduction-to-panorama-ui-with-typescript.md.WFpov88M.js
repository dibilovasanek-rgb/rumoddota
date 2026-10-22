import{_ as s,o as a,c as p,ag as e}from"./chunks/framework.DUTPmUpA.js";const l="/_assets/ZrqqlFo.Dn5woMKW.png",d=JSON.parse('{"title":"Введение в пользовательский интерфейс Panorama с TypeScript","description":"","frontmatter":{"title":"Введение в пользовательский интерфейс Panorama с TypeScript","author":"Perry","steamId":"76561198046986723","date":"26.07.2017"},"headers":[],"relativePath":"panorama/introduction-to-panorama-ui-with-typescript.md","filePath":"panorama/introduction-to-panorama-ui-with-typescript.md"}'),r={name:"panorama/introduction-to-panorama-ui-with-typescript.md"};function i(t,n,c,b,o,u){return a(),p("div",null,[...n[0]||(n[0]=[e(`<p>льзовательский интерфейс Panorama с TypeScript</p><h2 id="что-такое-typescript-и-почему-мне-следует-его-использовать" tabindex="-1">Что такое TypeScript и почему мне следует его использовать <a class="header-anchor" href="#что-такое-typescript-и-почему-мне-следует-его-использовать" aria-label="Permalink to &quot;Что такое TypeScript и почему мне следует его использовать&quot;">​</a></h2><p><a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">TypeScript</a> — это язык, созданный людьми и для людей, которые были недовольны Javascript и всеми его особенностями и недостатками. TypeScript — это язык со своим собственным синтаксисом (хотя и похожим на Javascript), который компилируется в Javascript таким образом, что позволяет избежать многих проблем Javascript.</p><p>Название TypeScript происходит от того факта, что язык по сути представляет собой Javascript с проверкой типов, но, кроме того, он поддерживает все новейшие языковые конструкции Javascript, которые не поддерживаются Panorama.</p><p><strong>Плюсы использования TypeScript:</strong></p><ul><li>Проверка типа</li><li>Дополнение кода по типу (также для API!)</li><li>Предотвращает проблемы с обзором</li><li>Правильные конструкции ООП (такие как классы, интерфейсы, наследование...)</li></ul><p><strong>Минусы использования TypeScript:</strong></p><ul><li>Требует некоторой настройки</li><li>Не забудьте скомпилировать</li><li>Требуются хорошие определения для панорамы.</li></ul><h2 id="как-установить-typescript" tabindex="-1">Как установить TypeScript <a class="header-anchor" href="#как-установить-typescript" aria-label="Permalink to &quot;Как установить TypeScript&quot;">​</a></h2><ol><li>Установите <a href="https://nodejs.org/en/" target="_blank" rel="noreferrer">Node.js</a>, который используется для компиляции TypeScript.</li><li>Создайте файл <code>package.json</code> в корневом каталоге вашего проекта с содержимым как минимум <code>{}</code>.</li><li>Установите необходимые зависимости, открыв командную строку и выполнив <code>npm install -D typescript panorama-types</code>.</li></ol><p>Вот и все, после этих трех шагов вы готовы начать использовать TypeScript.</p><p><a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">Visual Studio Code</a> поддерживает TypeScript «из коробки». Для других редакторов вам, возможно, придется установить плагин, чтобы получить языковые функции (например, <a href="https://github.com/Microsoft/TypeScript-Sublime-Plugin#installation" target="_blank" rel="noreferrer">Sublime TypeScript plugin</a>, доступный через менеджер пакетов Sublime Text).</p><h2 id="как-настроить-typescript-для-вашего-дополнения-к-dota" tabindex="-1">Как настроить TypeScript для вашего дополнения к Dota <a class="header-anchor" href="#как-настроить-typescript-для-вашего-дополнения-к-dota" aria-label="Permalink to &quot;Как настроить TypeScript для вашего дополнения к Dota&quot;">​</a></h2><p>Для TypeScript требуется <code>tsconfig.json</code>, используемый для его настройки для вашего проекта. Поместите его в каталог <code>content/panorama</code> вашего дополнения. Вы можете настроить все настройки самостоятельно, но я обычно ставлю это на самые строгие настройки. Моя предпочтительная конфигурация:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>json</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  &quot;compilerOptions&quot;: {</span></span>
<span class="line"><span>    &quot;target&quot;: &quot;es2017&quot;,</span></span>
<span class="line"><span>    &quot;lib&quot;: [&quot;es2017&quot;],</span></span>
<span class="line"><span>    &quot;types&quot;: [&quot;panorama-types&quot;],</span></span>
<span class="line"><span>    &quot;strict&quot;: true</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>Структура каталогов содержимого вашего аддона должна быть примерно такой:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>content/dota_addons/[addon]/</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>    panorama/</span></span>
<span class="line"><span>        layout/</span></span>
<span class="line"><span>        scripts/</span></span>
<span class="line"><span>        styles/</span></span>
<span class="line"><span>        tsconfig.json</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="ваш-первыи-пользовательскии-интерфеис-typescript" tabindex="-1">Ваш первый пользовательский интерфейс TypeScript <a class="header-anchor" href="#ваш-первыи-пользовательскии-интерфеис-typescript" aria-label="Permalink to &quot;Ваш первый пользовательский интерфейс TypeScript&quot;">​</a></h2><p>Чтобы проиллюстрировать, почему мне нравится использовать TypeScript для модульного пользовательского интерфейса, я приведу небольшой пример. Мы будем делать портреты героев с именем игрока и полоской здоровья: <img src="`+l+`" alt="What we are making" title="Example UI">.</p><p>Поскольку это руководство посвящено TypeScript, я просто кратко приведу xml и css, это стандартные вещи:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>xml</span></span>
<span class="line"><span>&lt;root&gt;</span></span>
<span class="line"><span>    &lt;styles&gt;</span></span>
<span class="line"><span>        &lt;include src=&quot;file://{resources}/styles/custom_game/example.css&quot; /&gt;</span></span>
<span class="line"><span>    &lt;/styles&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;scripts&gt;</span></span>
<span class="line"><span>        &lt;include src=&quot;file://{resources}/scripts/custom_game/PlayerPortrait.js&quot; /&gt;</span></span>
<span class="line"><span>        &lt;include src=&quot;file://{resources}/scripts/custom_game/ExampleUI.js&quot; /&gt;</span></span>
<span class="line"><span>    &lt;/scripts&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;snippets&gt;</span></span>
<span class="line"><span>        &lt;snippet name=&quot;PlayerPortrait&quot;&gt;</span></span>
<span class="line"><span>            &lt;Panel class=&quot;PlayerPortrait&quot; hittest=&quot;false&quot;&gt;</span></span>
<span class="line"><span>                &lt;Image id=&quot;HeroImage&quot; hittest=&quot;false&quot; /&gt;</span></span>
<span class="line"><span>                &lt;Label id=&quot;PlayerName&quot; /&gt;</span></span>
<span class="line"><span>                &lt;Panel class=&quot;HealthContainer&quot;&gt;</span></span>
<span class="line"><span>                    &lt;Panel id=&quot;HealthBar&quot; /&gt;</span></span>
<span class="line"><span>                &lt;/Panel&gt;</span></span>
<span class="line"><span>            &lt;/Panel&gt;</span></span>
<span class="line"><span>        &lt;/snippet&gt;</span></span>
<span class="line"><span>    &lt;/snippets&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;Panel hittest=&quot;false&quot; style=&quot;width: 100%; height: 100%;&quot;&gt;</span></span>
<span class="line"><span>        &lt;Panel id=&quot;HeroPortraits&quot; /&gt;</span></span>
<span class="line"><span>    &lt;/Panel&gt;</span></span>
<span class="line"><span>&lt;/root&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p>CSS:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>css</span></span>
<span class="line"><span>#HeroPortraits {</span></span>
<span class="line"><span>  width: 300px;</span></span>
<span class="line"><span>  height: 650px;</span></span>
<span class="line"><span>  margin-top: 150px;</span></span>
<span class="line"><span>  flow-children: down;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.PlayerPortrait {</span></span>
<span class="line"><span>  background-color: blue;</span></span>
<span class="line"><span>  height: 80px;</span></span>
<span class="line"><span>  width: 300px;</span></span>
<span class="line"><span>  margin-bottom: 10px;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>#HeroImage {</span></span>
<span class="line"><span>  width: 80px;</span></span>
<span class="line"><span>  height: 80px;</span></span>
<span class="line"><span>  background-color: black;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>#PlayerName {</span></span>
<span class="line"><span>  color: white;</span></span>
<span class="line"><span>  font-size: 25px;</span></span>
<span class="line"><span>  margin-top: 10px;</span></span>
<span class="line"><span>  margin-left: 90px;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.HealthContainer {</span></span>
<span class="line"><span>  width: 200px;</span></span>
<span class="line"><span>  height: 20px;</span></span>
<span class="line"><span>  x: 90px;</span></span>
<span class="line"><span>  y: 50px;</span></span>
<span class="line"><span>  background-color: black;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>#HealthBar {</span></span>
<span class="line"><span>  height: 20px;</span></span>
<span class="line"><span>  width: 50%;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  background-color: green;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><p>Как вы можете видеть, XML этой части пользовательского интерфейса содержит фрагмент, содержащий XML портрета игрока, содержащий изображение героя, метку для имени игрока, а также контейнер здоровья и полосу здоровья внутри этого контейнера. CSS применяет к этому простую компоновку.</p><h2 id="написание-typescript-для-вашего-пользовательского-интерфеиса" tabindex="-1">Написание TypeScript для вашего пользовательского интерфейса <a class="header-anchor" href="#написание-typescript-для-вашего-пользовательского-интерфеиса" aria-label="Permalink to &quot;Написание TypeScript для вашего пользовательского интерфейса&quot;">​</a></h2><p>Сначала мы хотим определить класс нашего пользовательского интерфейса и связать его с XML. Мы делаем это, беря существующую панель и оборачивая ее в машинописный класс следующим образом:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typescript</span></span>
<span class="line"><span>class ExampleUI {</span></span>
<span class="line"><span>  // Instance variables</span></span>
<span class="line"><span>  panel: Panel;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // ExampleUI constructor</span></span>
<span class="line"><span>  constructor(panel: Panel) {</span></span>
<span class="line"><span>    this.panel = panel;</span></span>
<span class="line"><span>    $.Msg(panel); // Print the panel</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let ui = new ExampleUI($.GetContextPanel());</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>Ничего особенного: мы по сути создаем новый объект exampleUI в файле exampleUI.ts из контекстной панели, так что весь этот XML-файл теперь является экземпляром класса exampleUI. Если вы создадите это, нажав <strong>ctrl+b</strong> в Sublime, вы увидите, что он создает новый скомпилированный файл exampleUI.js с тем же именем. Этот скомпилированный файл загружается Panorama. Если вы загрузите игровой режим на этом этапе, вы должны увидеть в консоли отпечаток вашей панели пользовательского интерфейса.</p><p>Теперь создадим класс для портрета героя. В этом случае мы не оборачиваем существующий элемент, а создаем панель в конструкторе. Для этого нам все еще нужна родительская панель, поэтому мы требуем ее в качестве параметра для конструктора, а также имя героя и имя игрока. После создания панели и загрузки в нее фрагмента мы ищем некоторые из ее дочерних элементов и сохраняем их на будущее.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typescript</span></span>
<span class="line"><span>class PlayerPortrait {</span></span>
<span class="line"><span>  // Instance variables</span></span>
<span class="line"><span>  panel: Panel;</span></span>
<span class="line"><span>  heroImage: ImagePanel;</span></span>
<span class="line"><span>  playerLabel: LabelPanel;</span></span>
<span class="line"><span>  hpBar: Panel;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  constructor(parent: Panel, heroName: string, playerName: string) {</span></span>
<span class="line"><span>    // Create new panel</span></span>
<span class="line"><span>    const panel = $.CreatePanel(&#39;Panel&#39;, parent, &#39;&#39;);</span></span>
<span class="line"><span>    this.panel = panel;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Load snippet into panel</span></span>
<span class="line"><span>    panel.BLoadLayoutSnippet(&#39;PlayerPortrait&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Find components</span></span>
<span class="line"><span>    this.heroImage = panel.FindChildTraverse(&#39;HeroImage&#39;) as ImagePanel;</span></span>
<span class="line"><span>    this.playerLabel = panel.FindChildTraverse(&#39;PlayerName&#39;) as LabelPanel;</span></span>
<span class="line"><span>    this.hpBar = panel.FindChildTraverse(&#39;HealthBar&#39;)!;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Set player name label</span></span>
<span class="line"><span>    this.playerLabel.text = playerName;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Set hero image</span></span>
<span class="line"><span>    this.heroImage.SetImage(&#39;s2r://panorama/images/heroes/&#39; + heroName + &#39;_png.vtex&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Initialise health at 100%</span></span>
<span class="line"><span>    this.SetHealthPercent(100);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // Set the health bar to a certain percentage (0-100)</span></span>
<span class="line"><span>  SetHealthPercent(percentage: number) {</span></span>
<span class="line"><span>    this.hpBar.style.width = Math.floor(percentage) + &#39;%&#39;;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><p>Это сохраняется во втором файле <strong>PlayerPortrait.ts</strong>, который компилируется в PlayerPortrait.js. Поэтому этот файл также включен в раздел сценариев XML (см. выше).</p><p>Конструктор просто создает новую панель и загружает в нее фрагмент, а затем устанавливает некоторые значения по умолчанию. Класс также определяет функцию SetHealthPercent, которая управляет полосой здоровья.</p><p>Теперь мы возвращаемся к классу exampleUI и создаем пару экземпляров PlayerPortrait для элемента PlayerPortraits:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typescript</span></span>
<span class="line"><span>class ExampleUI {</span></span>
<span class="line"><span>  // Instance variables</span></span>
<span class="line"><span>  panel: Panel;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // ExampleUI constructor</span></span>
<span class="line"><span>  constructor(panel: Panel) {</span></span>
<span class="line"><span>    this.panel = panel;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Find container element</span></span>
<span class="line"><span>    const container = this.panel.FindChild(&#39;HeroPortraits&#39;)!;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Create portrait for player 0, 1 and 2</span></span>
<span class="line"><span>    const portrait0 = new PlayerPortrait(container, &#39;npc_dota_hero_juggernaut&#39;, &#39;Player0&#39;);</span></span>
<span class="line"><span>    const portrait1 = new PlayerPortrait(container, &#39;npc_dota_hero_omniknight&#39;, &#39;Player1&#39;);</span></span>
<span class="line"><span>    const portrait2 = new PlayerPortrait(container, &#39;npc_dota_hero_invoker&#39;, &#39;Player2&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Set HP of player 1 and 2 to a different value</span></span>
<span class="line"><span>    portrait0.SetHealthPercent(80);</span></span>
<span class="line"><span>    portrait2.SetHealthPercent(20);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let ui = new ExampleUI($.GetContextPanel());</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>Теперь ваш пользовательский интерфейс должен выглядеть так, как на снимке экрана, который мы собирались сделать вначале.</p><h2 id="расширенныи-типскриптинг" tabindex="-1">Расширенный типскриптинг <a class="header-anchor" href="#расширенныи-типскриптинг" aria-label="Permalink to &quot;Расширенный типскриптинг&quot;">​</a></h2><p>Этот пользовательский интерфейс бесполезен для реальной игры, поэтому давайте сделаем что-нибудь посложнее. Мы хотим сохранить портреты игроков, а затем всякий раз, когда мы получаем событие об изменении HP игрока, мы хотим получить правильный экземпляр PlayerPortrait.</p><p>Мы делаем это, добавляя в exampleUI еще одну переменную экземпляра — карту, которая сопоставляет идентификаторы playerID с правильным экземпляром PlayerPortrait. При создании экземпляров PlayerPortrait мы помещаем их на карту. Когда мы получаем событие hp_changed, мы обновляем соответствующую панель. Тип этой карты можно выразить в TypeScript как <code>{[playerID: number]: PlayerPortrait}</code>.</p><p>Одним из преимуществ TypeScript является то, что вы можете явно определить, какие события вы получаете и каково их содержимое. Мы определяем событие HPChanged следующим образом:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typescript</span></span>
<span class="line"><span>interface HPChangedEvent {</span></span>
<span class="line"><span>  playerID: PlayerID;</span></span>
<span class="line"><span>  hpPercentage: number;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Объединив все это, наш файл exampleUI.ts теперь выглядит следующим образом:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typescript</span></span>
<span class="line"><span>interface HPChangedEvent {</span></span>
<span class="line"><span>  playerID: PlayerID;</span></span>
<span class="line"><span>  hpPercentage: number;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class ExampleUI {</span></span>
<span class="line"><span>  // Instance variables</span></span>
<span class="line"><span>  panel: Panel;</span></span>
<span class="line"><span>  playerPanels: Partial&lt;Record&lt;PlayerID, PlayerPortrait&gt;&gt; = {}; // A map with number keys and PlayerPortrait values</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // ExampleUI constructor</span></span>
<span class="line"><span>  constructor(panel: Panel) {</span></span>
<span class="line"><span>    this.panel = panel;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    const container = this.panel.FindChild(&#39;HeroPortraits&#39;)!;</span></span>
<span class="line"><span>    container.RemoveAndDeleteChildren();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Create portrait for player 0, 1 and 2</span></span>
<span class="line"><span>    this.playerPanels[0] = new PlayerPortrait(container, &#39;npc_dota_hero_juggernaut&#39;, &#39;Player0&#39;);</span></span>
<span class="line"><span>    this.playerPanels[1] = new PlayerPortrait(container, &#39;npc_dota_hero_omniknight&#39;, &#39;Player1&#39;);</span></span>
<span class="line"><span>    this.playerPanels[2] = new PlayerPortrait(container, &#39;npc_dota_hero_invoker&#39;, &#39;Player2&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Listen for health changed event, when it fires, handle it with this.OnHPChanged</span></span>
<span class="line"><span>    GameEvents.Subscribe&lt;HPChangedEvent&gt;(&#39;hp_changed&#39;, (event) =&gt; this.OnHPChanged(event));</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // Event handler for HP Changed event</span></span>
<span class="line"><span>  OnHPChanged(event: HPChangedEvent) {</span></span>
<span class="line"><span>    // Get portrait for this player</span></span>
<span class="line"><span>    const playerPortrait = this.playerPanels[event.playerID];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Set HP on the player panel</span></span>
<span class="line"><span>    playerPortrait.SetHealthPercent(event.hpPercentage);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let ui = new ExampleUI($.GetContextPanel());</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br></div></div><p>Мы просто связали обработчик события <code>hp_changed</code> в конструкторе нашего примера пользовательского интерфейса, и всякий раз, когда это происходит, вызывается OnHPChanged, который ищет портрет игрока на карте и вызывает SetHealthPercent для портрета.</p><h2 id="резюме" tabindex="-1">Резюме <a class="header-anchor" href="#резюме" aria-label="Permalink to &quot;Резюме&quot;">​</a></h2><p>В заключение я надеюсь, что убедил вас, что TypeScript помогает писать читаемые модульные сценарии пользовательского интерфейса в Panorama. TypeScript помогает вам находить ошибки ввода перед компиляцией и даже предотвращает ошибки, принимая во внимание область видимости. Кроме того, очень полезно автодополнение кода для API панорамы. Чем больше я использую TypeScript для написания Panorama, тем больше меня впечатляет его полезность. Надеюсь, вы попробуете и откроете для себя.</p>`,45)])])}const h=s(r,[["render",i]]);export{d as __pageData,h as default};
