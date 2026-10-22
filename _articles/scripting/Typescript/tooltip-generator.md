---
title: Генератор подсказок
author: Shush, AKA the Typescript prophet
steamId: 76561197994333648
date: 18.01.2021
---
 Генератор подсказок

Недавно завершилась разработка нового проекта под названием Tooltip Generator. Этот проект был вдохновлен идеей Ark Eaglesong, целью которой было максимально упростить добавление локализации, одновременно уменьшив вероятность совершения ошибок. Этот проект включает в себя второстепенную часть, совершенно необязательную, под названием Tooltip Codemaker, которая помогает тем, у кого уже есть рабочий аддон с большим количеством локализации.

## Генератор подсказок

Генератор подсказок создает предопределенные объекты Typescript, которые относятся к одной из трех категорий: стандартные подсказки, способности и модификаторы. Преимуществом этого является возможность написать очень простой для чтения объект с помощью кода на основе создаваемой вами группы всплывающих подсказок. Всякий раз, когда вы вносите изменения в любой из файлов и сохраняете их, генератор подсказок немедленно возьмет созданный вами код и создаст файлы локализации (например, addon_english.txt), которые игра сможет прочитать. Это можно расширить для поддержки бесконечного множества языков, а также использовать тот же код с небольшими изменениями в полях, которые вы хотите изменить.

## Подожди, Машинопись? Моя установка — lua!

Этот проект предназначен для работы как с надстройками на основе Lua, так и с Typescript. Хотя для локализации вам придется использовать Typescript специально, на остальную часть вашего аддона это совершенно не повлияет.

:::info
Most editors have plugins that add Typescript support. VSCode has built-in Typescript support and requires no plugins. In order to view Typescript syntax, make sure that your editor has Typescript support installed or enabled.
:::

## Why would I ever bother using that though?

There are a few reasons why I've started this project in the first place. I was getting frustrated by the "rules" of the KV, such as having to copy "DOTA_Tooltip_Ability_my_ability_name" over and over. I constantly mistyped "Description", and occasionally used only 2 percentages instead of 3 on "%something%%%" to show a variable with a percentage. And if I ever had a missing quote, the entire thing got broken, which is extremely annoying.

In addition, as I've developed my game, my addon file became **HUGE**. Because of the way Dota reads this file, you cannot use #base to split this into files, and some people have resorted to making a manual script that does that. It's a lot of hassle and wasted time for everyone involved.

This project attempts to solve all those problems:

- Это гарантирует, что вы никогда не допустите ошибок форматирования.
- Вы создаете только один объект для каждой способности или модификатора и заполняете для него все детали.
— Вы можете использовать предопределенные перечисления для правильного вызова свойств модификатора.
- Вы можете разделить его на любое количество файлов.
- Вы можете легко использовать свои собственные переменные для использования повторяющихся ключевых слов.
- Все языки хранятся в одном месте и правильно распределяются по соответствующим файлам.

Я советую вам хотя бы попробовать этот проект. Вы не будете разочарованы.

