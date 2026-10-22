import{_ as s,o as a,c as p,ag as e}from"./chunks/framework.DUTPmUpA.js";const t="/_assets/gs6Ec-c0a81f34ae.DNFLe7f8.jpg",q=JSON.parse('{"title":"Здания, производящие единицы","description":"","frontmatter":{"title":"Здания, производящие единицы","author":"Noya","steamId":"76561198046984233","date":"08.03.2015"},"headers":[],"relativePath":"units/unit-producing-buildings.md","filePath":"units/unit-producing-buildings.md"}'),l={name:"units/unit-producing-buildings.md"};function i(r,n,u,o,c,b){return a(),p("div",null,[...n[0]||(n[0]=[e(`<p>дания, производящие единицы</p><p>Это руководство по ответам на ветку вопросов. Я собираюсь объяснить подходы к написанию сценариев для полного создания юнитов в здании, включая обеспечение их управляемости и определение начальных приказов.</p><h2 id="шаг-1-фаилы-npc-units-custom-txt" tabindex="-1">Шаг 1. Файлы <code>npc_units_custom.txt</code> <a class="header-anchor" href="#шаг-1-фаилы-npc-units-custom-txt" aria-label="Permalink to &quot;Шаг 1. Файлы \`npc_units_custom.txt\`&quot;">​</a></h2><p>Прежде всего, вам понадобится определение KeyValue для здания и отряда, который вы хотите создать.</p><p>В репозиториях <a href="https://github.com/MNoya/Warchasers/tree/master/game/dota_addons/warchasers/scripts/npc/units" target="_blank" rel="noreferrer">Warchasers</a> и <a href="https://github.com/MNoya/DotaCraft/tree/master/game/dota_addons/dotacraft/scripts/npc/units" target="_blank" rel="noreferrer">DotaCraft</a> есть много примеров модулей, поэтому я не думаю, что мне нужно много объяснять по этому поводу.</p><p>Однако здесь я хочу сделать одно особое замечание. <strong>&quot;BaseClass&quot; &quot;npc_dota_building&quot; видно сквозь туман</strong>. Так что, если у вас есть проблемы с этим, не делайте свой отряд зданием, а вместо этого сделайте <strong>npc_dota_creature</strong>.</p><p>Здесь возникает проблема с существами, имеющими скорость поворота, поэтому дополнительно вам нужно будет применить к ним MODIFIER_STATE_STUNNED, сделать их невосприимчивыми к магии, чтобы большинство заклинаний не наносило им урона, и создать специальное правило для заклинаний, которые должны повреждать здания таким образом.</p><p>При этом мы не будем беспокоиться об этом в рамках данного руководства.</p><p>Я буду использовать упрощенную версию определения <code>human_barracks</code> со способностью «human_train_footman», возможности которой я раскрою позже.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;human_barracks&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	// General</span></span>
<span class="line"><span>	//----------------------------------------------------------------</span></span>
<span class="line"><span>	&quot;BaseClass&quot;					&quot;npc_dota_building&quot;</span></span>
<span class="line"><span>	&quot;Model&quot;						&quot;models/props_structures/good_barracks_melee001.vmdl&quot;</span></span>
<span class="line"><span>	&quot;ModelScale&quot;				&quot;1&quot;</span></span>
<span class="line"><span>	&quot;Level&quot;						&quot;1&quot;</span></span>
<span class="line"><span>	&quot;HealthBarOffset&quot;			&quot;140&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// Abilities</span></span>
<span class="line"><span>	//----------------------------------------------------------------</span></span>
<span class="line"><span>	&quot;AbilityLayout&quot;				&quot;1&quot;</span></span>
<span class="line"><span>	&quot;Ability1&quot;				&quot;human_train_footman&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// Armor</span></span>
<span class="line"><span>	//----------------------------------------------------------------</span></span>
<span class="line"><span>	&quot;ArmorPhysical&quot;				&quot;5&quot;</span></span>
<span class="line"><span>	&quot;MagicalResistance&quot;			&quot;0&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// Attack</span></span>
<span class="line"><span>	//----------------------------------------------------------------</span></span>
<span class="line"><span>	&quot;AttackCapabilities&quot;		&quot;DOTA_UNIT_CAP_NO_ATTACK&quot;</span></span>
<span class="line"><span>	&quot;AttackDamageType&quot;			&quot;DAMAGE_TYPE_ArmorPhysical&quot;</span></span>
<span class="line"><span>	&quot;AttackDamageMin&quot;			&quot;0&quot;</span></span>
<span class="line"><span>	&quot;AttackDamageMax&quot;			&quot;0&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// Bounty</span></span>
<span class="line"><span>	//----------------------------------------------------------------</span></span>
<span class="line"><span>	&quot;BountyGoldMin&quot;				&quot;0.0&quot;</span></span>
<span class="line"><span>	&quot;BountyGoldMax&quot;				&quot;0.0&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// Bounds</span></span>
<span class="line"><span>	//----------------------------------------------------------------</span></span>
<span class="line"><span>	&quot;BoundsHullName&quot;			&quot;DOTA_HULL_SIZE_BARRACKS&quot;</span></span>
<span class="line"><span>	&quot;RingRadius&quot;				&quot;220&quot;</span></span>
<span class="line"><span>	&quot;CollisionSize&quot;				&quot;144&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// Movement</span></span>
<span class="line"><span>	//----------------------------------------------------------------</span></span>
<span class="line"><span>	&quot;MovementCapabilities&quot;		&quot;DOTA_UNIT_CAP_MOVE_NONE&quot;</span><span>	// Needed to cast Point abilities</span></span>
<span class="line"><span>	&quot;MovementSpeed&quot;				&quot;0&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// Status</span></span>
<span class="line"><span>	//----------------------------------------------------------------</span></span>
<span class="line"><span>	&quot;StatusHealth&quot;				&quot;1200&quot;</span></span>
<span class="line"><span>	&quot;StatusHealthRegen&quot;			&quot;0&quot;</span></span>
<span class="line"><span>	&quot;StatusMana&quot;				&quot;0&quot;</span></span>
<span class="line"><span>	&quot;StatusManaRegen&quot;			&quot;0&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// Vision</span></span>
<span class="line"><span>	//----------------------------------------------------------------</span></span>
<span class="line"><span>	&quot;VisionDaytimeRange&quot;		&quot;900&quot;</span></span>
<span class="line"><span>	&quot;VisionNighttimeRange&quot;		&quot;600&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// Team</span></span>
<span class="line"><span>	//----------------------------------------------------------------</span></span>
<span class="line"><span>	&quot;TeamName&quot;					&quot;DOTA_TEAM_NEUTRALS&quot;</span></span>
<span class="line"><span>	&quot;CombatClassAttack&quot;			&quot;DOTA_COMBAT_CLASS_ATTACK_BASIC&quot;</span></span>
<span class="line"><span>	&quot;CombatClassDefend&quot;			&quot;DOTA_COMBAT_CLASS_DEFEND_STRUCTURE&quot;</span></span>
<span class="line"><span>	&quot;UnitRelationShipClass&quot;		&quot;DOTA_NPC_UNIT_RELATIONSHIP_TYPE_BUILDING&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br></div></div><h2 id="шаг-2-размещение-вашего-отряда-на-карте" tabindex="-1">Шаг 2. Размещение вашего отряда на карте. <a class="header-anchor" href="#шаг-2-размещение-вашего-отряда-на-карте" aria-label="Permalink to &quot;Шаг 2. Размещение вашего отряда на карте.&quot;">​</a></h2><p>Для этого есть два основных варианта: один ориентирован на Hammer, а другой — полностью скриптовый подход.</p><h3 id="молотовые-отряды" tabindex="-1">Молотовые отряды <a class="header-anchor" href="#молотовые-отряды" aria-label="Permalink to &quot;Молотовые отряды&quot;">​</a></h3><p>Как описано в первой теме, вы можете указать и щелкнуть, чтобы добавить объект на карту со всеми видами свойств.</p><p>Проблема такого подхода в том, что хоть здание и является «частью вашей команды», вы не имеете над ним контроля, точно так же, как вы не можете контролировать автоатаки Башен в Доте. Чтобы решить эту проблему, нам нужно использовать пару строк в lua, в основном <code>SetOwner</code> и <code>SetControllableByPlayer</code> <a href="https://moddota.com/api/#!/vscripts/CBaseEntity" target="_blank" rel="noreferrer">API functions</a>.</p><p><code>[CBaseEntity] void SetOwner( handle_owningEntity )</code> <strong>-- Устанавливает владельца объекта</strong></p><p><code>[CDOTA_BaseNPC] void SetControllableByPlayer( int, bool )</code> <strong>-- Сделайте этот юнит управляемым игроком.</strong></p><p>Чтобы правильно вызывать эти функции, я предполагаю, что вы уже знаете основы, описанные в <a href="/scripting-introduction">Beginners Guide to Scripting</a>, и просто объясню, где вам следует их вызывать, на примере.</p><p>Хороший хук GameMode для их вызова будет после dota_player_picked_hero, поэтому при наличии стандартного прослушивателя, такого как этот:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>ListenToGameEvent(&#39;dota_player_pick_hero&#39;, Dynamic_Wrap(GameMode, &#39;OnPlayerPickHero&#39;), self)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>В OnPlayerPickHero вам нужно <strong>найти дескриптор BaseEntity/BaseNPC</strong>, то есть устройства, которому вы хотите изменить владение и состояние управления.</p><p>Это можно сделать несколькими способами, например, используя функции, определенные в <a href="https://moddota.com/api/#!/vscripts/CEntities" target="_blank" rel="noreferrer">CEntities</a>. Мы хотим, чтобы у этого здания был уникальный идентификатор, чтобы его было легко найти, поэтому в Hammer выберите его, зайдите в его свойства и дайте ему имя (я использую для этого горячую клавишу Alt+Enter):</p><p><img src="`+t+`" alt="img"></p><p>Теперь вы можете выполнить поиск по зданию и получить для него локальную переменную с помощью этой строки:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>local building = Entities:FindByName(nil, &quot;building_barracks1&quot;)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Примечание. <strong>Не забудьте выбрать «Объекты» при построении карты</strong>!</p><p>Функция OnPlayerPickHero должна выглядеть следующим образом:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function GameMode:OnPlayerPickHero(keys)</span></span>
<span class="line"><span>    local hero = EntIndexToHScript(keys.heroindex)</span></span>
<span class="line"><span>    local player = EntIndexToHScript(keys.player)</span></span>
<span class="line"><span>    local playerID = hero:GetPlayerID()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    local building = Entities:FindByName(nil, &quot;building_barracks1&quot;)</span></span>
<span class="line"><span>    building:SetOwner(hero)</span></span>
<span class="line"><span>    building:SetControllableByPlayer(playerID, true)</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>Теперь ваше здание должно быть полностью управляемым для использования способностей и даже вычитать золото из игрока, если вы используете способности, требующие стоимости золота.</p><h3 id="скриптовыи-подход" tabindex="-1">Скриптовый подход <a class="header-anchor" href="#скриптовыи-подход" aria-label="Permalink to &quot;Скриптовый подход&quot;">​</a></h3><p>Эй, Хаммер хорош и все такое, но его поведение очень статично. Вам нужно иметь заранее определенные позиции для юнитов, строить карту каждый раз, когда вы вносите изменения, и не можете не создавать ни одного из них, если игроков меньше, чем ожидалось, и т. д.</p><p>Существует полностью скриптовый метод размещения юнитов на карте, который осуществляется с помощью функции <code>CreateUnitByName</code> с некоторыми дополнительными преимуществами.</p><p><code>handle CreateUnitByName( szUnitName, vLocation, bFindClearSpace, hNPCOwner, hUnitOwner, iTeamNumber )</code> По-прежнему работая внутри того же OnPlayerPickHero, мы можем либо создать статическую позицию для каждого playerID, например <em>Vector(450,322,128)</em>, выполняя случайные позиции с именованными объектами info_target в Hammer, либо динамическую позицию, основанную на месте появления героя. Давайте сделаем последнее:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>local origin = hero:GetAbsOrigin() -- Spawn position</span></span>
<span class="line"><span>local fv = hero:GetForwardVector() -- Vector the hero is facing</span></span>
<span class="line"><span>local distance = 300</span></span>
<span class="line"><span>local position = origin + fv * distance</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Это определит вектор, обращенный на 300 единиц в направлении, в котором смотрит герой.</p><p>Теперь CreateUnitByName следует вызывать следующим образом:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>local building = CreateUnitByName(&quot;human_barracks&quot;, position, true, hero, hero, hero:GetTeamNumber())</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Несмотря на то, что мы установили hNPCOwner и hUnitOwner, SetOwner и SetControllableByPlayer по-прежнему необходимы.</p><h4 id="создание-неуязвимости" tabindex="-1">Создание неуязвимости <a class="header-anchor" href="#создание-неуязвимости" aria-label="Permalink to &quot;Создание неуязвимости&quot;">​</a></h4><p>Есть небольшая проблема с базовым классом npc_dota_building, которая заключается в том, что по умолчанию они появляются с «modifier_invulnerable». Чтобы избавиться от этого, запустите эту строку:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>building:RemoveModifierByName(&quot;modifier_invulnerable&quot;)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="я-уже-упоминал-что-в-зданиях-могут-быть-ошибки" tabindex="-1">Я уже упоминал, что в зданиях могут быть ошибки? <a class="header-anchor" href="#я-уже-упоминал-что-в-зданиях-могут-быть-ошибки" aria-label="Permalink to &quot;Я уже упоминал, что в зданиях могут быть ошибки?&quot;">​</a></h4><p>Есть еще одна проблема: здания иногда создаются не там, где вы хотите, а вместо этого застревают в позиции (0,0,0), поэтому, если это произойдет, добавьте это:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>Timers:CreateTimer(function() building:SetAbsOrigin(position) end)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Подождите 1 кадр, и с помощью timers4life BMD ваше здание наконец появится в правильном положении.</p><h4 id="прекэш" tabindex="-1">Прекэш <a class="header-anchor" href="#прекэш" aria-label="Permalink to &quot;Прекэш&quot;">​</a></h4><p>И последнее, это требование Unit&#39;s Precache. В отличие от юнитов, добавленных в Hammer, lua CreateUnitByName не будет запускать блоки precache {} способностей юнита или модели, поэтому нам нужно сделать это вручную либо в <code>addon_game_mode.lua</code>, либо в PostLoadPrecache(), если вы беспокоитесь о том, что ваши клиенты не загружаются должным образом. В этом случае я просто воспользуюсь первым методом:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function Precache( context ) -- Find this in addon_game_mode.lua</span></span>
<span class="line"><span>    PrecacheUnitByNameSync(&quot;human_barracks&quot;, context)</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Сделанный! Полный код спауна здания перед героем выглядит так:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function GameMode:OnPlayerPickHero(keys)</span></span>
<span class="line"><span>    local hero = EntIndexToHScript(keys.heroindex)</span></span>
<span class="line"><span>    local player = EntIndexToHScript(keys.player)</span></span>
<span class="line"><span>    local playerID = hero:GetPlayerID()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- Choose a Position</span></span>
<span class="line"><span>    local origin = hero:GetAbsOrigin() -- Spawn position</span></span>
<span class="line"><span>    local fv = hero:GetForwardVector() -- Vector the hero is facing</span></span>
<span class="line"><span>    local distance = 300</span></span>
<span class="line"><span>    local position = origin + fv * distance</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- Spawning</span></span>
<span class="line"><span>local building = CreateUnitByName(&quot;human_barracks&quot;, position, true, hero, hero, hero:GetTeamNumber())</span></span>
<span class="line"><span>    building:SetOwner(hero)</span></span>
<span class="line"><span>    building:SetControllableByPlayer(playerID, true)</span></span>
<span class="line"><span>    building:SetAbsOrigin(position)</span></span>
<span class="line"><span>    building:RemoveModifierByName(&quot;modifier_invulnerable&quot;)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><br><h2 id="шаг-3-написание-скрипта-возможности-появления-юнитов-внутри-здания" tabindex="-1">Шаг 3. Написание скрипта возможности появления юнитов внутри здания <a class="header-anchor" href="#шаг-3-написание-скрипта-возможности-появления-юнитов-внутри-здания" aria-label="Permalink to &quot;Шаг 3. Написание скрипта возможности появления юнитов внутри здания&quot;">​</a></h2><p>Теперь, когда у нас есть полностью работающее здание в игре, давайте перейдем к npc_abilities_custom.txt и созданию существ, появляющихся из этого здания.</p><p>Есть два основных способа сделать это: с помощью действия DataDriven «SpawnUnit» или просто с помощью функции <code>CreateUnitByName</code> Lua, как объяснялось ранее.</p><h3 id="datadriven-spawnunit" tabindex="-1">DataDriven &quot;SpawnUnit&quot; <a class="header-anchor" href="#datadriven-spawnunit" aria-label="Permalink to &quot;DataDriven &quot;SpawnUnit&quot;&quot;">​</a></h3><p>На самом деле я предпочитаю это действие DD и широко использую его на всех этапах появления юнитов в DotaCraft, потому что оно имеет доступ к очень полезному подсобытию <code>&quot;OnSpawn&quot;</code>, которое доступно только через это действие, а также имеет некоторые другие параметры для количества юнитов, ограничения (поэтому вы не можете иметь более X юнитов одного и того же юнита одновременно), интеграции modifier_kill и т. д.</p><p>Конечно, вы можете прослушивать игровое событие появления юнита и делать там свои действия OnSpawn, но это делает эту возможность менее модульной и ее сложнее поддерживать.</p><p>SpawnUnit следует использовать следующим образом и он включен во фрагменты Sublime Dota KV:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;SpawnUnit&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    &quot;UnitName&quot;       &quot;npc_name&quot;</span></span>
<span class="line"><span>    &quot;Target&quot;         &quot;CASTER&quot;</span></span>
<span class="line"><span>    &quot;Duration&quot;       &quot;%duration&quot;</span></span>
<span class="line"><span>    &quot;UnitCount&quot;      &quot;1&quot;</span></span>
<span class="line"><span>    &quot;UnitLimit&quot;      &quot;0&quot;</span></span>
<span class="line"><span>    &quot;GrantsGold&quot;     &quot;1&quot;</span></span>
<span class="line"><span>    &quot;GrantsXP&quot;       &quot;1&quot;</span></span>
<span class="line"><span>    &quot;SpawnRadius&quot;    &quot;10&quot;</span></span>
<span class="line"><span>    &quot;OnSpawn&quot;</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        &quot;ApplyModifier&quot;</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            &quot;ModifierName&quot;  &quot;modifier_phased&quot;</span></span>
<span class="line"><span>            &quot;Target&quot;        &quot;TARGET&quot;</span></span>
<span class="line"><span>            &quot;Duration&quot;      &quot;0.03&quot;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        [ACTIONS]</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>Применение «modifier_phased» на 1 кадр предназначено для предотвращения застревания юнитов, например, если вы применяете способность непосредственно к заклинателю, без фазировки, она застрянет в одной и той же точке, и оба юнита не смогут двигаться. Это похоже на запуск Lua <code>FindClearSpaceForUnit</code>, потому что как только фазировка закончится, юниты попытаются найти пустую позицию.</p><p>Юниты, созданные этой функцией, уже находятся под контролем владельца здания.</p><p>Внутри «OnSpawn», заменяющего [ACTIONS], полезно отправлять приказы отряду, на который в lua можно ссылаться как на event.target.</p><p>Вот полный пример:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;human_train_footman&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    &quot;BaseClass&quot;             &quot;ability_datadriven&quot;</span></span>
<span class="line"><span>    &quot;AbilityTextureName&quot;    &quot;footman&quot;</span></span>
<span class="line"><span>    &quot;MaxLevel&quot;              &quot;1&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &quot;AbilityBehavior&quot;    &quot;DOTA_ABILITY_BEHAVIOR_NO_TARGET&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &quot;AbilityGoldCost&quot;    &quot;10&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &quot;OnSpellStart&quot;</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &quot;SpawnUnit&quot;</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            &quot;UnitName&quot;    &quot;footman&quot;</span></span>
<span class="line"><span>            &quot;Target&quot;      &quot;CASTER&quot;</span></span>
<span class="line"><span>            &quot;UnitCount&quot;   &quot;1&quot;</span></span>
<span class="line"><span>            &quot;UnitLimit&quot;   &quot;0&quot;</span></span>
<span class="line"><span>            &quot;GrantsGold&quot;  &quot;1&quot;</span></span>
<span class="line"><span>            &quot;GrantsXP&quot;    &quot;1&quot;</span></span>
<span class="line"><span>            &quot;SpawnRadius&quot; &quot;100&quot;</span></span>
<span class="line"><span>            &quot;OnSpawn&quot;</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                &quot;ApplyModifier&quot;</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    &quot;ModifierName&quot; &quot;modifier_phased&quot;</span></span>
<span class="line"><span>                    &quot;Target&quot;       &quot;TARGET&quot;</span></span>
<span class="line"><span>                    &quot;Duration&quot;     &quot;0.03&quot;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>                &quot;RunScript&quot;</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    &quot;ScriptFile&quot;    &quot;buildings/rally_point.lua&quot;</span></span>
<span class="line"><span>                    &quot;Function&quot;      &quot;MoveToRallyPoint&quot;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div><p>Определение лакея — это просто Рыцарь-Дракон с некоторыми носимыми устройствами:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//=================================================================================</span></span>
<span class="line"><span>// Creature: Footman</span></span>
<span class="line"><span>//=================================================================================</span></span>
<span class="line"><span>&quot;human_footman&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	// General</span></span>
<span class="line"><span>	//----------------------------------------------------------------</span></span>
<span class="line"><span>	&quot;BaseClass&quot;					&quot;npc_dota_creature&quot;</span></span>
<span class="line"><span>	&quot;Model&quot;						&quot;models/heroes/dragon_knight/dragon_knight.vmdl&quot;</span></span>
<span class="line"><span>	&quot;ModelScale&quot;				&quot;0.8&quot;</span></span>
<span class="line"><span>	&quot;Level&quot;						&quot;2&quot;</span></span>
<span class="line"><span>	&quot;HealthBarOffset&quot;			&quot;140&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// Armor</span></span>
<span class="line"><span>	//----------------------------------------------------------------</span></span>
<span class="line"><span>	&quot;ArmorPhysical&quot;				&quot;2&quot;</span></span>
<span class="line"><span>	&quot;MagicalResistance&quot;			&quot;0&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// Attack</span></span>
<span class="line"><span>	//----------------------------------------------------------------</span></span>
<span class="line"><span>	&quot;AttackCapabilities&quot;		&quot;DOTA_UNIT_CAP_MELEE_ATTACK&quot;</span></span>
<span class="line"><span>	&quot;AttackDamageType&quot;			&quot;DAMAGE_TYPE_ArmorPhysical&quot;</span></span>
<span class="line"><span>	&quot;AttackDamageMin&quot;			&quot;12.0&quot;</span></span>
<span class="line"><span>	&quot;AttackDamageMax&quot;			&quot;13.0&quot;</span></span>
<span class="line"><span>	&quot;AttackRate&quot;				&quot;1.35&quot;</span></span>
<span class="line"><span>	&quot;AttackAnimationPoint&quot;		&quot;0.5&quot;</span></span>
<span class="line"><span>	&quot;AttackAcquisitionRange&quot;	&quot;500&quot;</span></span>
<span class="line"><span>	&quot;AttackRange&quot;				&quot;90&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// Bounty</span></span>
<span class="line"><span>	//----------------------------------------------------------------</span></span>
<span class="line"><span>	&quot;BountyGoldMin&quot;				&quot;26.0&quot;</span></span>
<span class="line"><span>	&quot;BountyGoldMax&quot;				&quot;38.0&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// Bounds</span></span>
<span class="line"><span>	//----------------------------------------------------------------</span></span>
<span class="line"><span>	&quot;BoundsHullName&quot;			&quot;DOTA_HULL_SIZE_HERO&quot;</span></span>
<span class="line"><span>	&quot;RingRadius&quot;				&quot;70&quot;</span></span>
<span class="line"><span>	&quot;CollisionSize&quot;				&quot;31&quot;</span></span>
<span class="line"><span>	&quot;FormationRank&quot;				&quot;0&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// Building Cost Stats</span></span>
<span class="line"><span>	//----------------------------------------------------------------</span></span>
<span class="line"><span>	&quot;GoldCost&quot;					&quot;135&quot;</span></span>
<span class="line"><span>	&quot;LumberCost&quot;				&quot;0&quot;</span></span>
<span class="line"><span>	&quot;FoodCost&quot;					&quot;2&quot;</span></span>
<span class="line"><span>	&quot;BuildTime&quot;					&quot;20&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// Movement</span></span>
<span class="line"><span>	//----------------------------------------------------------------</span></span>
<span class="line"><span>	&quot;MovementCapabilities&quot;		&quot;DOTA_UNIT_CAP_MOVE_GROUND&quot;</span></span>
<span class="line"><span>	&quot;MovementSpeed&quot;				&quot;270&quot;</span></span>
<span class="line"><span>	&quot;MovementTurnRate&quot;			&quot;0.6&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// Status</span></span>
<span class="line"><span>	//----------------------------------------------------------------</span></span>
<span class="line"><span>	&quot;StatusHealth&quot;				&quot;420&quot;</span></span>
<span class="line"><span>	&quot;StatusHealthRegen&quot;			&quot;0.25&quot;</span></span>
<span class="line"><span>	&quot;StatusMana&quot;				&quot;0&quot;</span></span>
<span class="line"><span>	&quot;StatusManaRegen&quot;			&quot;0&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// Vision</span></span>
<span class="line"><span>	//----------------------------------------------------------------</span></span>
<span class="line"><span>	&quot;VisionDaytimeRange&quot;		&quot;1400&quot;</span></span>
<span class="line"><span>	&quot;VisionNighttimeRange&quot;		&quot;800&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// Team</span></span>
<span class="line"><span>	//----------------------------------------------------------------</span></span>
<span class="line"><span>	&quot;TeamName&quot;					&quot;DOTA_TEAM_NEUTRALS&quot;</span></span>
<span class="line"><span>	&quot;CombatClassAttack&quot;			&quot;DOTA_COMBAT_CLASS_ATTACK_BASIC&quot;</span></span>
<span class="line"><span>	&quot;CombatClassDefend&quot;			&quot;DOTA_COMBAT_CLASS_DEFEND_STRONG&quot;</span></span>
<span class="line"><span>	&quot;UnitRelationShipClass&quot;		&quot;DOTA_NPC_UNIT_RELATIONSHIP_TYPE_DEFAULT&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// Creature Data</span></span>
<span class="line"><span>	//----------------------------------------------------------------</span></span>
<span class="line"><span>	&quot;Creature&quot;</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		&quot;DisableClumpingBehavior&quot;	&quot;1&quot;</span></span>
<span class="line"><span>		&quot;AttachWearables&quot;</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			&quot;Wearable1&quot;		{	&quot;ItemDef&quot;		&quot;6789&quot;		}</span><span> //&quot;Shield of Ascension&quot;</span></span>
<span class="line"><span>			&quot;Wearable2&quot;		{	&quot;ItemDef&quot;		&quot;6791&quot;		}</span><span> //&quot;Pauldrons of Ascension&quot;</span></span>
<span class="line"><span>			&quot;Wearable3&quot; 	        {	&quot;ItemDef&quot;		&quot;6790&quot;		}</span><span> //&quot;Gauntlets of Ascension&quot;</span></span>
<span class="line"><span>			&quot;Wearable4&quot;		{	&quot;ItemDef&quot;		&quot;6788&quot;		}</span><span> //&quot;Drapes of Ascension&quot;</span></span>
<span class="line"><span>			&quot;Wearable5&quot;		{	&quot;ItemDef&quot;		&quot;6787&quot;		}</span><span> //&quot;Sword of Ascension&quot;</span></span>
<span class="line"><span>			&quot;Wearable6&quot;		{	&quot;ItemDef&quot;		&quot;6792&quot;		}</span><span> //&quot;Helm of Ascension&quot;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br></div></div><p>Обратите внимание на использование RunScript для вызова функции MoveToRallyPoint. Это познакомит вас с четвертым и последним шагом этого руководства.</p><h2 id="заказы" tabindex="-1">Заказы <a class="header-anchor" href="#заказы" aria-label="Permalink to &quot;Заказы&quot;">​</a></h2><p>После появления юнита можно выполнять различные приказы.</p><p>Попробуйте использовать <code>ExecuteOrderFromTable</code>, чтобы избежать потери приказов из-за того, что юнит делает что-то еще (например, нерестится). Если вы хотите использовать более простые функции, такие как <code>MoveToPosition</code>, вам может потребоваться добавить таймеры, чтобы убедиться, что юнит готов выполнить приказ.</p><p>Кроме того, необходимо изменить Владение отрядом на <strong>дескриптор героя</strong>, поскольку заклинатель — это существо, и оно не может получить золото!</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function MoveToRallyPoint( event )</span></span>
<span class="line"><span>    local caster = event.caster</span></span>
<span class="line"><span>    local target = event.target</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- Change this to your desired Vector, usually as an hscript:GetAbsOrigin()</span></span>
<span class="line"><span>    local position = Vector(420,322,128)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ExecuteOrderFromTable({ UnitIndex = target:GetEntityIndex(),</span></span>
<span class="line"><span>                            OrderType = DOTA_UNIT_ORDER_MOVE_TO_POSITION,</span></span>
<span class="line"><span>                            Position = position, Queue = true })</span></span>
<span class="line"><span>    print(target:GetUnitName()..&quot; moving to position&quot;,position)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    local player = caster:GetPlayerOwner()</span></span>
<span class="line"><span>    local hero = player:GetAssignedHero()</span></span>
<span class="line"><span>    target:SetOwner(hero)</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div>`,72)])])}const d=s(l,[["render",i]]);export{q as __pageData,d as default};
