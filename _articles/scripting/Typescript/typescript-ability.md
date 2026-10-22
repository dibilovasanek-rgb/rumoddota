---
title: Способности в Typescript
author: Shush
steamId: 76561197994333648
date: 07.03.2021
---
# Способности в Typescript

Независимо от того, какую игру вы собираетесь играть, вам, скорее всего, придется запрограммировать пару способностей, которые ваши персонажи смогут использовать для борьбы со всем, с чем им придется сражаться. Typescript позволяет кодировать множество способностей с огромной гибкостью.

В этом уроке я собираюсь продемонстрировать Typescript с довольно простой способностью: Чародейской стрелой Скайраса. Он выпускает медленно движущийся следящий снаряд, который наносит урон, равный базовому урону плюс множитель интеллекта героя.

В этом руководстве предполагается, что у вас есть базовые знания о том, как регистрируются способности юнитов или героев. Если вы не в курсе, я бы порекомендовал замечательные руководства от Elfansoer: [Ability Form](https://github.com/Elfansoer/dota-2-lua-abilities/wiki/Ability-Lua-Tutorial-1%3A-Ability-Form) и [Registering and Testing Ability](https://github.com/Elfansoer/dota-2-lua-abilities/wiki/Ability-Lua-Tutorial-2:-Registering-and-Testing-Ability). Однако обратите внимание, что в этом руководстве предполагается, что вы будете использовать Typescript вместо lua, поэтому изучение остальных руководств в учебнике Elfansoer'sability Lua не требуется; тем не менее, он проделывает фантастическую работу, объясняя механику и методы, которые используются при кодировании способностей, независимо от языка, поэтому я иду дальше и рекомендую рассмотреть их, если вам интересно.

Прежде чем мы начнем, я собираюсь дать ссылку на [moddota tools](https://moddota.com/api/#!/vscripts), который содержит самый современный API для пользовательских игр в Dota 2. Если вы использовали вики Valve, откажитесь от нее; он не обновлялся годами.

## Создание новой способности
Прежде чем мы сможем начать кодировать способность, нам нужно ее определить. Typescript заменяет только файлы lua, поэтому все, что содержит KV, например файлы `npc_abilities_custom.txt` или `npc_heroes_custom.txt`, полностью не меняется.

В `npc_abilities_custom.txt`, который находится в папке `scripts/npc`, мы поместим определение способности, взятое прямо из оригинальной Dota 2:
```
"typescript_skywrath_mage_arcane_bolt"
{
    // General
    //-------------------------------------------------------------------------------------------------------------
    "BaseClass"             		"ability_lua"
    "AbilityTextureName"			"skywrath_mage_arcane_bolt"
    "ScriptFile"				      "abilities/typescript_skywrath_mage_arcane_bolt"
    "AbilityBehavior"				"DOTA_ABILITY_BEHAVIOR_UNIT_TARGET"
    "AbilityUnitTargetTeam"			"DOTA_UNIT_TARGET_TEAM_ENEMY"
    "AbilityUnitTargetType"			"DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC"
    "AbilityUnitDamageType"			"DAMAGE_TYPE_MAGICAL"
    "SpellImmunityType"				"SPELL_IMMUNITY_ENEMIES_NO"
    "FightRecapLevel"				"1"
    "AbilitySound"					"Hero_SkywrathMage.ArcaneBolt.Cast"

    // Casting
    //-------------------------------------------------------------------------------------------------------------
    "AbilityCastRange"				"875"
    "AbilityCastPoint"				"0.1 0.1 0.1 0.1"

    // Time
    //-------------------------------------------------------------------------------------------------------------
    "AbilityCooldown"				"5.0 4.0 3.0 2.0"

    // Cost
    //-------------------------------------------------------------------------------------------------------------
    "AbilityManaCost"				"90"

    // Special
    //-------------------------------------------------------------------------------------------------------------
    "AbilityValues"
    {
      "bolt_speed"				"500"
      "bolt_vision"				"325"
      "bolt_damage"				"60 80 100 120"
      "int_multiplier"
      {
        "value" "1.6"
        "CalculateSpellDamageTooltip" "1"
      }
      "vision_duration"			"3.34"
    }
    "AbilityCastAnimation"		"ACT_DOTA_CAST_ABILITY_1"
}
```
Обратите внимание, что внесены небольшие изменения: способность была переименована в `typescript_skywrath_mage_arcane_bolt`, чтобы не конфликтовать с исходной способностью. Идентификатор также был удален, поскольку он не требуется для пользовательских игровых способностей. Плюс, для простоты, способность больше не имеет эффекта скипетра.

Добавлено три новых поля:

- `"BaseClass" "ability_lua"` - хотя мы кодируем на Typescript, результирующий файл все равно будет lua, как и ожидает движок. Поэтому мы будем использовать «ability_lua» в качестве типа класса способностей.

- `"AbilityTextureName" "skywrath_mage_arcane_bolt"` - поскольку мы не используем исходную способность, необходимо добавить это поле, чтобы сообщить игре, какой значок использовать для этой способности.

- `"ScriptFile" "abilities/typescript_skywrath_mage_arcane_bolt"` - это путь к файлу, в котором находится код способности. Помните, что он использует относительный путь, начиная с `/game/scripts/vscripts`, в котором находится папка `abilities`.
## Создание файла способностей

Теперь, когда способность определена, пришло время приступить к ее кодированию. Первым шагом будет создание файла с именем `typescript_skywrath_mage_arcane_bolt.ts` внутри исходной папки `src/vscripts/abilities`. Исходный код — это место, где мы создадим файл, но когда мы его скомпилируем, он создаст lua-файл в `/game/vscripts/abilities`, как и ожидает игра. Помните, что хотя мы и создаем возможность в Typescript, движок работает с файлами lua, которые нам и нужно создавать.

:::информация
В то время как [Watcher is active](typescript-introduction#activating-the-watcher), каждый раз, когда вы сохраняете файл, в соответствующей выходной папке будет создаваться файл `.lua` с тем же именем. Этот файл lua будет использоваться игрой и будет немедленно обновлен в соответствии с любыми изменениями, которые вы вносите в файл Typescript.
:::

## Добавление класса способностей

Во-первых, нам нужно объявить класс способности. Это делается добавлением следующего:
```
ts
@registerAbility()
export class typescript_skywrath_mage_arcane_bolt extends BaseAbility {}
```
Давайте пробежимся по этому быстро:

— `@registerAbility()` — присваивает классу глобальную область видимости, что позволяет Dota распознавать эту способность.

- `export` - включение этого ключевого слова на самом деле не обязательно, но рекомендуется. Это позволяет вам вызывать этот класс как тип, если вам это понадобится в какой-то момент. Например, ваша способность может иметь уникальную функцию или свойство, на которое другие могут захотеть сослаться или вызвать.

— `class` — Стандартное ключевое слово для создания классов.

- `typescript_skywrath_mage_arcane_bolt` - Точно такое же, как название способности. Оно должно быть идентично названию способности в верхней части определения способности.
- `extends BaseAbility` — все стандартные способности расширяют класс `BaseAbility` и наследуют различные его черты, например, то, что он является сущностью.

— `{}` — весь код этой способности будет заключен в фигурные скобки.

Пока ваш курсор находится внутри этого блока, здесь будут отображаться все функции, унаследованные от `BaseAbility`. Просто начните вводить текст для автозаполнения, и оно сразу же покажет вам возможные варианты завершения того, что вы набрали.

:::информация
Если @registerAbility() или BaseAbility не распознаются и показывают ошибку, выделите их и используйте сочетание клавиш `Ctrl + .`, которое откроет небольшое меню с предложением их импортировать. Вы увидите, что в верхней части файла теперь есть оператор импорта: `import { BaseAbility, registerAbility } from "../lib/dota_ts_adapter";`, который показывает, что теперь они импортированы из соответствующих файлов.
:::

## Свойства способностей
Прежде чем мы на самом деле добавим какие-либо функции, нам следует добавить в класс свойства. К ним очень легко получить доступ из любой точки класса, и они очень полезны для хранения там информации об этом экземпляре способности. Это не обязательно, но именно здесь я обычно храню любые значения:

- Пути частиц

- Звуки

- Модели

- Любая другая информация, необходимая для функционирования, например логическое значение или число.

Давайте добавим свойства способности Ancient Bolt: звук применения, частицу снаряда и звук удара. Они извлекаются из браузера активов.
Теперь класс должен выглядеть так:

```
ts
@registerAbility()
export class typescript_skywrath_mage_arcane_bolt extends BaseAbility {
  sound_cast: string = 'Hero_SkywrathMage.ArcaneBolt.Cast';
  sound_impact: string = 'Hero_SkywrathMage.ArcaneBolt.Impact';
  projectile_arcane_bolt: string =
    'particles/units/heroes/hero_skywrath_mage/skywrath_mage_arcane_bolt.vpcf';
}
```

:::info
The property names are arbitrary, and could be anything you'd like.
:::

Note that after the property name, comes `: string`. This defines the type of the property. Technically, this is not required, as Typescript will know that it is a string due to it being assigned to a string. However, it is good practice to add the type to increase readability and to make sure you don't assign it with something you didn't intend to.

## Coding The Ability: Properties and Methods

Now that we've set up everything we need for the ability, let's start coding it. First, we'll add a OnSpellStart() method, which is called when the unit or hero casts it.

```
ts
@registerAbility()
export class typescript_skywrath_mage_arcane_bolt extends BaseAbility {
  sound_cast: string = 'Hero_SkywrathMage.ArcaneBolt.Cast';
  sound_impact: string = 'Hero_SkywrathMage.ArcaneBolt.Impact';
  projectile_arcane_bolt: string =
    'particles/units/heroes/hero_skywrath_mage/skywrath_mage_arcane_bolt.vpcf';

  OnSpellStart() {}
}
```
Внутри OnSpellStart() мы хотим получить цель способности, по которой будет выпущен болт. Мы инициализируем переменную для хранения этой информации. У нас есть два основных типа переменных, которые мы можем инициализировать:

- `const` - константа. Этой переменной должно быть присвоено значение при ее вызове. Эти переменные никогда не могут быть переназначены. Полезно для переменных, которые никогда не должны изменяться, например экземпляров классов или окончательных результатов функции, которые будут использоваться как есть.

- `let` - Стандартная переменная. Эта переменная может быть неопределенной, присваиваться немедленно или присваиваться позже. Его можно переназначать столько раз, сколько вам нужно. Полезно для изменяющихся вещей, таких как числовые вычисления или логические операторы.

В этом случае, как только мы получим нашу цель, она никогда не должна менять это приведение, что является хорошим показателем того, что нам следует использовать `const`. Он будет немедленно назначен цели курсора способности с помощью `this.GetCursorTarget()`.

:::информация
`this` относится к экземпляру класса, в котором он называется, в данном случае к классу `typescript_skywrath_mage_arcane_bolt`. Поскольку он наследует BaseAbility, он также наследует его функциональность по выбору цели курсора.
:::

```
ts
@registerAbility()
export class typescript_skywrath_mage_arcane_bolt extends BaseAbility {
  sound_cast: string = 'Hero_SkywrathMage.ArcaneBolt.Cast';
  sound_impact: string = 'Hero_SkywrathMage.ArcaneBolt.Impact';
  projectile_arcane_bolt: string =
    'particles/units/heroes/hero_skywrath_mage/skywrath_mage_arcane_bolt.vpcf';

  OnSpellStart() {
    const target = this.GetCursorTarget();
  }
}
```

## Проверка аргументов функции и типа возвращаемого значения

В VSCode и аналогичных редакторах, которые его поддерживают, при наведении курсора на функцию отображается ее краткое объяснение. Например, если мы наведем курсор на `this.GetCursorTarget()`, мы увидим следующее:

![Function types](/images/typescript-tutorial/functionInfo.png)

Это позволяет нам знать, что:

1. Эта функция не ожидает никаких аргументов.
2. Эта функция вернет либо CDOTA_BaseNPC, либо неопределенное значение.

Другими словами, `target` будет либо назначен CDOTA_BaseNPC, который обычно соответствует юниту или герою, либо, в случае, если он был вызван со способностью, не применяемой к какой-либо цели, будет назначен `undefined`. Это может произойти, например, если мы попытаемся использовать `this.GetCursorTarget()` для способности «Нет цели».

Typescript знает об этом и пометит `target` как потенциальную неопределенную переменную. Всякий раз, когда мы попытаемся использовать эту переменную, например `target.GetHealth()`, она предупредит нас, что `target` может быть неопределенным и, следовательно, не сможет вызвать функцию. Лучше всего использовать if для проверки того, что цель действительно существует, прежде чем любая функция, которая ее задействует.

:::информация
Если вы уверены, что переменным, которые потенциально не определены, будет присвоено допустимое значение, вы можете заставить Typescript игнорировать возможность неопределенности, добавив "!" до конца задания. Например, мы можем использовать `const target = this.GetCursorTarget()!`. Однако это не рекомендуется, поскольку это в первую очередь противоречит цели использования типов — гарантировать, что вы не сделаете того, чего не можете.
:::

## Кодирование способности: стрельба снарядом
Следующим шагом будет сбор всей оставшейся информации о снаряде из нашего определения способности. Нам нужна скорость снаряда (`bolt_speed`) и дальность обзора (`bolt_vision`). Остальное будет собрано при ударе. Наша функция теперь должна выглядеть так:
```
ts
@registerAbility()
export class typescript_skywrath_mage_arcane_bolt extends BaseAbility {
  sound_cast: string = 'Hero_SkywrathMage.ArcaneBolt.Cast';
  sound_impact: string = 'Hero_SkywrathMage.ArcaneBolt.Impact';
  projectile_arcane_bolt: string =
    'particles/units/heroes/hero_skywrath_mage/skywrath_mage_arcane_bolt.vpcf';

  OnSpellStart() {
    const target = this.GetCursorTarget();
    const bolt_speed = this.GetSpecialValueFor('bolt_speed');
    const bolt_vision = this.GetSpecialValueFor('bolt_vision');
  }
}
```

:::info
Since GetSpecialValueFor always returns a number, it doesn't have a potential for undefined. However, it will still return 0 if the engine will not be able to find the string provided for the ability.
:::

Next, we want to fire a tracking projectile at the target. The projectile cannot be dodged, and provides vision during its journey to the target, among other properties. Most of them have default values and can be omitted.

One of the great advantages of Typescript is that things like tracking projectiles have types. The editor immediately recognizes that we want properties for the tracking projectiles, and shows up possible properties for it when we go into it. Since this is a object full of properties, we need to open it with curly brackets:

![Tracking Projectile Properties](/images/typescript-tutorial/trackingProjectileProperties.png)

:::info
In most editors, `ctrl + spacebar` is the hotkey to show auto-complete if it is not shown.
:::

Let's fill it with properties we care about. The code will now look like this:

```
ts
@registerAbility()
export class typescript_skywrath_mage_arcane_bolt extends BaseAbility {
  sound_cast: string = 'Hero_SkywrathMage.ArcaneBolt.Cast';
  sound_impact: string = 'Hero_SkywrathMage.ArcaneBolt.Impact';
  projectile_arcane_bolt: string =
    'particles/units/heroes/hero_skywrath_mage/skywrath_mage_arcane_bolt.vpcf';

  OnSpellStart() {
    const target = this.GetCursorTarget();
    const bolt_speed = this.GetSpecialValueFor('bolt_speed');
    const bolt_vision = this.GetSpecialValueFor('bolt_vision');

    ProjectileManager.CreateTrackingProjectile({
      Ability: this,
      EffectName: this.projectile_arcane_bolt,
      Source: this.GetCaster(),
      Target: target,
      bDodgeable: false,
      bProvidesVision: true,
      iMoveSpeed: bolt_speed,
      iVisionRadius: bolt_vision,
      iVisionTeamNumber: this.GetCaster().GetTeamNumber(),
    });
  }
}
```
Приведенные выше коды запускают снаряд в цель. Обратите внимание, что `Target` ожидает либо CDOTA_BaseNPC, либо неопределенное значение, поэтому Typescript не жалуется на это. Если он достигнет цели, он вызовет событие OnProjectileHit, поэтому давайте также воспользуемся этой функцией.

## Кодирование способности: Удар снаряда

После создания функции OnProjectileHit мы можем проверить, есть ли у нее дополнительные параметры, которые мы можем использовать. Есть два способа проверить эти дополнительные параметры:

1. Переходим к [moddota tools](https://moddota.com/api/#!/vscripts) и ищем функцию, которая показывает параметры:

![Dota Tools Parameters](/images/typescript-tutorial/dotaToolsSearchParameters.png)
2. В VSCode выделите OnProjectileHit и нажмите F12, чтобы отобразить все ссылки на OnProjectileHit. Тот, который определен в `api.generated.d.ts`, включает параметры функции:

![Generated Types Parameters](/images/typescript-tutorial/apiGeneratedExample.png)

Мы видим, что OnProjectileHit имеет цель либо CDOTA_BaseNPC, либо неопределенную, а также местоположение — вектор. Местоположение никогда не будет неопределенным и поэтому всегда будет указано, хотя оно может быть вектором (0, 0, 0).

Нам нужно убедиться, что есть цель. Если цели нет, значит, снаряд ни во что не попал и просто рассеялся (цель умерла или стала невидимой, например), а значит больше ничего делать не нужно. Мы используем `!` перед выражением для отрицательного тестирования, которое будет применяться, если `target` является ложным или неопределенным.
```
ts
@registerAbility()
export class typescript_skywrath_mage_arcane_bolt extends BaseAbility {
  sound_cast: string = 'Hero_SkywrathMage.ArcaneBolt.Cast';
  sound_impact: string = 'Hero_SkywrathMage.ArcaneBolt.Impact';
  projectile_arcane_bolt: string =
    'particles/units/heroes/hero_skywrath_mage/skywrath_mage_arcane_bolt.vpcf';

  OnSpellStart() {
    const target = this.GetCursorTarget();
    const bolt_speed = this.GetSpecialValueFor('bolt_speed');
    const bolt_vision = this.GetSpecialValueFor('bolt_vision');

    ProjectileManager.CreateTrackingProjectile({
      Ability: this,
      EffectName: this.projectile_arcane_bolt,
      Source: this.GetCaster(),
      Target: target,
      bDodgeable: false,
      bProvidesVision: true,
      iMoveSpeed: bolt_speed,
      iVisionRadius: bolt_vision,
      iVisionTeamNumber: this.GetCaster().GetTeamNumber(),
    });
  }

  OnProjectileHit(target: CDOTA_BaseNPC | undefined, location: Vector) {
    if (!target) return;
  }
}
```
Далее давайте быстро соберем оставшуюся информацию о способности из определения способности: нам нужен базовый урон, множитель интеллекта, а также радиус и длительность видения после удара:
```
ts
@registerAbility()
export class typescript_skywrath_mage_arcane_bolt extends BaseAbility {
  sound_cast: string = 'Hero_SkywrathMage.ArcaneBolt.Cast';
  sound_impact: string = 'Hero_SkywrathMage.ArcaneBolt.Impact';
  projectile_arcane_bolt: string =
    'particles/units/heroes/hero_skywrath_mage/skywrath_mage_arcane_bolt.vpcf';

  OnSpellStart() {
    const target = this.GetCursorTarget();
    const bolt_speed = this.GetSpecialValueFor('bolt_speed');
    const bolt_vision = this.GetSpecialValueFor('bolt_vision');

    ProjectileManager.CreateTrackingProjectile({
      Ability: this,
      EffectName: this.projectile_arcane_bolt,
      Source: this.GetCaster(),
      Target: target,
      bDodgeable: false,
      bProvidesVision: true,
      iMoveSpeed: bolt_speed,
      iVisionRadius: bolt_vision,
      iVisionTeamNumber: this.GetCaster().GetTeamNumber(),
    });
  }

  OnProjectileHit(target: CDOTA_BaseNPC | undefined, location: Vector) {
    if (!target) return;

    const bolt_vision = this.GetSpecialValueFor('bolt_vision');
    const bolt_damage = this.GetSpecialValueFor('bolt_damage');
    const int_multiplier = this.GetSpecialValueFor('int_multiplier');
    const vision_duration = this.GetSpecialValueFor('vision_duration');
  }
}
```
Последние две вещи, которые нам нужно сделать, это применить AddFOWViewer, который показывает область карты в тумане войны, и нанести урон цели, основанный на базовом уроне плюс множитель интеллекта заклинателя. Добавить FOW Viewer легко, поэтому давайте уберем его, добавив строку:
```
ts
AddFOWViewer(this.GetCaster().GetTeamNumber(), location, bolt_vision, vision_duration, false);
```
location — это параметр, полученный из функции, а Bolt_vision и Vision_duration были получены из определения способности.
По ущербу у нас есть небольшой расчет. Чтобы сделать этот расчет читабельным, давайте создадим переменную `damage`. Мы хотим присвоить ему базовый урон, а затем рассчитать множитель интеллекта. Звучит как хороший вариант использования инициализатора переменной `let`. Добавим следующую строку:
```
ts
let damage = bolt_damage;
```
Теперь мы хотим добавить урон поверх базового урона. Мы можем использовать оператор `+=` для суммирования значения справа со значением, уже сохраненным в `damage`, поэтому мы планируем сделать `damage += this.GetCaster().GetIntellect() * int_multiplier`. Однако по какой-то причине `GetIntellect()` не отображается как функция.

## Кодирование способности: Последний рывок

Так почему же GetIntellect() не отображается? Лучший способ сделать это — проверить, в каком классе находится GetIntellect(). [Running a search in moddota tools](https://moddota.com/api/#!/vscripts?search=GetIntellect) покажет нам, что класс GetIntellect() принадлежит `CDOTA_BaseNPC_Hero`, что имеет смысл: только герои обладают интеллектом; юниты, здания и другие объекты этого не делают. Но наш заклинатель — герой, так в чем проблема?

Если навести курсор на `this.GetCaster()`, то увидим о нем следующую информацию:

![GetCaster Properties](/images/typescript-tutorial/getCasterProperties.png)
В соответствии с типом возвращаемого значения GetCaster() возвращает CDOTA_BaseNPC. Но, как мы установили ранее, GetIntellect() применим только к классу `CDOTA_BaseNPC_Hero`. Таким образом, нам придется сообщить Typescript, что наш заклинатель является героем путем кастинга. Мы приводим, добавляя `as classname`; в данном случае `this.GetCaster() as CDOTA_BaseNPC_Hero`. Поскольку типом заклинателя теперь является герой, вы можете вызывать функции, связанные с героем, такие как `GetIntellect()`.

:::информация
Как правило, приведение типов не считается хорошей практикой, поскольку вы заставляете Typescript считать, что вы абсолютно уверены в правильности типа. Защита типов, которая будет рассмотрена в следующем руководстве, считается хорошим способом убедиться, что вы не используете тип, который его не поддерживает. Например, представьте, что произойдет, если в какой-то момент вашей пользовательской игры вы дадите эту способность крипу, у которого нет никакого показателя Интеллекта.
:::

Мы увеличим множитель интеллекта только после того, как убедимся, что заклинатель — герой; в противном случае мы будем использовать только базовый урон.
После проверки и приведения наш код должен выглядеть так:
```
ts
@registerAbility()
export class typescript_skywrath_mage_arcane_bolt extends BaseAbility {
  sound_cast: string = 'Hero_SkywrathMage.ArcaneBolt.Cast';
  sound_impact: string = 'Hero_SkywrathMage.ArcaneBolt.Impact';
  projectile_arcane_bolt: string =
    'particles/units/heroes/hero_skywrath_mage/skywrath_mage_arcane_bolt.vpcf';

  OnSpellStart() {
    const target = this.GetCursorTarget();
    const bolt_speed = this.GetSpecialValueFor('bolt_speed');
    const bolt_vision = this.GetSpecialValueFor('bolt_vision');

    ProjectileManager.CreateTrackingProjectile({
      Ability: this,
      EffectName: this.projectile_arcane_bolt,
      Source: this.GetCaster(),
      Target: target,
      bDodgeable: false,
      bProvidesVision: true,
      iMoveSpeed: bolt_speed,
      iVisionRadius: bolt_vision,
      iVisionTeamNumber: this.GetCaster().GetTeamNumber(),
    });
  }

  OnProjectileHit(target: CDOTA_BaseNPC | undefined, location: Vector) {
    if (!target) return;

    const bolt_vision = this.GetSpecialValueFor('bolt_vision');
    const bolt_damage = this.GetSpecialValueFor('bolt_damage');
    const int_multiplier = this.GetSpecialValueFor('int_multiplier');
    const vision_duration = this.GetSpecialValueFor('vision_duration');

    AddFOWViewer(this.GetCaster().GetTeamNumber(), location, bolt_vision, vision_duration, false);

    let damage = bolt_damage;
    if (this.GetCaster().IsHero()) {
      damage += (this.GetCaster() as CDOTA_BaseNPC_Hero).GetIntellect() * int_multiplier;
    }
  }
}
```
Остается только нанести урон цели. Как и CreateTrackingProjectile, ApplyDamage также вводится и автоматически отображает нам параметры. В отличие от CreateTrackingProjectile, ни одно из этих свойств не является необязательным и все они обязательны для создания правильного экземпляра повреждения. Это означает, что Typescript гарантирует, что вы присвоите всем свойствам допустимые значения.

Теперь наш код должен выглядеть так:
```
ts
@registerAbility()
export class typescript_skywrath_mage_arcane_bolt extends BaseAbility {
  sound_cast: string = 'Hero_SkywrathMage.ArcaneBolt.Cast';
  sound_impact: string = 'Hero_SkywrathMage.ArcaneBolt.Impact';
  projectile_arcane_bolt: string =
    'particles/units/heroes/hero_skywrath_mage/skywrath_mage_arcane_bolt.vpcf';

  OnSpellStart() {
    const target = this.GetCursorTarget();
    const bolt_speed = this.GetSpecialValueFor('bolt_speed');
    const bolt_vision = this.GetSpecialValueFor('bolt_vision');

    ProjectileManager.CreateTrackingProjectile({
      Ability: this,
      EffectName: this.projectile_arcane_bolt,
      Source: this.GetCaster(),
      Target: target,
      bDodgeable: false,
      bProvidesVision: true,
      iMoveSpeed: bolt_speed,
      iVisionRadius: bolt_vision,
      iVisionTeamNumber: this.GetCaster().GetTeamNumber(),
    });
  }

  OnProjectileHit(target: CDOTA_BaseNPC | undefined, location: Vector) {
    if (!target) return;

    const bolt_vision = this.GetSpecialValueFor('bolt_vision');
    const bolt_damage = this.GetSpecialValueFor('bolt_damage');
    const int_multiplier = this.GetSpecialValueFor('int_multiplier');
    const vision_duration = this.GetSpecialValueFor('vision_duration');

    AddFOWViewer(this.GetCaster().GetTeamNumber(), location, bolt_vision, vision_duration, false);

    let damage = bolt_damage;
    if (this.GetCaster().IsHero()) {
      damage += (this.GetCaster() as CDOTA_BaseNPC_Hero).GetIntellect() * int_multiplier;
    }

    ApplyDamage({
      attacker: this.GetCaster(),
      damage: damage,
      damage_type: DamageTypes.MAGICAL,
      victim: target,
      ability: this,
      damage_flags: DamageFlag.NONE,
    });
  }
}
```
Наконец, я забыл включить звуки, поэтому давайте продолжим и издадим звуки применения (`sound_cast`) и звуки удара (`sound_impact`).
Окончательный код должен выглядеть так:
```
ts
@registerAbility()
export class typescript_skywrath_mage_arcane_bolt extends BaseAbility {
  sound_cast: string = 'Hero_SkywrathMage.ArcaneBolt.Cast';
  sound_impact: string = 'Hero_SkywrathMage.ArcaneBolt.Impact';
  projectile_arcane_bolt: string =
    'particles/units/heroes/hero_skywrath_mage/skywrath_mage_arcane_bolt.vpcf';

  OnSpellStart() {
    const target = this.GetCursorTarget();

    const bolt_speed = this.GetSpecialValueFor('bolt_speed');
    const bolt_vision = this.GetSpecialValueFor('bolt_vision');

    EmitSoundOn(this.sound_cast, this.GetCaster());

    ProjectileManager.CreateTrackingProjectile({
      Ability: this,
      EffectName: this.projectile_arcane_bolt,
      Source: this.GetCaster(),
      Target: target,
      bDodgeable: false,
      bProvidesVision: true,
      iMoveSpeed: bolt_speed,
      iVisionRadius: bolt_vision,
      iVisionTeamNumber: this.GetCaster().GetTeamNumber(),
    });
  }

  OnProjectileHit(target: CDOTA_BaseNPC | undefined, location: Vector) {
    if (!target) return;

    EmitSoundOn(this.sound_impact, target);

    const bolt_vision = this.GetSpecialValueFor('bolt_vision');
    const bolt_damage = this.GetSpecialValueFor('bolt_damage');
    const int_multiplier = this.GetSpecialValueFor('int_multiplier');
    const vision_duration = this.GetSpecialValueFor('vision_duration');

    AddFOWViewer(this.GetCaster().GetTeamNumber(), location, bolt_vision, vision_duration, false);

    let damage = bolt_damage;
    if (this.GetCaster().IsHero()) {
      damage += (this.GetCaster() as CDOTA_BaseNPC_Hero).GetIntellect() * int_multiplier;
    }

    ApplyDamage({
      attacker: this.GetCaster(),
      damage: damage,
      damage_type: DamageTypes.MAGICAL,
      victim: target,
      ability: this,
      damage_flags: DamageFlag.NONE,
    });
  }
}
```

## Видеозапись

Ниже приведена короткая видеозапись, показывающая применение Чародейской стрелы Skywrath Mage в TypeScript, как описано в этом разделе.

<YouTube id="jiKNIkJ8TDE" />

## Что дальше?

В следующем уроке [Modifiers in Typescript](typescript-modifier) объясняется, как создать базовый модификатор и связать его со способностью с помощью Typescript.