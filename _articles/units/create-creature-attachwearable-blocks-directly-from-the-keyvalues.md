---
title: Создавайте блоки Creature AttachWearable непосредственно из значений ключей.
author: Noya
steamId: '76561198046984233'
date: 15.12.2015
---
те блоки Creature AttachWearable непосредственно из значений ключей.

Для тех, кто все еще нажимает Ctrl+F и копирует из [items_game.txt](https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/scripts/items/items_game.txt), я предлагаю лучшее решение:

Сначала «сопоставьте» допустимые носимые устройства из items_game:
```
lua
function MapWearables()
    GameRules.items = LoadKeyValues("scripts/items/items_game.txt")['items']
    GameRules.modelmap = {}
    for k,v in pairs(GameRules.items) do
        if v.name and v.prefab ~= "loading_screen" then
            GameRules.modelmap[v.name] = k
        end
    end
end
```
Тогда есть 2 варианта:

- Сгенерировать набор по умолчанию для имени героя (внутренний `npc_dota_hero_name`)
- Создайте набор пакетов, вы можете использовать этот список для имен наборов: https://dota2.gamepedia.com/Equipment

**Использование**

- Для наборов героев по умолчанию запустите `GenerateDefaultBlock(hero_name)`.
- Для создания набора пакетов выполните: `GenerateBundleBlock(set_name)`.
**Код с использованием 4-х пробельных отступов**
```
lua
function GenerateDefaultBlock( heroName )
    print("    \"Creature\"")
    print("    {")
    print("        \"AttachWearables\" ".."// Default "..heroName)
    print("        {")
    local defCount = 1
    for code,values in pairs(GameRules.items) do
        if values.name and values.prefab == "default_item" and values.used_by_heroes then
            for k,v in pairs(values.used_by_heroes) do
                if k == heroName then
                    local itemID = GameRules.modelmap[values.name]
                    GenerateItemDefLine( defCount, itemID, values.name )
                    defCount = defCount + 1
                end
            end
        end
    end
    print("        }")
    print("    }")
end

function GenerateBundleBlock( setname )
    local bundle = {}
    for code,values in pairs(GameRules.items) do
        if values.name and values.name == setname and values.prefab and values.prefab == "bundle" then
            bundle = values.bundle
        end
    end

    print("    \"Creature\"")
    print("    {")
    print("        \"AttachWearables\" ".."// "..setname)
    print("        {")
    local wearableCount = 1
    for k,v in pairs(bundle) do
        local itemID = GameRules.modelmap[k]
        if itemID then
            GenerateItemDefLine(wearableCount, itemID, k)
            wearableCount = wearableCount+1
        end
    end
    print("        }")
    print("    }")
end

function GenerateItemDefLine( i, itemID, comment )
    print("            \""..tostring(i).."\" { ".."\"ItemDef\" \""..itemID.."\" } // "..comment)
end
```
