import{_ as s,o as a,c as p,ag as e}from"./chunks/framework.DUTPmUpA.js";const b=JSON.parse('{"title":"Применить длительность модификаторов героя и крипа","description":"","frontmatter":{"title":"Применить длительность модификаторов героя и крипа","author":"Noya","steamId":"76561198046984233","date":"15.01.2015"},"headers":[],"relativePath":"abilities/datadriven/apply-hero-and-creep-modifier-durations.md","filePath":"abilities/datadriven/apply-hero-and-creep-modifier-durations.md"}'),t={name:"abilities/datadriven/apply-hero-and-creep-modifier-durations.md"};function i(l,n,r,o,u,c){return a(),p("div",null,[...n[0]||(n[0]=[e(`<p>ь длительность модификаторов героя и крипа</p><p>Я придумал этот метод после того, как Критт показал нам, что вы можете напрямую добавить значение ключа <code>&quot;Duration&quot;</code> к блоку <code>&quot;ApplyModifier&quot;</code> и использовать блок <code>&quot;Target&quot;</code> без радиуса (по умолчанию равно 0).</p><p>По сути, злоупотребляя системой, управляемой данными, мы можем сделать это при любом событии:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;ApplyModifier&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    &quot;ModifierName&quot;	&quot;modifier_name&quot;</span></span>
<span class="line"><span>    &quot;Target&quot;</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        &quot;Center&quot;	&quot;TARGET&quot;</span></span>
<span class="line"><span>        &quot;Types&quot;  &quot;DOTA_UNIT_TARGET_HERO&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    &quot;Duration&quot;	&quot;%hero_duration&quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&quot;ApplyModifier&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    &quot;ModifierName&quot;	&quot;modifier_name&quot;</span></span>
<span class="line"><span>    &quot;Target&quot;</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        &quot;Center&quot;	&quot;TARGET&quot;</span></span>
<span class="line"><span>        &quot;Types&quot;  &quot;DOTA_UNIT_TARGET_BASIC&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    &quot;Duration&quot;	&quot;%creep_duration&quot;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>modifier_name — любой модификатор <strong>без «Продолжительность»</strong>, указанный непосредственно в его блоке.</p><p>Надеемся, что благодаря этому многие случаи, когда нужно применять разную продолжительность к герою и крипам, станут проще читать и дорабатывать. До сих пор я использовал Lua для определения различной продолжительности, но после знакомства с этой системой она стала намного лучше.</p>`,6)])])}const m=s(t,[["render",i]]);export{b as __pageData,m as default};
