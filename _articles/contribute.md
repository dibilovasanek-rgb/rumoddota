---
title: Способствовать
---
нести свой вклад

## Предложить статью на GitHub

Чтобы предложить новую статью, перейдите по адресу [/\_articles directory of the ModDota GitHub](https://github.com/ModDota/moddota.github.io/tree/source/_articles).

::: информация
Для этого вам необходимо войти в свою учетную запись GitHub.
:::

Затем нажмите кнопку «Создать файл», как указано:
![Click the create new file button](/images/external/hzOmlcA.png)

### Наполните свою статью

В новом окне файла вам необходимо добавить описательное имя файла и текст для вашей статьи:

![Fill your article](/images/external/4CcOl0i.png)

::: совет
Вы можете использовать вкладку предварительного просмотра вверху, чтобы просмотреть статью!
:::
#### ВАЖНО: Обязательные поля

Чтобы статья работала, необходимо заполнить несколько обязательных полей:

Во-первых, вам нужно установить имя файла. Выберите описательное имя, слова должны быть разделены `-` (без пробелов). **Файл должен заканчиваться на .md!**

Во-вторых, вам нужно указать основную информацию о статье вверху, макет всегда один и тот же (включая тире):
```
yaml
---
title: <Title of your article> # Title of your article (required)
author: <your name> # Your name
steamId: '<your steam ID>' # Your steam ID to link to your steam profile
date: <date> # The date of writing
---
```
Единственное обязательное поле — `title`, все остальные поля можно безопасно опустить.

### Отправьте статью на рассмотрение

Когда вы закончите, вам просто нужно добавить очень краткое описание только что созданного вами урока внизу страницы. Это отобразится в истории изменений веб-сайта. Как только вы закончите, нажмите зеленую кнопку «Предложить новый файл».

![Submit your tutorial](/images/external/xkwdcRx.png)

### Обзор статьи
Кто-то проверит, не повреждена ли статья на веб-сайте и не отсутствует ли информация, вас могут попросить внести некоторые изменения перед добавлением страницы на веб-сайт.

Как только ваше руководство будет объединено, оно автоматически появится на веб-сайте.

## Учебники по написанию

Учебные пособия могут быть написаны на языке разметки Markdown с поддержкой некоторых дополнительных функций GitHub Flavored Markdown. Чтобы ознакомиться с синтаксисом, вы можете посетить [this page](https://commonmark.org/help/).

Кроме того, этот веб-сайт поддерживает расширения уценки, предоставляемые [VitePress](https://vitepress.dev/guide/markdown):
```
lua{2}
function foo()
  -- Highlighted line
end
```

### Изображения и видео

Все изображения и видео должны храниться локально в репозитории, а не по внешним URL-адресам.

- **Изображения:** Поместите в папку `_articles/images/` и укажите `![alt text](/images/your-image.png)`.
– **Видео.** Поместите файлы `.mp4` в папку `_articles/videos/` и используйте `<StaticVideo path="/videos/your-video.mp4" />`.

**Чтобы добавить проигрыватель YouTube на страницу, используйте следующее:**

Чтобы встроить https://www.youtube.com/watch?v=GMvmdnNM6Sc:
Используйте `<YouTube id="GMvmdnNM6Sc" />`

### Заголовки

В VitePress [заголовки] Markdown получают дополнительное значение — они используются для создания контура «На этой странице», который вы можете увидеть в правой части статьи.

:::информация
По умолчанию в структуре отображаются только заголовки уровней 2 (##) и 3 (###).
:::

## Использование git-форка

::: warning
Advanced users only
:::

This website is set up as a GitHub Pages project built with VitePress. Content is rendered automatically after each push to the `source` branch and published to the website.

You can simply fork or clone the repository to edit the files and submit a pull request to the main repository.

File structure is as follows:

```
.
_articles/              # Directory storing all articles as markdown files
  | index.md            # Homepage
  | contribute.md       # This page
  | images/             # Static images
  | videos/             # Static videos
  | ...
.vitepress/
  | config.mts          # VitePress configuration (sidebar, nav, etc.)
  | theme/              # Custom theme, components, and CSS
```
