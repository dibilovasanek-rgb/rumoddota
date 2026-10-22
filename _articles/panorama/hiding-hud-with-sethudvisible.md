---
title: Скрытие HUD с помощью SetHUDVisible
author: Noya
steamId: '76561198046984233'
date: 07.02.2015
---
ытие HUD с помощью SetHUDVisible

:::опасность
Это руководство устарело. Сейчас рекомендуется использовать Panorama для манипуляций с пользовательским интерфейсом.

**Пример:**
```
js
GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_TIMEOFDAY, false);
```

:::

There's a function currently missing from the API page: SetHUDVisible(int, bool) which I want to document here.

Credits to BMD for this list:

| HUD Component                           | int value |
| --------------------------------------- | --------- |
| DOTA_HUD_VISIBILITY_TOP_TIMEOFDAY       | 0         |
| DOTA_HUD_VISIBILITY_TOP_HEROES          | 1         |
| DOTA_HUD_VISIBILITY_TOP_SCOREBOARD | 2 |
| DOTA_HUD_VISIBILITY_ACTION_PANEL | 3 |
| DOTA_HUD_VISIBILITY_ACTION_MINIMAP | 4 |
| DOTA_HUD_VISIBILITY_INVENTORY_PANEL | 5 |
| DOTA_HUD_VISIBILITY_INVENTORY_SHOP | 6 |
| DOTA_HUD_VISIBILITY_INVENTORY_ITEMS | 7 |
| DOTA_HUD_VISIBILITY_INVENTORY_QUICKBUY | 8 |
| DOTA_HUD_VISIBILITY_INVENTORY_COURIER | 9 |
| DOTA_HUD_VISIBILITY_INVENTORY_PROTECT | 10 |
| DOTA_HUD_VISIBILITY_INVENTORY_GOLD | 11 |
| DOTA_HUD_VISIBILITY_SHOP_SUGGESTEDITEMS | 12 |
Обратите внимание, что изменение его один раз не позволит вам изменить его обратно без перезапуска инструментов, поэтому его не следует использовать для управления HUD после загрузки игры.

**Использование**

Где-то в событии начала игры я использовал `player_connect_full`.
```
lua
mode = GameRules:GetGameModeEntity()
mode:SetHUDVisible(hud_component_value, false)
```
