import{_ as s,o as a,c as p,ag as e}from"./chunks/framework.DUTPmUpA.js";const o=JSON.parse('{"title":"Создание зарядов за использование любой способности","description":"","frontmatter":{"title":"Создание зарядов за использование любой способности","author":"DoctorGester","steamId":"76561198046920629","date":"28.12.2015"},"headers":[],"relativePath":"abilities/making-any-ability-use-charges.md","filePath":"abilities/making-any-ability-use-charges.md"}'),l={name:"abilities/making-any-ability-use-charges.md"};function i(r,n,c,t,b,u){return a(),p("div",null,[...n[0]||(n[0]=[e(`<p>а использование любой способности</p><p>Руководство/фрагмент, который поможет вам использовать заряды любых способностей, таких как Shrapnel или Stone Caller.</p><p>Сначала сохраните следующий код под именем <code>modifier_charges.lua</code> в папке <code>vscripts</code> (или в любой подпапке внутри нее).</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>modifier_charges = class({})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if IsServer() then</span></span>
<span class="line"><span>    function modifier_charges:Update()</span></span>
<span class="line"><span>        if self:GetDuration() == -1 then</span></span>
<span class="line"><span>            self:SetDuration(self.kv.replenish_time, true)</span></span>
<span class="line"><span>            self:StartIntervalThink(self.kv.replenish_time)</span></span>
<span class="line"><span>        end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if self:GetStackCount() == 0 then</span></span>
<span class="line"><span>            self:GetAbility():StartCooldown(self:GetRemainingTime())</span></span>
<span class="line"><span>        end</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    function modifier_charges:OnCreated(kv)</span></span>
<span class="line"><span>        self:SetStackCount(kv.start_count or kv.max_count)</span></span>
<span class="line"><span>        self.kv = kv</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if kv.start_count and kv.start_count ~= kv.max_count then</span></span>
<span class="line"><span>            self:Update()</span></span>
<span class="line"><span>        end</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    function modifier_charges:DeclareFunctions()</span></span>
<span class="line"><span>        local funcs = {</span></span>
<span class="line"><span>            MODIFIER_EVENT_ON_ABILITY_EXECUTED</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        return funcs</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    function modifier_charges:OnAbilityExecuted(params)</span></span>
<span class="line"><span>        if params.unit == self:GetParent() then</span></span>
<span class="line"><span>            local ability = params.ability</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            if params.ability == self:GetAbility() then</span></span>
<span class="line"><span>                self:DecrementStackCount()</span></span>
<span class="line"><span>                self:Update()</span></span>
<span class="line"><span>            end</span></span>
<span class="line"><span>        end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        return 0</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    function modifier_charges:OnIntervalThink()</span></span>
<span class="line"><span>        local stacks = self:GetStackCount()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if stacks &lt; self.kv.max_count then</span></span>
<span class="line"><span>            self:SetDuration(self.kv.replenish_time, true)</span></span>
<span class="line"><span>            self:IncrementStackCount()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            if stacks == self.kv.max_count - 1 then</span></span>
<span class="line"><span>                self:SetDuration(-1, true)</span></span>
<span class="line"><span>                self:StartIntervalThink(-1)</span></span>
<span class="line"><span>            end</span></span>
<span class="line"><span>        end</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function modifier_charges:DestroyOnExpire()</span></span>
<span class="line"><span>    return false</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function modifier_charges:IsPurgable()</span></span>
<span class="line"><span>    return false</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function modifier_charges:RemoveOnDeath()</span></span>
<span class="line"><span>    return false</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br></div></div><p>Затем добавьте строку инициализации в <code>addon_game_mode.lua</code>:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>LinkLuaModifier(&quot;modifier_charges&quot;, LUA_MODIFIER_MOTION_NONE)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Если ваш файл находится в подпапке, вы можете сделать это следующим образом</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>LinkLuaModifier(&quot;modifier_charges&quot;, &quot;subfolder/anothersubfolder/modifier_charges&quot;, LUA_MODIFIER_MOTION_NONE)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Грац, вы успешно установили!</p><p>Теперь вы можете добавить заряды к любой способности с помощью этого кода:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>unit:AddNewModifier(unit, unit:FindAbilityByName(&quot;ability_name&quot;), &quot;modifier_charges&quot;, {</span></span>
<span class="line"><span>    max_count = 2,</span></span>
<span class="line"><span>    start_count = 1,</span></span>
<span class="line"><span>    replenish_time = 6</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>Настройки, в конце концов, говорят сами за себя. Если хотите, вы можете опустить start_count.</p><p>Вот и все.</p>`,13)])])}const d=s(l,[["render",i]]);export{o as __pageData,d as default};
