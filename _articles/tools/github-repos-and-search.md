---
title: Репозитории GitHub и поиск
---
---

# Репозитории GitHub и поиск

## Шаблоны

- [TypeScript Template](https://github.com/ModDota/TypeScriptAddonTemplate)
- [Barebones](https://github.com/DarkoniusXNG/barebones)
- [But Template](https://github.com/Snoresville/dota2buttemplate_fixed)

## Примеры и руководства

- [Lua Abilities](https://github.com/Elfansoer/dota-2-lua-abilities)
- [Spell Library](https://github.com/Pizzalol/SpellLibrary)
- [Particle Editor Tutorial](https://github.com/Nibuja05/dota_particle_editor_tutorial)

## Пользовательские игры

- [Dota Imba](https://github.com/EarthSalamander42/dota_imba)
- [Dota Reimagined](https://github.com/Shushishtok/dota-reimagined)
- [Legends of Dota Redux](https://github.com/darklordabc/Legends-of-Dota-Redux)
- [Open Angel Arena](https://github.com/OpenAngelArena/oaa)
- [Dota Tutorial](https://github.com/ModDota/dota-tutorial)
## Инструменты

- [Tooltip Generator](https://github.com/Shushishtok/tooltip_generator)
- [Tooltip Codemaker](https://github.com/Shushishtok/tooltip-codemaker)

## Разное

- [Game Tracking](https://github.com/SteamDatabase/GameTracking-Dota2)
- [Valve Resource Format](https://github.com/ValveResourceFormat/ValveResourceFormat)
- [Typescript Declarations](https://github.com/ModDota/TypeScriptDeclarations)
- [Dota VPK Updates](https://github.com/spirit-bear-productions/dota_vpk_updates/)
## Поиск кода

> [GitHub Code Search](https://github.com/search) ([Docs](https://docs.github.com/en/search-github/searching-on-github/searching-code))

Функция поиска GitHub имеет несколько очень удобных функций для поиска кода.

|       Фильтр |                                          Синтаксис |                                                                                                                                                    Пример |
| :-----------------: | :--------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|      Язык |                                   `language:language` |                                                                               `SendEventClientSide language:JavaScript` ([Link](https://github.com/search?q=SendEventClientSide+language%3AJavaScript&type=code&l=JavaScript)) |
|     Репозиторий |                                 `repo:username/reponame` |                                                                              `AddFOWViewer repo:EarthSalamander42/dota_imba` ([Link](https://github.com/search?q=AddFOWViewer+repo%3AEarthSalamander42%2Fdota_imba+&type=code)) |
|        Путь |                                     `path:your/path` |                                                                            `FindAllByClassname path:game/scripts/vscripts/` ([Link](https://github.com/search?q=FindAllByClassname+path%3Agame%2Fscripts%2Fvscripts%2F&type=code)) |
|        Пользователь |                                     `user:username` |                                                                                               `ListenToGameEvent user:ModDota` ([Link](https://github.com/search?q=ListenToGameEvent+user%3AModDota&type=code)) |
|  Булевы операторы |                                `OR` <br/>`AND` <br/>`NOT` | `CastAbilityNoTarget (language:Lua OR language:TypeScript)` ([Link](https://github.com/search?q=CastAbilityNoTarget+%28language%3ALua+OR+language%3ATypeScript%29&type=code)) <br/> `CastAbilityNoTarget NOT path:.d.ts` ([Link](https://github.com/search?q=CastAbilityNoTarget+NOT+path%3A.d.ts&type=code)) |
| Подстановочные символы | ``. , : ; / \ ` ' " = * ! ? # $ & + ^ \| ~ < > ( ) { } [ ] @``<br/>_No escaping support_ |                                                                       `FindAllByClassname путь:game/scripts/vscripts/*.lua` ([Link](https://github.com/search?q=FindAllByClassname+path%3Agame%2Fscripts%2Fvscripts%2F*.lua&type=code)) |

И да, фильтры, конечно, можно комбинировать.