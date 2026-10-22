import{_ as s,o as a,c as e,ag as p}from"./chunks/framework.DUTPmUpA.js";const o=JSON.parse('{"title":"Отправка значений Сервера Клиенту в модификаторе.","description":"","frontmatter":{"title":"Отправка значений Сервера Клиенту в модификаторе.","author":"DankBud","steamId":"76561198157673452","date":"05.12.2021"},"headers":[],"relativePath":"abilities/server-to-client.md","filePath":"abilities/server-to-client.md"}'),l={name:"abilities/server-to-client.md"};function i(r,n,t,c,b,u){return a(),e("div",null,[...n[0]||(n[0]=[p(`<h1 id="отправка-значении-сервера-клиенту-в-модификаторе" tabindex="-1">Отправка значений Сервера Клиенту в модификаторе. <a class="header-anchor" href="#отправка-значении-сервера-клиенту-в-модификаторе" aria-label="Permalink to &quot;Отправка значений Сервера Клиенту в модификаторе.&quot;">​</a></h1><p>Скрипты модификаторов запускаются как на сервере, так и на каждом клиенте игры. Многие из <a href="https://moddota.com/api/#!/vscripts" target="_blank" rel="noreferrer">Lua API</a> — это серверные функции, которые клиент не может использовать.</p><p>Итак, часто при использовании модификаторов вам придется использовать только серверные функции для вычислений или для каких-либо других целей.</p><p>Обычно сервер отвечает за функциональность, а клиент предназначен только для отображения информации.</p><p>Таким образом, если вы, например, дали своему герою бонусный урон, который вы рассчитали или сохранили только на сервере, вы увидите, что ваш герой наносит дополнительный урон, но он не отображается в пользовательском интерфейсе или во всплывающих подсказках. Пример, который увеличивает ваш основной атрибут в 2 раза в качестве бонусного урона:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>modifier_example = class({})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function modifier_example:DeclareFunction()</span></span>
<span class="line"><span>	return {</span></span>
<span class="line"><span>		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function modifier_example:GetModifierPreAttack_BonusDamage()</span></span>
<span class="line"><span>	if not IsServer() then return end</span></span>
<span class="line"><span>	--GetPrimaryStatValue is a server-only function</span></span>
<span class="line"><span>	return self:GetParent():GetPrimaryStatValue() * 2</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>С этим модификатором вы столкнетесь с упомянутой проблемой, когда ваш урон от атаки не обновляется в пользовательском интерфейсе, но вы все равно будете наносить дополнительный урон.</p><p>Чтобы это исправить, нам нужно каким-то образом отправить клиенту это значение, предназначенное только для сервера. Есть два основных способа сделать это, хотя есть и другие, менее удобные способы.</p><h2 id="stacks" tabindex="-1">Количество модификаторов стека <a class="header-anchor" href="#stacks" aria-label="Permalink to &quot;Количество модификаторов стека {#stacks}&quot;">​</a></h2><p>Это самый простой метод, при котором все, что вам нужно сделать, это установить счетчик стека модификаторов на сервере, и счетчик автоматически синхронизируется с клиентом.</p><p>Пример использования этого метода:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>modifier_example = class({})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function modifier_example:DeclareFunction()</span></span>
<span class="line"><span>	return {</span></span>
<span class="line"><span>		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function modifier_example:GetModifierPreAttack_BonusDamage()</span></span>
<span class="line"><span>	if IsServer() then</span></span>
<span class="line"><span>		local stat = self:GetParent():GetPrimaryStatValue()</span></span>
<span class="line"><span>		self:SetStackCount(stat)</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	return self:GetStackCount() * 2</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>Отлично, теперь урон наносится и отображается корректно!</p><p>Но есть некоторые ограничения на использование стеков модификаторов.</p><ul><li>Вы можете устанавливать только целые значения. Никаких чисел с плавающей запятой, логических значений, строк или таблиц.</li><li>Вы можете установить только одно количество стеков для каждого модификатора.</li><li>Количество стаков отображается на значке баффа модификатора, а это не всегда нужно.</li></ul><p>Так что же делать, если вам нужно отправить одно из этих неподдерживаемых значений или даже отправить клиенту несколько значений? Что ж, есть несколько обходных путей, но вам следует использовать передатчики-модификаторы.</p><h2 id="transmitters" tabindex="-1">Модификатор Передатчики <a class="header-anchor" href="#transmitters" aria-label="Permalink to &quot;Модификатор Передатчики {#transmitters}&quot;">​</a></h2><p>Передатчики модификаторов позволяют вам отправлять любое количество значений любых типов с сервера клиенту в вашем модификаторе. Но они требуют некоторой настройки.</p><p>Для использования передатчиков необходимы 3 функции.</p><ul><li><p><code>SetHasCustomTransmitterData</code> Это должно быть вызвано в функции <code>OnCreated</code> вашего модификатора. сообщить серверу, что вы хотите, чтобы ваш модификатор передавал данные клиенту</p></li><li><p><code>AddCustomTransmitterData</code> Здесь вы выбираете данные, которые хотите отправить клиенту, запускаемые только на стороне сервера.</p></li><li><p><code>HandleCustomTransmitterData</code> Сюда отправляются данные сервера, работающие только на стороне клиента.</p></li><li><p>а также <code>SendBuffRefreshToClients</code> для обновления передаваемых данных при необходимости.</p></li></ul><p>Пример, который дает дополнительный урон и скорость атаки в зависимости от вашего текущего здоровья.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>modifier_example = class({})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function modifier_example:OnCreated( kv )</span></span>
<span class="line"><span>	if not IsServer() then return end</span></span>
<span class="line"><span>	--grab some values from the ability&#39;s KV</span></span>
<span class="line"><span>	local percent_health_to_damage = self:GetAbility():GetSpecialValueFor(&quot;percent_health_to_damage&quot;)</span></span>
<span class="line"><span>	local percent_health_to_atk_spd = self:GetAbility():GetSpecialValueFor(&quot;percent_health_to_atk_spd&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	--GetHealth is a server-only function</span></span>
<span class="line"><span>	local health = self:GetParent():GetHealth()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	--calculate our values on the server.</span></span>
<span class="line"><span>	self.damage = health * percent_health_to_damage</span></span>
<span class="line"><span>	self.attack_speed = health * percent_health_to_atk_spd</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	--tell the server we are ready to send data to the client</span></span>
<span class="line"><span>	self:SetHasCustomTransmitterData(true)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	--we want to think so we can periodically refresh the data we are sending to the client</span></span>
<span class="line"><span>	--note: this can be called on client, but in this script its only called on server, so it only thinks on server.</span></span>
<span class="line"><span>	self:StartIntervalThink(0.1)</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>--refresh the modifier on every think</span></span>
<span class="line"><span>function modifier_example:OnIntervalThink()</span></span>
<span class="line"><span>	self:OnRefresh()</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>--this function is called when a modifier is reapplied, or manually refreshed in a script.</span></span>
<span class="line"><span>function modifier_example:OnRefresh( kv )</span></span>
<span class="line"><span>	if IsServer() then</span></span>
<span class="line"><span>    --call OnCreated again to recalculate our values</span></span>
<span class="line"><span>    self:OnCreated()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		--SendBuffRefreshToClients is a server-only function</span></span>
<span class="line"><span>		self:SendBuffRefreshToClients()</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>--this is a server-only function that is called whenever modifier:SetHasCustomTransmitterData(true) is called,</span></span>
<span class="line"><span>-- and also whenever modifier:SendBuffRefreshToClients() is called</span></span>
<span class="line"><span>function modifier_example:AddCustomTransmitterData()</span></span>
<span class="line"><span>	return {</span></span>
<span class="line"><span>		damage = self.damage,</span></span>
<span class="line"><span>		attack_speed = self.attack_speed,</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>--this is a client-only function that is called with the table returned by modifier:AddCustomTransmitterData()</span></span>
<span class="line"><span>function modifier_example:HandleCustomTransmitterData( data )</span></span>
<span class="line"><span>	self.damage = data.damage</span></span>
<span class="line"><span>	self.attack_speed = data.attack_speed</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function modifier_example:DeclareFunctions()</span></span>
<span class="line"><span>	return {</span></span>
<span class="line"><span>		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,</span></span>
<span class="line"><span>		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function modifier_example:GetModifierAttackSpeedBonus_Constant()</span></span>
<span class="line"><span>	return self.attack_speed</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function modifier_example:GetModifierPreAttack_BonusDamage()</span></span>
<span class="line"><span>	return self.damage</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br></div></div><p>Множество других примеров передатчиков-модификаторов вы можете найти на <a href="https://github.com/search?l=Lua&amp;q=SetHasCustomTransmitterData&amp;type=Code" target="_blank" rel="noreferrer">GitHub</a>.</p>`,23)])])}const d=s(l,[["render",i]]);export{o as __pageData,d as default};
