import{_ as n,o as a,c as p,ag as e}from"./chunks/framework.DUTPmUpA.js";const m=JSON.parse('{"title":"Пример способности вращения","description":"","frontmatter":{"title":"Пример способности вращения","author":"Noya","steamId":"76561198046984233","date":"23.01.2015"},"headers":[],"relativePath":"abilities/datadriven/rotate-ability-example.md","filePath":"abilities/datadriven/rotate-ability-example.md"}'),l={name:"abilities/datadriven/rotate-ability-example.md"};function i(t,s,r,c,o,u){return a(),p("div",null,[...s[0]||(s[0]=[e(`<p>имер способности вращения</p><p><strong>Блокировать</strong></p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;Rotate&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    &quot;Target&quot;       &quot;TARGET&quot;</span></span>
<span class="line"><span>    &quot;PitchYawRoll&quot;	&quot;0 0 0&quot;</span><span> //x y z values</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><strong>Пример:</strong> вращайте ролик через каждый интервал.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;OnSpellStart&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    &quot;ApplyModifier&quot;</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        &quot;ModifierName&quot;	&quot;modifier_rotating&quot;</span></span>
<span class="line"><span>        &quot;Target&quot;       &quot;CASTER&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&quot;Modifiers&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    &quot;modifier_rotating&quot;</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        &quot;ThinkInterval&quot; &quot;%interval&quot;</span></span>
<span class="line"><span>        &quot;OnIntervalThink&quot;</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            &quot;Rotate&quot;</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                &quot;Target&quot;       &quot;TARGET&quot;</span></span>
<span class="line"><span>                &quot;PitchYawRoll&quot;	&quot;%x %y %z&quot;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>\`\`\`&lt;br /&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>**Шаг** Поворот, 15 в каждом кадре (интервал 0,03)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;StaticVideo path=&quot;/videos/BothImpureHeterodontosaurus.mp4&quot; /&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;br /&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>**Отклонение** Вращение, 15 в каждом кадре.</span></span>
<span class="line"><span>&lt;StaticVideo path=&quot;/videos/MemorableAcceptableDikdik.mp4&quot; /&gt;</span></span>
<span class="line"><span>&lt;br /&gt;</span></span>
<span class="line"><span>**Roll** Поворот, 15 в каждом кадре</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;StaticVideo path=&quot;/videos/GraciousWebbedHamadryad.mp4&quot; /&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br></div></div>`,5)])])}const d=n(l,[["render",i]]);export{m as __pageData,d as default};
