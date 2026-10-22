import{_ as t,C as e,o as p,c as o,ag as n,E as u}from"./chunks/framework.DUTPmUpA.js";const l="/_assets/dyDFL-f0a814100d.BNeXYw97.jpg",i="/_assets/4Jr9cpF.D1VAFSmj.png",r="/_assets/RemarkableImportantAnt.CgVmBsr_.mp4",R=JSON.parse('{"title":"Ключевые значения элемента","description":"","frontmatter":{"title":"Ключевые значения элемента","author":"Noya","steamId":"76561198046984233","date":"01.12.2014"},"headers":[],"relativePath":"abilities/item-keyvalues.md","filePath":"abilities/item-keyvalues.md"}'),q={name:"abilities/item-keyvalues.md"};function c(b,s,m,_,d,E){const a=e("StaticVideo");return p(),o("div",null,[s[0]||(s[0]=n(`<p>значения элемента</p><p>Полное руководство по npc_items_custom и кодированию элементов.</p><h2 id="общие" tabindex="-1">Общие <a class="header-anchor" href="#общие" aria-label="Permalink to &quot;Общие&quot;">​</a></h2><p>Начните с <code>item_</code> и названия вашего предмета. Если вы <strong>не</strong> поместите <code>item_</code> в начало элемента, произойдут плохие вещи.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;item_custom&quot;</span></span>
<span class="line"><span>{ ... }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Для покупки в магазине каждому предмету нужен свой идентификатор, хотя вы можете определять предметы без идентификатора, если планируете создавать их только через Lua. Не переопределяйте идентификаторы Dota, используйте идентификаторы в диапазоне от 1000 до 2000.</p><p><code>&quot;ID&quot; &quot;1100&quot;</code></p><p>Далее идет базовый класс. Это может быть DataDriven или переопределение существующего элемента из <a href="https://github.com/dotabuff/d2vpk/blob/master/dota_pak01/scripts/npc/items.txt" target="_blank" rel="noreferrer">default dota item_names</a>.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;BaseClass&quot; &quot;item_datadriven&quot;</span></span>
<span class="line"><span>            &quot;item_aegis&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Если вы хотите переопределить элемент, вы не сможете изменять/добавлять способности, вы будете ограничены в изменении значений из файла items.txt (а некоторые значения даже невозможно изменить). Поэтому рекомендуется всегда пытаться создать версию элемента, управляемую данными, если вы хотите иметь полную свободу в том, что делает ваш элемент.</p><p>Теперь, когда мы с этим разобрались, я рассмотрю наиболее распространенные значения ключей, встречающиеся в элементах.</p><h3 id="основные-правила" tabindex="-1">Основные правила <a class="header-anchor" href="#основные-правила" aria-label="Permalink to &quot;Основные правила&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;ItemCost&quot; &quot;322&quot;</span></span>
<span class="line"><span>&quot;ItemKillable&quot; &quot;0&quot;</span></span>
<span class="line"><span>&quot;ItemSellable&quot; &quot;1&quot;</span></span>
<span class="line"><span>&quot;ItemPurchasable&quot; &quot;1&quot;</span></span>
<span class="line"><span>&quot;ItemDroppable&quot; &quot;1&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>ItemKillable позволяет как союзникам, так и врагам уничтожить выпавший предмет, атаковав его.</p><h3 id="запас" tabindex="-1">Запас <a class="header-anchor" href="#запас" aria-label="Permalink to &quot;Запас&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;ItemStockMax&quot; &quot;1&quot;</span></span>
<span class="line"><span>&quot;ItemStockTime&quot; &quot;100&quot;</span></span>
<span class="line"><span>&quot;ItemStockInitial&quot; &quot;3&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="право-собственности" tabindex="-1">Право собственности <a class="header-anchor" href="#право-собственности" aria-label="Permalink to &quot;Право собственности&quot;">​</a></h3><p>Если вы опустите следующее, его поведение будет NOT_SHAREABLE.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;ItemShareability&quot; &quot;ITEM_NOT_SHAREABLE&quot;</span><span>             //Rapier</span></span>
<span class="line"><span>                   &quot;ITEM_PARTIALLY_SHAREABLE&quot;</span><span>       //Ring of Regen</span></span>
<span class="line"><span>                   &quot;ITEM_FULLY_SHAREABLE&quot;</span><span>           //Gem</span></span>
<span class="line"><span>                   &quot;ITEM_FULLY_SHAREABLE_STACKING&quot;</span><span>  //Consumables</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="сборы" tabindex="-1">Сборы <a class="header-anchor" href="#сборы" aria-label="Permalink to &quot;Сборы&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;ItemInitialCharges&quot; &quot;1&quot;</span><span> //How many charges should the item start with - Tango x3</span></span>
<span class="line"><span>&quot;ItemDisplayCharges&quot; &quot;1&quot;</span><span> //Hide the charges of the item - Aegis</span></span>
<span class="line"><span>&quot;ItemRequiresCharges&quot; &quot;1&quot;</span><span> //The active ability needs charges to be used - Urn</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Также не забудьте добавить это где-нибудь, обычно в начале блока OnSpellStart.</p><p><code>&quot;SpendCharge&quot; {}</code></p><h3 id="штабелирование-расходныи-материал" tabindex="-1">Штабелирование, Расходный материал <a class="header-anchor" href="#штабелирование-расходныи-материал" aria-label="Permalink to &quot;Штабелирование, Расходный материал&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;ItemStackable&quot; &quot;1&quot;</span></span>
<span class="line"><span>&quot;ItemPermanent&quot; &quot;0&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Если для параметра «ItemPermanent» установлено значение 1, заряженные предметы не исчезнут, когда их заряд достигнет 0 (Бутылка, Урна и т. д.). Если его опустить, по умолчанию будет установлено значение 1.</p><h3 id="автотрансляция" tabindex="-1">Автотрансляция <a class="header-anchor" href="#автотрансляция" aria-label="Permalink to &quot;Автотрансляция&quot;">​</a></h3><p>Это значение является ключевым для томов статистики и других расходуемых предметов:</p><p><code>&quot;ItemCastOnPickup&quot; &quot;1&quot;</code></p><h3 id="обновляемые-предметы" tabindex="-1">Обновляемые предметы <a class="header-anchor" href="#обновляемые-предметы" aria-label="Permalink to &quot;Обновляемые предметы&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;MaxUpgradeLevel&quot; &quot;5&quot;</span><span> // Dagon - 5</span></span>
<span class="line"><span>&quot;ItemBaseLevel&quot; &quot;1&quot;</span><span> //You&#39;ll need 5 different items, and change each accordingly</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="рецепты" tabindex="-1">Рецепты <a class="header-anchor" href="#рецепты" aria-label="Permalink to &quot;Рецепты&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;item_recipe_custom&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    &quot;ID&quot; &quot;1200&quot;</span></span>
<span class="line"><span>    &quot;BaseClass&quot;           &quot;item_datadriven&quot;</span></span>
<span class="line"><span>    &quot;ItemRecipe&quot;          &quot;1&quot;</span><span> //destroyed after combine</span></span>
<span class="line"><span>    &quot;ItemCost&quot;            &quot;0&quot;</span><span> //if its 0, it will combine without needing a recipe.</span></span>
<span class="line"><span>    &quot;ItemResult&quot;          &quot;item_custom&quot;</span><span> //the result of combining the ItemRequirements</span></span>
<span class="line"><span>    &quot;ItemRequirements&quot;</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        &quot;01&quot; &quot;item_ingredient_1;item_ingredient_2;item_ingredient_3&quot;</span></span>
<span class="line"><span>        &quot;02&quot; &quot;item_ingredient_1;item_ingredient_2;item_ingredient_alternative_3&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p><strong>ВАЖНОЕ ПРИМЕЧАНИЕ:</strong> Ваше имя предмета для рецепта, которое будет распознаваться пользовательским интерфейсом Dota Shop, ДОЛЖНО иметь следующий формат:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;item_recipe_(name of your item)&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>Это означает, что если ItemResult, который вы хотите получить, называется <em>&quot;item_capuchino&quot;</em>, ваш рецепт будет таким: <em>&quot;item_recipe_capuchino&quot;</em></p><p><img src="`+l+`" alt="img"></p><p>Если вы этого не сделаете, предмет все равно можно будет комбинировать, но на нем не будут видны четкие линии возможных улучшений.</p><h3 id="разборка" tabindex="-1">Разборка <a class="header-anchor" href="#разборка" aria-label="Permalink to &quot;Разборка&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;ItemDisassembleRule&quot; &quot;DOTA_ITEM_DISASSEMBLE_ALWAYS&quot;</span></span>
<span class="line"><span>                      &quot;DOTA_ITEM_DISASSEMBLE_NEVER&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="общие-значения-ключеи-модификаторов-для-предметов" tabindex="-1">Общие значения ключей-модификаторов для предметов <a class="header-anchor" href="#общие-значения-ключеи-модификаторов-для-предметов" aria-label="Permalink to &quot;Общие значения ключей-модификаторов для предметов&quot;">​</a></h2><p>Теперь у нас есть элемент, но сам по себе он ничего не делает. Чтобы добавить характеристики или усиления, нам нужно установить модификаторы внутри определения предмета. Дополнительную информацию о модификаторах можно найти в разделе [Константы в вики].</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;Modifiers&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    &quot;item_custom_modifier&quot;</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        &quot;Passive&quot; &quot;1&quot;</span></span>
<span class="line"><span>        &quot;IsHidden&quot; &quot;0&quot;</span></span>
<span class="line"><span>        &quot;Attributes&quot; &quot;MODIFIER_ATTRIBUTE_MULTIPLE&quot;</span><span> //This makes duplicate items stack their properties</span></span>
<span class="line"><span>        &quot;Properties&quot;</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            &quot;MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT&quot; &quot;%movement_speed&quot;</span></span>
<span class="line"><span>            &quot;MODIFIER_PROPERTY_EVASION_CONSTANT&quot; &quot;%evasion&quot;</span></span>
<span class="line"><span>            &quot;MODIFIER_PROPERTY_STATS_STRENGTH_BONUS&quot; &quot;%bonus_str_agi&quot;</span></span>
<span class="line"><span>            &quot;MODIFIER_PROPERTY_STATS_AGILITY_BONUS&quot; &quot;%bonus_agi&quot;</span></span>
<span class="line"><span>            &quot;MODIFIER_PROPERTY_STATS_INTELLECT_BONUS&quot; &quot;%bonus_int&quot;</span></span>
<span class="line"><span>            &quot;MODIFIER_PROPERTY_BASEDAMAGEOUTGOING_PERCENTAGE&quot; &quot;%damage_bonus_percent&quot;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &quot;States&quot;</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            &quot;MODIFIER_STATE_SPECIALLY_DENIABLE&quot; &quot;MODIFIER_STATE_VALUE_ENABLED&quot;</span></span>
<span class="line"><span>            &quot;MODIFIER_STATE_MAGIC_IMMUNE&quot; &quot;MODIFIER_STATE_VALUE_ENABLED&quot;</span></span>
<span class="line"><span>            &quot;MODIFIER_STATE_NO_HEALTH_BAR&quot; &quot;MODIFIER_STATE_VALUE_ENABLED&quot;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h2 id="добавление-функциональности-заклинании" tabindex="-1">Добавление функциональности заклинаний <a class="header-anchor" href="#добавление-функциональности-заклинании" aria-label="Permalink to &quot;Добавление функциональности заклинаний&quot;">​</a></h2><p>Помимо этих значений, специально связанных с элементами, вы можете добавить <strong><em>everything</em></strong>, которое может быть частью способности, управляемой данными, например:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;AbilityBehavior&quot; &quot;DOTA_ABILITY_BEHAVIOR_PASSIVE&quot;</span></span>
<span class="line"><span>&quot;AbilityUnitTargetTeam&quot; &quot;DOTA_UNIT_TARGET_TEAM_BOTH&quot;</span></span>
<span class="line"><span>&quot;AbilityUnitTargetType&quot; &quot;DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC&quot;</span></span>
<span class="line"><span>&quot;AbilityCastAnimation&quot; &quot;ACT_DOTA_CAST_ABILITY_1&quot;</span></span>
<span class="line"><span>&quot;AbilityManaCost&quot; &quot;100&quot;</span></span>
<span class="line"><span>&quot;AbilityValues&quot;</span></span>
<span class="line"><span>{...}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><strong><a href="./datadriven/datadriven-ability-events-modifiers">Ability Events</a></strong>, например <code>&quot;OnSpellStart&quot;</code>, <code>&quot;OnOwnerDied&quot;</code> или <code>&quot;OnEquip&quot;</code>, также размещаются здесь, в главном блоке.</p><p>Вам необходимо, по крайней мере, установить для свойстваabilityBehavior неактивный элемент (если вы этого не сделаете, по умолчанию будет установлено значение <code>DOTA_ABILITY_BEHAVIOR_UNIT_TARGET</code>).</p><p>Узнайте больше о полной комплектации <a href="./ability-keyvalues">DataDriven Ability Breakdown</a>.</p><h2 id="иконки-и-пользовательские-магазины" tabindex="-1">Иконки и пользовательские магазины <a class="header-anchor" href="#иконки-и-пользовательские-магазины" aria-label="Permalink to &quot;Иконки и пользовательские магазины&quot;">​</a></h2><p>Чтобы у вашего предмета был значок, вам нужно перейти в папку аддонов по этому пути: <code>/resource/flash3/images/items</code></p><p>И поместите файл <code>.PNG</code> размером <strong>86 x 64</strong> с тем же именем, что и у <code>item_custom</code>, БЕЗ <code>item_</code>.</p><p><img src="`+i+`" alt="img"></p><p>Затем в код «item_custom» вы добавляете следующее:</p><p><code>&quot;AbilityTextureName&quot; &quot;item_custom&quot;</code></p><p>Вы также можете использовать названия значков Dota. Просто убедитесь, что эта строка начинается с <code>&quot;item_</code>, чтобы движок знал, что нужно искать изображение в папке элементов. Добавление товара в магазин. Макет [Здесь] Для этого в папке аддона вам нужно зайти в <code>scripts/shops</code> и создать/отредактировать файл <code>.txt</code> со следующей структурой имени:</p><p><code>mapName_shops.txt</code></p><p>имя_карты должно быть именем ВАШЕЙ КАРТЫ (файл <code>.vmap</code> в Hammer или папке содержимого), а НЕ именем вашего аддона (оба могут быть одинаковыми, или у вас может быть несколько карт с разными магазинами)</p><p>Добавление <code>_shops</code> к имени карты также является обязательным.</p><p>Файл шаблона магазина:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//&lt;map_name&gt;_shops.txt inside a scripts\\shops\\ folder</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&quot;dota_shops&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	&quot;consumables&quot;</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		&quot;item&quot; 		&quot;item_ingredient&quot;</span></span>
<span class="line"><span>		&quot;item&quot;		&quot;item_result&quot;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&quot;attributes&quot;</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&quot;weapons_armor&quot;</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&quot;misc&quot;</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// Level 1 - Green Recipes</span></span>
<span class="line"><span>	&quot;basics&quot;</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// Level 2 - Blue Recipes</span></span>
<span class="line"><span>	&quot;support&quot;</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&quot;magics&quot;</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// Level 3 - Purple Recipes</span></span>
<span class="line"><span>	&quot;defense&quot;</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&quot;weapons&quot;</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// Level 4 - Orange / Orb / Artifacts</span></span>
<span class="line"><span>	&quot;artifacts&quot;</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&quot;sideshop1&quot;</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&quot;sideshop2&quot;</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&quot;secretshop&quot;</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br></div></div><p>Помимо этого файла, ваш предмет может иметь правила ключевого значения, определяющие, где его можно купить.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;SideShop&quot; &quot;1&quot;</span></span>
<span class="line"><span>&quot;SecretShop&quot; &quot;0&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>На момент написания этого руководства мы можем открыть только 3 разных магазина (домашний, боковой и секретный). Вы можете изменить категории и названия вкладок магазина с помощью [addon_english modding]</p><p>Чтобы создать настоящую зону магазина внутри вашей карты в Hammer, ознакомьтесь с другим руководством <a href="https://www.reddit.com/r/Dota2Modding/comments/2dpts1/tutorial_creating_a_custom_shop_step_by_step/" target="_blank" rel="noreferrer">tutorial_creating_a_custom_shop_step_by_step</a>.</p><p>Чтобы отключить элементы Dota, используйте <code>npc_abilities_override.txt</code> внутри папки <code>scripts/npc</code>:</p><p>::: подробности npc_abilities_override.txt</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Dota Abilities Override File</span></span>
<span class="line"><span>&quot;DOTAAbilities&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ITEM SHOPS---------------------------------------------------</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&quot;item_blink&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_blades_of_attack&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_broadsword&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_chainmail&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_claymore&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_helm_of_iron_will&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_javelin&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_mithril_hammer&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_platemail&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_quarterstaff&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_quelling_blade&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_ring_of_protection&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_stout_shield&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_gauntlets&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_slippers&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_mantle&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_branches&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_belt_of_strength&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_boots_of_elves&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_robe&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_circlet&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_ogre_axe&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_blade_of_alacrity&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_staff_of_wizardry&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_ultimate_orb&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_gloves&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_lifesteal&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_ring_of_regen&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_sobi_mask&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_boots&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_gem&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_cloak&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_talisman_of_evasion&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_cheese&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_magic_stick&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_magic_wand&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_magic_wand&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_ghost&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_clarity&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_flask&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_dust&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_bottle&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_ward_observer&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_ward_sentry&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_tango&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_tango_single&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_courier&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_tpscroll&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_travel_boots&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_travel_boots&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_phase_boots&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_phase_boots&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_demon_edge&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_eagle&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_reaver&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_relic&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_hyperstone&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_ring_of_health&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_void_stone&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_mystic_staff&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_energy_booster&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_point_booster&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_vitality_booster&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_power_treads&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_power_treads&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_hand_of_midas&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_hand_of_midas&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_oblivion_staff&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_oblivion_staff&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_pers&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_pers&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_poor_mans_shield&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_poor_mans_shield&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_bracer&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_bracer&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_wraith_band&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_wraith_band&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_null_talisman&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_null_talisman&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_mekansm&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_mekansm&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_vladmir&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_vladmir&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_flying_courier&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_buckler&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_buckler&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_ring_of_basilius&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_ring_of_basilius&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_pipe&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_pipe&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_urn_of_shadows&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_urn_of_shadows&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_headdress&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_headdress&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_sheepstick&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_sheepstick&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_orchid&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_orchid&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_cyclone&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_cyclone&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_force_staff&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_force_staff&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_dagon&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_dagon_2&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_dagon_3&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_dagon_4&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_dagon_5&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_dagon&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_dagon_2&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_dagon_3&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_dagon_4&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_dagon_5&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_necronomicon&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_necronomicon_2&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_necronomicon_3&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_necronomicon&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_necronomicon_2&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_necronomicon_3&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_ultimate_scepter&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_ultimate_scepter&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_refresher&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_refresher&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_assault&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_assault&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_heart&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_heart&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_black_king_bar&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_black_king_bar&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_aegis&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_shivas_guard&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_shivas_guard&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_bloodstone&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_bloodstone&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_sphere&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_sphere&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_reflex_energy_regen_booster&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_vanguard&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_blade_mail&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_blade_mail&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_soul_booster&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_soul_booster&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_hood_of_defiance&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_hood_of_defiance&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_rapier&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_rapier&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_monkey_king_bar&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_monkey_king_bar&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_radiance&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_radiance&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_butterfly&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_butterfly&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_greater_crit&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_greater_crit&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_basher&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_basher&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_bfury&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_bfury&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_manta&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_manta&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_lesser_crit&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_lesser_crit&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_armlet&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_armlet&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_invis_sword&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_invis_sword&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_sange_and_yasha&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_sange_and_yasha&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_satanic&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_satanic&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_mjollnir&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_mjollnir&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_skadi&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_skadi&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_sange&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_sange&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_helm_of_the_dominator&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_helm_of_the_dominator&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_maelstrom&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_maelstrom&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_desolator&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_desolator&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_yasha&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_yasha&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_mask_of_madness&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_mask_of_madness&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_diffusal_blade&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_diffusal_blade_2&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_diffusal_blade&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_diffusal_blade_2&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_ethereal_blade&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_ethereal_blade&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_soul_ring&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_soul_ring&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_arcane_boots&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_arcane_boots&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_orb_of_venom&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_ancient_janggo&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_ancient_janggo&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_medallion_of_courage&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_medallion_of_courage&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_smoke_of_deceit&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_veil_of_discord&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_veil_of_discord&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_rod_of_atos&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_rod_of_atos&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_abyssal_blade&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_abyssal_blade&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_heavens_halberd&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_heavens_halberd&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_ring_of_aquila&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_ring_of_aquila&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_recipe_tranquil_boots&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_tranquil_boots&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_shadow_amulet&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_halloween_candy_corn&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_mystery_hook&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_mystery_arrow&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_mystery_missile&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_mystery_toss&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_mystery_vacuum&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_halloween_rapier&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_greevil_whistle&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_greevil_whistle_toggle&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_present&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_winter_stocking&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_winter_skates&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_winter_cake&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_winter_cookie&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_winter_coco&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_winter_ham&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_winter_kringle&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_winter_mushroom&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_winter_greevil_treat&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_winter_greevil_garbage&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>	&quot;item_winter_greevil_chewy&quot;			&quot;REMOVE&quot;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br><span class="line-number">174</span><br><span class="line-number">175</span><br><span class="line-number">176</span><br><span class="line-number">177</span><br><span class="line-number">178</span><br><span class="line-number">179</span><br><span class="line-number">180</span><br><span class="line-number">181</span><br><span class="line-number">182</span><br><span class="line-number">183</span><br><span class="line-number">184</span><br><span class="line-number">185</span><br><span class="line-number">186</span><br><span class="line-number">187</span><br><span class="line-number">188</span><br><span class="line-number">189</span><br><span class="line-number">190</span><br><span class="line-number">191</span><br><span class="line-number">192</span><br><span class="line-number">193</span><br><span class="line-number">194</span><br><span class="line-number">195</span><br><span class="line-number">196</span><br><span class="line-number">197</span><br><span class="line-number">198</span><br><span class="line-number">199</span><br><span class="line-number">200</span><br><span class="line-number">201</span><br><span class="line-number">202</span><br><span class="line-number">203</span><br><span class="line-number">204</span><br><span class="line-number">205</span><br><span class="line-number">206</span><br><span class="line-number">207</span><br><span class="line-number">208</span><br><span class="line-number">209</span><br><span class="line-number">210</span><br><span class="line-number">211</span><br><span class="line-number">212</span><br><span class="line-number">213</span><br><span class="line-number">214</span><br><span class="line-number">215</span><br><span class="line-number">216</span><br><span class="line-number">217</span><br><span class="line-number">218</span><br><span class="line-number">219</span><br><span class="line-number">220</span><br><span class="line-number">221</span><br><span class="line-number">222</span><br><span class="line-number">223</span><br><span class="line-number">224</span><br><span class="line-number">225</span><br><span class="line-number">226</span><br><span class="line-number">227</span><br><span class="line-number">228</span><br><span class="line-number">229</span><br><span class="line-number">230</span><br><span class="line-number">231</span><br><span class="line-number">232</span><br><span class="line-number">233</span><br><span class="line-number">234</span><br><span class="line-number">235</span><br><span class="line-number">236</span><br><span class="line-number">237</span><br><span class="line-number">238</span><br><span class="line-number">239</span><br><span class="line-number">240</span><br><span class="line-number">241</span><br><span class="line-number">242</span><br></div></div><p>:::</p><h2 id="cosmetic-values-models-effects-tags-and-others" tabindex="-1">Cosmetic Values: Models, Effects, Tags and others. <a class="header-anchor" href="#cosmetic-values-models-effects-tags-and-others" aria-label="Permalink to &quot;Cosmetic Values: Models, Effects, Tags and others.&quot;">​</a></h2><p>These values are optional but greatly improve the quality of your item</p><h3 id="sounds-when-picked-dropped" tabindex="-1">Sounds when Picked, Dropped <a class="header-anchor" href="#sounds-when-picked-dropped" aria-label="Permalink to &quot;Sounds when Picked, Dropped&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;UIPickupSound&quot; &quot;Item.PickUpRingShop&quot;</span><span> //Sound when acquiring the item</span></span>
<span class="line"><span>&quot;UIDropSound&quot; &quot;Item.DropRecipeShop&quot;</span><span> //Sound when dropping the item manually</span></span>
<span class="line"><span>&quot;WorldDropSound&quot; &quot;Item.DropGemWorld&quot;</span><span> //Sound when dropping the item on death (?)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="модель-и-сияние-в-мире" tabindex="-1">Модель и сияние в мире. <a class="header-anchor" href="#модель-и-сияние-в-мире" aria-label="Permalink to &quot;Модель и сияние в мире.&quot;">​</a></h3><p>Файлы VMDL и Particle можно просмотреть через [Обозреватель ресурсов].</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;Model&quot; &quot;models/chest_worlddrop.vmdl&quot;</span></span>
<span class="line"><span>&quot;Effect&quot; &quot;particles/generic_gameplay/dropped_item.vpcf&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Вы можете найти хорошие модели в /props_gameplay, /econ или использовать свои собственные настройки.</p><p>Важно: если вы создаете элемент через lua [CreateItemOnPositionSync], вам необходимо предоставить представление о мировой позиции, в которой создается элемент, хотя бы на короткое время, чтобы правильно отобразить эффект частиц.</p><h3 id="изменить-отображаемыи-цвет-элемента" tabindex="-1">Изменить отображаемый цвет элемента <a class="header-anchor" href="#изменить-отображаемыи-цвет-элемента" aria-label="Permalink to &quot;Изменить отображаемый цвет элемента&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;ItemQuality&quot;    &quot;artifact&quot;</span><span> //Orange</span></span>
<span class="line"><span>                 &quot;epic&quot;</span><span> //Purple</span></span>
<span class="line"><span>                 &quot;rare&quot;</span><span> //Blue</span></span>
<span class="line"><span>                 &quot;common&quot;</span><span> //Green</span></span>
<span class="line"><span>                 &quot;component&quot;</span><span> //White</span></span>
<span class="line"><span>                 &quot;consumable&quot;</span><span> //White</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="теги-и-псевдонимы" tabindex="-1">Теги и псевдонимы <a class="header-anchor" href="#теги-и-псевдонимы" aria-label="Permalink to &quot;Теги и псевдонимы&quot;">​</a></h3><p>Теги определены в <code>addon_english.txt</code>, найдите их в [dota_english] в <code>// Tags</code>. Псевдонимы помогают строке поиска быстро найти товар с помощью сокращений.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;ItemShopTags&quot; &quot;int;str;agi;mana_pool;health_pool;hard_to_tag&quot;</span></span>
<span class="line"><span>&quot;ItemAliases&quot; &quot;this;appears_in;search&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Опустить, чтобы не объявлять.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;ItemDeclarations&quot; &quot;DECLARE_PURCHASES_TO_TEAMMATES&quot;</span></span>
<span class="line"><span>                   &quot;DECLARE_PURCHASES_IN_SPEECH&quot;</span></span>
<span class="line"><span>                   &quot;DECLARE_PURCHASES_TO_SPECTATORS&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="ограничения" tabindex="-1">Ограничения <a class="header-anchor" href="#ограничения" aria-label="Permalink to &quot;Ограничения&quot;">​</a></h3><p>Вот почему Башер запрещен для некоторых героев.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;InvalidHeroes&quot; &quot;npc_dota_hero_spirit_breaker;npc_dota_hero_faceless_void&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>Более мощную версию со сценарием читайте на <a href="/scripting/item-restrictions-requirements">Item Restrictions &amp; Requirements</a>.</p><h2 id="alt-клик" tabindex="-1">Alt-клик <a class="header-anchor" href="#alt-клик" aria-label="Permalink to &quot;Alt-клик&quot;">​</a></h2><p>Удерживая клавишу Alt, щелкните текст на предметах в инвентаре и бросьте их на землю. Берет строки из <code>resource/addon_english.txt</code>. или любые другие языки.</p><h3 id="pingoverridetext" tabindex="-1">PingOverrideText <a class="header-anchor" href="#pingoverridetext" aria-label="Permalink to &quot;PingOverrideText&quot;">​</a></h3><p>Переопределяет значение по умолчанию «[СОЮЗНИКИ] <strong>ItemName</strong> добавлено сюда». Он будет искать <em>#DOTA_Chat_Text_String</em> (<em>Text_String</em> может быть любым) в строках вашего дополнения.</p>`,93)),u(a,{path:r}),s[1]||(s[1]=n(`<p>В item_datadriven:<code>&quot;PingOverrideText&quot; &quot;DOTA_Chat_Text_String&quot;</code>В addon_english.txt:\`\`\` &quot;DOTA_Chat_Text_String&quot; &quot;[VOLVO] Giff&quot;</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>### ItemAlertable</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Отображается «[СОЮЗНИКИ] Собирайтесь для **ItemName** здесь».</span></span>
<span class="line"><span></span></span>
<span class="line"><span>![img](/images/external/duiGf-025d66f1cd.jpg)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>&quot;ItemAlertable&quot; &quot;1&quot;</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>## Скелет базового предмета</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Скопируйте это, чтобы начать элемент</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>&quot;item_custom&quot; { &quot;ID&quot; &quot;1100&quot; &quot;BaseClass&quot; &quot;item_datadriven&quot; &quot;AbilityTextureName&quot; &quot;item_rapier&quot; &quot;Model&quot; &quot;models/props_gameplay/recipe.vmdl&quot; &quot;Effect&quot; &quot;particles/generic_gameplay/dropped_item.vpcf&quot; &quot;ItemQuality&quot; &quot;artifact&quot;</p><pre><code>&quot;ItemCost&quot;     &quot;322&quot;
&quot;ItemKillable&quot; &quot;0&quot;
&quot;ItemSellable&quot; &quot;1&quot;
&quot;ItemPurchasable&quot; &quot;1&quot;
&quot;ItemDroppable&quot; &quot;1&quot;
&quot;ItemShareability&quot; &quot;ITEM_NOT_SHAREABLE&quot;

&quot;SideShop&quot;     &quot;1&quot;
&quot;SecretShop&quot;   &quot;0&quot;

&quot;ItemStackable&quot; &quot;1&quot;
&quot;ItemPermanent&quot; &quot;1&quot;
&quot;ItemDisassembleRule&quot; &quot;DOTA_ITEM_DISASSEMBLE_ALWAYS&quot;

&quot;AbilitySpecial&quot;
{
    &quot;01&quot;
    {
        &quot;var_type&quot;      &quot;FIELD_INTEGER&quot;
        &quot;bonus_stat&quot;    &quot;100&quot;
    }
}

&quot;Modifiers&quot;
{
    &quot;modifier_item_custom&quot;
    {
        &quot;Passive&quot;  &quot;1&quot;
        &quot;IsHidden&quot; &quot;1&quot;
        &quot;Attributes&quot; &quot;MODIFIER_ATTRIBUTE_MULTIPLE&quot;
        &quot;Properties&quot;
        {
            &quot;MODIFIER_PROPERTY_STATS_STRENGTH_BONUS&quot; &quot;%bonus_stat&quot;
        }
    }
}
</code></pre><p>}</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Это самые важные ценности. Для зарядов, обновлений, звуков, псевдонимов и объявлений добавьте строки, описанные ранее. Я исключил их из основного макета, поскольку они не нужны для большинства элементов.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Я также добавил очень простой пассивный модификатор, который берет _bonus_stat_ из \`AbilitySpecial\` и дает 1 бонус к силе. Использование \`AbilitySpecial\` упрощает создание всплывающих подсказок и последующую настройку значений элементов без необходимости изменять указанные всплывающие подсказки.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Добавление дополнительной статистики</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Любое значение из [Modifier Constants](https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Scripting/Constants#Modifier_Properties) может быть добавлено в блок \`&quot;Properties&quot;\`, вот некоторые наиболее распространенные примеры:</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><pre><code>&quot;Properties&quot;
{
    &quot;MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT&quot; &quot;%bonus_attackspeed&quot;
    &quot;MODIFIER_PROPERTY_STATS_STRENGTH_BONUS&quot; &quot;%bonus_str&quot;
    &quot;MODIFIER_PROPERTY_STATS_AGILITY_BONUS&quot; &quot;%bonus_agi&quot;
    &quot;MODIFIER_PROPERTY_STATS_INTELLECT_BONUS&quot; &quot;%bonus_int&quot;
    &quot;MODIFIER_PROPERTY_HEALTH_BONUS&quot;    &quot;%bonus_hp&quot;
    &quot;MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT&quot; &quot;%bonus_health_regen&quot;
    &quot;MODIFIER_PROPERTY_MANA_BONUS&quot;  &quot;%bonus_hp&quot;
    &quot;MODIFIER_PROPERTY_MANA_REGEN_PERCENTAGE&quot;  &quot;%bonus_mana_regen&quot;
    &quot;MODIFIER_PROPERTY_BASEDAMAGEOUTGOING_PERCENTAGE&quot;   &quot;%bonus_damage_percent&quot;
}
</code></pre><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>## Заряженные расходные материалы</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### Фолиант статистики</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[item_tome_of_knowledge](https://github.com/MNoya/Warchasers/blob/master/scripts/npc/npc_items_custom.txt#L1475)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### Зелье здоровья</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[item_potion_of_healing](https://github.com/MNoya/Warchasers/blob/master/scripts/npc/npc_items_custom.txt#L1844)</span></span>
<span class="line"><span>### Вызов</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[item_demonic_figurine](https://github.com/MNoya/Warchasers/blob/master/scripts/npc/npc_items_custom.txt#L2967)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Обновляемые предметы и рецепты</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- См. [Reflex](https://github.com/bmddota/reflexdota/blob/source2/game/dota_addons/reflex/scripts/npc/npc_items_custom.txt).</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Помимо этих значений, код предмета использует те же значения, управляемые данными, что и способности. См. [DataDriven Ability Breakdown](ability-keyvalues).</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Пассивные умения</span></span>
<span class="line"><span>### Ауры</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`&quot;AbilityBehavior&quot; &quot;DOTA_ABILITY_BEHAVIOR_AURA | DOTA_ABILITY_BEHAVIOR_PASSIVE&quot;\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>В блоке модификаторов:</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><pre><code>&quot;Aura&quot;  &quot;custom_aura&quot;
&quot;Aura_Teams&quot;    &quot;DOTA_UNIT_TARGET_TEAM_FRIENDLY&quot;
&quot;Aura_Radius&quot;   &quot;%radius&quot;
&quot;Aura_Types&quot;    &quot;DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC&quot;
&quot;Aura_Flags&quot; &quot;DOTA_UNIT_TARGET_FLAG_RANGED_ONLY&quot;
</code></pre><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Затем создайте новый блок модификаторов с именем Ауры и желаемыми эффектами.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### Постепенный урон</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Внутри модификатора используйте \`&quot;ThinkInterval&quot; &quot;1&quot;\` и создайте блок \`&quot;OnIntervalThink&quot;\`, в котором вы наносите урон.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><pre><code>&quot;ThinkInterval&quot; &quot;1&quot;
&quot;OnIntervalThink&quot;
{
    &quot;Damage&quot;
    {
         &quot;Target&quot;
         {
             &quot;Center&quot; &quot;CASTER&quot;
             &quot;Radius&quot; &quot;%radius&quot;
             &quot;Teams&quot; &quot;DOTA_UNIT_TARGET_TEAM_ENEMY&quot;
             &quot;Types&quot; &quot;DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC&quot;
         }
         &quot;Type&quot; &quot;DAMAGE_TYPE_MAGICAL&quot;
         &quot;Damage&quot;   &quot;%damage_per_second&quot;
    }
}
</code></pre><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>### Раскалывать</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Внутри модификатора. Имейте в виду, что это будет работать на дальнем бою, поэтому вам нужно ограничить его при применении этого модификатора, если вам нужно.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><pre><code>&quot;OnAttackLanded&quot;
{
    &quot;CleaveAttack&quot;
    {
        &quot;CleavePercent&quot; &quot;10&quot;
        &quot;CleaveRadius&quot;  &quot;140&quot;
        &quot;CleaveEffect&quot;  &quot;particles/units/heroes/hero_sven/sven_spell_great_cleave.vpcf&quot;
    }
}
</code></pre><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>### Крит</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Существует свойство \`MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE\`, но оно не включает в себя шанс, поэтому вам нужно использовать DataDriven \`Random\` при запуске атаки и применить модификатор с критическим уроном, удалив его позже \`OnAttackLanded\`.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Первый \`RemoveModifier\` добавлен, чтобы запретить людям отменять атаки для получения гарантированного критического удара.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>&quot;modifier_crit&quot; { &quot;Passive&quot; &quot;1&quot; &quot;IsHidden&quot; &quot;1&quot; &quot;OnAttackStart&quot; { &quot;RemoveModifier&quot; { &quot;ModifierName&quot; &quot;crit&quot; &quot;Target&quot; &quot;CASTER&quot; } &quot;Random&quot; { &quot;Chance&quot; &quot;%crit_chance&quot; &quot;OnSuccess&quot; { &quot;ApplyModifier&quot; { &quot;ModifierName&quot; &quot;crit&quot; &quot;Target&quot; &quot;CASTER&quot; } } } } }</p><p>&quot;crit&quot; { &quot;IsHidden&quot; &quot;1&quot; &quot;Properties&quot; { &quot;MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE&quot; &quot;%crit_bonus&quot; }</p><pre><code>&quot;OnAttackLanded&quot;
{
    &quot;RemoveModifier&quot;
    {
        &quot;ModifierName&quot;  &quot;crit&quot;
        &quot;Target&quot;    &quot;CASTER&quot;
    }

    // Basic blood particle effect
    &quot;FireEffect&quot;
    {
        &quot;EffectName&quot; &quot;particles/units/heroes/hero_phantom_assassin/phantom_assassin_crit_impact.vpcf&quot;
        &quot;EffectAttachType&quot;  &quot;follow_origin&quot;
        &quot;Target&quot;    &quot;TARGET&quot;
    }
}
</code></pre><p>}</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>### Сфера: замедление и вампиризм с помощью специального снаряда.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>&quot;modifier_orb_of_frost&quot; { &quot;Passive&quot; &quot;1&quot; &quot;IsHidden&quot; &quot;1&quot; &quot;Attributes&quot; &quot;MODIFIER_ATTRIBUTE_MULTIPLE&quot; &quot;Properties&quot; { &quot;MODIFIER_PROPERTY_BASEATTACK_BONUSDAMAGE&quot; &quot;6&quot; }</p><pre><code>&quot;Orb&quot;
{
    &quot;Priority&quot;  &quot;DOTA_ORB_PRIORITY_ABILITY&quot;
    &quot;ProjectileName&quot; &quot;particles\\items2_fx\\skadi_projectile.vpcf&quot;
}

&quot;OnOrbImpact&quot;
{
    &quot;Lifesteal&quot;
    {
        &quot;Target&quot;    &quot;ATTACKER&quot;
        &quot;LifestealPercent&quot; &quot;%bonus_lifesteal&quot;
    }

    &quot;ApplyModifier&quot;
    {
        &quot;Target&quot;    &quot;TARGET&quot;
        &quot;ModifierName&quot;  &quot;modifier_orb_of_frost_slow&quot;
        &quot;Duration&quot;  &quot;%slow_duration&quot;
    }
}
</code></pre><p>}</p><p>&quot;modifier_orb_of_frost_slow&quot; { &quot;IsDebuff&quot; &quot;1&quot; &quot;Duration&quot; &quot;3&quot; &quot;Properties&quot; { &quot;MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE&quot; &quot;%move_speed_slow&quot; &quot;MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT&quot; &quot;%attack_speed_slow&quot; } &quot;EffectName&quot; &quot;particles/generic_gameplay/generic_slowed_cold.vpcf&quot; &quot;EffectAttachType&quot; &quot;attach_hitloc&quot; &quot;Target&quot; &quot;TARGET&quot; }</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Примечание. DataDriven Lifesteal может украсть вещи, которые вы не хотите воровать, лучше это сделать через [lua](https://github.com/MNoya/Warchasers/blob/master/scripts/npc/npc_abilities_custom.txt#L7041).</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### Блокировать</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Это непростая задача. Обратите внимание, что модификаторов снова 2.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Первый имеет \`OnAttacked\`, который случайным образом определяет вероятность блока, \`OnSuccess\` применяет модификатор блока, \`OnFailure\` удаляет его. Внутри block_modifier \`OnAttacked\` удаляет себя.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`OnCreated\` предназначен для того, чтобы можно было заблокировать первый удар после надевания щита.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>&quot;shield_modifier&quot; { &quot;Passive&quot; &quot;1&quot; &quot;IsHidden&quot; &quot;1&quot; &quot;Properties&quot; { &quot;MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS&quot; &quot;%magic_resistance&quot; } &quot;OnCreated&quot; { &quot;Random&quot; { &quot;Chance&quot; &quot;%block_chance&quot; &quot;OnSuccess&quot; { &quot;ApplyModifier&quot; { &quot;Target&quot; &quot;CASTER&quot; &quot;ModifierName&quot; &quot;block_modifier&quot; } } } } &quot;OnAttacked&quot; { &quot;Random&quot; { &quot;Chance&quot; &quot;%block_chance&quot; &quot;OnSuccess&quot; { &quot;ApplyModifier&quot; { &quot;Target&quot; &quot;CASTER&quot; &quot;ModifierName&quot; &quot;block_modifier&quot; } } &quot;OnFailure&quot; { &quot;RemoveModifier&quot; { &quot;Target&quot; &quot;CASTER&quot; &quot;ModifierName&quot; &quot;block_modifier&quot; } } } } }</p><p>&quot;block_modifier&quot; { &quot;IsBuff&quot; &quot;1&quot; &quot;IsHidden&quot; &quot;1&quot; &quot;Properties&quot; { &quot;MODIFIER_PROPERTY_PHYSICAL_CONSTANT_BLOCK&quot; &quot;%damage_blocked&quot; } &quot;OnAttacked&quot; { &quot;RemoveModifier&quot; { &quot;Target&quot; &quot;CASTER&quot; &quot;ModifierName&quot; &quot;block_modifier&quot; } } }</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div>`,29))])}const g=t(q,[["render",c]]);export{R as __pageData,g as default};
