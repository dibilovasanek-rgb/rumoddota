import{_ as s,o as a,c as e,ag as p}from"./chunks/framework.DUTPmUpA.js";const m=JSON.parse('{"title":"Чарующие деревья","description":"","frontmatter":{"title":"Чарующие деревья","author":"DrTeaSpoon","steamId":"76561197975484185","date":"08.09.2016"},"headers":[],"relativePath":"abilities/lua-modifiers/4.md","filePath":"abilities/lua-modifiers/4.md"}'),l={name:"abilities/lua-modifiers/4.md"};function i(t,n,r,c,u,b){return a(),e("div",null,[...n[0]||(n[0]=[p(`<h1 id="чарующие-деревья" tabindex="-1">Чарующие деревья <a class="header-anchor" href="#чарующие-деревья" aria-label="Permalink to &quot;Чарующие деревья&quot;">​</a></h1><p>Без дальнейших проволочек, давайте приступим! <code>npc_abilities_custom.txt</code> запись о наших возможностях.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;enchant_tree_lua&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    // These are required for this to work</span></span>
<span class="line"><span>    &quot;BaseClass&quot;             &quot;ability_lua&quot;</span></span>
<span class="line"><span>    &quot;ScriptFile&quot;                    &quot;lua_abilities/enchant_tree/ability.lua&quot;</span><span> //set your script file path in &#39;vscripts&#39; folder</span></span>
<span class="line"><span>    &quot;AbilityBehavior&quot;               &quot;DOTA_ABILITY_BEHAVIOR_UNIT_TARGET&quot;</span></span>
<span class="line"><span>    &quot;AbilityUnitTargetTeam&quot;         &quot;DOTA_UNIT_TARGET_TEAM_CUSTOM&quot;</span></span>
<span class="line"><span>    &quot;AbilityUnitTargetType&quot;         &quot;DOTA_UNIT_TARGET_TREE&quot;</span></span>
<span class="line"><span>    &quot;AbilityDuration&quot;               &quot;10.0&quot;</span><span> //well, technically optional.</span></span>
<span class="line"><span>    // Optional stuff</span></span>
<span class="line"><span>    &quot;AbilityTextureName&quot;            &quot;enchant_tree_lua&quot;</span></span>
<span class="line"><span>    &quot;AbilityCastPoint&quot;              &quot;0.1&quot;</span></span>
<span class="line"><span>    &quot;AbilityCooldown&quot;               &quot;5.0&quot;</span></span>
<span class="line"><span>    &quot;AbilityManaCost&quot;               &quot;100&quot;</span></span>
<span class="line"><span>    &quot;AbilityCastRange&quot;              &quot;400&quot;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>Это ваш базовый старт для навыков Lua.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>if enchant_tree_lua == nil then</span></span>
<span class="line"><span>    enchant_tree_lua = class({})</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span>LinkLuaModifier( &quot;enchant_tree_lua_mod&quot;, &quot;lua_abilities/enchant_tree/modifier.lua&quot;, LUA_MODIFIER_MOTION_NONE )</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Здесь происходит волшебство. <code>CreateModifierThinker</code> создает своего рода невидимый юнит с прикрепленным к нему модификатором.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function enchant_tree_lua:OnSpellStart()</span></span>
<span class="line"><span>    CreateModifierThinker( self:GetCaster(), self, &quot;enchant_tree_lua_mod&quot;, { duration = self:GetDuration() }, self:GetCursorPosition(), self:GetCaster():GetTeamNumber(), true )</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Теперь для следующего волшебства нам нужно настроить наш крутой модификатор. В этом примере путь к файлу будет <code>vscripts/lua_abilities/enchant_tree/modifier.lua</code>. Каждое «зачарование дерева» состоит из двух основных частей. Сначала нужно убедиться, что рядом есть дерево. Из-за ограничений движка с деревьями сложно взаимодействовать. В нашем решении мы просто каждые полсекунды запрашиваем у Gridnav, есть ли деревья на очень маленькой территории в месте расположения нашего мыслительного модуля. Последняя часть — это незначительная оптимизация, которая может стать лишней, но на момент ее разработки этого не было. Была проблема, из-за которой мыслитель оставался на карте некоторое время после уничтожения модификатора.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>if enchant_tree_lua_mod == nil then</span></span>
<span class="line"><span>    enchant_tree_lua_mod = class({})</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span>function enchant_tree_lua_mod:OnCreated( kv )</span></span>
<span class="line"><span>    if IsServer() then</span></span>
<span class="line"><span>        self:StartIntervalThink(0.5)</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span>function enchant_tree_lua_mod:OnIntervalThink()</span></span>
<span class="line"><span>    if IsServer() then</span></span>
<span class="line"><span>        if not GridNav:IsNearbyTree(self:GetParent():GetAbsOrigin(), 10, false) then</span></span>
<span class="line"><span>            self:Destroy()</span></span>
<span class="line"><span>        end</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span>function enchant_tree_lua_mod:OnDestroy()</span></span>
<span class="line"><span>    if IsServer() then</span></span>
<span class="line"><span>        UTIL_Remove( self:GetParent() )</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>Теперь самое интересное. Что мы хотим сделать с этим модификатором. Я решил использовать дерево сбора душ: если вражеский герой убит в радиусе (вам нужно добавить это к специальным значениям вашего <code>npc_abilities_custom.txt</code>), владелец заклинания крадет до 2 основных характеристик жертвы.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function enchant_tree_lua_mod:DeclareFunctions()</span></span>
<span class="line"><span>    local funcs = {</span></span>
<span class="line"><span>        MODIFIER_EVENT_ON_HERO_KILLED</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return funcs</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function enchant_tree_lua_mod:OnHeroKilled(kv)</span></span>
<span class="line"><span>    if IsServer() then</span></span>
<span class="line"><span>        if kv.unit and kv.unit:GetTeam() ~= self:GetCaster():GetTeam() then</span></span>
<span class="line"><span>            if (self:GetParent():GetAbsOrigin() - kv.unit:GetAbsOrigin()):Length2D() &lt;= self:GetAbility():GetSpecialValueFor(&quot;radius&quot;) then</span></span>
<span class="line"><span>                self:CollectSoul(kv.unit)</span></span>
<span class="line"><span>            end</span></span>
<span class="line"><span>        end</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function enchant_tree_lua_mod:CollectSoul(hTarget)</span></span>
<span class="line"><span>  local primary = hTarget:GetPrimaryAttribute()</span></span>
<span class="line"><span>  local val = hTarget:GetPrimaryStatValue()</span></span>
<span class="line"><span>  local n = math.max (0, math.min(2,val))</span></span>
<span class="line"><span>  if primary == 0 then</span></span>
<span class="line"><span>    self:GetCaster():ModifyStrength(n)</span></span>
<span class="line"><span>    hTarget:ModifyStrength(n*-1)</span></span>
<span class="line"><span>  elseif primary == 1 then</span></span>
<span class="line"><span>    self:GetCaster():ModifyAgility(n)</span></span>
<span class="line"><span>    hTarget:ModifyAgility(n*-1)</span></span>
<span class="line"><span>  else</span></span>
<span class="line"><span>    self:GetCaster():ModifyIntellect(n)</span></span>
<span class="line"><span>    hTarget:ModifyIntellect(n*-1)</span></span>
<span class="line"><span>  end</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><p>Для тех причудливых эффектов, которые дает железное дерево, вы можете добавить эти строки</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function enchant_tree_lua_mod:GetEffectName()</span></span>
<span class="line"><span> return &quot;particles/items_fx/ironwood_tree.vpcf&quot;</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function enchant_tree_lua_mod:GetEffectAttachType()</span></span>
<span class="line"><span> return PATTACH_OVERHEAD_FOLLOW</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div>`,13)])])}const d=s(l,[["render",i]]);export{m as __pageData,d as default};
