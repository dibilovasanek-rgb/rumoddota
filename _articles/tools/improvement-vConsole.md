---
title: улучшение vConsole
author: Kain
steamId: '76561198011709789'
date: 01.04.2022
---
-

# улучшение vConsole

![icon](/images/improvement-vconsole/logo.png)

## vКонсоль

Dota2 Tools имеет консоль `vConsole2.exe`.

Сегодня я покажу вам, как изменить функционал панели инструментов. В этой статье мы не будем рассматривать настройку и стандартные возможности программы vConsole.

> Стандартный вид панели инструментов:
![vconsole](/images/improvement-vconsole/vConsole.png)

Это та часть программы, которую мы сегодня продолжим.
Какие возможности мы получим:

1. Кнопка запускает инструмент из dll (в конфигурации по умолчанию — репортер ошибок и NetGraph).
1. Кнопка применяет консольную команду (в конфигурации по умолчанию запускает AssetBrowser).
1. Кнопка запускает внешнюю программу (VsCode, Notepad++, Sublime text и, конечно же, Dota2 Tools).

В варианте 1 мы, вероятно, ничего не сможем изменить (или это будет очень сложно и моих знаний не хватает).
Но двое других в самый раз.

Нам понадобится вот такой файл конфигурации для консоли:
`dota 2 beta\game\core\tools\sdk_vconsole_subtools.txt`

Формат файла — обычный ключ-значение. Ключевые параметры, которые мне удалось найти для этого файла:
```
m_Name                       - Section name - importance is low, no visibility (but better to use).
m_MenuString                 - Name for menu list Tools.
m_SubToolIconPath            - Path for image icon (Button or menu). Great choice here "\dota 2 beta\game\core\tools\images\". You can also shorten the way "game:tools/images/workshopmanager/icon_refresh_activated.png"
m_ToolbarString              - Name for button.
m_StatusBarTipString         - ToolTip in status bar and pop-up tooltip on the button.
m_CommandString              - any/all console commands that you already use in Dota2 Tools, (commands separated by semicolons are executed alternately, as in the console).
m_ExecutablePath             - the path to the executable file. (the slash in the path name, must be escaped with a slash \\)
m_ExecutableArguments        - arguments to run the executable file
m_LibraryPath                - the path to the DLL (for internal Dota tools)
m_AdditionalDependencies     - additional dependencies (probably expand the tools we are not really available)
m_bRequiresAppConnection     - Checking the connection to the application Dota2 (if Dota2 is running the icon takes full color, otherwise the icon is completely in shades of gray and cannot be clicked)
m_bRequiresToolConnection    - Checking the connection to the application Dota2 Tools (AssetBrowser only in tools, netgraph is also available in Dota2)
m_bInternalUseOnly           - only internal use - the essence is not clear.
m_bAllowAutoStart            - run at console start (not sure if it works in every situation)
m_ToolConfig                 - I don't know what it's for.(Maybe here you can specify the config from PET Hammer and other tools)
m_MaterialSystemDependencies - we are not interested (section with other dependencies - did not notice the difference by editing it)
m_SubTools                   - Our area for customization
// +dota_launch_custom_game  - comments work
```
Многие имена будут говорить сами за себя.

Нас интересует раздел `m_SubTools` этого файла.

::: предупреждение
DOTA2 может перезаписать этот файл после обновления (не всегда), обязательно сделайте резервную копию (с вашими изменениями).
:::

Примеры из моего конфига.
перезапуск карты с очисткой консоли:

```
{
    m_Name                      = "Restart"
    m_MenuString                = "Restart"
    m_SubToolIconPath           = "game:tools/images/workshopmanager/icon_refresh_activated.png"
    m_ToolbarString             = "Restart"
    m_StatusBarTipString        = "Restart map"
    m_CommandString             = "clear;restart"
    m_bRequiresToolConnection   = true
}
```
запуск Dota2 Tools с тестовым аддоном и параметрами запуска:
```
{
    m_Name                      = "tp"
    m_MenuString                = "Test project"
    m_SubToolIconPath           = "game:tools/images/hammer/toggle_tools_materials_activated.png"
    m_ToolbarString             = "Test A"
    m_StatusBarTipString        = "Test Addon load"
    m_ExecutablePath            = "X:\\Steam\\steamapps\\common\\dota 2 beta\\game\\bin\\win64\\dota2.exe"
    m_ExecutableArguments       = "-nobreakpad 375360 -tools -addon test -novid -uidev -dev -nominidumps -condebug -toconsole -vconsole "
}
```
запуск программы VSCode с аргументами (в данном случае указывается рабочая область):
```
{
    m_Name                      = "vsc"
    m_MenuString                = "VSCode"
    m_SubToolIconPath           = "C:/Microsoft VS Code/resources/app/resources/win32/code_70x70.png"
    m_ToolbarString             = "VSCode XX"
    m_StatusBarTipString        = "Run Vscode Addon XxxXxx"
    m_ExecutablePath            = "X:\\Microsoft VS Code\\Code.exe"
    m_ExecutableArguments       = "X:\\xxxx\\xx_scripts.code-workspace"
}
```

---

View of my toolbar without Dota2 tools running:
![toolbar1](/images/improvement-vconsole/toolbar1.png)

with running tools:

![toolbar2](/images/improvement-vconsole/toolbar2.png)

I hope my article will help you better organize your workspace when developing addons and you will be able to make more good and interesting projects.

> PS мои родные языки НА РУС, прошу прощения за возможные неточности перевода.