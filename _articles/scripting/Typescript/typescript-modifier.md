---
title: Модификаторы в Typescript
author: Shush
steamId: 76561197994333648
date: 07.03.2021
---
 Модификаторы в Typescript

Модификаторы — чрезвычайно важная часть практически любой пользовательской игры Dota. Они позволяют вам изменять определенные свойства вашего героя, наносить ему постепенный урон или накладывать на него различные эффекты. Как и способности, мы также создадим их в Typescript.

Мы будем использовать простой пример, который должен охватывать множество общих концепций модификаторов. В качестве примера можно привести Древнюю печать Скайраса, способность, которая просто применяет модификатор к врагу. Модификатор применяет к врагу состояние «Безмолвие» и снижает его свойство сопротивления магии на процент.

:::информация
Для простоты предположим, что у способности нет улучшений осколков или талантов.
:::

## Определение способности
Для начала давайте определим способность, к которой применяется модификатор.
Начнем с КВ, это просто. Откройте `/game/scripts/npc/npc_abilities_custom.txt` и скопируйте следующее содержимое в ключ `"DOTAAbilities"`.
```
//=================================================================================================================
// Skywrath Mage: Ancient Seal
//=================================================================================================================
"typescript_skywrath_mage_ancient_seal"
{
    // General
    //-------------------------------------------------------------------------------------------------------------
    "BaseClass"             		"ability_lua"
    "AbilityTextureName"			"skywrath_mage_ancient_seal"
    "ScriptFile"				    "abilities/typescript_skywrath_mage_ancient_seal"
    "AbilityBehavior"				"DOTA_ABILITY_BEHAVIOR_UNIT_TARGET"
    "AbilityUnitTargetTeam"			"DOTA_UNIT_TARGET_TEAM_BOTH"
    "AbilityUnitTargetType"			"DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC"
    "SpellImmunityType"				"SPELL_IMMUNITY_ENEMIES_NO"
    "SpellDispellableType"			"SPELL_DISPELLABLE_YES"
    "AbilitySound"					"Hero_SkywrathMage.AncientSeal.Target"

    // Casting
    //-------------------------------------------------------------------------------------------------------------
    "AbilityCastRange"				"700 750 800 850"
    "AbilityCastPoint"				"0.1 0.1 0.1 0.1"

    // Time
    //-------------------------------------------------------------------------------------------------------------
    "AbilityCooldown"				"14"

    // Cost
    //-------------------------------------------------------------------------------------------------------------
    "AbilityManaCost"				"80 90 100 110"

    // Special
    //-------------------------------------------------------------------------------------------------------------
    "AbilityValues"
    {
      "resist_debuff"			"30 35 40 45"
      "seal_duration"			"3.0 4.0 5.0 6.0"
    }
    "AbilityCastAnimation"		"ACT_DOTA_CAST_ABILITY_3"
}
```
Как указывает `ScriptFile`, файл lua должен находиться в `vscripts/abilities/`. Для этого мы создадим наш файл TS в `src/vscripts/abilities/`, где он будет соответствующим образом маршрутизирован при компиляции. Создайте файл `typescript_skywrath_mage_ancient_seal.ts` и откройте его.

## Кодирование способностей

Сама способность очень проста, поскольку все, что она делает, — это применяет модификатор к цели. Для простоты давайте решим, что модификатор будет называться `modifier_typescript_ancient_seal`. Ниже приводится способность:
```
ts
import { BaseAbility, registerAbility } from '../lib/dota_ts_adapter';

@registerAbility()
export class typescript_skywrath_mage_ancient_seal extends BaseAbility {
  sound_cast = 'Hero_SkywrathMage.AncientSeal.Target';

  OnSpellStart() {
    // Special values
    const seal_duration = this.GetSpecialValueFor('seal_duration');

    // Fetch target
    const target = this.GetCursorTarget()!;

    // Play sound
    target.EmitSound(this.sound_cast);

    // Add modifier
    target.AddNewModifier(this.GetCaster(), this, 'modifier_typescript_ancient_seal', {
      duration: seal_duration,
    });
  }
}
```
Большой! При этом модификатор применяется к цели. Заклинатель способности, обозначенный `this.GetCaster()` в первом аргументе, назначается заклинателем, связанным с модификатором, а сама способность, обозначаемая `this` во втором аргументе, назначается как связанная способность модификатора. Мы можем получить их, вызвав `this.GetCaster()` и `this.GetAbility()` соответственно из модификатора.

:::информация
Модуль, к которому мы добавляем модификатор, в данном случае наш `target`, становится родительским для модификатора. Мы можем получить его из модификатора с помощью `this.GetParent()`. Это может быть полезно в различных случаях, например, при издании звука, нанесении ему урона или размещении частиц в его текущем местоположении.
:::

Теперь давайте создадим модификатор.

## Создание модификатора
Эта часть полностью зависит от вас и ваших организационных предпочтений: некоторые предпочитают добавлять модификатор в отдельный файл, а некоторые предпочитают иметь возможность и связанные с ней модификаторы в одном файле. You could place the modifier file inside `src/vscripts/modifiers`, for instance. In order to keep the guide simple, let's make the modifier in the same file.

Модификаторы очень похожи на способности в TS. Модификаторы также являются классом. Создаем модификатор следующей структуры:```
ts
@registerModifier()
export class modifier_typescript_ancient_seal extends BaseModifier {}
```
Как видите, это очень похоже на способность, заменяющую `@registerAbility()` на `@registerModifier()`, а расширение `BaseAbility` на `BaseModifier`.
Обратите внимание, что `@registerModifier()` позаботится о LinkLuaModifier за вас, поэтому вам не нужно вызывать его для модификаторов TS.

