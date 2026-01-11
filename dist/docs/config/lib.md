# Configuration - Libraries

When you create a build, you might like to import a library to reuse some code parts. Here you are going to learn how
    to define all libs that must be imported inside a build. You can find package to download by searching inside the
    aventusjs store : <mark>[https://store.aventusjs.com](https://store.aventusjs.com/)</mark>

The easiest format is the following : 

```json
{
    "dependances": {
        "MaterialIcon": "1.0.0",
    }
}
```

By default, this will search inside the store. If you need to import other package you can define an object to have
    more options.

## Properties

|Name|Description|
|---|---|
|uri|This is a string to define where to find the file to import. To have more             information about this path, you can read the next chapter.         &nbsp;|
|version|             &nbsp;This is a string to define which version of the code is needed.                 &nbsp;Must satisfy: <mark>^[0-9]+\.[0-9]+\.[0-9]+$</mark>             &nbsp;         &nbsp;|
|isLocal|             &nbsp;This will search a package matching the name inside your locals projects. You can find all these                 librairies by typing the command <mark>Aventus : Open aventus storage</mark> and then                 navigate inside your file explorer under the <mark>packages&gt;@locals</mark>. If you use a local package, you don't need to define a version.         &nbsp;|
|include|             &nbsp;This is a string to define how the lib must be included inside output js file.             &nbsp;                 &nbsp;none: No need to include the lib inside the output file.                 &nbsp;need: Include only the needed code inside the output file. (This is the default value)                 &nbsp;full: Include all the code of the lib inside the ouput file.             &nbsp;         &nbsp;|
|subDependancesInclude|             &nbsp;This is a object where the key is the sub library name and the value is the inclusion pattern. The                 will define how the library of the library must be included inside output js file.             &nbsp;                 &nbsp;none: No need to include the sub lib inside the output file.                 &nbsp;need: Include only the needed code inside the output file. (This is the default value)                 &nbsp;full: Include all the code of the sub lib inside the ouput file.             &nbsp;         &nbsp;|

## Libraries name

You can use a few name kinds to load a library. If you use a predefined name you don't need version. There are 5 libs
    with predefined uri:

- Aventus@Main : This is the core of Aventus, if you omit this lib inside your build, it will be automaticaly
        added.
- Aventus@UI : This lib contains some useful webcomponent to create interface.
- Aventus@I18n : This lib contains i18n tools. If you define <mark>i18n</mark> inside your configuration file, this lib will be automaticaly loaded.
- Aventus@Php : This lib contains Aventus code base for project <mark>Laraventus</mark>.
- Aventus@Sharp : This lib contains Aventus code base for project <mark>AventusSharp</mark>.

```json
{
    "dependances": {
        "Aventus@UI": {},
    }
}
```

## Store

You can search packages inside the aventus store. This is the recommanded way to load package.

[Open the store](https://store.aventusjs.com/packages)

## File uri

You can add directly an uri that resolve a <mark>.package.avt</mark> file to import it.

```json filename=aventus.conf.avt
{
    dependances: {
        "Lib1@Main": {
            "uri": "./myLibs/Lib1@Main.package.avt"
        },
        "Lib2@Main": {
            "uri": "C:\\myLibs\\Lib2@Main.package.avt"
        }
    }
}
```

## File via http

You can resolve dependance via http. Package will be stored inside the Aventus <mark>storage&gt;packages&gt;http</mark>. In this
    folder, you must find
    a list
    of subfolder where the name is the md5 value of the uri that you set as uri. The entry point is a json named
    &nbsp;<mark>info.json</mark>


When a specific version is required, Aventus will use the uri to download the file and save it inside the folder as
    &nbsp;<mark>$name</mark>#<mark>$version</mark> (ex: Aventus@Main#1.0.0.package.avt) and add a <mark>localUri</mark> property that will be
    used inside the build.

