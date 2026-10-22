import{_ as s,o as a,c as p,ag as l}from"./chunks/framework.DUTPmUpA.js";const e="/_assets/fZyO9sA.DPpARI60.png",i="/_assets/uZKACHo.D8W7Xkl3.png",r="/_assets/Fe5MiGc.B4z6rA9F.png",c="/_assets/v9LFLaw.DOdWcuUm.png",x=JSON.parse('{"title":"Примеры кнопок","description":"","frontmatter":{"title":"Примеры кнопок","author":"Flam3s","steamId":"76561198249367546","date":"08.08.2020"},"headers":[],"relativePath":"panorama/button-examples.md","filePath":"panorama/button-examples.md"}'),t={name:"panorama/button-examples.md"};function b(o,n,u,m,d,g){return a(),p("div",null,[...n[0]||(n[0]=[l('<h2 id="_8-08-2020-the-date-of-writing" tabindex="-1">8.08.2020 # The date of writing <a class="header-anchor" href="#_8-08-2020-the-date-of-writing" aria-label="Permalink to &quot;8.08.2020 # The date of writing&quot;">​</a></h2><h1 id="примеры-кнопок" tabindex="-1">Примеры кнопок <a class="header-anchor" href="#примеры-кнопок" aria-label="Permalink to &quot;Примеры кнопок&quot;">​</a></h1><p>Вот несколько примеров кнопок, которые вы можете использовать в своих играх.</p><h2 id="пример-1-—-кнопка-клапана-по-умолчанию" tabindex="-1">Пример 1 — кнопка клапана по умолчанию <a class="header-anchor" href="#пример-1-—-кнопка-клапана-по-умолчанию" aria-label="Permalink to &quot;Пример 1 — кнопка клапана по умолчанию&quot;">​</a></h2><p>Вот кнопка, которую Valve чаще всего использует в Dota 2. (Valve обычно перекрашивает их для разных целей: зеленый для магазина, золотой для Dotaplus и т. д.)</p><p><img src="'+e+`" alt="/images/external/fZyO9sA.png"></p><p>XML:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>xml</span></span>
<span class="line"><span>&lt;TextButton id=&quot;DefaultValveButtonID&quot; class=&quot;DefaultValveButtonClass&quot; text=&quot;#DefaultValveButton&quot;/&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>CSS:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>css</span></span>
<span class="line"><span>#DefaultValveButtonID {</span></span>
<span class="line"><span>  horizontal-align: center;</span></span>
<span class="line"><span>  vertical-align: bottom;</span></span>
<span class="line"><span>  margin-bottom: 20px;</span></span>
<span class="line"><span>  box-shadow: black -4px -4px 8px 8px;</span></span>
<span class="line"><span>  margin-top: 20px;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.DefaultValveButtonClass {</span></span>
<span class="line"><span>  width: 270px;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  min-width: 192px;</span></span>
<span class="line"><span>  min-height: 36px;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  background-color: gradient(linear, 0% 0%, 0% 100%, from(#373d45), to(#4d5860));</span></span>
<span class="line"><span>  border-style: solid;</span></span>
<span class="line"><span>  border-width: 1px;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  padding: 4px 10px;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  border-top-color: #555555;</span></span>
<span class="line"><span>  border-left-color: #494949;</span></span>
<span class="line"><span>  border-bottom-color: #333333;</span></span>
<span class="line"><span>  border-right-color: #404040;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  transition-property: background-color;</span></span>
<span class="line"><span>  transition-duration: 0.05s;</span></span>
<span class="line"><span>  transition-timing-function: linear;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.DefaultValveButtonClass Label {</span></span>
<span class="line"><span>  margin-top: 2px;</span></span>
<span class="line"><span>  text-transform: uppercase;</span></span>
<span class="line"><span>  letter-spacing: 2px;</span></span>
<span class="line"><span>  color: #ffffff;</span></span>
<span class="line"><span>  text-align: center;</span></span>
<span class="line"><span>  horizontal-align: center;</span></span>
<span class="line"><span>  vertical-align: middle;</span></span>
<span class="line"><span>  text-shadow: 2px 2px 0px 1 #000000;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  transition-property: color;</span></span>
<span class="line"><span>  transition-duration: 0.35s;</span></span>
<span class="line"><span>  transition-timing-function: ease-in-out;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  font-size: 18px;</span></span>
<span class="line"><span>  font-family: defaultFont;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.DefaultValveButtonClass:hover {</span></span>
<span class="line"><span>  background-color: gradient(linear, 0% 0%, 0% 100%, from(#4c5561), to(#6c7d88));</span></span>
<span class="line"><span>  border-top-color: #aaaaaa77;</span></span>
<span class="line"><span>  border-left-color: #aaaaaa33;</span></span>
<span class="line"><span>  border-bottom-color: #333333;</span></span>
<span class="line"><span>  border-right-color: #404040;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.DefaultValveButtonClass:active {</span></span>
<span class="line"><span>  background-color: gradient(linear, 0% 0%, 0% 100%, from(#393939), to(#555555));</span></span>
<span class="line"><span>  border-top-color: #222222;</span></span>
<span class="line"><span>  border-left-color: #303030;</span></span>
<span class="line"><span>  border-bottom-color: #666666;</span></span>
<span class="line"><span>  border-right-color: #444444;</span></span>
<span class="line"><span>  sound: &#39;ui_generic_button_click&#39;;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br></div></div><h2 id="пример-2-фиолетовая-кнопка" tabindex="-1">Пример 2. Фиолетовая кнопка <a class="header-anchor" href="#пример-2-фиолетовая-кнопка" aria-label="Permalink to &quot;Пример 2. Фиолетовая кнопка&quot;">​</a></h2><p><img src="`+i+`" alt="/images/external/uZKACHo.png"></p><p>XML:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>xml</span></span>
<span class="line"><span>&lt;Button id=&quot;ExampleButton1&quot;&gt;</span></span>
<span class="line"><span>  &lt;Label class=&quot;ExampleButton1Label&quot; text=&quot;#Click&quot;/&gt;</span></span>
<span class="line"><span>&lt;/Button&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>CSS:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>css</span></span>
<span class="line"><span>#ExampleButton1 {</span></span>
<span class="line"><span>  width: 330px;</span></span>
<span class="line"><span>  min-height: 36px;</span></span>
<span class="line"><span>  box-shadow: #f78f9015 -4px -4px 8px 8px;</span></span>
<span class="line"><span>  background-color: black;</span></span>
<span class="line"><span>  border: 1px solid #aaaaaa;</span></span>
<span class="line"><span>  horizontal-align: right;</span></span>
<span class="line"><span>  vertical-align: bottom;</span></span>
<span class="line"><span>  margin-bottom: 20px;</span></span>
<span class="line"><span>  margin-top: 8px;</span></span>
<span class="line"><span>  margin-left: 32px;</span></span>
<span class="line"><span>  margin-right: 32px;</span></span>
<span class="line"><span>  padding: 0px;</span></span>
<span class="line"><span>  flow-children: down;</span></span>
<span class="line"><span>  background-image: url(&#39;s2r://panorama/images/textures/glassbutton_darkmoon_hover_psd.vtex&#39;);</span></span>
<span class="line"><span>  background-size: 100%;</span></span>
<span class="line"><span>  background-position: 50% 50%;</span></span>
<span class="line"><span>  background-repeat: no-repeat;</span></span>
<span class="line"><span>  transition-property: box-shadow, background-image, background-color;</span></span>
<span class="line"><span>  transition-duration: 0.16s;</span></span>
<span class="line"><span>  transition-timing-function: ease-in-out;</span></span>
<span class="line"><span>  border-radius: 6px;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>#ExampleButton1:hover {</span></span>
<span class="line"><span>  background-image: url(&#39;s2r://panorama/images/textures/glassbutton_darkmoon_psd.vtex&#39;);</span></span>
<span class="line"><span>  box-shadow: fill transparent 0px 0px 0px 0px;</span></span>
<span class="line"><span>  border: 1px solid #555555;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.ExampleButton1Label {</span></span>
<span class="line"><span>  width: 100%;</span></span>
<span class="line"><span>  text-align: center;</span></span>
<span class="line"><span>  margin-top: 3px;</span></span>
<span class="line"><span>  font-size: 20px;</span></span>
<span class="line"><span>  font-weight: thin;</span></span>
<span class="line"><span>  text-transform: uppercase;</span></span>
<span class="line"><span>  letter-spacing: 2px;</span></span>
<span class="line"><span>  font-size: 22px;</span></span>
<span class="line"><span>  color: grey;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br></div></div><h2 id="пример-3-текстовая-кнопка-со-значком" tabindex="-1">Пример 3. Текстовая кнопка со значком <a class="header-anchor" href="#пример-3-текстовая-кнопка-со-значком" aria-label="Permalink to &quot;Пример 3. Текстовая кнопка со значком&quot;">​</a></h2><p>Вы можете добавить к своей кнопке значок — в данном случае он имеет размер 26x26 пикселей по умолчанию, логотип dota 2 — чтобы она выглядела лучше.</p><p><img src="`+r+`" alt="/images/external/Fe5MiGc.png"></p><p>XML:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>xml</span></span>
<span class="line"><span>&lt;Button id=&quot;ExampleButton2ID&quot; class=&quot;ExampleButton2Class&quot;&gt;</span></span>
<span class="line"><span>  &lt;Panel class=&quot;Contents&quot;&gt;</span></span>
<span class="line"><span>    &lt;Panel class=&quot;CustomIcon&quot;/&gt;</span></span>
<span class="line"><span>    &lt;Label id=&quot;ExampleButton2Label&quot; text=&quot;#ExampleButton&quot;/&gt;</span></span>
<span class="line"><span>  &lt;/Panel&gt;</span></span>
<span class="line"><span>&lt;/Button&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>CSS:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>css</span></span>
<span class="line"><span>#ExampleButton2ID {</span></span>
<span class="line"><span>  horizontal-align: center;</span></span>
<span class="line"><span>  vertical-align: bottom;</span></span>
<span class="line"><span>  margin-bottom: 22px;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.ExampleButton2Class {</span></span>
<span class="line"><span>  background-color: gradient(linear, 0% 0%, 0% 100%, from(#6b211c), to(#8e2b19));</span></span>
<span class="line"><span>  border: 1px solid #bc4539;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  transition-property: border, brightness;</span></span>
<span class="line"><span>  transition-duration: 0.1s;</span></span>
<span class="line"><span>  transition-timing-function: linear;</span></span>
<span class="line"><span>  overflow: noclip;</span></span>
<span class="line"><span>  min-width: 300px;</span></span>
<span class="line"><span>  min-height: 45px;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.Contents {</span></span>
<span class="line"><span>  horizontal-align: center;</span></span>
<span class="line"><span>  vertical-align: middle;</span></span>
<span class="line"><span>  flow-children: right;</span></span>
<span class="line"><span>  margin: 0px 20px;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.CustomIcon {</span></span>
<span class="line"><span>  background-image: url(&#39;s2r://panorama/images/control_icons/dota_logo_white_png.vtex&#39;);</span></span>
<span class="line"><span>  background-size: contain;</span></span>
<span class="line"><span>  width: 26px;</span></span>
<span class="line"><span>  height: 26px;</span></span>
<span class="line"><span>  margin-top: 4px;</span></span>
<span class="line"><span>  margin-right: 4px;</span></span>
<span class="line"><span>  horizontal-align: center;</span></span>
<span class="line"><span>  vertical-align: middle;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.ExampleButton2Class:hover {</span></span>
<span class="line"><span>  brightness: 2;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.ExampleButton2Class:hover Label {</span></span>
<span class="line"><span>  color: white;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.ExampleButton2Class:active {</span></span>
<span class="line"><span>  brightness: 3;</span></span>
<span class="line"><span>  border: 1px solid #501f18;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  sound: &#39;ui_generic_button_click&#39;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.ExampleButton2Class Label {</span></span>
<span class="line"><span>  margin-top: 2px;</span></span>
<span class="line"><span>  text-transform: uppercase;</span></span>
<span class="line"><span>  color: white;</span></span>
<span class="line"><span>  horizontal-align: center;</span></span>
<span class="line"><span>  font-weight: bold;</span></span>
<span class="line"><span>  font-size: 24px;</span></span>
<span class="line"><span>  letter-spacing: 2px;</span></span>
<span class="line"><span>  text-align: center;</span></span>
<span class="line"><span>  vertical-align: middle;</span></span>
<span class="line"><span>  text-shadow: 0px 0px 6px 1 #000000;</span></span>
<span class="line"><span>  padding-left: 8px;</span></span>
<span class="line"><span>  padding-right: 8px;</span></span>
<span class="line"><span>  padding-top: 2px;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  transition-property: color;</span></span>
<span class="line"><span>  transition-duration: 0.1s;</span></span>
<span class="line"><span>  transition-timing-function: linear;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.ExampleButton2Class:active Label {</span></span>
<span class="line"><span>  transform: translateY(1px);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br></div></div><h2 id="пример-4-кнопки-всплывающего-меню-esc" tabindex="-1">Пример 4. Кнопки всплывающего меню ESC <a class="header-anchor" href="#пример-4-кнопки-всплывающего-меню-esc" aria-label="Permalink to &quot;Пример 4. Кнопки всплывающего меню ESC&quot;">​</a></h2><p><img src="`+c+`" alt="/images/external/v9LFLaw.png"></p><p>XML:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>xml</span></span>
<span class="line"><span>&lt;Panel id=&quot;PopupESCMenu&quot;&gt;</span></span>
<span class="line"><span>  &lt;Panel id=&quot;ESCActionButtons&quot;&gt;</span></span>
<span class="line"><span>    &lt;Button id=&quot;ESCResumeButton&quot; class=&quot;ButtonBevel ESCMenuButton&quot;&gt;</span></span>
<span class="line"><span>      &lt;Label text=&quot;RESUME&quot; /&gt;</span></span>
<span class="line"><span>    &lt;/Button&gt;</span></span>
<span class="line"><span>    &lt;Button id=&quot;ESCOptionsButton&quot; class=&quot;ButtonBevel ESCMenuButton&quot;&gt;</span></span>
<span class="line"><span>      &lt;Label text=&quot;OPTIONS&quot; /&gt;</span></span>
<span class="line"><span>    &lt;/Button&gt;</span></span>
<span class="line"><span>    &lt;Button id=&quot;ESCTestButton&quot; class=&quot;ButtonBevel ESCMenuButton&quot;&gt;</span></span>
<span class="line"><span>      &lt;Label text=&quot;TEST&quot; /&gt;</span></span>
<span class="line"><span>    &lt;/Button&gt;</span></span>
<span class="line"><span>    &lt;Button id=&quot;ESCExitButton&quot; class=&quot;ButtonBevel ESCMenuButton&quot;&gt;</span></span>
<span class="line"><span>      &lt;Label text=&quot;EXIT&quot; /&gt;</span></span>
<span class="line"><span>    &lt;/Button&gt;</span></span>
<span class="line"><span>  &lt;/Panel&gt;</span></span>
<span class="line"><span>&lt;/Panel&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>CSS:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>css</span></span>
<span class="line"><span>#PopupESCMenu {</span></span>
<span class="line"><span>  width: 350px;</span></span>
<span class="line"><span>  vertical-align: center;</span></span>
<span class="line"><span>  horizontal-align: center;</span></span>
<span class="line"><span>  opacity: 1;</span></span>
<span class="line"><span>  transform: none;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  transition-property: opacity, transform, pre-transform-scale2d, wash-color;</span></span>
<span class="line"><span>  transition-duration: 0.4s;</span></span>
<span class="line"><span>  transition-delay: 0s;</span></span>
<span class="line"><span>  transition-timing-function: ease-in-out;</span></span>
<span class="line"><span>  box-shadow: #00000099 -4px -4px 8px 8px;</span></span>
<span class="line"><span>  flow-children: down;</span></span>
<span class="line"><span>  padding: 2px;</span></span>
<span class="line"><span>  background-image: url(&#39;file://{images}/custom_game/interface/esc_bg_psd.png&#39;);</span></span>
<span class="line"><span>  background-position: center top;</span></span>
<span class="line"><span>  background-color: none;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>#ESCActionButtons {</span></span>
<span class="line"><span>  flow-children: down;</span></span>
<span class="line"><span>  width: fit-children;</span></span>
<span class="line"><span>  horizontal-align: center;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.ButtonBevel {</span></span>
<span class="line"><span>  width: 270px;</span></span>
<span class="line"><span>  min-width: 192px;</span></span>
<span class="line"><span>  min-height: 36px;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  margin-top: 8px;</span></span>
<span class="line"><span>  margin-bottom: 6px;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  background-color: gradient(linear, 0% 0%, 0% 100%, from(#373d45), to(#4d5860));</span></span>
<span class="line"><span>  border-style: solid;</span></span>
<span class="line"><span>  border-width: 1px;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  padding: 4px 10px;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  border-top-color: #555555;</span></span>
<span class="line"><span>  border-left-color: #494949;</span></span>
<span class="line"><span>  border-bottom-color: #333333;</span></span>
<span class="line"><span>  border-right-color: #404040;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  transition-property: background-color;</span></span>
<span class="line"><span>  transition-duration: 0.05s;</span></span>
<span class="line"><span>  transition-timing-function: linear;</span></span>
<span class="line"><span>  box-shadow: #00000055 -2px -2px 4px 4px;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.ESCMenuButton {</span></span>
<span class="line"><span>  margin-top: 8px;</span></span>
<span class="line"><span>  margin-bottom: 6px;</span></span>
<span class="line"><span>  width: 270px;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>#ESCResumeButton {</span></span>
<span class="line"><span>  background-color: #589c5e33;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>#ESCResumeButton:hover {</span></span>
<span class="line"><span>  opacity: 1.3;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.ESCMenuButton Label {</span></span>
<span class="line"><span>  font-weight: normal;</span></span>
<span class="line"><span>  color: gradient(linear, 0% 0%, 0% 100%, from(#eaeaea), to(#ababab));</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br></div></div>`,29)])])}const v=s(t,[["render",b]]);export{x as __pageData,v as default};
