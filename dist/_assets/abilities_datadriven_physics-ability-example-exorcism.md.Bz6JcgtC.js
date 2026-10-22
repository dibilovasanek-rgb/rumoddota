import{_ as l,C as i,o as r,c as t,j as n,a as p,E as e,ag as c}from"./chunks/framework.DUTPmUpA.js";const o="/_assets/UniformLikableDavidstiger.DmaVy1n2.mp4",b="/_assets/MeekPortlyCrocodileskink.Do7WYYy4.mp4",u="/_assets/TartSlowAfricangroundhornbill.Bnx5QjDs.mp4",V=JSON.parse('{"title":"Пример физических способностей — экзорцизм","description":"","frontmatter":{"title":"Пример физических способностей — экзорцизм","author":"Noya","steamId":"76561198046984233","date":"02.02.2015"},"headers":[],"relativePath":"abilities/datadriven/physics-ability-example-exorcism.md","filePath":"abilities/datadriven/physics-ability-example-exorcism.md"}'),m={name:"abilities/datadriven/physics-ability-example-exorcism.md"};function d(h,s,y,g,f,_){const a=i("StaticVideo");return r(),t("div",null,[s[0]||(s[0]=n("p",null,"р физических способностей — экзорцизм",-1)),s[1]||(s[1]=n("p",null,[p("Вот описание способности, которая порождает юнитов и перемещает их с вращением, используя "),n("a",{href:"https://github.com/bmddota/barebones/blob/source2/game/dota_addons/barebones/scripts/vscripts/physics.lua",target:"_blank",rel:"noreferrer"},"Physics library"),p(".")],-1)),s[2]||(s[2]=n("p",null,"Конечный результат, пока нет врагов, к которым можно было бы пойти, будет таким:",-1)),e(a,{path:o}),s[3]||(s[3]=n("p",null,"Я включаю логическое значение Debug, которое можно включить для отображения пути и получения различных состояний:",-1)),e(a,{path:b}),s[4]||(s[4]=c(`<p>Полные коды способности можно найти по следующим ссылкам <a href="https://github.com/Pizzalol/SpellLibrary" target="_blank" rel="noreferrer">SpellLibrary</a>:</p><ul><li><p><a href="https://github.com/Pizzalol/SpellLibrary/blob/SpellLibrary/game/dota_addons/spelllibrary/scripts/npc/abilities/death_prophet_exorcism_datadriven.txt" target="_blank" rel="noreferrer">death_prophet_exorcism_datadriven</a></p></li><li><p><a href="https://github.com/Pizzalol/SpellLibrary/blob/SpellLibrary/game/dota_addons/spelllibrary/scripts/vscripts/heroes/hero_death_prophet/exorcism.lua" target="_blank" rel="noreferrer">exorcism.lua</a></p></li></ul><p>Весь файл Lua содержит комментарии для каждого решения, чтобы помочь понять и адаптировать этот навык к различным типам поведения.</p><hr><p>Строки, связанные с физикой, я просто оставлю здесь, отдельное спасибо BMD за помощь на протяжении всего процесса переписывания этой способности. Первый шаг — сделать каждую порожденную единицу физической единицей и применить свойства. <br><a href="https://github.com/bmddota/barebones/blob/source2/PhysicsReadme.txt" target="_blank" rel="noreferrer">Physics Readme</a>, чтобы узнать, что они делают.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>-- Make the spirit a physics unit</span></span>
<span class="line"><span>Physics:Unit(unit)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- General properties</span></span>
<span class="line"><span>unit:PreventDI(true)</span></span>
<span class="line"><span>unit:SetAutoUnstuck(false)</span></span>
<span class="line"><span>unit:SetNavCollisionType(PHYSICS_NAV_NOTHING)</span></span>
<span class="line"><span>unit:FollowNavMesh(false)</span></span>
<span class="line"><span>unit:SetPhysicsVelocityMax(spirit_speed)</span></span>
<span class="line"><span>unit:SetPhysicsVelocity(spirit_speed * RandomVector(1))</span></span>
<span class="line"><span>unit:SetPhysicsFriction(0)</span></span>
<span class="line"><span>unit:Hibernate(false)</span></span>
<span class="line"><span>unit:SetGroundBehavior(PHYSICS_GROUND_LOCK)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>После этого мы хотим контролировать поведение юнитов в каждом кадре, используя функцию OnPhysicsFrame.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>-- This is set to repeat on each frame</span></span>
<span class="line"><span>unit:OnPhysicsFrame(function(unit)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- Move the unit orientation to adjust the particle</span></span>
<span class="line"><span>    Unit:SetForwardVector( ( unit:GetPhysicsVelocity() ):Normalized() )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- Movement and Collision detection are state independent</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- MOVEMENT</span></span>
<span class="line"><span>    -- Get the direction</span></span>
<span class="line"><span>    local diff = point - unit:GetAbsOrigin()</span></span>
<span class="line"><span>    diff.z = 0</span></span>
<span class="line"><span>    local direction = diff:Normalized()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- Calculate the angle difference</span></span>
<span class="line"><span>    local angle_difference = RotationDelta(VectorToAngles(unit:GetPhysicsVelocity():Normalized()), VectorToAngles(direction)).y</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- Set the new velocity</span></span>
<span class="line"><span>    if math.abs(angle_difference) &lt; 5 then</span></span>
<span class="line"><span>    -- CLAMP</span></span>
<span class="line"><span>	local newVel = unit:GetPhysicsVelocity():Length() * direction</span></span>
<span class="line"><span>	unit:SetPhysicsVelocity(newVel)</span></span>
<span class="line"><span>    elseif angle_difference &gt; 0 then</span></span>
<span class="line"><span>	local newVel = RotatePosition(Vector(0,0,0), QAngle(0,10,0), unit:GetPhysicsVelocity())</span></span>
<span class="line"><span>	unit:SetPhysicsVelocity(newVel)</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>	local newVel = RotatePosition(Vector(0,0,0), QAngle(0,-10,0), unit:GetPhysicsVelocity())</span></span>
<span class="line"><span>	unit:SetPhysicsVelocity(newVel)</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- COLLISION CHECK</span></span>
<span class="line"><span>    local distance = (point - current_position):Length()</span></span>
<span class="line"><span>    local collision = distance &lt; 50</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- STATE DEPENDENT LOGIC</span></span>
<span class="line"><span>    -- Damage, Healing and Targeting are state dependent.</span></span>
<span class="line"><span>    -- Check the full script on SpellLibrary</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br></div></div><p>Наконец, нужно остановить юниты, это очень просто:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>unit:SetPhysicsVelocity(Vector(0,0,0))</span></span>
<span class="line"><span>unit:OnPhysicsFrame(nil)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><hr><p>For a different logic, check <a href="https://github.com/MNoya/DotaCraft/blob/master/scripts/vscripts/heroes/crypt_lord/locust_swarm.lua" target="_blank" rel="noreferrer">Locust Swarm</a> from <strong><a href="https://github.com/MNoya/DotaCraft" target="_blank" rel="noreferrer">DotaCraft</a></strong> repository, it uses the same movement physics but has different acquire and return logic, to fit Warcraft 3 behavior.</p>`,12)),e(a,{path:u})])}const P=l(m,[["render",d]]);export{V as __pageData,P as default};
