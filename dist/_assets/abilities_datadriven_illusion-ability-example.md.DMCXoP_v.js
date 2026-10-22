import{_ as s,o as a,c as e,ag as l}from"./chunks/framework.DUTPmUpA.js";const m=JSON.parse('{"title":"Пример способности иллюзии","description":"","frontmatter":{"title":"Пример способности иллюзии","author":"Noya","steamId":"76561198046984233","date":"11.01.2015"},"headers":[],"relativePath":"abilities/datadriven/illusion-ability-example.md","filePath":"abilities/datadriven/illusion-ability-example.md"}'),p={name:"abilities/datadriven/illusion-ability-example.md"};function i(t,n,r,c,o,b){return a(),e("div",null,[...n[0]||(n[0]=[l(`<p>Пример способности иллюзии</p><p>Это Lua-скрипт для правильного создания иллюзий.</p><p>Примечание. Модификаторы Datadriven с «AllowIllusionDuulate» не создаются автоматически с помощью этого метода, и их необходимо добавлять вручную в lua. В этом же скрипте мы также пытаемся добавить управляемую данными версию <code>modifier_metamorphosis</code>, которую также можно найти <a href="https://github.com/Pizzalol/SpellLibrary/blob/SpellLibrary/game/dota_addons/spelllibrary/scripts/npc/abilities/terrorblade_metamorphosis_datadriven.txt" target="_blank" rel="noreferrer">here in the SpellLibrary</a>.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>-- Creates an Illusion, making use of the built in modifier_illusion</span></span>
<span class="line"><span>function ConjureImage( event )</span></span>
<span class="line"><span> print(&quot;Conjure Image&quot;)</span></span>
<span class="line"><span> local caster = event.caster</span></span>
<span class="line"><span> local player = caster:GetPlayerID()</span></span>
<span class="line"><span> local ability = event.ability</span></span>
<span class="line"><span> local unit_name = caster:GetUnitName()</span></span>
<span class="line"><span> local origin = caster:GetAbsOrigin() + RandomVector(100)</span></span>
<span class="line"><span> local duration = ability:GetLevelSpecialValueFor( &quot;illusion_duration&quot;, ability:GetLevel() - 1 )</span></span>
<span class="line"><span> local outgoingDamage = ability:GetLevelSpecialValueFor( &quot;illusion_outgoing_damage&quot;, ability:GetLevel()-1)</span></span>
<span class="line"><span> local incomingDamage = ability:GetLevelSpecialValueFor( &quot;illusion_incoming_damage&quot;, ability:GetLevel()-1)</span></span>
<span class="line"><span></span></span>
<span class="line"><span> -- handle_UnitOwner needs to be nil, else it will crash the game.</span></span>
<span class="line"><span> local illusion = CreateUnitByName(unit_name, origin, true, caster, nil, caster:GetTeamNumber())</span></span>
<span class="line"><span> illusion:SetPlayerID(caster:GetPlayerID())</span></span>
<span class="line"><span> illusion:SetControllableByPlayer(player, true)</span></span>
<span class="line"><span></span></span>
<span class="line"><span> -- Level Up the unit to the casters level</span></span>
<span class="line"><span> local casterLevel = caster:GetLevel()</span></span>
<span class="line"><span> for i=1,casterLevel-1 do</span></span>
<span class="line"><span>  illusion:HeroLevelUp(false)</span></span>
<span class="line"><span> end</span></span>
<span class="line"><span></span></span>
<span class="line"><span> -- Set the skill points to 0 and learn the skills of the caster</span></span>
<span class="line"><span> illusion:SetAbilityPoints(0)</span></span>
<span class="line"><span> for abilitySlot=0,15 do</span></span>
<span class="line"><span>  local ability = caster:GetAbilityByIndex(abilitySlot)</span></span>
<span class="line"><span>  if ability ~= nil then</span></span>
<span class="line"><span>   local abilityLevel = ability:GetLevel()</span></span>
<span class="line"><span>   local abilityName = ability:GetAbilityName()</span></span>
<span class="line"><span>   local illusionAbility = illusion:FindAbilityByName(abilityName)</span></span>
<span class="line"><span>   illusionAbility:SetLevel(abilityLevel)</span></span>
<span class="line"><span>  end</span></span>
<span class="line"><span> end</span></span>
<span class="line"><span></span></span>
<span class="line"><span> -- Recreate the items of the caster</span></span>
<span class="line"><span> for itemSlot=0,5 do</span></span>
<span class="line"><span>  local item = caster:GetItemInSlot(itemSlot)</span></span>
<span class="line"><span>  if item ~= nil then</span></span>
<span class="line"><span>   local itemName = item:GetName()</span></span>
<span class="line"><span>   local newItem = CreateItem(itemName, illusion, illusion)</span></span>
<span class="line"><span>   illusion:AddItem(newItem)</span></span>
<span class="line"><span>  end</span></span>
<span class="line"><span> end</span></span>
<span class="line"><span></span></span>
<span class="line"><span> -- Add our datadriven Metamorphosis modifier if appropriate</span></span>
<span class="line"><span> -- You can add other buffs that want to be passed to illusions this way</span></span>
<span class="line"><span> if caster:HasModifier(&quot;modifier_metamorphosis&quot;) then</span></span>
<span class="line"><span>  local meta_ability = caster:FindAbilityByName(&quot;terrorblade_metamorphosis_datadriven&quot;)</span></span>
<span class="line"><span>  meta_ability:ApplyDataDrivenModifier(illusion, illusion, &quot;modifier_metamorphosis&quot;, nil)</span></span>
<span class="line"><span> end</span></span>
<span class="line"><span></span></span>
<span class="line"><span> -- Set the unit as an illusion</span></span>
<span class="line"><span> -- modifier_illusion controls many illusion properties like +Green damage not adding to the unit damage, not being able to cast spells and the team-only blue particle</span></span>
<span class="line"><span> illusion:AddNewModifier(caster, ability, &quot;modifier_illusion&quot;, { duration = duration, outgoing_damage = outgoingDamage, incoming_damage = incomingDamage })</span></span>
<span class="line"><span></span></span>
<span class="line"><span> -- Without MakeIllusion the unit counts as a hero, e.g. if it dies to neutrals it says killed by neutrals, it respawns, etc.</span></span>
<span class="line"><span> illusion:MakeIllusion()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br></div></div><p>Полную возможность (с ее кодом, управляемым данными) можно найти в SpellLibrary на GitHub.</p>`,5)])])}const d=s(p,[["render",i]]);export{m as __pageData,d as default};
