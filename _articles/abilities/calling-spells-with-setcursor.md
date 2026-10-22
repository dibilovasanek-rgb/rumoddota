---
title: Вызов заклинаний с помощью SetCursor
author: tte
steamId: '76561198003060848'
date: 10.01.2015
---
в заклинаний с помощью SetCursor

`CDotaBaseAbility:OnSpellStart` в сочетании с `CDotaBaseNPC:SetCursorCastTarget` и `CDOTABaseNPC:SetCursorPosition` используются для «вызова» заклинаний.

В частности, это мощный способ взаимодействия с заклинаниями Valve. Это позволяет вам:

- Активировать скрытые способности
- Игнорировать ограничения поворота
- Игнорировать точку применения или время восстановления.
- Игнорируйте любую другую ерунду, связанную с формальными методами произнесения заклинаний.
Это легко использовать, легко настраивать и легко думать. Вот пример применения Tether к скрытому манекену, активированному заклинанием, управляемым данными:
```
lua
local tether = caster:FindAbilityByName("trollsandelves_hidden_tether")
tether:SetLevel(4)
tether:EndCooldown()
caster:SetCursorCastTarget(dummy)
tether:OnSpellStart()
```
