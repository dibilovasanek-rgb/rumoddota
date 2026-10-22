import{_ as n,o as a,c as e,ag as p}from"./chunks/framework.DUTPmUpA.js";const l="/_assets/TWgPSJx.DqBOq9nn.png",d=JSON.parse('{"title":"Написание простого ИИ для нейтралов","description":"","frontmatter":{"title":"Написание простого ИИ для нейтралов","author":"Perry","steamId":"76561198046986723","date":"25.01.2020"},"headers":[],"relativePath":"units/simple-neutral-ai.md","filePath":"units/simple-neutral-ai.md"}'),i={name:"units/simple-neutral-ai.md"};function r(t,s,c,b,o,u){return a(),e("div",null,[...s[0]||(s[0]=[p('<p>Написание простого ИИ для нейтралов</p><p>::: информация Эта статья представляет собой переработку очень старого руководства по искусственному интеллекту: <a href="https://web.archive.org/web/20191231104348/https://yrrep.me/dota/dota-simple-ai.html" target="_blank" rel="noreferrer">http://yrrep.me/dota/dota-simple-ai.html</a>. :::</p><p>За это время я столкнулся со многими вопросами об ИИ в irc по моддингу, поэтому решил написать руководство по очень простому ИИ, который можно использовать в Lua. Термин ИИ может показаться пугающим программисту, у которого практически нет опыта работы с ним. Однако я постараюсь изложить процесс создания простого ИИ, управляемого состоянием, как можно более понятно. Надеюсь, к концу этой статьи написание собственного ИИ перестанет казаться таким страшным.</p><h2 id="что-мы-делаем" tabindex="-1">Что мы делаем <a class="header-anchor" href="#что-мы-делаем" aria-label="Permalink to &quot;Что мы делаем&quot;">​</a></h2><p>Мы создадим небольшой управляемый государством ИИ, который будет имитировать поведение нейтральных людей в DotA 2. Это значит, что он будет делать следующее:</p><ul><li>Он будет стоять на своем месте до тех пор, пока враг не подойдет к нему.</li><li>Заметив врага, он побежит атаковать его.</li><li>Если нейтраль уйдет слишком далеко от своего исходного «холостой позиции», она вернется обратно в нее.</li><li>Повторяем с первого пункта.</li></ul><p>Первым этапом создания надежного ИИ (в том смысле, что он всегда будет делать то, что вы от него ожидаете) является планирование. Лично я считаю, что создание диаграммы, представляющей различные состояния и переходы между этими состояниями, очень поможет при создании такого ИИ. Чем больше усилий вы вложите в эту диаграмму, тем проще будет фактическая реализация вашего ИИ.</p><p>Для нашего нейтрального примера я перевел текст, описывающий поведение объекта, в диаграмму состояний, содержащую все возможные состояния и условия перехода между этими состояниями. В результате получается следующая диаграмма:</p><p><img src="'+l+`" alt="State transition diagram"> Эти диаграммы можно создать с помощью любого программного обеспечения с возможностями рисования, такого как Paint, Photoshop или Word. Мне очень нравится использовать <a href="https://www.draw.io/" target="_blank" rel="noreferrer">https://www.draw.io/</a>, — онлайн-инструмент для рисования, специализирующийся на рисовании диаграмм и графиков.</p><p>На диаграмме вы можете увидеть различные состояния, представленные прямоугольниками, и переходы, обозначенные стрелками. Метки на стрелках описывают, когда происходит этот переход.</p><h2 id="реализация-одного-состояния" tabindex="-1">Реализация одного состояния <a class="header-anchor" href="#реализация-одного-состояния" aria-label="Permalink to &quot;Реализация одного состояния&quot;">​</a></h2><p>Чтобы показать, как преобразовать одно состояние в код, я приведу пример реализации агрессивного состояния. Я реализую каждое состояние как функцию «думания», которая проверит, истинно ли какое-либо из условий перехода, и выполнит этот переход, если они верны.</p><p>Посмотрите на «агрессивное» состояние на диаграмме выше. У него есть два перехода, поэтому я ожидаю, что функция «AggressiveThink» будет содержать одну проверку «Цель умерла», одну проверку «Вне зоны действия поводка», а также некоторое агрессивное поведение, происходящее внутри состояния.</p><p>Это переводится в следующий код:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>function modifier_ai:AggressiveThink()</span></span>
<span class="line"><span>    -- Check if the unit has walked outside its leash range</span></span>
<span class="line"><span>    if (self.spawnPos - self.unit:GetAbsOrigin()):Length() &gt; self.leashRange then</span></span>
<span class="line"><span>        self.unit:MoveToPosition(self.spawnPos) --Move back to the spawnpoint</span></span>
<span class="line"><span>        self.state = AI_STATE_RETURNING --Transition the state to the &#39;Returning&#39; state(!)</span></span>
<span class="line"><span>        return -- Stop processing this state</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- Check if the target has died</span></span>
<span class="line"><span>    if not self.aggroTarget:IsAlive() then</span></span>
<span class="line"><span>        self.unit:MoveToPosition(self.spawnPos) --Move back to the spawnpoint</span></span>
<span class="line"><span>        self.state = AI_STATE_RETURNING --Transition the state to the &#39;Returning&#39; state(!)</span></span>
<span class="line"><span>        return -- Stop processing this state</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- Still in the aggressive state, so do some aggressive stuff.</span></span>
<span class="line"><span>    self.unit:MoveToTargetToAttack(self.aggroTarget)</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>Этот способ перевода диаграммы состояний в код всегда будет работать, пока вы можете написать код, описывающий условия перехода.</p><h2 id="ai-как-модификатор-lua" tabindex="-1">AI как модификатор Lua <a class="header-anchor" href="#ai-как-модификатор-lua" aria-label="Permalink to &quot;AI как модификатор Lua&quot;">​</a></h2><p>Теперь у нас есть одна функция, которая описывает один «тик» одного из наших состояний ИИ. Как нам убедиться, что она вызывается?</p><p>Самый простой способ создать ИИ, привязанный к одному юниту, — сделать ИИ модификатором Lua. Этот модификатор имеет несколько очень удобных встроенных свойств:</p><ul><li>ИИ остановится, как только юнит умрет.</li><li>Модификатор предоставляет удобные обработчики создания/уничтожения для настройки/очистки вашего ИИ.</li><li>Модификатор обеспечивает интервальное мышление</li></ul><p>Итак, на самом деле, сама суть вашего ИИ сводится к вызову <code>StartIntervalThink(interval)</code> в <code>OnCreated</code> вашего модификатора, а затем в <code>OnIntervalThink</code> вызов правильной функции «состояния», которую вы создали, как в предыдущем разделе.</p><h2 id="полныи-модификатор-ии" tabindex="-1">Полный модификатор ИИ <a class="header-anchor" href="#полныи-модификатор-ии" aria-label="Permalink to &quot;Полный модификатор ИИ&quot;">​</a></h2><p>Ниже приведена полная диаграмма состояний, приведенная выше, реализованная как AI. Этот ИИ можно добавить в <code>unit</code>, вызвав:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>unit:AddNewModifier(nil, nil, &quot;modifier_ai&quot;, { aggroRange = 600, leashRange = 600 });</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Когда я применяю его, я передаю некоторые параметры поведению ИИ, что позволяет настраивать каждую единицу. Имейте в виду, что этот модификатор аналогичен любому другому модификатору Lua, поэтому вы можете выполнять любой код, который также можно вызывать с помощью обычных модификаторов.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua</span></span>
<span class="line"><span>modifier_ai = class({})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>local AI_STATE_IDLE = 0</span></span>
<span class="line"><span>local AI_STATE_AGGRESSIVE = 1</span></span>
<span class="line"><span>local AI_STATE_RETURNING = 2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>local AI_THINK_INTERVAL = 0.5</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function modifier_ai:OnCreated(params)</span></span>
<span class="line"><span>    -- Only do AI on server</span></span>
<span class="line"><span>    if IsServer() then</span></span>
<span class="line"><span>        -- Set initial state</span></span>
<span class="line"><span>        self.state = AI_STATE_IDLE</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        -- Store parameters from AI creation:</span></span>
<span class="line"><span>        -- unit:AddNewModifier(caster, ability, &quot;modifier_ai&quot;, { aggroRange = X, leashRange = Y })</span></span>
<span class="line"><span>        self.aggroRange = params.aggroRange</span></span>
<span class="line"><span>        self.leashRange = params.leashRange</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        -- Store unit handle so we don&#39;t have to call self:GetParent() every time</span></span>
<span class="line"><span>        self.unit = self:GetParent()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        -- Set state -&gt; action mapping</span></span>
<span class="line"><span>        self.stateActions = {</span></span>
<span class="line"><span>            [AI_STATE_IDLE] = self.IdleThink,</span></span>
<span class="line"><span>            [AI_STATE_AGGRESSIVE] = self.AggressiveThink,</span></span>
<span class="line"><span>            [AI_STATE_RETURNING] = self.ReturningThink,</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        -- Start thinking</span></span>
<span class="line"><span>        self:StartIntervalThink(AI_THINK_INTERVAL)</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function modifier_ai:OnIntervalThink()</span></span>
<span class="line"><span>    -- Execute action corresponding to the current state</span></span>
<span class="line"><span>    self.stateActions[self.state](self)</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function modifier_ai:IdleThink()</span></span>
<span class="line"><span>    -- Find any enemy units around the AI unit inside the aggroRange</span></span>
<span class="line"><span>    local units = FindUnitsInRadius(self.unit:GetTeam(), self.unit:GetAbsOrigin(), nil,</span></span>
<span class="line"><span>        self.aggroRange, DOTA_UNIT_TARGET_TEAM_ENEMY, DOTA_UNIT_TARGET_ALL, DOTA_UNIT_TARGET_FLAG_NONE,</span></span>
<span class="line"><span>        FIND_ANY_ORDER, false)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- If one or more units were found, start attacking the first one</span></span>
<span class="line"><span>    if #units &gt; 0 then</span></span>
<span class="line"><span>        self.spawnPos = self.unit:GetAbsOrigin() -- Remember position to return to</span></span>
<span class="line"><span>        self.aggroTarget = units[1] -- Remember who to attack</span></span>
<span class="line"><span>        self.unit:MoveToTargetToAttack(self.aggroTarget) --Start attacking</span></span>
<span class="line"><span>        self.state = AI_STATE_AGGRESSIVE --State transition</span></span>
<span class="line"><span>        return -- Stop processing this state</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- Nothing else to do in Idle state</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function modifier_ai:AggressiveThink()</span></span>
<span class="line"><span>    -- Check if the unit has walked outside its leash range</span></span>
<span class="line"><span>    if (self.spawnPos - self.unit:GetAbsOrigin()):Length() &gt; self.leashRange then</span></span>
<span class="line"><span>        self.unit:MoveToPosition(self.spawnPos) --Move back to the spawnpoint</span></span>
<span class="line"><span>        self.state = AI_STATE_RETURNING --Transition the state to the &#39;Returning&#39; state(!)</span></span>
<span class="line"><span>        return -- Stop processing this state</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- Check if the target has died</span></span>
<span class="line"><span>    if not self.aggroTarget:IsAlive() then</span></span>
<span class="line"><span>        self.unit:MoveToPosition(self.spawnPos) --Move back to the spawnpoint</span></span>
<span class="line"><span>        self.state = AI_STATE_RETURNING --Transition the state to the &#39;Returning&#39; state(!)</span></span>
<span class="line"><span>        return -- Stop processing this state</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- Still in the aggressive state, so do some aggressive stuff.</span></span>
<span class="line"><span>    self.unit:MoveToTargetToAttack(self.aggroTarget)</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function modifier_ai:ReturningThink()</span></span>
<span class="line"><span>    -- Check if the AI unit has reached its spawn location yet</span></span>
<span class="line"><span>    if (self.spawnPos - self.unit:GetAbsOrigin()):Length() &lt; 10 then</span></span>
<span class="line"><span>        self.state = AI_STATE_IDLE -- Transition the state to the &#39;Idle&#39; state(!)</span></span>
<span class="line"><span>        return -- Stop processing this state</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -- If not at return position yet, try to move there again</span></span>
<span class="line"><span>    self.unit:MoveToPosition(self.spawnPos)</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br></div></div><h2 id="ваш-следующии-более-сложныи-ии" tabindex="-1">Ваш следующий (более сложный) ИИ <a class="header-anchor" href="#ваш-следующии-более-сложныи-ии" aria-label="Permalink to &quot;Ваш следующий (более сложный) ИИ&quot;">​</a></h2><p>В этом уроке рассматриваются только самые базовые концепции создания вашего первого ИИ, но если вы хотите расширить его, вот еще несколько интересных идей:</p><ul><li>Поскольку вы используете модификатор lua, вам не нужно менять состояние в функции think, вы также можете просто зарегистрировать прослушиватель событий модификатора и изменять состояние внутри него!</li><li>Обобщите классы состояний и дайте каждому состоянию функции <code>OnStateEnter</code>, <code>OnStateThink</code> и <code>OnStateLeave</code>.</li><li>Вы можете вкладывать эти ИИ! Вы можете сделать внутреннее поведение одного государства собственным ИИ, созданным таким же образом.</li></ul>`,29)])])}const h=n(i,[["render",r]]);export{d as __pageData,h as default};