## Что мне нужно, чтобы использовать его?
Для работы этого проекта используются пакеты Typescript и npm. Оба из них требуют [NodeJS](https://nodejs.org/en/). Если он у вас не установлен или у вас очень старая версия, загрузите последнюю стабильную версию с сайта NodeJS и установите ее.

## Создатель кода подсказок

Когда я разрабатывал генератор подсказок, я вручную выполнял каждую локализацию, которую мне приходилось писать, и когда я закончил, я подумал про себя: почему бы мне просто не написать сценарий, который сделает это за меня?

Это привело к появлению Tooltip Codemaker. Tooltip Codemaker является полной противоположностью Tooltip Generator: вместо того, чтобы превращать код в KV локализации, он превращает KV локализации в код! Это особенно полезно, если у вас уже есть много работ по локализации, выполненных KV.

В большинстве случаев вы будете использовать этот инструмент не более одного раза, чтобы превратить текущий KV в код. Предполагается, что после этого вы продолжите создавать остальные всплывающие подсказки с помощью генератора подсказок. Если ваш аддон совершенно пустой, то он вам вообще не нужен.

Обратите внимание, что Codemaker не является и не может быть идеальным из-за особенностей определения KV локализации. Он ищет такие ключевые слова, как `_Description`, `_Lore`, `_Note` и т. д., чтобы точно определить фактическое имя способности, а затем группирует все похожие KV для этой способности. Способности, имеющие очень похожую схему наименования, могут быть ошибочно сгруппированы вместе; например, в ванильной Dota способности `ice_blast` и `ice_blast_release` были сгруппированы в одну, поскольку считалось, что `_release` является одной из специальных способностей `ice_blast`. Просто обязательно просмотрите код после запуска скрипта и исправьте ошибки вручную, если таковые имеются.
Скрипт предполагает, что все, что начинается с `Dota_Tooltip_Ability_...`, является способностью, а все, что начинается с `Dota_Tooltip_modifier_...`, является модификатором (без учета регистра). Все остальное рассматривается как стандартная подсказка. Это означает, что в зависимости от ваших KV вам, возможно, придется внести изменения в компилятор перед его запуском, чтобы он работал с файлами локализации вашего дополнения.

Вы можете найти Tooltip Codemaker в [this github repo](https://github.com/Shushishtok/tooltip-codemaker). Следуйте инструкциям по его использованию.

## Установка генератора подсказок

Чтобы использовать генератор подсказок, вам необходимо его установить. Это необходимо сделать только один раз для каждого проекта. Перейдите в корень игры вашего аддона. Для большинства проектов это будет `dota 2 beta/game/dota_addons/your_addon/`. Если вы используете символические ссылки или конфигурацию Typescript, папка с символической ссылкой, скорее всего, будет корнем вашей папки.

Нажмите на строку пути к папке, введите `cmd` и нажмите Enter. Это должно открыть командную строку для папки, в которой вы сейчас находитесь. Если вы не уверены, где находится строка пути, нажмите Alt+D, чтобы выделить ее.

В командной строке введите `npm install @shushishtok/tooltip_generator`. Установка должна занять несколько секунд, что приведет к запуску дополнительной, «окончательной» установки, которая может занять до нескольких минут. По завершении установки должно появиться сообщение об успехе и несколько предупреждений — вы можете игнорировать эти предупреждения. Оставьте командную строку открытой.
После завершения установки в корень вашего дополнения добавляется новый файл `package.json` вместе с папкой `node_modules`. В большинстве случаев вы можете полностью игнорировать эти файлы.

При установке предполагается, что ваша папка `resource` расположена в корне вашего компьютера, как и должно быть в случае со стандартными аддонами, созданными Dota Workshop. Если да, пропускайте дальше. Однако если это не так, откройте `package.json` и измените поле `"~resource": "resource",`, чтобы оно соответствовало пути от корневой папки к этой папке. Например, в конфигурациях Typescript с использованием шаблона Typescript Moddota его необходимо будет изменить на `"~resource": "game/resource",`. Сохраните файл и закройте его.

В командной строке введите `npm run init` и нажмите Enter. Это добавило несколько файлов в вашу папку `resource`, которые вы также можете игнорировать. Вы также увидите новую папку `localization`, которая является ядром всех ваших файлов локализации с кодом Typescript.

:::опасность
Следующий шаг активирует генератор подсказок, который полностью удалит все файлы локализации вашего дополнения (например, `addon_english.txt`) и заменит их вашим кодом. Обязательно сделайте резервную копию, прежде чем продолжить!
:::

## Тестирование генератора подсказок
Перейдите в папку `localization` внутри папки `resource`. В этой папке вы найдете `localizationData.ts`. Это используется в качестве образца для генератора подсказок. Откройте его и найдите следующий код:
```
ts
StandardTooltips.push({
  classname: 'Hello',
  name: 'test',
});
```
Этот объект представляет собой стандартную всплывающую подсказку, которая, как ожидается, будет преобразована в `"Hello" "test"` в KV. Давайте проверим его, чтобы проверить, работает ли он так, как ожидалось.

Используя ту же командную строку, что и раньше, запустите `npm run dev`. Если он работает так, как ожидалось, вы должны увидеть, что он просматривает несколько файлов и написал несколько локализаций:
![npm run dev](/images/tooltip-generator/npm-run-dev-cmd.png)

Проверьте файл `addon_english.txt`. Теперь у него должна быть только одна локализация, поскольку у нас есть только один тестовый объект.

:::информация
Пока в командной строке выполняется команда `npm run dev`, процесс-наблюдатель работает и ожидает изменений. Любые изменения, внесенные в файлы в папке `localization`, немедленно перекомпилируют файлы и заново создадут файлы `addon_<language>`.
:::
Вы можете заметить, что существуют и другие языковые файлы. По умолчанию включены английский, русский и стандартный китайский (SCchinese). Позже в этом руководстве мы обсудим управление языком для этих файлов. На данный момент все файлы имеют одинаковый вывод, поэтому вы можете пока их игнорировать.

Чтобы убедиться, что наблюдатель работает правильно, вернитесь к `localizationData.ts` и создайте новый объект стандартной всплывающей подсказки следующим образом:
```
ts
StandardTooltips.push({
  classname: 'watcher_test',
  name: 'This should be automatically added',
});
```
Сохраните файл. Ваша командная строка обновилась (не волнуйтесь, если вы ее пропустили). Проверьте свой `addon_english.txt` (возможно, вам придется закрыть его и открыть снова, чтобы увидеть изменения). Если теперь вы видите и вторую локализацию `"watcher_test" "This should be automatically added"`, тест пройден успешно.

:::информация
Вы можете активировать наблюдатель в любом редакторе, поддерживающем сборки npm, например VSCode, запустив в нем `npm run dev`. Sublime также имеет такую ​​поддержку, но требует короткой настройки, которую вы можете найти в файле readme [Tooltip Generator Github repo](https://github.com/Shushishtok/tooltip_generator). В любом случае, вы всегда можете использовать для этого командную строку. Обратной стороной этого является необходимость открытия окна командной строки во время работы наблюдателя, что не так весело.
:::

## Типы локализации

В базовой форме генератора локализаций каждая локализация относится к одной из трех категорий:
- Стандартные подсказки: все, что не является способностью или модификатором. Не имеет предопределенной структуры ключей и может быть чем угодно. Приведенные выше примеры представляют собой стандартные всплывающие подсказки. Это самые простые типы КВ.

- Подсказки к способностям: все способности соответствуют ключевой структуре `DOTA_Tooltip_ability_abilityname`. У них также есть предопределенные ключи-суффиксы, такие как `_Description`, `_Lore`, `_Note0` и т. д. Один объект всплывающей подсказки способности может включать в себя множество свойств, как упоминалось выше, и поддерживает все ключи-суффиксы способностей.

- Подсказки модификаторов: все модификаторы соответствуют ключевой структуре `DOTA_Tooltip_modifiername`. Обычно имя каждого модификатора начинается с `modifier_...`, но здесь это должно работать, даже если вы назвали свои модификаторы по-другому.

В моем личном моде Dota Reimagined я создал еще два типа локализации подсказок: Reimagined Tooltips и Talent Tooltips. Они отключены (закомментированы) в компиляторе, потому что не работают в стандартных режимах (даже в талантах, в моем моде эта система сделана специально). Однако их можно использовать как хороший справочник для настройки дополнительных типов локализации, если вы того пожелаете. Не стесняйтесь проверить компилятор (находится по адресу `node_modules/@shushishtok/tooltip_generator/localizationCompiler.ts`) и настроить его по своему усмотрению. Вышеупомянутых типов подсказок должно быть достаточно для большинства режимов.

## Пример стандартной подсказки

Стандартные всплывающие подсказки чрезвычайно просты и их очень легко создать. Они имеют следующие поля:
- Имя класса: строка
- Имя: строка

Имя класса — это левая часть ключевого слова, а имя — справа. Например, следующий объект всплывающей подсказки:
```
ts
StandardTooltips.push({
  classname: 'standard_tooltip_example',
  name: 'Tooltip Example',
});
```
Изготовлю следующие КВ:
```
txt
"standard_tooltip_example"      "Tooltip Example"
```
Как видите, он создает именно связь имени класса объекта, без применения какой-либо другой логики.

## Пример локализации способностей

Подсказки способностей, вероятно, содержат самые большие объекты, поскольку способности могут включать в себя множество свойств. Каждое свойство имеет ожидаемый тип (поясняется позже). Подсказки способностей имеют следующие поля:

- Имя класса способности: строка
- Имя: строка
- Описание: строка
- История: строка
- Примечания: Массив строк.
- Описание скипетра: строка
- Описание осколка: строка
- Специальные способности: массив специальных объектов способностей.

Вы можете заметить, что примечания и специальные способности представляют собой массивы. Это связано с тем, что способность может (технически) иметь неопределенное количество примечаний и специальных способностей, которые определены здесь. Начнем с простого примера способностей:
```
ts
Abilities.push({
  ability_classname: 'aghanims_shard_explosion',
  name: 'Shard Explosion',
  description: 'Fires a shard at the target point which deals damage on impact.',
  lore: "Aghanims' signature move, firing shards of arcane energy.",
});
```
Это просто и создаст следующую способность KV:
```
txt
"DOTA_Tooltip_Ability_aghanims_shard_explosion"    "Shard Explosion"
"DOTA_Tooltip_Ability_aghanims_shard_explosion_description"    "Fires a shard at the target point which deals damage on impact."
"DOTA_Tooltip_Ability_aghanims_shard_explosion_Lore"    "Aghanims' signature move, firing shards of arcane energy."
```
Довольно изящно, правда? Добавим к способности эффекты скипетра и осколков:
```
ts
Abilities.push({
  ability_classname: 'aghanims_shard_explosion',
  name: 'Shard Explosion',
  description: 'Fires a shard at the target point which deals damage to all enemies on impact.',
  lore: "Aghanims' signature move, firing shards of arcane energy.",
  scepter_description: 'Increases damage and explosion range.',
  shard_description: 'Decreases cooldown of the ability.',
});
```
После сохранения в локализацию сразу добавляются:
```
txt
"DOTA_Tooltip_Ability_aghanims_shard_explosion"    "Shard Explosion"
"DOTA_Tooltip_Ability_aghanims_shard_explosion_description"    "Fires a shard at the target point which deals damage to all enemies on impact."
"DOTA_Tooltip_Ability_aghanims_shard_explosion_Lore"    "Aghanims' signature move, firing shards of arcane energy."
"DOTA_Tooltip_Ability_aghanims_shard_explosion_scepter_description"    "Increases damage and explosion range."
"DOTA_Tooltip_Ability_aghanims_shard_explosion_shard_description"    "Decreases cooldown of the ability."
```
Возможно, вы заметили, что я не использовал для этой способности никаких чисел или специальных переменных, поэтому давайте обсудим это. Большинство полей способностей поддерживают использование переменных, которые можно заменять в игре числами в зависимости от значения специальной способности. В KV это обычно делается в формате `%something%`, где `something` отражает особое значение способности. Использование процентов в качестве разделителя всегда казалось мне ошибочным. Вместо этого мы используем разделитель `{something}`. Переменные, определенные таким образом, будут правильно обработаны в формате, ожидаемом KV. Преимуществом этого является добавление к процентам: если вы хотите отобразить `20%` в игре, где `20` — ваша особая способность, все, что вам нужно сделать, это `{something}%`. Давайте приведем пример этого в наших возможностях:
```
ts
Abilities.push({
  ability_classname: 'aghanims_shard_explosion',
  name: 'Shard Explosion',
  description:
    'Fires a shard at the target point which deals {damage} damage to all enemies on impact.',
  lore: "Aghanims' signature move, firing shards of arcane energy.",
  scepter_description:
    'Increases damage by {scepter_damage} and explosion range by {scepter_aoe_bonus}.',
  shard_description: 'Decreases cooldown of the ability by {shard_cd_pct}%.',
});
```
Это переводится в правильный KV:
```
txt
"DOTA_Tooltip_Ability_aghanims_shard_explosion"    "Shard Explosion"
"DOTA_Tooltip_Ability_aghanims_shard_explosion_description"    "Fires a shard at the target point which deals %damage% damage to all enemies on impact."
"DOTA_Tooltip_Ability_aghanims_shard_explosion_Lore"    "Aghanims' signature move, firing shards of arcane energy."
"DOTA_Tooltip_Ability_aghanims_shard_explosion_scepter_description"    "Increases damage by %scepter_damage% and explosion range by %scepter_aoe_bonus%."
"DOTA_Tooltip_Ability_aghanims_shard_explosion_shard_description"    "Decreases cooldown of the ability by %shard_cd_pct%%%."
```
Наконец, давайте поговорим о заметках и специальных способностях. Примечания представляют собой массивы строк, каждая из которых отражает примечание о способности. Компилятор правильно скомпилирует их в Note0, Note1, Note2 и т. д., которые ожидает игра.

Специальные способности немного сложнее. Это массивы специальных объектов способностей. Каждый объект ожидает, по крайней мере, специального имени способности и ее внутриигрового текста, например «shard_damage» и «DAMAGE». Он не ожидает ничего, кроме текста. Однако он поддерживает два необязательных поля:

- Процент
- Статистика предмета

Оба этих значения являются логическими значениями, которые по умолчанию имеют значение false, если они опущены, и могут быть включены только в том случае, если вы хотите их специально включить. Поле процентов добавляет `%` в начало текста, а статистика элемента вместо этого добавляет `+Наконец, давайте поговорим о заметках и специальных способностях. Примечания представляют собой массивы строк, каждая из которых отражает примечание о способности. Компилятор правильно скомпилирует их в Note0, Note1, Note2 и т. д., которые ожидает игра.

Специальные способности немного сложнее. Это массивы специальных объектов способностей. Каждый объект ожидает, по крайней мере, специального имени способности и ее внутриигрового текста, например «shard_damage» и «DAMAGE». Он не ожидает ничего, кроме текста. Однако он поддерживает два необязательных поля:

- Процент
- Статистика предмета

Оба этих значения являются логическими значениями, которые по умолчанию имеют значение false, если они опущены, и могут быть включены только в том случае, если вы хотите их специально включить. Поле процентов добавляет `%` в начало текста, а статистика элемента вместо этого добавляет . Давайте создадим полную подсказку для способностей, интегрировав ее в наш пример выше:
```
ts
Abilities.push({
  ability_classname: 'aghanims_shard_explosion',
  name: 'Shard Explosion',
  description:
    'Fires a shard at the target point which deals {damage} damage to all enemies on impact.',
  lore: "Aghanims' signature move, firing shards of arcane energy.",
  scepter_description:
    'Increases damage by {scepter_damage} and explosion range by {scepter_aoe_bonus}.',
  shard_description: 'Decreases cooldown of the ability by {shard_cd_pct}%.',
  notes: [
    'The projectile moves at {projectile_speed} speed.',
    'Despite the visual effect, all enemies in range immediately take damage upon impact.',
    'Can be disjointed.',
  ],

  ability_specials: [
    {
      ability_special: 'damage',
      text: 'DAMAGE',
    },

    {
      ability_special: 'radius',
      text: 'EXPLOSION RADIUS',
    },

    {
      ability_special: 'scepter_cd_reduction',
      text: 'COOLDOWN REDUCTION',
      percentage: true,
    },
  ],
});
```
Объект «Подсказка способностей» выглядит больше из-за пробелов между каждым специальным объектом способности, но, честно говоря, это мое собственное предпочтение в кодировании — пока вы придерживаетесь структуры объектов внутри массива, он все равно будет обрабатывать информацию так же хорошо.

Это обрабатывается до финального KV, который игра прекрасно читает:
```
txt
"DOTA_Tooltip_Ability_aghanims_shard_explosion"    "Shard Explosion"
"DOTA_Tooltip_Ability_aghanims_shard_explosion_description"    "Fires a shard at the target point which deals %damage% damage to all enemies on impact."
"DOTA_Tooltip_Ability_aghanims_shard_explosion_Lore"    "Aghanims' signature move, firing shards of arcane energy."
"DOTA_Tooltip_Ability_aghanims_shard_explosion_Note0"    "The projectile moves at %projectile_speed% speed."
"DOTA_Tooltip_Ability_aghanims_shard_explosion_Note1"    "Despite the visual effect, all enemies in range immediately take damage upon impact."
"DOTA_Tooltip_Ability_aghanims_shard_explosion_Note2"    "Can be disjointed."
"DOTA_Tooltip_Ability_aghanims_shard_explosion_scepter_description"    "Increases damage by %scepter_damage% and explosion range by %scepter_aoe_bonus%."
"DOTA_Tooltip_Ability_aghanims_shard_explosion_shard_description"    "Decreases cooldown of the ability by %shard_cd_pct%%%."
"DOTA_Tooltip_Ability_aghanims_shard_explosion_damage"    "DAMAGE"
"DOTA_Tooltip_Ability_aghanims_shard_explosion_radius"    "EXPLOSION RADIUS"
"DOTA_Tooltip_Ability_aghanims_shard_explosion_scepter_cd_reduction"    "%COOLDOWN REDUCTION"
```

## Пример локализации модификатора

Последняя группа — это подсказка модификатора. В отличие от способностей, модификаторы имеют только имя класса, имя и описание. Однако у них также есть собственный элемент: они могут представлять динамические значения, используя свойства-модификаторы. Я всегда использовал их неправильно, поэтому предпринял дополнительный шаг, чтобы это исправить. А пока давайте создадим простой модификатор:
```
ts
Modifiers.push({
  modifier_classname: 'modifier_greater_power',
  name: 'Greater Power',
  description: 'Increases your base damage and your move speed.',
});
```
Он очень быстро перерабатывается в следующий KV:
```
txt
"DOTA_Tooltip_modifier_greater_power"    "Greater Power"
"DOTA_Tooltip_modifier_greater_power_description"    "Increases your base damage and your move speed."
```
На этот раз мы хотим также включить точный бонус к базовому урону и бонус к скорости передвижения, которые вы получаете от этого модификатора. Предполагая, что вы увеличиваете базовый урон с помощью свойства-модификатора `MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE`, мы можем использовать перечисление для его использования. Обратите внимание: чтобы иметь возможность вставлять переменные в строки, нам нужно использовать интерполяцию строк, которая осуществляется путем заключения строки в обратные кавычки (если это неясно, см. пример). Кроме того, мы должны придерживаться следующей структуры: `{${LocalizationModifierProperty.SOME_PROPERTY}}`. При использовании строковой интерполяции `${variable}` преобразуется во время компиляции в фактическое значение переменной. Это позволяет нам использовать перечисления для этих свойств модификаторов.

:::информация
При вызове перечислений вам нужно указать только имя свойства, а не всю строку. Например, `MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE` можно вызвать, просто набрав `PREATTACK_BONUS_DAMAGE`. Компилятор по-прежнему будет правильно обрабатывать его в той форме, которую ожидает игра.
:::

Давайте улучшим приведенный выше пример с помощью динамических переменных. Бонус к скорости передвижения представляет собой процентный бонус, поэтому мы также добавим к нему знак `%`.
```
ts
Modifiers.push({
  modifier_classname: 'modifier_greater_power',
  name: 'Greater Power',
  description: `Increases your base damage by {${LocalizationModifierProperty.PREATTACK_BONUS_DAMAGE}} and your move speed by {${LocalizationModifierProperty.MOVESPEED_BONUS_PERCENTAGE}}%.`,
});
```
Эти значения являются перечислениями, поэтому компилятор следит за тем, чтобы они были введены правильно, и, если они окружены `{}`, они должны быть правильно обработаны. Это преобразуется в KV следующим образом:
```
txt
"DOTA_Tooltip_modifier_greater_power"    "Greater Power"
"DOTA_Tooltip_modifier_greater_power_description"    "Increases your base damage by %dMODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE% and your move speed by %dMODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE%%%."
```
Это работает для всех свойств модификатора.

:::информация
Свойство принимает префикс `d` (целое число). Если вы хотите вместо этого использовать префикс `f` (с плавающей запятой), вы можете вызвать его с помощью `{f${LocalizationModifierProperty.PREATTACK_BONUS_DAMAGE}}`. На данный момент `f` является единственным дополнительным поддерживаемым ключевым словом.
:::

## Языковой контроль

Каждая подсказка может иметь разные значения в зависимости от языка клиента, поэтому у нас есть много файлов `addon_<language>.txt`, по одному для каждого языка. Разные моды имеют разную языковую поддержку в зависимости от основного языка режима и дополнительных переводов. Это привело к необходимости языкового контроля.
В верхней части файла .TS вы можете увидеть импорт для `Language`. Это перечисление определяет, какие языки включены; каждый включенный язык создаст свой файл `addon_<language>.txt`. По умолчанию включены английский, русский и стандартный китайский языки. Кроме того, также включен «язык» `None` — он используется только для компиляции и не должен отключаться или использоваться.

Чтобы включить или отключить язык, перейдите к `/game/resource/languages.ts`. Внутри него вы должны увидеть `export enum Language`, в котором есть список языков. Просто прокомментируйте или раскомментируйте язык, чтобы отключить или включить его. Его необходимо скомпилировать и обновить, чтобы изменения вступили в силу, поэтому перезапустите терминал с помощью `npm run dev`, и вы должны увидеть добавленные/удаленные языки в выводе.

## Пример переопределения языка

По умолчанию все языковые файлы будут иметь одинаковые KV. Однако вы можете переопределить поле определенного языка, чтобы компилятор использовал другую строку для этого языка. Это делается с помощью свойства `language_override`, которое доступно всем объектам всплывающей подсказки. Давайте приведем пример использования переопределения языка:
```
ts
StandardTooltips.push({
  classname: 'standard_tooltip_example',
  name: 'Tooltip Example',
  language_overrides: [
    {
      language: Language.Russian,
      name_override: 'Пример всплывающей подсказки',
    },
  ],
});
```
Как показано в примере, мы переопределяем поле `name` имени класса `standard_tooltip_example` другим текстом. Это сделано специально для русского языка с помощью объекта переопределения языка для Стандартной подсказки. Дополнительные объекты можно добавить для каждого языка, для которого мы хотим иметь отдельный текст. В результате получаются следующие KV:

::: кодовая группа
```
[English]
"standard_tooltip_example"    "Tooltip Example"
```

```
[Russian]
"standard_tooltip_example"    "Пример всплывающей подсказки"
```

```
[Standard Chinese]
"standard_tooltip_example"    "Tooltip Example"
```

:::

If you checked the Standard Chinese KV, you probably saw that it retains its English language. Because it was not overridden, it still used the "main" value provided by the `name` property of the Standard Tooltip object.

## Splitting Files and Folders

One of the biggest annoyances with the localization files is the inability to split them to different files without using a script. The tooltip generator allows you to split your tooltips to as many files and folders as you need, as long as those files and folders are created inside the `resource/localization` directory.

For a tooltip file to also properly be watched and processed, it must have the following code:

```
ts
import {
  AbilityLocalization,
  Language,
  LocalizationData,
  ModifierLocalization,
  StandardLocalization,
} from '~generator/localizationInterfaces';

export function GenerateLocalizationData(): LocalizationData {
  // This section can be safely ignored, as it is only logic.
  //#region Localization logic
  // Arrays
  const Abilities: Array<AbilityLocalization> = new Array<AbilityLocalization>();
  const Modifiers: Array<ModifierLocalization> = new Array<ModifierLocalization>();
  const StandardTooltips: Array<StandardLocalization> = new Array<StandardLocalization>();

  // Create object of arrays
  const localization_info: LocalizationData = {
    AbilityArray: Abilities,
    ModifierArray: Modifiers,
    StandardArray: StandardTooltips,
  };
  //#endregion

  // Enter localization data below!

  // Return data to compiler
  return localization_info;
}
```
Не имеет значения, какое у него имя, главное, чтобы оно имело расширение `.ts`. Подсказки располагаются между комментарием `Enter localization data below!` и комментарием `Return data to compiler`.

:::информация
Я рекомендую сделать из него фрагмент, чтобы можно было легко создавать такую подпись для каждого создаваемого файла.
Вы можете скопировать его из файла примера `localizationData.ts` для каждого файла, который вам нужен.
:::

## Dota Reimagined в качестве примеров (таланты, обновленные эффекты)

Вы можете проверить [Dota Reimagined's github](https://github.com/Shushishtok/dota-reimagined/tree/master/game/resource/localization), для которого я изначально разработал этот проект, чтобы увидеть, как он выглядит с точки зрения папок и файлов. У каждого героя есть свой файл в папке `heroes`, а у каждого предмета — свой файл в папке `items`. В папке `generic` есть файлы вроде `addon_game_mode`.
Кроме того, в файлах героев используются переосмысленные эффекты и таланты, которые также преобразуются в уникальные KV, которые моя игра специально разработала для поиска в панораме. Вы можете проверить, как именно это работает, и внести свои собственные изменения в компилятор для поддержки ваших уникальных KV.