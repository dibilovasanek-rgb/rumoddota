---
title: Пользовательские значки мини-карты
author: Noya
steamId: '76561198046984233'
date: 11.11.2015
---
ьские значки мини-карты

Вот быстрое и простое пошаговое руководство о том, как создавать и использовать собственные значки существ на мини-карте.

## Шаг 1. Получите файлы

[minimap_icon.zip](https://drive.google.com/file/d/1nsisy1oPKXsGR3LFhfRjBhwQIp9A7jY2/view?usp=sharing)

Он содержит следующие файлы:

- **`addon_hud_textures.txt`**
- **`vgui/hud/minimap_icon.txt`**
- **`vgui/hud/minimap_icon.vmat`**
- **`vgui/hud/minimap_icon.psd`**

`addon_hud_textures.txt` — это уникальный файл, определяющий пути для каждого пользовательского значка.

3 файла `minimap_icon` используются вместе, и их следует переименовать в имя вашего будущего значка, например `_minimap_questgiver_` или `_boss_kappa_`.

## Шаг 2. Отредактируйте файлы

### PSD-изображение
Используйте графический редактор, например Photoshop или GIMP, для редактирования PSD-файла.

В исходном файле примера я быстро сделал вот такое прозрачное изображение из [this source](/images/external/x3L74Hw.png):

![img](/images/external/78Z3kaV.png)

Рекомендуемый размер изображения: **64x64**.<br />.
Если вы хотите использовать другой размер изображения, он **должен быть степенью двойки**.

::: предупреждение
Вам нужно, чтобы альфа-слой был заполнен прозрачной фигурой, которую вы хотите отобразить:
:::
![img](/images/external/lhQL0-81b3632bad.png)

Для получения лучших результатов добавьте к изображению четкие черные рамки в качестве контура (и не забудьте соответствующим образом обновить альфа-слой).

### Материал VMAT

Откройте `.vmat` в любом редакторе кода и обязательно замените `minimap_icon.psd` на имя по вашему выбору. Остальное оставьте без изменений
```
"Layer0"
{
    "Shader"            "ui.vfx"
    "F_STENCIL_MASKING" "1"
    "Texture"           "materials/vgui/hud/minimap_icon.psd" //EDIT THIS
    "F_TRANSLUCENT"     "1"
}
```

### Текстурный файл KV

Тот же процесс в файле `addon_hud_textures.txt`.
```
""
{
    "TextureData"
    {
        "minimap_icon" //EDIT THIS
        {
            "file"     "materials/vgui/hud/minimap_icon.vmat" //EDIT THIS
            "x"        "0"
            "y"        "0"
            "width"    "64"
            "height"   "64"
        }
    }
}
```
Чтобы получить больше значков, просто скопируйте блок minimap_icon еще раз с другим именем внутри TextureData.

## Шаг 3. Переместите файлы

- Файлы **minimap_icon** находятся в папке **content**/dota_addons/YOUR_ADDON/materials/**vgui/hud/**.

- Файл **addon_hud_textures.txt** находится в папке **game**/dota_addons/YOUR_ADDON/scripts/.

## Шаг 4. Скомпилируйте и проверьте
Зайдите в браузер ресурсов, напишите имя вашего значка, откройте vmat, дважды щелкнув по нему (это скомпилирует его).

![img](/images/external/lhRLL-31d63b48d9.jpg)

## Шаг 5. Настройте свое устройство на использование нового значка

В определении модуля добавьте следующие строки:
```
"MinimapIcon"        "minimap_icon"
"MinimapIconSize"    "1000"
"MinimapDisableTint" "1"
`
```
MinimapIconSize` определяет относительный размер значка на мини-карте, а `MinimapDisableTint` может быть равен 0 или опущен, если вы хотите, чтобы существо использовало разные цвета команды.

## Шаг 6. Попробуйте в игре

![img](/images/external/lhQFp-37192e1e63.jpg)