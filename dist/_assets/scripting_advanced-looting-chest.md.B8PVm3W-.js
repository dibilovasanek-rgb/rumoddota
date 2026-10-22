import{_ as n,o as a,c as p,ag as e}from"./chunks/framework.DUTPmUpA.js";const m=JSON.parse('{"title":"Продвинутый сундук с добычей из ролевой игры в машинописном тексте","description":"","frontmatter":{"title":"Продвинутый сундук с добычей из ролевой игры в машинописном тексте","author":"schloerk","steamId":76561198385531120,"date":"10.07.2021"},"headers":[],"relativePath":"scripting/advanced-looting-chest.md","filePath":"scripting/advanced-looting-chest.md"}'),l={name:"scripting/advanced-looting-chest.md"};function i(r,s,t,c,b,u){return a(),p("div",null,[...s[0]||(s[0]=[e(`<h2 id="ting" tabindex="-1">ting <a class="header-anchor" href="#ting" aria-label="Permalink to &quot;ting&quot;">​</a></h2><h1 id="продвинутыи-сундук-с-добычеи-из-ролевои-игры-в-машинописном-тексте" tabindex="-1">Продвинутый сундук с добычей из ролевой игры в машинописном тексте <a class="header-anchor" href="#продвинутыи-сундук-с-добычеи-из-ролевои-игры-в-машинописном-тексте" aria-label="Permalink to &quot;Продвинутый сундук с добычей из ролевой игры в машинописном тексте&quot;">​</a></h1><p>В этом руководстве вы научитесь создавать сундук направления, из которого выпадает добыча. Сложнее всего масштабировать этот предмет, поскольку «Масштабирование» не поддерживается, и сохранять этот предмет во время поддержания. Также вы хотите заменить его открытой моделью сундука после его успешного открытия. Если ченнелинг не удался, вы также хотите сохранить сундук. Он также должен сохранять масштаб и вращение. Кроме того, сундук, который мы используем, имеет два разных набора материалов, и, конечно же, мы также хотим поддержать «Кожу».</p><p>Итак, мы должны это реализовать. Пойдем.</p><p>В нашем примере мы используем models/props_generic/chest_treasure_02.vmdl и models\\props_generic\\chest_treasure_02_open.vmdl, которые имеют золотистый и коричневый материал. 0 — коричневый, 1 — золотой.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;DOTAAbilities&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &quot;item_treasure_chest_2&quot;</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>	&quot;BaseClass&quot;                       &quot;item_lua&quot;</span></span>
<span class="line"><span>	&quot;Model&quot;                           &quot;models/props_generic/chest_treasure_02.vmdl&quot;</span></span>
<span class="line"><span>        &quot;ScriptFile&quot;                      &quot;item_treasure_chest_2.lua&quot;</span></span>
<span class="line"><span>        &quot;AbilityBehavior&quot;                 &quot;DOTA_ABILITY_BEHAVIOR_CHANNELLED&quot;</span></span>
<span class="line"><span>	&quot;AbilityTextureName&quot;              &quot;item_desolator&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &quot;ItemShareability&quot;                 &quot;ITEM_FULLY_SHAREABLE&quot;</span></span>
<span class="line"><span>        &quot;ItemKillable&quot;                     &quot;0&quot;</span></span>
<span class="line"><span>        &quot;ItemSellable&quot;                     &quot;0&quot;</span></span>
<span class="line"><span>        &quot;ItemPurchasable&quot;                  &quot;0&quot;</span></span>
<span class="line"><span>        &quot;ItemDroppable&quot;                    &quot;1&quot;</span></span>
<span class="line"><span>        &quot;ItemPermanent&quot;                    &quot;0&quot;</span></span>
<span class="line"><span>        &quot;ItemCost&quot;                         &quot;99999&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &quot;AbilityCooldown&quot;                  &quot;0.0&quot;</span><span> // Ability cooldown must be 0</span></span>
<span class="line"><span>        &quot;AbilityChannelTime&quot;               &quot;2.5&quot;</span></span>
<span class="line"><span>        &quot;AbilityUnitTargetType&quot;           &quot;DOTA_UNIT_TARGET_HERO&quot;</span></span>
<span class="line"><span>        &quot;OnlyPlayerHeroPickup&quot;            &quot;1&quot;</span></span>
<span class="line"><span>        &quot;CreepHeroPickup&quot;                 &quot;1&quot;</span></span>
<span class="line"><span>        &quot;DisplayOverheadAlertOnReceived&quot;  &quot;0&quot;</span><span> // Show no item acquired overhead effect</span></span>
<span class="line"><span>        &quot;ItemCastOnPickup&quot;                &quot;1&quot;</span><span> // Start channeling on pickup</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Custom Values</span></span>
<span class="line"><span>        // -------------</span></span>
<span class="line"><span>        &quot;ReplaceOnOpen&quot;                   &quot;models\\props_generic\\chest_treasure_02_open.vmdl&quot;</span></span>
<span class="line"><span>        &quot;Skin&quot;                            &quot;1&quot;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><p>Вместо item_desolator вам следует использовать иконку получше 😃</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ts</span></span>
<span class="line"><span>// registerAbility() and BaseItem is provided by dota_ts_adapter and needs to be imported.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@registerAbility()</span></span>
<span class="line"><span>class item_treasure_chest_2 extends BaseItem {</span></span>
<span class="line"><span>  position!: Vector;</span></span>
<span class="line"><span>  angles!: Vector;</span></span>
<span class="line"><span>  kv!: Record&lt;string, string&gt;;</span></span>
<span class="line"><span>  channelingPlaceholder!: CBaseAnimating;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  Spawn() {</span></span>
<span class="line"><span>    if (IsServer()) {</span></span>
<span class="line"><span>      this.kv = this.GetAbilityKeyValues() as Record&lt;string, string&gt;;</span></span>
<span class="line"><span>      this.HandleSkinAndScale();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  private HandleSkinAndScale() {</span></span>
<span class="line"><span>    const kvSkin = this.GetSkin();</span></span>
<span class="line"><span>    const kvScale = this.GetScale();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (kvSkin == 0 &amp;&amp; kvScale == 1) {</span></span>
<span class="line"><span>      return;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // Container is not created by engine at Spawn() time</span></span>
<span class="line"><span>    Timers.CreateTimer(0.01, () =&gt; {</span></span>
<span class="line"><span>      const container = this.GetContainer();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      if (container) {</span></span>
<span class="line"><span>        container.SetSkin(kvSkin);</span></span>
<span class="line"><span>        container.SetModelScale(kvScale);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // Since we channel this ability on pickup it isnt the same as the item icon, so we need to set it here.</span></span>
<span class="line"><span>  // When using a custom icon, make sure to support both formats (spellicon/icon)</span></span>
<span class="line"><span>  GetAbilityTextureName() {</span></span>
<span class="line"><span>    return GetAbilityTextureNameForAbility(this.GetName());</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // OnSpellStart gets called twice for some reason, thats why we check if position and placeholder are set</span></span>
<span class="line"><span>  OnSpellStart() {</span></span>
<span class="line"><span>    if (IsClient()) {</span></span>
<span class="line"><span>      return;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (!this.position) {</span></span>
<span class="line"><span>      this.position = this.GetContainer()!.GetOrigin();</span></span>
<span class="line"><span>      this.angles = this.GetContainer()!.GetAnglesAsVector();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (!this.channelingPlaceholder) {</span></span>
<span class="line"><span>      this.channelingPlaceholder = this.SpawnReplacementChests(this.GetChestModel());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  OnChannelFinish(interrupted: boolean) {</span></span>
<span class="line"><span>    if (IsClient()) {</span></span>
<span class="line"><span>      return;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (interrupted) {</span></span>
<span class="line"><span>      this.RedropChest();</span></span>
<span class="line"><span>      this.DeleteChest();</span></span>
<span class="line"><span>      return;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    this.OnChestOpen();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  OnChestOpen() {</span></span>
<span class="line"><span>    print(&#39;Opened chest&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    this.CreateLoot();</span></span>
<span class="line"><span>    this.SpawnReplacementChests(this.GetChestOpenModel());</span></span>
<span class="line"><span>    this.DeleteChest();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // spawned chests do not have a collider</span></span>
<span class="line"><span>  private SpawnReplacementChests(model: string): CBaseAnimating {</span></span>
<span class="line"><span>    const item = SpawnEntityFromTableSynchronous(&#39;prop_dynamic&#39;, {</span></span>
<span class="line"><span>      model: model,</span></span>
<span class="line"><span>      scale: this.GetScale(),</span></span>
<span class="line"><span>      origin: this.position,</span></span>
<span class="line"><span>      angles: this.angles,</span></span>
<span class="line"><span>      skin: this.GetSkin(),</span></span>
<span class="line"><span>    }) as CBaseAnimating;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    item.ResetSequence(&#39;chest_treasure_idle&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return item as CBaseAnimating;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  private RedropChest() {</span></span>
<span class="line"><span>    const chestReplace = CreateItem(this.GetName(), undefined, undefined);</span></span>
<span class="line"><span>    const item = CreateItemOnPositionSync(this.position, chestReplace);</span></span>
<span class="line"><span>    item.SetAngles(this.angles.x, this.angles.y, this.angles.z);</span></span>
<span class="line"><span>    item.SetModelScale(this.GetScale());</span></span>
<span class="line"><span>    item.ResetSequence(&#39;chest_treasure_idle&#39;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  private DeletePlaceholder() {</span></span>
<span class="line"><span>    this.channelingPlaceholder.RemoveSelf();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  private DeleteChest() {</span></span>
<span class="line"><span>    // Removing an item also destroys the underlying entity, be careful</span></span>
<span class="line"><span>    this.GetCaster().RemoveItem(this);</span></span>
<span class="line"><span>    this.DeletePlaceholder();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  private CreateLoot() {</span></span>
<span class="line"><span>    const caster = this.GetCaster();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    const item = CreateItem(&#39;item_desolator&#39;, caster.GetPlayerOwner(), undefined);</span></span>
<span class="line"><span>    const worldItem = CreateItemOnPositionSync(this.position, item);</span></span>
<span class="line"><span>    item?.LaunchLoot(</span></span>
<span class="line"><span>      false,</span></span>
<span class="line"><span>      124,</span></span>
<span class="line"><span>      RandomFloat(0.5, 1.2),</span></span>
<span class="line"><span>      caster.GetOrigin().__add(RandomVector(RandomInt(50, 150))),</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  private GetChestOpenModel() {</span></span>
<span class="line"><span>    return this.kv[&#39;ReplaceOnOpen&#39;];</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  private GetChestModel() {</span></span>
<span class="line"><span>    return this.kv[&#39;Model&#39;];</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  private GetSkin() {</span></span>
<span class="line"><span>    return tonumber(this.kv[&#39;Skin&#39;]) || 0;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  protected GetScale() {</span></span>
<span class="line"><span>    return tonumber(this.kv[&#39;Scale&#39;]) || 1;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br></div></div><p>Наконец, вы захотите дать своему сундуку имя во всплывающей подсказке. Добавьте <code>&quot;DOTA_Tooltip_ability_item_treasure_chest_2&quot; &quot;Testchest&quot;</code> к вашему <code>addon_*.txt</code>.</p><p>У этого подхода есть некоторые недостатки. Вы не можете изменить диапазон получения и качество предмета.</p>`,10)])])}const d=n(l,[["render",i]]);export{m as __pageData,d as default};
