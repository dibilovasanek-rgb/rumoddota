import{_ as p,C as t,o as l,c as i,ag as a,E as e}from"./chunks/framework.DUTPmUpA.js";const r="/_assets/yz4ghPc.L_rQcd-X.png",c="/_assets/RepentantYellowishDiscus.CL3MGLl6.mp4",u="/_assets/FrankBleakChihuahua.ytHMgMXp.mp4",b="/_assets/AthleticEminentAnnashummingbird.t2qt-l9o.mp4",q=JSON.parse('{"title":"Учебное пособие по элементам Lua","description":"","frontmatter":{"title":"Учебное пособие по элементам Lua","author":"DrTeaSpoon","steamId":"76561197975484185","date":"07.08.2015"},"headers":[],"relativePath":"abilities/lua-item-tutorial.md","filePath":"abilities/lua-item-tutorial.md"}'),o={name:"abilities/lua-item-tutorial.md"};function m(d,n,h,f,g,_){const s=t("StaticVideo");return l(),i("div",null,[n[0]||(n[0]=a(`<p>бие по элементам Lua</p><p>Это руководство представляет собой пошаговое руководство по созданию совершенно нового элемента с помощью нового базового класса <code>item_lua</code>. В этом первом уроке мы создадим обновление Blink Dagger до Blink Staff. Это будет работать так: при нацеливании на любую точку на земле он будет работать так же, как Blink Dagger, но если вы нацеливаетесь на союзный юнит, вы можете «пометить» его, чтобы он мигал вместо вас. Мы также добавим пассивные бонусы от предмета, который будет в рецепте.</p><h2 id="посох-блинка" tabindex="-1">Посох Блинка <a class="header-anchor" href="#посох-блинка" aria-label="Permalink to &quot;Посох Блинка&quot;">​</a></h2><p>Сначала откройте <code>npc_items_custom.txt</code> в своем любимом текстовом редакторе. Если у вас нет этого файла в папке <code>scripts/npc/</code>, создайте его и скопируйте в него следующее.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;DOTAAbilities&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Первое и самое важное — это дать название вашему предмету. В этом примере я буду использовать «item_blink_staff». Обратите внимание, что использование одного и того же имени при упоминании этого предмета важно, поскольку в dota 2 используются некоторые схемы именования.<br> Мы также настроим уникальный идентификатор для предмета и базовый класс, который сообщит игре, что мы собираемся создать предмет Lua.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;DOTAAbilities&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	&quot;item_blink_staff&quot;</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		&quot;ID&quot;							&quot;1250&quot;</span><span> // anything above 1250 should be safe to use.</span></span>
<span class="line"><span>		&quot;BaseClass&quot;						&quot;item_lua&quot;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>Далее нам нужно изображение предмета. Для этого мы используем «AbilityTextureName», поскольку предметы в Dota 2 классифицируются как способности. Важно, чтобы наш файл изображения находился в правильном месте и имел правильное имя. <br>Для элемента в этом примере файл должен быть найден по следующему пути:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> dota 2 beta\\game\\dota_addons\\{your addon name}\\resource\\flash3\\images\\items\\blink_staff.png</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>обратите внимание, что имя файла — «blink_staff.png», а не «item_blink_staff.png». Это связано с тем, что Dota будет читать имя текстуры способности «item_blink_staff» как «item\\blink_staff.png»<br>. Также важно отметить, что использование одного и того же имени для вашей текстуры способности вдвойне важно, поскольку изображение в магазине не будет отображаться правильно, если вы используете другое имя. <br> Изображение, которое я буду использовать для этого предмета, следующее: <img src="`+r+`" alt="enter image description here" title="blink_staff.png"><br>.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;DOTAAbilities&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	&quot;item_blink_staff&quot;</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		&quot;ID&quot;							&quot;1250&quot;</span><span> // anything above 1250 should be safe to use.</span></span>
<span class="line"><span>		&quot;BaseClass&quot;						&quot;item_lua&quot;</span></span>
<span class="line"><span>		&quot;AbilityTextureName&quot;			&quot;item_blink_staff&quot;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>Последняя часть, которую мы должны добавить, — это ссылка на файл сценария. Вам следует создать новый файл <code>*.lua</code> где-нибудь в папке <code>scripts/vscripts</code>. Вы даже можете создать для него подпапку, если хотите систематизировать. Теперь ваш <code>npc_items_custom.txt</code> должен выглядеть примерно так.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;DOTAAbilities&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	&quot;item_blink_staff&quot;</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		&quot;ID&quot;							&quot;1250&quot;</span><span> // anything above 1250 should be safe to use.</span></span>
<span class="line"><span>		&quot;BaseClass&quot;						&quot;item_lua&quot;</span></span>
<span class="line"><span>		&quot;AbilityTextureName&quot;			&quot;item_blink_staff&quot;</span></span>
<span class="line"><span>		&quot;ScriptFile&quot;					&quot;lua_items/blink_staff/blink_staff.lua&quot;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>Суть предметов и способностей lua в том, что все, что вам действительно нужно определить для них в файле lua, — это их таблица классов. Итак, давайте добавим это в наш lua-файл:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>if item_blink_staff == nil then</span></span>
<span class="line"><span>	item_blink_staff = class({})</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>ВАЖНО: Убедитесь, что вы используете то же имя, которое вы определили в <code>npc_items_custom.txt</code><br>. Теперь мы хотим определить время восстановления и стоимость маны для нашего посоха. Это можно сделать через <code>npc_items_custom.txt</code> или через lua. Обратите внимание, что всем, что мы определяем через lua, мы можем манипулировать более динамично. Например, мы могли бы сократить время восстановления вдвое в ночное время или удвоить затраты маны, если у игрока положительное соотношение k/d.<br> Также преимуществом их определения в <code>npc_items_custom.txt</code> является то, что все, что отображается в магазине (до того, как игрок получит предмет), — это значения, определенные там. Также в настоящее время существует проблема, заключающаяся в том, что манакост всегда будет отображать значение, определенное <code>npc_items_custom.txt</code>, но предмет по-прежнему будет серым (синим?) Неактивен, когда ваша мана ниже, чем определено в lua для стоимости маны. <br> Поскольку мы хотим, чтобы все выглядело гладко, давайте определим некоторые основные параметры, которые мы позже сможем изменить в lua по своему усмотрению:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;DOTAAbilities&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	&quot;item_blink_staff&quot;</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		&quot;ID&quot;							&quot;1250&quot;</span><span> // anything above 1250 should be safe to use.</span></span>
<span class="line"><span>		&quot;BaseClass&quot;						&quot;item_lua&quot;</span></span>
<span class="line"><span>		&quot;AbilityTextureName&quot;			&quot;item_blink_staff&quot;</span></span>
<span class="line"><span>		&quot;ScriptFile&quot;					&quot;lua_items/blink_staff/blink_staff.lua&quot;</span></span>
<span class="line"><span>		// Casting</span></span>
<span class="line"><span>		//--------------------------------------------</span></span>
<span class="line"><span>		&quot;AbilityCastRange&quot;				&quot;0&quot;</span><span> //We could define limit here but blink dagger has unlimited range to let player use it more efficiently. The range limiting comes in the script. 0 means unlimited.</span></span>
<span class="line"><span>		&quot;AbilityCastPoint&quot;				&quot;0.3&quot;</span><span> //It&#39;s the wind up time of spell.</span></span>
<span class="line"><span>		&quot;AbilityCooldown&quot;				&quot;10.0&quot;</span></span>
<span class="line"><span>		&quot;AbilityManaCost&quot;				&quot;50&quot;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>Для получения дополнительной информации о ключах и значениях предметов используйте руководство Noyas: <a href="./item-keyvalues">Datadriven items</a></p><p><br> Это отличный справочник, но давайте продолжим с lua!</p><h2 id="определение-правил-приведения" tabindex="-1">Определение правил приведения <a class="header-anchor" href="#определение-правил-приведения" aria-label="Permalink to &quot;Определение правил приведения&quot;">​</a></h2><p>Сначала мы добавляем поведение. Это определит, что произойдет, когда игрок активирует горячую клавишу предмета.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function item_blink_staff:GetBehavior()</span></span>
<span class="line"><span>	local behav = DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_UNIT_TARGET + DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES</span></span>
<span class="line"><span>	return behav</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Функция GetBehaviour() вызывается движком, когда ему необходимо знать, как способность должна действовать в различных случаях. «Возврат» должен возвращать числовое значение «int». Valve упростила нам определение этого, предоставив их в виде ключей, которые мы можем просто суммировать. Эти значения используют преимущества битового диапазона, например:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Key ------ Value ------ Bytes</span></span>
<span class="line"><span>DOTA_ABILITY_BEHAVIOR_UNIT_TARGET ------ 8 ------ 01000</span></span>
<span class="line"><span>DOTA_ABILITY_BEHAVIOR_POINT ------ 16 ------ 10000</span></span>
<span class="line"><span>DOTA_ABILITY_BEHAVIOR_UNIT_TARGET + DOTA_ABILITY_BEHAVIOR_POINT ------ 24 ------ 11000</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Как вы можете видеть по байтам, хотя значение может выглядеть произвольным, байты действуют как переключатель включения/выключения поведения. Для доступных значений поведения используйте следующую ссылку: <a href="https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Scripting/API#DOTA_ABILITY_BEHAVIOR" target="_blank" rel="noreferrer">https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Scripting/API#DOTA_ABILITY_BEHAVIOR</a>.</p><p>Далее мы добавляем стоимость маны и время восстановления.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function item_blink_staff:GetManaCost()</span></span>
<span class="line"><span>	return 50</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function item_blink_staff:GetCooldown( nLevel )</span></span>
<span class="line"><span>	return 10</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>Поскольку предметы определяются как способности, функция GetCooldown имеет вспомогательный параметр для уровня способности. Вы можете полностью игнорировать его для предметов, поскольку уровень почти всегда будет 1 (за исключением угловых случаев, таких как bkb или dagon).</p><p>Теперь давайте перейдем к самой части произнесения заклинаний.</p><p>Сначала мы создаем функцию OnSpellStart() и определяем некоторые начальные ключи для использования в скрипте.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function item_blink_staff:OnSpellStart()</span></span>
<span class="line"><span>	local hCaster = self:GetCaster() --We will always have Caster.</span></span>
<span class="line"><span>	local hTarget = false --We might not have target so we make fail-safe so we do not get an error when calling - self:GetCursorTarget()</span></span>
<span class="line"><span>	if not self:GetCursorTargetingNothing() then</span></span>
<span class="line"><span>		hTarget = self:GetCursorTarget()</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>	local vPoint = self:GetCursorPosition() --We will always have Vector for the point.</span></span>
<span class="line"><span>	local vOrigin = hCaster:GetAbsOrigin() --Our caster&#39;s location</span></span>
<span class="line"><span>	local nMaxBlink = 1200 --How far can we actually blink?</span></span>
<span class="line"><span>	local nClamp = 960 --If we try to over reach we use this value instead. (this is mechanic from blink dagger.)</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>Обратите внимание: пока мы находимся в классе «item_blink_staff», мы можем использовать «self» в качестве быстрой ссылки на него. <br> Теперь, когда мы все настроили, давайте начнем моргать нашим заклинателем!</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function item_blink_staff:OnSpellStart()</span></span>
<span class="line"><span>	local hCaster = self:GetCaster() --We will always have Caster.</span></span>
<span class="line"><span>	local hTarget = false --We might not have target so we make fail-safe so we do not get an error when calling - self:GetCursorTarget()</span></span>
<span class="line"><span>	if not self:GetCursorTargetingNothing() then</span></span>
<span class="line"><span>		hTarget = self:GetCursorTarget()</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>	local vPoint = self:GetCursorPosition() --We will always have Vector for the point.</span></span>
<span class="line"><span>	local vOrigin = hCaster:GetAbsOrigin() --Our caster&#39;s location</span></span>
<span class="line"><span>	local nMaxBlink = 1200 --How far can we actually blink?</span></span>
<span class="line"><span>	local nClamp = 960 --If we try to over reach we use this value instead. (this is mechanic from blink dagger.)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	ProjectileManager:ProjectileDodge(hCaster)  --We disjoint disjointable incoming projectiles.</span></span>
<span class="line"><span>	ParticleManager:CreateParticle(&quot;particles/items_fx/blink_dagger_start.vpcf&quot;, PATTACH_ABSORIGIN, hCaster) --Create particle effect at our caster.</span></span>
<span class="line"><span>	hCaster:EmitSound(&quot;DOTA_Item.BlinkDagger.Activate&quot;) --Emit sound for the blink</span></span>
<span class="line"><span>	local vDiff = vPoint - vOrigin --Difference between the points</span></span>
<span class="line"><span>	if vDiff:Length2D() &gt; nMaxBlink then  --Check caster is over reaching.</span></span>
<span class="line"><span>		vPoint = vOrigin + (vPoint - vOrigin):Normalized() * nClamp -- Recalculation of the target point.</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>	hCaster:SetAbsOrigin(vPoint) --We move the caster instantly to the location</span></span>
<span class="line"><span>	FindClearSpaceForUnit(hCaster, vPoint, false) --This makes sure our caster does not get stuck</span></span>
<span class="line"><span>	ParticleManager:CreateParticle(&quot;particles/items_fx/blink_dagger_end.vpcf&quot;, PATTACH_ABSORIGIN, hCaster) --Create particle effect at our caster.</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>ВАЖНО: мы используем звуки и эффекты частиц, уже предварительно кэшированные по умолчанию. Если вы хотите использовать эффекты частиц и звуки других героев или ваших собственных героев, вам необходимо выполнить предварительное кэширование этих ресурсов. <br> Вот что наш предмет должен делать прямо сейчас:</p>`,34)),e(s,{path:c}),n[1]||(n[1]=a(`<h2 id="применить-к-союзникам" tabindex="-1">Применить к союзникам <a class="header-anchor" href="#применить-к-союзникам" aria-label="Permalink to &quot;Применить к союзникам&quot;">​</a></h2><p>Теперь мы собираемся создать деталь, которая сделает этот предмет уникальным по сравнению с Blink Dagger. Сначала мы добавляем оператор if в нашу функцию приведения, который определяет, как он должен действовать в зависимости от цели. В то же время мы следим за тем, чтобы двойное нажатие на предмет работало так же, как и в случае с Blink Dagger (самоприцеливание мигает в сторону базы).</p><p>Поскольку с этими возможностями Lua все еще есть некоторые незначительные проблемы, нам придется вернуться к нашему файлу npc_items_custom.txt, чтобы добавить некоторую помощь по таргетингу. Просто добавьте следующее к элементу.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>		&quot;AbilityUnitTargetTeam&quot;			&quot;DOTA_UNIT_TARGET_TEAM_FRIENDLY&quot;</span></span>
<span class="line"><span>		&quot;AbilityUnitTargetType&quot;			&quot;DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Теперь, взглянув на наш Lua-код, вы увидите, что мы можем использовать большую часть нашего написанного блинк-кода в нескольких местах. Вот почему мы собираемся немного изменить ситуацию следующим образом:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function item_blink_staff:OnSpellStart()</span></span>
<span class="line"><span>	local hCaster = self:GetCaster() --We will always have Caster.</span></span>
<span class="line"><span>	local hTarget = false --We might not have target so we make fail-safe so we do not get an error when calling - self:GetCursorTarget()</span></span>
<span class="line"><span>	if not self:GetCursorTargetingNothing() then</span></span>
<span class="line"><span>		hTarget = self:GetCursorTarget()</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>	local vPoint = self:GetCursorPosition() --We will always have Vector for the point.</span></span>
<span class="line"><span>	local vOrigin = hCaster:GetAbsOrigin() --Our caster&#39;s location</span></span>
<span class="line"><span>	local nMaxBlink = 1200 --How far can we actually blink?</span></span>
<span class="line"><span>	local nClamp = 960 --If we try to over reach we use this value instead. (this is mechanic from blink dagger.)</span></span>
<span class="line"><span>	self:Blink(hCaster, vPoint, nMaxBlink, nClamp)</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>function item_blink_staff:Blink(hTarget, vPoint, nMaxBlink, nClamp)</span></span>
<span class="line"><span>	local vOrigin = hTarget:GetAbsOrigin() --Our units&#39;s location</span></span>
<span class="line"><span>	ProjectileManager:ProjectileDodge(hTarget)  --We disjoint disjointable incoming projectiles.</span></span>
<span class="line"><span>	ParticleManager:CreateParticle(&quot;particles/items_fx/blink_dagger_start.vpcf&quot;, PATTACH_ABSORIGIN, hTarget) --Create particle effect at our caster.</span></span>
<span class="line"><span>	hTarget:EmitSound(&quot;DOTA_Item.BlinkDagger.Activate&quot;) --Emit sound for the blink</span></span>
<span class="line"><span>	local vDiff = vPoint - vOrigin --Difference between the points</span></span>
<span class="line"><span>	if vDiff:Length2D() &gt; nMaxBlink then  --Check caster is over reaching.</span></span>
<span class="line"><span>		vPoint = vOrigin + (vPoint - vOrigin):Normalized() * nClamp -- Recalculation of the target point.</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>	hTarget:SetAbsOrigin(vPoint) --We move the caster instantly to the location</span></span>
<span class="line"><span>	FindClearSpaceForUnit(hTarget, vPoint, false) --This makes sure our caster does not get stuck</span></span>
<span class="line"><span>	ParticleManager:CreateParticle(&quot;particles/items_fx/blink_dagger_end.vpcf&quot;, PATTACH_ABSORIGIN, hTarget) --Create particle effect at our caster.</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p>Теперь мы можем просто использовать недавно определенную функцию Blink, чтобы моргать нашему заклинателю и союзникам, не записывая все это заново. <br> Давайте сейчас напишем кастинг. Сначала мы создаем оператор IF, чтобы проверить, есть ли у нас hTarget. Затем мы проверяем, совпадает ли цель с заклинателем или нет. Также, если у нас нет hTarget, мы по умолчанию моргаем сами. Чтобы получить местоположение, к которому мы хотим мигнуть, нам нужно найти какое-то целевое местоположение. Для этого мы воспользуемся фонтаном. (ent_dota_fountain)</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function item_blink_staff:OnSpellStart()</span></span>
<span class="line"><span>	local hCaster = self:GetCaster() --We will always have Caster.</span></span>
<span class="line"><span>	local hTarget = false --We might not have target so we make fail-safe so we do not get an error when calling - self:GetCursorTarget()</span></span>
<span class="line"><span>	if not self:GetCursorTargetingNothing() then</span></span>
<span class="line"><span>		hTarget = self:GetCursorTarget()</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>	local vPoint = self:GetCursorPosition() --We will always have Vector for the point.</span></span>
<span class="line"><span>	local vOrigin = hCaster:GetAbsOrigin() --Our caster&#39;s location</span></span>
<span class="line"><span>	local nMaxBlink = 1200 --How far can we actually blink?</span></span>
<span class="line"><span>	local nClamp = 960 --If we try to over reach we use this value instead. (this is mechanic from blink dagger.)</span></span>
<span class="line"><span>	if hTarget then</span></span>
<span class="line"><span>		if hCaster == hTarget then</span></span>
<span class="line"><span>			if not self.hFountain and not self.bNoFountain then --We check if we have ever tried finding the fountain before.</span></span>
<span class="line"><span>			local hFountain = Entities:FindByClassname(nil, &quot;ent_dota_fountain&quot;) --Find first fountain</span></span>
<span class="line"><span>			local bFound = false --Make the boolean for while statement.</span></span>
<span class="line"><span>				while not bFound do</span></span>
<span class="line"><span>					if hFountain then --Is there a fountain entity?</span></span>
<span class="line"><span>						if hFountain:GetTeamNumber() == hCaster:GetTeamNumber() then -- Is it the right team?</span></span>
<span class="line"><span>							self.hFountain = hFountain --Store it so we don&#39;t have to trouble finding the foundtain again.</span></span>
<span class="line"><span>							bFound = true --Make sure while statement ends</span></span>
<span class="line"><span>						else</span></span>
<span class="line"><span>							hFountain = Entities:FindByClassname(hFountain, &quot;ent_dota_fountain&quot;) --Find the next fountain if we didn&#39;t find the right team.</span></span>
<span class="line"><span>						end</span></span>
<span class="line"><span>					else</span></span>
<span class="line"><span>						self.bNoFountain = true --We have concluded that there is no fountain entity for this team. Lets not do that again!</span></span>
<span class="line"><span>						bFound = true --We could alternatively use &#39;Break&#39; but I find this more funny.</span></span>
<span class="line"><span>					end</span></span>
<span class="line"><span>				end</span></span>
<span class="line"><span>			end</span></span>
<span class="line"><span>			if self.hFountain then --Do we have fountain?</span></span>
<span class="line"><span>				vPoint = self.hFountain:GetAbsOrigin() --Lets change our target location there then.</span></span>
<span class="line"><span>				self:Blink(hCaster, vPoint, nMaxBlink, nClamp) --BLINK!</span></span>
<span class="line"><span>			else</span></span>
<span class="line"><span>				self:EndCooldown()</span></span>
<span class="line"><span>				self:RefundManaCost()</span></span>
<span class="line"><span>			end</span></span>
<span class="line"><span>		end</span></span>
<span class="line"><span>	else</span></span>
<span class="line"><span>		self:Blink(hCaster, vPoint, nMaxBlink, nClamp) --BLINK!</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br></div></div><p>Как видите, на этот раз мы использовали оператор while, чтобы просмотреть все фонтанные сущности и сохранить результаты поиска в способности. Если он не находит объектов, он сохраняет логическое значение, чтобы в следующий раз не пытаться найти фонтан. Также, как и в случае с Blink Dagger, если цель не может быть найдена, мы вообще не будем мигать.</p><br> Далее нам нужно разрешить нацеливание заклинания на союзников, но вместо моргания мы сохраняем их идентификатор для в следующий раз мы сделаем «точечное» наведение на землю. Есть несколько способов сделать это, но это было бы справедливо. если мы дадим им какое-то предупреждение о том, что происходит. Итак, давайте создадим два модификатора. Один будет просто воздействовать на целевого союзника, и один из них будет скрытым модификатором для хранения индекса объекта цели. на короткий срок. <p>Сначала нам нужно связать предполагаемые модификаторы со способностью. Верхняя часть вашего lua-файла Blink Staff должна выглядеть так:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>if item_blink_staff == nil then</span></span>
<span class="line"><span>	item_blink_staff = class({})</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>LinkLuaModifier( &quot;item_blink_staff_effect_modifier&quot;, &quot;lua_items/blink_staff/effect_modifier.lua&quot;, LUA_MODIFIER_MOTION_NONE )</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>Затем нам понадобится объявленный файл модификатора эффекта. В этом уроке мы будем использовать эффект частиц для браслета, чтобы мы могли снова пропустить прекэш.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>if item_blink_staff_effect_modifier == nil then</span></span>
<span class="line"><span>	item_blink_staff_effect_modifier = class({})</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function item_blink_staff_effect_modifier:OnCreated( kv )</span></span>
<span class="line"><span>	if IsServer() then</span></span>
<span class="line"><span>		if self:GetCaster() ~= self:GetParent() then</span></span>
<span class="line"><span>			local nFXIndex = ParticleManager:CreateParticle(&quot;particles/items_fx/armlet.vpcf&quot;, PATTACH_ROOTBONE_FOLLOW, self:GetParent())</span></span>
<span class="line"><span>			self:AddParticle( nFXIndex, false, false, -1, false, false )</span></span>
<span class="line"><span>		end</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function item_blink_staff_effect_modifier:GetAttributes()</span></span>
<span class="line"><span>	return MODIFIER_ATTRIBUTE_MULTIPLE + MODIFIER_ATTRIBUTE_IGNORE_INVULNERABLE</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function item_blink_staff_effect_modifier:IsHidden()</span></span>
<span class="line"><span>	if self:GetCaster() == self:GetParent() then</span></span>
<span class="line"><span>	return true</span></span>
<span class="line"><span>	else</span></span>
<span class="line"><span>	return false</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>Как видите, мы впервые использовали функцию IsServer(). Это используется для того, чтобы часть игровой логики не запускалась несколько раз (поскольку некоторые части кода выполняются как на клиентах, так и на сервере). Также в этом уроке мы будем использовать один и тот же эффект как для заклинателя, так и для цели посоха. Мы могли бы создать два модификатора, но это было бы расточительно. Вот почему мы добавили к модификатору некоторые дополнительные функции, чтобы мы могли различать, является ли целью модификатора заклинатель или нет. Также, если в игре более одного посоха для блинка, мы позаботимся о том, чтобы на одном юните могло быть несколько модификаторов одного и того же типа.</p><p>Теперь нам нужно добавить код, который позволит нам добавить модификатор к цели и сохранить индекс сущности этой цели в нашем модификаторе, а при приведении точки снова получить цель. В этом уроке мы даем игроку пять секунд на перекаст. Мы также прекращаем перезарядку и возвращаем мана-затраты союзнику.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function item_blink_staff:OnSpellStart()</span></span>
<span class="line"><span>	local hCaster = self:GetCaster() --We will always have Caster.</span></span>
<span class="line"><span>	local hTarget = false --We might not have target so we make fail-safe so we do not get an error when calling - self:GetCursorTarget()</span></span>
<span class="line"><span>	if not self:GetCursorTargetingNothing() then</span></span>
<span class="line"><span>		hTarget = self:GetCursorTarget()</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>	local vPoint = self:GetCursorPosition() --We will always have Vector for the point.</span></span>
<span class="line"><span>	local vOrigin = hCaster:GetAbsOrigin() --Our caster&#39;s location</span></span>
<span class="line"><span>	local nMaxBlink = 1200 --How far can we actually blink?</span></span>
<span class="line"><span>	local nClamp = 960 --If we try to over reach we use this value instead. (this is mechanic from blink dagger.)</span></span>
<span class="line"><span>	if hTarget then</span></span>
<span class="line"><span>		if hCaster == hTarget then</span></span>
<span class="line"><span>			if not self.hFountain and not self.bNoFountain then --We check if we have ever tried finding the fountain before.</span></span>
<span class="line"><span>			local hFountain = Entities:FindByClassname(nil, &quot;ent_dota_fountain&quot;) --Find first fountain</span></span>
<span class="line"><span>			local bFound = false --Make the boolean for while statement.</span></span>
<span class="line"><span>				while not bFound do</span></span>
<span class="line"><span>					if hFountain then --Is there a fountain entity?</span></span>
<span class="line"><span>						if hFountain:GetTeamNumber() == hCaster:GetTeamNumber() then -- Is it the right team?</span></span>
<span class="line"><span>							self.hFountain = hFountain --Store it so we don&#39;t have to trouble finding the foundtain again.</span></span>
<span class="line"><span>							bFound = true --Make sure while statement ends</span></span>
<span class="line"><span>						else</span></span>
<span class="line"><span>							hFountain = Entities:FindByClassname(hFountain, &quot;ent_dota_fountain&quot;) --Find the next fountain if we didn&#39;t find the right team.</span></span>
<span class="line"><span>						end</span></span>
<span class="line"><span>					else</span></span>
<span class="line"><span>						self.bNoFountain = true --We have concluded that there is no fountain entity for this team. Lets not do that again!</span></span>
<span class="line"><span>						bFound = true --We could alternatively use &#39;Break&#39; but I find this more funny.</span></span>
<span class="line"><span>					end</span></span>
<span class="line"><span>				end</span></span>
<span class="line"><span>			end</span></span>
<span class="line"><span>			if self.hFountain then --Do we have fountain?</span></span>
<span class="line"><span>				vPoint = self.hFountain:GetAbsOrigin() --Lets change our target location there then.</span></span>
<span class="line"><span>				self:Blink(hCaster, vPoint, nMaxBlink, nClamp) --BLINK!</span></span>
<span class="line"><span>			else</span></span>
<span class="line"><span>				self:EndCooldown() --Cooldown refund if we could not find fountain on self cast</span></span>
<span class="line"><span>				self:RefundManaCost() --Manacost refund if we could not find fountain on self cast</span></span>
<span class="line"><span>			end</span></span>
<span class="line"><span>		else</span></span>
<span class="line"><span>			hTarget:AddNewModifier( hCaster, self, &quot;item_blink_staff_effect_modifier&quot;, { duration = 5 } ) --lets add modifier to target</span></span>
<span class="line"><span>			hCaster:AddNewModifier( hCaster, self, &quot;item_blink_staff_effect_modifier&quot;, { duration = 5 } ) --lets add modifier to caster</span></span>
<span class="line"><span>			local hModifier = hCaster:FindModifierByNameAndCaster(&quot;item_blink_staff_effect_modifier&quot;, hCaster) --find that modifier (they really should fix this by returning handle when adding new modifier.</span></span>
<span class="line"><span>			local nTargetIndex = hTarget:GetEntityIndex() --lets find the targets entity index</span></span>
<span class="line"><span>			hModifier:SetStackCount(nTargetIndex) --add that index to the modifier as it&#39;s stack count</span></span>
<span class="line"><span>			self:EndCooldown() --Cooldown refund so can cast again</span></span>
<span class="line"><span>			self:RefundManaCost() --Manacost refund</span></span>
<span class="line"><span>		end</span></span>
<span class="line"><span>	else</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		local hModifier = hCaster:FindModifierByNameAndCaster(&quot;item_blink_staff_effect_modifier&quot;, hCaster) --Check if we have someone selected</span></span>
<span class="line"><span>		if hModifier then</span></span>
<span class="line"><span>			hTarget = EntIndexToHScript(hModifier:GetStackCount()) --Find the target with the ent index</span></span>
<span class="line"><span>			if hTarget:FindModifierByNameAndCaster(&quot;item_blink_staff_effect_modifier&quot;, hCaster) then --Check if the target is not purged.</span></span>
<span class="line"><span>				self:Blink(hTarget, vPoint, nMaxBlink, nClamp) --BLINK!</span></span>
<span class="line"><span>			else --Someone purged our target</span></span>
<span class="line"><span>			self:Blink(hCaster, vPoint, nMaxBlink, nClamp) --BLINK!</span></span>
<span class="line"><span>			end</span></span>
<span class="line"><span>		else</span></span>
<span class="line"><span>			self:Blink(hCaster, vPoint, nMaxBlink, nClamp) --BLINK!</span></span>
<span class="line"><span>		end</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br></div></div><p>Теперь нам нужно сделать еще две вещи, прежде чем мы закончим работу с нашим lua-скриптом. На данный момент этот предмет имеет неограниченную дальность применения для поражения союзного юнита. У нас также есть проблема со злоупотреблением этим предметом, когда цель не хочет, чтобы кто-то «помогал» ей. (Ака. Отключить справку) <br> К счастью, у нас есть один инструмент для них обоих: CastFilterResultTarget и GetCustomCastErrorTarget.<br>Давайте добавим следующие функции в скрипт нашего элемента:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function item_blink_staff:CastFilterResultTarget( hTarget ) -- hTarget is the targeted NPC.</span></span>
<span class="line"><span>	local hCaster = self:GetCaster() --We will always have Caster.</span></span>
<span class="line"><span>	local vOrigin = hCaster:GetAbsOrigin() --Our caster&#39;s location</span></span>
<span class="line"><span>	local vPoint = hTarget:GetAbsOrigin() --Our target&#39;s location</span></span>
<span class="line"><span>	local nMaxRange = 1200 --How far can we actually target?</span></span>
<span class="line"><span>	local vDiff = vPoint - vOrigin --Difference between the points</span></span>
<span class="line"><span>	local nTargetID = hTarget:GetPlayerOwnerID() --getting targets owner id</span></span>
<span class="line"><span>	local nCasterID = hCaster:GetPlayerOwnerID() --getting casters owner id</span></span>
<span class="line"><span>	if nTargetID and nCasterID then --making sure they both exist</span></span>
<span class="line"><span>		if PlayerResource:IsDisableHelpSetForPlayerID(nTargetID, nCasterID) then --target hates having caster help him out.</span></span>
<span class="line"><span>			return UF_FAIL_CUSTOM</span></span>
<span class="line"><span>		end</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	if vDiff:Length2D() &gt; nMaxRange then  --Check caster is over reaching.</span></span>
<span class="line"><span>	return UF_FAIL_CUSTOM</span></span>
<span class="line"><span>	else</span></span>
<span class="line"><span>	return UF_SUCCESS</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function item_blink_staff:GetCustomCastErrorTarget( hTarget) -- hTarget is the targeted NPC.</span></span>
<span class="line"><span>	local hCaster = self:GetCaster() --We will always have Caster.</span></span>
<span class="line"><span>	local vOrigin = hCaster:GetAbsOrigin() --Our caster&#39;s location</span></span>
<span class="line"><span>	local vPoint = hTarget:GetAbsOrigin() --Our target&#39;s location</span></span>
<span class="line"><span>	local nMaxRange = 1200 --How far can we actually target?</span></span>
<span class="line"><span>	local vDiff = vPoint - vOrigin --Difference between the points</span></span>
<span class="line"><span>	local nTargetID = hTarget:GetPlayerOwnerID() --getting targets owner id</span></span>
<span class="line"><span>	local nCasterID = hCaster:GetPlayerOwnerID() --getting casters owner id</span></span>
<span class="line"><span>	if nTargetID and nCasterID then --making sure they both exist</span></span>
<span class="line"><span>		if PlayerResource:IsDisableHelpSetForPlayerID(nTargetID, nCasterID) then --target hates having caster help him out.</span></span>
<span class="line"><span>			return &quot;#dota_hud_error_target_has_disable_help&quot;</span></span>
<span class="line"><span>		end</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>	if vDiff:Length2D() &gt; nMaxRange then  --Check caster is over reaching.</span></span>
<span class="line"><span>	return &quot;#dota_hud_error_target_out_of_range&quot; --returning error from localization</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br></div></div><p>Теперь, чтобы сэкономить время и здравомыслие, вы можете добавить в свой скрипт «специальные» значения. Это значения, которые вы можете легко изменить, не открывая скрипт и не ища их там. Это чрезвычайно полезно, когда вы используете эти значения в нескольких местах. Он также позволяет отображать значения в описании вашего предмета. <br>Сначала добавьте следующий блок к вашему предмету в «npc_items_custom.txt».</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>		&quot;AbilityValues&quot;</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>      &quot;max_blink&quot; &quot;1200&quot;</span></span>
<span class="line"><span>      &quot;blink_clamp&quot; &quot;960&quot;</span></span>
<span class="line"><span>      &quot;help_range&quot; &quot;3000&quot;</span></span>
<span class="line"><span>      &quot;help_duration&quot; &quot;5.0&quot;</span></span>
<span class="line"><span>		}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>Теперь, чтобы использовать эти значения, вы можете использовать эту функцию:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>self:GetSpecialValueFor( &quot;max_blink&quot; )</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Или в вашем модификаторе вы должны сначала получить дескриптор своей способности:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>self:GetAbility():GetSpecialValueFor( &quot;max_blink&quot; )</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Теперь мы находим и заменяем все эти значения правильным получением специального значения, и в итоге мы должны получить следующий результат:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function item_blink_staff:OnSpellStart()</span></span>
<span class="line"><span>	local hCaster = self:GetCaster() --We will always have Caster.</span></span>
<span class="line"><span>	local hTarget = false --We might not have target so we make fail-safe so we do not get an error when calling - self:GetCursorTarget()</span></span>
<span class="line"><span>	if not self:GetCursorTargetingNothing() then</span></span>
<span class="line"><span>		hTarget = self:GetCursorTarget()</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>	local vPoint = self:GetCursorPosition() --We will always have Vector for the point.</span></span>
<span class="line"><span>	local vOrigin = hCaster:GetAbsOrigin() --Our caster&#39;s location</span></span>
<span class="line"><span>	local nMaxBlink = self:GetSpecialValueFor( &quot;max_blink&quot; ) --How far can we actually blink?</span></span>
<span class="line"><span>	local nClamp = self:GetSpecialValueFor( &quot;blink_clamp&quot; ) --If we try to over reach we use this value instead. (this is mechanic from blink dagger.)</span></span>
<span class="line"><span>	if hTarget then</span></span>
<span class="line"><span>		if hCaster == hTarget then</span></span>
<span class="line"><span>			if not self.hFountain and not self.bNoFountain then --We check if we have ever tried finding the fountain before.</span></span>
<span class="line"><span>			local hFountain = Entities:FindByClassname(nil, &quot;ent_dota_fountain&quot;) --Find first fountain</span></span>
<span class="line"><span>			local bFound = false --Make the boolean for while statement.</span></span>
<span class="line"><span>				while not bFound do</span></span>
<span class="line"><span>					if hFountain then --Is there a fountain entity?</span></span>
<span class="line"><span>						if hFountain:GetTeamNumber() == hCaster:GetTeamNumber() then -- Is it the right team?</span></span>
<span class="line"><span>							self.hFountain = hFountain --Store it so we don&#39;t have to trouble finding the foundtain again.</span></span>
<span class="line"><span>							bFound = true --Make sure while statement ends</span></span>
<span class="line"><span>						else</span></span>
<span class="line"><span>							hFountain = Entities:FindByClassname(hFountain, &quot;ent_dota_fountain&quot;) --Find the next fountain if we didn&#39;t find the right team.</span></span>
<span class="line"><span>						end</span></span>
<span class="line"><span>					else</span></span>
<span class="line"><span>						self.bNoFountain = true --We have concluded that there is no fountain entity for this team. Lets not do that again!</span></span>
<span class="line"><span>						bFound = true --We could alternatively use &#39;Break&#39; but I find this more funny.</span></span>
<span class="line"><span>					end</span></span>
<span class="line"><span>				end</span></span>
<span class="line"><span>			end</span></span>
<span class="line"><span>			if self.hFountain then --Do we have fountain?</span></span>
<span class="line"><span>				vPoint = self.hFountain:GetAbsOrigin() --Lets change our target location there then.</span></span>
<span class="line"><span>				self:Blink(hCaster, vPoint, nMaxBlink, nClamp) --BLINK!</span></span>
<span class="line"><span>			else</span></span>
<span class="line"><span>				self:EndCooldown() --Cooldown refund if we could not find fountain on self cast</span></span>
<span class="line"><span>				self:RefundManaCost() --Manacost refund if we could not find fountain on self cast</span></span>
<span class="line"><span>			end</span></span>
<span class="line"><span>		else</span></span>
<span class="line"><span>			hTarget:AddNewModifier( hCaster, self, &quot;item_blink_staff_effect_modifier&quot;, { duration = self:GetSpecialValueFor( &quot;help_duration&quot; ) } ) --lets add modifier to target</span></span>
<span class="line"><span>			hCaster:AddNewModifier( hCaster, self, &quot;item_blink_staff_effect_modifier&quot;, { duration = self:GetSpecialValueFor( &quot;help_duration&quot; ) } ) --lets add modifier to caster</span></span>
<span class="line"><span>			local hModifier = hCaster:FindModifierByNameAndCaster(&quot;item_blink_staff_effect_modifier&quot;, hCaster) --find that modifier (they really should fix this by returning handle when adding new modifier.</span></span>
<span class="line"><span>			local nTargetIndex = hTarget:GetEntityIndex() --lets find the targets entity index</span></span>
<span class="line"><span>			hModifier:SetStackCount(nTargetIndex) --add that index to the modifier as it&#39;s stack count</span></span>
<span class="line"><span>			self:EndCooldown() --Cooldown refund so can cast again</span></span>
<span class="line"><span>			self:RefundManaCost() --Manacost refund</span></span>
<span class="line"><span>		end</span></span>
<span class="line"><span>	else</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		local hModifier = hCaster:FindModifierByNameAndCaster(&quot;item_blink_staff_effect_modifier&quot;, hCaster) --Check if we have someone selected</span></span>
<span class="line"><span>		if hModifier then</span></span>
<span class="line"><span>			hTarget = EntIndexToHScript(hModifier:GetStackCount()) --Find the target with the ent index</span></span>
<span class="line"><span>			if hTarget:FindModifierByNameAndCaster(&quot;item_blink_staff_effect_modifier&quot;, hCaster) then --Check if the target is not purged.</span></span>
<span class="line"><span>				self:Blink(hTarget, vPoint, nMaxBlink, nClamp) --BLINK!</span></span>
<span class="line"><span></span></span>
<span class="line"><span>			else --Someone purged our target</span></span>
<span class="line"><span>			self:Blink(hCaster, vPoint, nMaxBlink, nClamp) --BLINK!</span></span>
<span class="line"><span>			end</span></span>
<span class="line"><span>		else</span></span>
<span class="line"><span>			self:Blink(hCaster, vPoint, nMaxBlink, nClamp) --BLINK!</span></span>
<span class="line"><span>		end</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>function item_blink_staff:Blink(hTarget, vPoint, nMaxBlink, nClamp)</span></span>
<span class="line"><span>	local vOrigin = hTarget:GetAbsOrigin() --Our units&#39;s location</span></span>
<span class="line"><span>	ProjectileManager:ProjectileDodge(hTarget)  --We disjoint disjointable incoming projectiles.</span></span>
<span class="line"><span>	ParticleManager:CreateParticle(&quot;particles/items_fx/blink_dagger_start.vpcf&quot;, PATTACH_ABSORIGIN, hTarget) --Create particle effect at our caster.</span></span>
<span class="line"><span>	hTarget:EmitSound(&quot;DOTA_Item.BlinkDagger.Activate&quot;) --Emit sound for the blink</span></span>
<span class="line"><span>	local vDiff = vPoint - vOrigin --Difference between the points</span></span>
<span class="line"><span>	if vDiff:Length2D() &gt; nMaxBlink then  --Check caster is over reaching.</span></span>
<span class="line"><span>		vPoint = vOrigin + (vPoint - vOrigin):Normalized() * nClamp -- Recalculation of the target point.</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>	hTarget:SetAbsOrigin(vPoint) --We move the caster instantly to the location</span></span>
<span class="line"><span>	FindClearSpaceForUnit(hTarget, vPoint, false) --This makes sure our caster does not get stuck</span></span>
<span class="line"><span>	ParticleManager:CreateParticle(&quot;particles/items_fx/blink_dagger_end.vpcf&quot;, PATTACH_ABSORIGIN, hTarget) --Create particle effect at our caster.</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function item_blink_staff:CastFilterResultTarget( hTarget ) -- hTarget is the targeted NPC.</span></span>
<span class="line"><span>	local hCaster = self:GetCaster() --We will always have Caster.</span></span>
<span class="line"><span>	local vOrigin = hCaster:GetAbsOrigin() --Our caster&#39;s location</span></span>
<span class="line"><span>	local vPoint = hTarget:GetAbsOrigin() --Our target&#39;s location</span></span>
<span class="line"><span>	local nMaxRange = self:GetSpecialValueFor( &quot;help_range&quot; ) --How far can we actually target?</span></span>
<span class="line"><span>	local vDiff = vPoint - vOrigin --Difference between the points</span></span>
<span class="line"><span>	local nTargetID = hTarget:GetPlayerOwnerID() --getting targets owner id</span></span>
<span class="line"><span>	local nCasterID = hCaster:GetPlayerOwnerID() --getting casters owner id</span></span>
<span class="line"><span>	if nTargetID and nCasterID then --making sure they both exist</span></span>
<span class="line"><span>		if PlayerResource:IsDisableHelpSetForPlayerID(nTargetID, nCasterID) then --target hates having caster help him out.</span></span>
<span class="line"><span>			return UF_FAIL_CUSTOM</span></span>
<span class="line"><span>		end</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	if vDiff:Length2D() &gt; nMaxRange then  --Check caster is over reaching.</span></span>
<span class="line"><span>	return UF_FAIL_CUSTOM</span></span>
<span class="line"><span>	else</span></span>
<span class="line"><span>	return UF_SUCCESS</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function item_blink_staff:GetCustomCastErrorTarget( hTarget) -- hTarget is the targeted NPC.</span></span>
<span class="line"><span>	local hCaster = self:GetCaster() --We will always have Caster.</span></span>
<span class="line"><span>	local vOrigin = hCaster:GetAbsOrigin() --Our caster&#39;s location</span></span>
<span class="line"><span>	local vPoint = hTarget:GetAbsOrigin() --Our target&#39;s location</span></span>
<span class="line"><span>	local nMaxRange = self:GetSpecialValueFor( &quot;help_range&quot; ) --How far can we actually target?</span></span>
<span class="line"><span>	local vDiff = vPoint - vOrigin --Difference between the points</span></span>
<span class="line"><span>	local nTargetID = hTarget:GetPlayerOwnerID() --getting targets owner id</span></span>
<span class="line"><span>	local nCasterID = hCaster:GetPlayerOwnerID() --getting casters owner id</span></span>
<span class="line"><span>	if nTargetID and nCasterID then --making sure they both exist</span></span>
<span class="line"><span>		if PlayerResource:IsDisableHelpSetForPlayerID(nTargetID, nCasterID) then --target hates having caster help him out.</span></span>
<span class="line"><span>			return &quot;#dota_hud_error_target_has_disable_help&quot;</span></span>
<span class="line"><span>		end</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>	if vDiff:Length2D() &gt; nMaxRange then  --Check caster is over reaching.</span></span>
<span class="line"><span>	return &quot;#dota_hud_error_target_out_of_range&quot; --returning error from localization</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br></div></div><p>Теперь, если мы хотим убедиться в полной согласованности между npc_items_custom.txt и нашим файлом lua, мы можем использовать self.BaseClass для таких вещей, как время восстановления или диапазон применения. Давайте заменим наши функции затрат маны и времени восстановления, чтобы увидеть, как это работает.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function item_blink_staff:GetManaCost()</span></span>
<span class="line"><span>	return self.BaseClass.GetManaCost( self, nLevel )</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function item_blink_staff:GetCooldown( nLevel )</span></span>
<span class="line"><span>	return self.BaseClass.GetCooldown( self, nLevel )</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>Теперь все, что нам нужно сделать, это сделать локализацию предмета. В папке «dota 2 beta\\game\\dota_addons{имя аддона}\\resource» у вас должен быть файл addon_english.txt<br>. Если вы используете другой язык, вы можете использовать файл с другим именем. Но если другие языки не работают, по умолчанию используется английский. <br> Откройте его и добавьте в микс следующие строки.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>		&quot;DOTA_Tooltip_ability_item_blink_staff&quot;                                           &quot;Blink Staff&quot;</span></span>
<span class="line"><span>		&quot;DOTA_Tooltip_ability_item_blink_staff_Description&quot;                               &quot;Teleport to a target point up to 1200 units away. Can be used on allied units to select them to blink instead of you.&quot;</span></span>
<span class="line"><span>		&quot;DOTA_Tooltip_ability_item_blink_staff_max_blink&quot;                                 &quot;Max Blink Distance:&quot;</span></span>
<span class="line"><span>		&quot;DOTA_Tooltip_ability_item_blink_staff_help_range&quot;                                &quot;Help Range:&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		&quot;DOTA_Tooltip_item_blink_staff_effect_modifier&quot;                                             &quot;Blink Staff&quot;</span></span>
<span class="line"><span>		&quot;DOTA_Tooltip_item_blink_staff_effect_modifier_Description&quot;                                 &quot;Targeted by Blink Staff&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>Давайте посмотрим, что мы имеем сейчас:</p>`,33)),e(s,{path:u}),n[2]||(n[2]=a(`<p>Нам еще предстоит кое-что сделать, но сначала давайте исправим самую очевидную проблему. В настоящее время существует ошибка: <br>. &quot;AbilityUnitTargetTeam&quot; &quot;DOTA_UNIT_TARGET_TEAM_FRIENDLY&quot;<br> Игнорируется!<br> Мы можем это исправить, добавив проверку команды в наши фильтры приведения:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function item_blink_staff:CastFilterResultTarget( hTarget ) -- hTarget is the targeted NPC.</span></span>
<span class="line"><span>	local hCaster = self:GetCaster() --We will always have Caster.</span></span>
<span class="line"><span>	local vOrigin = hCaster:GetAbsOrigin() --Our caster&#39;s location</span></span>
<span class="line"><span>	local vPoint = hTarget:GetAbsOrigin() --Our target&#39;s location</span></span>
<span class="line"><span>	local nMaxRange = self:GetSpecialValueFor( &quot;help_range&quot; ) --How far can we actually target?</span></span>
<span class="line"><span>	local vDiff = vPoint - vOrigin --Difference between the points</span></span>
<span class="line"><span>	local nTargetID = hTarget:GetPlayerOwnerID() --getting targets owner id</span></span>
<span class="line"><span>	local nCasterID = hCaster:GetPlayerOwnerID() --getting casters owner id</span></span>
<span class="line"><span>	if hCaster:GetTeamNumber() ~= hTarget:GetTeamNumber() then</span></span>
<span class="line"><span>		return UF_FAIL_CUSTOM</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>	if nTargetID and nCasterID then --making sure they both exist</span></span>
<span class="line"><span>		if PlayerResource:IsDisableHelpSetForPlayerID(nTargetID, nCasterID) then --target hates having caster help him out.</span></span>
<span class="line"><span>			return UF_FAIL_CUSTOM</span></span>
<span class="line"><span>		end</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	if vDiff:Length2D() &gt; nMaxRange then  --Check caster is over reaching.</span></span>
<span class="line"><span>	return UF_FAIL_CUSTOM</span></span>
<span class="line"><span>	else</span></span>
<span class="line"><span>	return UF_SUCCESS</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function item_blink_staff:GetCustomCastErrorTarget( hTarget) -- hTarget is the targeted NPC.</span></span>
<span class="line"><span>	local hCaster = self:GetCaster() --We will always have Caster.</span></span>
<span class="line"><span>	local vOrigin = hCaster:GetAbsOrigin() --Our caster&#39;s location</span></span>
<span class="line"><span>	local vPoint = hTarget:GetAbsOrigin() --Our target&#39;s location</span></span>
<span class="line"><span>	local nMaxRange = self:GetSpecialValueFor( &quot;help_range&quot; ) --How far can we actually target?</span></span>
<span class="line"><span>	local vDiff = vPoint - vOrigin --Difference between the points</span></span>
<span class="line"><span>	local nTargetID = hTarget:GetPlayerOwnerID() --getting targets owner id</span></span>
<span class="line"><span>	local nCasterID = hCaster:GetPlayerOwnerID() --getting casters owner id</span></span>
<span class="line"><span>	if hCaster:GetTeamNumber() ~= hTarget:GetTeamNumber() then</span></span>
<span class="line"><span>		return &quot;#dota_hud_error_cant_cast_on_enemy&quot;</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>	if nTargetID and nCasterID then --making sure they both exist</span></span>
<span class="line"><span>		if PlayerResource:IsDisableHelpSetForPlayerID(nTargetID, nCasterID) then --target hates having caster help him out.</span></span>
<span class="line"><span>			return &quot;#dota_hud_error_target_has_disable_help&quot;</span></span>
<span class="line"><span>		end</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>	if vDiff:Length2D() &gt; nMaxRange then  --Check caster is over reaching.</span></span>
<span class="line"><span>	return &quot;#dota_hud_error_target_out_of_range&quot; --returning error from localization</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br></div></div><p>Проблема этого метода в том, что пользователю легче моргнуть в сторону врага, чем даже попытаться «помочь» ему/ей. Но в этом уроке мы предполагаем, что вы сами сможете понять, как отредактировать код, чтобы он мигал, когда у заклинателя и цели разные команды, используя в качестве примера изменения фильтра каста. <br> Теперь то, что делает блинк-кинжал менее эффективным, чем инструмент побега, — это время восстановления при ранении. Давайте добавим это! Для этого мы создаем модификатор Intrinsic. Давайте свяжем наш новый модификатор:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>LinkLuaModifier( &quot;item_blink_staff_passive_modifier&quot;, &quot;lua_items/blink_staff/passive_modifier.lua&quot;, LUA_MODIFIER_MOTION_NONE )</span></span>
<span class="line"><span>function item_blink_staff:GetIntrinsicModifierName()</span></span>
<span class="line"><span>	return &quot;item_blink_staff_passive_modifier&quot;</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Теперь создайте для него наш объявленный lua-файл, и его содержимое должно быть примерно таким:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>if item_blink_staff_passive_modifier == nil then</span></span>
<span class="line"><span>	item_blink_staff_passive_modifier = class({})</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function item_blink_staff_passive_modifier:IsHidden()</span></span>
<span class="line"><span>	return true --we want item&#39;s passive abilities to be hidden most of the times</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function item_blink_staff_passive_modifier:DeclareFunctions() --we want to use these functions in this item</span></span>
<span class="line"><span>	local funcs = {</span></span>
<span class="line"><span>		MODIFIER_EVENT_ON_TAKEDAMAGE</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	return funcs</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function item_blink_staff_passive_modifier:OnTakeDamage( params ) --When ever the unit takes damage this is called</span></span>
<span class="line"><span>	if IsServer() then --this should be only run on server.</span></span>
<span class="line"><span>		local hAbility = self:GetAbility() --we get the ability where this modifier is from</span></span>
<span class="line"><span>		if params.attacker ~= self:GetParent() and params.unit == self:GetParent() and  params.attacker:IsHero()  then</span></span>
<span class="line"><span>		hAbility:StartCooldown(hAbility:GetSpecialValueFor( &quot;hurt_cooldown&quot; )) --we start the cooldown</span></span>
<span class="line"><span>		end</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>Как вы можете видеть, используются функции объявления, чтобы сообщить игре, чего ожидать от этого модификатора. Это гарантирует, что игра не будет проверять этот модификатор при каждом событии, которое может быть затронуто. <br> Мы также добавили новое особое значение для времени восстановления, когда заклинатель получает травму. Не забудьте добавить это в ваш «npc_items_custom.txt» в качестве значения с плавающей запятой.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>			&quot;05&quot;</span></span>
<span class="line"><span>			{</span></span>
<span class="line"><span>				&quot;var_type&quot;				&quot;FIELD_FLOAT&quot;</span></span>
<span class="line"><span>				&quot;hurt_cooldown&quot;			&quot;3.0&quot;</span></span>
<span class="line"><span>			}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Теперь мы должны были осветить все основные вопросы. Далее мы добавляем рецепт предмета и добавляем характеристики компонентов.</p><h2 id="рецепт-и-статистика" tabindex="-1">Рецепт и статистика <a class="header-anchor" href="#рецепт-и-статистика" aria-label="Permalink to &quot;Рецепт и статистика&quot;">​</a></h2><p>Как вы могли заметить, тестируя наш предмет, сейчас его покупка не требует затрат золота. Здесь мы можем сделать две вещи. Мы можем либо добавить ItemCost в наш файл npc_items_custom.txt, либо создать рецепт для предмета. Когда вы создаете рецепт предмета, игра автоматически рассчитывает стоимость предмета. Мы также можем добавить ItemCost в наш новый рецепт, чтобы игра знала, что вам также нужно купить его, а не автоматически объединять предметы в один. Мы также добавляем характеристики наших компонентов, поэтому обязательно добавляйте к вашему предмету специальные значения, отражающие характеристики компонента.</p><p>Для своих компонентов я буду использовать item_quarterstaff, item_robe и item_blink. Я также делаю рецепт стоимостью 325 золотых. При создании рецепта следует учитывать одну важную вещь — схему именования. Название рецепта всегда должно быть &#39;item_recipe_your_item&#39;<br> мой предмет: item_blink_staff<br> мой рецепт: item_recipe_blink_staff<br> Также вы должны указать уникальный идентификатор каждого элемента в npc_items_custom.txt. Если вы этого не сделаете, вы можете обнаружить странные ошибки, например, невозможность покупки предмета. Вот мои текущие записи в npc_items_custom.txt</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>	&quot;item_blink_staff&quot;</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		&quot;ID&quot;							&quot;1250&quot;</span></span>
<span class="line"><span>		&quot;BaseClass&quot;						&quot;item_lua&quot;</span></span>
<span class="line"><span>		&quot;ScriptFile&quot;					&quot;lua_items/blink_staff/blink_staff.lua&quot;</span></span>
<span class="line"><span>		&quot;AbilityTextureName&quot;			&quot;item_blink_staff&quot;</span></span>
<span class="line"><span>		&quot;AbilityUnitTargetTeam&quot;			&quot;DOTA_UNIT_TARGET_TEAM_FRIENDLY&quot;</span></span>
<span class="line"><span>		&quot;AbilityUnitTargetType&quot;			&quot;DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC&quot;</span></span>
<span class="line"><span>		&quot;AbilityCastRange&quot;				&quot;0&quot;</span></span>
<span class="line"><span>		&quot;AbilityCastPoint&quot;				&quot;0.3&quot;</span></span>
<span class="line"><span>		&quot;AbilityCooldown&quot;				&quot;10.0&quot;</span></span>
<span class="line"><span>		&quot;AbilityManaCost&quot;				&quot;50&quot;</span></span>
<span class="line"><span>		//// Item Info</span></span>
<span class="line"><span>		////-------------------------------------------------------------------------------------------------------------</span></span>
<span class="line"><span>		&quot;ItemCost&quot;						&quot;3900&quot;</span></span>
<span class="line"><span>		&quot;ItemShopTags&quot;					&quot;blink;staff&quot;</span></span>
<span class="line"><span>		&quot;ItemQuality&quot;					&quot;rare&quot;</span></span>
<span class="line"><span>		&quot;ItemAliases&quot;					&quot;blink;staff&quot;</span></span>
<span class="line"><span>    //</span></span>
<span class="line"><span>		&quot;AbilityValues&quot;</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>      // Blink</span></span>
<span class="line"><span>      &quot;max_blink&quot; &quot;1200&quot;</span></span>
<span class="line"><span>      &quot;blink_clamp&quot; &quot;960&quot;</span></span>
<span class="line"><span>      &quot;help_range&quot; &quot;3000&quot;</span></span>
<span class="line"><span>      &quot;help_duration&quot; &quot;5.0&quot;</span></span>
<span class="line"><span>      &quot;hurt_cooldown&quot; &quot;3.0&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>			// Quearterstaff</span></span>
<span class="line"><span>      &quot;bonus_damage&quot; &quot;10&quot;</span></span>
<span class="line"><span>      &quot;bonus_attack_speed&quot; &quot;10&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // Robe Of Magi</span></span>
<span class="line"><span>      &quot;bonus_int&quot; &quot;6&quot;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&quot;item_recipe_blink_staff&quot;</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		// General</span></span>
<span class="line"><span>		//-------------------------------------------------------------------------------------------------------------</span></span>
<span class="line"><span>		&quot;BaseClass&quot;                     &quot;item_datadriven&quot;</span></span>
<span class="line"><span>		&quot;ID&quot;							&quot;1251&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		// Item Info</span></span>
<span class="line"><span>		//-------------------------------------------------------------------------------------------------------------</span></span>
<span class="line"><span>		&quot;ItemCost&quot;						&quot;325&quot;</span></span>
<span class="line"><span>		&quot;ItemShopTags&quot;					&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		// Recipe</span></span>
<span class="line"><span>		//-------------------------------------------------------------------------------------------------------------</span></span>
<span class="line"><span>		&quot;ItemRecipe&quot;					&quot;1&quot;</span></span>
<span class="line"><span>		&quot;ItemResult&quot;					&quot;item_blink_staff&quot;</span></span>
<span class="line"><span>		&quot;ItemRequirements&quot;</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			&quot;01&quot;						&quot;item_quarterstaff;item_robe;item_blink&quot;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br></div></div><p>Обратите внимание, что в разделе «Требования к элементам» перечислены те элементы, которые вам нужны. Для клапанов, определяемых клапаном, используйте это в качестве ссылки: <br> <a href="https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Scripting/Built-In_Item_Names" target="_blank" rel="noreferrer">https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Scripting/Built-In_Item_Names</a> <br> Также обратите внимание, как первая запись определяется как «01». Это потому, что вы можете создать рецепт, который можно использовать с разными наборами компонентов. Это используется клапаном в Power Threads, где вы можете использовать любой из основных элементов атрибута стоимости 450.<br> Хотя мы определили специальные значения для характеристик нашего посоха, мы фактически нигде не использовали эти значения. Давайте вернемся к нашему Lua-файлу пассивного модификатора посоха, который мы использовали для восстановления при получении урона. <br> Здесь нам нужно объявить новые функции для необходимой нам статистики.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function item_blink_staff_passive_modifier:DeclareFunctions() --we want to use these functions in this item</span></span>
<span class="line"><span>	local funcs = {</span></span>
<span class="line"><span>		MODIFIER_EVENT_ON_TAKEDAMAGE,</span></span>
<span class="line"><span>		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,</span></span>
<span class="line"><span>		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,</span></span>
<span class="line"><span>		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	return funcs</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>Теперь, когда мы объявили, чего мы хотим добиться в игре с помощью этого модификатора, давайте добавим функции, которые игра может вызывать при правильных событиях.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function item_blink_staff_passive_modifier:GetModifierBonusStats_Intellect()</span></span>
<span class="line"><span>	local hAbility = self:GetAbility() --we get the ability where this modifier is from</span></span>
<span class="line"><span>	return hAbility:GetSpecialValueFor( &quot;bonus_int&quot; )</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function item_blink_staff_passive_modifier:GetModifierAttackSpeedBonus_Constant()</span></span>
<span class="line"><span>	local hAbility = self:GetAbility() --we get the ability where this modifier is from</span></span>
<span class="line"><span>	return hAbility:GetSpecialValueFor( &quot;bonus_attack_speed&quot; )</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function item_blink_staff_passive_modifier:GetModifierPreAttack_BonusDamage()</span></span>
<span class="line"><span>	local hAbility = self:GetAbility() --we get the ability where this modifier is from</span></span>
<span class="line"><span>	return hAbility:GetSpecialValueFor( &quot;bonus_damage&quot; )</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>Теперь последнее, что нам нужно сделать, это рассказать игроку о впечатляющих характеристиках, которые дает ему этот предмет. Давайте добавим нашу новую статистику в addon_english.txt<br>. После этого наш файл должен иметь что-то вроде этого:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>		&quot;DOTA_Tooltip_ability_item_blink_staff&quot;                                           &quot;Blink Staff&quot;</span></span>
<span class="line"><span>		&quot;DOTA_Tooltip_ability_item_blink_staff_Description&quot;                               &quot;Teleport to a target point up to 1200 units away. Can be used on allied units to select them to blink instead of you.&quot;</span></span>
<span class="line"><span>		&quot;DOTA_Tooltip_ability_item_blink_staff_max_blink&quot;                                 &quot;Max Blink Distance:&quot;</span></span>
<span class="line"><span>		&quot;DOTA_Tooltip_ability_item_blink_staff_help_range&quot;                                &quot;Help Range:&quot;</span></span>
<span class="line"><span>		&quot;DOTA_Tooltip_ability_item_blink_staff_bonus_damage&quot;                              &quot;+$damage&quot;</span></span>
<span class="line"><span>		&quot;DOTA_Tooltip_ability_item_blink_staff_bonus_attack_speed&quot;                        &quot;+$attack&quot;</span></span>
<span class="line"><span>		&quot;DOTA_Tooltip_ability_item_blink_staff_bonus_int&quot;                                 &quot;+$int&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		&quot;DOTA_Tooltip_item_blink_staff_effect_modifier&quot;                                             &quot;Blink Staff&quot;</span></span>
<span class="line"><span>		&quot;DOTA_Tooltip_item_blink_staff_effect_modifier_Description&quot;                                 &quot;Targeted by Blink Staff&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>Теперь мы почти закончили. Но поскольку самым большим преимуществом элементов Lua является то, что мы можем определять очень много вещей динамически, поэтому в оставшейся части этого урока мы проведем несколько экспериментов, которые могут показаться не очень сбалансированными или разумными с точки зрения игрового процесса, но просто потому, что мы можем!</p><h2 id="расширенное-использование" tabindex="-1">Расширенное использование <a class="header-anchor" href="#расширенное-использование" aria-label="Permalink to &quot;Расширенное использование&quot;">​</a></h2><p>Сначала давайте попробуем повлиять на дальность применения помощи, если мы имеем дело с героем с большим запасом маны. Поскольку мы используем фильтры приведения для ограничения диапазона помощи, мы можем сделать эту часть там. Для этого мы используем уже определенный дескриптор hCaster и функцию :GetMaxMana() для возврата запаса маны героя. Затем мы добавляем это значение к уже существующему диапазону справки. Это означает, что если у нашего заклинателя есть 5000 маны для использования в поздней игре, у него или нее будет огромный диапазон поддержки в 8000 юнитов.<br> Итак, давайте изменим цель CastFilterResult и функции ошибок следующим образом:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>	local nRangeBonus = hCaster:GetMaxMana() --Get our caster&#39;s mana pool</span></span>
<span class="line"><span>	local nMaxRange = self:GetSpecialValueFor( &quot;help_range&quot; ) + nRangeBonus--How far can we actually target?</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Конечный результат должен выглядеть примерно так</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function item_blink_staff:CastFilterResultTarget( hTarget ) -- hTarget is the targeted NPC.</span></span>
<span class="line"><span>	local hCaster = self:GetCaster() --We will always have Caster.</span></span>
<span class="line"><span>	local vOrigin = hCaster:GetAbsOrigin() --Our caster&#39;s location</span></span>
<span class="line"><span>	local vPoint = hTarget:GetAbsOrigin() --Our target&#39;s location</span></span>
<span class="line"><span>	local nRangeBonus = hCaster:GetMaxMana() --Get our caster&#39;s mana pool</span></span>
<span class="line"><span>	local nMaxRange = self:GetSpecialValueFor( &quot;help_range&quot; ) + nRangeBonus--How far can we actually target?</span></span>
<span class="line"><span>	local vDiff = vPoint - vOrigin --Difference between the points</span></span>
<span class="line"><span>	local nTargetID = hTarget:GetPlayerOwnerID() --getting targets owner id</span></span>
<span class="line"><span>	local nCasterID = hCaster:GetPlayerOwnerID() --getting casters owner id</span></span>
<span class="line"><span>	if hCaster:GetTeamNumber() ~= hTarget:GetTeamNumber() then</span></span>
<span class="line"><span>		return UF_FAIL_CUSTOM</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>	if nTargetID and nCasterID then --making sure they both exist</span></span>
<span class="line"><span>		if PlayerResource:IsDisableHelpSetForPlayerID(nTargetID, nCasterID) then --target hates having caster help him out.</span></span>
<span class="line"><span>			return UF_FAIL_CUSTOM</span></span>
<span class="line"><span>		end</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	if vDiff:Length2D() &gt; nMaxRange then  --Check caster is over reaching.</span></span>
<span class="line"><span>	return UF_FAIL_CUSTOM</span></span>
<span class="line"><span>	else</span></span>
<span class="line"><span>	return UF_SUCCESS</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function item_blink_staff:GetCustomCastErrorTarget( hTarget) -- hTarget is the targeted NPC.</span></span>
<span class="line"><span>	local hCaster = self:GetCaster() --We will always have Caster.</span></span>
<span class="line"><span>	local vOrigin = hCaster:GetAbsOrigin() --Our caster&#39;s location</span></span>
<span class="line"><span>	local vPoint = hTarget:GetAbsOrigin() --Our target&#39;s location</span></span>
<span class="line"><span>	local nRangeBonus = hCaster:GetMaxMana() --Get our caster&#39;s mana pool</span></span>
<span class="line"><span>	local nMaxRange = self:GetSpecialValueFor( &quot;help_range&quot; ) + nRangeBonus--How far can we actually target?</span></span>
<span class="line"><span>	local vDiff = vPoint - vOrigin --Difference between the points</span></span>
<span class="line"><span>	local nTargetID = hTarget:GetPlayerOwnerID() --getting targets owner id</span></span>
<span class="line"><span>	local nCasterID = hCaster:GetPlayerOwnerID() --getting casters owner id</span></span>
<span class="line"><span>	if hCaster:GetTeamNumber() ~= hTarget:GetTeamNumber() then</span></span>
<span class="line"><span>		return &quot;#dota_hud_error_cant_cast_on_enemy&quot;</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>	if nTargetID and nCasterID then --making sure they both exist</span></span>
<span class="line"><span>		if PlayerResource:IsDisableHelpSetForPlayerID(nTargetID, nCasterID) then --target hates having caster help him out.</span></span>
<span class="line"><span>			return &quot;#dota_hud_error_target_has_disable_help&quot;</span></span>
<span class="line"><span>		end</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>	if vDiff:Length2D() &gt; nMaxRange then  --Check caster is over reaching.</span></span>
<span class="line"><span>	return &quot;#dota_hud_error_target_out_of_range&quot; --returning error from localization</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br></div></div><p>Возможно, вы заметили, что мы используем почти один и тот же код как для фильтра приведения, так и для функции ошибки. Вот способ уменьшить избыточность:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function item_blink_staff:CastFilterResultTarget( hTarget ) -- hTarget is the targeted NPC.</span></span>
<span class="line"><span>	return self:CCastFilter( hTarget, false )</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function item_blink_staff:GetCustomCastErrorTarget( hTarget) -- hTarget is the targeted NPC.</span></span>
<span class="line"><span>	return self:CCastFilter( hTarget, true )</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function item_blink_staff:CCastFilter( hTarget, bError )</span></span>
<span class="line"><span>	if IsServer() then --this should be only run on server.</span></span>
<span class="line"><span>		local hCaster = self:GetCaster() --We will always have Caster.</span></span>
<span class="line"><span>		local vOrigin = hCaster:GetAbsOrigin() --Our caster&#39;s location</span></span>
<span class="line"><span>		local vPoint = hTarget:GetAbsOrigin() --Our target&#39;s location</span></span>
<span class="line"><span>		local nRangeBonus = hCaster:GetMaxMana() --Get our caster&#39;s mana pool</span></span>
<span class="line"><span>		local nMaxRange = self:GetSpecialValueFor( &quot;help_range&quot; ) + nRangeBonus--How far can we actually target?</span></span>
<span class="line"><span>		local vDiff = vPoint - vOrigin --Difference between the points</span></span>
<span class="line"><span>		local nTargetID = hTarget:GetPlayerOwnerID() --getting targets owner id</span></span>
<span class="line"><span>		local nCasterID = hCaster:GetPlayerOwnerID() --getting casters owner id</span></span>
<span class="line"><span>		if hCaster:GetTeamNumber() ~= hTarget:GetTeamNumber() then</span></span>
<span class="line"><span>			if bError then</span></span>
<span class="line"><span>				return &quot;#dota_hud_error_cant_cast_on_enemy&quot;</span></span>
<span class="line"><span>			else</span></span>
<span class="line"><span>				return UF_FAIL_CUSTOM</span></span>
<span class="line"><span>			end</span></span>
<span class="line"><span>		end</span></span>
<span class="line"><span>		if nTargetID and nCasterID then --making sure they both exist</span></span>
<span class="line"><span>			if PlayerResource:IsDisableHelpSetForPlayerID(nTargetID, nCasterID) then --target hates having caster help him out.</span></span>
<span class="line"><span>				if bError then</span></span>
<span class="line"><span>					return &quot;#dota_hud_error_target_has_disable_help&quot;</span></span>
<span class="line"><span>				else</span></span>
<span class="line"><span>					return UF_FAIL_CUSTOM</span></span>
<span class="line"><span>				end</span></span>
<span class="line"><span>			end</span></span>
<span class="line"><span>		end</span></span>
<span class="line"><span>		if vDiff:Length2D() &gt; nMaxRange then  --Check caster is over reaching.</span></span>
<span class="line"><span>			if bError then</span></span>
<span class="line"><span>				return &quot;#dota_hud_error_target_out_of_range&quot; --returning error from localization</span></span>
<span class="line"><span>			else</span></span>
<span class="line"><span>				return UF_FAIL_CUSTOM</span></span>
<span class="line"><span>			end</span></span>
<span class="line"><span>		end</span></span>
<span class="line"><span>		if not bError then</span></span>
<span class="line"><span>			return UF_SUCCESS</span></span>
<span class="line"><span>		end</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br></div></div><h2 id="уровни-предметов" tabindex="-1">Уровни предметов <a class="header-anchor" href="#уровни-предметов" aria-label="Permalink to &quot;Уровни предметов&quot;">​</a></h2><p>Как я упоминал ранее в руководстве, такие вещи, как bkb и dagon, используют уровни предметов. Dagon использует отдельные элементы для определения уровней, в то время как bkb имеет встроенное выравнивание при каждом его использовании. Мы собираемся написать код, в котором мы будем уменьшать диапазон помощи посоху, когда он используется для помощи игроку. <br>Сначала нам нужно добавить новые значения для наших диапазонов помощи между уровнями. Они просто разделены пробелами между значениями.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>			&quot;03&quot;</span></span>
<span class="line"><span>			{</span></span>
<span class="line"><span>				&quot;var_type&quot;				&quot;FIELD_INTEGER&quot;</span></span>
<span class="line"><span>				&quot;help_range&quot;			&quot;3000 2500 2000 1500 1000&quot;</span></span>
<span class="line"><span>			}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Поскольку тут и там встречаются некоторые странные ошибки, значение MaxLevel, которое мы использовали бы для обычных способностей, не работает для предметов. Чтобы помочь нам определить его в скрипте, мы создаем для него новое специальное значение.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>			&quot;09&quot;</span></span>
<span class="line"><span>			{</span></span>
<span class="line"><span>				&quot;var_type&quot;				&quot;FIELD_INTEGER&quot;</span></span>
<span class="line"><span>				&quot;max_level&quot;				&quot;5&quot;</span></span>
<span class="line"><span>			}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Возвращаясь к скрипту lua, нам нужно улучшать предмет только тогда, когда союзник телепортируется, а не когда мы просто помечаем нашего союзника для телепортации. Сначала найдите эту строку:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>self:Blink(hTarget, vPoint, nMaxBlink, nClamp) --BLINK!</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Под ним добавим часть обновления. Обратите внимание, что мы должны проверить, не обновляем ли предмет, когда он полностью обновлен.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>if self:GetLevel() &lt; self:GetSpecialValueFor( &quot;max_level&quot; ) then --We can&#39;t define max level for item like we can with abilities. Best to create special value for it.</span></span>
<span class="line"><span>	self:UpgradeAbility(true)</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Мы также могли бы добавить условие, при котором, если игра сейчас находится в ночное время, обновление не произойдет. Позвольте нашему герою бесплатно помогать своим союзникам!</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>if self:GetLevel() &lt; self:GetSpecialValueFor( &quot;max_level&quot; ) and GameRules:IsDaytime() then</span></span>
<span class="line"><span>	self:UpgradeAbility(true)</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Теперь, если мы хотим позволить нашему герою обновить уровни диапазона помощи, мы можем либо написать какое-нибудь событие, в котором мы сбрасываем уровень предмета с помощью:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>self:SetLevel(1)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Или мы можем использовать более элегантный вариант, изменив наш рецепт, чтобы он действовал как обновление заряда для барабанов выносливости.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>	&quot;item_recipe_blink_staff&quot;</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		// General</span></span>
<span class="line"><span>		//-------------------------------------------------------------------------------------------------------------</span></span>
<span class="line"><span>		&quot;BaseClass&quot;                     &quot;item_datadriven&quot;</span></span>
<span class="line"><span>		&quot;ID&quot;							&quot;1251&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		// Item Info</span></span>
<span class="line"><span>		//-------------------------------------------------------------------------------------------------------------</span></span>
<span class="line"><span>		&quot;ItemCost&quot;						&quot;325&quot;</span></span>
<span class="line"><span>		&quot;ItemShopTags&quot;					&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		// Recipe</span></span>
<span class="line"><span>		//-------------------------------------------------------------------------------------------------------------</span></span>
<span class="line"><span>		&quot;ItemRecipe&quot;					&quot;1&quot;</span></span>
<span class="line"><span>		&quot;ItemResult&quot;					&quot;item_blink_staff&quot;</span></span>
<span class="line"><span>		&quot;ItemRequirements&quot;</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			&quot;01&quot;						&quot;item_quarterstaff;item_robe;item_blink&quot;</span></span>
<span class="line"><span>			&quot;02&quot;						&quot;item_blink_staff&quot;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>Обратите внимание, что мы добавили «02» к требованиям к предмету, и теперь требуется только предмет «item_blink_staff». Это означает, что мы можем объединить наш исходный посох для блинка, чтобы создать совершенно новый, с уровнем, установленным на значение по умолчанию. <br>Теперь вам следует не забыть изменить описание предмета, а не заставлять игрока гадать.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>		&quot;DOTA_Tooltip_ability_item_blink_staff_Description&quot;                               &quot;Teleport to a target point up to 1200 units away. Can be used on allied units to select them to blink instead of you. If you take damage the Blink Staff is put on 3.0 second cooldown. Every time you help ally the help range is reduced by 500. This doesn&#39;t apply if used during night time. You maximum mana is added to the help distance.&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="конец" tabindex="-1">Конец <a class="header-anchor" href="#конец" aria-label="Permalink to &quot;Конец&quot;">​</a></h2><p>Это конец этого урока. Вы можете найти этот и другие предметы и способности Lua в моем репозитории Dota2Overflow на GitHub. <a href="https://github.com/DrTeaSpoon/Dota2Overflow" target="_blank" rel="noreferrer">https://github.com/DrTeaSpoon/Dota2Overflow</a></p><br> Чтобы облегчить объявление функций-модификаторов, используйте это для ресурса: <br> https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Lua_Abilities_and_Modifiers#Modifier_Functions <br> Большое спасибо BMD за бербоны. Хотя этот урок не имеет ничего общего с его репозиторием, я использовал его для полигон и создание наглядных пособий. <br> Большое спасибо всем, кто внес свой вклад в https://github.com/Pizzalol/SpellLibrary. <br><p>Приятного мигания!</p>`,56)),e(s,{path:b})])}const C=p(o,[["render",m]]);export{q as __pageData,C as default};
