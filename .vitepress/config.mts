import { defineConfig } from "vitepress";

export default defineConfig({
    title: "ModdotaRU",
    description: "Русскоязычный ресурс сообщества по созданию модификаций для Dota 2",
    lang: "ru-RU",
    head: [["link", { rel: "icon", href: "/images/favicon.ico" }]],
    srcDir: "_articles",
    outDir: "dist",
    cleanUrls: true,
    ignoreDeadLinks: [/\.fbx$/],
    assetsDir: "_assets", // Do not conflict with assets articles

    markdown: {
        lineNumbers: true,
    },

    themeConfig: {
        logo: "/images/logo.svg",

        nav: [
            {
                text: "API Lua",
                link: "https://moddota.com/api/",
            },
            {
                text: "API Panorama",
                link: "https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Panorama/Javascript/API",
            },
        ],

        socialLinks: [
            { icon: "github", link: "https://github.com/dibilovasanek-rgb" },
            {
                icon: {
                    svg: '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/></svg>',
                },
                link: "https://t.me/+4wTdvuzBPzUxOTgy",
            },
        ],

        sidebar: [
            { text: "Начало работы", link: "/getting-started" },
            { text: "Введение в скриптинг", link: "/scripting-introduction" },
            {
                text: "TypeScript",
                collapsed: true,
                items: [
                    { text: "Введение", link: "/scripting/Typescript/typescript-introduction" },
                    { text: "Способности", link: "/scripting/Typescript/typescript-ability" },
                    { text: "Модификаторы", link: "/scripting/Typescript/typescript-modifier" },
                    { text: "События", link: "/scripting/Typescript/typescript-events" },
                    { text: "Генератор подсказок", link: "/scripting/Typescript/tooltip-generator" },
                ],
            },
            {
                text: "Способности, предметы и модификаторы",
                collapsed: true,
                items: [
                    { text: "KeyValues способностей", link: "/abilities/ability-keyvalues" },
                    { text: "KeyValues предметов", link: "/abilities/item-keyvalues" },
                    {
                        text: "Важность значений AbilityValues",
                        link: "/abilities/the-importance-of-abilityvalues-values",
                    },
                    {
                        text: "Передача значений AbilityValues в Lua",
                        link: "/abilities/passing-abilityvalues-values-into-lua",
                    },
                    { text: "Подсказки AbilityDuration", link: "/abilities/abilityduration-tooltips" },
                    { text: "Простая пользовательская способность", link: "/abilities/simple-custom-ability" },
                    { text: "Создание врождённых способностей", link: "/abilities/creating-innate-abilities" },
                    { text: "Заряды для любой способности", link: "/abilities/making-any-ability-use-charges" },
                    { text: "Вызов заклинаний через SetCursor", link: "/abilities/calling-spells-with-setcursor" },
                    {
                        text: "Способности и модификаторы Lua",
                        link: "https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Lua_Abilities_and_Modifiers",
                    },
                    { text: "Руководство по предметам Lua", link: "/abilities/lua-item-tutorial" },
                    {
                        text: "Модификаторы Lua",
                        collapsed: true,
                        items: [
                            { text: "Расширение API героя/NPC", link: "/abilities/lua-modifiers/1" },
                            { text: "Сфера Линки и Лотос", link: "/abilities/lua-modifiers/2" },
                            { text: "Превращения", link: "/abilities/lua-modifiers/3" },
                            { text: "Зачарование деревьев", link: "/abilities/lua-modifiers/4" },
                            { text: "Пользовательские барьеры", link: "/abilities/lua-modifiers/5" },
                        ],
                    },
                    {
                        text: "Повторное использование встроенных модификаторов",
                        link: "/abilities/reutilizing-built-in-modifiers",
                    },
                    {
                        text: "DataDriven",
                        collapsed: true,
                        items: [
                            {
                                text: "События и модификаторы способностей",
                                link: "/abilities/datadriven/datadriven-ability-events-modifiers",
                            },
                            { text: "Всё о цели", link: "/abilities/datadriven/all-about-the-target" },
                            {
                                text: "Анимации поддерживаемых заклинаний",
                                link: "/abilities/datadriven/channeling-animations",
                            },
                            {
                                text: "Пример способности невидимости",
                                link: "/abilities/datadriven/invisibility-ability-example",
                            },
                            {
                                text: "Пример способности иллюзии",
                                link: "/abilities/datadriven/illusion-ability-example",
                            },
                            {
                                text: "Пример способности вращения",
                                link: "/abilities/datadriven/rotate-ability-example",
                            },
                            {
                                text: "Пример точечной способности с областью действия",
                                link: "/abilities/datadriven/point-channeling-aoe-ability-example",
                            },
                            {
                                text: "Длительность модификаторов героев и крипов",
                                link: "/abilities/datadriven/apply-hero-and-creep-modifier-durations",
                            },
                            {
                                text: "Пример физической способности (Экзорцизм)",
                                link: "/abilities/datadriven/physics-ability-example-exorcism",
                            },
                        ],
                    },
                    {
                        text: "Свойства модификаторов в подсказках",
                        link: "/abilities/modifier-properties-in-tooltips",
                    },
                    { text: "От сервера к клиенту", link: "/abilities/server-to-client" },
                ],
            },
            {
                text: "Юниты",
                collapsed: true,
                items: [
                    { text: "KeyValues юнитов", link: "/units/unit-keyvalues" },
                    { text: "Здания, создающие юнитов", link: "/units/unit-producing-buildings" },
                    { text: "Создание юнитов на время", link: "/units/creating-units-with-a-duration" },
                    { text: "Простой ИИ для юнитов", link: "/units/adding-a-very-simple-ai-to-units" },
                    { text: "Простой нейтральный ИИ", link: "/units/simple-neutral-ai" },
                    {
                        text: "Блоки AttachWearable для существ",
                        link: "/units/create-creature-attachwearable-blocks-directly-from-the-keyvalues",
                    },
                ],
            },
            {
                text: "Скриптинг",
                collapsed: true,
                items: [
                    { text: "Пользовательская система маны", link: "/scripting/custom-mana-system" },
                    { text: "Ограничения и требования предметов", link: "/scripting/item-restrictions-requirements" },
                    { text: "Система выпадения предметов", link: "/scripting/item-drop-system" },
                    { text: "Сундук с добычей в стиле RPG", link: "/scripting/making-a-rpg-like-looting-chest" },
                    { text: "Создание магазинов скриптами", link: "/scripting/scripted-shop-spawning" },
                    { text: "Урон от лавы", link: "/scripting/lava-damage" },
                    { text: "Фильтры Dota", link: "/scripting/using-dota-filters" },
                    { text: "Привязка частиц", link: "/scripting/particle-attachment" },
                    { text: "Математика векторов", link: "/scripting/vector-math" },
                    {
                        text: "Precache: исправление и предотвращение проблем",
                        link: "/scripting/precache-fixing-and-avoiding-issues",
                    },
                    {
                        text: "Custom NetTables",
                        link: "https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Custom_Nettables",
                    },
                    { text: "Продвинутый сундук с добычей", link: "/scripting/advanced-looting-chest" },
                ],
            },
            {
                text: "Интерфейс Panorama",
                collapsed: true,
                items: [
                    {
                        text: "Введение",
                        link: "https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Panorama",
                    },
                    { text: "Инклюзивный интерфейс Panorama", link: "/panorama/inclusive-panorama-ui" },
                    {
                        text: "Интерфейс Panorama с TypeScript",
                        link: "/panorama/introduction-to-panorama-ui-with-typescript",
                    },
                    { text: "Привязка клавиш", link: "/panorama/keybindings" },
                    { text: "DOTAScenePanel", link: "/panorama/dotascenepanel" },
                    { text: "Примеры кнопок", link: "/panorama/button-examples" },
                    {
                        text: "Настройка пользовательской игры",
                        link: "https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Custom_Game_Setup",
                    },
                    { text: "Скрытие HUD через SetHUDVisible", link: "/panorama/hiding-hud-with-sethudvisible" },
                    { text: "Webpack", link: "/panorama/webpack" },
                    { text: "React", link: "/panorama/react" },
                ],
            },
            {
                text: "Ресурсы",
                collapsed: true,
                items: [
                    { text: "Asset File Type Reference", link: "/assets/asset-file-type-reference" },
                    {
                        text: "Maps",
                        collapsed: true,
                        items: [
                            { text: "Hammer Tutorials", link: "/assets/maps/hammer-tutorials" },
                            {
                                text: "Making Skip/Clip Blocks from Models",
                                link: "/assets/maps/making-skip-clip-blocks-out-of-models",
                            },
                        ],
                    },
                    {
                        text: "Models",
                        collapsed: true,
                        items: [
                            { text: "MDL to VMDL Conversion", link: "/assets/models/mdl-to-vmdl-conversion" },
                            {
                                text: "Adding Hitbox to Models Without a Bone",
                                link: "/assets/models/adding-hitbox-to-models-without-a-bone",
                            },
                            {
                                text: "Importing Models & Material Editor",
                                link: "/assets/models/importing-models-and-using-material-editor",
                            },
                            {
                                text: "Exporting Models & Materials/Textures",
                                link: "/assets/models/exporting-models-and-materials-textures",
                            },
                            {
                                text: "Custom Hero Models & Animations",
                                link: "/assets/models/custom-hero-models-materials-animations",
                            },
                        ],
                    },
                    {
                        text: "Particles",
                        collapsed: true,
                        items: [
                            { text: "Particle Tutorial", link: "/assets/particles/particle-tutorial" },
                            { text: "Particle Basics", link: "/assets/particles/particle-basics" },
                            { text: "Chaos Wave Particle", link: "/assets/particles/chaos-wave-particle" },
                            {
                                text: "Falling Cherry Blossom Petal",
                                link: "/assets/particles/falling-cherry-blossom-petal-for-spring-mood-particle",
                            },
                            { text: "Volcano Particle", link: "/assets/particles/volcano-particle" },
                            { text: "Status Effects", link: "/assets/particles/status-effects" },
                        ],
                    },
                    { text: "Custom Sounds", link: "/assets/custom-sounds" },
                    {
                        text: "Extracting & Compiling VTEX Files",
                        link: "/assets/extracting-and-compiling-vtex-files",
                    },
                    { text: "Custom Minimap Icons", link: "/assets/custom-minimap-icons" },
                ],
            },
            {
                text: "Инструменты",
                collapsed: true,
                items: [
                    { text: "Setting Up for Collaboration", link: "/tools/setting-up-for-collaboration" },
                    { text: "Useful Console Commands", link: "/tools/useful-console-commands" },
                    { text: "Setting Up with GitHub", link: "/tools/setting-up-your-addon-with-github" },
                    { text: "Combining KV Files Using #base", link: "/tools/combining-kv-files-using-base" },
                    { text: "Improving vConsole", link: "/tools/improvement-vConsole" },
                    { text: "GitHub Repos and Search", link: "/tools/github-repos-and-search" },
                ],
            },
            { text: "Участие в проекте", link: "/contribute" },
        ],

        externalLinkIcon: true,
        outline: [2, 3],

        editLink: {
            pattern: "https://github.com/ModDota/moddota.github.io/edit/source/_articles/:path",
        },

        search: {
            provider: "local",
        },
    },

    vue: {
        template: {
            transformAssetUrls: {
                video: ["src", "poster"],
                source: ["src"],
                img: ["src"],
                image: ["xlink:href", "href"],
                use: ["xlink:href", "href"],
                StaticVideo: ["path"],
            },
        },
    },

    vite: {
        publicDir: "../public",
    },

    sitemap: {
        hostname: "https://moddota.com/",
    },
});
