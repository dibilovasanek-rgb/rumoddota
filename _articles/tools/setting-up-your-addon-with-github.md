---
title: Настройка вашего аддона с помощью GitHub
author: Veggiesama
date: 06.03.2024
---
ройка вашего аддона с помощью GitHub

Разделите игру на папки `game` и `content`, затем добавьте переходы или символические ссылки, чтобы связать их с файлами Dota.

## Окна – Создание соединений

Для папки `game` запустите
```
shell
mklink /J "C:\Users\Veggiesama\Desktop\HVH\game\hunter_v_hunted\" "C:\Games\steamapps\common\dota 2 beta\game\dota_addons\hunter_v_hunted\"
# Junction created for C:\Users\Veggiesama\Desktop\HVH\game\hunter_v_hunted\ <<===>> C:\Games\steamapps\common\dota 2 beta\game\dota_addons\hunter_v_hunted\
```
Для папки `content` запустите
```
shell
mklink /J "C:\Users\Veggiesama\Desktop\HVH\content\hunter_v_hunted\" "C:\Games\steamapps\common\dota 2 beta\content\dota_addons\hunter_v_hunted\"
#Junction created for C:\Users\Veggiesama\Desktop\HVH\content\hunter_v_hunted\ <<===>> C:\Games\steamapps\common\dota 2 beta\content\dota_addons\hunter_v_hunted\
```
Чтобы удалить соединения, просто удалите каталог ссылок.
```
shell
rmdir "C:\Users\Veggiesama\Desktop\HVH\content\hunter_v_hunted\" -force
```

## Linux — создайте символические ссылки

Для папки `game` запустите
```
shell
ln -s /home/username/games/Steam/steamapps/common/dota2/game/dota_addons/my_custom_game /home/username/workspaces/dota2-workshops/my_custom_game/game
```
Для папки `content` запустите
```
shell
ln -s /home/username/games/Steam/steamapps/common/dota2/content/dota_addons/my_custom_game /home/username/workspaces/dota2-workshops/my_custom_game/content
```
Удалите символические ссылки, используя
```
shell
unlink /home/username/workspaces/dota2-workshops/my_custom_game/content
unlink /home/username/workspaces/dota2-workshops/my_custom_game/game
```
Теперь вы можете вносить изменения из папки SteamApps и по-прежнему использовать GitHub для контроля версий из связанной папки.