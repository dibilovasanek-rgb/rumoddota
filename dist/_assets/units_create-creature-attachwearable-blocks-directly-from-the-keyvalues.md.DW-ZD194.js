import{_ as s,o as a,c as e,ag as p}from"./chunks/framework.DUTPmUpA.js";const m=JSON.parse('{"title":"Создавайте блоки Creature AttachWearable непосредственно из значений ключей.","description":"","frontmatter":{"title":"Создавайте блоки Creature AttachWearable непосредственно из значений ключей.","author":"Noya","steamId":"76561198046984233","date":"15.12.2015"},"headers":[],"relativePath":"units/create-creature-attachwearable-blocks-directly-from-the-keyvalues.md","filePath":"units/create-creature-attachwearable-blocks-directly-from-the-keyvalues.md"}'),l={name:"units/create-creature-attachwearable-blocks-directly-from-the-keyvalues.md"};function r(t,n,i,u,c,o){return a(),e("div",null,[...n[0]||(n[0]=[p(`<p>те блоки Creature AttachWearable непосредственно из значений ключей.</p><p>Для тех, кто все еще нажимает Ctrl+F и копирует из <a href="https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/scripts/items/items_game.txt" target="_blank" rel="noreferrer">items_game.txt</a>, я предлагаю лучшее решение:</p><p>Сначала «сопоставьте» допустимые носимые устройства из items_game:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function MapWearables()</span></span>
<span class="line"><span>    GameRules.items = LoadKeyValues(&quot;scripts/items/items_game.txt&quot;)[&#39;items&#39;]</span></span>
<span class="line"><span>    GameRules.modelmap = {}</span></span>
<span class="line"><span>    for k,v in pairs(GameRules.items) do</span></span>
<span class="line"><span>        if v.name and v.prefab ~= &quot;loading_screen&quot; then</span></span>
<span class="line"><span>            GameRules.modelmap[v.name] = k</span></span>
<span class="line"><span>        end</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>Тогда есть 2 варианта:</p><ul><li>Сгенерировать набор по умолчанию для имени героя (внутренний <code>npc_dota_hero_name</code>)</li><li>Создайте набор пакетов, вы можете использовать этот список для имен наборов: <a href="https://dota2.gamepedia.com/Equipment" target="_blank" rel="noreferrer">https://dota2.gamepedia.com/Equipment</a></li></ul><p><strong>Использование</strong></p><ul><li>Для наборов героев по умолчанию запустите <code>GenerateDefaultBlock(hero_name)</code>.</li><li>Для создания набора пакетов выполните: <code>GenerateBundleBlock(set_name)</code>. <strong>Код с использованием 4-х пробельных отступов</strong></li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function GenerateDefaultBlock( heroName )</span></span>
<span class="line"><span>    print(&quot;    \\&quot;Creature\\&quot;&quot;)</span></span>
<span class="line"><span>    print(&quot;    {&quot;)</span></span>
<span class="line"><span>    print(&quot;        \\&quot;AttachWearables\\&quot; &quot;..&quot;// Default &quot;..heroName)</span></span>
<span class="line"><span>    print(&quot;        {&quot;)</span></span>
<span class="line"><span>    local defCount = 1</span></span>
<span class="line"><span>    for code,values in pairs(GameRules.items) do</span></span>
<span class="line"><span>        if values.name and values.prefab == &quot;default_item&quot; and values.used_by_heroes then</span></span>
<span class="line"><span>            for k,v in pairs(values.used_by_heroes) do</span></span>
<span class="line"><span>                if k == heroName then</span></span>
<span class="line"><span>                    local itemID = GameRules.modelmap[values.name]</span></span>
<span class="line"><span>                    GenerateItemDefLine( defCount, itemID, values.name )</span></span>
<span class="line"><span>                    defCount = defCount + 1</span></span>
<span class="line"><span>                end</span></span>
<span class="line"><span>            end</span></span>
<span class="line"><span>        end</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span>    print(&quot;        }&quot;)</span></span>
<span class="line"><span>    print(&quot;    }&quot;)</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function GenerateBundleBlock( setname )</span></span>
<span class="line"><span>    local bundle = {}</span></span>
<span class="line"><span>    for code,values in pairs(GameRules.items) do</span></span>
<span class="line"><span>        if values.name and values.name == setname and values.prefab and values.prefab == &quot;bundle&quot; then</span></span>
<span class="line"><span>            bundle = values.bundle</span></span>
<span class="line"><span>        end</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    print(&quot;    \\&quot;Creature\\&quot;&quot;)</span></span>
<span class="line"><span>    print(&quot;    {&quot;)</span></span>
<span class="line"><span>    print(&quot;        \\&quot;AttachWearables\\&quot; &quot;..&quot;// &quot;..setname)</span></span>
<span class="line"><span>    print(&quot;        {&quot;)</span></span>
<span class="line"><span>    local wearableCount = 1</span></span>
<span class="line"><span>    for k,v in pairs(bundle) do</span></span>
<span class="line"><span>        local itemID = GameRules.modelmap[k]</span></span>
<span class="line"><span>        if itemID then</span></span>
<span class="line"><span>            GenerateItemDefLine(wearableCount, itemID, k)</span></span>
<span class="line"><span>            wearableCount = wearableCount+1</span></span>
<span class="line"><span>        end</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span>    print(&quot;        }&quot;)</span></span>
<span class="line"><span>    print(&quot;    }&quot;)</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function GenerateItemDefLine( i, itemID, comment )</span></span>
<span class="line"><span>    print(&quot;            \\&quot;&quot;..tostring(i)..&quot;\\&quot; { &quot;..&quot;\\&quot;ItemDef\\&quot; \\&quot;&quot;..itemID..&quot;\\&quot; } // &quot;..comment)</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br></div></div>`,9)])])}const d=s(l,[["render",r]]);export{m as __pageData,d as default};
