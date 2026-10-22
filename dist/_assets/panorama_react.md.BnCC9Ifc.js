import{_ as n,o as a,c as e,ag as p}from"./chunks/framework.DUTPmUpA.js";const m=JSON.parse('{"title":"Реагировать в панораме","description":"","frontmatter":{"title":"Реагировать в панораме","author":"ark120202"},"headers":[],"relativePath":"panorama/react.md","filePath":"panorama/react.md"}'),l={name:"panorama/react.md"};function r(t,s,i,c,o,b){return a(),e("div",null,[...s[0]||(s[0]=[p(`<p>агировать в панораме</p><p>React — это библиотека JavaScript для создания пользовательских интерфейсов. Это позволяет разбить пользовательский интерфейс на небольшие повторно используемые строительные блоки (компоненты) и упрощает управление состоянием.</p><p>Обычно React используется для создания веб-сайтов и веб-приложений, но <a href="https://github.com/ark120202/react-panorama" target="_blank" rel="noreferrer"><code>react-panorama</code></a> позволяет вам использовать возможности React в Dota 2.</p><h2 id="установка" tabindex="-1">Установка <a class="header-anchor" href="#установка" aria-label="Permalink to &quot;Установка&quot;">​</a></h2><p>Чтобы не тратить время на настройку, рекомендуется начать с шаблонов <a href="https://github.com/ark120202/dota-templates/tree/webpack-react" target="_blank" rel="noreferrer">JavaScript</a> или <a href="https://github.com/ark120202/dota-templates/tree/webpack-typescript-react" target="_blank" rel="noreferrer">TypeScript</a>, даже если вы интегрируете их в существующий проект.</p><p>В качестве альтернативы, если вы хотите настроить инструменты сборки самостоятельно или использовать их без каких-либо шагов сборки (UMD), вы можете воспользоваться <a href="https://github.com/ark120202/react-panorama#installation" target="_blank" rel="noreferrer"><code>react-panorama</code> installation guide</a>.</p><h2 id="jsx" tabindex="-1">JSX <a class="header-anchor" href="#jsx" aria-label="Permalink to &quot;JSX&quot;">​</a></h2><p>Вот базовое приложение hello-world, созданное с помощью React:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>jsx</span></span>
<span class="line"><span>import React from &#39;react&#39;;</span></span>
<span class="line"><span>import { render } from &#39;react-panorama&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>render(&lt;Label text=&quot;Hello, world!&quot; /&gt;, $.GetContextPanel());</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Первый параметр, который передается функции <code>render</code>, представляет собой дерево компонентов, построенное с использованием JSX — расширения синтаксиса JavaScript.</p><p>Дерево JSX — это обычное выражение JavaScript, подобное строке или литералу объекта. Это означает, что вы можете манипулировать им, как любым обычным значением JS: хранить его в переменных, использовать в условиях или возвращать из функций.</p><p>Для получения дополнительной информации о JSX вы можете проверить <a href="https://reactjs.org/docs/introducing-jsx.html" target="_blank" rel="noreferrer">official React documentation</a>.</p><h2 id="компоненты" tabindex="-1">Компоненты <a class="header-anchor" href="#компоненты" aria-label="Permalink to &quot;Компоненты&quot;">​</a></h2><p>Вместо того, чтобы хранить весь ваш пользовательский интерфейс в монолитном XML-файле, React предлагает вам разделить функциональность на небольшие строительные блоки — компоненты. В React компоненты — это простые функции, возвращающие JSX:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>jsx</span></span>
<span class="line"><span>import React from &#39;react&#39;;</span></span>
<span class="line"><span>import { render } from &#39;react-panorama&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function App() {</span></span>
<span class="line"><span>  return &lt;Label text=&quot;Hello, world!&quot; /&gt;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>render(&lt;App /&gt;, $.GetContextPanel());</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>Компоненты могут принимать параметры в качестве аргумента функции:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark has-highlighted vp-code" tabindex="0"><code><span class="line"><span>tsx</span></span>
<span class="line"><span>import React from &#39;react&#39;;</span></span>
<span class="line"><span>import { render } from &#39;react-panorama&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function HeroRow({ heroName }: { heroName: string }) {</span></span>
<span class="line highlighted"><span>  return (</span></span>
<span class="line"><span>    &lt;Panel style={{ flowChildren: &#39;right&#39; }}&gt;</span></span>
<span class="line"><span>      &lt;DOTAHeroImage heroimagestyle=&quot;icon&quot; heroname={heroName} /&gt;</span></span>
<span class="line"><span>      &lt;Label style={{ marginLeft: &#39;5px&#39; }} localizedText={heroName} /&gt;</span></span>
<span class="line"><span>    &lt;/Panel&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function HeroList() {</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;Panel style={{ flowChildren: &#39;down&#39; }}&gt;</span></span>
<span class="line"><span>      &lt;HeroRow heroName=&quot;npc_dota_hero_abaddon&quot; /&gt;</span></span>
<span class="line"><span>      &lt;HeroRow heroName=&quot;npc_dota_hero_abyssal_underlord&quot; /&gt;</span></span>
<span class="line"><span>      &lt;HeroRow heroName=&quot;npc_dota_hero_alchemist&quot; /&gt;</span></span>
<span class="line"><span>    &lt;/Panel&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>render(&lt;HeroList /&gt;, $.GetContextPanel());</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h2 id="государство" tabindex="-1">Государство <a class="header-anchor" href="#государство" aria-label="Permalink to &quot;Государство&quot;">​</a></h2><p>В современных приложениях React состояние обычно управляется с помощью <a href="https://reactjs.org/docs/hooks-intro.html" target="_blank" rel="noreferrer">hooks</a>. Один из базовых перехватчиков, <a href="https://reactjs.org/docs/hooks-state.html" target="_blank" rel="noreferrer"><code>useState</code></a>, позволяет вам объявить переменную области компонента, которая повторно отображает компонент каждый раз, когда его значение изменяется. Вот базовый пример счетчика:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>jsx</span></span>
<span class="line"><span>import React, { useState } from &#39;react&#39;;</span></span>
<span class="line"><span>import { render } from &#39;react-panorama&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function Counter() {</span></span>
<span class="line"><span>  const [count, setCount] = useState(0);</span></span>
<span class="line"><span>  const increment = () =&gt; setCount(count + 1);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;Panel style={{ flowChildren: &#39;down&#39; }}&gt;</span></span>
<span class="line"><span>      &lt;Label text={\`Count: \${count}\`} /&gt;</span></span>
<span class="line"><span>      &lt;TextButton className=&quot;ButtonBevel&quot; text=&quot;Increment&quot; onactivate={increment} /&gt;</span></span>
<span class="line"><span>    &lt;/Panel&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>render(&lt;Counter /&gt;, $.GetContextPanel());</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>Аналогичным образом вы можете использовать <code>useState</code> для привязки состояния к элементам ввода:</p><p>::: кодовая группа</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>jsx [ToggleButton]</span></span>
<span class="line"><span>import React, { useState } from &#39;react&#39;;</span></span>
<span class="line"><span>import { render } from &#39;react-panorama&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function ConditionalRendering() {</span></span>
<span class="line"><span>  const [showDetails, setShowDetails] = useState(false);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;Panel style={{ flowChildren: &#39;down&#39; }}&gt;</span></span>
<span class="line"><span>      &lt;ToggleButton</span></span>
<span class="line"><span>        text=&quot;Show details&quot;</span></span>
<span class="line"><span>        selected={showDetails}</span></span>
<span class="line"><span>        onactivate={() =&gt; setShowDetails(!showDetails)}</span></span>
<span class="line"><span>      /&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      {showDetails &amp;&amp; &lt;Label text=&quot;Details!&quot; /&gt;}</span></span>
<span class="line"><span>    &lt;/Panel&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>render(&lt;ConditionalRendering /&gt;, $.GetContextPanel());</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>jsx [Slider]</span></span>
<span class="line"><span>import React, { useState } from &#39;react&#39;;</span></span>
<span class="line"><span>import { render } from &#39;react-panorama&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function ColorPicker() {</span></span>
<span class="line"><span>  const [red, setRed] = useState(0.5);</span></span>
<span class="line"><span>  const [green, setGreen] = useState(0.5);</span></span>
<span class="line"><span>  const [blue, setBlue] = useState(0.5);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;Panel style={{ flowChildren: &#39;right&#39; }}&gt;</span></span>
<span class="line"><span>      &lt;Slider value={red} onvaluechanged={(p) =&gt; setRed(p.value)} /&gt;</span></span>
<span class="line"><span>      &lt;Slider value={green} onvaluechanged={(p) =&gt; setGreen(p.value)} /&gt;</span></span>
<span class="line"><span>      &lt;Slider value={blue} onvaluechanged={(p) =&gt; setBlue(p.value)} /&gt;</span></span>
<span class="line"><span>      &lt;Panel</span></span>
<span class="line"><span>        style={{</span></span>
<span class="line"><span>          backgroundColor: \`rgb(\${red * 255}, \${green * 255}, \${blue * 255})\`,</span></span>
<span class="line"><span>          width: &#39;125px&#39;,</span></span>
<span class="line"><span>          height: &#39;125px&#39;,</span></span>
<span class="line"><span>        }}</span></span>
<span class="line"><span>      /&gt;</span></span>
<span class="line"><span>    &lt;/Panel&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>render(&lt;ColorPicker /&gt;, $.GetContextPanel());</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>jsx [TextEntry]</span></span>
<span class="line"><span>import React, { useState } from &#39;react&#39;;</span></span>
<span class="line"><span>import { render } from &#39;react-panorama&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function ReservedText() {</span></span>
<span class="line"><span>  const [text, setText] = useState(&#39;&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;Panel style={{ flowChildren: &#39;down&#39; }}&gt;</span></span>
<span class="line"><span>      &lt;TextEntry text={text} ontextentrychange={(p) =&gt; setText(p.text)} /&gt;</span></span>
<span class="line"><span>      &lt;Label text={\`Reversed text: \${[...text].reverse().join(&#39;&#39;)}\`} /&gt;</span></span>
<span class="line"><span>    &lt;/Panel&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>render(&lt;ReservedText /&gt;, $.GetContextPanel());</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>:::</p><h2 id="listening-to-events" tabindex="-1">Listening to events <a class="header-anchor" href="#listening-to-events" aria-label="Permalink to &quot;Listening to events&quot;">​</a></h2><p>In React, the only things that should affect what component shows are its props and state. So, in order to make component update data when a certain game event happens, you need to make event listener update component&#39;s state.</p><p>Since we can update component state only within the component itself, we also have to put our <code>GameEvents.Subscribe</code> call inside the component. However you can&#39;t register it in the render function itself, because it gets executed more often than we need to, since we need to register our listener only when the component gets mounted for the first time. That&#39;s when we have to use another builtin hook - <a href="https://reactjs.org/docs/hooks-effect.html" target="_blank" rel="noreferrer"><code>useEffect</code></a>.</p><p><code>useEffect</code> hook is a function that usually gets called with 2 parameters. First one is the callback we want to execute, which would register our listener. The second is the list of state variables that our listener depends on. Since we don&#39;t use any state for our listener, we can just use an empty array (<code>[]</code>). Also, optionally our callback can return a cleanup function, which is called either when one of dependencies changes, or when component gets unmounted.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark has-highlighted vp-code" tabindex="0"><code><span class="line"><span>jsx</span></span>
<span class="line"><span>import React, { useEffect, useState } from &#39;react&#39;;</span></span>
<span class="line"><span>import { render } from &#39;react-panorama&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function KDA() {</span></span>
<span class="line"><span>  const [kills, setKills] = useState(() =&gt; Game.GetLocalPlayerInfo().player_kills);</span></span>
<span class="line"><span>  const [deaths, setDeaths] = useState(() =&gt; Game.GetLocalPlayerInfo().player_deaths);</span></span>
<span class="line"><span>  const [assists, setAssists] = useState(() =&gt; Game.GetLocalPlayerInfo().player_assists);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  useEffect(() =&gt; {</span></span>
<span class="line highlighted"><span>    const handle = GameEvents.Subscribe(&#39;dota_player_kill&#39;, () =&gt; {</span></span>
<span class="line highlighted"><span>      const playerInfo = Game.GetLocalPlayerInfo(); // [!code highlight]</span></span>
<span class="line"><span>      setKills(playerInfo.player_kills); // [!code highlight]</span></span>
<span class="line"><span>      setDeaths(playerInfo.player_deaths); // [!code highlight]</span></span>
<span class="line"><span>      setAssists(playerInfo.player_assists); // [!code highlight]</span></span>
<span class="line"><span>    }); // [!code highlight]</span></span>
<span class="line highlighted"><span>    return () =&gt; GameEvents.Unsubscribe(handle); // [!code highlight]</span></span>
<span class="line"><span>  }, []); // [!code highlight]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return &lt;Label style={{ color: &#39;white&#39; }} text={\`KDA: \${kills}/\${deaths}/\${assists}\`} /&gt;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>render(&lt;KDA /&gt;, $.GetContextPanel());</span></span>
<span class="line"><span>\`</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>react-panorama\` предоставляет специальный хук, который немного упрощает прослушивание игровых событий:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark has-highlighted vp-code" tabindex="0"><code><span class="line"><span>jsx</span></span>
<span class="line"><span>import React, { useState } from &#39;react&#39;;</span></span>
<span class="line"><span>import { render, useGameEvent } from &#39;react-panorama&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function KDA() {</span></span>
<span class="line"><span>  const [kills, setKills] = useState(() =&gt; Game.GetLocalPlayerInfo().player_kills);</span></span>
<span class="line"><span>  const [deaths, setDeaths] = useState(() =&gt; Game.GetLocalPlayerInfo().player_deaths);</span></span>
<span class="line"><span>  const [assists, setAssists] = useState(() =&gt; Game.GetLocalPlayerInfo().player_assists);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  useGameEvent(</span></span>
<span class="line"><span>    &#39;dota_player_kill&#39;,</span></span>
<span class="line"><span>    () =&gt; {</span></span>
<span class="line highlighted"><span>      const playerInfo = Game.GetLocalPlayerInfo(); // [!code highlight]</span></span>
<span class="line"><span>      setKills(playerInfo.player_kills); // [!code highlight]</span></span>
<span class="line"><span>      setDeaths(playerInfo.player_deaths); // [!code highlight]</span></span>
<span class="line"><span>      setAssists(playerInfo.player_assists); // [!code highlight]</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    [],</span></span>
<span class="line"><span>  ); // [!code highlight]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return &lt;Label style={{ color: &#39;white&#39; }} text={\`KDA: \${kills}/\${deaths}/\${assists}\`} /&gt;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>render(&lt;KDA /&gt;, $.GetContextPanel());</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>Таким же образом вы можете прослушивать события пользовательского интерфейса, обновления пользовательских сетевых таблиц или просто время. <code>react-panorama</code> предоставляет <a href="https://github.com/ark120202/react-panorama#hooks" target="_blank" rel="noreferrer">a few more custom hooks</a> для распространенных случаев использования.</p><h3 id="пользовательские-крючки" tabindex="-1">Пользовательские крючки <a class="header-anchor" href="#пользовательские-крючки" aria-label="Permalink to &quot;Пользовательские крючки&quot;">​</a></h3><p>Одна из вещей, которую React Hooks упрощает, — это повторное использование кода. Например, мы можем извлечь логику, используемую для прослушивания изменений KDA, в специальный хук <code>useKDA</code>.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark has-highlighted vp-code" tabindex="0"><code><span class="line"><span>jsx</span></span>
<span class="line"><span>import React, { useState } from &#39;react&#39;;</span></span>
<span class="line"><span>import { render, useGameEvent } from &#39;react-panorama&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function useKDA() {</span></span>
<span class="line highlighted"><span>  // Since both initializing and updating state is the same process,</span></span>
<span class="line"><span>  // we can extract it into a regular function</span></span>
<span class="line"><span>  function getKDA() {</span></span>
<span class="line"><span>    const playerInfo = Game.GetLocalPlayerInfo();</span></span>
<span class="line"><span>    return {</span></span>
<span class="line"><span>      kills: playerInfo.player_kills,</span></span>
<span class="line"><span>      deaths: playerInfo.player_deaths,</span></span>
<span class="line"><span>      assists: playerInfo.player_assists,</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const [kda, setKDA] = useState(getKDA);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  useGameEvent(&#39;dota_player_kill&#39;, () =&gt; setKDA(getKDA()), []);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return kda;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function KDA() {</span></span>
<span class="line"><span>  const { kills, deaths, assists } = useKDA(); // [!code highlight]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return &lt;Label style={{ color: &#39;white&#39; }} text={\`KDA: \${kills}/\${deaths}/\${assists}\`} /&gt;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function KDARatio() {</span></span>
<span class="line"><span>  const { kills, deaths, assists } = useKDA(); // [!code highlight]</span></span>
<span class="line"><span>  const ratio = (kills + assists) / (deaths || 1);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return &lt;Label style={{ color: &#39;white&#39; }} text={\`KDA Ratio: \${ratio}\`} /&gt;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function App() {</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;Panel style={{ flowChildren: &#39;down&#39; }}&gt;</span></span>
<span class="line"><span>      &lt;KDA /&gt;</span></span>
<span class="line"><span>      &lt;KDARatio /&gt;</span></span>
<span class="line"><span>    &lt;/Panel&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>render(&lt;App /&gt;, $.GetContextPanel());</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br></div></div><h2 id="следующие-шаги" tabindex="-1">Следующие шаги <a class="header-anchor" href="#следующие-шаги" aria-label="Permalink to &quot;Следующие шаги&quot;">​</a></h2><p>В этом руководстве рассмотрены только основы React. React имеет большую экосистему библиотек, шаблонов и статей, многие из которых применимы к Panorama. В качестве отправной точки вы можете проверить <a href="https://reactjs.org/" target="_blank" rel="noreferrer">the official React website</a> (хотя некоторые его части — <a href="https://github.com/reactjs/reactjs.org/issues/1782" target="_blank" rel="noreferrer">a little</a> <a href="https://github.com/reactjs/reactjs.org/issues/1788" target="_blank" rel="noreferrer">outdated</a>).</p>`,39)])])}const d=n(l,[["render",r]]);export{m as __pageData,d as default};
