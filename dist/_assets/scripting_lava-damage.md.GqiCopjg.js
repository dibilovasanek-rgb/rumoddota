import{_ as e,C as l,o as i,c as r,j as s,a,E as c,ag as t}from"./chunks/framework.DUTPmUpA.js";const b="/_assets/WaterloggedQuarrelsomeDutchshepherddog.CJJTKjgb.mp4",u="/_assets/5eZycip.sAJwUlGE.png",m="/_assets/nvr9nhv.DJ9QYwMF.png",I=JSON.parse('{"title":"Урон от лавы","description":"","frontmatter":{"title":"Урон от лавы","author":"DiNaSoR","steamId":"76561197974680917","date":"20.08.2015"},"headers":[],"relativePath":"scripting/lava-damage.md","filePath":"scripting/lava-damage.md"}'),o={name:"scripting/lava-damage.md"};function d(_,n,g,f,A,v){const p=l("StaticVideo");return i(),r("div",null,[n[0]||(n[0]=s("h1",{id:"урон-от-лавы",tabindex:"-1"},[a("Урон от лавы "),s("a",{class:"header-anchor",href:"#урон-от-лавы","aria-label":'Permalink to "Урон от лавы"'},"​")],-1)),n[1]||(n[1]=s("p",null,"Сегодня мы собираемся создать область лавы — когда герой наступает на лаву, он будет получать урон в секунду, пока не умрет.",-1)),n[2]||(n[2]=s("p",null,[s("strong",null,"Сначала вам нужно создать блок и назначить ему текстуру триггера")],-1)),n[3]||(n[3]=s("p",null,"Сначала нажмите Shift+B и перетащите нужную рамку для области лавы.",-1)),n[4]||(n[4]=s("p",null,[a("После того, как вы создали свой блок, нам нужно назначить ему триггерный материал."),s("br"),a(" Это можно сделать, зайдя в библиотеку материалов и назвав фильтрацию «триггер», затем перетащив этот материал на блок."),s("br"),a(" Он должен измениться на указанный (триггерный) материал.")],-1)),c(p,{path:b}),n[5]||(n[5]=t('<p>Затем преобразуйте сетку в объект, нажав Ctrl+T, или найдите <code>Outliner</code> =&gt; щелкните правой кнопкой мыши =&gt; выбранные сетки =&gt; привяжите к объекту. Затем дайте ему имя и назначьте этот скрипт Entity для lavatrigger.lua &lt;- вы можете назвать его как хотите.</p><p><img src="'+u+'" alt=""></p><p>Затем перейдите на вкладку «Выходы» вверху, нажмите на нее и добавьте следующее, как показано на рисунке.</p><p><img src="'+m+`" alt=""> Теперь перейдите в папку <code>vscripts</code>, создайте файл с именем <code>lavatrigger.lua</code> и поместите туда этот скрипт.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>LAVA_MODIFIER_NAME = &quot;lava_modifier&quot;</span></span>
<span class="line"><span>LAVA_DAMAGE_AMOUNT = 10</span></span>
<span class="line"><span></span></span>
<span class="line"><span>lava_modifier = lava_modifier or class({})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>local LAVA_DAMAGE_TICK_RATE = 0.5</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function lava_modifier:IsHidden()</span></span>
<span class="line"><span>    return true</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function lava_modifier:IsPurgable()</span></span>
<span class="line"><span>    return false</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function lava_modifier:IsDebuff()</span></span>
<span class="line"><span>    return false</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function lava_modifier:DeclareFunctions()</span></span>
<span class="line"><span>    local funcs = {}</span></span>
<span class="line"><span>    return funcs</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- Modifiers exist both on server and client, so take care what methods you use</span></span>
<span class="line"><span>function lava_modifier:OnCreated()</span></span>
<span class="line"><span>    if IsServer() then</span></span>
<span class="line"><span>        self:SetStackCount(0)</span></span>
<span class="line"><span>        self:StartIntervalThink(LAVA_DAMAGE_TICK_RATE)</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function lava_modifier:OnIntervalThink()</span></span>
<span class="line"><span>    if IsServer() then</span></span>
<span class="line"><span>        if self:GetStackCount() &gt; 0 then</span></span>
<span class="line"><span>            local ent = self:GetCaster()</span></span>
<span class="line"><span>            local damageTable = {</span></span>
<span class="line"><span>                victim = ent,</span></span>
<span class="line"><span>                attacker = ent,</span></span>
<span class="line"><span>                damage = LAVA_DAMAGE_AMOUNT,</span></span>
<span class="line"><span>                damage_type = DAMAGE_TYPE_PURE,</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            ApplyDamage(damageTable)</span></span>
<span class="line"><span>        end</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>LinkLuaModifier(LAVA_MODIFIER_NAME, &quot;lavatrigger&quot;, LUA_MODIFIER_MOTION_NONE)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function applyLava(trigger, delta)</span></span>
<span class="line"><span>    if not IsServer() then</span></span>
<span class="line"><span>        return</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    local ent = trigger.activator</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if not ent then</span></span>
<span class="line"><span>        return</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span>    if not ent:HasModifier(LAVA_MODIFIER_NAME) then</span></span>
<span class="line"><span>        ent:AddNewModifier(ent, nil, LAVA_MODIFIER_NAME, nil)</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span>    local originalStacks = ent:GetModifierStackCount(LAVA_MODIFIER_NAME, nil)</span></span>
<span class="line"><span>    local newStacks = originalStacks + delta</span></span>
<span class="line"><span>    ent:SetModifierStackCount(LAVA_MODIFIER_NAME, ent, newStacks)</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function lavaEnter(trigger)</span></span>
<span class="line"><span>    applyLava(trigger, 1)</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function lavaExit(trigger)</span></span>
<span class="line"><span>    applyLava(trigger, -1)</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br></div></div><p>Тебе пора закончить!</p>`,6))])}const M=e(o,[["render",d]]);export{I as __pageData,M as default};
