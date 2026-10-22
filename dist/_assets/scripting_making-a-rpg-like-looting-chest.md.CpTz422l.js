import{_ as s,o as a,c as e,ag as p}from"./chunks/framework.DUTPmUpA.js";const m=JSON.parse('{"title":"Создание сундука с добычей в стиле РПГ.","description":"","frontmatter":{"title":"Создание сундука с добычей в стиле РПГ.","author":"FrenchDeath","steamId":"76561198002718302","date":"18.12.2015"},"headers":[],"relativePath":"scripting/making-a-rpg-like-looting-chest.md","filePath":"scripting/making-a-rpg-like-looting-chest.md"}'),t={name:"scripting/making-a-rpg-like-looting-chest.md"};function l(i,n,r,c,o,u){return a(),e("div",null,[...n[0]||(n[0]=[p(`<p>дание сундука с добычей в стиле РПГ.</p><p>Прежде всего вам нужно создать сундук в <code>npc_items_custom.txt</code>:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;item_chest&quot;</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		// General</span></span>
<span class="line"><span>		//-------------------------------------------------------------------------------------------------------------</span></span>
<span class="line"><span>		&quot;ID&quot;							&quot;1282&quot;</span><span>														// Here put a unused ID.</span></span>
<span class="line"><span>		&quot;AbilityBehavior&quot;				&quot;DOTA_ABILITY_BEHAVIOR_CHANNELLED|DOTA_ABILITY_BEHAVIOR_NO_TARGET&quot;</span><span> // here we define it as a channeled item</span></span>
<span class="line"><span>		&quot;BaseClass&quot;						&quot;item_datadriven&quot;</span></span>
<span class="line"><span>		&quot;AbilityTextureName&quot;			&quot;item_present&quot;</span><span> //Here goes the texture name of the item</span></span>
<span class="line"><span>		&quot;ItemShareability&quot;				&quot;ITEM_FULLY_SHAREABLE&quot;</span><span> // make everyone able to use it</span></span>
<span class="line"><span>		&quot;Model&quot;							&quot;models/props_winter/present.vmdl&quot;</span></span>
<span class="line"><span>		&quot;ItemKillable&quot;					&quot;0&quot;</span><span> // the chest can&#39;t be destroyed when on ground</span></span>
<span class="line"><span>		&quot;ItemSellable&quot;					&quot;0&quot;</span><span> // can&#39;t be sold at a shop</span></span>
<span class="line"><span>		&quot;ItemPurchasable&quot;				&quot;0&quot;</span><span> //can&#39;t be purchased</span></span>
<span class="line"><span>		&quot;ItemDroppable&quot;					&quot;1&quot;</span><span> // can be put on the ground (set it to 0 if you don&#39;t want allow the player to</span></span>
<span class="line"><span>		&quot;ItemCost&quot;						&quot;99999&quot;</span></span>
<span class="line"><span>		&quot;ItemQuality&quot;					&quot;artifact&quot;</span></span>
<span class="line"><span>		&quot;ItemDeclarations&quot;				&quot;DECLARE_PURCHASES_TO_TEAMMATES | DECLARE_PURCHASES_IN_SPEECH | DECLARE_PURCHASES_TO_SPECTATORS&quot;</span></span>
<span class="line"><span>		&quot;AbilityCooldown&quot;				&quot;1.0&quot;</span><span> //time before the player can open another chest</span></span>
<span class="line"><span>		&quot;AbilityChannelTime&quot;			&quot;1.0&quot;</span><span> //time the player must channel to open the chest</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>		&quot;OnChannelSucceeded&quot;</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			&quot;RunScript&quot;</span></span>
<span class="line"><span>		    {</span></span>
<span class="line"><span>		        &quot;ScriptFile&quot;			&quot;lua_datadriven/chest.lua&quot;</span><span> //create a folder named lua_item in &quot;your_game_mode\\scripts\\vscripts&quot; and create a text file called chest.lua</span></span>
<span class="line"><span>				&quot;Function&quot;				&quot;chest_open&quot;</span><span> // here we call the function</span></span>
<span class="line"><span>				&quot;chest_name&quot;				&quot;chest_1&quot;</span><span> // here you can give a name to this chest in case you want more than 1 chest type</span></span>
<span class="line"><span>				&quot;gold&quot;				&quot;1&quot;</span><span> // does this chest give gold or only item ? (0 = no gold , 1 = gold instead of item , 2 = gold + item)</span></span>
<span class="line"><span>				&quot;gold_amt&quot;				&quot;1500&quot;</span><span> // how many gold the chest give if it give out</span></span>
<span class="line"><span>				&quot;gold_rand&quot;				&quot;250&quot;</span><span> // if you want gold to be random</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		    }</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>\`\`\`тогда ваш скрипт в \`lua_datadriven/chest.lua\`\`\`</span></span>
<span class="line"><span>\`lua</span></span>
<span class="line"><span>function chest_open(keys)</span></span>
<span class="line"><span>	local item_list = LoadKeyValues(&quot;scripts/kv/chest_result.kv&quot;) --Here we load a kv file where we will put all the item you can find in chest</span></span>
<span class="line"><span>	local caster = keys.caster</span></span>
<span class="line"><span>	local Player_ID = caster:GetPlayerOwnerID()</span></span>
<span class="line"><span>	local item = keys.ability</span></span>
<span class="line"><span>	local gold = 0</span></span>
<span class="line"><span>	if keys.gold &gt;0 then</span></span>
<span class="line"><span>		gold = keys.gold_amt + math.random(-(keys.gold_rand),(keys.gold_rand))</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>	caster:RemoveItem(item)--Here we remove the chest</span></span>
<span class="line"><span>	local chest_name = keys.chest_name</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	item_list = item_list[chest_name] -- here we load the item list specific to this chest</span></span>
<span class="line"><span>	--DeepPrintTable (item_list) --undo the commentary to check if your item_list is right</span></span>
<span class="line"><span>	local len = 0</span></span>
<span class="line"><span>	for k,v in pairs( item_list ) do</span></span>
<span class="line"><span>		len = len + 1</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>	local item_number = 0</span></span>
<span class="line"><span>	if keys.gold == 1 then</span></span>
<span class="line"><span>		item_number = math.random(1,(len + 1)) -- here we determine the item number (so here we chose the item), the +1 is to add the gold chance in, you can change it to 2 or more if you want gold to have higher chance of appearing</span></span>
<span class="line"><span>	else</span></span>
<span class="line"><span>		item_number = math.random(1,len)</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>	if item_number &gt; len then --in case the player obtains gold instead of item</span></span>
<span class="line"><span>	       PlayerResource:ModifyGold(Player_ID, gold, true, 0 )</span></span>
<span class="line"><span>	else</span></span>
<span class="line"><span>		local item_name = item_list[tostring(item_number)] -- i know it could be better, but i&#39;m not really used to kv</span></span>
<span class="line"><span>		local item_reward = CreateItem( item_name, caster, caster )</span></span>
<span class="line"><span>		caster:AddItem(item_reward)</span></span>
<span class="line"><span>		if keys.gold == 2 then</span></span>
<span class="line"><span>			PlayerResource:ModifyGold(Player_ID, gold, true, 0 )</span></span>
<span class="line"><span>		end</span></span>
<span class="line"><span>	end</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br></div></div><p>и, наконец, мы создаем файл kv, куда помещаем все предметы для каждого сундука. \`scripts/kv/chest_result.kv</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>\`</span></span>
<span class="line"><span>&quot;put_the_name_you_wanna&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    &quot;chest_1&quot;</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        &quot;1&quot; &quot;item_assault&quot;</span></span>
<span class="line"><span>        &quot;2&quot; &quot;item_desolator&quot;</span></span>
<span class="line"><span>        &quot;3&quot; &quot;item_sange_and_yasha&quot;</span></span>
<span class="line"><span>        &quot;4&quot; &quot;item_butterfly&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    &quot;chest_2&quot;</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        &quot;1&quot; &quot;item_youritem&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>Теперь вы легко можете сделать сундук для своей ролевой игры 😄 Если вы хотите получить добычу из сундука после смерти врага, посмотрите другой урок от Noya о <a href="/scripting/item-drop-system">item drop system</a>.</p>`,6)])])}const d=s(t,[["render",l]]);export{m as __pageData,d as default};
