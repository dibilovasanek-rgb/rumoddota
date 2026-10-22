import{_ as p,C as e,o as l,c as i,ag as s,E as t}from"./chunks/framework.DUTPmUpA.js";const o="/_assets/NL1Gqmr.CTHm4Jsk.png",r="/_assets/GOeKyp7.Bg-TgsGD.png",u="/_assets/AmusedScientificHoneybadger.ByJWevEw.mp4",T=JSON.parse('{"title":"Создание юнитов с продолжительностью","description":"","frontmatter":{"title":"Создание юнитов с продолжительностью","author":"Pizzalol","steamId":"76561198015886976","date":"15.01.2015"},"headers":[],"relativePath":"units/creating-units-with-a-duration.md","filePath":"units/creating-units-with-a-duration.md"}'),c={name:"units/creating-units-with-a-duration.md"};function b(d,n,m,q,_,h){const a=e("StaticVideo");return l(),i("div",null,[n[0]||(n[0]=s('<p>дание юнитов с продолжительностью</p><p>Это краткое руководство о том, как создавать собственные юниты, чтобы они отображались с круговым таймером рядом с полосой их здоровья и оставшимся временем на шкале опыта.</p><p>Если вы не уверены, о чем я говорю, посмотрите на эти изображения <img src="'+o+'" alt="img"> и <img src="'+r+`" alt="img">.</p><p>Нам понадобится <code>modifier_kill</code>.</p><p>Вы можете применить его в KV, используя <code>ApplyModifier</code>, или в Lua, используя <code>AddNewModifier</code>.</p><p>Это обеспечивает большую гибкость и позволяет правильно создавать вызванные по времени юниты через Lua.</p><h2 id="пример-кв" tabindex="-1">пример КВ <a class="header-anchor" href="#пример-кв" aria-label="Permalink to &quot;пример КВ&quot;">​</a></h2><p>Вот пример этого в КВ; один паук спаунится без <code>modifier_kill</code>, а другой с ним.</p><p><strong><em>Примечание:</em></strong> В этом примере нет разницы между применением <code>modifier_kill</code> или использованием встроенного параметра <code>Duration</code> блока действий <code>SpawnUnit</code>.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;test_ability&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    // General</span></span>
<span class="line"><span>    &quot;BaseClass&quot;                &quot;ability_datadriven&quot;</span></span>
<span class="line"><span>    &quot;AbilityBehavior&quot;                &quot;DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE&quot;</span></span>
<span class="line"><span>    &quot;AbilityType&quot;                    &quot;DOTA_ABILITY_TYPE_BASIC&quot;</span></span>
<span class="line"><span>    // Time</span></span>
<span class="line"><span>    &quot;AbilityCooldown&quot;                &quot;0.0&quot;</span></span>
<span class="line"><span>    // Cost</span></span>
<span class="line"><span>    &quot;AbilityManaCost&quot;                &quot;0&quot;</span></span>
<span class="line"><span>    // Special</span></span>
<span class="line"><span>    &quot;AbilityValues&quot;</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        &quot;duration&quot;                    &quot;10.0&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    &quot;OnSpellStart&quot;</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        &quot;SpawnUnit&quot;</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            &quot;UnitName&quot;    &quot;npc_dota_broodmother_spiderling&quot;</span></span>
<span class="line"><span>            &quot;UnitCount&quot;    &quot;1&quot;</span></span>
<span class="line"><span>            &quot;SpawnRadius&quot;    &quot;200&quot;</span></span>
<span class="line"><span>            &quot;Target&quot;        &quot;CASTER&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            &quot;OnSpawn&quot;</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                &quot;ApplyModifier&quot;</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    &quot;ModifierName&quot;    &quot;modifier_kill&quot;</span></span>
<span class="line"><span>                    &quot;Target&quot;        &quot;TARGET&quot;</span></span>
<span class="line"><span>                    &quot;Duration&quot;        &quot;%duration&quot;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        &quot;SpawnUnit&quot;</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            &quot;UnitName&quot;    &quot;npc_dota_broodmother_spiderling&quot;</span></span>
<span class="line"><span>            &quot;UnitCount&quot;    &quot;1&quot;</span></span>
<span class="line"><span>            &quot;SpawnRadius&quot;    &quot;200&quot;</span></span>
<span class="line"><span>            &quot;Target&quot;        &quot;CASTER&quot;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div><p>и короткое видео вместе с ним</p>`,11)),t(a,{path:u}),n[1]||(n[1]=s(`<h2 id="пример-lua" tabindex="-1">Пример Lua <a class="header-anchor" href="#пример-lua" aria-label="Permalink to &quot;Пример Lua&quot;">​</a></h2><p>Это действительно простой пример того, как использовать его с Lua.</p><p>эта функция применит модификатор <code>modifier_kill</code> длительностью 10 секунд, после чего заклинатель умрет.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function KillCaster( keys )</span></span>
<span class="line"><span>    local caster = keys.caster</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    caster:AddNewModifier(caster, nil, &quot;modifier_kill&quot;, {duration = 10})</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div>`,4))])}const A=p(c,[["render",b]]);export{T as __pageData,A as default};