## Вызовы модификаторов проверки типов

Прежде чем мы продолжим, нам нужно связать способность с модификатором, что обеспечит регистрацию модификатора. Кроме того, вместо того, чтобы использовать строку для обозначения модификатора, мы свяжем имя класса.

Для этого просто удалите кавычки вокруг имени модификатора, а затем добавьте к нему `.name`. См. ниже код до и после связывания класса:

::: кодовая группа

```
ts [Before]
// Add modifier
target.AddNewModifier(this.GetCaster(), this, 'modifier_typescript_ancient_seal', {
  duration: seal_duration,
});
```

```
ts [After]
// Add modifier
target.AddNewModifier(this.GetCaster(), this, modifier_typescript_ancient_seal.name, {
  duration: seal_duration,
});
```

:::

This results at the exact name of the modifier as a string, which is enforced by Typescript.

:::info
If your modifier is in another file, you'll have to import it first before you can link it in the above fashion.
:::

## Coding The Modifier

Хорошо. Давайте установим и применим свойства модификатора, такие как эффект частиц. Кроме того, давайте установим некоторые полезные свойства с помощью функций-модификаторов.
Кроме того, это мой личный выбор, но я обычно помещаю специальные способности в качестве свойства класса, чтобы их можно было легко использовать повсюду в модификаторе.
```
ts
@registerModifier()
export class modifier_typescript_ancient_seal extends BaseModifier {
  particle_seal =
    'particles/units/heroes/hero_skywrath_mage/skywrath_mage_ancient_seal_debuff.vpcf';
  resist_debuff?: number;

  // When set to false, shows the modifier icon on the HUD. Otherwise, the modifier is hidden.
  IsHidden() {
    return false;
  }

  // When set to true, the outer circle of the modifier is red, indicating that the modifier is a debuff. Otherwise, the outer circle is green.
  IsDebuff() {
    return true;
  }

  // When set to true, the modifier can be purged by basic dispels.
  IsPurgable() {
    return true;
  }

  // Event call that is triggered when the modifier is created and attached to a unit.
  OnCreated() {
    // Get the ability and fetch ability specials from it
    const ability = this.GetAbility();
    if (ability) {
      this.resist_debuff = ability.GetSpecialValueFor('resist_debuff');
    }

    // Add particle effect
    const particle = ParticleManager.CreateParticle(
      this.particle_seal,
      ParticleAttachment.OVERHEAD_FOLLOW,
      this.GetParent(),
    );
    ParticleManager.SetParticleControlEnt(
      particle,
      1,
      this.GetParent(),
      ParticleAttachment.ABSORIGIN_FOLLOW,
      'hitloc',
      this.GetParent().GetAbsOrigin(),
      true,
    );
    this.AddParticle(particle, false, false, -1, false, true);
  }
}
```
Итак, модификатор определен, но основные его части еще не определены: безмолвие и снижение сопротивления магии. Давайте сделаем это дальше.

## Штаты

Функция `CheckState`, которую имеют модификаторы, вызывается в каждом кадре и устанавливает состояние родительского элемента на основе его модификаторов. Функция получает группу состояний и связывает каждое из них с логическим значением, которое решает, следует ли применять состояние.

Нам нужно только заставить цель замолчать, так что это единственное состояние, которое нам здесь нужно. Добавьте в модификатор следующее:
```
ts
CheckState() {
    return {[ModifierState.SILENCED]: true}
}
```
Обратите внимание на синтаксис: фигурные скобки начинают [Record](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeystype) состояний, каждому из которых присвоено логическое значение. Если у вас несколько состояний — логические пары, разделяйте каждую пару запятой.

## Свойства модификатора

`DeclareFunctions` объявляет, какие свойства функции включены в этот модификатор. Поскольку нам нужно свойство, изменяющее магическое сопротивление, назовем его здесь:
```
ts
DeclareFunctions() {
    return [ModifierFunction.MAGICAL_RESISTANCE_BONUS];
}
```
В отличие от состояний, DeclareFunctions ожидает массив функций-модификаторов. Если у вас несколько функций-модификаторов, разделите их запятой.

:::информация
При наведении курсора на имя функции-модификатора (например, `MAGICAL_RESISTANCE_BONUS`) появляется всплывающая подсказка, показывающая имя вызова функции связанного свойства. Просто скопируйте функцию в модификатор. Здесь также есть автоматическое заполнение, если вы предпочитаете делать это вручную.
:::

Теперь, когда мы объявили бонус сопротивления магии, давайте вернем отрицательный бонус, чтобы враг получил отрицательный бонус сопротивления магии от этого модификатора:
```
ts
GetModifierMagicalResistanceBonus() {
    return this.resist_debuff ?? 0;
}
```
Обратите внимание, что эта функция ожидает число — все остальное не принимается.

:::информация
`this.resist_debuff` — это предположительно число, полученное из специального значения способности. Однако, если по какой-то причине `this.resist_debuff` не инициализирован, он будет неопределенным, что не принимается этой функцией. При использовании [Nullish Coalescing](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#nullish-coalescing) значение по умолчанию равно 0, если `this.resist_debuff` не определен.
:::

Вот и все! Простой модификатор состоит из набора простых строк, которые для нас проверяются по типу.

## Что дальше?
Далее вы можете узнать о событиях в следующем уроке: [Events and Timers in Typescript](typescript-events).