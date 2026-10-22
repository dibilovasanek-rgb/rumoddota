import{_ as s,o as a,c as e,ag as p}from"./chunks/framework.DUTPmUpA.js";const o=JSON.parse('{"title":"Пользовательские барьеры","description":"","frontmatter":{"title":"Пользовательские барьеры","author":"Cykada","steamId":"76561198066443130","date":"11.04.2024"},"headers":[],"relativePath":"abilities/lua-modifiers/5.md","filePath":"abilities/lua-modifiers/5.md"}'),l={name:"abilities/lua-modifiers/5.md"};function r(i,n,t,c,b,u){return a(),e("div",null,[...n[0]||(n[0]=[p(`<p>вательские барьеры</p><h2 id="что-такое-барьеры" tabindex="-1">Что такое барьеры? <a class="header-anchor" href="#что-такое-барьеры" aria-label="Permalink to &quot;Что такое барьеры?&quot;">​</a></h2><p>В этом уроке я расскажу, что такое барьеры, как они создаются и обрабатываются.</p><p>Для начала нам следует немного лучше познакомиться с барьерами в целом. Барьеры бывают трех видов;</p><ul><li><code>Universal</code>: блокирует весь урон (золото)</li><li><code>Physical</code>: блокирует физический урон (красный).</li><li><code>Spell</code>: блокирует магический урон (синий). Барьеры <code>Physical</code> и <code>Spell</code> блокируют только соответствующий тип урона, но <code>Universal</code> блокирует оба этих типа, а также чистый урон. Концептуально барьеры просты для понимания. Когда мы начинаем заниматься исполнением, все становится сложнее.</li></ul><h3 id="барьерные-функции" tabindex="-1">Барьерные функции <a class="header-anchor" href="#барьерные-функции" aria-label="Permalink to &quot;Барьерные функции&quot;">​</a></h3><table tabindex="0"><thead><tr><th>MODIFIER_PROPERTY</th><th>Имя функции</th></tr></thead><tbody><tr><td>MODIFIER_PROPERTY_INCOMING_DAMAGE_CONSTANT</td><td>GetModifierIncomingDamageConstant(событие)</td></tr><tr><td>MODIFIER_PROPERTY_INCOMING_PHYSICAL_DAMAGE_CONSTANT</td><td>GetModifierIncomingPhysicalDamageConstant(событие)</td></tr><tr><td>MODIFIER_PROPERTY_INCOMING_SPELL_DAMAGE_CONSTANT</td><td>GetModifierIncomingSpellDamageConstant(событие)</td></tr></tbody></table><details><summary>Событие, о котором идет речь, представляет собой «ModifierAttackEvent» </summary><table><tbody><tr><th scope="row">Злоумышленник</th><td>CDOTA_BaseNPC</td></tr><tr><th scope="row">повреждение</th><td>float</td></tr><tr><th scope="row">damage_type</th><td>DAMAGE_TYPES</td></tr><tr><th scope="row">damage_category</th><td>DamageCategory_t</td></tr><tr><th scope="row">damage_flags</th><td>DOTADamageFlag_t</td></tr><tr><th scope="row">инфликтор?</th><td>CDOTABaseAbility</td></tr><tr><th scope="row">original_damage</th><td>float</td></tr><tr><th scope="row">дальняя_атака</th><td>bool</td></tr><tr><th scope="row">цель</th><td>CDOTA_BaseNPC</td></tr><tr><th scope="row">без_атаки_перезарядки</th><td>bool</td></tr><tr><th scope="row">запись</th><td>int</td></tr><tr><th scope="row">тип_сбоя</th><td>Неудачная атака</td></tr><tr><th scope="row">report_max?</th><td>bool</td></tr></tbody></table><div> ? на причине и report_max означают, что они не являются обязательными и не могут быть контролируемыми, в зависимости от того, как был нанесен урон (например, посредством автоатаки). </div></details><p>Основные вещи, о которых вам следует позаботиться на мероприятии:</p><ul><li>повреждение</li><li>report_max</li></ul><p>Хотя каждое свойство полезно, когда оно вам нужно, в большинстве случаев барьер действует просто как дополнительный запас здоровья для отряда, поэтому вас волнует только объем нанесенного урона. <code>damage</code> — это число с плавающей запятой, которое содержит количество урона, полученного родителем после уменьшения, а <code>report_max</code> — это логическое значение для клиента, которое определяет, возвращаем ли мы максимальное или текущее состояние барьера.</p><p>Поскольку барьер является динамическим и требует синхронизации свойств как на клиентской, так и на серверной стороне кода, нам необходимо использовать специальные данные передатчика. В этом руководстве предполагается, что вы знакомы с концепцией специального передатчика, но если это не так, вы можете обратиться к руководству <a href="/abilities/server-to-client#transmitters">here</a> и продолжить дальше. Все в порядке, я подожду.</p><h3 id="простои-пример" tabindex="-1">Простой пример <a class="header-anchor" href="#простои-пример" aria-label="Permalink to &quot;Простой пример&quot;">​</a></h3><p>Ниже приведен код базового барьера на все повреждения, который начинается со 100 здоровья и удаляется, когда здоровье достигает 0.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua title=&quot;Simple Universal Barrier&quot;</span></span>
<span class="line"><span>modifier_custom_all_barrier = class({})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function modifier_custom_all_barrier:OnCreated()</span></span>
<span class="line"><span>    if not IsServer() then return end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- Set up our properties for the barrier&#39;s health</span></span>
<span class="line"><span>    self.max_barrier_health = 100</span></span>
<span class="line"><span>    self.current_barrier_health = self.max_barrier_health</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- Tell the modifier we want to transmit the data</span></span>
<span class="line"><span>    self:SetHasCustomTransmitterData(true)</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function modifier_custom_all_barrier:OnRefresh()</span></span>
<span class="line"><span>    self:OnCreated()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- Tell the client that we need to get the properties again</span></span>
<span class="line"><span>    if IsServer() then self:SendBuffRefreshToClients() end</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- Send our properties to client</span></span>
<span class="line"><span>function modifier_custom_all_barrier:AddCustomTransmitterData()</span></span>
<span class="line"><span>    return {</span></span>
<span class="line"><span>        max_barrier_health = self.max_barrier_health,</span></span>
<span class="line"><span>        current_barrier_health = self.current_barrier_health</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- Get the properties from the server</span></span>
<span class="line"><span>function modifier_custom_all_barrier:HandleCustomTransmitterData(data)</span></span>
<span class="line"><span>    self.max_barrier_health = data.max_barrier_health</span></span>
<span class="line"><span>    self.current_barrier_health = data.current_barrier_health</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- Declare which barrier type it is</span></span>
<span class="line"><span>function modifier_custom_all_barrier:DeclareFunctions()</span></span>
<span class="line"><span>    return {</span></span>
<span class="line"><span>        MODIFIER_PROPERTY_INCOMING_DAMAGE_CONSTANT</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function modifier_custom_all_barrier:GetModifierIncomingDamageConstant( event )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- Return the max health on the client if it&#39;s a max report, otherwise return the current health</span></span>
<span class="line"><span>    if IsClient() then</span></span>
<span class="line"><span>        if event.report_max then</span></span>
<span class="line"><span>            return self.max_barrier_health</span></span>
<span class="line"><span>        else</span></span>
<span class="line"><span>            return self.current_barrier_health</span></span>
<span class="line"><span>        end</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- Reduce the barrier&#39;s health by the damage</span></span>
<span class="line"><span>    self.current_barrier_health = self.current_barrier_health - event.damage</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- Tell the client that we need to update the health property</span></span>
<span class="line"><span>    self:SendBuffRefreshToClients()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- Check if the damage exceeded the barrier&#39;s health</span></span>
<span class="line"><span>    if self.current_barrier_health &lt;= 0 then</span></span>
<span class="line"><span>        self:Destroy()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        -- If it did, return the amount of damage we blocked as a negative to reduce it</span></span>
<span class="line"><span>        return -(event.damage + self.current_barrier_health)</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        -- Otherwise, return the full value of the damage as a negative to cancel it out</span></span>
<span class="line"><span>        return -event.damage</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br></div></div><p>Конечно, это выглядит очень много, но давайте разобьем это на удобоваримые части и посмотрим, что происходит.</p><h3 id="разбираем-пример" tabindex="-1">Разбираем пример <a class="header-anchor" href="#разбираем-пример" aria-label="Permalink to &quot;Разбираем пример&quot;">​</a></h3><p>Помимо основных функций, у нас уже появляются новые. Некоторые заслуживающие внимания дополнения — <code>SetHasCustomTransmitterData()</code> и <code>SendBuffRefreshToClients()</code>.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua title=&quot;Basic declarations&quot; {11,18}</span></span>
<span class="line"><span>modifier_custom_all_barrier = class({})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function modifier_custom_all_barrier:OnCreated()</span></span>
<span class="line"><span>    if not IsServer() then return end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- Set up our properties for the barrier&#39;s health</span></span>
<span class="line"><span>    self.max_barrier_health = 100</span></span>
<span class="line"><span>    self.current_barrier_health = self.max_barrier_health</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- Tell the modifier we want to transmit the data</span></span>
<span class="line"><span>    self:SetHasCustomTransmitterData(true)</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function modifier_custom_all_barrier:OnRefresh()</span></span>
<span class="line"><span>    self:OnCreated()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- Tell the client that we need to get the properties again</span></span>
<span class="line"><span>    if IsServer() then self:SendBuffRefreshToClients() end</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>Они используются для обновления текущего свойства работоспособности нашего клиента при каждом его изменении на сервере, поэтому нам необходимо обязательно вызывать <code>SendBuffRefreshToClients()</code> при изменении работоспособности барьера.</p><p>Но когда это изменится?</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua title=&quot;Taking barrier damage&quot; {13}</span></span>
<span class="line"><span>function modifier_custom_all_barrier:GetModifierIncomingDamageConstant( event )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- Return the max health on the client if it&#39;s a max report, otherwise return the current health</span></span>
<span class="line"><span>    if IsClient() then</span></span>
<span class="line"><span>        if event.report_max then</span></span>
<span class="line"><span>            return self.max_barrier_health</span></span>
<span class="line"><span>        else</span></span>
<span class="line"><span>            return self.current_barrier_health</span></span>
<span class="line"><span>        end</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- Reduce the barrier&#39;s health by the damage</span></span>
<span class="line"><span>    self.current_barrier_health = self.current_barrier_health - event.damage</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- Tell the client that we need to update the health property</span></span>
<span class="line"><span>    self:SendBuffRefreshToClients()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- Check if the damage exceeded the barrier&#39;s health</span></span>
<span class="line"><span>    if self.current_barrier_health &lt;= 0 then</span></span>
<span class="line"><span>        self:Destroy()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        -- If it did, return the amount of damage we blocked as a negative to reduce it</span></span>
<span class="line"><span>        return -(event.damage + self.current_barrier_health)</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        -- Otherwise, return the full value of the damage as a negative to cancel it out</span></span>
<span class="line"><span>        return -event.damage</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><p>Состояние барьера обновляется при вызове <code>GetModifierIncomingDamageConstant()</code>. Клиента волнует только то, каковы свойства максимального и текущего здоровья, поэтому он немедленно возвращается, оставляя остальную часть кода серверу для работы с логикой потери здоровья барьером.</p><p>Принцип работы барьера заключается в фиксированном уменьшении входящего урона. То есть после того, как вы уменьшите здоровье барьера, вам нужно вернуть то количество урона, которое вы заблокировали, чтобы Дота знала, на сколько уменьшить урон. Клиенту возвращается положительное число, а серверу — отрицательное.</p><p>:::информация Клиент вызывает <code>GetModifierIncomingDamageConstant()</code> дважды за кадр: один раз, чтобы получить максимальную работоспособность барьера (report_max = true), а другой раз, чтобы получить текущую работоспособность барьера (report_max = false). Сервер вызывает <code>GetModifierIncomingDamageConstant()</code> только тогда, когда родитель получает урон. :::</p><p>И вот оно. Мы рассмотрели и увидели, как настраивается барьер и как обновляется состояние работоспособности как на клиенте, так и на сервере, чтобы оно оставалось синхронизированным. Оставшаяся часть этой страницы будет посвящена библиотеке, над которой я работаю, чтобы добавить больше функций и упростить процесс создания барьеров в целом.</p><h2 id="библиотека-пользовательских-барьеров" tabindex="-1">Библиотека пользовательских барьеров <a class="header-anchor" href="#библиотека-пользовательских-барьеров" aria-label="Permalink to &quot;Библиотека пользовательских барьеров&quot;">​</a></h2><h3 id="настроика-библиотеки" tabindex="-1">Настройка библиотеки <a class="header-anchor" href="#настроика-библиотеки" aria-label="Permalink to &quot;Настройка библиотеки&quot;">​</a></h3><p>Эта библиотека задумана как расширение обычного класса модификаторов и добавляет к модификатору несколько полезных методов и превратит его в барьер для вас. Его можно поместить в папку <code>vscripts</code>, но он должен быть необходим <strong>как</strong> на сервере, так и на клиенте, поэтому поместите его в файл <code>addon_init.lua</code>. Если у вас его нет, просто создайте его и поместите в папку <code>vscripts</code>, где находится ваш файл <code>addon_game_mode.lua</code>.</p><p>::: подробности custom_barriers.lua</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>if CustomBarriers == nil then CustomBarriers = {} end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- Created by Cykada (@oniisama on discord)</span></span>
<span class="line"><span>-- Version 1.1.0 (lib)</span></span>
<span class="line"><span>-- check https://moddota.com/abilities/lua-modifiers/5 for a guide</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function CustomBarriers:__GetBarrierOptions()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    --? All damage barriers will not block physical or magical (doesn&#39;t effect HP Removal)</span></span>
<span class="line"><span>    self.ALL_BARRIER_ONLY_BLOCKS_PURE = false</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    --? All damage barrier will also block hp removal flagged damage</span></span>
<span class="line"><span>    self.ALL_BARRIER_BLOCK_HP_REMOVAL = false</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    --? Whether barriers will have a blocked damage overhead alert</span></span>
<span class="line"><span>    self.SHOW_BARRIER_BLOCK_OVERHEAD_ALERT = true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>--=======================================================================================</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function CustomBarriers:TurnModifierIntoBarrier( mod )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- inject the barriers into the declared functions</span></span>
<span class="line"><span>    if mod.DeclareFunctions ~= nil and mod:DeclareFunctions() ~= nil then</span></span>
<span class="line"><span>        mod.__OldDeclareFunctions = mod.DeclareFunctions</span></span>
<span class="line"><span>    else mod.__OldDeclareFunctions = function(self) return {} end end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    mod.DeclareFunctions = function(self)</span></span>
<span class="line"><span>        local declared_funcs = self:__OldDeclareFunctions()</span></span>
<span class="line"><span>        table.insert( declared_funcs, MODIFIER_PROPERTY_INCOMING_PHYSICAL_DAMAGE_CONSTANT )</span></span>
<span class="line"><span>        table.insert( declared_funcs, MODIFIER_PROPERTY_INCOMING_SPELL_DAMAGE_CONSTANT )</span></span>
<span class="line"><span>        table.insert( declared_funcs, MODIFIER_PROPERTY_INCOMING_DAMAGE_CONSTANT )</span></span>
<span class="line"><span>        return declared_funcs</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span>    mod.GetModifierIncomingPhysicalDamageConstant = self.GetModifierIncomingPhysicalDamageConstant</span></span>
<span class="line"><span>    mod.GetModifierIncomingSpellDamageConstant = self.GetModifierIncomingSpellDamageConstant</span></span>
<span class="line"><span>    mod.GetModifierIncomingDamageConstant = self.GetModifierIncomingDamageConstant</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    mod.HandleCustomTransmitterData = function(self, data) for k,v in pairs(data) do self[k] = v end end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- add the setup to OnCreated()</span></span>
<span class="line"><span>    if mod.OnCreated ~= nil then</span></span>
<span class="line"><span>        mod.__OldOnCreated = mod.OnCreated else mod.__OldOnCreated = function() end</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span>    mod.OnCreated = function(self, kv)</span></span>
<span class="line"><span>        self:__OldOnCreated(kv)</span></span>
<span class="line"><span>        if IsServer() then CustomBarriers:__SetupBarrierModifier(self) end</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- append a client update to OnRefresh()</span></span>
<span class="line"><span>    if mod.OnRefresh ~= nil then</span></span>
<span class="line"><span>        mod.__OldOnRefresh = mod.OnRefresh else mod.__OldOnRefresh = function(self) return end</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span>    mod.OnRefresh = function(self, kv)</span></span>
<span class="line"><span>        self:__OldOnRefresh(kv)</span></span>
<span class="line"><span>        self:OnCreated(kv)</span></span>
<span class="line"><span>        if IsServer() then self:__BarrierUpdate() end</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- check if they have made a damage filter</span></span>
<span class="line"><span>    if mod.OnBarrierDamagedFilter == nil then mod.OnBarrierDamagedFilter = function(self) return true end end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- new functions that can just be copied over, respect tweaks</span></span>
<span class="line"><span>    local general_funcs = {</span></span>
<span class="line"><span>        &quot;__IsBarrier&quot;,</span></span>
<span class="line"><span>        &quot;IsBarrierFor&quot;,</span></span>
<span class="line"><span>        &quot;SetBarrierType&quot;,</span></span>
<span class="line"><span>        --&quot;GetBarrierType&quot;,</span></span>
<span class="line"><span>        &quot;SetBarrierMaxHealth&quot;,</span></span>
<span class="line"><span>        --&quot;GetBarrierMaxHealth&quot;,</span></span>
<span class="line"><span>        &quot;SetBarrierHealth&quot;,</span></span>
<span class="line"><span>        &quot;GetBarrierHealth&quot;,</span></span>
<span class="line"><span>        &quot;SetBarrierInitialHealth&quot;,</span></span>
<span class="line"><span>        &quot;GetBarrierInitialHealth&quot;,</span></span>
<span class="line"><span>        &quot;IsPersistent&quot;,</span></span>
<span class="line"><span>        &quot;ShowOnZeroHP&quot;,</span></span>
<span class="line"><span>        &quot;__BarrierUpdate&quot;,</span></span>
<span class="line"><span>        &quot;__DoBarrierBlock&quot;,</span></span>
<span class="line"><span>        &quot;__GetBarrierOptions&quot;,</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    for _,func in ipairs(general_funcs) do if mod[func] == nil then mod[func] = self[func] end end</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function CustomBarriers:__SetupBarrierModifier(mod)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- Missing data error handler</span></span>
<span class="line"><span>    local error_msg = &quot;CustomBarriers Error: Undeclared barrier initialisation properties!&quot;</span></span>
<span class="line"><span>    local missing_props = {}</span></span>
<span class="line"><span>    if mod.GetBarrierType == nil and mod.__barrier_type == nil then table.insert(missing_props, &quot;- Type&quot;) end</span></span>
<span class="line"><span>    if mod.GetBarrierMaxHealth == nil and mod.__max_barrier_health == nil then table.insert(missing_props, &quot;- Max Health&quot;) end</span></span>
<span class="line"><span>    if #missing_props &gt; 0 then</span></span>
<span class="line"><span>        print(&quot;Missing Properties;&quot;)</span></span>
<span class="line"><span>        for _,s in ipairs(missing_props) do print(s) end</span></span>
<span class="line"><span>        return</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- setup the internal properties</span></span>
<span class="line"><span>    if mod.GetBarrierType ~= nil then mod.__barrier_type = mod:GetBarrierType() end</span></span>
<span class="line"><span>    mod.GetBarrierType = function(self) return self.__barrier_type end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if mod.GetBarrierMaxHealth ~= nil then mod.__max_barrier_health = mod:GetBarrierMaxHealth() end</span></span>
<span class="line"><span>    mod.GetBarrierMaxHealth = function (self) return self.__max_barrier_health end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if mod.GetBarrierInitialHealth ~= nil then mod.__initial_barrier_health = mod:GetBarrierInitialHealth() end</span></span>
<span class="line"><span>    mod.GetBarrierInitialHealth = function (self) return self.__initial_barrier_health end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    mod.__current_barrier_health = mod.__initial_barrier_health</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- add the internal properties to the transmitter</span></span>
<span class="line"><span>    if mod.__OldAddCustomTransmitterData == nil then</span></span>
<span class="line"><span>        if mod.AddCustomTransmitterData ~= nil and mod:AddCustomTransmitterData() ~= nil then</span></span>
<span class="line"><span>            mod.__OldAddCustomTransmitterData = mod.AddCustomTransmitterData</span></span>
<span class="line"><span>        else mod.__OldAddCustomTransmitterData = function(self) return {} end end</span></span>
<span class="line"><span>        mod.AddCustomTransmitterData = function(self)</span></span>
<span class="line"><span>            local transmit_data = self:__OldAddCustomTransmitterData()</span></span>
<span class="line"><span>            transmit_data.__barrier_type = mod.__barrier_type</span></span>
<span class="line"><span>            transmit_data.__max_barrier_health = mod.__max_barrier_health</span></span>
<span class="line"><span>            transmit_data.__current_barrier_health = mod.__current_barrier_health</span></span>
<span class="line"><span>            transmit_data.__initial_barrier_health = mod.__initial_barrier_health</span></span>
<span class="line"><span>            return transmit_data</span></span>
<span class="line"><span>        end</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- add the options</span></span>
<span class="line"><span>    mod:__GetBarrierOptions()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- send the new data to the client</span></span>
<span class="line"><span>    mod:SetHasCustomTransmitterData(true)</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- generic handler for when the barrier values are changed</span></span>
<span class="line"><span>function CustomBarriers:__BarrierUpdate()</span></span>
<span class="line"><span>    if self.__current_barrier_health == nil then self.__current_barrier_health = 1 end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if not self:IsPersistent() then</span></span>
<span class="line"><span>        if self.__current_barrier_health &lt;= 0 then return self:Destroy() end</span></span>
<span class="line"><span>    else self.__current_barrier_health = math.max(0, self.__current_barrier_health) end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if self.__max_barrier_health ~= nil then</span></span>
<span class="line"><span>        self.__current_barrier_health = math.min( self.__current_barrier_health, self.__max_barrier_health )</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    self:SendBuffRefreshToClients()</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- set / get barrier type</span></span>
<span class="line"><span>function CustomBarriers:GetBarrierType() return DAMAGE_TYPE_ALL end</span></span>
<span class="line"><span>function CustomBarriers:SetBarrierType(dmg_type)</span></span>
<span class="line"><span>    self.__barrier_type = dmg_type</span></span>
<span class="line"><span>    self:__BarrierUpdate()</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- destroy on 0 hp, show on 0 hp</span></span>
<span class="line"><span>function CustomBarriers:IsPersistent() return false end</span></span>
<span class="line"><span>function CustomBarriers:ShowOnZeroHP() return false end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function CustomBarriers:__IsBarrier()</span></span>
<span class="line"><span>    if not self:ShowOnZeroHP() and self.__current_barrier_health &lt;= 0 then return false else return true end</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- compare the damage type to what the respective barrier blocks</span></span>
<span class="line"><span>function CustomBarriers:IsBarrierFor(dmg_type)</span></span>
<span class="line"><span>    if self:IsPersistent() then</span></span>
<span class="line"><span>        if self.__current_barrier_health &lt;= 0 and not self:ShowOnZeroHP() then</span></span>
<span class="line"><span>            return false</span></span>
<span class="line"><span>        end</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    local b = self.__barrier_type</span></span>
<span class="line"><span>    if b == dmg_type then return true end</span></span>
<span class="line"><span>    if IsClient() then return false end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if b == DAMAGE_TYPE_PURE or b == DAMAGE_TYPE_ALL then</span></span>
<span class="line"><span>        local not_pure = (dmg_type == DAMAGE_TYPE_PHYSICAL or dmg_type == DAMAGE_TYPE_MAGICAL)</span></span>
<span class="line"><span>        if self.ALL_BARRIER_ONLY_BLOCKS_PURE and not_pure then return false end</span></span>
<span class="line"><span>        return true</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return false</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- set / get barrier max health</span></span>
<span class="line"><span>function CustomBarriers:SetBarrierMaxHealth(amount)</span></span>
<span class="line"><span>    self.__max_barrier_health = math.ceil(amount)</span></span>
<span class="line"><span>    self:__BarrierUpdate()</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span>function CustomBarriers:GetBarrierMaxHealth() return self.__max_barrier_health end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- set / get barrier health</span></span>
<span class="line"><span>function CustomBarriers:GetBarrierHealth() return self.__current_barrier_health end</span></span>
<span class="line"><span>function CustomBarriers:SetBarrierHealth(amount)</span></span>
<span class="line"><span>    self.__current_barrier_health = math.ceil(amount)</span></span>
<span class="line"><span>    self:__BarrierUpdate()</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span>function CustomBarriers:GetBarrierInitialHealth() return self.__initial_barrier_health or self.__max_barrier_health end</span></span>
<span class="line"><span>function CustomBarriers:SetBarrierInitialHealth(amount) self.__initial_barrier_health = amount end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- functions for handling the damage block</span></span>
<span class="line"><span>function CustomBarriers:GetModifierIncomingPhysicalDamageConstant(keys) return self:__DoBarrierBlock(1, keys) end</span></span>
<span class="line"><span>function CustomBarriers:GetModifierIncomingSpellDamageConstant(keys) return self:__DoBarrierBlock(2, keys) end</span></span>
<span class="line"><span>function CustomBarriers:GetModifierIncomingDamageConstant(keys) return self:__DoBarrierBlock(4, keys) end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function CustomBarriers:__DoBarrierBlock(d, keys)</span></span>
<span class="line"><span>    if IsClient() then</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        -- check and report hp on client</span></span>
<span class="line"><span>        if not self:IsBarrierFor(d) then return end</span></span>
<span class="line"><span>        if keys.report_max then return self.__max_barrier_health else return self.__current_barrier_health end</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        -- check damage on server</span></span>
<span class="line"><span>        if keys.attacker == self:GetParent() then return 0 end</span></span>
<span class="line"><span>        if not self:IsBarrierFor(keys.damage_type) then return 0 end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        -- check if we want to block hp loss</span></span>
<span class="line"><span>        if not self.ALL_BARRIER_BLOCK_HP_REMOVAL then</span></span>
<span class="line"><span>            if bit.band(keys.damage_flags, DOTA_DAMAGE_FLAG_HPLOSS) == DOTA_DAMAGE_FLAG_HPLOSS then</span></span>
<span class="line"><span>                return 0</span></span>
<span class="line"><span>            end</span></span>
<span class="line"><span>        end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        -- call the filter</span></span>
<span class="line"><span>        if not self:OnBarrierDamagedFilter(keys) then return keys.damage end</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- Don&#39;t block more than the barrier hp</span></span>
<span class="line"><span>    local blocked_amount = math.min(keys.damage, self.__current_barrier_health)</span></span>
<span class="line"><span>    self.__current_barrier_health = self.__current_barrier_health - blocked_amount</span></span>
<span class="line"><span>    self:__BarrierUpdate()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- block visual</span></span>
<span class="line"><span>    if self.SHOW_BARRIER_BLOCK_OVERHEAD_ALERT and blocked_amount &gt; 0 then</span></span>
<span class="line"><span>        SendOverheadEventMessage(</span></span>
<span class="line"><span>            self:GetParent():GetPlayerOwner(),</span></span>
<span class="line"><span>            OVERHEAD_ALERT_BLOCK,</span></span>
<span class="line"><span>            self:GetParent(),</span></span>
<span class="line"><span>            blocked_amount,</span></span>
<span class="line"><span>            keys.attacker:GetPlayerOwner()</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return -blocked_amount</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- damage filter</span></span>
<span class="line"><span>function CustomBarriers:OnBarrierDamagedFilter(keys) return true end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- yeah I&#39;m cheating, shut up</span></span>
<span class="line"><span>function CDOTA_Buff:IsBarrier() if self.__IsBarrier ~= nil then return self:__IsBarrier() else return false end end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br><span class="line-number">174</span><br><span class="line-number">175</span><br><span class="line-number">176</span><br><span class="line-number">177</span><br><span class="line-number">178</span><br><span class="line-number">179</span><br><span class="line-number">180</span><br><span class="line-number">181</span><br><span class="line-number">182</span><br><span class="line-number">183</span><br><span class="line-number">184</span><br><span class="line-number">185</span><br><span class="line-number">186</span><br><span class="line-number">187</span><br><span class="line-number">188</span><br><span class="line-number">189</span><br><span class="line-number">190</span><br><span class="line-number">191</span><br><span class="line-number">192</span><br><span class="line-number">193</span><br><span class="line-number">194</span><br><span class="line-number">195</span><br><span class="line-number">196</span><br><span class="line-number">197</span><br><span class="line-number">198</span><br><span class="line-number">199</span><br><span class="line-number">200</span><br><span class="line-number">201</span><br><span class="line-number">202</span><br><span class="line-number">203</span><br><span class="line-number">204</span><br><span class="line-number">205</span><br><span class="line-number">206</span><br><span class="line-number">207</span><br><span class="line-number">208</span><br><span class="line-number">209</span><br><span class="line-number">210</span><br><span class="line-number">211</span><br><span class="line-number">212</span><br><span class="line-number">213</span><br><span class="line-number">214</span><br><span class="line-number">215</span><br><span class="line-number">216</span><br><span class="line-number">217</span><br><span class="line-number">218</span><br><span class="line-number">219</span><br><span class="line-number">220</span><br><span class="line-number">221</span><br><span class="line-number">222</span><br><span class="line-number">223</span><br><span class="line-number">224</span><br><span class="line-number">225</span><br><span class="line-number">226</span><br><span class="line-number">227</span><br><span class="line-number">228</span><br><span class="line-number">229</span><br><span class="line-number">230</span><br><span class="line-number">231</span><br><span class="line-number">232</span><br><span class="line-number">233</span><br><span class="line-number">234</span><br><span class="line-number">235</span><br><span class="line-number">236</span><br><span class="line-number">237</span><br><span class="line-number">238</span><br><span class="line-number">239</span><br><span class="line-number">240</span><br><span class="line-number">241</span><br><span class="line-number">242</span><br><span class="line-number">243</span><br><span class="line-number">244</span><br><span class="line-number">245</span><br><span class="line-number">246</span><br><span class="line-number">247</span><br><span class="line-number">248</span><br><span class="line-number">249</span><br><span class="line-number">250</span><br><span class="line-number">251</span><br></div></div><p>:::</p><h3 id="creating-a-custom-barrier" tabindex="-1">Creating a custom barrier <a class="header-anchor" href="#creating-a-custom-barrier" aria-label="Permalink to &quot;Creating a custom barrier&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>CustomBarriers:TurnModifierIntoBarrier( CDOTA_Buff )</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Эта функция берет на себя большую часть тяжелой работы, она добавит все необходимые функции вашему модификатору и превратит его в барьер. Это нужно называть <strong><em>после</em></strong> всех ваших функций-модификаторов. Модификатору также необходимо знать, какой это тип барьера и сколько у него максимального здоровья.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua title=&quot;Setting type and max health&quot;</span></span>
<span class="line"><span>-- You can either use the get functions to declare them</span></span>
<span class="line"><span>function modifier:GetBarrierType()</span></span>
<span class="line"><span>    return DAMAGE_TYPE</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function modifier:GetBarrierMaxHealth()</span></span>
<span class="line"><span>    return int</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- Or you can set them in the modifier&#39;s OnCreated()</span></span>
<span class="line"><span>function modifier:OnCreated()</span></span>
<span class="line"><span>    self:SetBarrierType( DAMAGE_TYPE )</span></span>
<span class="line"><span>    self:SetBarrierMaxHealth( int )</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>Этого уже достаточно, чтобы иметь функциональный барьер того типа, который вам нужен.</p><h3 id="библиотечные-функции" tabindex="-1">Библиотечные функции <a class="header-anchor" href="#библиотечные-функции" aria-label="Permalink to &quot;Библиотечные функции&quot;">​</a></h3><p>Эти функции добавляются к модификатору при вызове <code>CustomBarriers:TurnModifierIntoBarrier( CDOTA_Buff )</code>, они не добавляются в базовый класс <code>CDOTA_Buff</code>. <code>IsBarrier()</code> — единственный, который добавляется в базовый класс <code>CDOTA_Buff</code>, поэтому вызов остальных модификаторов, которые вы не превратили в барьер, приведет к ошибке.</p><table tabindex="0"><thead><tr><th>Имя функции</th><th>Вернуться</th><th>Описание</th></tr></thead><tbody><tr><td>IsБарьер()</td><td>бул</td><td>Возвращает true, если барьер виден.</td></tr><tr><td>IsBarrierFor( <a href="https://moddota.com/api/#!/vscripts/DAMAGE_TYPES" target="_blank" rel="noreferrer">DAMAGE_TYPES</a> )</td><td>бул</td><td>Возвращает true, если тип урона будет заблокирован барьером.</td></tr><tr><td>SetBarrierType( <a href="https://moddota.com/api/#!/vscripts/DAMAGE_TYPES" target="_blank" rel="noreferrer">DAMAGE_TYPES</a> )</td><td><em>ноль</em></td><td>Устанавливает барьер для блокировки указанного типа урона.</td></tr><tr><td>ПолучитьТипБарьера()</td><td><a href="https://moddota.com/api/#!/vscripts/DAMAGE_TYPES" target="_blank" rel="noreferrer">DAMAGE_TYPES</a></td><td>Возвращает тип урона, который барьер заблокирует.</td></tr><tr><td>SetBarrierMaxHealth( int )</td><td><em>ноль</em></td><td>Устанавливает максимальное здоровье барьера.</td></tr><tr><td>GetBarrierMaxHealth()</td><td>интервал</td><td>Получает максимальное здоровье барьера.</td></tr><tr><td>SetBarrierHealth( int )</td><td><em>ноль</em></td><td>Устанавливает текущее здоровье барьера.</td></tr><tr><td>ПолучитьБарьерЗдоровье()</td><td>интервал</td><td>Получает текущее здоровье барьера.</td></tr><tr><td>SetBarrierInitialHealth( int )</td><td><em>ноль</em></td><td>Устанавливает начальное здоровье барьера.</td></tr><tr><td>GetBarrierInitialHealth()</td><td>интервал</td><td>Получает начальное здоровье барьера.</td></tr><tr><td>Исперсистент()</td><td>бул</td><td>Будет ли модификатор уничтожен, когда здоровье барьера достигнет 0. По умолчанию — <code>false</code>.</td></tr><tr><td>ПоказатьOnZeroHP()</td><td>бул</td><td>Видна ли полоса барьера при 0 хп. По умолчанию <code>false</code>.</td></tr><tr><td>OnBarrierDamagedFilter(событие)</td><td>бул</td><td>Фильтр на случай повреждения барьера. Верните false, если вы хотите, чтобы устройство было повреждено. Установите <code>event.damage</code> на 0, если вы не хотите, чтобы какой-либо ущерб был нанесен вообще. (вызывается только на сервере)</td></tr></tbody></table><ul><li><code>GetBarrierType()</code> и <code>SetBarrierType()</code> предназначены для использования с 3 основными типами повреждений; <code>Physical</code>, <code>Magical</code> и <code>Pure</code>. В данном случае <code>Pure</code> относится к универсальному барьеру.</li><li><code>ShowOnZeroHP()</code> будет работать только в том случае, если <code>IsPersistent()</code> равен <code>true</code>.</li></ul><h3 id="пример-библиотечного-барьера" tabindex="-1">Пример библиотечного барьера <a class="header-anchor" href="#пример-библиотечного-барьера" aria-label="Permalink to &quot;Пример библиотечного барьера&quot;">​</a></h3><p>Допустим, мы хотим иметь барьер магического урона, который начинается с 0, всегда присутствует, увеличивается в зависимости от наносимого нами магического урона и имеет ограничение, основанное на нашем максимальном количестве здоровья. Звучит очень сложно, правда? Посмотрим, как у нас дела.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>modifier_magic_barrier = class({})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- We want to hide it when the hp is 0</span></span>
<span class="line"><span>function modifier_magic_barrier:IsHidden()</span></span>
<span class="line"><span>    return self:GetBarrierHealth() &lt;= 0</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function modifier_magic_barrier:IsPermanent()</span></span>
<span class="line"><span>    return true</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- Make sure the modifier isn&#39;t destroyed when it&#39;s at 0 hp</span></span>
<span class="line"><span>function modifier_magic_barrier:IsPersistent()</span></span>
<span class="line"><span>    return true</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- We want a magic barrier</span></span>
<span class="line"><span>function modifier_magic_barrier:GetBarrierType()</span></span>
<span class="line"><span>    return DAMAGE_TYPE_MAGICAL</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- Declare the max barrier health as % of our max hp</span></span>
<span class="line"><span>function modifier_magic_barrier:GetBarrierMaxHealth()</span></span>
<span class="line"><span>    return math.ceil(self:GetParent():GetMaxHealth() * self.barrier_cap)</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- Start at 0 barrier hp</span></span>
<span class="line"><span>function modifier_magic_barrier:GetBarrierInitialHealth()</span></span>
<span class="line"><span>    return 0</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- Here we want to just declare some properties to make our life easier</span></span>
<span class="line"><span>function modifier_magic_barrier:OnCreated()</span></span>
<span class="line"><span>    self.barrier_cap = self:GetAbility():GetSpecialValueFor(&quot;barrier_cap&quot;)/100</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if IsServer() then</span></span>
<span class="line"><span>        self.barrier_conversion = self:GetAbility():GetSpecialValueFor(&quot;barrier_conversion&quot;)/100</span></span>
<span class="line"><span>        self:StartIntervalThink(0.2)</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- We need to keep track of our max hp somehow, if we dont then it will only update when we take damage</span></span>
<span class="line"><span>function modifier_magic_barrier:OnIntervalThink()</span></span>
<span class="line"><span>    self:SetBarrierMaxHealth( math.ceil(self:GetParent():GetMaxHealth() * self.barrier_cap) )</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- We want to know when something takes damage to check if it&#39;s from us</span></span>
<span class="line"><span>function modifier_magic_barrier:DeclareFunctions()</span></span>
<span class="line"><span>    return {</span></span>
<span class="line"><span>        MODIFIER_EVENT_ON_TAKEDAMAGE</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- Here we check when we do magic damage</span></span>
<span class="line"><span>function modifier_magic_barrier:OnTakeDamage( event )</span></span>
<span class="line"><span>    if IsClient() then return end -- don&#39;t need the client here</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if keys.unit == self:GetParent() or keys.attacker ~= self:GetParent() then</span></span>
<span class="line"><span>        return -- we only care about us doing damage</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if keys.damage_type ~= DAMAGE_TYPE_MAGICAL then return end -- we only want magic damage</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- now we can turn a portion of the magic damage we&#39;ve done into our barrier health!</span></span>
<span class="line"><span>    local amount = keys.damage * self.barrier_conversion</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- Set the health directly, but don&#39;t exceed the max health</span></span>
<span class="line"><span>    self:SetBarrierHealth( math.min( self:GetBarrierHealth() + amount, self:GetBarrierMaxHealth() ) )</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- Now that we&#39;ve created our modifier, we can tell the library to turn it into a barrier!</span></span>
<span class="line"><span>CustomBarriers:TurnModifierIntoBarrier( modifier_magic_barrier )</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br></div></div><h3 id="компактныи-пример" tabindex="-1">Компактный пример <a class="header-anchor" href="#компактныи-пример" aria-label="Permalink to &quot;Компактный пример&quot;">​</a></h3><p>Давайте возьмем ранее созданный <a href="#simple-example">Simple Example</a> и переделаем его с помощью библиотеки.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua title=&quot;Simple Universal Barrier (Lib Edition)&quot;</span></span>
<span class="line"><span>modifier_custom_all_barrier = class({})</span></span>
<span class="line"><span>function modifier_custom_all_barrier:GetBarrierType() return DAMAGE_TYPE_PURE end</span></span>
<span class="line"><span>function modifier_custom_all_barrier:GetBarrierMaxHealth() return 100 end</span></span>
<span class="line"><span>CustomBarriers:TurnModifierIntoBarrier( modifier_custom_all_barrier )</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Это по-прежнему работает точно так же, как и предыдущая версия, вместо этого весь код, специфичный для барьера, обрабатывается <code>CustomBarriers</code>.</p>`,48)])])}const d=s(l,[["render",r]]);export{o as __pageData,d as default};
