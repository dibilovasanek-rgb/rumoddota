import{_ as n,o as a,c as e,ag as p}from"./chunks/framework.DUTPmUpA.js";const d=JSON.parse('{"title":"Модификаторы в Typescript","description":"","frontmatter":{"title":"Модификаторы в Typescript","author":"Shush","steamId":76561197994333650,"date":"07.03.2021"},"headers":[],"relativePath":"scripting/Typescript/typescript-modifier.md","filePath":"scripting/Typescript/typescript-modifier.md"}'),i={name:"scripting/Typescript/typescript-modifier.md"};function l(t,s,r,c,b,o){return a(),e("div",null,[...s[0]||(s[0]=[p(`<p>Модификаторы в Typescript</p><p>Модификаторы — чрезвычайно важная часть практически любой пользовательской игры Dota. Они позволяют вам изменять определенные свойства вашего героя, наносить ему постепенный урон или накладывать на него различные эффекты. Как и способности, мы также создадим их в Typescript.</p><p>Мы будем использовать простой пример, который должен охватывать множество общих концепций модификаторов. В качестве примера можно привести Древнюю печать Скайраса, способность, которая просто применяет модификатор к врагу. Модификатор применяет к врагу состояние «Безмолвие» и снижает его свойство сопротивления магии на процент.</p><p>:::информация Для простоты предположим, что у способности нет улучшений осколков или талантов. :::</p><h2 id="определение-способности" tabindex="-1">Определение способности <a class="header-anchor" href="#определение-способности" aria-label="Permalink to &quot;Определение способности&quot;">​</a></h2><p>Для начала давайте определим способность, к которой применяется модификатор. Начнем с КВ, это просто. Откройте <code>/game/scripts/npc/npc_abilities_custom.txt</code> и скопируйте следующее содержимое в ключ <code>&quot;DOTAAbilities&quot;</code>.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//=================================================================================================================</span></span>
<span class="line"><span>// Skywrath Mage: Ancient Seal</span></span>
<span class="line"><span>//=================================================================================================================</span></span>
<span class="line"><span>&quot;typescript_skywrath_mage_ancient_seal&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    // General</span></span>
<span class="line"><span>    //-------------------------------------------------------------------------------------------------------------</span></span>
<span class="line"><span>    &quot;BaseClass&quot;             		&quot;ability_lua&quot;</span></span>
<span class="line"><span>    &quot;AbilityTextureName&quot;			&quot;skywrath_mage_ancient_seal&quot;</span></span>
<span class="line"><span>    &quot;ScriptFile&quot;				    &quot;abilities/typescript_skywrath_mage_ancient_seal&quot;</span></span>
<span class="line"><span>    &quot;AbilityBehavior&quot;				&quot;DOTA_ABILITY_BEHAVIOR_UNIT_TARGET&quot;</span></span>
<span class="line"><span>    &quot;AbilityUnitTargetTeam&quot;			&quot;DOTA_UNIT_TARGET_TEAM_BOTH&quot;</span></span>
<span class="line"><span>    &quot;AbilityUnitTargetType&quot;			&quot;DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC&quot;</span></span>
<span class="line"><span>    &quot;SpellImmunityType&quot;				&quot;SPELL_IMMUNITY_ENEMIES_NO&quot;</span></span>
<span class="line"><span>    &quot;SpellDispellableType&quot;			&quot;SPELL_DISPELLABLE_YES&quot;</span></span>
<span class="line"><span>    &quot;AbilitySound&quot;					&quot;Hero_SkywrathMage.AncientSeal.Target&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Casting</span></span>
<span class="line"><span>    //-------------------------------------------------------------------------------------------------------------</span></span>
<span class="line"><span>    &quot;AbilityCastRange&quot;				&quot;700 750 800 850&quot;</span></span>
<span class="line"><span>    &quot;AbilityCastPoint&quot;				&quot;0.1 0.1 0.1 0.1&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Time</span></span>
<span class="line"><span>    //-------------------------------------------------------------------------------------------------------------</span></span>
<span class="line"><span>    &quot;AbilityCooldown&quot;				&quot;14&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Cost</span></span>
<span class="line"><span>    //-------------------------------------------------------------------------------------------------------------</span></span>
<span class="line"><span>    &quot;AbilityManaCost&quot;				&quot;80 90 100 110&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Special</span></span>
<span class="line"><span>    //-------------------------------------------------------------------------------------------------------------</span></span>
<span class="line"><span>    &quot;AbilityValues&quot;</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      &quot;resist_debuff&quot;			&quot;30 35 40 45&quot;</span></span>
<span class="line"><span>      &quot;seal_duration&quot;			&quot;3.0 4.0 5.0 6.0&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    &quot;AbilityCastAnimation&quot;		&quot;ACT_DOTA_CAST_ABILITY_3&quot;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div><p>Как указывает <code>ScriptFile</code>, файл lua должен находиться в <code>vscripts/abilities/</code>. Для этого мы создадим наш файл TS в <code>src/vscripts/abilities/</code>, где он будет соответствующим образом маршрутизирован при компиляции. Создайте файл <code>typescript_skywrath_mage_ancient_seal.ts</code> и откройте его.</p><h2 id="кодирование-способностеи" tabindex="-1">Кодирование способностей <a class="header-anchor" href="#кодирование-способностеи" aria-label="Permalink to &quot;Кодирование способностей&quot;">​</a></h2><p>Сама способность очень проста, поскольку все, что она делает, — это применяет модификатор к цели. Для простоты давайте решим, что модификатор будет называться <code>modifier_typescript_ancient_seal</code>. Ниже приводится способность:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ts</span></span>
<span class="line"><span>import { BaseAbility, registerAbility } from &#39;../lib/dota_ts_adapter&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@registerAbility()</span></span>
<span class="line"><span>export class typescript_skywrath_mage_ancient_seal extends BaseAbility {</span></span>
<span class="line"><span>  sound_cast = &#39;Hero_SkywrathMage.AncientSeal.Target&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  OnSpellStart() {</span></span>
<span class="line"><span>    // Special values</span></span>
<span class="line"><span>    const seal_duration = this.GetSpecialValueFor(&#39;seal_duration&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Fetch target</span></span>
<span class="line"><span>    const target = this.GetCursorTarget()!;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Play sound</span></span>
<span class="line"><span>    target.EmitSound(this.sound_cast);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Add modifier</span></span>
<span class="line"><span>    target.AddNewModifier(this.GetCaster(), this, &#39;modifier_typescript_ancient_seal&#39;, {</span></span>
<span class="line"><span>      duration: seal_duration,</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>Большой! При этом модификатор применяется к цели. Заклинатель способности, обозначенный <code>this.GetCaster()</code> в первом аргументе, назначается заклинателем, связанным с модификатором, а сама способность, обозначаемая <code>this</code> во втором аргументе, назначается как связанная способность модификатора. Мы можем получить их, вызвав <code>this.GetCaster()</code> и <code>this.GetAbility()</code> соответственно из модификатора.</p><p>:::информация Модуль, к которому мы добавляем модификатор, в данном случае наш <code>target</code>, становится родительским для модификатора. Мы можем получить его из модификатора с помощью <code>this.GetParent()</code>. Это может быть полезно в различных случаях, например, при издании звука, нанесении ему урона или размещении частиц в его текущем местоположении. :::</p><p>Теперь давайте создадим модификатор.</p><h2 id="создание-модификатора" tabindex="-1">Создание модификатора <a class="header-anchor" href="#создание-модификатора" aria-label="Permalink to &quot;Создание модификатора&quot;">​</a></h2><p>Эта часть полностью зависит от вас и ваших организационных предпочтений: некоторые предпочитают добавлять модификатор в отдельный файл, а некоторые предпочитают иметь возможность и связанные с ней модификаторы в одном файле. You could place the modifier file inside <code>src/vscripts/modifiers</code>, for instance. In order to keep the guide simple, let&#39;s make the modifier in the same file.</p><p>Модификаторы очень похожи на способности в TS. Модификаторы также являются классом. Создаем модификатор следующей структуры:\`\`\` ts @registerModifier() export class modifier_typescript_ancient_seal extends BaseModifier {}</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Как видите, это очень похоже на способность, заменяющую \`@registerAbility()\` на \`@registerModifier()\`, а расширение \`BaseAbility\` на \`BaseModifier\`.</span></span>
<span class="line"><span>Обратите внимание, что \`@registerModifier()\` позаботится о LinkLuaModifier за вас, поэтому вам не нужно вызывать его для модификаторов TS.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Вызовы модификаторов проверки типов</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Прежде чем мы продолжим, нам нужно связать способность с модификатором, что обеспечит регистрацию модификатора. Кроме того, вместо того, чтобы использовать строку для обозначения модификатора, мы свяжем имя класса.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Для этого просто удалите кавычки вокруг имени модификатора, а затем добавьте к нему \`.name\`. См. ниже код до и после связывания класса:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>::: кодовая группа</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>ts [Before] // Add modifier target.AddNewModifier(this.GetCaster(), this, &#39;modifier_typescript_ancient_seal&#39;, { duration: seal_duration, });</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>ts [After] // Add modifier target.AddNewModifier(this.GetCaster(), this, modifier_typescript_ancient_seal.name, { duration: seal_duration, });</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>:::</span></span>
<span class="line"><span></span></span>
<span class="line"><span>This results at the exact name of the modifier as a string, which is enforced by Typescript.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>:::info</span></span>
<span class="line"><span>If your modifier is in another file, you&#39;ll have to import it first before you can link it in the above fashion.</span></span>
<span class="line"><span>:::</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Coding The Modifier</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Хорошо. Давайте установим и применим свойства модификатора, такие как эффект частиц. Кроме того, давайте установим некоторые полезные свойства с помощью функций-модификаторов.</span></span>
<span class="line"><span>Кроме того, это мой личный выбор, но я обычно помещаю специальные способности в качестве свойства класса, чтобы их можно было легко использовать повсюду в модификаторе.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>ts @registerModifier() export class modifier_typescript_ancient_seal extends BaseModifier { particle_seal = &#39;particles/units/heroes/hero_skywrath_mage/skywrath_mage_ancient_seal_debuff.vpcf&#39;; resist_debuff?: number;</p><p>// When set to false, shows the modifier icon on the HUD. Otherwise, the modifier is hidden. IsHidden() { return false; }</p><p>// When set to true, the outer circle of the modifier is red, indicating that the modifier is a debuff. Otherwise, the outer circle is green. IsDebuff() { return true; }</p><p>// When set to true, the modifier can be purged by basic dispels. IsPurgable() { return true; }</p><p>// Event call that is triggered when the modifier is created and attached to a unit. OnCreated() { // Get the ability and fetch ability specials from it const ability = this.GetAbility(); if (ability) { this.resist_debuff = ability.GetSpecialValueFor(&#39;resist_debuff&#39;); }</p><pre><code>// Add particle effect
const particle = ParticleManager.CreateParticle(
  this.particle_seal,
  ParticleAttachment.OVERHEAD_FOLLOW,
  this.GetParent(),
);
ParticleManager.SetParticleControlEnt(
  particle,
  1,
  this.GetParent(),
  ParticleAttachment.ABSORIGIN_FOLLOW,
  &#39;hitloc&#39;,
  this.GetParent().GetAbsOrigin(),
  true,
);
this.AddParticle(particle, false, false, -1, false, true);
</code></pre><p>} }</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Итак, модификатор определен, но основные его части еще не определены: безмолвие и снижение сопротивления магии. Давайте сделаем это дальше.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Штаты</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Функция \`CheckState\`, которую имеют модификаторы, вызывается в каждом кадре и устанавливает состояние родительского элемента на основе его модификаторов. Функция получает группу состояний и связывает каждое из них с логическим значением, которое решает, следует ли применять состояние.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Нам нужно только заставить цель замолчать, так что это единственное состояние, которое нам здесь нужно. Добавьте в модификатор следующее:</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>ts CheckState() { return {[ModifierState.SILENCED]: true} }</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Обратите внимание на синтаксис: фигурные скобки начинают [Record](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeystype) состояний, каждому из которых присвоено логическое значение. Если у вас несколько состояний — логические пары, разделяйте каждую пару запятой.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Свойства модификатора</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`DeclareFunctions\` объявляет, какие свойства функции включены в этот модификатор. Поскольку нам нужно свойство, изменяющее магическое сопротивление, назовем его здесь:</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>ts DeclareFunctions() { return [ModifierFunction.MAGICAL_RESISTANCE_BONUS]; }</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>В отличие от состояний, DeclareFunctions ожидает массив функций-модификаторов. Если у вас несколько функций-модификаторов, разделите их запятой.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>:::информация</span></span>
<span class="line"><span>При наведении курсора на имя функции-модификатора (например, \`MAGICAL_RESISTANCE_BONUS\`) появляется всплывающая подсказка, показывающая имя вызова функции связанного свойства. Просто скопируйте функцию в модификатор. Здесь также есть автоматическое заполнение, если вы предпочитаете делать это вручную.</span></span>
<span class="line"><span>:::</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Теперь, когда мы объявили бонус сопротивления магии, давайте вернем отрицательный бонус, чтобы враг получил отрицательный бонус сопротивления магии от этого модификатора:</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>ts GetModifierMagicalResistanceBonus() { return this.resist_debuff ?? 0; }</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Обратите внимание, что эта функция ожидает число — все остальное не принимается.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>:::информация</span></span>
<span class="line"><span>\`this.resist_debuff\` — это предположительно число, полученное из специального значения способности. Однако, если по какой-то причине \`this.resist_debuff\` не инициализирован, он будет неопределенным, что не принимается этой функцией. При использовании [Nullish Coalescing](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#nullish-coalescing) значение по умолчанию равно 0, если \`this.resist_debuff\` не определен.</span></span>
<span class="line"><span>:::</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Вот и все! Простой модификатор состоит из набора простых строк, которые для нас проверяются по типу.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Что дальше?</span></span>
<span class="line"><span>Далее вы можете узнать о событиях в следующем уроке: [Events and Timers in Typescript](typescript-events).</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div>`,36)])])}const m=n(i,[["render",l]]);export{d as __pageData,m as default};
