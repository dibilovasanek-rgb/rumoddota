import{_ as s,o as a,c as e,ag as p}from"./chunks/framework.DUTPmUpA.js";const m=JSON.parse('{"title":"Добавление очень простого ИИ к юнитам","description":"","frontmatter":{"title":"Добавление очень простого ИИ к юнитам","author":"wigguno","steamId":"76561198004447135","date":"27.07.2015"},"headers":[],"relativePath":"units/adding-a-very-simple-ai-to-units.md","filePath":"units/adding-a-very-simple-ai-to-units.md"}'),t={name:"units/adding-a-very-simple-ai-to-units.md"};function l(i,n,r,c,b,u){return a(),e("div",null,[...n[0]||(n[0]=[p(`<p>бавление очень простого ИИ к юнитам</p><p>В этом уроке рассказывается, как отдавать очень простые приказы подразделениям. В этом руководстве используется порядок движения, позволяющий юниту случайно бродить внутри области, и порядок применения, позволяющий юниту случайным образом произносить нецелевое заклинание.</p><p>Это руководство предполагает базовые знания сценариев Lua.</p><h2 id="недостатки" tabindex="-1">Недостатки <a class="header-anchor" href="#недостатки" aria-label="Permalink to &quot;Недостатки&quot;">​</a></h2><ul><li>Этот метод не следует использовать для подразделений, каждое из которых должно выполнять более одного вида приказов. Если требуется более продвинутый ИИ, вам следует проверить сценарии lua ai Holdout_example.</li><li>Некоторые функции жестко запрограммированы в этом скрипте. Если вы хотите повторять свою игру и часто менять ее поведение, я бы предложил использовать некоторые глобальные константы или загружать значения из внешнего файла KV. Это позволит вам хранить все значения в одном месте.</li></ul><h2 id="ссылки" tabindex="-1">Ссылки <a class="header-anchor" href="#ссылки" aria-label="Permalink to &quot;Ссылки&quot;">​</a></h2><p>Я скопировал несколько юнитов из Holdout_example для тестирования и скопировал Berserkers Call из <a href="https://github.com/Pizzalol/SpellLibrary" target="_blank" rel="noreferrer">Spell Library</a>.</p><p>Если вам нужна помощь в создании собственных юнитов или способностей, отличным ресурсом станет документация Noya: <a href="./unit-keyvalues">Datadriven Units</a><a href="/abilities/ability-keyvalues">DataDriven Ability Breakdown - Documentation</a></p><h2 id="настроика-молотка" tabindex="-1">Настройка молотка <a class="header-anchor" href="#настроика-молотка" aria-label="Permalink to &quot;Настройка молотка&quot;">​</a></h2><p>В Hammer я поместил объект info_target с именем «spawn_loc_test», который можно найти в lua. Это позволяет мне размещать места появления юнитов в Hammer, не меняя Lua-скрипты. Если вы хотите сделать это, дайте каждому объекту уникальное имя и разместите его в том месте, где вы хотите, чтобы точка появления была на вашей карте.</p><h2 id="настроика-луа" tabindex="-1">Настройка Луа <a class="header-anchor" href="#настроика-луа" aria-label="Permalink to &quot;Настройка Луа&quot;">​</a></h2><p>В функции InitGameMode() мы делаем несколько вещей: запускаем генератор случайных чисел, создаем пустую таблицу, чтобы отслеживать поведение каждого юнита, создаем несколько юнитов и запускаем функцию мыслителя.</p><p>Настройки, не относящиеся к этому руководству, опущены, но с помощью этой функции вы можете настроить такие вещи, как GameRules, для вашего игрового режима.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function CAITesting:InitGameMode()</span></span>
<span class="line"><span>	print( &quot;Loading AI Testing Game Mode.&quot; )</span></span>
<span class="line"><span>	-- SEEDING RNG IS VERY IMPORTANT</span></span>
<span class="line"><span>	math.randomseed(Time())</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	-- Set up a table to hold all the units we want to spawn</span></span>
<span class="line"><span>	self.UnitThinkerList = {}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	-- Spawn some units</span></span>
<span class="line"><span>	for i = 1,5 do</span></span>
<span class="line"><span>		self:SpawnAIUnitWanderer()</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>	for i = 1,3 do</span></span>
<span class="line"><span>		self:SpawnAIUnitCaster()</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	-- Set the unit thinker function</span></span>
<span class="line"><span>	GameRules:GetGameModeEntity():SetThink( &quot;OnUnitThink&quot;, self, &quot;UnitThink&quot;, 1 )</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h2 id="создание-странника" tabindex="-1">Создание странника <a class="header-anchor" href="#создание-странника" aria-label="Permalink to &quot;Создание странника&quot;">​</a></h2><p>Эта функция создаст юнит с блуждающим поведением. Границы, между которыми перемещается юнит, жестко запрограммированы. Самый простой способ определить эти границы — создать в Hammer простой объект (например, info_target), переместить его и прочитать координаты. В этом примере моя сущность info_target называется «spawn_loc_test».</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function CAITesting:SpawnAIUnitWanderer()</span></span>
<span class="line"><span>	--Start an iteration finding each entity with this name</span></span>
<span class="line"><span>	--If you&#39;ve named everything with a unique name, this will return your entity on the first go</span></span>
<span class="line"><span>	local spawnVectorEnt = Entities:FindByName(nil, &quot;spawn_loc_test&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	-- GetAbsOrigin() is a function that can be called on any entity to get its location</span></span>
<span class="line"><span>	local spawnVector = spawnVectorEnt:GetAbsOrigin()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	-- Spawn the unit at the location on the neutral team</span></span>
<span class="line"><span>	local spawnedUnit = CreateUnitByName(&quot;npc_dota_creature_kobold_tunneler&quot;, spawnVector, true, nil, nil, DOTA_TEAM_NEUTRALS)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	-- make this unit passive</span></span>
<span class="line"><span>	spawnedUnit:SetIdleAcquire(false)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	-- Add some variables to the spawned unit so we know its intended behaviour</span></span>
<span class="line"><span>	-- You can store anything here, and any time you get this entity the information will be intact</span></span>
<span class="line"><span>	spawnedUnit.ThinkerType = &quot;wander&quot;</span></span>
<span class="line"><span>	spawnedUnit.wanderBounds = {}</span></span>
<span class="line"><span>	spawnedUnit.wanderBounds.XMin = -768</span></span>
<span class="line"><span>	spawnedUnit.wanderBounds.XMax = 768</span></span>
<span class="line"><span>	spawnedUnit.wanderBounds.YMin = -64</span></span>
<span class="line"><span>	spawnedUnit.wanderBounds.YMax = 768</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	-- Add a random amount to the game time to randomise the behaviour a bit</span></span>
<span class="line"><span>	spawnedUnit.NextOrderTime = GameRules:GetGameTime() + math.random(5, 10)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	-- finally, insert the unit into the table</span></span>
<span class="line"><span>	table.insert(self.UnitThinkerList, spawnedUnit)</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><h2 id="создание-заклинателя" tabindex="-1">Создание заклинателя <a class="header-anchor" href="#создание-заклинателя" aria-label="Permalink to &quot;Создание заклинателя&quot;">​</a></h2><p>Эта функция создаст юнит с кастинговым поведением. Границы, в которых появляется юнит, жестко запрограммированы. Это заклинание не является целевым, для его применения не требуются дополнительные переменные.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function CAITesting:SpawnAIUnitCaster()</span></span>
<span class="line"><span>	-- Generate a random location inside the neutrals area</span></span>
<span class="line"><span>	local spawnVector = Vector(math.random(-768, 768), math.random(-64, 768), 128)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	-- Spawn the unit at the location on the neutral team</span></span>
<span class="line"><span>	local spawnedUnit = CreateUnitByName(&quot;npc_dota_creature_gnoll_assassin&quot;, spawnVector, true, nil, nil, DOTA_TEAM_NEUTRALS)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	-- make this unit passive</span></span>
<span class="line"><span>	spawnedUnit:SetIdleAcquire(false)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	-- Add some variables to the spawned unit so we know its intended behaviour</span></span>
<span class="line"><span>	-- You can store anything here, and any time you get this entity the information will be intact</span></span>
<span class="line"><span>	spawnedUnit.ThinkerType = &quot;caster&quot;</span></span>
<span class="line"><span>	spawnedUnit.CastAbilityIndex = spawnedUnit:GetAbilityByIndex(0):entindex()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	-- Add a random amount to the game time to randomise the behaviour a bit</span></span>
<span class="line"><span>	spawnedUnit.NextOrderTime = GameRules:GetGameTime() + math.random(5, 10)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	-- finally, insert the unit into the table</span></span>
<span class="line"><span>	table.insert(self.UnitThinkerList, spawnedUnit)</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h2 id="функция-мыслителя" tabindex="-1">Функция мыслителя <a class="header-anchor" href="#функция-мыслителя" aria-label="Permalink to &quot;Функция мыслителя&quot;">​</a></h2><p>Эта функция вызывается каждую секунду. Он прочитает каждое из подразделений и определит, следует ли им отдать новый приказ, а затем отдаст этот приказ.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function CAITesting:OnUnitThink()</span></span>
<span class="line"><span>	if GameRules:State_Get() == DOTA_GAMERULES_STATE_GAME_IN_PROGRESS then</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		local deadUnitCount = 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		-- Check each of the units in this table for their thinker behaviour</span></span>
<span class="line"><span>		for ind, unit in pairs(self.UnitThinkerList) do</span></span>
<span class="line"><span></span></span>
<span class="line"><span>			-- The first check should be to see if the units are still alive or not.</span></span>
<span class="line"><span>			-- Keep track of how many units are removed from the table, as the indices will change by that amount</span></span>
<span class="line"><span>			if unit:IsNull() or not unit:IsAlive() then</span></span>
<span class="line"><span>				table.remove(self.UnitThinkerList, ind - deadUnitCount)</span></span>
<span class="line"><span>				deadUnitCount = deadUnitCount + 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>			-- Check if the game time has passed our random time for next order</span></span>
<span class="line"><span>			elseif GameRules:GetGameTime() &gt; unit.NextOrderTime then</span></span>
<span class="line"><span></span></span>
<span class="line"><span>				if unit.ThinkerType == &quot;wander&quot; then</span></span>
<span class="line"><span>					--print(&quot;thinker unit is a wanderer&quot;)</span></span>
<span class="line"><span>					--print(&quot;time: &quot; .. GameRules:GetGameTime() .. &quot;. next wander: &quot; .. unit.NextWanderTime)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>					-- Generate random coordinates to wander to</span></span>
<span class="line"><span>					local x = math.random(unit.wanderBounds.XMin, unit.wanderBounds.XMax)</span></span>
<span class="line"><span>					local y = math.random(unit.wanderBounds.YMin, unit.wanderBounds.YMax)</span></span>
<span class="line"><span>					local z = GetGroundHeight(Vector(x, y, 128), nil)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>					print(&quot;wandering to x: &quot; .. x .. &quot; y: &quot; .. y)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>					-- Issue the movement order to the unit</span></span>
<span class="line"><span>					unit:MoveToPosition(Vector(x, y, z))</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>				elseif unit.ThinkerType == &quot;caster&quot; then</span></span>
<span class="line"><span></span></span>
<span class="line"><span>					-- If you want a more complicated order, use this syntax</span></span>
<span class="line"><span>					-- Some more documentation: https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Scripting/API/Global.ExecuteOrderFromTable</span></span>
<span class="line"><span>					-- Unit order list is here: https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Panorama/Javascript/API#dotaunitorder_t</span></span>
<span class="line"><span>					-- (Ignore the dotaunitorder_t. on each one)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>					print(&quot;casting ability &quot; .. EntIndexToHScript(unit.CastAbilityIndex):GetName())</span></span>
<span class="line"><span></span></span>
<span class="line"><span>					local order = {</span></span>
<span class="line"><span>						UnitIndex = unit:entindex(),</span></span>
<span class="line"><span>						AbilityIndex = unit.CastAbilityIndex,</span></span>
<span class="line"><span>						OrderType = DOTA_UNIT_ORDER_CAST_NO_TARGET,</span></span>
<span class="line"><span>						Queue = false</span></span>
<span class="line"><span>					}</span></span>
<span class="line"><span>					ExecuteOrderFromTable(order)</span></span>
<span class="line"><span>				end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>				-- Generate the next time for the order</span></span>
<span class="line"><span>				unit.NextOrderTime = GameRules:GetGameTime() + math.random(5, 10)</span></span>
<span class="line"><span>			end</span></span>
<span class="line"><span>		end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		-- Make sure our testing map stays on day time</span></span>
<span class="line"><span>		if not GameRules:IsDaytime() then</span></span>
<span class="line"><span>			GameRules:SetTimeOfDay(0.26)</span></span>
<span class="line"><span>		end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	elseif GameRules:State_Get() &gt;= DOTA_GAMERULES_STATE_POST_GAME then</span></span>
<span class="line"><span>		return nil</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	-- this return statement means that this thinker function will be called again in 1 second</span></span>
<span class="line"><span>	-- returning nil will cause the thinker to terminate and no longer be called</span></span>
<span class="line"><span>	return 1</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br></div></div><h2 id="завершение" tabindex="-1">Завершение <a class="header-anchor" href="#завершение" aria-label="Permalink to &quot;Завершение&quot;">​</a></h2><p>Если вам нужно более продвинутое поведение, следует использовать сценарий AI. Однако метод, описанный в этом руководстве, можно до некоторой степени расширить, например, применение способности, нацеленной на землю, в случайной области будет возможно, используя только код, опубликованный здесь.</p><p>Полные файлы для этого примера можно найти здесь: <a href="https://github.com/Wigguno/AITesting" target="_blank" rel="noreferrer">https://github.com/Wigguno/AITesting</a></p><p>Если у вас есть вопросы, <a href="https://t.me/+4wTdvuzBPzUxOTgy" target="_blank" rel="noreferrer">Telegram-канал ModdotaRU</a> всегда рад помочь.</p>`,27)])])}const d=s(t,[["render",l]]);export{m as __pageData,d as default};
