import{_ as n,o as a,c as e,ag as p}from"./chunks/framework.DUTPmUpA.js";const d=JSON.parse('{"title":"Расширение API героев/NPC с помощью модификаторов lua","description":"","frontmatter":{"title":"Расширение API героев/NPC с помощью модификаторов lua","author":"DrTeaSpoon","steamId":"76561197975484185","date":"21.08.2016"},"headers":[],"relativePath":"abilities/lua-modifiers/1.md","filePath":"abilities/lua-modifiers/1.md"}'),l={name:"abilities/lua-modifiers/1.md"};function i(r,s,t,c,o,b){return a(),e("div",null,[...s[0]||(s[0]=[p(`<p>е API героев/NPC с помощью модификаторов lua</p><p>Создавая новые крутые способности или игровую механику, вы часто сталкиваетесь с проблемами из-за отсутствия хорошего API. Хотя я признаю, что у Dota 2 огромный API, похоже, что он сосредоточен на нескольких очень странных вещах или механиках, которые не полностью доступны в игре по умолчанию. (Руны, Кража заклинаний, Иллюзии). Чтобы решить эти проблемы, вы можете расширить его. Вот один из способов сделать это. Если вы используете Barebones BMD, то у вас уже есть четко представленная функция <code>GameMode:OnHeroInGame(hero)</code> в вашем файле <code>internal/gamemode.lua</code>. В противном случае вам нужно будет прослушать появление NPC при инициализации игрового режима:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function Activate()</span></span>
<span class="line"><span>  LinkLuaModifier( &quot;heroes_base_mod&quot;, &quot;lua_modifiers/hero_base_mod.lua&quot;, LUA_MODIFIER_MOTION_NONE )</span></span>
<span class="line"><span>  ListenToGameEvent(&#39;npc_spawned&#39;, Dynamic_Wrap(CModDotaTutorialsGameMode, &#39;OnNPC_Spawn&#39;), CModDotaTutorialsGameMode)</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function CModDotaTutorialsGameMode:OnNPC_Spawn(keys)</span></span>
<span class="line"><span>  local npc = EntIndexToHScript(keys.entindex)</span></span>
<span class="line"><span>  if npc:IsRealHero() and npc.bInit == nil then</span></span>
<span class="line"><span>    npc.bInit = true</span></span>
<span class="line"><span>        OnHeroFirst_Spawn(npc)</span></span>
<span class="line"><span>  end</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function OnHeroFirst_Spawn(hero)</span></span>
<span class="line"><span>  hero:AddNewModifier( hero, nil, &quot;heroes_base_mod&quot;, {} )</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>ПРИМЕЧАНИЕ. Помните о названии функции вашего игрового режима. Я использовал <code>CModDotaTutorialsGameMode</code>. Наверное, тебе стоит взять что-нибудь еще. Теперь вернемся к теме. Как вы заметили, мы использовали <code>LinkLuaModifier</code>. Нам нужно создать файл, на который он указывает, в вашей папке <code>vscripts</code> <code>&quot;lua_modifiers/hero_base_mod.lua&quot;</code>. В этом примере мы отслеживаем последнее заклинание, которое использовал игрок. Потенциально это можно использовать в качестве строительных блоков для воссоздания кражи заклинаний Рубика. Если вы не знакомы с модификаторами Lua, вот единственная существенная часть вашего модификатора:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>if heroes_base_mod == nil then</span></span>
<span class="line"><span>    heroes_base_mod = class({})</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Далее мы хотим убедиться, что модификатор не отключен ни в какой момент:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function heroes_base_mod:GetAttributes()</span></span>
<span class="line"><span>    return MODIFIER_ATTRIBUTE_PERMANENT + MODIFIER_ATTRIBUTE_IGNORE_INVULNERABLE</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Вот суть цели нашей функции. Отслеживайте, когда этот герой произносит заклинание.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function heroes_base_mod:DeclareFunctions()</span></span>
<span class="line"><span>    local funcs = {</span></span>
<span class="line"><span>        MODIFIER_EVENT_ON_ABILITY_EXECUTED</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return funcs</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function heroes_base_mod:OnAbilityExecuted(params)</span></span>
<span class="line"><span>    if IsServer() then --Make sure we are doing this only server side.</span></span>
<span class="line"><span>        if params.unit == self:GetParent() then --we only want the spells cast by this unit.</span></span>
<span class="line"><span>            if not params.ability:IsItem() then --we don&#39;t want to track items.</span></span>
<span class="line"><span>                self.lastability = params.ability --record the ability handle.</span></span>
<span class="line"><span>            end</span></span>
<span class="line"><span>        end</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>Теперь мы переходим к волшебству:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function heroes_base_mod:OnCreated(kv)</span></span>
<span class="line"><span>    local hMod = self --we can only reference to &quot;self&quot; in our own function we pass this modifier to function we create for the unit.</span></span>
<span class="line"><span>    local hParent = self:GetParent() --the unit.</span></span>
<span class="line"><span>    if hParent.GetLastSpell == nil then --if for some odd reason there is already such function</span></span>
<span class="line"><span>        function hParent:GetLastSpell() ---we create new function for the unit.</span></span>
<span class="line"><span>            if hMod.lastability ~= nil then --if unit has cast any spells</span></span>
<span class="line"><span>                return hMod.lastability --return the last ability.</span></span>
<span class="line"><span>            else</span></span>
<span class="line"><span>                return nil --in case there is nothing to return. this is sort of redundant.</span></span>
<span class="line"><span>            end</span></span>
<span class="line"><span>        end</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>Потому что мы считаем, что у каждого героя, имеющего этот модификатор, бесполезно показывать его на экране.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function heroes_base_mod:IsHidden()</span></span>
<span class="line"><span>    return true</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Теперь, когда наш модификатор готов. Нам нужен какой-то способ проверить это. Я решил использовать простую консольную команду. Добавьте следующее в функцию инициализации игры.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>-- this is in function Activate()</span></span>
<span class="line"><span> Convars:RegisterCommand( &quot;mod_test_spells&quot;, Dynamic_Wrap(CModDotaTutorialsGameMode, &#39;PrintLastSpells&#39;), &quot;Print last spell for every hero&quot;, FCVAR_CHEAT )</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Теперь фактическая функция консольной команды:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function CModDotaTutorialsGameMode:PrintLastSpells()</span></span>
<span class="line"><span>  print( &#39;** Last Spell **&#39; )</span></span>
<span class="line"><span>    local tList = HeroList:GetAllHeroes()</span></span>
<span class="line"><span>    for k,v in pairs(tList) do</span></span>
<span class="line"><span>        local s = v:GetLastSpell()</span></span>
<span class="line"><span>        if s == nil then</span></span>
<span class="line"><span>            print( v:GetName() .. &#39; has cast no spells yet.&#39;)</span></span>
<span class="line"><span>        else</span></span>
<span class="line"><span>            print( v:GetName() .. &#39; last cast &#39; .. v:GetLastSpell():GetAbilityName())</span></span>
<span class="line"><span>        end</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span>  print( &#39;****************&#39; )</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>Теперь вы сможете использовать консольную команду <code>mod_test_spells</code>, чтобы распечатать последнее заклинание, использованное каждым героем. Следующая тема: <a href="./2">Linken Sphere &amp; Lotus Orb.</a></p>`,18)])])}const m=n(l,[["render",i]]);export{d as __pageData,m as default};
