import{_ as e,o as s,c as n,ag as t}from"./chunks/framework.DUTPmUpA.js";const i="/_assets/eHc3N-2b62c46b84.hjsQgOMz.jpg",o="/_assets/eHpXB-8fe79a1d57.BKRhKzSp.jpg",m=JSON.parse('{"title":"Повторное использование встроенных модификаторов","description":"","frontmatter":{"title":"Повторное использование встроенных модификаторов","author":"Noya","steamId":"76561198046984233","date":"18.01.2015"},"headers":[],"relativePath":"abilities/reutilizing-built-in-modifiers.md","filePath":"abilities/reutilizing-built-in-modifiers.md"}'),p={name:"abilities/reutilizing-built-in-modifiers.md"};function l(u,a,r,c,d,q){return s(),n("div",null,[...a[0]||(a[0]=[t(`<p>ьзование встроенных модификаторов</p><p>Здесь будет объяснено, как повторно использовать любой встроенный модификатор через систему, управляемую данными.</p><p>Это имеет множество применений, так как иногда невозможно воспроизвести некоторые эффекты, которые очень скрыты/жестко запрограммированы в движке.</p><p>В предыдущем примере <a href="/abilities/datadriven/illusion-ability-example">Illusion Ability Example</a> использовал <code>&quot;modifier_illusion modifier&quot;</code> в Lua следующим образом:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>illusion:AddNewModifier(caster, ability, &quot;modifier_illusion&quot;, { duration = duration,</span></span>
<span class="line"><span>                                                                outgoing_damage = outgoingDamage,</span></span>
<span class="line"><span>                                                                incoming_damage = incomingDamage })</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Поля между { } <strong>очень</strong> специфичны.</p><p>Полный список встроенных модификаторов можно найти <a href="https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Scripting/Built-In_Modifier_Names" target="_blank" rel="noreferrer">on the wiki</a>.</p><p><code>AddNewModifier</code> можно заменить управляемым данными блоком действий <code>&quot;ApplyNewModifier&quot;</code> следующим образом:</p><p><strong>Базовый пример:</strong> будет применен 1 кадр MODIFIER_STATE_NO_UNIT_COLLISION.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;ApplyModifier&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    &quot;ModifierName&quot;	&quot;modifier_phased&quot;</span></span>
<span class="line"><span>    &quot;Target&quot;       &quot;TARGET&quot;</span></span>
<span class="line"><span>    &quot;Duration&quot;     &quot;0.03&quot;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>Однако это не более чем ярлык, позволяющий избежать создания нового модификатора с состоянием. Настоящая сила этого метода заключается в применении модификаторов с очень настраиваемыми свойствами, которые нелегко воспроизвести с помощью базовых свойств/состояний и т. д.</p><br><p>Например, в способности <code>alchemist_chemical_rage</code> Alchemist меняет анимацию атаки/холостого хода/бега, эффект модели, звук атаки, а также получает бонус способности.</p><p>Если бы мы хотели получить все косметические свойства, но с разными эффектами способностей, нам нужно было бы переписать навык с нуля, но, к сожалению, звук автоатаки и анимацию атаки/холостого хода/бега изменить нелегко, и нам пришлось бы найти дурацкий обходной путь для этого.</p><p>Вместо этого мы можем использовать <code>&quot;modifier_alchemist_chemical_rage_transform&quot;</code>, который будет обрабатывать все, трансформируя героя и применяя <code>&quot;modifier_alchemist_chemical_rage&quot;</code> с именно той способностью, которую мы хотим. <br></p><p>Теперь, чтобы узнать имена полей и передать значения модификатору, выполните следующие действия:</p><h2 id="шаг-1-находим-модификатор-способности" tabindex="-1">Шаг 1. Находим модификатор способности <a class="header-anchor" href="#шаг-1-находим-модификатор-способности" aria-label="Permalink to &quot;Шаг 1. Находим модификатор способности&quot;">​</a></h2><p>Перейдите к исходной способности из списка, использующей модификатор, который вы хотите повторно использовать. <a href="https://github.com/Pizzalol/SpellLibrary/tree/SpellLibrary/game/dota_addons/spelllibrary/scripts/npc/abilities" target="_blank" rel="noreferrer">SpellLibrary</a> содержит разделенный список всех способностей Dota со своими именами, найти поля там очень легко.</p><br><h2 id="шаг-2-установка-полеиabilityvalues" tabindex="-1">Шаг 2. Установка полейabilityValues <a class="header-anchor" href="#шаг-2-установка-полеиabilityvalues" aria-label="Permalink to &quot;Шаг 2. Установка полейabilityValues&quot;">​</a></h2><p>Скопируйте специальные способности из основной способности в управляемый данными блок «AbilityValues». Если у пользовательской способности нет поля, модификатор по умолчанию будет равен 0, поэтому вы можете удалить те, которые хотите игнорировать.</p><p><strong>Пример:</strong> блок <a href="https://github.com/Pizzalol/SpellLibrary/blob/SpellLibrary/game/dota_addons/spelllibrary/scripts/npc/abilities/alchemist_chemical_rage_datadriven.txt#L30" target="_blank" rel="noreferrer">alchemist_chemical_rage</a>abilityValues ​​с двумя добавленными значениями и удаленной большей частью бонуса способностей.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;AbilityValues&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  &quot;duration&quot; &quot;25.0&quot;</span></span>
<span class="line"><span>  &quot;transformation_time&quot; &quot;0.35&quot;</span></span>
<span class="line"><span>  &quot;bonus_movespeed_percent&quot; &quot;50&quot;</span></span>
<span class="line"><span>  &quot;bonus_attack_speed&quot; &quot;322&quot;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><br><h2 id="шаг-3-применение-модификатора" tabindex="-1">Шаг 3. Применение модификатора <a class="header-anchor" href="#шаг-3-применение-модификатора" aria-label="Permalink to &quot;Шаг 3. Применение модификатора&quot;">​</a></h2><p>К нужному событию способности или модификатора добавьте действие ApplyModifier:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;ApplyModifier&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    &quot;ModifierName&quot; &quot;modifier_alchemist_chemical_rage_transform&quot;</span></span>
<span class="line"><span>    &quot;Target&quot;       &quot;CASTER&quot;</span></span>
<span class="line"><span>    &quot;Duration&quot;     &quot;%transformation_time&quot;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><strong>Без поля «Длительность»</strong> модификатор может быть применен для продолжительности = nil, что означает бесконечную продолжительность.</p><br><h2 id="шаг-4-настроика-всплывающеи-подсказки" tabindex="-1">Шаг 4. Настройка всплывающей подсказки <a class="header-anchor" href="#шаг-4-настроика-всплывающеи-подсказки" aria-label="Permalink to &quot;Шаг 4. Настройка всплывающей подсказки&quot;">​</a></h2><p><img src="`+i+`" alt="img"></p><p>Всплывающую подсказку modifier_alchemist_chemical_rage необходимо настроить так, чтобы она игнорировала ненужные нам значенияabilityValue и вместо этого использовала наши <code>bonus_attack_speed</code> и <code>bonus_movespeed_percent</code>.</p><ol><li><p>Перейдите к <code>dota_english.txt</code>, который можно найти в основном файле Dota или в <a href="https://raw.githubusercontent.com/dotabuff/d2vpk/master/dota/resource/dota_english.txt" target="_blank" rel="noreferrer">this repository link</a>.</p></li><li><p>Найдите всплывающую подсказку модификатора заклинания, которое мы хотим изменить, скопируйте ее в свой <code>addon_english.txt</code> и отредактируйте:</p></li></ol><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;DOTA_Tooltip_modifier_alchemist_chemical_rage&quot;             &quot;Legacy Chemical Rage&quot;</span></span>
<span class="line"><span>&quot;DOTA_Tooltip_modifier_alchemist_chemical_rage_Description&quot;	&quot;Increasing attack and movement speed.&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>После изменения <code>addon_english.txt</code>:</p><p><img src="`+o+`" alt="img"></p><p>Обратите внимание, что вы не можете ссылаться на новый пользовательский <code>%dMODIFIER_PROPERTY_</code><a href="/abilities/ability-keyvalues">CONSTANT_LIST</a><code>%</code> в подсказке, поскольку он не имеет пользовательских значений в своем модификаторе.</p><p>Вместо этого вы можете сделать эти всплывающие подсказки в отдельном модификаторе или напрямую добавить числа в исходную всплывающую подсказку модификатора, если они являются статическими значениями (например, в этом случае я мог бы написать 50 и 322). К сожалению, вы также не можете сделать встроенный модификатор скрытым.</p><br> ## Полный пример \`\`\` &quot;alchemist_chemical_rage_warcraft&quot; { &quot;BaseClass&quot; &quot;ability_datadriven&quot; &quot;AbilityTextureName&quot; &quot;alchemist_chemical_rage_warcraft&quot; &quot;MaxLevel&quot; &quot;3&quot; <pre><code>&quot;AbilityBehavior&quot;      &quot;DOTA_ABILITY_BEHAVIOR_NO_TARGET&quot;
&quot;AbilityCastAnimation&quot; &quot;ACT_DOTA_ALCHEMIST_CHEMICAL_RAGE_START&quot;

&quot;AbilityCastRange&quot;      &quot;700&quot;
&quot;AbilityCastPoint&quot;      &quot;0.0&quot;
&quot;AbilityCooldown&quot;       &quot;30.0&quot;

&quot;AbilityManaCost&quot;       &quot;25&quot;

&quot;AbilityValues&quot;
{
    &quot;duration&quot; &quot;15.0&quot;
    &quot;transformation_time&quot; &quot;0.35&quot;
    &quot;bonus_movespeed_percent&quot; &quot;50&quot;
    &quot;bonus_attack_speed&quot; &quot;25 75 125&quot;
}

&quot;precache&quot;
{
    &quot;soundfile&quot; &quot;soundevents/game_sounds_heroes/game_sounds_alchemist.vsndevts&quot;
    &quot;particle&quot;  &quot;particles/status_fx/status_effect_chemical_rage.vpcf&quot;
    &quot;particle&quot;  &quot;particles/units/heroes/hero_alchemist/alchemist_chemical_rage.vpcf&quot;
}

&quot;OnSpellStart&quot;
{
    &quot;FireSound&quot;
    {
        &quot;EffectName&quot;   &quot;Hero_Alchemist.ChemicalRage.Cast&quot;
        &quot;Target&quot;       &quot;CASTER&quot;
    }

    &quot;ApplyModifier&quot;
    {
        &quot;ModifierName&quot; &quot;modifier_alchemist_chemical_rage_transform&quot;
        &quot;Target&quot;       &quot;CASTER&quot;
        &quot;Duration&quot;     &quot;%transformation_time&quot;
    }

    // Extra Modifier with what we need to add for the custom ability
    &quot;ApplyModifier&quot;
    {
        &quot;ModifierName&quot; &quot;modifier_chemical_rage_warcraft&quot;
        &quot;Target&quot;       &quot;CASTER&quot;
    }
</code></pre><p>}</p><pre><code>&quot;Modifiers&quot;
{

    &quot;modifier_chemical_rage_warcraft&quot;
    {
        &quot;IsBuff&quot;   &quot;1&quot;
        &quot;IsHidden&quot; &quot;1&quot;
        &quot;Duration&quot; &quot;%duration&quot;

        &quot;Properties&quot;
        {
            &quot;MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT&quot; &quot;%bonus_attack_speed&quot;
            &quot;MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE&quot; &quot;%bonus_movespeed_percent&quot;
        }
    }
}
</code></pre><p>}</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;br /&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Надеемся, это поможет вам получить больше возможностей, если способность, которую вы хотите изменить, еще не была переписана, или получить определенный эффект, который трудно воспроизвести обычными способами.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div>`,45)])])}const _=e(p,[["render",l]]);export{m as __pageData,_ as default};
