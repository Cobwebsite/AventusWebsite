# I18n - Configuration

AventusJs includes a native i18n module, designed to simplify the process of translating your application. With i18n,
    you can easily manage multiple languages, switch content dynamically, and ensure a seamless experience for users
    around the world. By integrating i18n directly into AventusJs, we make it straightforward for developers to build
    multilingual applications without relying on external libraries

To enable I18n, you need to add the section <mark>i18n</mark> inside your <mark>aventus.conf.avt</mark>.

```json filename=aventus.conf.avt
{
    "module": "test",
    "componentPrefix": "av",
    "build": [
        {
            "src": ["./src/*"],
            "compile": [
                {
                    "output": "./dist/test.js"
                }
            ],
            "i18n": {
                "autoRegister": true,
                "fallback": "en-gb",
                "locales": [
                    "en-gb",
                    "fr-fr"
                ]
            }
        }
    ]
}
```

When you add this config, Aventus will automatically add the lib <mark>Aventus@I18n</mark> inside your
    build.

Inside the output folder you must have a new folder named <mark>locales</mark> that contains <mark>en-gb.json</mark> and <mark>fr-fr.json</mark>. Thoses files contains all transalations you
    need for your application.

## General configuration

|Name|Description|
|---|---|
|autoRegister|Define if aventus must autoRegister your i18n files. Default is             true|
|fallback|Define the fallback locale|
|locales|This is an array of string to define locales that is required inside your             project|

## Compilation configuration

You can customize how Avenuts must handle you i18n files.

```json filename=aventus.conf.avt
{
    "module": "test",
    "componentPrefix": "av",
    "build": [
        {
            "src": ["./src/*"],
            "compile": [
                {
                    "output": "./dist/test.js",
                    "i18n": [
                        {
                            "output": "dist/public",
                            "mode": "singleFile",
                            "mount": "/public"
                        }
                    ]
                }
            ],
            "i18n": {
                "autoRegister": true,
                "fallback": "en-gb",
                "locales": [
                    "en-gb",
                    "fr-fr"
                ]
            }
        }
    ]
}
```

|Name|Description|
|---|---|
|output|This is string to define where to export i18n files.         &nbsp;|
|mode|             &nbsp;This is string to define how aventus must compile your i18n.             &nbsp;                 &nbsp;singleFile: export all translations inside a single file                 &nbsp;oneToOne: export translation inside the same file name as input                 &nbsp;groupComponent: group components transaltions inside a single file                 &nbsp;basedOnAttribute: WIP                 &nbsp;include: WIP             &nbsp;         &nbsp;|
|mount|This is string to define the http path to mount your i18n files.         &nbsp;|
