---
title: Предварительное кэширование, исправление и предотвращение проблем
author: Noya
steamId: '76561198046984233'
date: 07.02.2015
---
е, исправление и предотвращение проблем

При создании юнитов через KV и Lua вам, возможно, придется столкнуться с дилеммой прекеша. Это также относится к частицам и звукам. Я кратко говорил об этом в [precache section of the datadriven breakdown](/abilities/ability-keyvalues), но здесь у меня есть простой пример, который поможет понять суть вопроса.

Итак, если вы видите невыбираемую оранжевую ОШИБКУ в качестве модели юнита, значит, у вас проблема с моделью предварительного кэширования:

Недостающие частицы обозначены красными крестиками:

<Gfycat id="SinfulShamefulBittern" />

**Как это исправить и избежать?**
Во-первых, управляемое данными действие `"SpawnUnit"` всегда будет предварительно кэшировать пользовательский модуль UnitName и любые косметические элементы, которые вы к нему прикрепили. Например, в этом [Avatar of Vengeance ability](https://github.com/MNoya/DotaCraft/blob/master/scripts/npc/abilities/warden_avatar_of_vengeance.txt) я создам Призрака с некоторыми шляпами:
```
"SpawnUnit"
{
    "UnitName"	"npc_avatar_of_vengeance"
    "UnitCount"	"1"
    "SpawnRadius"	"100"
    "Duration"	"%duration"
    "Target"		"CASTER"
    "OnSpawn"
    {
	"FireSound"
	{
	    "EffectName" "Hero_Spectre.Haunt"
	    "Target"	 "CASTER"
	}
    }
}
```
Теперь будет много-много раз, что SpawnUnit не сработает, и вам придется создавать юниты в lua, используя функцию `CreateUnitByName`.

Если бы я пошел дальше и просто создал свой модуль в Lua (упрощенный пример [this script](https://github.com/MNoya/DotaCraft/blob/master/scripts/vscripts/heroes/warden/avatar_of_vengeance.lua#L35)):
```
lua
function SpiritOfVengeanceSpawn( event )
    local caster = event.caster
    local unit_name = "npc_spirit_of_vengeance"
    local origin = caster:GetAbsOrigin()
    local spirit = CreateUnitByName(unit_name, origin, true, caster, caster, caster:GetTeamNumber())
end
```
Без какого-либо предыдущего предварительного кэширования я получу что-то вроде модели ERROR, как раньше, или, если я запускаю инструменты не в первый раз (потому что после первого запуска он пытается сохранить некоторые модели для хранения в кеше), что-то вроде этого:

Да, это плохо, вот как это исправить:

**Всегда добавляйте управляемый данными блок предварительного кэширования со всеми моделями, звуками и частицами, которые могут использовать ваши способности**

В этом случае я предварительно кэширую все модели и окружающие частицы, которые использую, внутри основной способности, управляемой данными.
```
"precache"
{
	"soundfile"	"soundevents/game_sounds_heroes/game_sounds_spectre.vsndevts"
	"model"		"models/heroes/vengeful/vengeful.vmdl"
	"model"		"models/items/vengeful/vengeful_immortal_weapon/vengeful_immortal_weapon.vmdl"
	"model"		"models/items/vengefulspirit/fallenprincess_shoulders/fallenprincess_shoulders.vmdl"
	"model"		"models/items/vengefulspirit/fallenprincess_legs/fallenprincess_legs.vmdl"
	"model"		"models/items/vengefulspirit/fallenprincess_head/fallenprincess_head.vmdl"
	"particle"      "particles/units/heroes/hero_vengeful/vengeful_ambient.vpcf"
	"particle"      "particles/econ/items/vengeful/vengeful_wing_fallenprincess/venge_wingsoffallenprincess_ambient.vpcf"
}
```
Теперь все модели будут загружаться правильно.

И последнее замечание: некоторые косметические средства, которые вы, возможно, захотите использовать, содержат свои собственные частицы, и их названия сложно узнать. В первой гифке (тот, что с красными крестами) мне не хватало эффекта частиц крыльев для Fallprincess_shoulders. В этом случае вы также можете найти частицы, используемые косметическим средством, в его определении [`item_game.txt`](https://raw.githubusercontent.com/dotabuff/d2vpk/master/dota_pak01/scripts/items/items_game.txt):

<br />

Теперь после добавления этой частицы (которую я только что нашел в браузере ресурсов и скопировал путь к `.vpcf`) все отображается правильно:

<Gfycat id="SphericalHonorableChevrotain" />