import{_ as e,C as p,o as l,c as i,j as s,E as r,ag as t}from"./chunks/framework.DUTPmUpA.js";const c="/_assets/OfficialAdorableJabiru.CY7IDo23.mp4",g=JSON.parse('{"title":"Ограничения и требования к предмету","description":"","frontmatter":{"title":"Ограничения и требования к предмету","author":"Noya","steamId":"76561198046984233","date":"13.12.2014"},"headers":[],"relativePath":"scripting/item-restrictions-requirements.md","filePath":"scripting/item-restrictions-requirements.md"}'),o={name:"scripting/item-restrictions-requirements.md"};function u(b,n,m,d,h,q){const a=p("StaticVideo");return l(),i("div",null,[n[0]||(n[0]=s("p",null,"Ограничения и требования к предмету",-1)),n[1]||(n[1]=s("p",null,"Это реализует следующую механику:",-1)),r(a,{path:c}),n[2]||(n[2]=t(`<h2 id="шаг-1-таблица-ключевых-значении" tabindex="-1">Шаг 1. Таблица ключевых значений <a class="header-anchor" href="#шаг-1-таблица-ключевых-значении" aria-label="Permalink to &quot;Шаг 1. Таблица ключевых значений&quot;">​</a></h2><p>Сначала создайте текстовый файл, чтобы записать свойства вашего элемента. Имя файла, расширение и путь могут быть любыми, если структура файла представляет собой правильную таблицу.</p><p>В этом примере мы будем использовать этот путь: <code>scripts/maps/item_info.kv</code>.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;Items&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    &quot;item_name_here&quot;</span><span> //change it to a custom items</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        &quot;levelRequired&quot;	&quot;10&quot;</span></span>
<span class="line"><span>        &quot;classRequired&quot;	&quot;Warrior&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &quot;item_other_name_here&quot;</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        &quot;levelRequired&quot;	&quot;25&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>Чтобы загрузить стол в игровой режим, вам необходимо использовать функцию Lua <code>LoadKeyValues( &quot;path/to/file&quot; )</code>. Это можно вызвать в GameMode:InitGameMode() внутри вашего основного дополнения Lua. GameMode = сам</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>self.ItemInfoKV = LoadKeyValues( &quot;scripts/maps/item_info.kv&quot; )</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Если ваша таблица неправильно сформирована (например, вы пропустили кавычку или скобку), это не удастся, и при запуске игры вы получите ошибку консоли Lua.</p><p>Обратите внимание, что я не добавил «classRequired» ко второму элементу. При попытке доступа значение <code>GameMode.ItemInfoKV[itemNane].classRequired</code> будет равно нулю, что означает отсутствие ограничений по классу (но все равно проверяет уровень)</p><p>Есть много способов установить класс, самый простой из них — индексация <code>.class</code> в дескрипторе героя при первом входе героя в игру (с использованием вызовов barebones.lua по умолчанию).</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function GameMode:OnHeroInGame(hero)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if heroName == &quot;npc_dota_hero_axe&quot; then</span></span>
<span class="line"><span>        hero.class = &quot;Warrior&quot;</span></span>
<span class="line"><span>        print(&quot;Axe is ready!&quot;)</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="шаг-2-событие-способности-onequip" tabindex="-1">Шаг 2. Событие способности OnEquip <a class="header-anchor" href="#шаг-2-событие-способности-onequip" aria-label="Permalink to &quot;Шаг 2. Событие способности OnEquip&quot;">​</a></h2><p>Добавьте это событие, управляемое данными, для каждого элемента, которому необходимо выполнить проверку на наличие ограничений. Он вызывает сценарий lua для выполнения логической проверки таблицы.</p><p>Это необходимо, поскольку прослушиватель изменений инвентаря не работает, а перехватчик событий Lua <code>OnItemPickedUp</code> не учитывает перетаскивание кем-то предмета в инвентарь другого игрока.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;OnEquip&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    &quot;RunScript&quot;</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        &quot;ScriptFile&quot;	&quot;items.lua&quot;</span></span>
<span class="line"><span>        &quot;Function&quot;	&quot;ItemCheck&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="шаг-3-lua-скрипт" tabindex="-1">Шаг 3. Lua-скрипт <a class="header-anchor" href="#шаг-3-lua-скрипт" aria-label="Permalink to &quot;Шаг 3. Lua-скрипт&quot;">​</a></h2><p>В этом примере я буду искать требования к уровню и классу.</p><p>Используйте <a href="https://github.com/zedor/CustomError" target="_blank" rel="noreferrer">CustomError Flash UI by zedor</a> для отображения красного сообщения об ошибке, если элемент не соответствует ни одному из критериев, найденных в таблице.</p><p>Есть несколько <code>DeepPrintTable</code> и <code>print</code>, чтобы проверить, что таблица просматривается так, как вы ожидаете.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function ItemCheck( event )</span></span>
<span class="line"><span>    local itemName = event.ability:GetAbilityName()</span></span>
<span class="line"><span>    local hero = EntIndexToHScript( event.caster_entindex )</span></span>
<span class="line"><span>    local itemTable = GameMode.ItemInfoKV[itemName]</span></span>
<span class="line"><span>    print(&quot;Checking Restrictions for &quot;..itemName)</span></span>
<span class="line"><span>    DeepPrintTable(itemTable)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- if there is no subtable for this item, end this script</span></span>
<span class="line"><span>    if itemTable == nil then</span></span>
<span class="line"><span>        return true</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- This timer is needed because OnEquip triggers before the item actually being in inventory</span></span>
<span class="line"><span>    Timers:CreateTimer(0.1,function()</span></span>
<span class="line"><span>        -- Go through every item slot</span></span>
<span class="line"><span>        for itemSlot = 0, 5, 1 do</span></span>
<span class="line"><span>            local Item = hero:GetItemInSlot( itemSlot )</span></span>
<span class="line"><span>            -- When we find the item we want to check</span></span>
<span class="line"><span>            if Item ~= nil and itemName == Item:GetName() then</span></span>
<span class="line"><span>                DeepPrintTable(Item)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                -- Check Level Restriction</span></span>
<span class="line"><span>                if itemTable.levelRequired then</span></span>
<span class="line"><span>                    print(&quot;Name&quot;,&quot;Level Req&quot;,&quot;Hero Level&quot;)</span></span>
<span class="line"><span>                    print(itemName,itemTable.levelRequired,hero:GetLevel())</span></span>
<span class="line"><span>                    -- If the hero doesn&#39;t meet the level required, show message and call DropItem</span></span>
<span class="line"><span>                    if itemTable.levelRequired &gt; hero:GetLevel() then</span></span>
<span class="line"><span>                        FireGameEvent( &#39;custom_error_show&#39;, { player_ID = pID, _error = &quot;You need level &quot;..itemTable.levelRequired..&quot; to use this.&quot; } )</span></span>
<span class="line"><span>                        DropItem(Item, hero)</span></span>
<span class="line"><span>                    end</span></span>
<span class="line"><span>                end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                -- Check Class Restriction</span></span>
<span class="line"><span>                if itemTable.classRequired then</span></span>
<span class="line"><span>                    print(&quot;Name&quot;,&quot;Class Req&quot;,&quot;Hero Class&quot;)</span></span>
<span class="line"><span>                    print(itemName,itemTable.classRequired,hero.class)</span></span>
<span class="line"><span>                    -- If the item is for an specific class, message and drop</span></span>
<span class="line"><span>                    if itemTable.classRequired ~= hero.class then</span></span>
<span class="line"><span>                        FireGameEvent( &#39;custom_error_show&#39;, { player_ID = pID, _error = &quot;Requires &quot;.. hero.class ..&quot; to use.&quot; } )</span></span>
<span class="line"><span>                        DropItem(Item, hero)</span></span>
<span class="line"><span>                    end</span></span>
<span class="line"><span>                end</span></span>
<span class="line"><span>            end</span></span>
<span class="line"><span>        end</span></span>
<span class="line"><span>    end)</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function DropItem( item, hero )</span></span>
<span class="line"><span>    -- Error Sound</span></span>
<span class="line"><span>    EmitSoundOnClient(&quot;General.CastFail_InvalidTarget_Hero&quot;, hero:GetPlayerOwner())</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- Create a new empty item</span></span>
<span class="line"><span>    local newItem = CreateItem( item:GetName(), nil, nil )</span></span>
<span class="line"><span>    newItem:SetPurchaseTime( 0 )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- This is needed if you are working with items with charges, uncomment it if so.</span></span>
<span class="line"><span>    -- newItem:SetCurrentCharges( goldToDrop )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- Make a new item and launch it near the hero</span></span>
<span class="line"><span>    local spawnPoint = Vector( 0, 0, 0 )</span></span>
<span class="line"><span>    spawnPoint = hero:GetAbsOrigin()</span></span>
<span class="line"><span>    local drop = CreateItemOnPositionSync( spawnPoint, newItem )</span></span>
<span class="line"><span>    newItem:LaunchLoot( false, 200, 0.75, spawnPoint + RandomVector( RandomFloat( 50, 150 ) ) )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    --finally, remove the item</span></span>
<span class="line"><span>    hero:RemoveItem(item)</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br></div></div>`,19))])}const f=e(o,[["render",u]]);export{g as __pageData,f as default};
