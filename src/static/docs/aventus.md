# Introduction

Aventus is a framework that allow you to create complex user interfaces by splitting common parts of a
    front-end application in several well knowned files. It builds on top of standard HTML, CSS, JavaScript
    and provide a way to keep your development under control.

Here is a minimal example:

```typescript filename=/Button/Button.wcl.avt
export class Button extends Aventus.WebComponent implements Aventus.DefaultComponent {
    @Attribute()
    private visible: boolean = true;

    @Property()
    private count: number = 0;

    @Signal()
    private msg: string = "";

    private onClick(): void {
        this.count++;

        if(this.count > 5) {
            this.msg = "That's enough!";
            this.visible = false;
        }
        else if(this.count > 3) {
            this.msg = "Go read the doc instead of clicking this dummy button"
        }
    }
}
```

```css filename=/Button/Button.wcs.avt
:host {
    button {
        background-color: #e5540e;
        border: none;
        border-radius: 5px;
        color: white;
        cursor: pointer;
        padding: 5px 15px;
    }
}
:host(:not([visible])) {
    button {
        display: none;
    }
}
```

```html filename=/Button/Button.wcv.avt
<button @click="onClick">Count is {{ this.count }}</button>
if(this.msg) {
    <p>{{ this.msg }}</p>
}
```

To understand the capabilities of Aventus, you need to learn about the following:

- <mark>Webcomponent</mark>
- <mark>Data / Storage</mark>
- <mark>States</mark>
- <mark>Http Request</mark>

---
# Installation

## Basic install

Aventus is actually available as a [vscode extension](https://marketplace.visualstudio.com/items?itemName=Cobwebsite.aventus). You can download it directly inside the vscode extensions
    tab by searching "Aventus" in the marketplace. Nothing else is required because everything is wrapped inside the
    extension.


## Useful command inside vscode

Because Aventus is fully integrated inside vscode, you must know how to run some commands. By default the shortcut to
    list all the commands is :  **ctrl** + **shift** + **p** . This action open a dropdown with all commands available inside your vscode instance.

-  **Developer: Reload Window**  &nbsp; To reload the vscode instance
-  **Aventus : Compile**  &nbsp; To compile a build
-  **Aventus : Copy static**  &nbsp; To export a static a folder
-  **Aventus : Import templates**  &nbsp; To import Aventus templates
-  **Aventus : Import projects**  &nbsp; To import Aventus projects
-  **Aventus : Open storage**  &nbsp; To open the folder where Aventus store data
-  **Aventus : Create emmet snippets**  &nbsp; To generate
        &nbsp;<mark>.aventus/emmet/snippets.json</mark> from web components exported by project packages
-  **Aventus : Format all files**  &nbsp; To format all Aventus files loaded by the language server

## CLI

Aventus also provides a  **CLI**  for DevOps tasks and automation. It can be installed via npm using:

```plain
npm i @aventusjs/cli
```

While the CLI is powerful for scripting and automation, it is still recommended to use the VSCode extension for development, as it includes all necessary tools in a user-friendly interface.

Useful CLI commands include:

- <mark>av format [aventus.conf.avt]</mark> to format every Aventus file in a project; the optional
        configuration path selects the project explicitly.
- <mark>av dependencies help-llm</mark> to generate dependency documentation for AI tools.
- <mark>av update</mark> to update the CLI package.

## Source code

The Aventus source code can be downloaded on [github.](https://github.com/Cobwebsite/Aventus)

---
# UI and experience

## Vscode UI

The Aventus extension will edit vscode user interface to add some features.

### The create option

When you right click on the vscode file explorer, you can notice that you have a new option named:  **Aventus :
        Create...** .

![](https://aventusjs.com/img/doc/install/experience/aventus_create.png)

If you click on it, a dropdown appears and you can select what you want to create.

-  **Init**  Create a new project
-  **Component**  Create a webcomponent
-  **Data**  Create a data structure
-  **RAM**  Create a storage
-  **Library**  Create a file to write any code
-  **State**  Create a state or a state manager

### The compilation information

If you have at least one build, on the bottom of the vscode you can see a tick and a time. If you hover this text,
    you will see the last time your build was compiled.

Use the <mark>aventus.ideBuild</mark> workspace setting to choose if builds are compiled by the IDE.
    This does not disable those builds for CLI commands.

![](https://aventusjs.com/img/doc/install/experience/last_compiled.png)

### The live server

If you have at least one build, on the bottom of the vscode you can see a play button. If you click on it, the live
    sever will start and a stop button will replace the play button.

![](https://aventusjs.com/img/doc/install/experience/start_server.png)

You can customize the live server inside the vscode
    settings under  **Aventus &gt; Liveserver** .

### Database and migration tools

Files ending with <mark>.db.avt</mark> open in the Aventus database diagram editor. The editor keeps the
    diagram and its text document synchronized.

The command <mark>Aventus : Create migration</mark> compares database schemas and generates a migration.
    Database access uses the <mark>AventusSharp.DatabaseQuery</mark> .NET tool, which the extension can install
    when needed.

![](https://aventusjs.com/img/doc/install/experience/db.png)

### C# and PHP exports

The VS Code extension recognizes <mark>aventus.sharp.avt</mark> and
    &nbsp;<mark>aventus.php.avt</mark>. Use <mark>Aventus : Export sharp</mark> or
    &nbsp;<mark>Aventus : Export Php</mark> to generate the corresponding TypeScript definitions.

C# export requires .NET and the global <mark>AventusSharp.Converter</mark> tool. The extension can install
    it on first use; <mark>Aventus : Update sharp tools</mark> updates installed C# converter and database
    query tools. PHP export requires PHP, Composer and the Aventus PHP transpiler.

In <mark>aventus.sharp.avt</mark>, HTTP router and WebSocket export use the compiled assembly by default
    (<mark>useCompiledDll</mark>). The application must call <mark>app.UseAventusExport()</mark>
    so its endpoints can be inspected without starting normally. HTTP generation can also enable
    &nbsp;<mark>cacheByDefault</mark>, <mark>clearCacheFct</mark> and <mark>addFormData</mark>.

---
# Create your first project

## Init the project

In your file explorer create a new folder <mark>HelloAventus</mark> and open it with vscode.

You can create a new file named <mark>aventus.conf.avt</mark>. The minimal content for your config file is
    the following


```json filename=/HelloAventus/aventus.conf.avt
{
    "module": "HelloAventus",
    "componentPrefix": "ha",
    "build": [
        {
            "name": "Main",
            "src": [],
            "compile": [{
                "output": "./dist/helloaventus.js"
            }]
        }
    ]
}
```

The section <mark>module</mark> define the container name for the compiled code. Following the best
    practice, we minimize
    the use of global variables by wrapping the final code inside module. In this example, you can reach your compiled
    code
    by typing  *HelloWorld.**  inside the dev console.

The section <mark>componentPrefix</mark> define the prefix for the webcomponents. For example the tag name
    for a
    webcomponent class  *Test*  will be  *ha-test* .

The section <mark>build</mark> define all builds information. A build is a set of Aventus input file
    compiled as a single
    js file. You must provide at least 3 fields. <mark>name</mark> that define the unique name for your
    build,
    &nbsp;<mark>src</mark> that define where the compiler must look for Aventus file and <mark>compile[0].output</mark> that define where
    the compiler must write the compiled file. For the example the field  *includeBase*  is added to auto import
    Aventus source code.


When you save the config file a new file is created inside your workspace :  */dist/helloaventus.js* . The js file
    is your code compiled. Actually the file is empty because we didn't write any code.


There are more options for the config file that you can read here

Now you can create a new folder named <mark>src</mark> and edit the field build.src like that

```json filename=/HelloAventus/aventus.conf.avt
{
    "module": "HelloAventus",
    "componentPrefix": "ha",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ],
            "compile": [{
                "output": "./dist/helloaventus.js"
            }]
        }
    ]
}
```

This means that any <mark>*.avt</mark> file found will be compiled inside this build.

Now it's time to create your first webcomponent. You can right click inside the explorer part and click on <mark>Aventus
        : Create...</mark>

![](https://aventusjs.com/img/doc/install/firstapp/create_option.png)

A dropdown appears. Select the option : <mark>Component</mark>

![](https://aventusjs.com/img/doc/install/firstapp/create_menu.png)

Then you must enter the name for your WebComponent, call it MyComponent
    (<mark>&lt;ha-my-component&gt;&lt;/ha-my-component&gt;</mark>), press enter and select multiple files.
    Three new files are
    created

- <mark>MyComponent.wcl.avt</mark> - the file for the logic written in Typescript
- <mark>MyComponent.wcs.avt</mark> - the file for the style written in SCSS
- <mark>MyComponent.wcv.avt</mark> - the file for the view written in HTML

We will add some code inside the component to write an hello Aventus text in orange

```typescript filename=/HelloAventus/src/MyComponent.wcl.avt
export class MyComponent extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods

    //#endregion

}
```

```css filename=/HelloAventus/src/MyComponent.wcs.avt
/* :host is the style apply on your component */
:host {
    background-color: gray;
    .orange {
        color: #e5540e;
    }
}
```

```html filename=/HelloAventus/src/MyComponent.wcv.avt
<p>Hello <span class="orange">Aventus</span></p>
```

```json filename=/HelloAventus/aventus.conf.avt
{
    "module": "HelloAventus",
    "componentPrefix": "ha",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ],
            "compile": [{
                "output": "./dist/helloaventus.js"
            }]
        }
    ]
}
```

To show your first component you need an index file. Create a <mark>/static</mark> folder and a <mark>/static/index.html</mark> and add
    the content below:

```typescript filename=/HelloAventus/src/MyComponent.wcl.avt
export class MyComponent extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods

    //#endregion

}
```

```css filename=/HelloAventus/src/MyComponent.wcs.avt
/* :host is the style apply on your component */
:host {
    background-color: gray;
    .orange {
        color: #e5540e;
    }
}
```

```html filename=/HelloAventus/src/MyComponent.wcv.avt
<p>Hello <span class="orange">Aventus</span></p>
```

```html filename=/HelloAventus/static/index.html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hello Aventus</title>
        <script src="/helloaventus.js"></script>
    </head>
    <body>
        <ha-my-component></ha-my-component>
    </body>
</html>
```

```json filename=/HelloAventus/aventus.conf.avt
{
    "module": "HelloAventus",
    "componentPrefix": "ha",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ],
            "compile": [{
                "output": "./dist/helloaventus.js"
            }]
        }
    ]
}
```

This code will load the compiled file  *helloaventus.js*  in your dist folder. To export static file, you need to
    add a new section inside your config.

```typescript filename=/HelloAventus/src/MyComponent.wcl.avt
export class MyComponent extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods

    //#endregion

}
```

```css filename=/HelloAventus/src/MyComponent.wcs.avt
/* :host is the style apply on your component */
:host {
    background-color: gray;
    .orange {
        color: #e5540e;
    }
}
```

```html filename=/HelloAventus/src/MyComponent.wcv.avt
<p>Hello <span class="orange">Aventus</span></p>
```

```html filename=/HelloAventus/static/index.html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hello Aventus</title>
        <script src="/helloaventus.js"></script>
    </head>
    <body>
        <ha-my-component></ha-my-component>
    </body>
</html>
```

```json filename=/HelloAventus/aventus.conf.avt
{
    "module": "HelloAventus",
    "componentPrefix": "ha",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ],
            "compile": [
                {
                    "output": "./dist/helloaventus.js"
                }
            ]
        }
    ],
    "static": [
        {
            "name": "Static",
            "input": "./static/*",
            "output": "./dist/"
        }
    ]
}
```

This code will export every file from <mark>/static</mark> to <mark>/dist</mark>. You can
    save your config file.

Now you can launch the Aventus live server by clicking on the start server button.

![](https://aventusjs.com/img/doc/install/firstapp/start_server.png)

Well done, you created your first Aventus App.

---
# Configuration - Basic info

To create an application with Aventus, you need to define a file named <mark>aventus.conf.avt</mark>. This file will define
    what Aventus must do with your code. The configuration is a json file with properties that are going to be explained
    below.

|Name|Description|
|---|---|
|module|This is the name of the module you are building. All your code will be inside             the module to avoid global variables.             &nbsp;Must satisfy: <mark>^[a-zA-Z0-9_]+$</mark>         &nbsp;|
|version|This is the version of the module you are building. The first number is the             major version, the second is the minor version and the last is the patch version. By default the value is             1.0.0             &nbsp;Must satisfy: <mark>^[0-9]+\.[0-9]+\.[0-9]+$</mark>         &nbsp;|
|organization|This is the name of organization for the module you are building. This is usefull if you want to publish your package under a specific organization.             &nbsp;Must satisfy: <mark>^[a-zA-Z0-9_@]+$</mark>         &nbsp;|
|description|This is the description of the module you are building. This is usefull if you want to publish your package.|
|documentation|This is the documentation link for the module you are building. This is usefull if you want to publish your package.|
|repository|This is the repository link for the module you are building. This is usefull if you want to publish your package.|
|tags|This is an array of string to tag your project on the store. This is usefull if you want to publish your package.|
|readme|This is the path to the readme. By default, Aventus check Readme in the same folder as the configuration. This is usefull if you want to publish your package.|
|componentPrefix|This is the prefix that are going to be used by all your webcomponents inside the module. For example if my class is named "Test" and my prefix is "av", the final tag will be "av-test". By default, it will use the module name as prefix.             &nbsp;Must satisfy: <mark>^[a-z]{2,}$</mark>         &nbsp;|
|hideWarnings|This is a boolean to hide warnings inside Aventus. This is useful when you are developing an app but your aren't in production. If you set it to false, you need to document all your methods             &nbsp;Must satisfy: <mark>true|false</mark>         &nbsp;|
|avoidParsingInsideTags|This is an array of string that the HTML compiler must avoid parsing. For example on this website, the tag av-code isn't parsed by the compiler to avoid detecting some Aventus features inside the HTML code like @element.             &nbsp;Each string must satisfy: <mark>^[a-z-]+$</mark>         &nbsp;|
|aliases|This maps import aliases to folders. For example, <mark>{ "@root": "./src/" }</mark>             allows imports such as <mark>import { User } from "@root/data/User.data.avt"</mark>. When an             auto-import resolves inside an aliased folder, the language server writes the alias form instead of a long             relative path.|
|build|This is an array of build options. Each build is defined by a list of input and will output a .js file and / or a package.avt file         &nbsp;|
|dependencies|This is an object of dependency options.|
|namespaceStrategy|Global namespace strategy: <mark>manual</mark>, <mark>followFolders</mark>,             &nbsp;<mark>followFoldersCamelCase</mark> or <mark>rules</mark>.|
|namespaceRoot|Root folder used by folder-based namespace strategies.|
|namespaceRules|Path patterns used when <mark>namespaceStrategy</mark> is             &nbsp;<mark>rules</mark>.|
|static|This is an array of static options.         &nbsp;|

---
# Configuration - Build

Inside a module, you can split you code into differents submodules. Inside Aventus, this submodule is called a
    &nbsp;<mark>Build</mark>. The build job is to transform some Aventus input files into a JavaScript file (for an
    app) and/or a
    Aventus Package File (for a lib).


Aventus 1.5 uses the TypeScript 6 compiler with the ES2025 and Temporal libraries. Decorators use the current
    standard decorator model; Aventus decorators keep the same source syntax while receiving stricter type checking.

|Name|Description|
|---|---|
|module|This will override the module value of the basic config.         &nbsp;|
|name|             &nbsp;This is the name for the build. If the build is exported as a library, the                 library name                 will be <mark>$module</mark>@<mark>$name</mark>         &nbsp;|
|description|This will override the description value of the basic config.|
|tags|This will override the tags value of the basic config.|
|documentation|This will override the documentation value of the basic config.|
|repository|This will override the repository value of the basic config.|
|organization|This will override the organization value of the basic config.|
|readme|This will override the readme value of the basic config.|
|version|This will override the version value of the basic config.         &nbsp;|
|disabled|This is a boolean to define if the build is active or not.             &nbsp;Must satisfy: <mark>true|false</mark>         &nbsp;|
|hideWarnings|This will override the hideWarnings value of the basic config.         &nbsp;|
|componentPrefix|This will override the componentPrefix value of the basic config.         &nbsp;|
|src|This is an array of string to define which folders Aventus will watch. For             example, if you set "./src/*", all files inside the folder "src" will be watched.         &nbsp;|
|compile|This is an array to define how to compile your build.         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;input|This is string or an array to define the entries points of your program. If not             set, all the files matching the build.src will be compiled. Otherwise, only the needed file by your entries             points will be compiled         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;output|This is a string, array or object defining the generated JavaScript outputs. An             object can select an output for each imported library and must contain <mark>@default</mark>.             Use <mark>@npm</mark> for npm exports. Each selected output can be a path or an object containing             &nbsp;<mark>path</mark> and <mark>compressed</mark>.         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;outputNpm|This is a string or an array to define where to export your project to npm             project. It can also be a object to customize settings.         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;path|This is a string or an array to define where to export your project to npm             project         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;packageJson|This is a boolean to define if you need a package.json when you are exporting         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;npmName|This is a string to define the name inside the package.json when you are             exporting         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;manifest|This is a boolean to define if you need to generate manifest for your             components. This will help developers to use your components inside the IDE.         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;live|This is a boolean to define if the npm content must be recompiled on change.             Default is false         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;package|This is string to define where the .package.avt file must be written.             &nbsp;Must satisfy: ^\S+\.package\.avt         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;compressed|This is boolean to define if the final build must be compressed.         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;i18n|This is string to define where to export i18n files. You can also define an             array of object to have more options         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;output|This is string to define where to export i18n files.         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mount|This is string to define the http path to mount your i18n files.         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mode|             &nbsp;This is string to define how aventus must compile your i18n.             &nbsp;                 &nbsp;singleFile: export all translations inside a single file                 &nbsp;oneToOne: export translation inside the same file name as input                 &nbsp;groupComponent: group components transaltions inside a single file                 &nbsp;basedOnAttribute: WIP                 &nbsp;include: WIP             &nbsp;         &nbsp;|
|stories|This is an object to configure how to export storybook for your package.         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;output|This is a string to define where to export storybook         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;workspace|This is a string to define where to add the .storybook folder         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;live|             &nbsp;This is a boolean to define if the story content must be recompiled on change or only with the                 command             &nbsp;<mark>Aventus : Build storybook</mark>         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;prefix|This is a string to prefix all your stories to group stories         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;format|             &nbsp;This is a string to define how Aventus must deal with elements to export to storybook.             &nbsp;                 &nbsp;all: export all elements                 &nbsp;public: only public elements will be exported                 &nbsp;protected: only public + protected elements will be exported                 &nbsp;manual: only elements with tag Storybook will be exported             &nbsp;         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;srcBaseUrl|             &nbsp;This is a string to define a base url to link file to your repo.         &nbsp;|
|outsideModule|             &nbsp;This is an array of string to define which folders Aventus will watch. The                 watched file will be compiled outside of the module. For example, if you define a class "Test" inside a                 module "HelloWorld", you can reach the class by typing <mark>window.Test</mark> instead of                 &nbsp;<mark>window.HelloWorld.Test</mark>             &nbsp;         &nbsp;|
|namespaceStrategy|             &nbsp;This is a string to define how Aventus must deal with namespace.             &nbsp;                 &nbsp;manual: the developer will write the namespace by himself                 &nbsp;followFolders: the namespace will be set based on the current folder and the namespaceRoot property                 &nbsp;                 &nbsp;followFoldersCamelCase: same as followFolders but formatted in camel case                 &nbsp;                 &nbsp;rules: the namespace will be set based on the namespaceRules property             &nbsp;         &nbsp;|
|namespaceRoot|             &nbsp;This is a string to define what is the namespace root folder (only for followFolders strategy)         &nbsp;|
|namespaceRules|             &nbsp;This is an object to define the namespace based on the uri where the key is the namespace and the                 value is an array of string to match uri             &nbsp;         &nbsp;|
|dependencies|             &nbsp;This is an object of dependency options to                 use code and/or autocompletion inside your code.         &nbsp;|
|nodeModulesDir|The path where the node_modules are installed. By default the value is             ./node_modules         &nbsp;|
|avoidParsingInsideTags|This will override the avoidParsingInsideTags value of the basic config.         &nbsp;|
|i18n|Configuration for i18n|
|&nbsp;&nbsp;&nbsp;&nbsp;locales|This is an array of string to define locales that is required inside your             project|
|&nbsp;&nbsp;&nbsp;&nbsp;fallback|Define the fallback locale|
|&nbsp;&nbsp;&nbsp;&nbsp;autoRegister|Define if aventus must autoRegister your i18n files. Default is             true|

---
# Configuration - Static

Even if Aventus is great for your project, you will need others files like .html, .png, etc. You can put your source file inside a static folder that will be exported.

## Properties

|Name|Description|
|---|---|
|name|This is the name for the static part. This name is only use if you use the command "Aventus : Copy static" to allow the user to choose the right folder to export.         &nbsp;|
|input|This is a string to define which folder Aventus will watch. For             example, if you set "./src/static/*", all files inside the folder "src/static" will be exported.         &nbsp;|
|output|This is string to define where the static files will be exported.         &nbsp;|

## Special files

Inside the static folder, you can write some specials files that will be compiled to be supported by the browser.

### Sass

You can write sass file inside the static folder that will be compiled to a css file. If your file name starts with a <mark>_</mark> Aventus will ignore it. (ex: _reset.scss)

### Global Style

A good practice to develop a website is to declare theme variables and then use it inside your webcomponent. To do that, you can write a file <mark>*.gs.avt</mark> that will be compiled to a css file. The only goal of this file is to provide autocompletion for your css variables declared inside the <mark>:root</mark>.

```css filename=theme.gs.avt
:root {
    --primary-color: #20232a;
    --light-primary-color: #282c34;
    --aventus-color: #e5540e;
    --primary-font-color: white;
    --link-color: #5680ed;
    ...
}
```

---
# Configuration - Libraries

When you create a build, you might like to import a library to reuse some code parts. Here you are going to learn how
    to define all libs that must be imported inside a build. You can find package to download by searching inside the
    aventusjs store : <mark>[https://store.aventusjs.com](https://store.aventusjs.com/)</mark>

The easiest format is the following : 

```json
{
    "dependencies": {
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
|subDependenciesInclude|             &nbsp;This is a object where the key is the sub library name and the value is the inclusion pattern. The                 will define how the library of the library must be included inside output js file.             &nbsp;                 &nbsp;none: No need to include the sub lib inside the output file.                 &nbsp;need: Include only the needed code inside the output file. (This is the default value)                 &nbsp;full: Include all the code of the sub lib inside the ouput file.             &nbsp;         &nbsp;|

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
    "dependencies": {
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
    dependencies: {
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

You can resolve a dependency via HTTP. The package is stored inside <mark>storage&gt;packages&gt;http</mark>. In this
    folder, you must find
    a list
    of subfolder where the name is the md5 value of the uri that you set as uri. The entry point is a json named
    &nbsp;<mark>info.json</mark>


When a specific version is required, Aventus will use the uri to download the file and save it inside the folder as
    &nbsp;<mark>$name</mark>#<mark>$version</mark> (ex: Aventus@Main#1.0.0.package.avt) and add a <mark>localUri</mark> property that will be
    used inside the build.


---
# Data

In this section you are going to learn what is a data and how you can create it inside Aventus.

## Definition

A data is a class that define an object structure. This class reflects what the application will contain. This is the
    backbone of your application and most of the times, all data structures will be a copy from your backend object.

## Inside Aventus

Inside Aventus you can create a new Data class by right clicking on the explorer part inside vscode, choose
    &nbsp; *Aventus
        : Create...*  and choose  *Data* . Inside the input you can enter the name for the class. This will create
    a basic data class:


```typescript filename=/ExampleData/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
	public id: number = 0;
}
```

```json filename=/ExampleData/aventus.conf.avt
{
    "module": "ExampleData",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ],
            "compile": [
                {
                    "output": "./dist/helloaventus.js"
                }
            ]
        }
    ]
}
```

All classes inside a <mark>*.data.avt</mark> must implements <mark>Aventus.IData</mark>. This
    will ensure that each data class instance can be identified by the <mark>$type</mark> field that must be
    unique. Furthermore, a static field named <mark>Fullname</mark> must be implemented.

```typescript filename=/ExampleData/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
	public id: number = 0;
}
```

```typescript filename=/ExampleData/src/Test.lib.avt
import { Person } from "./Person.data.avt";

export class Test {
    public demo() {
        console.log(Person.Fullname);
        let p = new Person();
        console.log(p.$type);
        // $type and Fullname must be identical
    }
}
```

```json filename=/ExampleData/aventus.conf.avt
{
    "module": "ExampleData",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ],
            "compile": [
                {
                    "output": "./dist/helloaventus.js"
                }
            ]
        }
    ]
}
```


    By default your data class extends <mark>Aventus.Data</mark> with the following impletemented properites
    :


```typescript filename=Data.data.avt
export abstract class Data implements IData {
    /**
    * The class schema / This field is defined during compilation
    */
    public static readonly $schema: { [prop: string]: string; };
    /**
    * The current namespace / This field is defined during compilation
    */
    public static readonly Namespace: string = "";
    /**
    * Get the unique type for the data. Define it as the namespace + class name
    */
    public static get Fullname(): string { return this.Namespace + "." + this.name; }
    /**
    * The current namespace
    */
    public get namespace(): string {
        return this.constructor['Namespace'];
    }
    /**
    * Get the unique type for the data. Define it as the namespace + class name
    */
    public get $type(): string {
        return this.constructor['Fullname'];
    }
    /**
    * Get the name of the class
    */
    public get className(): string {
        return this.constructor.name;
    }
    /**
    * Get a JSON for the current object
    */
   public toJSON() {...}
   /**
   * Clone the instance through Aventus conversion metadata
   */
   public clone(): this {...}
}
```


    During the compilation of a data class, the static field <mark>Namespace</mark> is defined. With this
    field you can create an unique type name that allows to clearly identify each data inside your application. Because
    Javascript is not typed, a <mark>$schema</mark> is created for each class to keep information about what
    the class must contain. In future version of Aventus, this will help the manager to synchronize data between each
    instances and restore typed values when JSON is converted.


The last thing to know is that every properties must have an initializer.

```typescript filename=Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0; // This is ok
    public firstname?: string; // This will trigger an error
    public lastname: string = ''; // This is ok
    public fullname?: string = undefined; // This is ok
    public birthday!: string; // This is ok
}
```

---
# GenericError

When you create function that can fail you can use the error strategy developed by Aventus. Instead of returning the
    function result, the result is wrapped inside an container named <mark>GenericError</mark>, <mark>VoidWithError</mark>, and <mark>ResultWithError</mark>. They are all
    useful tools for managing errors and results in your application. They provide a structured way to represent error
    conditions and action outcomes, helping you write more robust and maintainable code.

<mark>Aventus.GenericError</mark> is a generic error class that provides a structured way to represent
    errors in your application. It
    allows you to define an error code along with a message to describe the error. The error code can be of any type
    that extends either number or an enumeration (Enum). By extending GenericError, you can create specific error types
    tailored to different error scenarios in your application.

The constructor accepts an error code and any message value. Native <mark>Error</mark> instances use their
    message, while other values are converted to strings. Use <mark>details</mark> for structured supplementary
    information.

```typescript filename=Example.lib.avt
// Define an enumeration for error codes
export enum MyErrorCode {
    NotFound = 404,
    InvalidInput = 400,
    InternalServerError = 500
}
// Create a specific error class extending GenericError
export class MyError extends GenericError<MyErrorCode> { }
```

---
# VoidWithError

<mark>Aventus.VoidWithError</mark> represents the result of an action that may produce errors but does not
    return
    a specific result value. It encapsulates the outcome of the action along with any errors that occur during its
    execution. This class is useful when you want to handle the success or failure of an action without necessarily
    needing a result value.

```typescript filename=Example.lib.avt
const validation = SomeValidation.validate(data);
if (validation.success) {
    // Proceed with further operations
} else {
    // Handle validation errors
    console.error("Validation errors:", validation.errors);
}
```

## Composition helpers

- <mark>containsCode(code, type?)</mark> checks whether a code is present.
- <mark>run()</mark> and <mark>runAsync()</mark> execute only while the result is successful and merge returned errors.
- <mark>extract()</mark> and <mark>extractAsync()</mark> unwrap a ResultWithError and propagate its errors.
- <mark>toGeneric()</mark> removes a specialized error type.

---
# ResultWithError

<mark>Aventus.ResultWithError</mark> is similar to Aventus.VoidWithError, but it also includes a result
    value along with
    potential errors. It represents the outcome of an action that produces a specific result, such as the result of a
    function call or an operation. This class allows you to handle both the result of the action and any errors that may
    occur during its execution.

```typescript filename=Example.lib.avt
const result = SomeOperation.execute();
if (result.success) {
    // Handle successful result
    console.log("Result:", result.result);
} else {
    // Handle errors
    console.error("Error:", result.errors[0].message);
}
```

Below you can find an implementation example for a function that must transform a string in lowercase.

```typescript filename=/Tools/src/StringExtension.lib.avt
// List of available codes
export enum StringErrorCode {
    EmptyString = 400
}

// Error
export class StringError extends Aventus.GenericError<StringErrorCode> { }

// Result of the function ( = container)
export class StringResult extends Aventus.ResultWithError<{ lower: string; }, StringError> { }

export class StringExtension {

    public static toLower(txt: string): StringResult {
        let result = new StringResult();
        if(!txt) {
            let error = new StringError(StringErrorCode.EmptyString, "Please provide a string");
            result.errors.push(error);
        }
        else {
            result.result = { lower: txt.toLowerCase() };
        }

        return result;
    }

}
```

```typescript filename=/Tools/src/Test.lib.avt
import { StringExtension } from "./StringExtension.lib.avt";

export class Test {
    public static run() {
		const result = StringExtension.toLower("");
		/*
			result.success = false
			result.errors = [ { code: 400, message: "Please provide a string" } ]
			result.result = undefined
		*/

		const result2 = StringExtension.toLower("HELLO");
		/*
			result.success = true
			result.errors = []
			result.result = { lower: 'hello' }
		*/
	}
}
```

```json filename=/Tools/aventus.conf.avt
{
	"module": "Tools",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

<mark>ResultWithError</mark> inherits all composition helpers from
    &nbsp;<mark>VoidWithError</mark>. Its <mark>run()</mark> and <mark>runAsync()</mark> methods
    also copy the successful result returned by another <mark>ResultWithError</mark>.

---
# Aventus HTTP Layer

The Aventus HTTP layer provides a high-level, type-safe abstraction on top of the native fetch API.
    It simplifies common networking patterns such as:

- Sending and handling HTTP requests
- Managing JSON, text, and binary (blob) responses
- Intercepting and transforming requests and responses
- Managing errors in a consistent way
- Automatically handling form data and method spoofing (PUT/DELETE)
- Integrating with HttpRouter for clean endpoint definitions

At its core, the system revolves around the HttpRequest class, a powerful yet flexible utility
that makes HTTP communication declarative, predictable, and framework-agnostic.

---
# Request

The <mark>HttpRequest</mark> class provides a robust abstraction over the native fetch API.
    It integrates tightly with Aventus error management system (<mark>ResultWithError</mark>, <mark>VoidWithError</mark>) and supports advanced features like automatic JSON/FormData handling,
    middleware, and method spoofing.

## Overview

The class is designed to simplify request management while remaining flexible and framework-agnostic.

Key features:

- Automatic serialization (JSON or FormData)
- Optional method spoofing (_method fields for PUT/DELETE)
- Unified error/result handling
- Lifecycle hooks for pre- and post-processing requests
- Built-in support for file uploads and nested object serialization

## Static Configuration

Registers global configuration options that affect all HTTP requests.

```ts
HttpRequest.configure({
  beforeSend: async (request) => {
    // Add auth headers or cancel request
    request.setHeader("Authorization", "Bearer token");
    return new VoidWithError();
  },
  responseMiddleware: async (response, request) => {
    // Global response interceptor
    if(response.containsCode(401)) {
        location.path = "/login";
    }
    return response;
  },
});
```

## Create a request

Creates a new HTTP request via constructor:

```ts
const request = new HttpRequest("/api/users", HttpMethod.POST, {
    name: "Alice",
    age: 28,
});
```

Or with setters:

```ts
const request = new HttpRequest("/api/users");
request.setMethod(HttpMethod.POST);
request.setBody({
    name: "Alice",
    age: 28,
});
// request.enableMethodSpoofing();
```

## Request cache

Enable the built-in cache for responses that can be reused.

```typescript
request.enableCache();
const result = await request.queryJSON<User[]>();
request.clearCache();
```

Use <mark>disableCache()</mark> to force the next query to reach the server.

## Body Serialization

The <mark>HttpRequest</mark> class automatically detects how to encode the body:

- If it contains File objects or arrays of files → it uses <mark>FormData</mark>.
- Otherwise → it serializes the body as JSON

## Query Methods

All query methods return either a <mark>ResultWithError&lt;T&gt;</mark> or a <mark>VoidWithError</mark>, ensuring safe and typed responses.

### query

Executes the request and returns an <mark>Aventus.HttpResponse</mark>, wrapped in a
    &nbsp;<mark>ResultWithError</mark>. It exposes the native response metadata such as status, headers, URL and
    redirect state.

```ts
const result = await request.query();
if (!result.success) return console.error(result.errors);
const data = await result.result.json<User[]>();
```

<mark>HttpResponse</mark> retains its parsed body, so <mark>json()</mark>,
    &nbsp;<mark>text()</mark> or <mark>blob()</mark> can return the same cached content without consuming
    the native response body again.

### queryJSON

Parses the response as JSON and automatically transforms it into the expected type.

```ts
const result = await request.queryJSON<User>();
if (result.success) console.log(result.result);
```

### queryTxt

Reads the response as plain text.

```ts
const result = await request.queryTxt();
console.log(result.result);
```

### queryBlob

Reads the response as a binary blob, useful for files or images.

```ts
const result = await request.queryBlob();
saveAs(result.result, "file.pdf");
```

### queryVoid

For endpoints that return no data (e.g., DELETE requests or 204 No Content responses).

```ts
const result = await request.queryVoid();
if (!result.success) console.error(result.errors);
```

## Integration with HttpRouter

You can optionally provide a <mark>HttpRouter</mark> instance to prefix relative URLs or manage base routes dynamically.

```ts
class UserRouter extends HttpRouter {
    protected override defineOptions(options: HttpRouterOptions): HttpRouterOptions {
        return { ...options, url: "/api/users" };
    }
}
const userRouter = new UserRouter();
const req = new HttpRequest("/1", HttpMethod.GET);
const result = await req.queryJSON<User>(userRouter);
```

This produces a request to /api/users/1.

---
# Router

The <mark>HttpRouter</mark> class defines the base endpoint configuration for HTTP requests in the Aventus
    framework.
    It acts as the root router used by all requests to determine the base URL and to perform RESTful operations.

## Overview

A HttpRouter instance is responsible for:

- Defining the base URL (via its options).
- Providing helper methods for common HTTP verbs (get, post, put, delete, option).
- Automatically integrating with the <mark>HttpRequest</mark> system, which handles body parsing,
        headers, and response transformation.

You can subclass <mark>HttpRouter</mark> to customize its endpoint behavior or base URL.

Use <mark>HttpRouter.configure(options)</mark> to change the global defaults. Override
    &nbsp;<mark>defineOptions(options)</mark> in a subclass for router-specific configuration. The constructor does
    not accept options.

By default, the router's base URL is set to the current domain:

```ts
location.protocol + "//" + location.host
```

## Example

```ts
export class PersonRouter extends Aventus.HttpRouter {
    protected override defineOptions(options: Aventus.HttpRouterOptions): Aventus.HttpRouterOptions {
        options.url = location.protocol + "//" + location.host + "/person";
        return options;
    }
}

// Usage:
const router = new PersonRouter();
const result = await router.get<Person[]>("/units");
```

---
# Route

The <mark>HttpRoute</mark> class represents a controller layer that uses a <mark>HttpRouter</mark> to perform requests.
It's designed to group related endpoints under a single class, just like a controller in traditional MVC frameworks.

## Overview

A HttpRoute:

- Holds a reference to a <mark>HttpRouter</mark> (either provided or automatically created).
- Defines a base prefix for its routes via <mark>getPrefix()</mark>.
- Can expose multiple request methods that use this router to perform actions.

## Constructor

```ts
public constructor(router?: HttpRouter)
```

- If a router is provided, it will be used for all requests.
- If not, a default new HttpRouter instance is created.

## Example: Basic Controller

```ts
export class AuthLoginController extends Aventus.HttpRoute {
    @BindThis()
    public async request(body: Request): Promise<Aventus.ResultWithError<string>> {
        const request = new Aventus.HttpRequest(
            `${this.getPrefix()}/api/login`,
            Aventus.HttpMethod.POST
        );
        request.setBody(body);
        return await request.queryJSON<string>(this.router);
    }
}
```

This controller:

- Uses the router from the base HttpRoute.
- Sends a POST request to /api/login.
- Returns a typed response (ResultWithError&lt;string&gt;).

## Example: Advanced Usage with Custom Router

You can also extend both <mark>HttpRouter</mark> and <mark>HttpRoute</mark> together:

```ts
export class SettingsRouter extends Aventus.HttpRouter {
    protected override defineOptions(options: Aventus.HttpRouterOptions): Aventus.HttpRouterOptions {
        options.url = location.protocol + "//" + location.host + "/settings";
        return options;
    }
}

export class SettingsRoute extends Aventus.HttpRoute {
    public constructor(router?: Aventus.HttpRouter) {
        super(router ?? new SettingsRouter());
    }

    @BindThis()
    public async save(body: Settings | FormData): Promise<Aventus.VoidWithError> {
        const request = new Aventus.HttpRequest(`${this.getPrefix()}/save`, Aventus.HttpMethod.POST);
        request.setBody(body);
        return await request.queryVoid(this.router);
    }

    @BindThis()
    public async get(): Promise<Aventus.ResultWithError<Settings>> {
        const request = new Aventus.HttpRequest(`${this.getPrefix()}/get`, Aventus.HttpMethod.GET);
        return await request.queryJSON<Settings>(this.router);
    }
}
```

Together, they form a modular, extensible HTTP layer where:

- Routers define where requests go.
- Routes define what requests do.

---
# RAM - Create

In this section you are going to learn what is a RAM and how you can create it inside Aventus.

## Definition

A RAM is a class that store all your data instances. This class
    is most of the time a singleton because we want only one storage by type. This piece of code is in charge of all
    CRUD (Create / Read / Update / Delete) operations.

## Inside Aventus

Inside Aventus you can create RAM by right clicking on the explorer part inside vscode, choose  *Aventus
        : Create...*  and choose  *RAM* . Inside the input you can enter the name of the class for which you create
    a store (ex: Person will create a PersonRAM class). This will create a basic RAM class:

```typescript filename=/ExampleRAM/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/ExampleRAM/src/Person.ram.avt
import { Person } from "./Person.data.avt";

export class PersonRAM extends Aventus.Ram<Person> implements Aventus.IRam {

    /**
    * Create a singleton to store data
    */
    public static getInstance() {
        return Aventus.Instance.get(PersonRAM);
    }

    /**
    * @inheritdoc
    */
    public override defineIndexKey(): keyof Person {
        return 'id';
    }

    /**
    * @inheritdoc
    */
    protected override getTypeForData(objJson: Aventus.KeysObject<Person> | Person): new () => Person {
        return Person;
    }
    protected override async transformCreateRequestToItem(item: Person): Promise<Aventus.ResultWithError<Person>> {
        const result = new Aventus.ResultWithError<Person>();
        result.result = item;
        return result;
    }

    protected override async transformCreateRequestListToItem(items: Person[]): Promise<Aventus.ResultWithError<Person[]>> {
        const result = new Aventus.ResultWithError<Person[]>();
        result.result = items;
        return result;
    }

    protected override async transformUpdateRequestToItem(item: Person): Promise<Aventus.ResultWithError<Person>> {
        return this.transformCreateRequestToItem(item);
    }

    protected override async transformUpdateRequestListToItem(items: Person[]): Promise<Aventus.ResultWithError<Person[]>> {
        return this.transformCreateRequestListToItem(items);
    }


}
```

```json filename=/ExampleRAM/aventus.conf.avt
{
    "module": "ExampleRAM",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ]
        }
    ]
}
```

By default, the Aventus.RAM store data by index that must be a <mark>number</mark>. The method <mark>defineIndexKey</mark> ask
    you to define which key of your object is the primary key to index data. For example if you want to get a data
    inside your RAM you must provide a number that is egal to the index key defined. With the previous example, the code
    &nbsp;<mark>PersonRAM.getInstance().get(1)</mark> will check if the storage contains a Person where id is egal to 1.

If you need another kind of index key, you can extend <mark>Aventus.GenericRam</mark> instead of Aventus.Ram

```typescript filename=/ExampleRAM/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: string = "";
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/ExampleRAM/src/Person.ram.avt
import { Person } from "./Person.data.avt";

// now the key to identify a person must be a string
export class PersonRAM extends Aventus.GenericRam<string, Person> implements Aventus.IRam {

    /**
    * Create a singleton to store data
    */
    public static getInstance() {
        return Aventus.Instance.get(PersonRAM);
    }

    /**
    * @inheritdoc
    */
    public override defineIndexKey(): keyof Person {
        return 'id';
    }

    /**
    * @inheritdoc
    */
    protected override getTypeForData(objJson: Aventus.KeysObject<Person> | Person): new () => Person {
        return Person;
    }
    protected override async transformCreateRequestToItem(item: Person): Promise<Aventus.ResultWithError<Person>> {
        const result = new Aventus.ResultWithError<Person>();
        result.result = item;
        return result;
    }

    protected override async transformCreateRequestListToItem(items: Person[]): Promise<Aventus.ResultWithError<Person[]>> {
        const result = new Aventus.ResultWithError<Person[]>();
        result.result = items;
        return result;
    }

    protected override async transformUpdateRequestToItem(item: Person): Promise<Aventus.ResultWithError<Person>> {
        return this.transformCreateRequestToItem(item);
    }

    protected override async transformUpdateRequestListToItem(items: Person[]): Promise<Aventus.ResultWithError<Person[]>> {
        return this.transformCreateRequestListToItem(items);
    }


}
```

```json filename=/ExampleRAM/aventus.conf.avt
{
    "module": "ExampleRAM",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ]
        }
    ]
}
```

The current RAM types can distinguish the payload sent to the backend from the resources returned by it:

```typescript
GenericRam<Index, Item, Request, ResourceSimple, ResourceDetails>
Ram<Item, Request, ResourceSimple, ResourceDetails>
```

<mark>Request</mark> is accepted by create, update and save operations. Stored values are
    &nbsp;<mark>ResourceDetails</mark>; list responses may use <mark>ResourceSimple</mark>. The shorter
    generic forms remain available when the same data type is used everywhere.

The <mark>getTypeForData</mark> method allows you to define which object must be instanciated for a specific data. This
    isn't usefull when you work with concrete classes but if you have abstract classes or interfaces, you have to define
    which child must be stored inside RAM.

```typescript filename=/ExampleRAM/src/Shape.data.avt
export abstract class Shape extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
}

export class Square extends Shape implements Aventus.IData {

}
export class Triangle extends Shape implements Aventus.IData {

}
```

```typescript filename=/ExampleRAM/src/Shape.ram.avt
import { Square, type Shape, Triangle } from "./Shape.data.avt";

export class ShapeRAM extends Aventus.Ram<Shape> implements Aventus.IRam {

    /**
    * Create a singleton to store data
    */
    public static getInstance() {
        return Aventus.Instance.get(ShapeRAM);
    }

    /**
    * @inheritdoc
    */
    public override defineIndexKey(): keyof Shape {
        return 'id';
    }

    /**
    * @inheritdoc
    */
    protected override getTypeForData(objJson: Aventus.KeysObject<Shape> | Shape): new () => Shape {
        if(objJson.$type == Square.Fullname) return Square;
        if(objJson.$type == Triangle.Fullname) return Triangle;

        throw 'Impossible'
    }
    protected override async transformCreateRequestToItem(item: Shape): Promise<Aventus.ResultWithError<Shape>> {
        const result = new Aventus.ResultWithError<Shape>();
        result.result = item;
        return result;
    }

    protected override async transformCreateRequestListToItem(items: Shape[]): Promise<Aventus.ResultWithError<Shape[]>> {
        const result = new Aventus.ResultWithError<Shape[]>();
        result.result = items;
        return result;
    }

    protected override async transformUpdateRequestToItem(item: Shape): Promise<Aventus.ResultWithError<Shape>> {
        return this.transformCreateRequestToItem(item);
    }

    protected override async transformUpdateRequestListToItem(items: Shape[]): Promise<Aventus.ResultWithError<Shape[]>> {
        return this.transformCreateRequestListToItem(items);
    }


}
```

```json filename=/ExampleRAM/aventus.conf.avt
{
    "module": "ExampleRAM",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ]
        }
    ]
}
```

---
# RAM - Operations

To manage data inside your RAM, can perfom 4 kind of operations :

- Create - To add data inside your RAM
- Read - To read data inside your RAM
- Update - To update data inside your RAM
- Delete - To delete data from your RAM

## Basic operations

Inside Aventus RAM, each function to perfom operation can be written in two format. The first format is the normal.
    You call the function and get the result.

The second format is the detailed. You call the function with <mark>WithError</mark> at the end to obtain more
    information.

```typescript filename=/ExampleRAM/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/ExampleRAM/src/Person.ram.avt
import { Person } from "./Person.data.avt";

export class PersonRAM extends Aventus.Ram<Person> implements Aventus.IRam {

    /**
    * Create a singleton to store data
    */
    public static getInstance() {
        return Aventus.Instance.get(PersonRAM);
    }

    /**
    * @inheritdoc
    */
    public override defineIndexKey(): keyof Person {
        return 'id';
    }

    /**
    * @inheritdoc
    */
    protected override getTypeForData(objJson: Aventus.KeysObject<Person> | Person): new () => Person {
        return Person;
    }
    protected override async transformCreateRequestToItem(item: Person): Promise<Aventus.ResultWithError<Person>> {
        const result = new Aventus.ResultWithError<Person>();
        result.result = item;
        return result;
    }

    protected override async transformCreateRequestListToItem(items: Person[]): Promise<Aventus.ResultWithError<Person[]>> {
        const result = new Aventus.ResultWithError<Person[]>();
        result.result = items;
        return result;
    }

    protected override async transformUpdateRequestToItem(item: Person): Promise<Aventus.ResultWithError<Person>> {
        return this.transformCreateRequestToItem(item);
    }

    protected override async transformUpdateRequestListToItem(items: Person[]): Promise<Aventus.ResultWithError<Person[]>> {
        return this.transformCreateRequestListToItem(items);
    }


}
```

```typescript filename=/ExampleRAM/src/Test.lib.avt
import { PersonRAM } from "./Person.ram.avt";

/**
* Return a person
*/
export async function query() {
    const p1 = await PersonRAM.getInstance().get(1);
}

/**
* Check if the get contains errors
*/
export async function queryWithError() {
    const { success, errors, result } = await PersonRAM.getInstance().getWithError(1);
    if(success) {
        const p1 = result;
    }
    else {
        for(let error of errors) {
            console.log(error.code + " " + error.message);
        }
    }
}
```

```json filename=/ExampleRAM/aventus.conf.avt
{
    "module": "ExampleRAM",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ]
        }
    ]
}
```

For the future explanations, only the functions in normal format will be explained

CRUD inputs use the RAM's <mark>Request</mark> type, while returned and stored items use
    &nbsp;<mark>RamItem&lt;ResourceDetails, Request&gt;</mark>. Consequently, an item's
    &nbsp;<mark>update(request)</mark> method sends the request directly through the RAM and returns the unique
    stored instance.

### Read

|Function|Description|
|---|---|
|getAll|Return all items stored inside the RAM as an array.         &nbsp;|
|getRecords|Return all items as a <mark>Map&lt;Index, RamItem&gt;</mark>.|
|getList|Return all items stored inside the RAM like T[]         &nbsp;|
|getById|Return the item where the index is egal to the parameter             provide|
|get|Alias for <mark>getById</mark>|
|getByIds|Return all items where the index is inside the first parameter             provide|

```typescript filename=/ExampleRAM/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/ExampleRAM/src/Person.ram.avt
import { Person } from "./Person.data.avt";

export class PersonRAM extends Aventus.Ram<Person> implements Aventus.IRam {

    /**
    * Create a singleton to store data
    */
    public static getInstance() {
        return Aventus.Instance.get(PersonRAM);
    }

    /**
    * @inheritdoc
    */
    public override defineIndexKey(): keyof Person {
        return 'id';
    }

    /**
    * @inheritdoc
    */
    protected override getTypeForData(objJson: Aventus.KeysObject<Person> | Person): new () => Person {
        return Person;
    }
    protected override async transformCreateRequestToItem(item: Person): Promise<Aventus.ResultWithError<Person>> {
        const result = new Aventus.ResultWithError<Person>();
        result.result = item;
        return result;
    }

    protected override async transformCreateRequestListToItem(items: Person[]): Promise<Aventus.ResultWithError<Person[]>> {
        const result = new Aventus.ResultWithError<Person[]>();
        result.result = items;
        return result;
    }

    protected override async transformUpdateRequestToItem(item: Person): Promise<Aventus.ResultWithError<Person>> {
        return this.transformCreateRequestToItem(item);
    }

    protected override async transformUpdateRequestListToItem(items: Person[]): Promise<Aventus.ResultWithError<Person[]>> {
        return this.transformCreateRequestListToItem(items);
    }


}
```

```typescript filename=/ExampleRAM/src/Test.lib.avt
import type { Person } from "./Person.data.avt";
import { PersonRAM } from "./Person.ram.avt";

/**
* All the read actions available on a RAM
*/
export async function readFunction() {
    const person1: Aventus.RamItem<Person> | undefined = await PersonRAM.getInstance().get(1);
    const person2: Aventus.RamItem<Person> | undefined = await PersonRAM.getInstance().getById(1);
    const people1: Aventus.RamItem<Person>[] = await PersonRAM.getInstance().getAll();
    const records: Map<number, Aventus.RamItem<Person>> = await PersonRAM.getInstance().getRecords();
    const people2: Aventus.RamItem<Person>[] = await PersonRAM.getInstance().getList();
    const people3: Aventus.RamItem<Person>[] = await PersonRAM.getInstance().getByIds([1, 2]);
}
```

```json filename=/ExampleRAM/aventus.conf.avt
{
    "module": "ExampleRAM",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ]
        }
    ]
}
```

### Create

|Function|Description|
|---|---|
|create|Store an item inside the RAM and return the element stored.|
|createList|Store a set of items inside the RAM and return the elements             stored.|

```typescript filename=/ExampleRAM/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/ExampleRAM/src/Person.ram.avt
import { Person } from "./Person.data.avt";

export class PersonRAM extends Aventus.Ram<Person> implements Aventus.IRam {

    /**
    * Create a singleton to store data
    */
    public static getInstance() {
        return Aventus.Instance.get(PersonRAM);
    }

    /**
    * @inheritdoc
    */
    public override defineIndexKey(): keyof Person {
        return 'id';
    }

    /**
    * @inheritdoc
    */
    protected override getTypeForData(objJson: Aventus.KeysObject<Person> | Person): new () => Person {
        return Person;
    }
    protected override async transformCreateRequestToItem(item: Person): Promise<Aventus.ResultWithError<Person>> {
        const result = new Aventus.ResultWithError<Person>();
        result.result = item;
        return result;
    }

    protected override async transformCreateRequestListToItem(items: Person[]): Promise<Aventus.ResultWithError<Person[]>> {
        const result = new Aventus.ResultWithError<Person[]>();
        result.result = items;
        return result;
    }

    protected override async transformUpdateRequestToItem(item: Person): Promise<Aventus.ResultWithError<Person>> {
        return this.transformCreateRequestToItem(item);
    }

    protected override async transformUpdateRequestListToItem(items: Person[]): Promise<Aventus.ResultWithError<Person[]>> {
        return this.transformCreateRequestListToItem(items);
    }


}
```

```typescript filename=/ExampleRAM/src/Test.lib.avt
import { PersonRAM } from "./Person.ram.avt";
import { Person } from "./Person.data.avt";

export async function createFunctions() {
    let person1: Person = new Person();
    person1.id = 1;
    person1.firstname = "John";
    person1.lastname = "Doe";

    let person2: Person = new Person();
    person2.id = 2;
    person2.firstname = "Jane";
    person2.lastname = "Doe";

    const person: Aventus.RamItem<Person> | undefined = await PersonRAM.getInstance().create(person1);
    const people: Aventus.RamItem<Person>[] = await PersonRAM.getInstance().createList([person1, person2]);
}
```

```json filename=/ExampleRAM/aventus.conf.avt
{
    "module": "ExampleRAM",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ]
        }
    ]
}
```

### Update

|Function|Description|
|---|---|
|update|Update an item inside the RAM and return the element updated.|
|updateList|Update a set of items inside the RAM and return the elements             stored.|

```typescript filename=/ExampleRAM/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/ExampleRAM/src/Person.ram.avt
import { Person } from "./Person.data.avt";

export class PersonRAM extends Aventus.Ram<Person> implements Aventus.IRam {

    /**
    * Create a singleton to store data
    */
    public static getInstance() {
        return Aventus.Instance.get(PersonRAM);
    }

    /**
    * @inheritdoc
    */
    public override defineIndexKey(): keyof Person {
        return 'id';
    }

    /**
    * @inheritdoc
    */
    protected override getTypeForData(objJson: Aventus.KeysObject<Person> | Person): new () => Person {
        return Person;
    }
    protected override async transformCreateRequestToItem(item: Person): Promise<Aventus.ResultWithError<Person>> {
        const result = new Aventus.ResultWithError<Person>();
        result.result = item;
        return result;
    }

    protected override async transformCreateRequestListToItem(items: Person[]): Promise<Aventus.ResultWithError<Person[]>> {
        const result = new Aventus.ResultWithError<Person[]>();
        result.result = items;
        return result;
    }

    protected override async transformUpdateRequestToItem(item: Person): Promise<Aventus.ResultWithError<Person>> {
        return this.transformCreateRequestToItem(item);
    }

    protected override async transformUpdateRequestListToItem(items: Person[]): Promise<Aventus.ResultWithError<Person[]>> {
        return this.transformCreateRequestListToItem(items);
    }


}
```

```typescript filename=/ExampleRAM/src/Test.lib.avt
import { PersonRAM } from "./Person.ram.avt";
import { Person } from "./Person.data.avt";

export async function udpateFunctions() {
    let person1: Aventus.RamItem<Person> | undefined = await PersonRAM.getInstance().get(1);
    if(!person1) return;
    let person2: Aventus.RamItem<Person> | undefined = await PersonRAM.getInstance().get(2);
    if(!person2) return;

    person1.firstname = "John 2";
    person2.firstname = "Jane 2";
    const person: Aventus.RamItem<Person> | undefined = await PersonRAM.getInstance().update(person1);
    const people: Aventus.RamItem<Person>[] = await PersonRAM.getInstance().updateList([person1, person2]);

    person1.update({firstname: "John 3"});
}
```

```json filename=/ExampleRAM/aventus.conf.avt
{
    "module": "ExampleRAM",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ]
        }
    ]
}
```

### Delete

|Function|Description|
|---|---|
|delete|Delete an item inside the RAM and return the element updated.|
|deleteById|Delete an item inside the RAM and return the element updated.|
|deleteList|Delete a set of items inside the RAM and return the elements             stored.|

```typescript filename=/ExampleRAM/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/ExampleRAM/src/Person.ram.avt
import { Person } from "./Person.data.avt";

export class PersonRAM extends Aventus.Ram<Person> implements Aventus.IRam {

    /**
    * Create a singleton to store data
    */
    public static getInstance() {
        return Aventus.Instance.get(PersonRAM);
    }

    /**
    * @inheritdoc
    */
    public override defineIndexKey(): keyof Person {
        return 'id';
    }

    /**
    * @inheritdoc
    */
    protected override getTypeForData(objJson: Aventus.KeysObject<Person> | Person): new () => Person {
        return Person;
    }
    protected override async transformCreateRequestToItem(item: Person): Promise<Aventus.ResultWithError<Person>> {
        const result = new Aventus.ResultWithError<Person>();
        result.result = item;
        return result;
    }

    protected override async transformCreateRequestListToItem(items: Person[]): Promise<Aventus.ResultWithError<Person[]>> {
        const result = new Aventus.ResultWithError<Person[]>();
        result.result = items;
        return result;
    }

    protected override async transformUpdateRequestToItem(item: Person): Promise<Aventus.ResultWithError<Person>> {
        return this.transformCreateRequestToItem(item);
    }

    protected override async transformUpdateRequestListToItem(items: Person[]): Promise<Aventus.ResultWithError<Person[]>> {
        return this.transformCreateRequestListToItem(items);
    }


}
```

```typescript filename=/ExampleRAM/src/Test.lib.avt
import { PersonRAM } from "./Person.ram.avt";
import { Person } from "./Person.data.avt";

export async function deleteFunctions() {
    let person1: Aventus.RamItem<Person> | undefined = await PersonRAM.getInstance().get(1);
    if(!person1) return;
    let person2: Aventus.RamItem<Person> | undefined = await PersonRAM.getInstance().get(2);
    if(!person2) return;

    await PersonRAM.getInstance().delete(person1);
    await PersonRAM.getInstance().deleteById(1);
    await PersonRAM.getInstance().deleteList([person1, person2]);

    person1.delete();
}
```

```json filename=/ExampleRAM/aventus.conf.avt
{
    "module": "ExampleRAM",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ]
        }
    ]
}
```

The last thing to know is that once an item a stored inside the ram, the item reference is always the same.

```typescript filename=Test.lib.avt
export async function test() {
	let person1: Person | undefined = await PersonRAM.getInstance().get(1);
	if(!person1) return;
	person1.name = "John Doe 2";
	const person: Person = await PersonRAM.getInstance().update(person1);
	// person == person1 => true
}
```

---
# RAM - Listen changes

## Item scoped functions

Because your component must be refreshed when your RAM item changed, the item coming from a RAM has 4 new functions.


- <mark>onUpdate</mark> : Add a callback trigger when data updated
- <mark>offUpdate</mark> : Remove a callback trigger when data updated
- <mark>onDelete</mark> : Add a callback trigger when data deleted
- <mark>offDelete</mark> : Remove a callback trigger when data deleted

```typescript filename=/ExampleRAM/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/ExampleRAM/src/Person.ram.avt
import { Person } from "./Person.data.avt";

export class PersonRAM extends Aventus.Ram<Person> implements Aventus.IRam {

    /**
    * Create a singleton to store data
    */
    public static getInstance() {
        return Aventus.Instance.get(PersonRAM);
    }

    /**
    * @inheritdoc
    */
    public override defineIndexKey(): keyof Person {
        return 'id';
    }

    /**
    * @inheritdoc
    */
    protected override getTypeForData(objJson: Aventus.KeysObject<Person> | Person): new () => Person {
        return Person;
    }
    protected override async transformCreateRequestToItem(item: Person): Promise<Aventus.ResultWithError<Person>> {
        const result = new Aventus.ResultWithError<Person>();
        result.result = item;
        return result;
    }

    protected override async transformCreateRequestListToItem(items: Person[]): Promise<Aventus.ResultWithError<Person[]>> {
        const result = new Aventus.ResultWithError<Person[]>();
        result.result = items;
        return result;
    }

    protected override async transformUpdateRequestToItem(item: Person): Promise<Aventus.ResultWithError<Person>> {
        return this.transformCreateRequestToItem(item);
    }

    protected override async transformUpdateRequestListToItem(items: Person[]): Promise<Aventus.ResultWithError<Person[]>> {
        return this.transformCreateRequestListToItem(items);
    }


}
```

```typescript filename=/ExampleRAM/src/Test.lib.avt
import { PersonRAM } from "./Person.ram.avt";
import { Person } from "./Person.data.avt";

export async function loadFirstPerson() {
    let person1 = await PersonRAM.getInstance().get(1);
    if(!person1) return;

    person1.onUpdate(onUpdate);
    person1.onDelete(onDelete);
}

export function onUpdate(person: Person) {
    console.log("person updated : " + person.firstname);
}

export function onDelete(person: Aventus.RamItem<Person>) {
    person.offUpdate(onUpdate);
    person.offDelete(onDelete);
}
```

```json filename=/ExampleRAM/aventus.conf.avt
{
    "module": "ExampleRAM",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ]
        }
    ]
}
```

You must care of the function scope. When you provide a function as parameter sometimes the scope of the function isn't right. To avoid scope error your can use <mark>@BindThis()</mark>.

```typescript filename=/ExampleRAM/src/DisplayPerson/DisplayPerson.wcl.avt
import { PersonRAM } from "../Person.ram.avt";
import type { Person } from "../Person.data.avt";

export class DisplayPerson extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props
    @Attribute()
    public person_id!: number;
    //#endregion


    //#region variables
    private person?: Aventus.RamItem<Person>;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    public printUpdate() {
        console.log(this.person);
    }
    public async getItem() {
        const person = await PersonRAM.getInstance().get(this.person_id);
        if(!person) return

        this.person = person;
        person.onUpdate(this.onUpdateFail)
        person.onUpdate(this.onUpdateCorrect)
    }

    private onUpdateFail(newData: Aventus.RamItem<Person>) {
        // will fail because this isn't scoped to the DisplayPerson component
        this.printUpdate();
    }

    @BindThis()
    private onUpdateCorrect(newData: Aventus.RamItem<Person>) {
        // will be ok because this is scoped to the DisplayPerson component
        this.printUpdate();
    }

    protected override postCreation(): void {
        this.getItem();
    }

    //#endregion

}
```

```typescript filename=/ExampleRAM/src/DisplayPerson/DisplayPerson.wcs.avt
:host {
}
```

```typescript filename=/ExampleRAM/src/DisplayPerson/DisplayPerson.wcv.avt
<slot></slot>
```

```typescript filename=/ExampleRAM/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/ExampleRAM/src/Person.ram.avt
import { Person } from "./Person.data.avt";

export class PersonRAM extends Aventus.Ram<Person> implements Aventus.IRam {

    /**
    * Create a singleton to store data
    */
    public static getInstance() {
        return Aventus.Instance.get(PersonRAM);
    }

    /**
    * @inheritdoc
    */
    public override defineIndexKey(): keyof Person {
        return 'id';
    }

    /**
    * @inheritdoc
    */
    protected override getTypeForData(objJson: Aventus.KeysObject<Person> | Person): new () => Person {
        return Person;
    }
    protected override async transformCreateRequestToItem(item: Person): Promise<Aventus.ResultWithError<Person>> {
        const result = new Aventus.ResultWithError<Person>();
        result.result = item;
        return result;
    }

    protected override async transformCreateRequestListToItem(items: Person[]): Promise<Aventus.ResultWithError<Person[]>> {
        const result = new Aventus.ResultWithError<Person[]>();
        result.result = items;
        return result;
    }

    protected override async transformUpdateRequestToItem(item: Person): Promise<Aventus.ResultWithError<Person>> {
        return this.transformCreateRequestToItem(item);
    }

    protected override async transformUpdateRequestListToItem(items: Person[]): Promise<Aventus.ResultWithError<Person[]>> {
        return this.transformCreateRequestListToItem(items);
    }


}
```

```typescript filename=/ExampleRAM/src/Test.lib.avt
import { PersonRAM } from "./Person.ram.avt";
import { Person } from "./Person.data.avt";

export async function loadFirstPerson() {
    let person1 = await PersonRAM.getInstance().get(1);
    if(!person1) return;

    person1.onUpdate(onUpdate);
    person1.onDelete(onDelete);
}

export function onUpdate(person: Person) {
    console.log("person updated : " + person.firstname);
}

export function onDelete(person: Aventus.RamItem<Person>) {
    person.offUpdate(onUpdate);
    person.offDelete(onDelete);
}
```

```json filename=/ExampleRAM/aventus.conf.avt
{
    "module": "ExampleRAM",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ]
        }
    ]
}
```

## RAM scoped functions

To listen what is happening inside your RAM. You can subscribe to 3 listeners:

- <mark>onCreated</mark> : trigger when a new data is created
- <mark>onUpdated</mark> : trigger when a data is updated
- <mark>onDeleted</mark> : trigger when a data is deleted

To remove your listeners you can use the following functions

- <mark>offCreated</mark>
- <mark>offUpdated</mark>
- <mark>offDeleted</mark>

```typescript filename=/ExampleRAM/src/DisplayPerson/DisplayPerson.wcl.avt
import { PersonRAM } from "../Person.ram.avt";
import type { Person } from "../Person.data.avt";

export class DisplayPerson extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    @BindThis()
    private onCreated(createdData: Aventus.RamItem<Person>) {

    }

    @BindThis()
    private onUpdated(updatedData: Aventus.RamItem<Person>) {

    }

    @BindThis()
    private onDeleted(deletedData: Aventus.RamItem<Person>) {

    }

    protected override postCreation(): void {
        PersonRAM.getInstance().onCreated(this.onCreated);
        PersonRAM.getInstance().onUpdated(this.onUpdated);
        PersonRAM.getInstance().onDeleted(this.onDeleted);
    }
    //#endregion

}
```

```typescript filename=/ExampleRAM/src/DisplayPerson/DisplayPerson.wcs.avt
:host {
}
```

```typescript filename=/ExampleRAM/src/DisplayPerson/DisplayPerson.wcv.avt
<slot></slot>
```

```typescript filename=/ExampleRAM/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/ExampleRAM/src/Person.ram.avt
import { Person } from "./Person.data.avt";

export class PersonRAM extends Aventus.Ram<Person> implements Aventus.IRam {

    /**
    * Create a singleton to store data
    */
    public static getInstance() {
        return Aventus.Instance.get(PersonRAM);
    }

    /**
    * @inheritdoc
    */
    public override defineIndexKey(): keyof Person {
        return 'id';
    }

    /**
    * @inheritdoc
    */
    protected override getTypeForData(objJson: Aventus.KeysObject<Person> | Person): new () => Person {
        return Person;
    }
    protected override async transformCreateRequestToItem(item: Person): Promise<Aventus.ResultWithError<Person>> {
        const result = new Aventus.ResultWithError<Person>();
        result.result = item;
        return result;
    }

    protected override async transformCreateRequestListToItem(items: Person[]): Promise<Aventus.ResultWithError<Person[]>> {
        const result = new Aventus.ResultWithError<Person[]>();
        result.result = items;
        return result;
    }

    protected override async transformUpdateRequestToItem(item: Person): Promise<Aventus.ResultWithError<Person>> {
        return this.transformCreateRequestToItem(item);
    }

    protected override async transformUpdateRequestListToItem(items: Person[]): Promise<Aventus.ResultWithError<Person[]>> {
        return this.transformCreateRequestListToItem(items);
    }


}
```

```typescript filename=/ExampleRAM/src/Test.lib.avt
import { PersonRAM } from "./Person.ram.avt";
import { Person } from "./Person.data.avt";

export async function loadFirstPerson() {
    let person1 = await PersonRAM.getInstance().get(1);
    if(!person1) return;

    person1.onUpdate(onUpdate);
    person1.onDelete(onDelete);
}

export function onUpdate(person: Person) {
    console.log("person updated : " + person.firstname);
}

export function onDelete(person: Aventus.RamItem<Person>) {
    person.offUpdate(onUpdate);
    person.offDelete(onDelete);
}
```

```json filename=/ExampleRAM/aventus.conf.avt
{
    "module": "ExampleRAM",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ]
        }
    ]
}
```

---
# RAM - Extend data

As you can see inside the previous section, new functions are added on the items. You can your custom functions too
    based on the [mixin pattern](https://www.patterns.dev/posts/mixin-pattern). This is
    useful when you auto generated your data from your backend but you just want to add some functions. The best way
    to learn this is with an example. We will add a function helloWorld on the Person item.

```typescript filename=/ExampleRAM/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/ExampleRAM/src/Person.ram.avt
// TODO : Add helloWorld function to a Person
```

```json filename=/ExampleRAM/aventus.conf.avt
{
    "module": "ExampleRAM",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ]
        }
    ]
}
```

First of all, we must create an interface with the action needed.

```typescript filename=/ExampleRAM/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/ExampleRAM/src/Person.ram.avt
interface PersonAction {
    // define your function here
    helloWorld(): void;
}
```

```json filename=/ExampleRAM/aventus.conf.avt
{
    "module": "ExampleRAM",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ]
        }
    ]
}
```

Then you can create a type that is the mix of the data and the extension.

```typescript filename=/ExampleRAM/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/ExampleRAM/src/Person.ram.avt
import { Person } from "./Person.data.avt";

interface PersonAction {
    // define your function here
    helloWorld(): void;
}

type PersonExtended = Person & PersonAction;
```

```json filename=/ExampleRAM/aventus.conf.avt
{
    "module": "ExampleRAM",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ]
        }
    ]
}
```

Then you can add your RAM.

```typescript filename=/ExampleRAM/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/ExampleRAM/src/Person.ram.avt
import { Person } from "./Person.data.avt";

interface PersonAction {
    // define your function here
    helloWorld(): void;
}

type PersonExtended = Person & PersonAction;

export class PersonRAM extends Aventus.Ram<Person, PersonExtended> implements Aventus.IRam {
    /**
     * Create a singleton to store data
     */
    public static getInstance() {
        return Aventus.Instance.get(PersonRAM);
    }
    /**
     * @inheritdoc
     */
    public override defineIndexKey(): keyof Person {
        return 'id';
    }
    /**
     * @inheritdoc
     */
    protected override getTypeForData(objJson: Person | Aventus.KeysObject<Person>): new () => PersonExtended {
        // this will be implemented later
        throw new Error("Method not implemented.");
    }
    protected override async transformCreateRequestToItem(item: PersonExtended): Promise<Aventus.ResultWithError<Person>> {
        const result = new Aventus.ResultWithError<Person>();
        result.result = item;
        return result;
    }

    protected override async transformCreateRequestListToItem(items: PersonExtended[]): Promise<Aventus.ResultWithError<Person[]>> {
        const result = new Aventus.ResultWithError<Person[]>();
        result.result = items;
        return result;
    }

    protected override async transformUpdateRequestToItem(item: PersonExtended): Promise<Aventus.ResultWithError<Person>> {
        return this.transformCreateRequestToItem(item);
    }

    protected override async transformUpdateRequestListToItem(items: PersonExtended[]): Promise<Aventus.ResultWithError<Person[]>> {
        return this.transformCreateRequestListToItem(items);
    }

}
```

```json filename=/ExampleRAM/aventus.conf.avt
{
    "module": "ExampleRAM",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ]
        }
    ]
}
```

Then you can add the the mixin pattern.

```typescript filename=/ExampleRAM/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/ExampleRAM/src/Person.ram.avt
import { Person } from "./Person.data.avt";

interface PersonAction {
    // define your function here
    helloWorld(): void;
}

type PersonExtended = Person & PersonAction;

export class PersonRAM extends Aventus.Ram<Person, PersonExtended> implements Aventus.IRam {
    /**
     * Create a singleton to store data
     */
    public static getInstance() {
        return Aventus.Instance.get(PersonRAM);
    }
    /**
     * @inheritdoc
     */
    public override defineIndexKey(): keyof Person {
        return 'id';
    }
    /**
     * @inheritdoc
     */
    protected override getTypeForData(objJson: Person | Aventus.KeysObject<Person>): new () => PersonExtended {
        // this will be implemented later
        throw new Error("Method not implemented.");
    }
    protected override async transformCreateRequestToItem(item: PersonExtended): Promise<Aventus.ResultWithError<Person>> {
        const result = new Aventus.ResultWithError<Person>();
        result.result = item;
        return result;
    }

    protected override async transformCreateRequestListToItem(items: PersonExtended[]): Promise<Aventus.ResultWithError<Person[]>> {
        const result = new Aventus.ResultWithError<Person[]>();
        result.result = items;
        return result;
    }

    protected override async transformUpdateRequestToItem(item: PersonExtended): Promise<Aventus.ResultWithError<Person>> {
        return this.transformCreateRequestToItem(item);
    }

    protected override async transformUpdateRequestListToItem(items: PersonExtended[]): Promise<Aventus.ResultWithError<Person[]>> {
        return this.transformCreateRequestListToItem(items);
    }

    /**
     * Mixin pattern to add methods
     */
    private addPersonMethod<B extends (new (...args: any[]) => Person) & { className?: string; }>(Base: B) {
        return class Extension extends Base implements PersonExtended {
            // override the className to keep ref by name
            public static override get className(): string {
                return Base.className || Base.name;
            }
            public override get className(): string {
                return Base.className || Base.name;
            }
            // code your methods here
            public helloWorld(): void {
                console.log("hello world");
            };
        };
    }
}
```

```json filename=/ExampleRAM/aventus.conf.avt
{
    "module": "ExampleRAM",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ]
        }
    ]
}
```

Now you can use the extension on the function <mark>getTypeForData</mark>.

```typescript filename=/ExampleRAM/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/ExampleRAM/src/Person.ram.avt
import { Person } from "./Person.data.avt";

interface PersonAction {
    // define your function here
    helloWorld(): void;
}

type PersonExtended = Person & PersonAction;

export class PersonRAM extends Aventus.Ram<Person, PersonExtended> implements Aventus.IRam {
    /**
     * Create a singleton to store data
     */
    public static getInstance() {
        return Aventus.Instance.get(PersonRAM);
    }
    /**
     * @inheritdoc
     */
    public override defineIndexKey(): keyof Person {
        return 'id';
    }
    /**
     * @inheritdoc
     */
    protected override getTypeForData(objJson: Person | Aventus.KeysObject<Person>): new () => PersonExtended {
        return this.addPersonMethod(Person);
    }
    protected override async transformCreateRequestToItem(item: PersonExtended): Promise<Aventus.ResultWithError<Person>> {
        const result = new Aventus.ResultWithError<Person>();
        result.result = item;
        return result;
    }

    protected override async transformCreateRequestListToItem(items: PersonExtended[]): Promise<Aventus.ResultWithError<Person[]>> {
        const result = new Aventus.ResultWithError<Person[]>();
        result.result = items;
        return result;
    }

    protected override async transformUpdateRequestToItem(item: PersonExtended): Promise<Aventus.ResultWithError<Person>> {
        return this.transformCreateRequestToItem(item);
    }

    protected override async transformUpdateRequestListToItem(items: PersonExtended[]): Promise<Aventus.ResultWithError<Person[]>> {
        return this.transformCreateRequestListToItem(items);
    }

    /**
     * Mixin pattern to add methods
     */
    private addPersonMethod<B extends (new (...args: any[]) => Person) & { className?: string; }>(Base: B) {
        return class Extension extends Base implements PersonExtended {
            // override the className to keep ref by name
            public static override get className(): string {
                return Base.className || Base.name;
            }
            public override get className(): string {
                return Base.className || Base.name;
            }
            // code your methods here
            public helloWorld(): void {
                console.log("hello world");
            };
        };
    }
}
```

```json filename=/ExampleRAM/aventus.conf.avt
{
    "module": "ExampleRAM",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ]
        }
    ]
}
```

Now you can call the function <mark>helloWorld()</mark> when you are loading data from the RAM.

```typescript filename=/ExampleRAM/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/ExampleRAM/src/Person.ram.avt
import { Person } from "./Person.data.avt";

interface PersonAction {
    // define your function here
    helloWorld(): void;
}

type PersonExtended = Person & PersonAction;

export class PersonRAM extends Aventus.Ram<Person, PersonExtended> implements Aventus.IRam {
    /**
     * Create a singleton to store data
     */
    public static getInstance() {
        return Aventus.Instance.get(PersonRAM);
    }
    /**
     * @inheritdoc
     */
    public override defineIndexKey(): keyof Person {
        return 'id';
    }
    /**
     * @inheritdoc
     */
    protected override getTypeForData(objJson: Person | Aventus.KeysObject<Person>): new () => PersonExtended {
        return this.addPersonMethod(Person);
    }
    protected override async transformCreateRequestToItem(item: PersonExtended): Promise<Aventus.ResultWithError<Person>> {
        const result = new Aventus.ResultWithError<Person>();
        result.result = item;
        return result;
    }

    protected override async transformCreateRequestListToItem(items: PersonExtended[]): Promise<Aventus.ResultWithError<Person[]>> {
        const result = new Aventus.ResultWithError<Person[]>();
        result.result = items;
        return result;
    }

    protected override async transformUpdateRequestToItem(item: PersonExtended): Promise<Aventus.ResultWithError<Person>> {
        return this.transformCreateRequestToItem(item);
    }

    protected override async transformUpdateRequestListToItem(items: PersonExtended[]): Promise<Aventus.ResultWithError<Person[]>> {
        return this.transformCreateRequestListToItem(items);
    }

    /**
     * Mixin pattern to add methods
     */
    private addPersonMethod<B extends (new (...args: any[]) => Person) & { className?: string; }>(Base: B) {
        return class Extension extends Base implements PersonExtended {
            // override the className to keep ref by name
            public static override get className(): string {
                return Base.className || Base.name;
            }
            public override get className(): string {
                return Base.className || Base.name;
            }
            // code your methods here
            public helloWorld(): void {
                console.log("hello world");
            };
        };
    }
}
```

```typescript filename=/ExampleRAM/src/Test.lib.avt
import { PersonRAM } from "./Person.ram.avt";

export async function sayHello(id: number) {
    const person = await PersonRAM.getInstance().get(id)

    if(!person) return

    person.helloWorld();
}
```

```json filename=/ExampleRAM/aventus.conf.avt
{
    "module": "ExampleRAM",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ]
        }
    ]
}
```

---
# State - Create

In this section you are going to learn what is a state and how you can create it inside Aventus.

## Definition

A state is a way to define a unique state of your application. The state concept is divided in two part:
    &nbsp;<mark>StateManager</mark> and <mark>State</mark>. The StateManager will manage the transition from one state to another. The
    state is an object with a name. The best state example inside Aventus is the <mark>Router</mark>. Inside the router, you
    must declare unique route matching to a single <mark>Page</mark>.


## Inside Aventus

Inside Aventus you can create a new state class by right clicking on the explorer part inside vscode, choose
    &nbsp; *Aventus : Create...*  and choose  *State* . You must select between <mark>State</mark> or <mark>Manager</mark> and then
    inside the input you can enter the name for the class. This will create a basic class:


```typescript filename=/StateExample/src/CreatePerson.state.avt
import type { Person } from "./Person.data.avt";

export class CreatePerson extends Aventus.State implements Aventus.IState {

    public editingPerson?: Person;

    /**
    * @inheritdoc
    */
    public override get name(): string {
        return "/person/create";;
    }
}
```

```typescript filename=/StateExample/src/Main.state.avt
export class MainStateManager extends Aventus.StateManager implements Aventus.IStateManager {
    /**
     * Get the instance of the StateManager
     */
    public static getInstance() {
        return Aventus.Instance.get(MainStateManager);
    }
}
```

```typescript filename=/StateExample/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```json filename=/StateExample/aventus.conf.avt
{
    "module": "StateExample",
    "build": [
        {
            "name": "Main",
            "src": [
                './src/*'
            ]
        }
    ]
}
```

---
# State - Change

To change the current state of a manager, you can use different methods.

## On the manager

You can change current state directly on the manager by calling the function <mark>setState</mark> with a
    &nbsp;<mark>string</mark> or a <mark>State</mark> item.


```typescript filename=/StateExample/src/CreatePerson.state.avt
import type { Person } from "./Person.data.avt";

export class CreatePerson extends Aventus.State implements Aventus.IState {

    public editingPerson?: Person;

    /**
    * @inheritdoc
    */
    public override get name(): string {
        return "/person/create";;
    }
}
```

```typescript filename=/StateExample/src/Main.state.avt
export class MainStateManager extends Aventus.StateManager implements Aventus.IStateManager {
    /**
     * Get the instance of the StateManager
     */
    public static getInstance() {
        return Aventus.Instance.get(MainStateManager);
    }
}
```

```typescript filename=/StateExample/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/StateExample/src/Person.ram.avt
import { Person } from "./Person.data.avt";

export class PersonRAM extends Aventus.Ram<Person> implements Aventus.IRam {

    /**
    * Create a singleton to store data
    */
    public static getInstance() {
        return Aventus.Instance.get(PersonRAM);
    }

    /**
    * @inheritdoc
    */
    public override defineIndexKey(): keyof Person {
        return 'id';
    }
    /**
    * @inheritdoc
    */
    protected override getTypeForData(objJson: Aventus.KeysObject<Person> | Person): new () => Person {
        return Person;
    }
}
```

```typescript filename=/StateExample/src/Test.lib.avt
import { PersonRAM } from "./Person.ram.avt";
import { CreatePerson } from "./CreatePerson.state.avt";
import { MainStateManager } from "./Main.state.avt";

export async function changeStateTxt() {
    const isApplied = await MainStateManager.getInstance().setState("/user/");
}
export async function changeState() {
    let state = new CreatePerson();
    state.editingPerson = await PersonRAM.getInstance().get(1);
    const isApplied = await MainStateManager.getInstance().setState(state);
}
```

```json filename=/StateExample/aventus.conf.avt
{
    "module": "StateExample",
    "build": [
        {
            "name": "Main",
            "src": [
                './src/*'
            ]
        }
    ]
}
```

If you set a string, an <mark>EmptyState</mark> will be created with the name provided.

## On the state - static

You can also activate a state with the static method <mark>activate</mark> on the class <mark>Aventus.State</mark>.

```typescript filename=/StateExample/src/CreatePerson.state.avt
import type { Person } from "./Person.data.avt";

export class CreatePerson extends Aventus.State implements Aventus.IState {

    public editingPerson?: Person;

    /**
    * @inheritdoc
    */
    public override get name(): string {
        return "/person/create";;
    }
}
```

```typescript filename=/StateExample/src/Main.state.avt
export class MainStateManager extends Aventus.StateManager implements Aventus.IStateManager {
    /**
     * Get the instance of the StateManager
     */
    public static getInstance() {
        return Aventus.Instance.get(MainStateManager);
    }
}
```

```typescript filename=/StateExample/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/StateExample/src/Person.ram.avt
import { Person } from "./Person.data.avt";

export class PersonRAM extends Aventus.Ram<Person> implements Aventus.IRam {

    /**
    * Create a singleton to store data
    */
    public static getInstance() {
        return Aventus.Instance.get(PersonRAM);
    }

    /**
    * @inheritdoc
    */
    public override defineIndexKey(): keyof Person {
        return 'id';
    }
    /**
    * @inheritdoc
    */
    protected override getTypeForData(objJson: Aventus.KeysObject<Person> | Person): new () => Person {
        return Person;
    }
}
```

```typescript filename=/StateExample/src/Test.lib.avt
import { PersonRAM } from "./Person.ram.avt";
import { CreatePerson } from "./CreatePerson.state.avt";
import { MainStateManager } from "./Main.state.avt";

export async function changeStateTxt() {
    const isApplied = await MainStateManager.getInstance().setState("/user/");
}
export async function changeState() {
    let state = new CreatePerson();
    state.editingPerson = await PersonRAM.getInstance().get(1);
    const isApplied = await MainStateManager.getInstance().setState(state);
}

export async function changeStateStatic() {
    const isApplied = await Aventus.State.activate("/user/", MainStateManager.getInstance());
}
```

```json filename=/StateExample/aventus.conf.avt
{
    "module": "StateExample",
    "build": [
        {
            "name": "Main",
            "src": [
                './src/*'
            ]
        }
    ]
}
```

## On the state - instance

Finally, you can activate the state with the method <mark>activate</mark> on a state instance.

```typescript filename=/StateExample/src/CreatePerson.state.avt
import type { Person } from "./Person.data.avt";

export class CreatePerson extends Aventus.State implements Aventus.IState {

    public editingPerson?: Person;

    /**
    * @inheritdoc
    */
    public override get name(): string {
        return "/person/create";;
    }
}
```

```typescript filename=/StateExample/src/Main.state.avt
export class MainStateManager extends Aventus.StateManager implements Aventus.IStateManager {
    /**
     * Get the instance of the StateManager
     */
    public static getInstance() {
        return Aventus.Instance.get(MainStateManager);
    }
}
```

```typescript filename=/StateExample/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/StateExample/src/Person.ram.avt
import { Person } from "./Person.data.avt";

export class PersonRAM extends Aventus.Ram<Person> implements Aventus.IRam {

    /**
    * Create a singleton to store data
    */
    public static getInstance() {
        return Aventus.Instance.get(PersonRAM);
    }

    /**
    * @inheritdoc
    */
    public override defineIndexKey(): keyof Person {
        return 'id';
    }
    /**
    * @inheritdoc
    */
    protected override getTypeForData(objJson: Aventus.KeysObject<Person> | Person): new () => Person {
        return Person;
    }
}
```

```typescript filename=/StateExample/src/Test.lib.avt
import { PersonRAM } from "./Person.ram.avt";
import { CreatePerson } from "./CreatePerson.state.avt";
import { MainStateManager } from "./Main.state.avt";

export async function changeStateTxt() {
    const isApplied = await MainStateManager.getInstance().setState("/user/");
}
export async function changeState() {
    let state = new CreatePerson();
    state.editingPerson = await PersonRAM.getInstance().get(1);
    const isApplied = await MainStateManager.getInstance().setState(state);
}

export async function changeStateStatic() {
    const isApplied = await Aventus.State.activate("/user/", MainStateManager.getInstance());
}

export async function changeStateInstance() {
    let state = new CreatePerson();
    state.editingPerson = await PersonRAM.getInstance().get(1);
    const isApplied = await state.activate(MainStateManager.getInstance());
}
```

```json filename=/StateExample/aventus.conf.avt
{
    "module": "StateExample",
    "build": [
        {
            "name": "Main",
            "src": [
                './src/*'
            ]
        }
    ]
}
```

---
# State - Listen changes

Changing state is great, but for sure you will need to listen when a state change. Three methods compose the <mark>State</mark> lifecylce. This tuple is named <mark>StateAction</mark> inside Aventus.

- <mark>active</mark>: when a state become active.
- <mark>inactive</mark>: when a state become inactive.
- <mark>askChange</mark>: a way to define if the state change can be done or not.

## Callback on the StateManager

For the example, we are going to listen a state to display a user.

```typescript filename=/StateExample/src/CreatePerson.state.avt
import type { Person } from "./Person.data.avt";

export class CreatePerson extends Aventus.State implements Aventus.IState {

    public editingPerson?: Person;

    /**
    * @inheritdoc
    */
    public override get name(): string {
        return "/person/create";;
    }
}
```

```typescript filename=/StateExample/src/Main.state.avt
export class MainStateManager extends Aventus.StateManager implements Aventus.IStateManager {
    /**
     * Get the instance of the StateManager
     */
    public static getInstance() {
        return Aventus.Instance.get(MainStateManager);
    }
}
```

```typescript filename=/StateExample/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/StateExample/src/Person.ram.avt
import { Person } from "./Person.data.avt";

export class PersonRAM extends Aventus.Ram<Person> implements Aventus.IRam {

    /**
    * Create a singleton to store data
    */
    public static getInstance() {
        return Aventus.Instance.get(PersonRAM);
    }

    /**
    * @inheritdoc
    */
    public override defineIndexKey(): keyof Person {
        return 'id';
    }
    /**
    * @inheritdoc
    */
    protected override getTypeForData(objJson: Aventus.KeysObject<Person> | Person): new () => Person {
        return Person;
    }
}
```

```typescript filename=/StateExample/src/Test.lib.avt
import { MainStateManager } from "./Main.state.avt";

export async function subscribe() {
    MainStateManager.getInstance().subscribe("/user/{id:number}", {
        active: (state: Aventus.State, slugs: Aventus.StateSlug) => {
            console.log("user active is " + slugs.id);
        },
        inactive: (state: Aventus.State, nextState: Aventus.State, oldSlugs: Aventus.StateSlug) => {
            console.log("new state is " + nextState.name);
        },
        askChange: async (state: Aventus.State, nextState: Aventus.State, slugs: Aventus.StateSlug) => {
            if(slugs.id == 3) {
                return false;
            }
            return true;
        }
    });
}

export async function setUser(id: number) {
    MainStateManager.getInstance().setState("/user/" + id);
}

export async function removeUser() {
    MainStateManager.getInstance().setState("/other");
}
```

```json filename=/StateExample/aventus.conf.avt
{
    "module": "StateExample",
    "build": [
        {
            "name": "Main",
            "src": [
                './src/*'
            ]
        }
    ]
}
```

We subscribe to the state <mark>/user/{id:number}</mark> what means that the manager will trigger active
    when the current state is matching <mark>/^\/user\/([0-9]+)$/g</mark>. The type available are <mark>number</mark> and <mark>string</mark>. If you don't set type, string will be use by
    default. You can also use the star (<mark>*</mark>) to match anything.

When the <mark>setUser</mark> function is called, the log <mark>user active is...</mark> will
    be displayed. If you set the current state to <mark>/other</mark>, the inactive state will be called.
    It's important to know that if your state stay active between two state changes, the function <mark>inactive</mark> won't be fired.

```typescript filename=/StateExample/src/CreatePerson.state.avt
import type { Person } from "./Person.data.avt";

export class CreatePerson extends Aventus.State implements Aventus.IState {

    public editingPerson?: Person;

    /**
    * @inheritdoc
    */
    public override get name(): string {
        return "/person/create";;
    }
}
```

```typescript filename=/StateExample/src/Main.state.avt
export class MainStateManager extends Aventus.StateManager implements Aventus.IStateManager {
    /**
     * Get the instance of the StateManager
     */
    public static getInstance() {
        return Aventus.Instance.get(MainStateManager);
    }
}
```

```typescript filename=/StateExample/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/StateExample/src/Person.ram.avt
import { Person } from "./Person.data.avt";

export class PersonRAM extends Aventus.Ram<Person> implements Aventus.IRam {

    /**
    * Create a singleton to store data
    */
    public static getInstance() {
        return Aventus.Instance.get(PersonRAM);
    }

    /**
    * @inheritdoc
    */
    public override defineIndexKey(): keyof Person {
        return 'id';
    }
    /**
    * @inheritdoc
    */
    protected override getTypeForData(objJson: Aventus.KeysObject<Person> | Person): new () => Person {
        return Person;
    }
}
```

```typescript filename=/StateExample/src/Test.lib.avt
import { MainStateManager } from "./Main.state.avt";

export async function subscribe() {
    MainStateManager.getInstance().subscribe("/user/{id:number}", {
        active: (state: Aventus.State, slugs: Aventus.StateSlug) => {
            console.log("user active is " + slugs.id);
        },
        inactive: (state: Aventus.State, nextState: Aventus.State, oldSlugs: Aventus.StateSlug) => {
            console.log("new state is " + nextState.name);
        },
        askChange: async (state: Aventus.State, nextState: Aventus.State, slugs: Aventus.StateSlug) => {
            if(slugs.id == 3) {
                return false;
            }
            return true;
        }
    });
}

export async function setUser(id: number) {
    MainStateManager.getInstance().setState("/user/" + id);
}

export async function removeUser() {
    MainStateManager.getInstance().setState("/other");
}

export async function inactiveNotFired() {
    await MainStateManager.getInstance().setState("/user/1");
    await MainStateManager.getInstance().setState("/user/2");
}
```

```json filename=/StateExample/aventus.conf.avt
{
    "module": "StateExample",
    "build": [
        {
            "name": "Main",
            "src": [
                './src/*'
            ]
        }
    ]
}
```

If we come back to the previous example, if we set the user to <mark>id = 3</mark> the function <mark>askChange</mark> will return a false what involves that no more state changes are allowed. A use case
    for this feature is when the user is editing data and he decides to change state without saving item. You can
    display a popup to confirm if edition must be dropped or not.

If you need to know the current state of the manager, you can at any time call the function <mark>getState</mark> to obtain the current state object instance. Furthermore, you can use operator <mark>instanceof</mark> to obtain more information and share some data between subscribers.

```typescript filename=/StateExample/src/CreatePerson.state.avt
import type { Person } from "./Person.data.avt";

export class CreatePerson extends Aventus.State implements Aventus.IState {

    public editingPerson?: Person;

    /**
    * @inheritdoc
    */
    public override get name(): string {
        return "/person/create";;
    }
}
```

```typescript filename=/StateExample/src/Main.state.avt
export class MainStateManager extends Aventus.StateManager implements Aventus.IStateManager {
    /**
     * Get the instance of the StateManager
     */
    public static getInstance() {
        return Aventus.Instance.get(MainStateManager);
    }
}
```

```typescript filename=/StateExample/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/StateExample/src/Person.ram.avt
import { Person } from "./Person.data.avt";

export class PersonRAM extends Aventus.Ram<Person> implements Aventus.IRam {

    /**
    * Create a singleton to store data
    */
    public static getInstance() {
        return Aventus.Instance.get(PersonRAM);
    }

    /**
    * @inheritdoc
    */
    public override defineIndexKey(): keyof Person {
        return 'id';
    }
    /**
    * @inheritdoc
    */
    protected override getTypeForData(objJson: Aventus.KeysObject<Person> | Person): new () => Person {
        return Person;
    }
}
```

```typescript filename=/StateExample/src/Test.lib.avt
import { MainStateManager } from "./Main.state.avt";

export async function subscribe() {
    MainStateManager.getInstance().subscribe("/user/{id:number}", {
        active: (state: Aventus.State, slugs: Aventus.StateSlug) => {
            console.log("user active is " + slugs.id);
            // process a type of state
            if(state instanceof CreatePerson){
                console.log(state.editingPerson?.id);
            }
        },
        inactive: (state: Aventus.State, nextState: Aventus.State, oldSlugs: Aventus.StateSlug) => {
            console.log("new state is " + nextState.name);
        },
        askChange: async (state: Aventus.State, nextState: Aventus.State, slugs: Aventus.StateSlug) => {
            if(slugs.id == 3) {
                return false;
            }
            return true;
        }
    });
}

export async function setUser(id: number) {
    MainStateManager.getInstance().setState("/user/" + id);
}

export async function removeUser() {
    MainStateManager.getInstance().setState("/other");
}

export async function inactiveNotFired() {
    await MainStateManager.getInstance().setState("/user/1");
    await MainStateManager.getInstance().setState("/user/2");
}
```

```json filename=/StateExample/aventus.conf.avt
{
    "module": "StateExample",
    "build": [
        {
            "name": "Main",
            "src": [
                './src/*'
            ]
        }
    ]
}
```

## Callback on the State

You can also override the three methods directly inside a <mark>State</mark> class.

```typescript filename=/StateExample/src/CreatePerson.state.avt
import type { Person } from "./Person.data.avt";

export class CreatePerson extends Aventus.State implements Aventus.IState {

    public editingPerson?: Person;

    /**
    * @inheritdoc
    */
    public override get name(): string {
        return "/person/create";;
    }

    /**
    * @inheritdoc
    */
    public override onActivate(): void {
        console.log("active");
    }

    /**
    * @inheritdoc
    */
    public override onInactivate(nextState: Aventus.State): void {
        console.log("inactive");
    }

    /**
    * @inheritdoc
    */
    public override async askChange(state: Aventus.State, nextState: Aventus.State): Promise<boolean> {
        return true;
    }

}
```

```typescript filename=/StateExample/src/Main.state.avt
export class MainStateManager extends Aventus.StateManager implements Aventus.IStateManager {
    /**
     * Get the instance of the StateManager
     */
    public static getInstance() {
        return Aventus.Instance.get(MainStateManager);
    }
}
```

```typescript filename=/StateExample/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/StateExample/src/Person.ram.avt
import { Person } from "./Person.data.avt";

export class PersonRAM extends Aventus.Ram<Person> implements Aventus.IRam {

    /**
    * Create a singleton to store data
    */
    public static getInstance() {
        return Aventus.Instance.get(PersonRAM);
    }

    /**
    * @inheritdoc
    */
    public override defineIndexKey(): keyof Person {
        return 'id';
    }
    /**
    * @inheritdoc
    */
    protected override getTypeForData(objJson: Aventus.KeysObject<Person> | Person): new () => Person {
        return Person;
    }
}
```

```typescript filename=/StateExample/src/Test.lib.avt
import { MainStateManager } from "./Main.state.avt";

export async function subscribe() {
    MainStateManager.getInstance().subscribe("/user/{id:number}", {
        active: (state: Aventus.State, slugs: Aventus.StateSlug) => {
            console.log("user active is " + slugs.id);
            // process a type of state
            if(state instanceof CreatePerson){
                console.log(state.editingPerson?.id);
            }
        },
        inactive: (state: Aventus.State, nextState: Aventus.State, oldSlugs: Aventus.StateSlug) => {
            console.log("new state is " + nextState.name);
        },
        askChange: async (state: Aventus.State, nextState: Aventus.State, slugs: Aventus.StateSlug) => {
            if(slugs.id == 3) {
                return false;
            }
            return true;
        }
    });
}

export async function setUser(id: number) {
    MainStateManager.getInstance().setState("/user/" + id);
}

export async function removeUser() {
    MainStateManager.getInstance().setState("/other");
}

export async function inactiveNotFired() {
    await MainStateManager.getInstance().setState("/user/1");
    await MainStateManager.getInstance().setState("/user/2");
}
```

```json filename=/StateExample/aventus.conf.avt
{
    "module": "StateExample",
    "build": [
        {
            "name": "Main",
            "src": [
                './src/*'
            ]
        }
    ]
}
```

## Manager helpers

- <mark>subscribe(pattern, callbacks, autoActiveState)</mark> immediately calls the active callback by default when the current state already matches.
- <mark>activateAfterSubscribe()</mark> performs that activation explicitly when automatic activation was disabled.
- <mark>canChangeState()</mark> registers a global asynchronous guard.
- <mark>getStateSlugs(pattern)</mark> returns the typed parameters of the active state.
- <mark>onAfterStateChanged()</mark> and <mark>offAfterStateChanged()</mark> manage callbacks executed after a successful transition.
- <mark>StateManager.canBeActivate(pattern, stateName)</mark> tests a state name without changing the current state.

---
# Webcomponent - Create

In this section you are going to learn what is a webcomponent and how you can create it inside Aventus.

## Definition

Web Components is a suite of different technologies allowing you to create reusable custom elements — with their
    functionality encapsulated away from the rest of your code — and utilize them in your web apps. ( *[https://developer.mozilla.org/](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)* ).

With the native technologie, you are able to wrap your style, your logic and your html template inside a single html
    tag. You can build your full webapp by building one component after another without worring about side effects (the
    developer's worst nightmare).

## Inside Aventus

Inside Aventus you can create web component by right clicking one the explorer part inside vscode, choose  *Aventus
        : Create...*  and choose  *Component* . Inside the input you can enter the name for the typescript class.
    By convention, this name should be in Snake case. You can write your webcomponent inside a single file
    &nbsp;<mark>*.wc.avt</mark> that
    will contains following section :


- <mark>&lt;template&gt;</mark> : for Html part
- <mark>&lt;style&gt;</mark> : for Scss part
- <mark>&lt;script&gt;</mark> : for Js part

```html filename=/ComponentExample/src/Button.wc.avt
<script>
    export class Button extends Aventus.Component implements Aventus.DefaultComponent {
    }
</script>
<template>
    <slot></slot>
</template>
<style>
    :host {
        background-color: #e5540e;
        border-radius: 5px;
        color: white;
        cursor: pointer;
        padding: 5px 15px;
        user-select: none;
    }
</style>
```

```html filename=/ComponentExample/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aventus Demo</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-button>Click me</av-button>
</body>
</html>
```

```json filename=/ComponentExample/aventus.conf.avt
{
    "module": "ComponentExample",
    "componentPrefix": "av",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ],
            "compile": [
                {
                    "output": "./dist/demo.js"
                }
            ]
        }
    ],
    "static": [{
        "name": "Static",
        "input": "./static/*",
        "output": "./dist/"
    }]
}
```

or inside 3 different file. (This option is the adviced one because it allows developer to keep a well knowed
    architecture.)

- <mark>*.wcv.avt</mark> : Web Componenent View for Html part
- <mark>*.wcs.avt</mark> : Web Componenent View for Scss part
- <mark>*.wcl.avt</mark> : Web Componenent View for Ts part

```typescript filename=/ComponentExample/src/Button/Button.wcl.avt
export class Button extends Aventus.Component implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods

    //#endregion

}
```

```css filename=/ComponentExample/src/Button/Button.wcs.avt
:host {
    background-color: #e5540e;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    padding: 5px 15px;
    user-select: none;
}
```

```html filename=/ComponentExample/src/Button/Button.wcv.avt
<slot></slot>
```

```html filename=/ComponentExample/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aventus Demo</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-button>Click me</av-button>
</body>
</html>
```

```json filename=/ComponentExample/aventus.conf.avt
{
    "module": "ComponentExample",
    "componentPrefix": "av",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ],
            "compile": [
                {
                    "output": "./dist/demo.js"
                }
            ]
        }
    ],
    "static": [{
        "name": "Static",
        "input": "./static/*",
        "output": "./dist/"
    }]
}
```

## The Html

You can use any basic tag or any tag you imported or created. The auto-completion will help you to find knowed tags.
    There are 2 special tags that you must know :

### &lt;slot&gt;

The slot tag allows developer to define the place where the code inside the tag will be added. This slot can have an
    attribute <mark>name</mark> to have multiple slots.

```typescript filename=/ComponentExample/src/Error/Error.wcl.avt
export class Error extends Aventus.Component implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods

    //#endregion

}
```

```css filename=/ComponentExample/src/Error/Error.wcs.avt
:host {
}
```

```html filename=/ComponentExample/src/Error/Error.wcv.avt
<slot> <!-- The default content appends here --></slot>
<slot style="color:red" name="error"><!-- The errors appends here --></slot>
<slot style="color:green" name="success"><!-- The success appends here --></slot>
```

```html filename=/ComponentExample/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aventus Demo</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-error>
        <p>I'm the default content</p>
        <p slot="">I'm the default content too</p>
        <p slot="error">I'm an error in red</p>
        <p slot="success">I'm a success in green</p>
    </av-error>
</body>
</html>
```

```json filename=/ComponentExample/aventus.conf.avt
{
    "module": "ComponentExample",
    "componentPrefix": "av",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ],
            "compile": [
                {
                    "output": "./dist/demo.js"
                }
            ]
        }
    ],
    "static": [{
        "name": "Static",
        "input": "./static/*",
        "output": "./dist/"
    }]
}
```

### &lt;block&gt;

The block tag must be used in case of inheritance. This will replace the slot by the block with the same name.

```typescript filename=/ComponentExample/src/Error/Error.wcl.avt
export class Error extends Aventus.Component implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods

    //#endregion

}
```

```css filename=/ComponentExample/src/Error/Error.wcs.avt
:host {
}
```

```html filename=/ComponentExample/src/Error/Error.wcv.avt
<slot> <!-- The default content appends here --></slot>
<slot style="color:red" name="error"><!-- The errors appends here --></slot>
<slot style="color:green" name="success"><!-- The success appends here --></slot>
```

```typescript filename=/ComponentExample/src/ErrorYellow/ErrorYellow.wcl.avt
import { Error } from "../Error/Error.wcl.avt";

export class ErrorYellow extends Error implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods

    //#endregion

}
```

```css filename=/ComponentExample/src/ErrorYellow/ErrorYellow.wcs.avt
:host {
}
```

```html filename=/ComponentExample/src/ErrorYellow/ErrorYellow.wcv.avt
<block name="error">
    <span style="color:yellow">
        <!-- The errors will be displayed in yellow now -->
        <slot name="error"></slot>
    </span>
</block>
```

```html filename=/ComponentExample/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aventus Demo</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-error>
        <p>I'm the default content</p>
        <p slot="">I'm the default content too</p>
        <p slot="error">I'm an error in yellow</p>
        <p slot="success">I'm a success in green</p>
    </av-error>
</body>
</html>
```

```json filename=/ComponentExample/aventus.conf.avt
{
    "module": "ComponentExample",
    "componentPrefix": "av",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ],
            "compile": [
                {
                    "output": "./dist/demo.js"
                }
            ]
        }
    ],
    "static": [{
        "name": "Static",
        "input": "./static/*",
        "output": "./dist/"
    }]
}
```

There are sepcial attributes you can use to add feature to basic html: 

- @element : To select element(s). More
            info
- @for : To create a loop. More info
- @bind(_ *<mark>$event</mark>* )?(: *<mark>$field</mark>* )? : To bind data.
        &nbsp;More
            info
    &nbsp;
- : *<mark>$field</mark>*  : To inject data. More
            info
    &nbsp;
- @press : To add press event from PressManager. More
            info
    &nbsp;
- @ *<mark>$eventName</mark>*  : To add event listener. More
            info
    &nbsp;

You can use interpolation inside tag content and normal attribute to have dynamic content. If you use a property value or a
        watch value the content will be refreshed.

```typescript filename=/ComponentExample/src/Clock/Clock.wcl.avt
export class Clock extends Aventus.Component implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props
    @Property()
    public color: string = "red";
    //#endregion


    //#region variables
    @Watch()
    public timeTxt!: string;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    private calcTime() {
        const d = new Date();
        this.timeTxt = ((d.getHours() < 10) ? "0" : "") + d.getHours()
            + ":" + ((d.getMinutes() < 10) ? "0" : "") + d.getMinutes()
            + ":" + ((d.getSeconds() < 10) ? "0" : "") + d.getSeconds();
    }

    protected override postCreation(): void {
        // When the component is rendered
        this.calcTime();
        setInterval(() => {
            this.calcTime();
        }, 1000);
    }
    //#endregion

}
```

```css filename=/ComponentExample/src/Clock/Clock.wcs.avt
:host {
}
```

```html filename=/ComponentExample/src/Clock/Clock.wcv.avt
<p style="color:{{ this.color }}">Time : {{ this.timeTxt }}</p>
```

```html filename=/ComponentExample/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aventus Demo</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-clock></av-clock>
</body>
</html>
```

```json filename=/ComponentExample/aventus.conf.avt
{
    "module": "ComponentExample",
    "componentPrefix": "av",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ],
            "compile": [
                {
                    "output": "./dist/demo.js"
                }
            ]
        }
    ],
    "static": [{
        "name": "Static",
        "input": "./static/*",
        "output": "./dist/"
    }]
}
```

## The style

This is just a simple SCSS file. The only think to know is that the style must be wrapped inside a :host{}.

```css filename=TextRed.wcs.avt
:host {
	color: red; // This ll change the behavior of the current webcomponent
}
```

You can find more information about the style here.

## The logic

When you create a new file *.wcl.avt you can notice that the file has region. This is set to allow developer to order
    the code. Each region has a goal. You can remove it but we advice you to keep it.

- static : Where you can write the static properties or methods for your webcomponent.
- props : Where you can define the attributes, the
        &nbsp;properties and the watch variables.
    &nbsp;
- variables : Where you can define the variables and the pointers on view
            element
- constructor : Where you can override the constructor for your webcomponent.
- methods : Where you can write the methods for your webcomponent.

```typescript
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

	//#region static

	//#endregion

	//#region props

	//#endregion

	//#region variables

	//#endregion

	//#region constructor

	//#endregion

	//#region methods

	//#endregion

}
```

Over the classname you can add predefine Decorators :

- <mark>@TagName(name:string)</mark> : to define the tag for the component
- <mark>@Debugger({ writeCompiled?: boolean, enableWatchHistory?: boolean})</mark> : to debug component
        compilation and
        to.
    &nbsp;
- <mark>@Dependencies({ type: Type, strong?:boolean}[])</mark> : to add a dependency not written inside
        component. The
        The strong boolean defines whether the dependency must be loaded before the class.
- <mark>@OverrideView({ removeViewVariables?: string[] })</mark> : to fully override parent view. You
        can remove parent
        ViewElement needed, but you have to be aware of what you are doing.
- <mark>@Internal()</mark> : to allow exporting class only in the current package but the class won't be usable for someone else that is using the package.
- <mark>@Required()</mark> : to force the class to be exported inside the *.js file.
- <mark>@Convertible(name: string = "Fullname")</mark> : to notify the compiler that the class can be converted from JSON. The parameter <mark>name</mark> define the key to detect the class to build.

```typescript
@TagName("my-tag-name")
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {
}
```

## Lifecycle

The webcomponent has the following lifecycle

![](https://aventusjs.com/img/doc/wc/create/lifecylce.png)

By default <mark>postCreation</mark> and <mark>postDestruction</mark> are empty.

Use <mark>postDisconnect()</mark> for work performed whenever the component leaves the DOM.
    &nbsp;<mark>onPostDisconnect(callback)</mark> and <mark>onPostDestruction(callback)</mark> register
    cleanup callbacks without overriding the lifecycle methods.

---
# Webcomponent - Style

In this section you are going to learn how to apply a style to your component.

## Definition

Because Aventus is build on the top of webcomponent, the style is scoped. It means that the style from Component 1
    won't affect the style from Component 2. If you want more information about scoped style inside webcomponent you
    can read [this](https://web.dev/shadowdom-v1/#component-defined-styles). It's great but
    it involves that each components must include it own style locally. What if I want to create a general style for all
    my components? This is why in addition to webcomponent scoped style, Aventus using the [Constructable Stylesheets](https://web.dev/constructable-stylesheets/) to
    improve reusability.

## Local style

To edit the style of your component, you must open the file <mark>*.wcs.avt</mark> and add the style you
    want written in SCSS. The only special selector inside webcomponent style is the <mark>:host</mark> that
    will target the current custom element.

```typescript filename=/Style/src/Example/Example.wcl.avt
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props
    @Attribute()
    public active!: boolean;
    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods

    //#endregion

}
```

```css filename=/Style/src/Example/Example.wcs.avt
:host {
	background-color: gray;
	display: block;

	.title {
		color: orange;
	}
}

:host([active]) {

	/* if the webcomponent has an attribute / property active*/
	.title {
		color: red;
	}
}
```

```html filename=/Style/src/Example/Example.wcv.avt
<p class="title">I am an example</p>
```

```html filename=/Style/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Style</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
    <av-example active></av-example>
</body>
</html>
```

```json filename=/Style/aventus.conf.avt
{
	"module": "Style",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

## Inherit style

If a webcomponent is inheriting another webcomponent, their styles will be merged. Parent style will be written
    before Child style so that you can override parent style without problem.

```typescript filename=/Style/src/Child/Child.wcl.avt
import { Parent } from "../Parent/Parent.wcl.avt";

export class Child extends Parent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods

    //#endregion

}
```

```css filename=/Style/src/Child/Child.wcs.avt
:host {
	.title {
		color: blue;
	}
}
```

```html filename=/Style/src/Child/Child.wcv.avt
<slot></slot>
```

```typescript filename=/Style/src/Parent/Parent.wcl.avt
export class Parent extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods

    //#endregion

}
```

```css filename=/Style/src/Parent/Parent.wcs.avt
:host {
	background-color: gray;
	display: block;

	.title {
		color: orange;
	}
}
```

```html filename=/Style/src/Parent/Parent.wcv.avt
<p class="title">I am an example</p>
```

```html filename=/Style/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Style</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-child></av-child>
    <av-parent></av-parent>
</body>
</html>
```

```json filename=/Style/aventus.conf.avt
{
	"module": "Style",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

The child title will be blue instead of orange.

## External style

If you want to create some utility classes for components, you can create file named <mark>@*.wcs.avt</mark> for Global WebComponent Style, then you can include this file inside component.
    This file is also a SCSS file.

### Create the file

You can create the global style file where you want.

```css filename=/Style/src/@Utility.wcs.avt
.red {
	color: red;
}
```

```html filename=/Style/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Style</title>
    <script src="/demo.js"></script>
</head>
<body>

</body>
</html>
```

```json filename=/Style/aventus.conf.avt
{
	"module": "Style",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

This will register the file <mark>@Utility.wcs.avt</mark> inside the <mark>Aventus.Style</mark>
    lib with the name <mark>@Utility</mark>.

![](https://aventusjs.com/img/doc/wc/style/stylemanager.png)

If you want to use an external lib as a style for your component, you can use the <mark>load</mark>
    function. For example to load the bootstrap class : 

```typescript filename=/Style/src/Example/Example.wcl.avt
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    private loadBootstrap() {
        Aventus.Style.load("@Bootstrap",
            "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css");
    }
    protected override styleBefore(addStyle: (name: string) => void): void {
        super.styleBefore(addStyle);
		this.loadBootstrap();
        addStyle("@Bootstrap");
    }
    //#endregion

}
```

```css filename=/Style/src/Example/Example.wcs.avt
:host {
	width: 100%;
}
```

```html filename=/Style/src/Example/Example.wcv.avt
<p class="text-bg-primary">I am an example</p>
```

```html filename=/Style/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Style</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
</body>
</html>
```

```json filename=/Style/aventus.conf.avt
{
	"module": "Style",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

By default, a base style existing inside <mark>Style</mark>. This style is named <mark>@default</mark> and is composed by

```css filename=@default
:host {
    display: inline-block;
    box-sizing: border-box;
}
:host * {
    box-sizing: border-box;
}
```

If you want that all your components contains some styles, you can write your own <mark>@default.wcs.avt</mark>. That will override the default style.

### Use global style

Now that you have style registered, you can tell your component to use this style. You can override 2 methods inside
    the logical file <mark>*.wcl.avt</mark> named : <mark>styleBefore</mark> and <mark>styleAfter</mark>.

```typescript filename=Example.wcl.avt
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {
    ...
    // Inside Aventus.WebCompoent the value of styleBefore is addStyle("@default")
    protected override styleBefore(addStyle: (name: string) => void): void {
        super.styleBefore(addStyle);
        addStyle("@Bootstrap");
    }
    protected override styleAfter(addStyle: (name: string) => void): void {
        addStyle("@utility");
    }
    ...
}
```

The style loaded will be the following :

## Edit style from outside

When you create component for a library, you should provide some style parameter that the user can edit. What if the
    library user want to change the backgroud-color. The style is scoped so he won't be able to edit it from outside.
    This is why you can define <mark>custom property</mark> inside your component. Declaring a custom
    property can be done by following the next pattern:

```css filename=Example.wcs.avt
:host {
    --_example-background-color: var(--example-background-color, red);
}

:host {
    .content {
        backgroud-color: var(--_example-background-color);
    }
}
```

The property declaration must be done inside the <mark>:host</mark> at the first level and following the
    schema --_ **componentName** - **propName** : var(-- **componentName** - **propName** ). In the future version
    of Aventus you will be able to use the <mark>@property</mark> tag in css and the completion will be
    improved. The current schema is used to be
    detected by the parser so that an auto-completion can be provided when you editing the style of the element.

```css filename=Example2.wcs.avt
:host {
    av-example {
        // come from auto-completion because the rules is the tag av-example
        --background-color: red;
    }
}
```

You can also quick create a variable by pressing <mark>Ctrl + k Ctrl + numpad1</mark> and provide the name
    for what the variable is for.

## Creating theme

A good pratice when you developing application is to create theme file where you can declare globals properties for
    the project. Inside Aventus you can achieve it by creating a new file named <mark>*.gs.avt</mark> for
    Global Style. This file must be set inside a <mark>static</mark> part of your project. This allows you to have
    auto-completion for all your global variables that must be declared inside the <mark>:root</mark>
    selector.

```typescript filename=/Style/src/Example/Example.wcl.avt
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods

    //#endregion

}
```

```css filename=/Style/src/Example/Example.wcs.avt
:host {
	color: var(--primary-color);
	width: 100%;
}
```

```html filename=/Style/src/Example/Example.wcv.avt
<p>I am an example</p>
```

```html filename=/Style/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Style</title>
    <script src="/demo.js"></script>
    <link rel="stylesheet" href="/style.css">
</head>
<body>
    <av-example></av-example>
</body>
</html>
```

```css filename=/Style/static/style.gs.avt
:root {
	--primary-color: red;
}
```

```json filename=/Style/aventus.conf.avt
{
	"module": "Style",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

---
# Webcomponent - Inheritance

In this section you are going to learn how you can create complex component based on inheritance. This is useful when
    you want to create a simple design for a component and then add some complexity.

## Delegate Function

We start the inheritance with a simple example. We need a component <mark>fillable</mark> to implement
    &nbsp;<mark>input[type="text"]</mark> and <mark>input[type="checkbox"]</mark>. First of all we
    create an abstract generic component with a label
    and a default value.


```typescript filename=/Inheritance/src/Fillable/Fillable.wcl.avt
export abstract class Fillable<T> extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props
    @Property()
    public label?: string; // you can use ctrl+k ctrl+numpad2 to generate the label property
    //#endregion


    //#region variables
    @Watch((target: Fillable<T>, action: Aventus.WatchAction, path: string, value: any) => {
        target.onValueChange();
    })
    public value?: T; // you can use ctrl+k ctrl+numpad3 to generate the value property

    @ViewElement()
    protected debugEl!: HTMLDivElement;
    //#endregion


    //#region constructor

    //#endregion


    //#region events
    /**
     * This is the event fired when the input value changed
     * Aventus.Callback create a variable that you can trigger and subscribe
     */
    public onChange: Aventus.Callback<(value?: T) => void> = new Aventus.Callback();
    //#endregion


    //#region methods
    /**
     * This function is fired when the value changed
     * Use it to update your view
     */
    protected abstract onValueChange(): void;

    protected override postCreation(): void {
		// print the new value
        this.onChange.add(() => {
            const line = document.createElement("DIV");
            line.innerHTML = this.value + "";
            this.debugEl.appendChild(line);
        });
    }
    //#endregion

}
```

```css filename=/Inheritance/src/Fillable/Fillable.wcs.avt
:host {
}
```

```html filename=/Inheritance/src/Fillable/Fillable.wcv.avt
<label>{{ this.label }}</label>
<slot></slot>

<div @element="debugEl"></div>
```

```html filename=/Inheritance/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inheritance</title>
    <script src="/demo.js"></script>
</head>
<body>
</body>
</html>
```

```json filename=/Inheritance/aventus.conf.avt
{
	"module": "Inheritance",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

Now we can implement the <mark>input[type="text"]</mark>.

```typescript filename=/Inheritance/src/Fillable/Fillable.wcl.avt
export abstract class Fillable<T> extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props
    @Property()
    public label?: string; // you can use ctrl+k ctrl+numpad2 to generate the label property
    //#endregion


    //#region variables
    @Watch((target: Fillable<T>, action: Aventus.WatchAction, path: string, value: any) => {
        target.onValueChange();
    })
    public value?: T; // you can use ctrl+k ctrl+numpad3 to generate the value property

    @ViewElement()
    protected debugEl!: HTMLDivElement;
    //#endregion


    //#region constructor

    //#endregion


    //#region events
    /**
     * This is the event fired when the input value changed
     * Aventus.Callback create a variable that you can trigger and subscribe
     */
    public onChange: Aventus.Callback<(value?: T) => void> = new Aventus.Callback();
    //#endregion


    //#region methods
    /**
     * This function is fired when the value changed
     * Use it to update your view
     */
    protected abstract onValueChange(): void;

    protected override postCreation(): void {
		// print the new value
        this.onChange.add(() => {
            const line = document.createElement("DIV");
            line.innerHTML = this.value + "";
            this.debugEl.appendChild(line);
        });
    }
    //#endregion

}
```

```css filename=/Inheritance/src/Fillable/Fillable.wcs.avt
:host {
}
```

```html filename=/Inheritance/src/Fillable/Fillable.wcv.avt
<label>{{ this.label }}</label>
<slot></slot>

<div @element="debugEl"></div>
```

```typescript filename=/Inheritance/src/TextInput/TextInput.wcl.avt
import { Fillable } from "../Fillable/Fillable.wcl.avt";

// write the TextInput.wcv.avt first then use ctrl+. to correct errors and auto create missing code
export class TextInput extends Fillable<string> implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @ViewElement()
    protected inputEl!: HTMLInputElement;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    /**
     * When the user use the input, this function will update the value and emit an event
     */
    protected triggerChange() {
        this.value = this.inputEl.value;
        this.onChange.trigger(this.value);
    }

    /**
     * @inheritdoc
     */
    protected override onValueChange(): void {
        this.inputEl.value = this.value ?? '';
    }
    //#endregion

}
```

```css filename=/Inheritance/src/TextInput/TextInput.wcs.avt
:host {
}
```

```html filename=/Inheritance/src/TextInput/TextInput.wcv.avt
<!-- this will replace the parent slot -->
<input @input="triggerChange" @element="inputEl"/>
```

```html filename=/Inheritance/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inheritance</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-text-input label="salut"></av-text-input>
</body>
</html>
```

```json filename=/Inheritance/aventus.conf.avt
{
	"module": "Inheritance",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

As you can see, we can easly implement logic for child when main logic part of the component is coded inside the
    parent.

## Replace slot

We override the function but we don't have any input inside the view. Inside the view, we can use the pattern called
    &nbsp;<mark>View composition</mark>. If you write some HTML code inside child view file, Aventus will replace
    the parent
    &nbsp;<mark>slot</mark> tag with the content of the child.


```html filename=TextInput.wcv.avt
<input @input="triggerChange" @element="inputEl"/>
```

The HTML code from <mark>TextInput.wcv.avt</mark> will replace the <mark>slot</mark> tag inside
    from <mark>Fillable.wcv.avt</mark>. The
    merged result will be :

```html filename=Merged
<label>{{ this.label }}</label>
<input @input="triggerChange" @element="inputEl"/>
```

This is the basic behaviour, but sometimes you need more slots. You can name your slot then wrap the child code
    inside tag <mark>block</mark>. If you don't wrap child code inside block tag, Aventus will consider that
    this code must replace
    the default slot.

```typescript filename=/Inheritance/src/Fillable/Fillable.wcl.avt
export abstract class Fillable<T> extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props
    @Property()
    public label?: string; // you can use ctrl+k ctrl+numpad2 to generate the label property
    //#endregion


    //#region variables
    @Watch((target: Fillable<T>, action: Aventus.WatchAction, path: string, value: any) => {
        target.onValueChange();
    })
    public value?: T; // you can use ctrl+k ctrl+numpad3 to generate the value property

    @ViewElement()
    protected debugEl!: HTMLDivElement;
    //#endregion


    //#region constructor

    //#endregion


    //#region events
    /**
     * This is the event fired when the input value changed
     * Aventus.Callback create a variable that you can trigger and subscribe
     */
    public onChange: Aventus.Callback<(value?: T) => void> = new Aventus.Callback();
    //#endregion


    //#region methods
    /**
     * This function is fired when the value changed
     * Use it to update your view
     */
    protected abstract onValueChange(): void;

    protected override postCreation(): void {
		// print the new value
        this.onChange.add(() => {
            const line = document.createElement("DIV");
            line.innerHTML = this.value + "";
            this.debugEl.appendChild(line);
        });
    }
    //#endregion

}
```

```css filename=/Inheritance/src/Fillable/Fillable.wcs.avt
:host {
}
```

```html filename=/Inheritance/src/Fillable/Fillable.wcv.avt
<slot name="error"></slot>

<label>{{ this.label }}</label>
<slot></slot>

<div @element="debugEl"></div>
```

```typescript filename=/Inheritance/src/TextInput/TextInput.wcl.avt
import { Fillable } from "../Fillable/Fillable.wcl.avt";

// write the TextInput.wcv.avt first then use ctrl+. to correct errors and auto create missing code
export class TextInput extends Fillable<string> implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @ViewElement()
    protected inputEl!: HTMLInputElement;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    /**
     * When the user use the input, this function will update the value and emit an event
     */
    protected triggerChange() {
        this.value = this.inputEl.value;
        this.onChange.trigger(this.value);
    }

    /**
     * @inheritdoc
     */
    protected override onValueChange(): void {
        this.inputEl.value = this.value ?? '';
    }
    //#endregion

}
```

```css filename=/Inheritance/src/TextInput/TextInput.wcs.avt
:host {
}
```

```html filename=/Inheritance/src/TextInput/TextInput.wcv.avt
<block name="error">
    <div>I'm an error</div>
</block>
<input @input="triggerChange" @element="inputEl" />
```

```html filename=/Inheritance/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inheritance</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-text-input label="salut"></av-text-input>
</body>
</html>
```

```json filename=/Inheritance/aventus.conf.avt
{
	"module": "Inheritance",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

Right now, no error is displayed inside the editor if you missspelled your block name. It ll be added soon.

## Replace the parent view

If you want to keep the parent logic but change the child view, you can use the decorator <mark>@OverrideView</mark>. For
    example, the input[type="checkbox"] don't need a label so we can remove it from parent.

```typescript filename=/Inheritance/src/CheckboxInput/CheckboxInput.wcl.avt
import { Fillable } from "../Fillable/Fillable.wcl.avt";

@OverrideView() // The label won't be displayed
export class CheckboxInput extends Fillable<boolean> implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @ViewElement()
    protected inputEl!: HTMLInputElement;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    /**
     * @inheritdoc
     */
    protected override onValueChange(): void {
        this.inputEl.checked = this.value ?? false;
    }

    //#endregion

}
```

```css filename=/Inheritance/src/CheckboxInput/CheckboxInput.wcs.avt
:host {
}
```

```html filename=/Inheritance/src/CheckboxInput/CheckboxInput.wcv.avt
<input type="checkbox" @element="inputEl"/>
```

```typescript filename=/Inheritance/src/Fillable/Fillable.wcl.avt
export abstract class Fillable<T> extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props
    @Property()
    public label?: string; // you can use ctrl+k ctrl+numpad2 to generate the label property
    //#endregion


    //#region variables
    @Watch((target: Fillable<T>, action: Aventus.WatchAction, path: string, value: any) => {
        target.onValueChange();
    })
    public value?: T; // you can use ctrl+k ctrl+numpad3 to generate the value property

    @ViewElement()
    protected debugEl!: HTMLDivElement;
    //#endregion


    //#region constructor

    //#endregion


    //#region events
    /**
     * This is the event fired when the input value changed
     * Aventus.Callback create a variable that you can trigger and subscribe
     */
    public onChange: Aventus.Callback<(value?: T) => void> = new Aventus.Callback();
    //#endregion


    //#region methods
    /**
     * This function is fired when the value changed
     * Use it to update your view
     */
    protected abstract onValueChange(): void;

    protected override postCreation(): void {
		// print the new value
        this.onChange.add(() => {
            const line = document.createElement("DIV");
            line.innerHTML = this.value + "";
            this.debugEl.appendChild(line);
        });
    }
    //#endregion

}
```

```css filename=/Inheritance/src/Fillable/Fillable.wcs.avt
:host {
}
```

```html filename=/Inheritance/src/Fillable/Fillable.wcv.avt
<slot name="error"></slot>

<label>{{ this.label }}</label>
<slot></slot>

<div @element="debugEl"></div>
```

```typescript filename=/Inheritance/src/TextInput/TextInput.wcl.avt
import { Fillable } from "../Fillable/Fillable.wcl.avt";

// write the TextInput.wcv.avt first then use ctrl+. to correct errors and auto create missing code
export class TextInput extends Fillable<string> implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @ViewElement()
    protected inputEl!: HTMLInputElement;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    /**
     * When the user use the input, this function will update the value and emit an event
     */
    protected triggerChange() {
        this.value = this.inputEl.value;
        this.onChange.trigger(this.value);
    }

    /**
     * @inheritdoc
     */
    protected override onValueChange(): void {
        this.inputEl.value = this.value ?? '';
    }
    //#endregion

}
```

```css filename=/Inheritance/src/TextInput/TextInput.wcs.avt
:host {
}
```

```html filename=/Inheritance/src/TextInput/TextInput.wcv.avt
<block name="error">
    <div>I'm an error</div>
</block>
<input @input="triggerChange" @element="inputEl" />
```

```html filename=/Inheritance/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inheritance</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-checkbox-input label="salut"></av-checkbox-input>
</body>
</html>
```

```json filename=/Inheritance/aventus.conf.avt
{
	"module": "Inheritance",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

---
# Webcomponent - Attribute

In this section you are going to learn what is an attribute on a webcomponent and how you can create it inside
    Aventus.

## Implementation

An attribute is a variable inside your webcomponent. An attribute has limited type:

- <mark>number</mark>
- <mark>string</mark>
- <mark>boolean</mark>
- <mark>date</mark>
- <mark>datetime</mark>
- <mark>time</mark>
- <mark>literal</mark> (ex: 'value1'|'value2')

Date-related attributes use the immutable <mark>Aventus.Date</mark>,
    &nbsp;<mark>Aventus.DateTime</mark> and <mark>Aventus.Time</mark> types and serialize as ISO values.

The source code to create an attribute is the following.

```typescript filename=Example.wcl.avt
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

	//#region static

	//#endregion

	//#region props
	/** Define if the element is active or not */
	@Attribute()
	public active!: boolean;
	//#endregion

	//#region variables

	//#endregion

	//#region constructor

	//#endregion

	//#region methods

	//#endregion

}
```

```html filename=index.html
<av-example><av-example>
<av-example active><av-example>
```

When you will use the tag <mark>&lt;av-example&gt;</mark> inside any other <mark>*.wcv.avt</mark> file, the auto-completion will show you the attribute <mark>active</mark>. Futhermore, you can access this property through the <mark>*.wcl.avt</mark>
    file when you store a variable typed as <mark>Example</mark>.

```typescript filename=Test.lib.avt
export function test(){
	const myExample = document.querySelector<Example>("av-example");
	myExample.active = false;
}
```

The main goal of attribute is to create state for your component so that you can apply different style on it. You can
    find more information about style here but the code below
    show you a quick example to display the background in red when component is active:

```css filename=Example.wcs.avt
:host {
	background: blue;
	transition: background-color 1s ease;
}
:host([active]) {
	background: red;
}
```

```typescript filename=/Attribute/src/Example/Example.wcl.avt
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props
	/** Define if the element is active or not */
    @Attribute()
    public active!: boolean;
    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods
	protected override postCreation(): void {
		setInterval(() => {
			this.active = !this.active;
		}, 2000)
	}
    //#endregion

}
```

```css filename=/Attribute/src/Example/Example.wcs.avt
:host {
    background: blue;
    display: block;
    margin: 10px 0;
    transition: background-color 0.2s linear;
}
:host([active]) {
    background: red;
}
```

```html filename=/Attribute/src/Example/Example.wcv.avt
<div>I'm an example</div>
```

```html filename=/Attribute/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Attribute</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
    <av-example active></av-example>
</body>
</html>
```

```json filename=/Attribute/aventus.conf.avt
{
	"module": "Attribute",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

## Quick use

When you are editing a <mark>*.wcl.avt</mark>, you can right click where you want to create an attribute
    and select the option  *Aventus: create attribute* . You must follow the instruction to get an attribute working.

You can also use the shortcut <mark>Ctrl + k Ctrl + numpad1</mark>.

---
# Webcomponent - Property

In this section you are going to learn how you can define property for your component and add a callback when the
    attribute change.

## Simple property

A property is defined by two things:

- An attribute on your tag
- A callback to be notified when the value of the attribute changed

The property is based on the observe attribute behaviour on webcomponent. You can find more information about this
    &nbsp;[here](https://web.dev/custom-elements-v1/#observing-changes-to-attributes)


A property has limited type:

- <mark>number</mark>
- <mark>string</mark>
- <mark>boolean</mark>
- <mark>date</mark>
- <mark>datetime</mark>
- <mark>time</mark>
- <mark>literal</mark> (ex: 'value1'|'value2')

The <mark>date</mark>, <mark>datetime</mark> and <mark>time</mark> types use
    &nbsp;<mark>Aventus.Date</mark>, <mark>Aventus.DateTime</mark> and <mark>Aventus.Time</mark>.
    These immutable types are based on Temporal and serialize to ISO strings.

Add <mark>@NoType()</mark> when a public component field must stay out of generated component type metadata.

In Aventus, you can declare a property by adding a <mark>decorator</mark> on a field.

```typescript filename=Example.wcl.avt
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

	//#region props
	@Property()
	public label?: string;
	//#endregion

}
```

```html
<av-example label="Hello"></av-example>
```

A property can be used like an <mark>attribute</mark> but the main advantage of property is <mark>interpolation</mark> and <mark>callback</mark>.

```typescript filename=Example.wcl.avt
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

	//#region props
	@Property((target: Example) => {
		console.log("my label changed")
	})
	private label?: string;
	//#endregion

}
```

```html filename=Example.wcv.avt
<div>{{ this.label }}</div>
```

With this code, the label inside the view will always be the same as the label property. Furthermore, when the label value changed, the callback will be called and the msg my label changed will be printed.

```typescript filename=/Property/src/Example/Example.wcl.avt
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props
    @Property((target: Example) => {
        console.log("my label changed")
    })
    public label?: string;
    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    protected override postCreation(): void {
        setInterval(() => {
            this.label = Math.random() + '';
        }, 2000);
    }
    //#endregion

}
```

```css filename=/Property/src/Example/Example.wcs.avt
:host {

}
```

```html filename=/Property/src/Example/Example.wcv.avt
<div>my label : {{ this.label }}</div>
```

```html filename=/Property/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Property</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
</body>
</html>
```

```json filename=/Property/aventus.conf.avt
{
	"module": "Property",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

## Quick use

When you are editing a <mark>*.wcl.avt</mark>, you can right click where you want to create an attribute
    and select the option  *Aventus: create attribute* . You must follow the instruction to get an attribute working.

You can also use the shortcut <mark>Ctrl + k Ctrl + numpad2</mark>.

---
# Webcomponent - Watch

In this section you are going to learn how you can define variables for your component that will fire a callback when
    something occur. In contrast to <mark>Attribute</mark> and <mark>Property</mark>, the <mark>Watch</mark> variable won't be reflected on the tag. This allow you to set complex type for the
    variable. The watch variable is based on a <mark>[Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)</mark>.

## Create a watch

To declare a watch variable, you must add the decorator <mark>@Watch</mark>.

```typescript filename=Example.wcl.avt
import { Person } from "../Person.data.avt";

export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region variables
    @Watch((target: Example, action: Aventus.WatchAction, path: string, value: any) => {
        console.log(Aventus.WatchAction[action] + " on " + path + " with value " + value);
    })
    public person?: Person;
    //#endregion

}
```

You can notice that the callback function contains more parameters than the <mark>Property</mark>
    decorator. This is due to the object complexity you can set. If <mark>Person</mark> is defined by the
    following class

```typescript filename=Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public name: string = "John Doe";
    public children: { name: string; }[] = [{ name: "Mini John Doe" }];
}
```

A lot of actions can be done on this object like changing the name, adding/removing a child, etc. With the parameters
    defined inside the callback you can know exactly what is happening with your data. 

The <mark>action</mark> is a enum that define if the object is <mark>CREATED</mark>, <mark>UPDATED</mark> or <mark>DELETED</mark>.

The <mark>path</mark> parameter is the path where the action occured (ex: <mark>person.children[0].name</mark> if we
    change the name of the first child).

The <mark>value</mark> is the value set / remove on the path.

Like the property, the main advantage of Watch variables is that they can be used inside <mark>interpolation</mark> and others view
    transformations.

```html filename=Example.wcv.avt
<div>Person : {{ this.person?.name }}</div>
```

```typescript filename=/Watch/src/Example/Example.wcl.avt
import { Person } from "../Person.data.avt";

export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props
    @Watch((target: Example, action: Aventus.WatchAction, path: string, value: any) => {
        console.log(Aventus.WatchAction[action] + " on " + path + " with value " + value);
    })
    public person?: Person;
    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    protected change() {
        if(this.person)
            this.person.name = "Changed Name";
    }

    protected override postCreation(): void {
        this.person = new Person()
    }
    //#endregion

}
```

```css filename=/Watch/src/Example/Example.wcs.avt
:host {

}
```

```html filename=/Watch/src/Example/Example.wcv.avt
<div>Person : {{ this.person?.name }}</div>
<button @press="change">Change</button>
```

```typescript filename=/Watch/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public name: string = "John Doe";
    public children: { name: string; }[] = [{ name: "Mini John Doe" }];
}
```

```html filename=/Watch/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Watch</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
</body>
</html>
```

```json filename=/Watch/aventus.conf.avt
{
	"module": "Watch",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

## Debug a watch

Because when you are building big application a lot of actions can modify your watch variable, we add a debug feature
    to easly understand what change my value. Over the webcomponent class you must add the decorator <mark>@Debugger</mark> with the option <mark>enableWatchHistory</mark> to true.

```typescript filename=Example.wcl.avt
import { Person } from "../Person.data.avt";

@Debugger({
    enableWatchHistory: true
})
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region variables
    @Watch((target: Example, action: Aventus.WatchAction, path: string, value: any) => {
        console.log(Aventus.WatchAction[action] + " on " + path + " with value " + value);
    })
    public person?: Person;
    //#endregion

}
```

This will add 2 functions on this component named <mark>getWatchHistory</mark> to get all changes on the
    waches variables and <mark>clearWatchHistory</mark> to clear the current history. Both functions are only
    available inside your DevTools Console.

![](https://aventusjs.com/img/doc/wc/watch/debug.png)

## Using watch outisde component

You can watch what occur on an object everywhere on your code. To achieve that, you must use the <mark>Aventus.Watcher.get</mark> and work only with the result of the function. More
        info

```typescript filename=Test.lib.avt
export function createWatcher() {
	let watchableObj = Aventus.Watcher.get({}, (action: WatchAction, path: string, value: any) => {
		console.log(Aventus.WatchAction[action] + " on " + path + " with value " + value);
	});
	return watchableObj;
}
```

---
# Webcomponent - Signal

In the Aventus framework, the <mark>@Signal()</mark> decorator provides a way to create reactive
    properties that are monitored at the first level only. Unlike <mark>@Watch()</mark> or full watchable
    objects, @Signal() does <mark>not observe nested or child properties</mark>. This makes it lightweight and ideal for scenarios
    where you only need to track changes to a property's immediate value.

## Using Signal

To declare a signal variable, you must add the decorator <mark>@Signal</mark>.

```typescript filename=Example.wcl.avt
import { Person } from "../Person.data.avt";

export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region variables
    @Signal((target: Example) => {
        console.log("person set");
    })
    public person?: Person;
    //#endregion


    //#region methods
    protected override postCreation(): void {
        // This will trigger the signal
        this.person = new Person();
        // This won't trigger the signal
        this.person.name = "John Doe";
    }
    //#endregion

}
```

You can notice that the callback function contains only one parameter not like the Watch decorator. This is due to the signal that need less complexity than Watch.

---
# Webcomponent - Interpolation

In this section you are going to learn how to use interpolation inside webcomponent.

Interpolation refers to embedding expressions into marked up text. You can notify an interpolation by using <mark>{{ myCode }}</mark>. Interpolation can be written anywhere inside a <mark>*.wcv.avt</mark>. If the variable is a <mark>Property</mark> or a <mark>Watch</mark> the view will be auto refreshed when the value changed.

```typescript filename=/Style/src/Example/Example.wcl.avt
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props
    @Property()
    public label: string = "My name is";
    @Watch()
    public person: { name: string; } = { name: "John" };
    //#endregion


    //#region variables
    public noRefresh: string = "I'm not auto refreshed";
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    public myRenderFct() {
        return "I'm the result of a function";
    }
    //#endregion

}
```

```css filename=/Style/src/Example/Example.wcs.avt
:host {
	width: 100%;
}
```

```html filename=/Style/src/Example/Example.wcv.avt
<label>{{ this.label }}</label>
<input value="{{ this.person.name }}" />
<div>{{ this.noRefresh }}</div>
<div>{{ this.myRenderFct() }}</div>
```

```html filename=/Style/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Style</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
</body>
</html>
```

```json filename=/Style/aventus.conf.avt
{
	"module": "Style",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

Because Aventus is using a <mark>Signal</mark> like system, any function that is using watchable variable will be auto refreshed when a value changed

JavaScript template literals using backticks are supported inside view expressions and interpolations.

---
# Webcomponent - Select element

In this section you are going to learn how to select a element from your shadowroot to use it inside your logical
    part.

## Normal case

Inside the <mark>*.wcv.avt</mark> file you can add an attribute <mark>@element</mark> to tag
    your element.

```html filename=Img.wcv.avt
<div class="img-container" @element="container">
	<img @element="imgEl"/>
</div>
```

When you save your file, the attribute <mark>@element</mark> will be underlined in red because you didn't
    declare the variable
    inside the <mark>*.wcl.avt.</mark> You can open this file and if you have sections, the variables section
    will be underline. You
    can <mark>ctrl + .</mark> and click on <mark>"Import missing view element"</mark>. This will create the two variables with a <mark>protected</mark>
    modifier and a decorator <mark>@ViewElement</mark>. This decorator is set to have a quick vision on which
    variables are
    used inside your view.

```typescript filename=Img.wcl.avt
export class Img extends Aventus.WebComponent implements Aventus.DefaultComponent {

	//#region static

	//#endregion

	//#region props

	//#endregion

	//#region variables
	@ViewElement()
	protected container: HTMLDivElement;

	@ViewElement()
	protected imgEl: HTMLImageElement;
	//#endregion

	//#region constructor

	//#endregion

	//#region methods

	//#endregion

}
```

## Multiple selection

In addition, you can use the same element name for different tags. It will select all the tags marked by the element
    name.

```html filename=List.wcv.avt
<div class="list">
	<div class="item" @element="items"></div>
	<div class="item" @element="items"></div>
	<p class="item" @element="items"></p>
</div>
```

```typescript filename=List.wcl.avt
export class List extends Aventus.WebComponent implements Aventus.DefaultComponent {

	//#region static

	//#endregion

	//#region props

	//#endregion

	//#region variables
	@ViewElement()
	protected items: (HTMLDivElement | HTMLParagraphElement)[];
	//#endregion

	//#region constructor

	//#endregion

	//#region methods

	//#endregion

}
```

## Expert use only

If you change your <mark>shadowroot</mark> by cloning node or something else, you can add a
    useLive option inside the decorator <mark>@ViewElement</mark> to do a <mark>querySelector</mark> instead of using saved values.

```typescript filename=Img.wcl.avt
export class Img extends Aventus.WebComponent implements Aventus.DefaultComponent {

	//#region static

	//#endregion

	//#region props

	//#endregion

	//#region variables
	@ViewElement({
		useLive: true // this code ll do a this.shadowroot.querySelector.
	})
	protected container: HTMLDivElement;

	@ViewElement()
	protected imgEl: HTMLImageElement;
	//#endregion

	//#region constructor

	//#endregion

	//#region methods

	//#endregion

}
```

---
# Webcomponent - Injection

In this section you are going to learn how you can inject data from parent into the child.

## Add injection

To bind add an injection on a child inside the shadowroot, you can use the following syntax : <mark>:fieldOnChild=""</mark>

With the code below, the input value will be incremented each second

```typescript filename=/Injection/src/Example/Example.wcl.avt
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @Watch()
    private time: number = 0;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    protected override postCreation() {
        setInterval(() => {
            this.time++;
        }, 1000);
    }
    //#endregion

}
```

```css filename=/Injection/src/Example/Example.wcs.avt
:host {

}
```

```html filename=/Injection/src/Example/Example.wcv.avt
<input type="text" :value="this.time" />
```

```html filename=/Injection/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Injection</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
</body>
</html>
```

```json filename=/Injection/aventus.conf.avt
{
	"module": "Injection",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

The injected value will be refreshed only if you use a <mark>Property</mark> or any <mark>watchables variables</mark>

```typescript filename=/Injection/src/Example/Example.wcl.avt
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @Watch()
    private time: number = 0;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    public getTimeTxt() {
        return 'time : ' + this.time;
    }
    protected override postCreation() {
        setInterval(() => {
            this.time++;
        }, 1000);
    }
    //#endregion

}
```

```css filename=/Injection/src/Example/Example.wcs.avt
:host {

}
```

```html filename=/Injection/src/Example/Example.wcv.avt
<input type="text" :value="this.getTimeTxt()" />
```

```html filename=/Injection/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Injection</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
</body>
</html>
```

```json filename=/Injection/aventus.conf.avt
{
	"module": "Injection",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

To help the user find out which fields are injectable into your component, you can use the <mark>@Injectable</mark> decorator.

The view compiler checks the injected expression against the child field type. Unknown injectable fields and
    incompatible values are reported as diagnostics. Expressions inside <mark>if</mark> blocks use the
    narrowed type established by the condition.

```typescript filename=/Injection/src/Btn/Btn.wcl.avt
export class Btn extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @Watch()
    @Injectable() // this will provide autocompletion on tag
    public name: string = "";
    //#endregion


    //#region constructor

    //#endregion


    //#region methods

    //#endregion

}
```

```css filename=/Injection/src/Btn/Btn.wcs.avt
:host {
}
```

```html filename=/Injection/src/Btn/Btn.wcv.avt
<span>{{ this.name }}</span>
```

```html filename=/Injection/src/Test.wc.avt
<script>
	export class Test extends Aventus.WebComponent implements Aventus.DefaultComponent {
		private name:string = 'John';
	}
</script>

<template>
	<av-btn :name="this.name"></av-btn>
</template>

<style></style>
```

```typescript filename=/Injection/aventus.conf.avt
{
	"module": "Injection",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [{
				"output": "./dist/demo.js"
			}]
		}
	],
	"static": [
		{
			"name": "Main",
			"input": "./src/static/*",
			"output": "./dist/"
		}
	]
}
```

---
# Webcomponent - Event

In this section you are going to learn how you can listen to event trigger.

## Add event

To bind an event on a child inside the shadowroot, you can use the following syntax : <mark>@eventname=""</mark>

With the code below, an alert saying "Hello" will be opened when the button is clicked.

```typescript filename=/Event/src/Example/Example.wcl.avt
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    /**
     *
     */
    protected sayHello() {
        alert("Hello");
    }
    //#endregion

}
```

```css filename=/Event/src/Example/Example.wcs.avt
:host {

}
```

```html filename=/Event/src/Example/Example.wcv.avt
<button @click="sayHello">Say hello</button>
```

```html filename=/Event/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
</body>
</html>
```

```json filename=/Event/aventus.conf.avt
{
	"module": "Event",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

If you have an Aventus.Callback instead of an event, you
    can use
    this syntax to subscribe to the trigger.

```typescript filename=/Event/src/Button/Button.wcl.avt
export class Button extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    public onCustomClick: Aventus.Callback<() => void> = new Aventus.Callback();
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    private triggerCustomClick() {
        this.onCustomClick.trigger();
    }
    //#endregion

}
```

```css filename=/Event/src/Button/Button.wcs.avt
:host {
}
```

```html filename=/Event/src/Button/Button.wcv.avt
<button @click="triggerCustomClick">Custom click</button>
```

```typescript filename=/Event/src/Example/Example.wcl.avt
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    /**
     *
     */
    protected sayHello() {
        alert("Hello");
    }
    //#endregion

}
```

```css filename=/Event/src/Example/Example.wcs.avt
:host {

}
```

```html filename=/Event/src/Example/Example.wcv.avt
<av-button @customClick="sayHello">Say hello</av-button>
```

```html filename=/Event/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
</body>
</html>
```

```json filename=/Event/aventus.conf.avt
{
	"module": "Event",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

If it's an Aventus.Callback, the compiler will take the name of your event and check if the property <mark>$event</mark>, <mark>on$event</mark> or <mark>on$Event</mark> exists on the
    element. For the example above, you can use <mark>@onCustomClick</mark>, <mark>@customClick</mark> or <mark>@CustomClick</mark>.

---
# Webcomponent - Binding

In this section you are going to learn how to bind data between parent and child component.

The data binding is a mix between Injection and
    &nbsp;Event. It will inject the data from parent to the child and
    when the child trigger a specific event, it will take value from child to assign it to the parent.


## Basic binding

To add binding you must add the attribute <mark>@bind</mark> inside your <mark>*.wcv.avt</mark>
    and add the field to watch as attribute value.

```typescript filename=/Binding/src/Example/Example.wcl.avt
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @Watch()
    public value: string = "My value";
    //#endregion


    //#region constructor

    //#endregion


    //#region methods

    //#endregion

}
```

```css filename=/Binding/src/Example/Example.wcs.avt
:host {

}
```

```html filename=/Binding/src/Example/Example.wcv.avt
<input @bind="this.value">

<p>{{ this.value }}</p>
```

```html filename=/Binding/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Binding</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
</body>
</html>
```

```json filename=/Binding/aventus.conf.avt
{
	"module": "Binding",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

The code above will inject the field <mark>value</mark> inside the input <mark>value</mark>
    and when the input trigger the event <mark>change</mark> or <mark>input</mark>, the value of
    the field value will be changed. The default binding order is the following : 

- input or textarea will listen on <mark>change</mark> and <mark>input</mark> event
- other tag will check if a Aventus.Callback named <mark>change</mark> exists on the child.
- if no Callback, a listener for the event <mark>change</mark> will be added


-  **Nb:**  for all tag, the value checked on child must be named <mark>value</mark>

## Select the event to listen to

If you need to define which event or CallbackManger the code must listen, you can write your binding like below.

```typescript filename=/Binding/src/Example/Example.wcl.avt
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @Watch()
    public value: string = "My value";
    //#endregion


    //#region constructor

    //#endregion


    //#region methods

    //#endregion

}
```

```css filename=/Binding/src/Example/Example.wcs.avt
:host {

}
```

```html filename=/Binding/src/Example/Example.wcv.avt
<input @bind_keyup="this.value">

<p>{{ this.value }}</p>
```

```html filename=/Binding/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Binding</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
</body>
</html>
```

```json filename=/Binding/aventus.conf.avt
{
	"module": "Binding",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

In this example, the field <mark>value</mark> will be updated when the <mark>keyup</mark>
    event is triggered on the input. Notice that if you have a Callback named keyup, the code will listen to the
    keyup Callback instead of the keyup event.

## Select the child field to bind with

If you need to define which field the code must synchronize instead of <mark>value</mark>, you can write your binding like below.


```typescript filename=/Binding/src/Example/Example.wcl.avt
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @Watch()
    public value: string = "My value";
    //#endregion


    //#region constructor

    //#endregion


    //#region methods

    //#endregion

}
```

```css filename=/Binding/src/Example/Example.wcs.avt
:host {

}
```

```html filename=/Binding/src/Example/Example.wcv.avt
<av-input @bind:val="this.value"></av-input>

<p>{{ this.value }}</p>
```

```typescript filename=/Binding/src/Input/Input.wcl.avt
export class Input extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props
    @Property()
    public val: string = "";
    //#endregion


    //#region variables
    @ViewElement()
    protected inputEl!: HTMLInputElement;

    public onChange: Aventus.Callback<() => void> = new Aventus.Callback();
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    /**
     *
     */
    protected triggerChange() {
        this.val = this.inputEl.value;
        this.onChange.trigger();
    }
    //#endregion

}
```

```css filename=/Binding/src/Input/Input.wcs.avt
:host {
	background-color: lightcoral;

	input {
		background-color: transparent;
	}
}
```

```html filename=/Binding/src/Input/Input.wcv.avt
<input value="{{ this.val }}" @input="triggerChange" @element="inputEl"/>
```

```html filename=/Binding/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Binding</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
</body>
</html>
```

```json filename=/Binding/aventus.conf.avt
{
	"module": "Binding",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

In this example, the parent field <mark>value</mark> will be synchronized with the child field <mark>val</mark>

## Full custom binding

You can mix the two previous cases to fully customize your binding.

```typescript filename=/Binding/src/Example/Example.wcl.avt
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @Watch()
    public value: string = "My value";
    //#endregion


    //#region constructor

    //#endregion


    //#region methods

    //#endregion

}
```

```css filename=/Binding/src/Example/Example.wcs.avt
:host {

}
```

```html filename=/Binding/src/Example/Example.wcv.avt
<av-input @bind_newVal:val="this.value"></av-input>

<p>{{ this.value }}</p>
```

```typescript filename=/Binding/src/Input/Input.wcl.avt
export class Input extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props
    @Property()
    public val: string = "";
    //#endregion


    //#region variables
    @ViewElement()
    protected inputEl!: HTMLInputElement;

    public onNewVal: Aventus.Callback<() => void> = new Aventus.Callback();
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    /**
     *
     */
    protected triggerChange() {
        this.val = this.inputEl.value;
        this.onNewVal.trigger();
    }
    //#endregion

}
```

```css filename=/Binding/src/Input/Input.wcs.avt
:host {
	background-color: lightcoral;

	input {
		background-color: transparent;
	}
}
```

```html filename=/Binding/src/Input/Input.wcv.avt
<input value="{{ this.val }}" @input="triggerChange" @element="inputEl"/>
```

```html filename=/Binding/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Binding</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
</body>
</html>
```

```json filename=/Binding/aventus.conf.avt
{
	"module": "Binding",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

---
# Webcomponent - State

In this section you are going to learn how you can listen to <mark>state</mark> inside Webcomponent.

You can use state and stateManager to manage the lifecycle of your application. You can subscribe manually to a state
    manager (the explanation is here). To developer
    faster, you can use <mark>Decorator</mark> over methods of Webcomponent. Each method has its own
    decorator: 

- active: <mark>@StateActive</mark>
- inactive: <mark>@StateInactive</mark>
- askChange: <mark>@StateChange</mark>

When you set a Decorator over a method, this method will be fired when the state pattern, the manager and the method
    matching

```typescript filename=/State/src/Example/Example.wcl.avt
import { MainStateManager } from "../MainStateManager.state.avt";

export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @ViewElement()
    protected debugEl!: HTMLDivElement;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    @StateActive("/state1", MainStateManager)
    protected onStateActive(state: Aventus.State, slugs: Aventus.StateSlug) {
        this.writeLog("/state1 on");
    }

    @StateInactive("/state1", MainStateManager.getInstance())
    protected onStateInactive(state: Aventus.State, nextState: Aventus.State, slugs: Aventus.StateSlug) {
        this.writeLog("/state1 off");
    }

    @StateChange("/state1", MainStateManager)
    protected async onAskChange(state: Aventus.State, nextState: Aventus.State, slugs: Aventus.StateSlug) {
        return confirm("set state1 off?");
    }

    protected writeLog(txt: string) {
        const div = document.createElement("DIV");
        div.innerHTML = txt;
        this.debugEl.appendChild(div);
    }


    protected toggleState() {
        let mainState = MainStateManager.getInstance();
        if(mainState.getState()?.name == "/state1") {
            mainState.setState("/");
        }
        else {
            mainState.setState("/state1");
        }
    }
    //#endregion

}
```

```css filename=/State/src/Example/Example.wcs.avt
:host {
}
```

```html filename=/State/src/Example/Example.wcv.avt
<div class="debug" @element="debugEl"></div>
<button @click="toggleState">Change state</button>
```

```typescript filename=/State/src/MainStateManager.state.avt
export class MainStateManager extends Aventus.StateManager implements Aventus.IStateManager {
	/**
	 * Get the instance of the StateManager
	 */
	public static getInstance() {
		return Aventus.Instance.get(MainStateManager);
	}

}
```

```html filename=/State/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>State</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
</body>
</html>
```

```json filename=/State/aventus.conf.avt
{
	"module": "State",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

Inside the Decorator you must define which StateManager must be watched. You can provide a class object <mark>MainStateManager.getInstance()</mark> or a class definition <mark>MainStateManager</mark>.
    If you set a class definition, Aventus will create a instance by using : <mark>Aventus.Instance.get()</mark>.

You can still use parameters inside the pattern to get slugs like <mark>/state/{id:number}/{action:string}</mark>.

If you need to do actions when none of your component state is active you can add two others Decorator : <mark>@DefaultStateActive</mark> and <mark>@DefaultStateInactive</mark>.

```typescript filename=/State/src/Example/Example.wcl.avt
import { MainStateManager } from "../MainStateManager.state.avt";

export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @ViewElement()
    protected debugEl!: HTMLDivElement;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    @StateActive("/state1", MainStateManager)
    protected onStateActive(state: Aventus.State, slugs: Aventus.StateSlug) {
        this.writeLog("/state1 on");
    }

    @StateInactive("/state1", MainStateManager.getInstance())
    protected onStateInactive(state: Aventus.State, nextState: Aventus.State, slugs: Aventus.StateSlug) {
        this.writeLog("/state1 off");
    }

    @StateChange("/state1", MainStateManager)
    protected async onAskChange(state: Aventus.State, nextState: Aventus.State, slugs: Aventus.StateSlug) {
        return confirm("set state1 off?");
    }

    @DefaultStateActive(MainStateManager)
    public onDefaultStateActive() {
        this.writeLog("No state define inside the component is matching");
    }
    @DefaultStateInactive(MainStateManager)
    public onDefaultStateInactive() {
        this.writeLog("The default state is now inactive because one component state is matching the active state");
    }

    protected writeLog(txt: string) {
        const div = document.createElement("DIV");
        div.innerHTML = txt;
        this.debugEl.appendChild(div);
    }


    protected toggleState() {
        let mainState = MainStateManager.getInstance();
        if(mainState.getState()?.name == "/state1") {
            mainState.setState("/");
        }
        else {
            mainState.setState("/state1");
        }
    }
    //#endregion

}
```

```css filename=/State/src/Example/Example.wcs.avt
:host {
}
```

```html filename=/State/src/Example/Example.wcv.avt
<div class="debug" @element="debugEl"></div>
<button @click="toggleState">Change state</button>
```

```typescript filename=/State/src/MainStateManager.state.avt
export class MainStateManager extends Aventus.StateManager implements Aventus.IStateManager {
	/**
	 * Get the instance of the StateManager
	 */
	public static getInstance() {
		return Aventus.Instance.get(MainStateManager);
	}

}
```

```html filename=/State/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>State</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
</body>
</html>
```

```json filename=/State/aventus.conf.avt
{
	"module": "State",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

When you don't need anymore a component instance inside the view, don't forget to call the method <mark>destructor</mark> to clear all state subscbriptions.

---
# Webcomponent - Loop


    Loops are a fundamental concept in programming that allow you to iterate over collections of data, such as arrays or
    objects, and perform operations on each element. In the context of Aventus views, loops provide a powerful
    mechanism for dynamically rendering content based on the data available. They enable you to generate repetitive
    structures, such as lists or tables, and customize the display of each item.


Loops are invaluable in template development for several reasons:

- Loops enable the dynamic generation of content based on the data provided. This flexibility allows for the
        creation of interactive and data-driven user interfaces.
- Loops help reduce code duplication by automating repetitive tasks, leading to cleaner and more maintainable
        templates.
- Loops facilitate the iteration over arrays, objects, or other iterable data structures, allowing you to access
        and manipulate each element individually.

Aventus aims to prioritize developer friendliness by streamlining the template development process. One notable
    feature illustrating this commitment is the ability to use loops directly within the template code. With Aventus,
    developers can seamlessly integrate loop constructs, such as for loops, directly into their templates without the
    need for additional setup or configuration. The Aventus compiler intelligently detects loop structures within the
    template code, allowing developers to focus on building dynamic and responsive user interfaces without cumbersome
    boilerplate code. This approach enhances developer productivity and promotes a more intuitive and efficient
    workflow, ultimately contributing to a more enjoyable and streamlined development experience.

## For

The <mark>for</mark> loop is a classic iteration construct in programming, commonly used to traverse
    arrays or perform repetitive
    tasks a fixed number of times. In Aventus templates, the for loop provides a straightforward approach to iterating
    over arrays and generating dynamic content based on each element.

```typescript filename=/For/src/TodoList/TodoList.wcl.avt
import { Todo } from "../Todo.data.avt";

export class TodoList extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @Watch()
    public todos: Todo[] = [];

    private todoId: number = 0;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    protected addTodo() {
        this.todoId++;
        let todo = new Todo();
        todo.name = "My todo " + this.todoId;
        todo.tasks = ["task1", "task2"];
        this.todos.push(todo);
    }
    //#endregion

}
```

```css filename=/For/src/TodoList/TodoList.wcs.avt
:host {
}
```

```html filename=/For/src/TodoList/TodoList.wcv.avt
<h1>Todos</h1>
for(let i = 0; i < this.todos.length; i++) {
    <div class="name">{{ this.todos[i].name }}</div>
    <ul>
        for(let j = 0; j < this.todos[i].tasks.length; j++) {
            <li>{{ i + 1 }}-{{ j + 1 }}. {{ this.todos[i].tasks[j] }}</li>
        }
    </ul>
}
<button @click="addTodo">Add</button>
```

```typescript filename=/For/src/Todo.data.avt
export class Todo extends Aventus.Data implements Aventus.IData {
	public id: number = 0;
	public name: string = "";
	public tasks: string[] = [];
}
```

```html filename=/For/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>For</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-todo-list></av-todo-list>
</body>
</html>
```

```typescript filename=/For/aventus.conf.avt
{
	"module": "For",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [
		{
			"name": "Static",
			"input": "./static/*",
			"output": "./dist/"
		}
	]
}
```

When working with nested loops in Aventus templates, referencing properties of outer loop iterations within inner
    loops can lead to verbose and repetitive code. In the provided example, accessing properties like <mark>this.todos[i]</mark>
    within each inner loop creates code clutter and decreases readability, especially when dealing with deeply nested
    structures or long property names.

To address this issue, Aventus introduces a concept called <mark>@Context</mark>. It allows developers to
    define a context variable within the loop iteration, simplifying property references within nested loops. By
    assigning the current loop iteration to a context variable, developers can then access properties of the current
    iteration directly using the context variable within inner loops. This approach significantly reduces code
    verbosity, enhances code clarity, and improves maintainability, especially in scenarios involving complex nested
    loops and data structures. Ultimately, <mark>@Context</mark> streamlines the template development process
    and promotes cleaner and more concise code.

```typescript filename=/For/src/TodoList/TodoList.wcl.avt
import { Todo } from "../Todo.data.avt";

export class TodoList extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @Watch()
    public todos: Todo[] = [];

    private todoId: number = 0;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    protected addTodo() {
        this.todoId++;
        let todo = new Todo();
        todo.name = "My todo " + this.todoId;
        todo.tasks = ["task1", "task2"];
        this.todos.push(todo);
    }
    //#endregion

}
```

```css filename=/For/src/TodoList/TodoList.wcs.avt
:host {
}
```

```html filename=/For/src/TodoList/TodoList.wcv.avt
<h1>Todos</h1>
for(let i = 0; i < this.todos.length; i++) {
    @Context('todo', this.todos[i])
    <div class="name">{{ todo.name }}</div>
    <ul>
        for(let j = 0; j < todo.tasks.length; j++) {
            <li>{{ i + 1 }}-{{ j + 1 }}. {{ todo.tasks[j] }}</li>
        }
    </ul>
}
<button @click="addTodo">Add</button>
```

```typescript filename=/For/src/Todo.data.avt
export class Todo extends Aventus.Data implements Aventus.IData {
	public id: number = 0;
	public name: string = "";
	public tasks: string[] = [];
}
```

```html filename=/For/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>For</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-todo-list></av-todo-list>
</body>
</html>
```

```typescript filename=/For/aventus.conf.avt
{
	"module": "For",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [
		{
			"name": "Static",
			"input": "./static/*",
			"output": "./dist/"
		}
	]
}
```

<mark>@Context</mark> values keep their inferred TypeScript type in interpolations, injections and
    nested conditions. Conditions inside a loop also narrow optional values for the guarded block.

## For...in

The <mark>for...in</mark> loop in JavaScript iterates over the enumerable properties of an object, making it suitable for looping
    through key-value pairs. In Aventus templates, it offers a convenient way to iterate over object
    properties and render content dynamically based on each key-value pair.

```typescript filename=/For/src/TodoList/TodoList.wcl.avt
import { Todo } from "../Todo.data.avt";

export class TodoList extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @Watch()
    public todos: Todo[] = [];

    private todoId: number = 0;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    protected addTodo() {
        this.todoId++;
        let todo = new Todo();
        todo.name = "My todo " + this.todoId;
        todo.tasks = ["task1", "task2"];
        this.todos.push(todo);
    }
    //#endregion

}
```

```css filename=/For/src/TodoList/TodoList.wcs.avt
:host {
}
```

```html filename=/For/src/TodoList/TodoList.wcv.avt
<h1>Todos</h1>
for(let index in this.todos) {
    @Context('todo', this.todos[index])
    <div class="name">{{ todo.name }}</div>
    <ul>
        for(let index2 in todo.tasks) {
            <li>{{ index + 1 }}-{{ index2 + 1 }}. {{ todo.tasks[index2] }}</li>
        }
    </ul>
}
<button @click="addTodo">Add</button>
```

```typescript filename=/For/src/Todo.data.avt
export class Todo extends Aventus.Data implements Aventus.IData {
	public id: number = 0;
	public name: string = "";
	public tasks: string[] = [];
}
```

```html filename=/For/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>For</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-todo-list></av-todo-list>
</body>
</html>
```

```typescript filename=/For/aventus.conf.avt
{
	"module": "For",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [
		{
			"name": "Static",
			"input": "./static/*",
			"output": "./dist/"
		}
	]
}
```

A <mark>for...in</mark> key is a string. Convert it with <mark>Number(index)</mark> when it
    is used as an array index requiring a number.

## For...of


    The <mark>for...of</mark> loop is a modern iteration construct introduced in ES6, designed specifically for iterating over
    iterable objects such as arrays, strings, and other collection types. In Aventus templates, it
    simplifies the iteration process by directly accessing the values of iterable objects, enabling seamless content
    rendering based on each item.


```typescript filename=/For/src/TodoList/TodoList.wcl.avt
import { Todo } from "../Todo.data.avt";

export class TodoList extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @Watch()
    public todos: Todo[] = [];

    private todoId: number = 0;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    protected addTodo() {
        this.todoId++;
        let todo = new Todo();
        todo.name = "My todo " + this.todoId;
        todo.tasks = ["task1", "task2"];
        this.todos.push(todo);
    }
    //#endregion

}
```

```css filename=/For/src/TodoList/TodoList.wcs.avt
:host {
}
```

```html filename=/For/src/TodoList/TodoList.wcv.avt
<h1>Todos</h1>
for(let todo of this.todos) {
    <div class="name">{{ todo.name }}</div>
    <ul>
        for(let task of todo.tasks) {
            <li>{{ task }}</li>
        }
    </ul>
}
<button @click="addTodo">Add</button>
```

```typescript filename=/For/src/Todo.data.avt
export class Todo extends Aventus.Data implements Aventus.IData {
	public id: number = 0;
	public name: string = "";
	public tasks: string[] = [];
}
```

```html filename=/For/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>For</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-todo-list></av-todo-list>
</body>
</html>
```

```typescript filename=/For/aventus.conf.avt
{
	"module": "For",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [
		{
			"name": "Static",
			"input": "./static/*",
			"output": "./dist/"
		}
	]
}
```

---
# Webcomponent - Conditional rendering

Conditional rendering is a fundamental concept in web development that allows developers to display different content
    based on certain conditions or criteria. It enables dynamic content presentation, enabling web applications to
    respond and adapt to user interactions, data changes, or specific scenarios.

In conditional rendering, sections of a web page are conditionally displayed or hidden depending on the evaluation of
    logical expressions or variables. This capability is particularly useful for scenarios such as displaying
    personalized greetings to logged-in users, rendering error messages when data is missing, or showing different views
    based on user preferences.

Conditional rendering is seamlessly integrated into the template syntax. Developers can use control flow constructs
    such as if statements to conditionally include or exclude content within the template markup. This approach empowers
    developers to create dynamic and interactive user interfaces that cater to diverse user scenarios and requirements.


Conditions narrow TypeScript types inside their block. After checking that an optional value is defined,
    interpolations and injections use the narrowed type without a non-null assertion.

```typescript filename=/Conditional/src/Example/Example.wcl.avt
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props
    @Property()
    public number!: number;
    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    protected increment() {
        this.number++;
    }
    //#endregion

}
```

```css filename=/Conditional/src/Example/Example.wcs.avt
:host {
}
```

```html filename=/Conditional/src/Example/Example.wcv.avt
<p>The current number is {{ this.number }}</p>

if (this.number % 2 === 0) {
    <p style="background:blue">{{ this.number }} is even.</p>
} else {
    <p style="background:red">{{ this.number }} is odd.</p>
}

<button @click="increment">Increment</button>
```

```html filename=/Conditional/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Conditional</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
</body>
</html>
```

```typescript filename=/Conditional/aventus.conf.avt
{
	"module": "Conditional",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [
		{
			"name": "Static",
			"input": "./static/*",
			"output": "./dist/"
		}
	]
}
```

---
# Library

In this section you are going to learn what is a library and how you can create it inside Aventus.

## Definition

A library is a piece of code that isn't matching any previous file type. This is the only file type that can contain
    exported functions. You can also declare and export constants or variables at the root of a library file.


```typescript filename=Test.lib.avt
export const answer = 42;

export function myFunction(){
...
}

export class MyClass {
...
}

export type MyType = ...

export interface MyInterface {
...
}

export enum MyEnum {
...
}
```

To keep a clean project, we advise you to not write all your code inside <mark>*.lib.avt</mark> even if
    you can do it. The goal of Aventus is to keep everything tidy.

The following sections are libraries that are included inside Aventus.

---
# Library - Animation

The animation class allow you to execute a function at specific frames. The code is based on the <mark>[](https://developer.mozilla.org/fr/docs/Web/API/window/requestAnimationFrame)requestAnimationFrame</mark>. One use case for the class can be the following : You have
    a to run some complex calculations when the user has the mouse press and moves the cursor on the screen. The event
    can be fired at anytime and can overload your website. To avoid that you can use the <mark>Animation</mark> like that.

```typescript filename=/Animation/src/Example/Example.wcl.avt
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @ViewElement()
    protected squareEl!: HTMLDivElement;

    protected animation?: Aventus.Animation;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    protected startAnimation(fps: number) {
        const max = 200;
        const step = 10;
        let value = 0;
		if(this.animation) {
			this.animation.immediateStop();
		}
		let animation = new Aventus.Animation({
            animate: () => {
                value += step;
                this.squareEl.style.left = value + 'px';
                if(value >= max) {
                    animation.stop();
                }
            },
            fps: fps,
            stopped: () => {
                // trigger when the animation is ended
            }
        });
		this.animation = animation;
        animation.start();
    }

    protected startAnimation1fps() {
        this.startAnimation(1);
    }
    protected startAnimation10fps() {
        this.startAnimation(10);
    }
    protected startAnimation30fps() {
        this.startAnimation(30);
    }
    protected startAnimation60fps() {
        this.startAnimation(60);
    }
    //#endregion

}
```

```css filename=/Animation/src/Example/Example.wcs.avt
:host {
	position: relative;
    padding-top: 30px;
	.square {
		background-color: red;
		height: 20px;
		left: 0;
		position: absolute;
		top: 0;
		width: 20px;
	}
}
```

```html filename=/Animation/src/Example/Example.wcv.avt
<div class="square" @element="squareEl"></div>
<button @click="startAnimation1fps">Start 1fps</button>
<button @click="startAnimation10fps">Start 10fps</button>
<button @click="startAnimation30fps">Start 30fps</button>
<button @click="startAnimation60fps">Start 60fps</button>
```

```html filename=/Animation/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Animation</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
</body>
</html>
```

```json filename=/Animation/aventus.conf.avt
{
	"module": "Animation",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

---
# Library - Callback

Aventus script files are based on Typescript. The main advantage is that everything is typed but when you will use
    &nbsp;<mark>custom event</mark> it will be a nightmare to keep your type. This is why inside Aventus you can
    find two classes that are doing the same jobs as Event but are type friendly : <mark>Callback</mark> and
    &nbsp;<mark>CallbackGroup</mark>.


```typescript filename=/Callback/src/Emitter/Emitter.wcl.avt
export class Emitter extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    private emitMyEvent() {
        setInterval(() => {
            this.dispatchEvent(new CustomEvent("myEvent", {
                detail: {
                    time: Aventus.DateTime.now
                }
            }));
        }, 1000);
    }
    protected override postCreation(): void {
        this.emitMyEvent();
    }
    //#endregion

}
```

```css filename=/Callback/src/Emitter/Emitter.wcs.avt
:host {
}
```

```html filename=/Callback/src/Emitter/Emitter.wcv.avt
<slot></slot>
```

```typescript filename=/Callback/src/Receiver/Receiver.wcl.avt
import { Emitter } from "../Emitter/Emitter.wcl.avt";

export class Receiver extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    protected override postCreation(): void {
        let emitter = document.querySelector<Emitter>("av-emitter");
        if(emitter) {
            emitter.addEventListener("myEvent", (e: Event) => {
                const event = e as CustomEvent<{ time: Aventus.DateTime }>;
                this.shadowRoot.innerHTML = 'Time is ' + e.detail.time;
            });
        }
    }
    //#endregion

}
```

```css filename=/Callback/src/Receiver/Receiver.wcs.avt
:host {
}
```

```html filename=/Callback/src/Receiver/Receiver.wcv.avt
<slot></slot>
```

```html filename=/Callback/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Callback</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-emitter></av-emitter>
    <av-receiver></av-receiver>
</body>
</html>
```

```json filename=/Callback/aventus.conf.avt
{
	"module": "Callback",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

There are many problems inside the code :

- You don't know that an event <mark>myEvent</mark> can be emitted.
- You don't know what the event will have as details ( time ).
- If the event name change, you won't be able to detect errors inside your code.
- If more details will be added, nothing told you that you can use it.

As you can see, you really dependend on the documentation. What a nightmare when you create bigger project. Now, have
    a look at the code below with <mark>Callback</mark>.

```typescript filename=/Callback/src/Emitter/Emitter.wcl.avt
export class Emitter extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    public readonly myEvent: Aventus.Callback<(time: Aventus.DateTime) => void> = new Aventus.Callback();
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    private emitMyEvent() {
        setInterval(() => {
            this.myEvent.trigger(Aventus.DateTime.now);
        }, 1000);
    }
    protected override postCreation(): void {
        this.emitMyEvent();
    }
    //#endregion

}
```

```css filename=/Callback/src/Emitter/Emitter.wcs.avt
:host {
}
```

```html filename=/Callback/src/Emitter/Emitter.wcv.avt
<slot></slot>
```

```typescript filename=/Callback/src/Receiver/Receiver.wcl.avt
import { Emitter } from "../Emitter/Emitter.wcl.avt";

export class Receiver extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    protected override postCreation(): void {
        let emitter = document.querySelector<Emitter>("av-emitter");
        if(emitter) {
            emitter.myEvent.add((time: Aventus.DateTime) => {
                this.shadowRoot.innerHTML = 'Time is ' + time;
            });
        }
    }
    //#endregion

}
```

```css filename=/Callback/src/Receiver/Receiver.wcs.avt
:host {
}
```

```html filename=/Callback/src/Receiver/Receiver.wcv.avt
<slot></slot>
```

```html filename=/Callback/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Callback</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-emitter></av-emitter>
    <av-receiver></av-receiver>
</body>
</html>
```

```json filename=/Callback/aventus.conf.avt
{
	"module": "Callback",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

As you can see, the behavior is almost the same but typing is preserved.

The <mark>CallbackGroup</mark> class is doing the same thing as the <mark>Callback</mark> but
    when you <mark>add</mark>, <mark>remove</mark> or <mark>trigger</mark>, you must
    provide a key (string or number) to trigger or store only a group of callbacks.

```typescript filename=/Callback/src/LogEmitter/LogEmitter.wcl.avt
export enum LogLvl {
    Info,
    Warning,
    Error
}

export class LogEmitter extends Aventus.WebComponent implements Aventus.DefaultComponent {
    public readonly onNewLog: Aventus.CallbackGroup<(msg: string) => void> = new Aventus.CallbackGroup();

    /**
    * Trigger the log callback only for the lvl concerned
    */
    public addLog(msg: string, lvl: LogLvl) {
        this.onNewLog.trigger(lvl, msg);
    }

    public readError() {
        this.onNewLog.add(LogLvl.Error, (msg) => {
			console.error(msg);
        });
    }
}
```

```css filename=/Callback/src/LogEmitter/LogEmitter.wcs.avt
:host {
}
```

```html filename=/Callback/src/LogEmitter/LogEmitter.wcv.avt
<slot></slot>
```

```html filename=/Callback/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Callback</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-emitter></av-emitter>
    <av-receiver></av-receiver>
</body>
</html>
```

```json filename=/Callback/aventus.conf.avt
{
	"module": "Callback",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

---
# compareObject

If you want compare if two objects contains the same information you can use the function <mark>Aventus.compareObject</mark>

```typescript filename=Example.lib.avt
export function test() {

    const obj1 = {
        name:"John",
        todos: ["todo1", "todo2"]
    }

    const obj2 = {
        name:"John",
        todos: ["todo2", "todo1"]
    }

    const obj3 = {
        name:"John",
        todos: ["todo1", "todo3"]
    }

    console.log(Aventus.compareObject(obj1, obj2)); // false: array order differs
    console.log(Aventus.compareObject(obj1, obj2, false)); // true: ignore array order
    console.log(Aventus.compareObject(obj1, obj3)); // false

}
```

The third parameter, <mark>tableOrder</mark>, defaults to <mark>true</mark>. Set it to
    &nbsp;<mark>false</mark> to compare arrays without considering their order. Aventus Date, DateTime, Time,
    Map and watched proxy values are compared by their underlying values.

---
# Converter

The <mark>Aventus.Converter.transform</mark> method is essential for converting data from one format to
    another, particularly useful when
    dealing with complex object structures. It's a versatile tool that simplifies the process of transforming data by
    providing a consistent interface for conversion operations.

Suppose you have an application that receives JSON data from an API and needs to convert it into JavaScript objects
    for further processing. In this case, you can utilize the Converter.transform method to perform the conversion
    seamlessly.

By default, the Converter will populate the class instances through the method <mark>fromJSON</mark> on
    your object or through the method <mark>Json.classFromJson</mark>.

```typescript filename=/Tools/src/Parser.lib.avt
import { Person } from "./Person.data.avt";

export class Parser {
    public static parse() {
        // JSON data received from an API with $type indicating the class name
        const jsonDataWithType = JSON.parse('{"$type": "Tools.Person", "id": 1, "name": "John", "age": 30}');

        // Convert JSON data to JavaScript object using Converter.transform
        const personWithType = Aventus.Converter.transform<Person>(jsonDataWithType);

        console.log(personWithType); // Output: Person { id: 1, name: 'John', age: 30 }
        console.log(personWithType instanceof Person); // Output: true
    }
}
```

```typescript filename=/Tools/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    // The static field Fullname = 'Tools.Person'
	public id: number = 0;
	public name: string = "";
	public age: number = 0;
}
```

```json filename=/Tools/aventus.conf.avt
{
	"module": "Tools",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

## Date and time values

The converter recognizes <mark>Aventus.Date</mark>, <mark>Aventus.DateTime</mark> and
    &nbsp;<mark>Aventus.Time</mark> ISO values. These immutable Temporal-based types provide parsing, comparison,
    arithmetic, localized formatting and conversion back to Temporal values.

The native JavaScript <mark>Date</mark> global is intentionally unavailable in Aventus source code. The
    language server reports it as an error and excludes it from completion; import and use
    &nbsp;<mark>Aventus.Date</mark> or <mark>Aventus.DateTime</mark> instead.

By default, <mark>Aventus.Data</mark> is convertible. You can also create custom convertible class by adding the decorator <mark>@Convertible</mark>. You must define an unique key so that the converter can transform your json into the object.

```typescript
@Convertible()
export class Test {
    public static get Fullname(): string { return "MyNamespace.Test"; }
    public get $type(): string { return Test.Fullname; }
}
```

---
# Library - PressManager

The <mark>PressManager</mark> class is a home class to deal with <mark>pointer</mark>, <mark>touch</mark> and <mark>mouse</mark> event. The main job of this class is to prevent the
    parent to have a trigger on an event catch by the child. The options for the PressManager are the following:

- 
        &nbsp;<mark>element</mark>: The element to which the events must be added.
    &nbsp;
- 
        &nbsp;<mark>delayDblPress</mark>: The delay allowed between two click/touch to
        trigger a double press event.
    &nbsp;
- 
        &nbsp;<mark>delayLongPress</mark>: The delay allowed before triggering a long press
        event.
    &nbsp;
- 
        &nbsp;<mark>forceDblPress</mark>: Force trigger double press event to parent (use
        it only if you know that the parent has a double press event because it will create latency).
    &nbsp;
- 
        &nbsp;<mark>offsetDrag</mark>: The distance in pixel that the user must move before
        triggering a drag event.
    &nbsp;
- 
        &nbsp;<mark>stopPropagation</mark>: If the lib must stop propagation of the event
    &nbsp;
- 
        &nbsp;<mark>buttonAllowed</mark>: List of mouse buttons allowed
    &nbsp;
- 
        &nbsp;<mark>onDblPress</mark>: Fired when double press event is detected.
    &nbsp;
- 
        &nbsp;<mark>onDrag</mark>: Fired when a drag event is detected.
    &nbsp;
- 
        &nbsp;<mark>onDragEnd</mark>: Fired when a drag event stopped.
    &nbsp;
- 
        &nbsp;<mark>onDragStart</mark>: Fired when a drag event started.
    &nbsp;
- 
        &nbsp;<mark>onLongPress</mark>: Fired when a long press event is detected.
    &nbsp;
- 
        &nbsp;<mark>onPress</mark>: Fired when a press event is detected.
    &nbsp;
- 
        &nbsp;<mark>onPressEnd</mark>: Fired when a press event stopped.
    &nbsp;
- 
        &nbsp;<mark>onPressStart</mark>: Fired when a press event started.
    &nbsp;

You must use only the property you need because your options will change the behavior of the PressManager. For
    example, if you set a callback on <mark>onDblPress</mark>, the code must wait until the end of the <mark>delayDblPress</mark> to trigger the <mark>onPress</mark>. This is not the case if you
    don't set the options.

Inside the <mark>*.wcv.avt</mark> you can use the attribute <mark>@press</mark> to create a
    PressManager on this element.

```typescript filename=/PressManager/src/Example/Example.wcl.avt
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @ViewElement()
    protected buttonEl!: HTMLButtonElement;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    /**
     *
     */
    protected onPress() {
        alert("Press with @press");
    }

    protected override postCreation(): void {
        new Aventus.PressManager({
            element: this.buttonEl,
            onPress: () => {
				alert("Press with Aventus.PressManager");
            }
        });
    }
    //#endregion

}
```

```css filename=/PressManager/src/Example/Example.wcs.avt
:host {
}
```

```html filename=/PressManager/src/Example/Example.wcv.avt
<button @element="buttonEl">Click 1</button>
<button @press="onPress">Click 2</button>
```

```html filename=/PressManager/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PressManager</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
</body>
</html>
```

```json filename=/PressManager/aventus.conf.avt
{
	"module": "PressManager",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

---
# Library - Drag&Drop

If you need to drag&drop a visual element you can use <mark>Aventus.DragAndDrop</mark>. This code will
    move a target by setting a <mark>left</mark> and a <mark>top</mark>. The drag&drop can be
    instanciate with the following parameters: 

- 
        &nbsp;<mark>applyDrag</mark>: Determine if the left and top value must be set or
        not
    &nbsp;
- 
        &nbsp;<mark>element</mark>: The element that will move
    &nbsp;
- 
        &nbsp;<mark>elementTrigger</mark>: The element that listen the drag event; default
        is element
    &nbsp;
- 
        &nbsp;<mark>offsetDrag</mark>: Set the default offset for the drag trigger; default
        is DragAndDrop.defaultOffsetDrag
    &nbsp;
- 
        &nbsp;<mark>shadow.enable</mark>: If set to true, the drag and drop will create a
        shadow element while dragging and removing it on drop. It will not move the original element anymore
    &nbsp;
- 
        &nbsp;<mark>shadow.container</mark>: The container where the shadow element will be
        added, default is body
    &nbsp;
- 
        &nbsp;<mark>shadow.removeOnStop</mark>: Remove shadow from DOM tree at the end
    &nbsp;
- 
        &nbsp;<mark>shadow.transform()</mark>: Add custom transformation for the shadow
        element like adding class
    &nbsp;
- 
        &nbsp;<mark>strict</mark>: If set to false, the element will be considered as in
        the target if it touches it
    &nbsp;
- 
        &nbsp;<mark>targets</mark>: The targets for the drop action
    &nbsp;
- 
        &nbsp;<mark>usePercent</mark>: Use percent instead of pixel
    &nbsp;
- 
        &nbsp;<mark>isDragEnable()</mark>: Set a function to determine if drag is active or
        not
    &nbsp;
- 
        &nbsp;<mark>getZoom()</mark>: Set a function to determine the current zoom; default
        is 1
    &nbsp;
- 
        &nbsp;<mark>getOffsetX()</mark>: Set a function to get offset X in px related to
        element.offsetTarget
    &nbsp;
- 
        &nbsp;<mark>getOffsetY()</mark>: Set a function to get offset Y in px related to
        element.offsetTarget
    &nbsp;
- 
        &nbsp;<mark>onPointerDown()</mark>: Set a function that will be fired when pointer
        down on the elementTrigger
    &nbsp;
- 
        &nbsp;<mark>onPointerUp()</mark>: Set a function that will be fired when pointer up
    &nbsp;
- 
        &nbsp;<mark>onStart()</mark>: Set a function that will be fired when drag start
    &nbsp;
- 
        &nbsp;<mark>onMove()</mark>: Set a function that will be fired when the element
        move; trigger even if applyDrag = false
    &nbsp;
- 
        &nbsp;<mark>onStop()</mark>: Set a function that will be fired when drag stop
    &nbsp;
- 
        &nbsp;<mark>onDrop()</mark>: Set a function that will be fired after drop if at
        least one target found
    &nbsp;

The simplest example is the following :

```typescript filename=/DragDrop/src/Example/Example.wcl.avt
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    protected override postCreation(): void {
        new Aventus.DragAndDrop({
			element: this
		});
    }
    //#endregion

}
```

```css filename=/DragDrop/src/Example/Example.wcs.avt
:host {
	width: 20px;
	height: 20px;
	background-color: red;
	position: absolute;
}
```

```html filename=/DragDrop/src/Example/Example.wcv.avt

                     
        
    
```

```html filename=/DragDrop/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Drag&Drop</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
</body>
</html>
```

```json filename=/DragDrop/aventus.conf.avt
{
	"module": "DragDrop",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

---
# Library - Instance

Sometimes you must create unique instance of a class. This pattern is named <mark>[Singleton](https://www.tutorialspoint.com/design_pattern/singleton_pattern.htm)</mark>. Despite the controversy over whether this pattern is a good choice for
    use or not, Aventus include a way to create singleton quickly. You just need to call the function <mark>Aventus.Instance.get</mark> to obtain your singleton instance.

```typescript filename=Singleton.lib.avt
export class MySingleton {

	public static getInstance(): MySingleton {
		return Aventus.Instance.get(MySingleton);
	}

	// To prevent class being created from outside
	private constructor(){}
}
```

---
# Json

The Json utility class is useful when you need to serialize JavaScript class instances into JSON objects and
    deserialize JSON data into JavaScript class instances. This is particularly helpful when working with data transfer
    between client and server, storing data in databases, or communicating with external APIs.

```typescript filename=Example.lib.avt
// Define the User class
class User {
    private name?: string;
    private age?: number;

    public constructor(name?: string, age?: number) {
        this.name = name;
        this.age = age;
    }
}

// Create an instance of the User class
const user = new User("John", 30);

// Serialize the class instance to JSON
const jsonUser = Aventus.Json.classToJson(user);

// Deserialize JSON data into a new instance of the User class
const newUser = new User();
Aventus.Json.classFromJson(newUser, jsonUser);

// Output the deserialized user
console.log(newUser); // User { name: 'John', age: 30 }
```

---
# Mutex

A Mutex (short for Mutual Exclusion) is a synchronization mechanism used in concurrent programming to control access
    to a shared resource, ensuring that only one thread or process can access the resource at a time. This prevents race
    conditions and ensures data consistency in multi-threaded or multi-process environments.

```typescript filename=/Tools/src/Test.lib.avt
export class Test {
    // Create a mutex instance
    private static mutex: Aventus.Mutex = new Aventus.Mutex();

    private static counter: number = 0;
    private static numThreads: number = 100;

    // Function to update the shared counter variable
    private static async updateCounter() {
        // Wait for the mutex to become available
        await this.mutex.waitOne();
        try {
            // Increment the counter
            this.counter++;
            console.log(this.counter);
            await Aventus.sleep(100);
        } finally {
            // Release the mutex
            this.mutex.release();
        }
    }

    private static async updateCounter2() {
        // Wait for the mutex to become available
        await this.mutex.safeRunAsync(async () => {
            this.counter++;
            console.log(this.counter);
            await Aventus.sleep(100);
        })
    }


    public static run() {
        // Multiple threads call the updateCounter function concurrently
        for(let i = 0; i < this.numThreads; i++) {
            this.updateCounter();
        }
        console.log("loop done");
    }
}
```

```json filename=/Tools/aventus.conf.avt
{
	"module": "Tools",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

In this example:

- Each thread waits for the mutex before updating the counter.
- Only one thread can acquire the mutex at a time, ensuring that counter updates are performed sequentially.
- Once a thread completes its task, it releases the mutex, allowing other threads to acquire it.

---
# Library - ResizeObserver

To know when an element is changing you can use the native function <mark>[ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)</mark>. Inside Aventus, you can find an optimized version of
    ResizeObserver under <mark>Aventus.ResizeObserver</mark>. The behavior is the same as the native one but
    behind, a <mark>single instance</mark> of native ResizeObserver is used and the callback function is
    limited to one trigger each <mark>1000 / 60 ms</mark>.

The callback follows the native <mark>ResizeObserverCallback</mark> signature and receives the changed
    entries followed by the shared native observer. Pass <mark>fps</mark> in the options to choose another
    callback frequency.

```typescript filename=/ResizeObserver/src/Example/Example.wcl.avt
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    protected override postCreation(): void {
		const observer = new Aventus.ResizeObserver(() => {
			if(this.offsetWidth < 50) {
				this.style.backgroundColor = 'red'
			}
			else {
				this.style.backgroundColor = 'blue'
			}
		})

		observer.observe(this);
    }
    //#endregion

}
```

```css filename=/ResizeObserver/src/Example/Example.wcs.avt
:host {
	animation-name: resize;
    animation-duration: 5s;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
	height: 30px;
}

@keyframes resize {
	0% {
		width: 30px;
	}

	100% {
		width: 70px;
	}
}
```

```html filename=/ResizeObserver/src/Example/Example.wcv.avt

                     
        
    
```

```html filename=/ResizeObserver/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ResizeObserver</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
</body>
</html>
```

```json filename=/ResizeObserver/aventus.conf.avt
{
	"module": "ResizeObserver",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

---
# Library - ResourceLoader

To load content from uri, you can use the fetch API in mordern browser. The only problem is that every time you need
    this resource, you have to reload it again and again. To avoid this you can use <mark>Aventus.ResourceLoader</mark>. Two method can be used :

- <mark>load</mark> that will return you the resource as a string (base64 for img resource).
- <mark>loadInHead</mark> that will append a style or script tag in head.

When a resource is loaded, the resource loader keeps it in memory or prevents adding the same tag to the head twice.

```typescript filename=Example.wcl.avt
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

	public async load() {

		// return the content of the svg
		const svgContent = await Aventus.ResourceLoader.load('/img.svg');
		const svgContent2 = await Aventus.ResourceLoader.load({
			type: "svg",
			url: "/img.svg"
		});

		// load the tag <link rel="stylesheet" href="/style.css">
		const hasError = await Aventus.ResourceLoader.loadInHead("/style.css");
		const hasError2 = await Aventus.ResourceLoader.loadInHead({
			type: "css",
			url: "/style.css",
			nonce: "content-security-policy-nonce"
		});
	}

}
```

By default Aventus will try to determine the type you want by analyze the extension set inside the uri. If it fails, you can specify the type you need by adding the <mark>type</mark> parameter.

The optional <mark>nonce</mark> is applied to script and style elements created by
    &nbsp;<mark>loadInHead</mark>, allowing them to comply with a Content Security Policy.

---
# sleep

If you need to wait a specific time of ms you can use the <mark>Aventus.sleep</mark> function.

```typescript filename=Example.lib.avt
export class Example {

	public async test() {
		console.log(Aventus.DateTime.now);
		await Aventus.sleep(5000);
		console.log(Aventus.DateTime.now);
	}

}
```

---
# UUID

If you need a unique id you can use the <mark>Aventus.uuidv4</mark> function. More information about uuid
    &nbsp;[here](https://en.wikipedia.org/wiki/Universally_unique_identifier).


```typescript filename=Example.lib.avt
export class Example {

	public test() {
		let id = Aventus.uuidv4();
	}

}
```

---
# getValueFromObject

The <mark>Aventus.getValueFromObject</mark> function is particularly useful when you need to retrieve a
    value from a nested object
    structure in JavaScript. This function helps you access specific values within complex objects without needing to
    write extensive code for traversal and error handling.

```typescript filename=Example.lib.avt
export function test() {

    const userProfile = {
        user: {
            profile: {
                address: {
                    city: 'New York'
                }
            }
        }
    };

    // Using getValueFromObject to retrieve the city value
    const city = Aventus.getValueFromObject('user.profile.address.city', userProfile);

    console.log(city); // Output: New York

}
```

# setValueToObject

The <mark>Aventus.setValueToObject</mark> function is invaluable when you need to set a value within a
    nested object structure in
    JavaScript. This function streamlines the process of updating specific properties within complex objects without the
    need for extensive manual traversal and error handling.

```typescript filename=Example.lib.avt
export function test() {

    let userProfile = {
        user: {
            profile: {
                address: {
                    city: 'New York'
                }
            }
        }
    };

    // Using setValueToObject to update the city value
    setValueToObject('user.profile.address.city', userProfile, 'Los Angeles');

}
```

---
# Library - Watcher

In the Aventus framework, watchable objects serve as dynamic data structures that enable developers to monitor
    changes to their properties. These objects are created using the <mark>Aventus.Watcher.get()</mark> function, which initializes a
    watchable object with optional initial properties and a callback function to handle property changes.

Consider the following example:

```typescript filename=Example.lib.avt
export function runWatcher() {
    const watchableObj = Aventus.Watcher.get({}, (action: Aventus.WatchAction, path: string, value: any) => {
        console.log(Aventus.WatchAction[action] + " on " + path + " with value " + value);
    });
    watchableObj.name = "John"; // Triggers a CREATED action
    // Log: CREATED on name with value "John"
    watchableObj.name = "John Doe"; // Triggers an UPDATED action
    // Log: UPDATED on name with value "John Doe"
    delete watchableObj.name; // Triggers a DELETED action
    // Log: DELETED on name with value "John Doe"
}
```

In this code snippet, <mark>watchableObj</mark> is a watchable object initialized without any initial
    properties. The <mark>Aventus.Watcher.get()</mark> function also accepts a callback function, which is
    invoked whenever a
    property of the watchable object is created, updated, or deleted. This callback function receives parameters
    indicating the action type (<mark>CREATED</mark>, <mark>UPDATED</mark>, or <mark>DELETED</mark>), the path of the property being modified, and its new
    value.

Watchable objects enable developers to reactively respond to changes in data, facilitating real-time updates and
    synchronization across different parts of their applications. By monitoring changes to watchable object properties,
    developers can implement dynamic behaviors and ensure that their applications remain responsive and up-to-date.

The watcher lib is similar to <mark>Signals</mark> that you can find in others frameworks. You can also
    find a <mark>computed</mark> and an <mark>effect</mark> that are functions.

## Signal

You can also use a signal to create a constant that triggers a change when the content is updated. The only difference is that the signal does not track changes in the object's children.

```typescript filename=Example.lib.avt
export function createSignal() {
    const signal = Aventus.Watcher.signal(1);
    // trigger change
    signal.value = 2;

    const signal2 = Aventus.Watcher.signal({ name: "" });
    // don't trigger change
    signal2.value.name = "test";
}
```

## Effect

In Aventus, effects are functions that are executed in response to changes in state or data within your application.
    Effects are created using the <mark>Aventus.Watcher.effect(fn: () =&gt;
        void)</mark> function. Effects are used to perform side-effects such as logging, updating the user
    interface, or interacting with external services.

Effects encapsulate logic to perform specific actions or behaviors whenever their dependencies change. For instance,
    you can define an effect to log a message whenever there is a change in the first name or last name properties of a
    person object.

By separating side-effects from the core logic of your application, effects help to keep your code organized,
    maintainable, and predictable. They promote a declarative programming style, allowing you to focus on what your
    application should do rather than how it should do it.

```typescript filename=Example.lib.avt
export function createEffect() {
    const watchableObj = Aventus.Watcher.get({
        firstname: "John",
        lastname: "Doe"
    });

    Aventus.Watcher.effect(() => {
        console.log(`My name is ${watchableObj.firstname} ${watchableObj.lastname}`);
    })

    watchableObj.firstname = "Jane"; // this will print My name is Jane Doe
}
```

## Computed

In the Aventus framework, computed values are a fundamental concept that allows developers to derive new data based
    on existing data within their applications. Computed values are created using the <mark>Aventus.Watcher.computed(fn: () =&gt; any)</mark> function,
    which enables you to define a function that computes a value based on other data or state variables.

Unlike traditional effects, computed values are expected to return a value. They encapsulate logic to calculate a new
    value based on changes to their dependencies, ensuring that the computed value remains up-to-date whenever its
    dependencies change.

For example, in Aventus, you can define a computed value to calculate the full name of a person based on their first
    name and last name properties. Whenever either the first name or last name changes, the computed value automatically
    updates to reflect the new full name, ensuring consistency and accuracy throughout your application.

Computed values provide a powerful tool for managing derived data and ensuring that your application remains
    responsive to changes in state or data dependencies. By leveraging computed values, developers can streamline their
    code, improve performance, and maintain a clear and consistent data model within their applications.

```typescript filename=Example.lib.avt
export function createComputed() {
    const watchableObj = Aventus.Watcher.get({
        firstname: "John",
        lastname: "Doe"
    });

    const fullName = Aventus.Watcher.computed(() => {
        return `${watchableObj.firstname} ${watchableObj.lastname}`;
    });

    console.log(fullName.value); // write "John Doe"

    watchableObj.firstname = "Jane"; // this will recompute the fullName

    console.log(fullName.value); // write "Jane Doe"
}
```

<mark>Watcher.effect()</mark> returns an <mark>Effect</mark>. Call
    &nbsp;<mark>destroy()</mark> when the effect is no longer needed. Use
    &nbsp;<mark>Watcher.untrack(() =&gt; value)</mark> to read reactive values without registering them as
    dependencies of the current effect.

---
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

You can customize how Aventus handles your i18n files.

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

---
# I18n - Usage

Once you have completed all the configuration steps, you can start using I18n in your application. Since Aventus automatically adds <mark>Aventus@Main</mark>, a global function <mark>t()</mark> is available throughout your code.

```ts filename=Demo.lib.avt
export class Demo {
    public static test() {
        // The function t() is available
        // Note: "test" will be underlined because no translation has been provided yet
        t("test")
    }
}
```

In the code above, the string <mark>"test"</mark> will be flagged as an error because no translation exists yet.

If there is an error, autocompletion is available. Once everything is set up, you can easily find translation keys using autocompletion.

## Global file

To register global translations, create a file anywhere Aventus is watching. The file name must start with <mark>@</mark> and end with <mark>.i18n.avt</mark>.

When you open the file, Aventus will display a custom I18n editor. This editor allows you to:

- Quickly see missing translations
- Automatically translate your file using Deepl API (need a Deepl API key configured in settings)
- And more

In the top-right corner, there is a button labeled <mark>Aventus: Open i18n file</mark>. Clicking it switches from the custom editor to the standard text editor. These <mark>*.i18n.avt</mark> files are actually JSON files that can be edited directly. Pressing the button again will switch back to the custom editor.

Translations consist of a key and a list of locale/value pairs for that key. You can also use variables in your text by adding <mark>{variable}</mark> inside the string.

```json filename=@Default.18n.avt
{
    "{qty} liters": {
        "en-gb": "{qty} liters",
        "fr-fr": "{qty} litres"
    }
}
```

```ts filename=Demo.lib.avt
export class Demo {
    public static test() {
        t("{qty} liters", { qty: "5" });
    }
}
```

## WebComponent File

To add translations for a specific component, create a file with the same name as the component, ending with <mark>.i18n.avt</mark>. For example, for the component <mark>Test.wcl.avt</mark>, create a file named <mark>Test.i18n.avt</mark>.

Translations from this file can be accessed inside the component using the function <mark>this.t()</mark>. Do not use <mark>t()</mark> here, as it will refer to the global translations.

## Change locale

To change the locale during runtime, call the following function:

```typescript
Aventus.I18n.setLocale(locale: string)
```

This will load the necessary translation files and update the translations accordingly.

---
# UI - Introduction

The UI layer of Aventus is designed around one simple philosophy: <mark>Provide all the logic you need for
        building powerful interfaces without enforcing any visual style.</mark>

## Philosophy

Modern UI frameworks often mix logic and style, forcing developers to adapt their design to predefined components.
    Aventus takes the opposite approach.
    It separates UI behavior (modals, inputs, events, states, keyboard shortcuts, etc.) from UI presentation (CSS,
    animations, layout).

This separation ensures:

- Full control over design : No default styling or opinionated CSS.
- Reusable logic : The same behavior can be reused across projects or customized easily.
- Reduced boilerplate : Core patterns like event handling, keyboard shortcuts, or asynchronous UI responses are
        already managed.

## Example: The Modal System

The ModalElement class is a perfect example of this philosophy.

It provides all the necessary behavior to manage modal dialogs (open, close, resolve, reject, keyboard shortcuts, and
    click-to-close) without enforcing any design.

```ts
import { PressManager } from "Aventus@Main:Aventus.package.avt";
import { ShortcutManager, SpecialTouch } from "../../../lib/ShortcutManager.lib.avt";

namespace Modal {
    export interface ModalOptions<T = any> {
        closeWithEsc?: boolean;
        closeWithClick?: boolean;
        rejectValue?: T | null;
    }

    export abstract class ModalElement<T, U extends ModalOptions<T> = ModalOptions<T>>
        extends Aventus.WebComponent
        implements Aventus.DefaultComponent {

        // Full logic for modal lifecycle and event handling...
    }
}
```

With this foundation, you can create your own modal UI library while relying on a consistent and tested interaction
    logic.

For example:

- Decide whether the modal should close when pressing Escape or clicking outside.
- Manage user confirmation and rejection through a unified promise-based API.
- Avoid repeating boilerplate code like event cleanup or state management.

## Key Benefits

- 
        Logic-first approach: You focus on what your component does, not how it looks.
    &nbsp;
- 
        Style freedom: Apply your own design system, Tailwind setup, or raw CSS.
    &nbsp;
- 
        Extensible foundation: Build and publish your own component libraries using Aventus logic.
    &nbsp;
- 
        Developer efficiency: Handle repetitive interaction logic once — reuse it everywhere.
    &nbsp;

## Vision

Aventus UI aims to be a neutral, behavior-oriented foundation for building user interfaces.
Instead of dictating design, it empowers you to:

- Prototype quickly without reimplementing interaction logic.
- Customize deeply to fit your brand or style.
- Scale consistently by reusing the same behavioral patterns across projects.

In short, Aventus provides the logic. You provide the design.

---
# UI - Button

The <mark>ButtonElement</mark> class provides the core logic for button components in Aventus.
    Just like other UI elements in the framework, it focuses purely on behavior and interaction, leaving style and
    presentation entirely up to you.

## Overview

Buttons are one of the most fundamental interactive elements in any UI.
    In Aventus, a ButtonElement is not a styled component. It's a behavioral foundation that handles:

- Different button types (button, submit, reset, menu)
- Form association and submission logic
- Keyboard and mouse interactions
- Optional loading state handling

This allows you to design your own visual button components with custom HTML, CSS, or frameworks like Tailwind while
    relying on a robust, consistent behavior layer.

## Core Concepts

### 1. Form Association

The <mark>ButtonElement</mark> integrates seamlessly with the <mark>Form</mark> system in
    Aventus. By default, it's form-associated, meaning it automatically connects to the nearest parent <mark>Form</mark> element.

This enables:

- Automatic form registration
- Form submission handling via the <mark>requestSubmit()</mark> API
- Compatibility with both standard and custom forms

If no native HTML form is detected, the button uses the Aventus Form handler system to trigger submissions
    programmatically.

### 2. Button Types

Aventus supports the four standard button types:

- <mark>button</mark>: Default; performs no automatic action.
- <mark>submit</mark>: Triggers form submission logic.
- <mark>reset</mark>: (Future extension) Designed to reset form state.
- <mark>menu</mark>: For custom interactive UI controls.

The type is declared using the <mark>@Property()</mark> decorator:

```typescript
@Property()
public type: 'button' | 'submit' | 'reset' | 'menu' = 'button';
```

### 3. Press and Keyboard Handling

User interactions are managed through the <mark>PressManager</mark> utility, which standardizes press
    events across devices (mouse, touch, keyboard).

For submit buttons:

- A click or touch event triggers <mark>triggerSubmit().</mark>
- Pressing the <mark>Enter</mark> key also triggers submission.

This ensures accessibility and consistent behavior across all input methods.

### 4. Loading State Integration

If your custom button class includes a loading property, ButtonElement will automatically respect it:

- Prevents double submissions when already loading.
- Resets loading state once the form submission completes.

This makes it easy to integrate visual feedback such as spinners or disabled states

## Why It Matters

By abstracting out repetitive button behavior (submission, keyboard handling, and event management) the ButtonElement
    lets you:

- Build consistent, accessible buttons across your UI.
- Focus entirely on design and UX, not low-level logic.
- Extend behavior easily for custom needs (async actions, tooltips, etc.).

Every Aventus button you create inherits reliable interaction patterns without any extra boilerplate.

## Summary

|Feature|Description|
|---|---|
|Behavior-first|Handles logic, not style|
|Form-aware|Automatically connects to forms|
|Keyboard-friendly|Submits with Enter|
|Extensible|Add custom logic and visuals|
|Reusable|Core logic shared across all projects|

 **In short:** 

The ButtonElement provides all the behavioral logic you expect from a modern button, while giving you complete
    freedom over how it looks.

---
# UI - Form

The Form system in Aventus provides a powerful and flexible foundation for managing form logic (validation, state
    tracking, data submission, and error handling) all without enforcing any visual design.

Just like the rest of Aventus UI, it focuses on behavior over presentation. You bring the HTML and CSS; Aventus
    brings the logic, validation, and lifecycle.

## Overview

The <mark>Form</mark> module allows you to define, validate, and handle complex forms in a structured and
    reusable way.

It separates form logic from UI rendering, giving you a system that can handle:

- Input registration and tracking
- Field-level and global validation
- Form submission and execution
- Error mapping and feedback
- Async submission functions
- Custom validator classes

Aventus forms can be used both declaratively (via Web Components) and programmatically (via the FormHandler API).

## Core Architecture

### Form

The <mark>Form</mark> class represents a logical container for form elements and submit buttons. It
    coordinates validation and submission by connecting to a <mark>FormHandler</mark>.

Key responsibilities:

- Registers input elements (<mark>FormElement</mark>) and submit buttons (<mark>ButtonElement</mark>)
- Tracks keyboard interactions (e.g. pressing Enter)
- Delegates validation and submission to the associated <mark>FormHandler</mark>
- Provides <mark>onSubmit</mark> event callbacks

### FormHandler

The <mark>FormHandler</mark> class is the engine behind every form. It manages the internal state,
    validation rules, and submission flow.

A <mark>FormHandler</mark> is typically created from a schema that describes the structure and validation
    logic of your data:

```ts
const form = Aventus.Form.Form.create({
    email: Aventus.Form.Validators.Email,
    password: [Aventus.Form.Validators.Required],
});
```

or equivalently:

```ts
const form = new Aventus.Form.FormHandler({
    email: { validate: new Aventus.Form.Validators.Email() },
    password: { validate: new Aventus.Form.Validators.Required() },
});
```

You can also specify a global configuration or default validation behavior using:

```ts
Aventus.Form.Form.configure({
    validateOnChange: true,
});
```

## How It Works

### 1. Schema Definition

A schema defines each field in the form and its validation rules:

```typescript
type LoginSchema = {
    name: string;
    email: string;
    password: string;
};
const schema: Aventus.Form.FormSchema<LoginSchema> = {
    name: {},
    email: new Aventus.Form.Validators.Email(),
    password: new Aventus.Form.Validators.Required(),
};
```

This schema tells the form handler how to validate each field.

### 2. FormHandler Creation

```ts
const handler = Aventus.Form.Form.create(schema, {
    validateOnChange: true,
});
```

You can attach this handler to a Form component:

```html
<av-form :form="this.handler"></av-form>
```

### 3. Validation

Validation is performed at two levels:

- Field-level validation (defined in the schema)
- Global validation (defined via FormHandlerConfig.validate)

Aventus supports both synchronous and asynchronous validators.

Example :

```ts
const valid = await handler.validate(); // validates all fields
const emailValid = await handler.validate("email"); // only one field
```

If validation fails and there’s no registered UI element for a field, Aventus calls the handler’s error function:

```ts
onValidateFallback: (errors) => {
    console.warn("Unmapped validation errors:", errors);
}
```

### 4. Submission

Once validation passes, you can submit your form:

```ts
await handler.submit(async (body) => {
    // simulate API call
    return api.login(body);
});
```

<mark>submit()</mark> automatically:

- Validates the form
- Calls your submission function
- Handles and maps any backend errors

If an input is associated with a field that produced an error, the handler pushes the message into that element’s
errors array automatically. Validation errors without an input use <mark>onValidateFallback</mark>; unmapped
server errors use <mark>onServerFallback</mark>.

### Controller integration

<mark>Form.createFromController()</mark> creates a typed handler directly from an
<mark>HttpRoute</mark> method. Use the overload with a method name when the controller exposes more than one
route, and the sub-form helpers when the submitted body is nested below a property.

## Validators

Validators in Aventus are simple classes that implement a single method: validate().

### Example: Required

```ts
export class Required extends Validator<any> {
    public static msg = "The field {name} is required";
    public override validate(value: any | undefined, name: string): string | boolean {
        const msg = Required.msg.replace(/{ *name *}/g, name);
        if (value == null || value === "") return msg;
        return true;
    }
}
```

You can also chain validators in a schema:

```ts
const schema = {
    email: [Aventus.Form.Validators.Required, Aventus.Form.Validators.Email],
};
```

## Key Features

|Feature|Description|
|---|---|
|Schema-based validation|Define form logic declaratively|
|Two-way data binding|Auto-syncs between form data and UI|
|Two-way data binding|Works with async or server-side validators|
|Global config|Default validation and error handlers|
|Automatic error mapping|Links backend or validator errors to form fields|
|No styling enforced|You handle visuals, Aventus handles logic|

## Example: Complete Login Form

## Summary

Aventus Forms provide a logic-first, design-free approach to handling forms:

- Smart: automatic validation, submission, and state tracking
- Modular: validators, fields, and forms are decoupled and reusable
- Design-free: you control every pixel of UI
- Efficient: less repetitive code, consistent behavior everywhere

---
# UI - FormElement

<mark>FormElement</mark> is the foundation of all input components in Aventus.
    It bridges the gap between your UI (the visible input field) and the form logic managed by <mark>FormHandler</mark>.

Just like the rest of the Aventus UI framework, it is completely design-agnostic: you define how your input looks and
    behaves. Aventus handles the logic, validation, and data synchronization.

## Philosophy

Traditional form systems often couple validation, layout, and styling.
    Aventus takes a different route: logic and UI are separate, but synchronized.

Each <mark>FormElement</mark>:

- Knows its current value
- Syncs automatically with its parent <mark>FormHandler</mark>
- Reacts to validation events
- Exposes change and error callbacks
- Integrates natively with browser forms through <mark>ElementInternals</mark>

This design allows developers to create fully custom input components, from simple text fields to rich custom
    widgets, without rewriting boilerplate logic.

## Overview

<mark>FormElement&lt;T&gt;</mark> is an abstract class that provides:

- Automatic registration inside a Form
- Two-way binding with the FormHandler
- Integrated validation and error reporting
- Native form association (formAssociated = true)
- Built-in event callbacks (onChange, onFormValidation)
- Internal state management (via ElementInternals)

```typescript filename=/MyInput.wcl.avt
import { FormElement } from "Aventus@UI:Aventus.Form.package.avt";

export class MyInput extends FormElement<string> implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props
    @Property()
    public name?: string;
    @Property()
    public label?: string;
    @Attribute()
    public type: string = "text";
    @Attribute()
    public placeholder?: string;

    @Property((target: DocUIFormElementEditor1Input) => {
        target.inputEl.value = target.value ?? "";
    })
    public override value: string = "";
    //#endregion


    //#region variables
    @ViewElement()
    protected inputEl!: HTMLInputElement;
    private focusValue: string = "";
    //#endregion


    //#region constructor

    //#endregion


    //#region methods

    /**
     *
     */
    protected focusInput() {
        this.inputEl.focus();
    }

    /**
     *
     */
    public select() {
        this.inputEl.select();
    }

    /**
     *
     */
    protected onFocus() {
        this.clearErrors();
        this.focusValue = this.inputEl.value;
    }
    /**
    *
    */
    protected onBlur() {
        if(this.inputEl.value == this.focusValue) {
            this.validate();
        }
    }
    /**
    *
    */
    protected onInput() {
        this.triggerChange(this.inputEl.value);
    }

    //#endregion

}
```

```css filename=/MyInput.wcs.avt
:host {
	color: black;
	width: 100%;

	.label {
		color: #eee;
		cursor: pointer;
		display: block;
		font-size: 14px;
		margin-bottom: 6px;
	}

	.input {
		background-color: #eee;
		border: 1px solid gray;
		border-radius: 4px;
		cursor: pointer;
		display: flex;
		padding: 0 8px;
		width: 100%;


		input {
			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
			background-color: transparent;
			border: none;
			color: inherit;
			flex-grow: 1;
			font-size: 15px;
			outline: none;
			outline-style: none;
			padding: 8px 0;
		}
	}

	.errors {
		color: red;
		font-size: 13px;
		margin-top: 6px;
	}
}

:host(:not([label])),
:host([label=""]) {
	.label {
		display: none;
	}
}

:host(:not([has_errors])) {
	.errors {
		display: none;
	}
}

:host([disabled]) {
	.input {
		input {
			background-color: #9e9e9e;
			border-color: #888888;
			box-shadow: none;
			cursor: not-allowed;
		}
	}
}
```

```html filename=/MyInput.wcv.avt
<label for="{{ this.name }}" class="label" @press="focusInput">{{ this.label }}</label>
<div class="input">
    <slot name="before"></slot>
    <input @element="inputEl" type="{{ this.type }}" name="{{ this.name }}" id="{{ this.name }}" placeholder="{{ this.placeholder }}" @focus="onFocus" @blur="onBlur" @input="onInput">
    <slot name="after"></slot>
</div>
<div class="errors">
    for(let error of this.errors) {
        <div>{{ error }}</div>
    }
</div>
```

## Core Behavior

### Automatic Registration

When a <mark>FormElement</mark> is created, it automatically registers itself with its nearest parent
    &nbsp;<mark>Form</mark>. This ensures that the form knows about all inputs and can include them in validation
    or submission processes.


### Value and Error Binding

Aventus provides two-way synchronization between:

- The field's value
- The associated FormHandler's internal state
- The browser's native form API (<mark>ElementInternals</mark>)

### Validation Flow

Every <mark>FormElement</mark> can:

- Define custom validation rules through the <mark>validation()</mark> method
- Participate in form-wide validation triggered by the <mark>FormHandler</mark>

When a validation occurs:

- The element checks its own <mark>validation()</mark> rules.
- The form merges its result with any global validation errors.
- The element updates its <mark>errors</mark> array and sets the proper validity state.

You can override <mark>validation()</mark> in your custom components:

```ts
protected async validation(): Promise<string[]> {
    const errors: string[] = [];
    if (!this.value) errors.push("This field is required");
    return errors;
}
```

### Native Form Integration

Aventus elements are natively compatible with browser <mark>&lt;form&gt;</mark> elements using
    ElementInternals.
    This means:

- You can use them directly inside standard HTML forms.
- The <mark>form.submit()</mark> and <mark>form.reset()</mark> methods will behave normally.
    &nbsp;
- Validation states (<mark>setValidity</mark>) and disabled states are managed automatically.

### Creating a Custom Form Element

Creating a custom form element is simple: extend <mark>FormElement</mark> and implement the rendering
    logic.

## Lifecycle Hooks

|Feature|Description|
|---|---|
|postCreation()|Called after the element is initialized. Registers to the parent Form.|
|postDestruction()|Called when the element is removed. Unregisters from the form.|
|formAssociatedCallback(form)|Invoked when linked to a native HTML form.|
|formDisabledCallback(disabled)|Called when the form or element is disabled.|
|onFormValidation(errors)|Receives and merges validation results.|
|validation()|Define your own validation logic here.|
|triggerChange(value)|Emits value change and updates the handler.|

## Key Features

- Two-way data binding between the UI and the FormHandler
- Integrated validation system with custom and shared rules
- Automatic registration inside forms
- Extendable: build any input component
- Smart error handling and ElementInternals integration
- Design freedom: full control over rendering and layout

## Example Integration

```ts
const loginForm = Form.Form.create({
    email: [Form.Validators.Required, Form.Validators.Email],
});
```

```html
<form-element :form="loginForm">
    <text-input name="email"></text-input>
    <button-element type="submit">Submit</button-element>
</form-element>
```

Each text-input updates and validates through the shared handler. No glue code required.

## Injectable form part (manual wiring)

If your input is used outside of the <mark>Form</mark> web component, you can still connect it to a <mark>FormHandler</mark> by injecting the form part directly. FormElement exposes an <mark>form property</mark> of type <mark>InternalFormPart&lt;T&gt;</mark> that you can set to link the element with the <mark>FormHandler's</mark> field.

When a <mark>form</mark> is injected:

- The element registers itself into the <mark>InternalFormPart</mark> (<mark>register</mark>) so the handler knows about it.
- The element subscribes to <mark>onValueChange</mark> and <mark>onValidation</mark> callbacks from the part.
- Value and error synchronization work the same way as when the element is registered via the <mark>Form</mark> container.

If your framework templating supports binding (example follows AventusJS syntax), you can bind the element directly to the FormHandler part:

```ts
const loginForm = Aventus.Form.Form.create({
  email: [Aventus.Form.Validators.Required, Aventus.Form.Validators.Email],
});
```

```html
<div>
  <!-- declarative injection of the email form part -->
  <text-input name="email" :form="loginForm.parts.email"></text-input>
</div>
```

After assignment input will:

- receive the current value (onValueChange → refreshValueFromForm)
- receive validation callbacks (onFormValidation)
- push value changes back to loginForm.item when triggerChange() is called

Manual wiring is useful when:

- You need to place inputs outside a &lt;form&gt; container (e.g. component composition, portal, popovers).
- You want fine-grained control over which elements are bound to which field.
- You build dynamic forms where fields are created programmatically.

## Summary

<mark>FormElement</mark> is the bridge between visual components and logical form management. It encapsulates:

- Value and error synchronization
- Form registration
- Validation behavior
- Native browser integration

It's the building block for all input components in Aventus : logic-driven, design-free, and extensible by design.

---
# UI - Col / Row

The Layout module provides a lightweight and responsive 12-column grid system based on two Web Components:
    &lt;av-row&gt; and &lt;av-col&gt;.

It’s inspired by modern grid frameworks like Bootstrap or Tailwind but designed to be framework-agnostic,
    flexbox-based, and natively responsive thanks to container queries.

## Core Concept

The grid layout is composed of:

- &lt;av-row&gt;: defines a row container (a flex context with container sizing).
- &lt;av-col&gt;: defines a column inside the row, with a width ranging from 1 to 12.

```html
<av-row>
    <av-col size="6">Column 1</av-col>
    <av-col size="6">Column 2</av-col>
</av-row>
```

Each column will automatically wrap to the next line when there’s not enough horizontal space.

## Col Component

|Attribute|Type|Description|
|---|---|---|
|size|0-12|Column width over 12 columns.|
|size_xs, size_sm, size_md, size_lg, size_xl|0-12|Responsive width for each breakpoint.|
|offset|0-12|Adds a left offset (empty space before the column).|
|offset_right|0-12|Adds a right offset (empty space after the column).|
|center|boolean|Centers the column's content horizontally.|
|use_container|boolean|Enables container query mode for local responsiveness.|

### Basic Example

```html
<av-row>
    <av-col size="12" size_md="6" size_lg="4">
        Responsive column
    </av-col>
</av-row>
```

Behavior:

- XS (mobile) → full width (12/12)
- MD (≥720px) → half width (6/12)
- LG (≥960px) → one-third width (4/12)

### Breakpoints

The grid supports five responsive breakpoints:

|Label|Min width|Description|
|---|---|---|
|xs|300px|Extra small|
|sm|540px|Small|
|md|720px|Medium|
|lg|960px|Large|
|xl|1140px|Extra large|

Each label can be used in size, offset, and offset-right attributes.

### Offsets & Centering

Offsets are useful to create proportional spacing in your layout:

```html
<av-row>
    <av-col size="4" center offset="2">Offset by 2</av-col>
    <av-col size="4" center offset_right="2">Offset to the right</av-col>
</av-row>
```

To center content horizontally inside a column:

```html
<av-row>
    <av-col size="6" center>Centered content</av-col>
</av-row>
```

### Container Queries vs Media Queries

The grid can adapt using two distinct responsive modes:

|Mode|Description|Activation|
|---|---|---|
|Media Queries|Reacts to the viewport width.|Default (use_container = false)|
|Container Queries|Reacts to the width of its parent &lt;av-row&gt;.|Set use_container on &lt;av-col&gt; or globally via config|

Local container example

```html
<av-row>
    <av-col use_container size_xs="12" size_md="6" size_lg="4">
        Responsive to its container width
    </av-col>
</av-row>
```

You can enable container query mode globally for all columns:

```ts
Layout.Col.configure({
    use_container: true
});
```

All &lt;av-col&gt; components will then behave responsively based on their container width.

### CSS Variables

You can customize spacing easily using CSS variables:

|Variable|Description|Default|
|---|---|---|
|--col-padding|Internal padding of a column|8px|
|--col-gap|Default horizontal and vertical gap|0px|
|--col-gap-x|Horizontal gap, overriding --col-gap|--col-gap|
|--col-gap-y|Vertical gap, overriding --col-gap|--col-gap|

## Row component

The &lt;av-row&gt; component:

- Creates the grid container (display: flex; flex-wrap: wrap;)
- Defines a container context (container-name: row; container-type: inline-size;)
- Manages independent horizontal and vertical gaps between columns.

### Technical Details

- Widths are computed dynamically with <mark>calc(100% / 12 * n)</mark> adjusted by the column gap.
- Columns with <mark>size="0"</mark> are hidden (<mark>display: none</mark>).
- The <mark>container-name: row</mark> enables container query behavior for <mark>av-col[use_container]</mark>.
- <mark>use_container</mark> mode allows nested responsive layouts that adapt to their parent width, not the entire viewport.

---
# UI - Collapse

The <mark>Collapse</mark> component provides a lightweight expandable/collapsible container that hides or reveals its content with a smooth grid-based transition.
It's designed to handle open/close logic automatically while letting you define your own layout and header appearance.

Unlike pre-styled accordions, this component handles only the logic and transitions, leaving full styling control to you.

## Concept

&lt;av-collapse&gt; consists of two main parts:

- A header slot (<mark>slot="header"</mark>) that acts as the clickable trigger.
- A content area that expands or collapses depending on the <mark>open</mark> state.

By default, clicking the header toggles the open state with an animated transition.

## Attributes

|Attribute|Type|Description|
|---|---|---|
|open|boolean|Whether the collapse is currently expanded.|
|no_animation|boolean|Disables the transition animation.|
|horizontal|boolean|Collapses columns horizontally instead of rows vertically.|
|reverse|boolean|Anchors collapsing content to the end side.|

## CSS Variables

You can customize the animation behavior using these CSS variables:

|Attribute|Description|Default value|
|---|---|---|
|--collapse-transition-duration|Duration of the open/close transition|0.5s|
|--collapse-transition-timing-function|Timing function for the transition|cubic-bezier(0.65, 0, 0.15, 1)|

## Example

```html filename=/index.html
<av-collapse>
    <div slot="header">Show details</div>
    <div>
        <p>This is the hidden content that appears when open.</p>$slotBlock$gt;
    </div>
</av-collapse>
```

---
# UI - Grid Helper

The <mark>av-grid-helper</mark> component provides an interactive visual layout grid with rulers, guides,
    and snapping.
    It's designed to help developers and designers align elements precisely within a web layout, similar to tools found
    in Figma, Photoshop, or web editors.

## Concept

<mark>av-grid-helper</mark> overlays your interface with rulers, a customizable grid, and draggable
    guides.
    It can be toggled on or off, locked to prevent editing, and remembers guide positions between sessions (using <mark>localStorage</mark>).

The component can show:

- Horizontal and vertical rulers (with custom units)
- A configurable grid (columns and rows)
- Draggable guide lines (with magnetic snapping)
- Keyboard shortcuts for quick control

## Example

```html filename=/index.html
<div class="page">
    <av-grid-helper step="50" step_big="200" col_width="50" row_height="50" magnetic="5" lock="false"></av-grid-helper>
</div>
```

## Features

- 
        &nbsp; **Customizable Units : ** 
        &nbsp;Supports multiple measurement units: px, rem, cm, mm, in, and pt.
    &nbsp;
- 
        &nbsp; **Smart Grid Rendering : ** 
        &nbsp;Automatically calculates the number of rows and columns based on container size and settings.
    &nbsp;
- 
        &nbsp; **Rulers : ** 
        &nbsp;Displays rulers on the top and left with configurable step sizes and major ticks.
    &nbsp;
- 
        &nbsp; **Draggable Guides : ** 
        &nbsp;Drag from a ruler to create a guide. Double-click on a ruler to add a guide at a specific position.
    &nbsp;
- 
        &nbsp; **Magnetic Snapping : ** 
        &nbsp;Guides snap to grid steps if the pointer is close enough (controlled by the magnetic property).
    &nbsp;
- 
        &nbsp; **Keyboard Shortcuts : ** 
        &nbsp;Control visibility and locking with keyboard combinations.
    &nbsp;
- 
        &nbsp; **Persistent Guides : ** 
        &nbsp;Saves and restores guide positions using localStorage.
    &nbsp;

## Attributes

|Attribute|Type|Description|
|---|---|---|
|unit|'px' | 'rem' | 'cm' | 'mm' | 'in' | 'pt'|Unit of measurement used for grid and rulers.|
|nb_col|number|Number of grid columns (auto-calculated if 0).|
|nb_row|number|Number of grid rows (auto-calculated if 0).|
|col_width|number|Column width (used if nb_col = 0).|
|row_height|number|Row height (used if nb_row = 0).|
|show_grid|boolean|Toggles visibility of the grid.|
|show_ruler|boolean|Toggles visibility of rulers.|
|show_guide|boolean|Toggles visibility of guide lines.|
|visible|boolean|Shows or hides the entire helper overlay.|
|lock|boolean|Locks/unlocks interactions with guides and rulers.|
|ruler_size|number|Thickness (height/width) of rulers.|
|step|number|Base step for ruler tick marks and snapping.|
|step_big|number|Distance between major ticks on rulers. If 0, uses step.|
|magnetic|number|Magnetic snapping distance in units. Guides snap to grid when within this threshold|

## Shortcuts

Press <mark>Ctrl + K</mark> and then press one of the following keys:

|Shortcut|Action|
|---|---|
|<mark>Ctrl + K</mark> &nbsp;<mark>V</mark>|Toggle visibility|
|<mark>Ctrl + K</mark> &nbsp;<mark>G</mark>|Toggle grid|
|<mark>Ctrl + K</mark> &nbsp;<mark>R</mark>|Toggle rulers|
|<mark>Ctrl + K</mark> &nbsp;<mark>J</mark>|Toggle guides|
|<mark>Ctrl + K</mark> &nbsp;<mark>L</mark>|Toggle lock state|

## Interactions

|Action|Behavior|
|---|---|
|Double-click a ruler|Prompts for a coordinate and adds a guide.|
|Click and drag from ruler|Creates and drags a new guide interactively.|
|Double-click a guide|Deletes the guide.|
|Lock mode enabled|Prevents guide creation or movement.|

## Methods

|Method|Description|
|---|---|
|inPx(value: number): number|Converts a unit-based value to pixels.|
|fromPx(valuePx: number): number|Converts pixels to the current unit.|
|createGuideFromLeft(left: number)|Creates a vertical guide at a given position.|
|createGuideFromTop(top: number)|Creates a horizontal guide at a given position.|

## CSS Variables

|Variable|Default|Description|
|---|---|---|
|--ruler-color|white|Color of ruler background.|

## Lock Button

Located in the top-left corner, this toggle lets you enable or disable editing of guides and rulers.

- Open Lock Icon : Guides can be moved or created.
- Closed Lock Icon : Grid and guides are locked.

## Persistence

GridHelper saves its guide positions automatically in <mark>localStorage</mark>.
Each instance uses its <mark>id</mark> as a storage key (<mark>grid-helper</mark> by default).
Reloading the page restores the same guide layout.

## Developer Notes

- Use it in development environments to help with layout alignment.
- Not recommended for production UI display.
- Guides are draggable and magnetic for precision alignment.

---
# UI - Image

The <mark>av-img</mark> component is an advanced image element that supports raster and SVG images,
    dynamic resizing, display modes (stretch, contains, cover), and optional caching.

It replaces the standard <mark>&lt;img&gt;</mark> tag when you need consistent, reactive sizing or when
    you want to embed and colorize SVGs directly.

## Concept

<mark>av-img</mark> manages the rendering and scaling of images inside flexible containers. It
    automatically adjusts its internal image or SVG to match the container's size and the selected display mode.

It supports:

- Automatic aspect ratio calculation
- SVG inline loading with color control
- Optional caching via base64 encoding
- Dynamic resizing with ResizeObserver

```html
<av-img src="/assets/example.jpg" mode="cover"></av-img>
```

## Attributes

|Attribute|Type|Description|
|---|---|---|
|src|string|Path or URL of the image (supports .svg).|
|mode|'stretch' | 'contains' | 'cover'|Defines how the image fits inside the container. Default: "contains".|
|cache|boolean|If true, loads the image as a Base64 string for faster access and offline             availability.|

## Modes

|Mode|Description|Behavior|
|---|---|---|
|stretch|Fills the entire container regardless of aspect ratio.|May distort the image.|
|contains|Scales the image to fit within the container while maintaining aspect ratio.|No cropping; may leave empty space.|
|cover|Scales the image to completely fill the container while maintaining aspect ratio.|May crop part of the image.|

```html
<av-img src="/photos/banner.svg" mode="cover"></av-img>
<av-img src="/photos/logo.svg" mode="contains"></av-img>
```

## SVG Support

If the src ends with .svg, the file is loaded inline, allowing you to style or animate it using CSS variables.

```html
<av-img src="/icons/mail.svg"></av-img>
```

You can override colors directly via CSS variables:

|Variable|Description|Default|
|---|---|---|
|--img-color|General SVG color base|none|
|--img-stroke-color|Stroke color for SVG lines|var(--img-color)|
|--img-fill-color|Fill color for SVG lines|var(--img-color)|
|--img-color-transition|Transition for color changes|none|

This allows theme-based or hover-driven color changes for inline SVGs.

## Caching

If the cache attribute is set, <mark>av-img</mark> uses the <mark>Aventus ResourceLoader</mark>
    to load and convert the image into a Base64 string.

This is useful for:

- Avoiding multiple network requests for frequently used images
- Faster rendering of static assets

```html
<av-img src="/logos/company.png" cache></av-img>
```

---
# UI - Scrollable

<mark>av-scrollable</mark> provides horizontal and vertical scrolling with custom scrollbars. It supports floating and automatically hidden scrollbars, mouse dragging, a flex content layout, and a <mark>zoom</mark> property.

For momentum scrolling, pinch zoom, percent-based scrolling, and the <mark>autoScroll*</mark> methods, see Advanced Scrollable.

## Example

```html filename=/index.html
<av-scrollable x_scroll y_scroll mouse_drag>
    <div style="width: 2000px;
    height: 1500px;
    background-image: linear-gradient(to bottom, transparent 50%, #28487d 50%),  linear-gradient(to right, #617ca2 50%, #28487d 50%);
    background-size: 10px 10px, 10px 10px;">
        Large content here
    </div>
</av-scrollable>
```

## Attributes and properties

|Name|Behavior|
|---|---|
|x_scroll|Enable horizontal scrolling.|
|y_scroll|Enable vertical scrolling; enabled by default.|
|floating_scroll|Place scrollbars over the content.|
|auto_hide|Hide scrollbars when inactive.|
|mouse_drag|Allow dragging the content with the mouse.|
|disable|Disable scrolling interaction.|
|flex|Use a vertical flex layout for the content.|
|zoom|Scale the content; defaults to 1.|

## JavaScript API

Read <mark>x</mark>, <mark>y</mark>, <mark>xMax</mark>, and <mark>yMax</mark> for the current position and bounds. Call <mark>scrollX(x)</mark> or <mark>scrollY(y)</mark> to scroll programmatically. Subscribe to <mark>onScrollChange</mark> and <mark>onZoomChange</mark> for updates.

---
# UI - Advanced Scrollable

The <mark>av-advanced-scrollable</mark> component provides a custom, fully-featured scrollable container with
    support for:

- Horizontal and vertical scrolling
- Smooth momentum-based scrolling
- Floating or static scrollbars
- Auto-hide scrollbars
- Mouse dragging
- Touch and pinch-zoom support
- Zooming on a point
- Programmatic scrolling

It's ideal for applications that need precise control over scroll behavior, including drag-to-scroll, zoomable
    content, and custom scrollbars.

## Concept

<mark>av-advanced-scrollable</mark> wraps content in a scrollable container with custom scrollbars. Unlike native
    scroll elements, it supports momentum, pinch zoom, and dragging, with fully customizable styling.

Example:

```html filename=/index.html
<av-advanced-scrollable x_scroll y_scroll mouse_drag>
    <div style="width: 2000px;
    height: 1500px;
    background-image: linear-gradient(to bottom, transparent 50%, #28487d 50%),  linear-gradient(to right, #617ca2 50%, #28487d 50%);
    background-size: 10px 10px, 10px 10px;">
        Large content here
    </div>
</av-advanced-scrollable>
```

## Attributes

|Attribute|Type|Description|
|---|---|---|
|x_scroll|boolean|Enable horizontal scrolling. Default: false.|
|y_scroll|boolean|Enable vertical scrolling. Default: true. |
|floating_scroll|boolean|If true, scrollbars float over content instead of pushing it. |
|auto_hide|boolean|Scrollbars hide automatically when not in use.|
|disable|boolean|Disables all user interaction with scrolling.|
|flex|boolean|Uses a vertical flex layout internally so child content can fill the remaining height.|
|mouse_drag|boolean|Enables dragging content with a mouse.|
|pinch|boolean|Enables pinch-to-zoom on touch devices.|
|zoom|number|Current zoom level of the content. Default: 1. |
|min_zoom|number|Minimum allowed zoom level. Default: 1. |
|max_zoom|number|Maximum allowed zoom level. Default: unlimited. |
|break|number|Easing factor for momentum. Default: 0.1. |

## Features

### 1. Momentum-based scrolling

<mark>av-advanced-scrollable</mark> applies smooth momentum when dragging or using the mouse wheel. The break
    attribute controls easing.

### 2. Custom scrollbars

- Scrollbars are separate DOM elements, styled with CSS variables.
- Floating scrollbars can auto-hide after inactivity.
- Supports drag-to-scroll directly on the scrollbars.

### 3. Pinch-to-zoom

- Works on touch devices with two fingers.
- Zoom is centered on a point for precise control.
- Zoom boundaries respect min_zoom and max_zoom.
- Triggers onZoomChange callback when zoom changes.

### 4. Mouse dragging

- Drag content with mouse if mouse_drag is enabled.
- Momentum continues after release for a natural feel.

## Callbacks

|Callback|Description|
|---|---|
|onScrollChange|Triggered whenever the scroll position changes. Returns (x: number, y: number).|
|onZoomChange|Triggered when the zoom level changes. Returns the new zoom number.|

## Methods

|Method|Description|
|---|---|
|scrollToPosition(x, y)|Scrolls to specific pixel positions.|
|scrollX(x)|Scroll horizontally to pixel position.|
|scrollXPercent(percent)|Scroll horizontally as a percentage of total width.|
|scrollY(y)|Scroll vertically to pixel position.|
|scrollYPercent(percent)|Scroll vertically as a percentage of total height.|
|zoomOnPoint(clientX, clientY, newZoom)|Zoom centered at a screen point (clientX, clientY) to a specific zoom value.|
|autoScrollRight(percent)|Automatically scrolls right at a speed relative to content size.|
|stopAutoScrollRight()|Stops auto-scroll right.|
|autoScrollLeft(percent)|Automatically scrolls left.|
|stopAutoScrollLeft()|Stops auto-scroll left.|
|autoScrollTop(percent)|Automatically scrolls up.|
|stopAutoScrollTop()|Stops auto-scroll up.|
|autoScrollBottom(percent)|Automatically scrolls down.|
|stopAutoScrollBottom()|Stops auto-scroll down.|

## CSS Variables

|Variable|Default|Description|
|---|---|---|
|--scrollbar-container-color|transparent|Background color of scrollbar container.|
|--scrollbar-color|#757575|Scrollbar color.|
|--scrollbar-active-color|#858585|Scrollbar color when active/dragged.|
|--scroller-width|6px|Width of scrollbar.|
|--scroller-top|3px|Top padding of horizontal scrollbar.|
|--scroller-bottom|3px|Bottom padding of horizontal scrollbar.|
|--scroller-left|3px|Left padding of vertical scrollbar.|
|--scroller-right|3px|Right padding of vertical scrollbar.|
|--scrollbar-content-padding|0|Padding inside content-wrapper.|
|--scrollbar-container-display|inline-block|Display type of content-wrapper.|

## Notes

- Scrollbars are automatically shown or hidden based on content size.
- <mark>disable</mark> temporarily locks scrolling and zooming.
- Pinch zoom uses DOMMatrix transformations for smooth and accurate scaling.
- Supports both pixel-based and percent-based scrolling.
- Works in combination with Aventus PressManager for unified pointer/touch handling.

---
# UI - Tabs System

The <mark>Tabs system</mark> provides a flexible structure for managing and displaying tabbed interfaces. It separates the logic of tab content, tab headers, and overall container behavior, allowing developers to easily customize the appearance and interaction model.

## Overview

The <mark>Tabs</mark> component manages a collection of <mark>Tab</mark> elements, each associated with a <mark>TabHeader</mark>.
It handles tab switching, active state management, and layout rendering.

Developers can extend the abstract classes <mark>Tabs</mark>, <mark>Tab</mark>, and <mark>TabHeader</mark> to define their own UI and behavior while keeping consistent tab logic.

## Example

```typescript filename=/Example/Example.wcl.avt
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods

    //#endregion

}
```

```css filename=/Example/Example.wcs.avt
:host {

}
```

```html filename=/Example/Example.wcv.avt
<example-tabs>
    <example-tab label="Page1" icon="home">
        <p>Page 1</p>
    </example-tab>
    <example-tab label="Page2">
        <p>Page 2</p>
    </example-tab>
    <example-tab label="Page3" count="3">
        <p>Page 3</p>
    </example-tab>
</example-tabs>
```

```typescript filename=/Tab/Tab.wcl.avt
import type { IconType } from "MaterialIcon:MaterialIcon.package.avt";

export class Tab extends Aventus.Layout.Tabs.Tab implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props
    @Property()
    public label: string = "";
    @Property()
    public count!: number;
    @Property()
    public icon?: IconType;
    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    /**
     * @inheritdoc
     */
    public override identifier(): string {
        return this.label;
    }

    //#endregion

}
```

```css filename=/Tab/Tab.wcs.avt
:host {
	width: 100%;
}
```

```html filename=/Tab/Tab.wcv.avt
<slot></slot>
```

```typescript filename=/TabHeader/TabHeader.wcl.avt
import type { Tab } from "../Tab/Tab.wcl.avt";

export class TabHeader extends Aventus.Layout.Tabs.TabHeader<Tab> implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @ViewElement()
    protected countEl!: HTMLSpanElement;
    @ViewElement()
    protected iconEl!: MaterialIcon.Icon;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    /**
     * @inheritdoc
     */
    public override render(): Aventus.Asyncable<void> {
        this.innerHTML = this.tab.label;
        if(this.tab.count) {
            this.countEl.innerHTML = this.tab.count + '';
        }
        if(this.tab.icon) {
            this.iconEl.icon = this.tab.icon;
        }
    }

    //#endregion

}
```

```css filename=/TabHeader/TabHeader.wcs.avt
:host {
	align-items: center;
	background: none;
	border: none;
	border-bottom: 2px solid transparent;
	color: #94a3b8;
	cursor: pointer;
	display: flex;
	font-size: 0.875rem;
	font-weight: 500;
	padding: 1rem 0.5rem;

	mi-icon {
		font-size: 1rem;
		margin-right: 0.5rem;
	}

	mi-icon[icon=""] {
		display: none;
	}

	.count {
		background-color: #334155;
		border-radius: 9999px;
		color: #cbd5e1;
		font-size: 0.75rem;
		margin-left: 0.5rem;
		padding: 0.125rem 0.5rem;
	}

	.count:empty {
		display: none;
	}
}

:host(:hover) {
	border-color: #334155;
	color: #cbd5e1;
}

:host([active]) {
	border-color: #e5540e;
	color: #e5540e;
}
```

```html filename=/TabHeader/TabHeader.wcv.avt
<mi-icon icon="" @element="iconEl"></mi-icon>
<span><slot></slot></span>
<span class="count" @element="countEl"></span>
```

```typescript filename=/Tabs/Tabs.wcl.avt
import type { Tab } from "../Tab/Tab.wcl.avt";
import { TabHeader } from "../TabHeader/TabHeader.wcl.avt";

export class Tabs extends Aventus.Layout.Tabs.Tabs<Tab, TabHeader> implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    /**
     * @inheritdoc
     */
    protected override defineTabHeader(): new (...args: any[]) => TabHeader {
        return TabHeader;
    }

    //#endregion

}
```

```css filename=/Tabs/Tabs.wcs.avt
:host {
	width: 100%;

	.header {
		border-bottom: 1px solid var(--border);
		display: flex;
		gap: 2rem;
		margin-top: 2rem;
	}

	.body {
		width: 100%;
	}
}
```

```html filename=/Tabs/Tabs.wcv.avt
<slot></slot>
```

## Tabs Class

<mark>Tabs&lt;T extends Tab, U extends TabHeader&lt;T&gt;&gt;</mark> is an abstract class that manages:

- the list of tabs and their headers
- which tab is currently active
- tab visibility and selection state

Developers must implement the <mark>defineTabHeader()</mark> method to specify which header component should be used.

Developers can also use the method <mark>setActive(tabHeader: TabHeader&lt;T&gt; | number | string): boolean</mark>
    to set the active tab by reference, index, or tab identifier. It returns false when no matching tab exists.

 **Behavior** 

- Tabs are hidden until selected.
- The first tab is automatically activated unless another one is marked as selected.
- The <mark>Tabs</mark> component controls both visual state and logical state (selected attribute).
- Adding, removing or reordering slotted tabs automatically updates their headers.

## Tab Class

<mark>Tab</mark> represents the  **content**  of a tab, and provides the connection point between tab data and its header. To implement a <mark>Tab</mark>, the method <mark>identifier() : string</mark> have to be implemented.

Once a tab is registered, <mark>loaded</mark> is set to true. When it is active,
    &nbsp;<mark>selected</mark> is set to true.

## TabHeader Class

<mark>TabHeader&lt;T extends Tab&gt;</mark> represents the clickable tab title associated with a <mark>Tab</mark>. It handles user interaction and manages synchronization between UI and logic.

The method <mark>render()</mark> must be implemented. The property <mark>tab : T</mark> is useful to get data from the <mark>Tab</mark> during rendering.

```ts
/**
 * @inheritdoc
 */
public override render(): Aventus.Asyncable<void> {
    this.innerHTML = this.tab.label;
}
```

When the tab is active, the attribute <mark>active</mark> is set to true.

## Lifecycle

- Tabs and their headers are initialized in <mark>postCreation()</mark>.
- Each Tab registers itself with a dynamically created <mark>TabHeader</mark>.
- The first tab (or the one marked as <mark>selected</mark>) becomes active.
- When a header is pressed, <mark>Tabs.setActive()</mark> hides the previous tab and shows the new one.

---
# UI - Modal

The <mark>Modal</mark> component provides a flexible framework for creating modal dialogs in Aventus
    applications.
    It supports promise-based resolution and rejection, allowing developers to use modals as asynchronous prompts that
    return data or cancellation results.

## Overview

ModalElement is an abstract base class designed to handle modal logic such as:

- showing and hiding modals
- resolving or rejecting user actions
- automatic closure via Escape key or click outside
- customizable options for behavior and rejection values

Developers should extend this class to create specific modal components (confirmation dialogs, forms, alerts, etc.).


The modal content receives <mark>role="dialog"</mark> and <mark>aria-modal="true"</mark>
    automatically. Its stacking level can be customized with the <mark>--modal-z-index</mark> CSS variable
    (default: 60).

## Example

```typescript filename=/Example/Example.wcl.avt
import { Modal } from "../Modal/Modal.wcl.avt";

export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @Watch()
    public txt?: string;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods

    /**
     *
     */
    protected async openModal() {
        const confirm = new Modal();
        confirm.question = "Do you accept?"
        const isAccepted = await confirm.show();
        if(isAccepted) {
			this.txt = "Accepted"
        }
		else {
			this.txt = "Refused"
		}
    }

    //#endregion

}
```

```css filename=/Example/Example.wcs.avt
:host {

}
```

```html filename=/Example/Example.wcv.avt
<button @press="openModal">Open modal</button>
<div>Result is : {{ this.txt }}</div>
```

```typescript filename=/Modal/Modal.wcl.avt
import { ModalElement } from "Aventus@UI:Aventus.Modal.package.avt";

export class Modal extends ModalElement<boolean> implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @Watch()
    public question?: string;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    /**
     * @inheritdoc
     */
    public override configure(): Aventus.Modal.ModalOptions<boolean> {
        return {
            closeWithClick: false,
            closeWithEsc: false,
        };
    }


    /**
     *
     */
    protected accept() {
        this.resolve(true);
    }


    //#endregion

}
```

```css filename=/Modal/Modal.wcs.avt
:host {
	align-items: center;
	background: rgba(0, 0, 0, 0.7);
	display: flex;
	inset: 0;
	justify-content: center;
	position: fixed;
	z-index: 60;
	font-size: 16px;

	.modal {
		background-color: var(--secondary-color);
		border-radius: 12px;
		box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
		max-width: 500px;
		padding: 24px;
		position: relative;
		text-align: left;
		transform: translateZ(0);
		transition: all 0.2s ease-in-out;
		width: 100%;

		.modal-header {
			align-items: flex-start;
			display: flex;
			justify-content: space-between;

			.modal-title {
				color: #ffffff;
				line-height: 24px;
				margin: 0;
			}

			.close {
				cursor: pointer;
				margin-right: -12px;
				margin-top: -12px;
			}
		}

		.modal-body {
			color: var(--color-light);
			margin-top: 16px;

			::slotted(p) {
				margin-bottom: 16px;
			}
		}

		.footer {
			display: flex;
			gap: 8px;
			justify-content: flex-end;
			margin-top: 16px;

			av-button {
				font-size: 14px;
			}
		}
	}

}
```

```html filename=/Modal/Modal.wcv.avt
<div class="modal-header">
    <h3 class="modal-title">Confirm</h3>
    <mi-icon icon="close" class="close" @press="reject"></mi-icon>
</div>
<div class="modal-body">{{this.question}}</div>
<div class="footer">
    <av-button @press="reject">No</av-button>
    <av-button @press="accept">Yes</av-button>
</div>
```

## ModalElement Class

ModalElement&lt;T, U extends ModalOptions&lt;T&gt; = ModalOptions&lt;T&gt;&gt; defines the core functionality for
    modals.
    It manages showing, closing, resolving, and rejecting, using built-in support for keyboard and click interactions.


|Method|Description|
|---|---|
|show(element?: Element): Promise&lt;T | null&gt;|Displays the modal and returns a Promise that resolves when the modal is either resolved or rejected.|
|resolve(response: T, no_close?: boolean)|Resolves the modal with a given response value. If no_close=true, the modal remains open after resolving.|
|reject(no_close?: boolean)|Rejects the modal with the defined rejectValue. If no_close=true, the modal remains open after rejecting.|

Developpers can also add custom options to modal by providing an interface that extends from <mark>ModalOptions</mark>.

## ModalOptions Interface

Defines the modal's configurable behaviors.

|Option|Type|Default|Description|
|---|---|---|---|
|closeWithEsc|boolean|true|Whether the modal should close when pressing the Escape key.|
|closeWithClick|boolean|true|Whether clicking outside the modal should close it.|
|rejectValue|T | null|null|The value returned when the modal is dismissed or canceled.|

Developers can extends this interface to allow more options. For example if the modal has the close icon that is
    configurable.

```ts
interface ModalOptions<T = any> =  Aventus.Modal.ModalOptions<T> & {
    closeIcon?: boolean
}

export abstract class Modal extends ModalElement<boolean, ModalOptions<boolean>> implements Aventus.DefaultComponent {

}
```

## Static Configuration

You can globally configure default modal behavior:

```ts
Aventus.Modal.ModalElement.configure({
    closeWithClick: false,
    rejectValue: null
});
```

---
# UI - Toast

The <mark>Toast</mark> system provides a way to display small, temporary notifications in your Aventus
    application.
    It is composed of two main parts:

- <mark>ToastElement</mark>: the base class for creating custom toast notifications
- <mark>ToastManager</mark>: a global controller that manages positioning, stacking, and lifecycle of
        toasts

Toasts can appear in multiple positions on the screen, close automatically after a delay, or stay visible
    indefinitely.

## Example

## ToastElement Class

ToastElement&lt;T extends ToastOptions = ToastOptions&gt; is the base class used to define how individual toast
    notifications behave and appear.
    It handles visibility, automatic hiding after a timeout, and transitions.

### Methods

|Method|Description|
|---|---|
|static add(options: ToastOptions): Promise&lt;boolean&gt;|Displays a new toast.|
|setOptions(options: T): Asyncable&lt;void&gt;|Must be implemented to define how your toast handles the provided options (e.g., set text, color, or             icon).|
|close()|Manually closes the toast and removes it from the DOM.|

## ToastManager Class

<mark>ToastManager</mark> handles displaying, positioning, and stacking toasts on the screen.
    It ensures that multiple notifications do not overlap and automatically manages their lifecycle.

### Global Configuration

You can define global defaults using:

```ts
Toast.ToastManager.configure({
    defaultToast: MyToast,
    defaultPosition: 'top right',
    defaultDelay: 4000,
    heightLimitPercent: 90,
    gap: 12,
});
```

 **ToastManagerOptions** 

|Option|Type|Description|
|---|---|---|
|defaultToast|Constructor&lt;ToastElement&gt;|Defines the default toast class used when none is provided.|
|defaultToastManager|Constructor&lt;ToastManager&gt;|Allows using a custom toast manager implementation.|
|defaultPosition|ToastPosition|Default screen position for new toasts. Default : 'top right'|
|defaultDelay|number|Default auto-close delay for toasts.. Default : 5000|
|heightLimitPercent|number|Max vertical space (in % of viewport height) that toasts can occupy. Default: 100|
|gap|number|Space in pixels between stacked toasts. Default: 10|

## Behavior

- The toast slides in at the specified position.
- Automatically disappears after delay milliseconds.
- If delay = -1, it stays visible until manually closed.
- Stack recalculation waits for active CSS transitions before measuring toast sizes.

---
# UI - Link

The <mark>Link</mark> component provides a declarative way to navigate between application routes.
    It integrates with the Aventus Router System, automatically handling navigation, activation state, and style updates
    for active routes.

## Overview

The <mark>Link</mark> component acts similarly to a standard HTML <mark>&lt;a&gt;</mark>
    element, but instead of performing a full page reload, it uses Aventus internal router to activate the target route.


It also automatically applies the <mark>active</mark> class when the linked route (or pattern) is
    currently active, allowing developers to style active links easily.

```html
<av-link to="home">Home</av-link>
<av-link to="profile">Profile</av-link>
<av-link to="settings" active_pattern="settings*">Settings</av-link>
```

When the current route matches <mark>settings*</mark>, the Settings link automatically gets the <mark>active</mark> class.

## Navigation

When the user clicks or presses the link:

- The component prevents the default browser navigation.
- It resolves the route using <mark>RouterStateManager</mark>.
- If <mark>to</mark> starts with <mark>"."</mark>, it is treated as a relative route.
- It then activates the target state using: <mark>Aventus.State.activate(to, Aventus.Instance.get(RouterStateManager));</mark>

## Active State Handling

The link automatically subscribes to route changes through <mark>RouterStateManager</mark>.
When the current state matches its <mark>to</mark> value or <mark>active_pattern</mark>, the component:

- Adds the CSS class <mark>active</mark>
- Triggers the <mark>onActiveChange</mark> callback with <mark>true</mark>

When it becomes inactive:

- Removes the <mark>active</mark> class
- riggers <mark>onActiveChange</mark> with <mark>false</mark>

---
# UI - Page

The <mark>Page</mark> class is the foundational building block for every navigable screen in an Aventus application.
Each route in your app corresponds to a Page component, which defines its content, metadata, and lifecycle behavior.

## Overview

A <mark>Page</mark> is automatically managed by the <mark>Router</mark> component:

- When a route is activated, its associated <mark>Page</mark> is shown.
- When deactivated, it is hidden or destroyed (depending on configuration).
- The Router updates the browser's metadata (<mark>title</mark>, <mark>description</mark>, <mark>keywords</mark>) based on the page's configuration.

You can extend <mark>Page</mark> to create your own screens, and optionally override lifecycle methods like <mark>onShow</mark>, <mark>onHide</mark>, and <mark>isAllowed</mark>.

```ts
import { Page } from "Aventus@UI:Aventus.Navigation.package.avt";

export class HomePage extends Page {
	public override async configure() {
		return {
			title: "Home - Aventus App",
			description: "Welcome to the home page of the Aventus demo application.",
			keywords: ["home", "aventus", "demo"],
		};
	}

	public override onShow() {
		console.log("HomePage is now visible!");
	}

	public override onHide() {
		console.log("HomePage was hidden!");
	}
}
```

```html
<div>
	<h1>Welcome!</h1>
	<p>This is the home page content.</p>
</div>
```

## Properties

|Property|Type|Description|
|---|---|---|
|visible|boolean|Automatically managed by the router. When set to <mark>true</mark>, the page becomes visible.|
|router|Router|Reference to the router managing this page.|
|state|State|Holds the current state object for the route, if any.|

The visible property is reactive when its value changes:

- If true, onShow() is called
- If false, onHide() is called

Calling <mark>show()</mark> on a page that is already visible still calls <mark>onShow()</mark>,
    which allows route data to be refreshed without hiding the page first.

## Lifecycle Methods

|Method|Description|
|---|---|
|configure()|Abstract. Must return a PageConfig object defining metadata and optional destruction rules.|
|show(state?: State)|Called by the router when the page is activated. Sets visible = true.|
|hide()|Called by the router when the page is deactivated. Sets visible = false.|
|onShow()|Hook executed when the page becomes visible. Use it to start animations, load data, etc.|
|onHide()|Hook executed when the page is hidden. Use it to stop timers, clean up listeners, etc.|
|isAllowed(state, pattern, router)|Optional access control. Return true to allow, false to block, or a redirect path/state.|
|loadData(state)|Optional loading data function. Return true if evrything is ok, false to block, or a redirect path/state.|

## Access Control Example

You can control page visibility by overriding <mark>isAllowed</mark>:

```ts
public override async isAllowed(state: State, pattern: string, router: Router) {
	const isAuthenticated = await AuthService.isLoggedIn();
	if (!isAuthenticated) {
		// Redirect unauthorized users to /login
		return "/login";
	}
	return true;
}
```

If the method returns:

- true → The page is displayed.
- false → The navigation is canceled.
- string or State → The router redirects to the given route or state.

## Loading Data Example

You can load data for the page by overriding <mark>loadData</mark>:

```ts
public override async loadData(state: State) {
	const data = await api.loadData() as Data | null;
	if (!data) {
		return "/home";
	}
    this.appData = data;
	return true;
}
```

If the method returns:

- true → The page is displayed.
- false → The navigation is canceled.
- string or State → The router redirects to the given route or state.

## Page Configuration

Each page defines its configuration via the <mark>configure()</mark> method.

```ts
public async configure(): Promise<PageConfig> {
	return {
		title: "Dashboard", // Browser tab title for this page.
		description: "User dashboard overview", // Meta description for SEO.
		keywords: ["dashboard", "user", "aventus"], // Meta keywords for SEO.
		destroy: false, // If true, the page is destroyed (removed from the DOM) when hidden.
	};
}
```

---
# UI - Router Component

The <mark>Router</mark> component provides the core navigation system for Aventus-based applications.
It defines, registers, and manages application routes, dynamically loads and displays pages, and keeps browser navigation in sync with the active state.

## Overview

The Router acts as a central route controller, coordinating between the app's state manager and the rendered pages.

It supports both synchronous and asynchronous route loading, custom 404 handling, URL synchronization, and smooth transitions between pages.

It must be extended to define your own route structure and optionally override its behavior.

## Example

```ts
import { Router } from "Aventus@UI:Aventus.Navigation.package.avt";
import { HomePage } from "../pages/Home.page.avt";
import { AboutPage } from "../pages/About.page.avt";
import { NotFoundPage } from "../pages/NotFound.page.avt";
export class AppRouter extends Router {
	protected async defineRoutes(): Promise<void> {
		this.addRoute("/", HomePage);
		this.addRoute("/about", AboutPage);
		this.addRouteAsync({
			route: "/contact",
			scriptUrl: "/pages/contact.js",
			render: () => ContactPage,
		});
	}
	protected override error404() {
		return NotFoundPage;
	}
}
```

```html
<app-router></app-router>
```

## Template

```html
<slot name="before"></slot>
<main class="content" @element="contentEl"></main>
<slot name="after"></slot>
```

This structure allows you to insert additional UI before or after the router content, such as headers, sidebars, or footers.

## Configuration

You can globally configure the Router's default behavior:

```ts
Router.configure({
	page404: NotFoundPage,
	destroyPage: true,
});
```

## Defining Routes

Routes are defined in the abstract <mark>defineRoutes()</mark> method. It may be asynchronous; the router
    waits for it before registering routes and activating the initial URL.

```ts
this.addRoute("/home", HomePage);
this.addRouteAsync({
    route: "/settings",
    scriptUrl: "/pages/settings.js",
    render: () => SettingsPage,
});
```

Async routes are useful for lazy-loading parts of your application.

## Page Lifecycle

Each page is a component extending <mark>Page</mark>.
When a route becomes active, the Router:

- Instantiates or reuses the corresponding <mark>Page</mark> class.
- Calls <mark>isAllowed()</mark> on the page to check access control.
- Calls <mark>loadData(currentState, routePath)</mark> before displaying it.
- Invokes <mark>show()</mark> on the new page and <mark>hide()</mark> on the previous one.
- Updates document metadata (<mark>title</mark>, <mark>description</mark>, <mark>keywords</mark>).
- Synchronizes the browser URL and navigation history.

Inactive pages are either removed or kept in memory depending on <mark>destroyPage</mark>.

The boolean <mark>initializing</mark> attribute remains true until route registration and initial
    navigation are complete, making it suitable for an initial loading state.

## 404 Handling

If no route matches the current state, the Router:

- Instantiates the <mark>page404</mark> page (default or overridden)
- Displays it in the <mark>contentEl</mark>
- Optionally updates the URL to a "not found" path.

You can customize 404 logic by overriding error404():

```ts
protected override error404(): new () => Page {
	return CustomNotFoundPage;
}
```

## Navigation Control

### Programmatic Navigation

You can navigate to a new route manually:

```ts
await this.navigate("/dashboard");
```

Replace the current history entry:

```ts
await this.navigate("/login", { replace: true });
```

### Access Control

Override <mark>canChangeState()</mark> to control route transitions:

```ts
protected override async canChangeState(newState: Aventus.State): Promise<boolean> {
	const isAuthenticated = await AuthService.isLoggedIn();
	return isAuthenticated;
}
```

### Before/After Page Change Hooks

```ts
protected override onNewPage(oldUrl: string, oldPage: Page | undefined, newUrl: string, newPage: Page) {
	console.log("Navigated from", oldUrl, "to", newUrl);
}
```

## URL Binding

By default, the Router binds to the browser URL:

- Keeps window.location in sync.
- Supports back/forward navigation using popstate.

You can disable this by overriding:

```ts
protected override bindToUrl(): boolean {
	return false;
}
```

Or set a fallback:

```ts
protected override defaultUrl(): string {
	return "/home";
}
```

## Methods

|Method|Description|
|---|---|
|addRoute(route: string, elementCtr: new () =&gt; Page)|Registers a synchronous route.|
|addRouteAsync(options: RouteAsyncOption)|Registers a lazy-loaded route.|
|navigate(state: string | Aventus.State, options?: { replace: boolean })|Navigates to a specific route.|
|getSlugs(path?: string)|Returns parameters for the supplied path, or for the current route when omitted.|
|bindToUrl()|Determines whether navigation updates the browser URL.|
|shouldDestroyFrame(page: Page)|Determines if a page should be destroyed when hidden.|

---
# UI - Process

The <mark>Process</mark> class is a lightweight helper designed to standardize API or asynchronous
    operation handling — especially when using Aventus <mark>ResultWithError</mark> or <mark>VoidWithError</mark> patterns.

It provides a unified way to:

- Execute async operations that return an Aventus.ResultWithError or Aventus.VoidWithError.
- Automatically handle and display errors via a configurable global handler.
- Extract the success result when no errors occur.

## Overview

When working with backend routes, forms, or other async processes in Aventus, many functions return structured
    results containing both <mark>value</mark> and <mark>errors</mark>.
    The <mark>Process</mark> utility simplifies how you handle these cases by centralizing error parsing and
    handling.

## Example

```ts
// Sets up a global error handler that is automatically invoked whenever an operation fails.
Process.configure({
    handleErrors: (msg, errors) => {
        Alert.open({
            title: "Execution error",
            content: msg,
        });
    }
});
// Use the utility to handle an async route call
async function login() {
	const result = await Process.execute(new AuthRoute().login({
		email: "user@test.com",
		password: "secret"
	}));
	if (result) {
		console.log("Login success:", result);
	} else {
		console.log("Login failed — errors were handled globally");
	}
}
```

For <mark>ResultWithError</mark>, <mark>execute</mark> and
    &nbsp;<mark>parseErrors</mark> return the result value. For <mark>VoidWithError</mark>, they return
    the success boolean. Both return <mark>undefined</mark> after handled errors.

---
# UI - Shortcut

The <mark>ShortcutManager</mark> class provides a global keyboard shortcut management system.
It allows developers to register and handle keyboard combinations (shortcuts) with customizable behavior such as:

- Replacing temporary shortcuts,
- Automatically preventing default browser actions,
- Handling async callbacks,
- And restoring previous shortcut states when temporary ones are removed.

## Overview

Keyboard shortcuts are essential for improving productivity and providing advanced user interactions in web applications.

This utility lets you easily bind custom key combinations (like <mark>Ctrl+S</mark> or <mark>Alt+Enter</mark>) to specific actions while handling complex states such as modifier keys and overlapping combinations.

## Example

```ts
// Register a simple shortcut: Ctrl+S
ShortcutManager.subscribe([SpecialTouch.Control, "s"], () => console.log("saving"));
// Register a temporary shortcut that replaces the existing Ctrl+S
const overriding = () => {
    console.log("Temporary override for Ctrl+S");
}
ShortcutManager.subscribe([SpecialTouch.Control, "s"], overriding, { replaceTemp: true });
// Later, remove the temporary shortcut and restore the previous one
ShortcutManager.unsubscribe([SpecialTouch.Control, "s"], overriding);
```

## Internal Behavior

The combination order doesn't matter. <mark>Ctrl+S</mark>, <mark>S+Ctrl</mark>, or <mark>s+Control</mark> are treated identically.

Printable keys can be registered directly as strings. Use the literal <mark>" "</mark> to register the
space bar:

```ts
ShortcutManager.subscribe(" ", () => console.log("Space pressed"));
```

Certain browser shortcuts (like <mark>Ctrl+P</mark> or <mark>Ctrl+S</mark>) are automatically prevented to avoid conflicts. This can be useful in single-page applications (SPAs) to prevent the browser from executing system actions like Print, Open File, or Save Page. You can customize this behavior with :

```ts
ShortcutManager.setAutoPrevents([[SpecialTouch.Control, "s"], [SpecialTouch.Control, "p"]]);
```

## Conditional Shortcuts

In some cases, you may want a shortcut to be conditionally active. For example, only when a certain modal is open, a form is focused, or the user is in edit mode.

The <mark>ShortcutManager</mark> makes this easy: You can return <mark>false</mark> from a shortcut callback to indicate that <mark>no action</mark> was performed, and that the shortcut should be considered "ignored" in this context.

```ts
let isModalOpen = false;

ShortcutManager.subscribe(
  [SpecialTouch.Control, "Enter"],
  () => {
    if (!isModalOpen) {
      // Do nothing — signal that shortcut did not apply
      return false;
    }

    console.log("Submitting modal form...");
    submitModalForm();
  }
);
```

## Temporary Shortcut Replacement

The <mark>replaceTemp</mark> option lets you temporarily override a shortcut without losing the original.

```ts
const saveShortcut = () => console.log("Save file");
const tempSave = () => console.log("Temporary override");

// Register base shortcut
ShortcutManager.subscribe([SpecialTouch.Control, "s"], saveShortcut);

// Temporarily replace
ShortcutManager.subscribe(
  [SpecialTouch.Control, "s"],
  tempSave,
  { replaceTemp: true }
);

// Later restore
ShortcutManager.unsubscribe([SpecialTouch.Control, "s"], tempSave);
// The original saveShortcut is automatically restored
```

---
# Advanced - Template

Because you will create some amazing components or patterns with Aventus, the framework includes a way to generate
    files based on templates. For example, when you create a project with Tailwind, all your webcomponents must inherit
    from a base component that contains the Tailwind style. This will be the example for this section.

## Setup for the example

First of all you need to create a new empty project with a component named Tailwind. This component will be the root
    for all others components.

```typescript filename=/Template/src/Tailwind/Tailwind.wcl.avt
/**
 * This class is the root for all components using tailwind
 */
export class Tailwind extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods

    //#endregion

}
```

```css filename=/Template/src/Tailwind/Tailwind.wcs.avt
:host {}
```

```html filename=/Template/src/Tailwind/Tailwind.wcv.avt
<slot></slot>
```

```json filename=/Template/aventus.conf.avt
{
	"module": "Tailwind",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [{
				"output": "./dist/Tailwind.js"
			}]
		}
	],
    "aliases": {
        "@":"./src" // using alias to always have the right root folder
    }
}
```

## Creating a template

You can create the following folder inside your workspace <mark>/.aventus/templates/</mark>. This is where
    all your
    templates will be stored. This folder must be at your workspace root, otherwise it will not work.

You can create a new folder named <mark>TailwindComponent</mark> inside ./aventus/templates/. and inside
    this new folder,
    you
    can add a file named <mark>template.avt.ts</mark>. This file define the logic for your template. You need
    to create a <mark>Template</mark> class inside the file

```ts filename=/Template/.aventus/templates/TailwindComponent/template.avt.ts
export class Template extends AventusTemplate {
    protected override meta(): TemplateInfo {
        return {
            name: "Tailwind Template",
            description: "Create a tailwind component",
            version: "1.0.0"
        };
    }
    protected override async run(destination: string): Promise<void> {
        // ask user the name of the component
        const name = await this.input({
            title: "Provide a name for your component",
            value: "",
            validations: [{
                message: "Provide a valide component name",
                regex: "[A-Z][A-Za-z0-9]+"
            }]
        });
        if(!name) return;
        // register variables
        this.registerVar("componentName", name);
        // write all files
        await this.writeFile();
        // open file in the editor
        await this.openFile(name + "/" + name + ".wcl.avt");
    }
}
```

```typescript filename=/Template/src/Tailwind/Tailwind.wcl.avt
/**
 * This class is the root for all components using tailwind
 */
export class Tailwind extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods

    //#endregion

}
```

```css filename=/Template/src/Tailwind/Tailwind.wcs.avt
:host {}
```

```html filename=/Template/src/Tailwind/Tailwind.wcv.avt
<slot></slot>
```

```json filename=/Template/aventus.conf.avt
{
	"module": "Tailwind",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [{
				"output": "./dist/Tailwind.js"
			}]
		}
	],
    "aliases": {
        "@":"./src" // using alias to always have the right root folder
    }
}
```

The variable componentName will be now available inside the template creation flow. Every files at the same depth or
    deeper than the template.avt will be copied when template is called. We can now create template files
    : 

```typescript filename=/Template/.aventus/templates/TailwindComponent/${{componentName}}/${{componentName}}.wcl.avt
import { Tailwind } from '@/Tailwind/Tailwind.wcl.avt'

export class ${{componentName}} extends Tailwind implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods

    //#endregion

}
```

```css filename=/Template/.aventus/templates/TailwindComponent/${{componentName}}/${{componentName}}.wcs.avt
:host {
}
```

```html filename=/Template/.aventus/templates/TailwindComponent/${{componentName}}/${{componentName}}.wcv.avt
<slot></slot>
```

```ts filename=/Template/.aventus/templates/TailwindComponent/template.avt.ts
export class Template extends AventusTemplate {
    protected override meta(): TemplateInfo {
        return {
            name: "Tailwind Template",
            description: "Create a tailwind component",
            version: "1.0.0"
        };
    }
    protected override async run(destination: string): Promise<void> {
        // ask user the name of the component
        const name = await this.input({
            title: "Provide a name for your component",
            value: "",
            validations: [{
                message: "Provide a valide component name",
                regex: "[A-Z][A-Za-z0-9]+"
            }]
        });
        if(!name) return;
        // register variables
        this.registerVar("componentName", name);
        // write all files
        await this.writeFile();
        // open file in the editor
        await this.openFile(name + "/" + name + ".wcl.avt");
    }
}
```

```typescript filename=/Template/src/Tailwind/Tailwind.wcl.avt
/**
 * This class is the root for all components using tailwind
 */
export class Tailwind extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods

    //#endregion

}
```

```css filename=/Template/src/Tailwind/Tailwind.wcs.avt
:host {}
```

```html filename=/Template/src/Tailwind/Tailwind.wcv.avt
<slot></slot>
```

```json filename=/Template/aventus.conf.avt
{
	"module": "Tailwind",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [{
				"output": "./dist/Tailwind.js"
			}]
		}
	],
    "aliases": {
        "@":"./src" // using alias to always have the right root folder
    }
}
```

Every ${{componentName}} will be replaced by the user answer.

## Using the template

Now if you right click on the <mark>/src</mark> folder and click on <mark>Aventus :
        Create...</mark>. Inside the next dropdown, the option <mark>Tailwind Template</mark> must
    be available.


![](https://aventusjs.com/img/doc/advanced/template/tailwind-template.png)

If you click on it, a prompt will ask you the new component name. If you fill it with <mark>NewComp</mark>
    and press enter,
    3 new files will be created.

```typescript filename=/Template/.aventus/templates/TailwindComponent/${{componentName}}/${{componentName}}.wcl.avt
import { Tailwind } from '@/Tailwind/Tailwind.wcl.avt'

export class ${{componentName}} extends Tailwind implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods

    //#endregion

}
```

```css filename=/Template/.aventus/templates/TailwindComponent/${{componentName}}/${{componentName}}.wcs.avt
:host {
}
```

```html filename=/Template/.aventus/templates/TailwindComponent/${{componentName}}/${{componentName}}.wcv.avt
<slot></slot>
```

```ts filename=/Template/.aventus/templates/TailwindComponent/template.avt.ts
export class Template extends AventusTemplate {
    protected override meta(): TemplateInfo {
        return {
            name: "Tailwind Template",
            description: "Create a tailwind component",
            version: "1.0.0"
        };
    }
    protected override async run(destination: string): Promise<void> {
        // ask user the name of the component
        const name = await this.input({
            title: "Provide a name for your component",
            value: "",
            validations: [{
                message: "Provide a valide component name",
                regex: "[A-Z][A-Za-z0-9]+"
            }]
        });
        if(!name) return;
        // register variables
        this.registerVar("componentName", name);
        // write all files
        await this.writeFile();
        // open file in the editor
        await this.openFile(name + "/" + name + ".wcl.avt");
    }
}
```

```typescript filename=/Template/src/NewComp/NewComp.wcl.avt
import { Tailwind } from '@/Tailwind/Tailwind.wcl.avt'

export class NewComp extends Tailwind implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods

    //#endregion

}
```

```css filename=/Template/src/NewComp/NewComp.wcs.avt
:host {
}
```

```html filename=/Template/src/NewComp/NewComp.wcv.avt
<slot></slot>
```

```typescript filename=/Template/src/Tailwind/Tailwind.wcl.avt
/**
 * This class is the root for all components using tailwind
 */
export class Tailwind extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods

    //#endregion

}
```

```css filename=/Template/src/Tailwind/Tailwind.wcs.avt
:host {}
```

```html filename=/Template/src/Tailwind/Tailwind.wcv.avt
<slot></slot>
```

```json filename=/Template/aventus.conf.avt
{
	"module": "Tailwind",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [{
				"output": "./dist/Tailwind.js"
			}]
		}
	],
    "aliases": {
        "@":"./src" // using alias to always have the right root folder
    }
}
```

## Meta

You can configure meta data to configure your template.

|Name|Description|
|---|---|
|name|             &nbsp;The name of your template. Each <mark>.</mark> will be considered as                 a group.         &nbsp;|
|description|The description of your template. This is a short description to explain your             template action.|
|version|The version of your template. This must match x.x.x|
|organization|The organization from which your template will be deployed into the             store.|
|tags|The tags to tag your template inside the store.|
|isProject|             &nbsp;A boolean to define if the template need that a <mark>aventus.conf.avt</mark> exists in the                 workspace.         &nbsp;|
|installationFolder|A string to define where to install your template. It's recommended to use your             shop username or shop organization's name.|
|documentation|The link to the documentation of your template inside the             store.|
|repository|The link to the repository of your template inside the store.|
|allowQuick|A boolean to determine if the template can be use without right             click.|

## Available Methods

The template contains action to help you during creation process.

|Name|Description|
|---|---|
|input|Ask user with a input.|
|select|Ask user with a select.|
|selectMultiple|Ask user with a select with multiple choice.|
|registerVar|             &nbsp;Register a variable that you can use. A default variable named <mark>namespace</mark> is                 already registered.         &nbsp;|
|registerBlock|             &nbsp;Register a block that you can use. A default block named <mark>namespace</mark> is already                 registered.             &nbsp;         &nbsp;|
|writeFile|             &nbsp;Write all files / folder at the same level or deeper than the template.avt.ts. By default the <mark>.git</mark> folder and the <mark>.empty</mark> file be ignored. You can pass a                 function as parameter to apply custom logic. If the function return false, the file won't be written.             &nbsp;         &nbsp;|
|defaultWriteDeny|             &nbsp;You can call this function inside your function parameter inside <mark>writeFile</mark> to                 avoid <mark>.empty</mark> and <mark>.git</mark>.         &nbsp;|
|replaceVariables|             &nbsp;Call this function if you need to replace variables inside a text         &nbsp;|
|replaceBlocks|             &nbsp;Call this function if you need to replace blocks inside a text         &nbsp;|
|addIndent|             &nbsp;Add \t before each lines         &nbsp;|
|removeIndent|             &nbsp;Remove \t before each lines         &nbsp;|
|exec|             &nbsp;Exec a command. For example : <mark>npm i</mark>         &nbsp;|
|showErrorMessage|             &nbsp;Show an error message inside the IDE         &nbsp;|
|showWarningMessage|             &nbsp;Show a warning message inside the IDE         &nbsp;|
|showInformationMessage|             &nbsp;Show an information message inside the IDE         &nbsp;|
|showProgress|             &nbsp;Show a progress bar inside the IDE         &nbsp;|
|hideProgress|             &nbsp;Hide a progress bar inside the IDE         &nbsp;|
|runWithProgress|             &nbsp;Helper to show then hide a progress bar         &nbsp;|
|openFile|             &nbsp;Open file. You must define the <mark>relative path</mark> from the template.avt.ts         &nbsp;|
|sleep|             &nbsp;Helper to wait x ms         &nbsp;|

## Expose the template globally


    A global template is available during creation independently of the current project. Set
    &nbsp;<mark>isGlobal: true</mark> in its metadata and install it in the <mark>global</mark> folder
    shown by <mark>Aventus : Open storage</mark>. Additional shared folders can be registered with the
    &nbsp;<mark>aventus.globalPath</mark> VS Code setting.


Workspace-specific global templates can also be placed in <mark>.aventus/global</mark>. They are merged
    with configured global templates and are available to quick creation.

## Publish to the store


    You can publish your template to the store by <mark>right clicking</mark> on the <mark>template.avt.ts</mark> and press <mark>Aventus: Publish template to the store</mark>


## Download from the store


    You can download amazing templates directly from the store just by clicking on the download button on a package
    details page.



    &nbsp;[Open the store](https://store.aventusjs.com/templates)


## Project


    In the previous section, you open the Aventus storage folder, you may have noticed that a <mark>projects</mark> exists. Inside this folder, you can find templates that will be used when you <mark>init a new project</mark>. So can you create your own template to init new project or download some
    from the web. You must know that if a <mark>aventus.conf.avt</mark> file is at the same level of a <mark>template.avt</mark> file, the project will not be created. It means no autocompletion, no output
    files, etc. You can also name the file <mark>!aventus.conf.avt</mark> to avoid error.


## Quick template


    If a template supports quick creation via a meta tag, you can register it to run without right-clicking on a folder.


This is especially useful for creating files in a specific location. For example, in [Laraventus](https://laraventus.aventusjs.com/), there is a template
    for creating a Controller, which should always be placed in the <mark>app/Http/Controller</mark> folder.


### Setting up Quick Creation

To configure quick creation:

- Open the Command Palette and search for <mark>Aventus: Edit Quick Creation</mark>
- or use the shortcut <mark>Ctrl + K</mark>, <mark>Ctrl + Shift + V</mark>.

If Aventus finds compatible templates, you can enable or disable them for quick creation.

### Running Quick Creation

To run a quick creation:

- Open the Command Palette and search for <mark>Aventus: Run Quick Creation</mark>
- or use the shortcut <mark>Ctrl + K</mark>, <mark>Ctrl + V</mark>.

If only one template is registered, it will run immediately. Otherwise, you can select which quick template to execute.

---
# Advanced - Store

The AventusJS Store gives you a central place to save your own creations and share them with others. You can also
    explore and download templates or packages from the community to speed up your development and boost productivity.


## Using the Store - Package

The AventusJS Store is available at [<mark>store.aventusjs.com</mark>](https://store.aventusjs.com/). From there, you can browse and search for available packages
    created by the community.

### Searching for Packages

You can use the search feature on the store website to quickly find the package you need. Each package has a name and
    version that you will use in your project configuration.

### Installing a Package

To install a package, you need to declare it inside your project configuration file <mark>aventus.conf.avt</mark>.

For example, if you want to use the <mark>MaterialIcon</mark> package in version <mark>1.0.0</mark>, your configuration file should include the following:

```json
{
    dependencies: {
        "MaterialIcon": "1.0.0"
    }
}
```

Once declared, Aventus will automatically download and link the package so you can use it directly in your project.
    This makes it quick and easy to integrate community-driven code and assets into your own work.

### Updating a Package

Packages are not updated automatically.

If a new version is available on the store, you can update your project simply by changing the version number in your
    &nbsp;<mark>aventus.conf.avt</mark> file.


For example, to update the MaterialIcon package from version <mark>1.0.0</mark> to <mark>1.1.0</mark>, your configuration should look like this:

```json
{
    dependencies: {
        "MaterialIcon": "1.1.0"
    }
}
```

After saving the configuration, Aventus will fetch the new version and replace the old one in your project.

## Using the Store - Template

Templates in AventusJS allow you to quickly generate files and boilerplate code for your projects. They are
    especially useful when you want to maintain consistency across components or projects. Full documentation for
    templates can be found in the template section.

### Finding and Downloading Templates

You can search for templates directly on the AventusJS Store website.

If you want to download a template, click the Download button. This will open a link directly in VSCode, which will
    automatically download the template into your workspace.

### Removing Templates

If you need to remove a downloaded template, you can use the following Aventus commands:

- <mark>Aventus : Uninstall Templates</mark> : use this if the template is a template that require an
        Aventus project.
- <mark>Aventus : Uninstall Projects</mark> : use this if the template is a template that doesn't
        require an Aventus project.

These commands ensure that your workspace stays clean and that old templates do not interfere with new ones.

## Publishing to the Store - Package

Publishing a package to the AventusJS Store allows you to share reusable pieces of code with the community while
    keeping your code modular and easy to integrate.

### Prerequisites

To publish a package, you need:

- A registered account on [store.aventusjs.com](https://store.aventusjs.com/).

### Connecting to the Store

- Run the command <mark>Aventus : Connect to the store</mark> in VSCode.
- Enter your credentials to log in.

Once connected, you can publish packages directly from your workspace.

### Publishing a Package

- Run the command <mark>Aventus : Publish package to the store</mark>
- If there is only one package in your workspace, it will be published automatically.
- If multiple packages are available, you will be asked to select the package you want to publish.
- 
        &nbsp;You can also publish under an organization if:
        &nbsp;
            &nbsp;The organization exists on the store.
            &nbsp;Your user account is linked to that organization.
        &nbsp;
    &nbsp;

### Configuration Fields

During publication, Aventus will use metadata defined in your <mark>aventus.conf.avt</mark> file. The
    following fields are recommended:

- <mark>version</mark>: The package version on the store. Each version can only be published once.
        Default is <mark>1.0.0</mark>
- <mark>description</mark>: A short description displayed under the package (max 255 characters).
- <mark>organization</mark>: If defined, the package will be published under this organization;
        otherwise, it will be published under your account.
- <mark>documentation</mark>: HTTP link to the package documentation.
- <mark>repository</mark>: Link to the repository.
- <mark>readme</mark>: Local link to the README file. If not defined, Aventus will attempt to find a
        README in the current folder.
- <mark>tags</mark>: Labels to help identify the package (maximum 5).

None of these fields are mandatory, but providing them makes your package more attractive and discoverable.

### Managing Package

You can edit the README content directly from the store website.

If needed, you can delete a package from the store if you are the owner.

## Publishing to the Store - Template

Publishing a template to the AventusJS Store allows you to share reusable project or component templates with the
    community, making it easier for others to create consistent and modular code.

### Publishing a Template

- Open the <mark>template.avt.ts</mark> file of your template in VSCode.
- Right-click anywhere in the file and select <mark>Aventus: Publish Template to the store</mark>.

### Template Metadata

Templates can include the same metadata as packages, defined in the <mark>meta()</mark> function.
    Recommended fields include:

- <mark>version</mark>: The template version on the store. Each version can only be published once.
        Default is <mark>1.0.0</mark>
- <mark>description</mark>: A short description displayed under the template (max 255 characters).
- <mark>organization</mark>: If defined, the template will be published under this organization;
        otherwise, it will be published under your account.
- <mark>documentation</mark>: HTTP link to the template documentation.
- <mark>repository</mark>: Link to the repository.
- <mark>readme</mark>: Local link to the README file. If not defined, Aventus will attempt to find a
        README in the current folder.
- <mark>tags</mark>: Labels to help identify the template (maximum 5).

Additionally, templates have unique fields:

- 
        &nbsp;<mark>installationFolder</mark>: Defines the folder where the template will be installed.
        &nbsp;Example: if the template is a project and <mark>installationFolder</mark> is set to <mark>Cobwebsite/Test</mark>, the template will be installed in <mark>$storage/projects/Cobwebsite/Test</mark>.
        &nbsp;If there are conflicts with existing folders, the new installation will overwrite the old one.
    &nbsp;
- <mark>isProject</mark>: Defines if the template need a <mark>aventus.conf.avt</mark>
- <mark>isGlobal</mark>: Installs the template as a global creation template instead of a project or
        component template.

### Managing Template

You can edit the README content directly from the store website.

Templates can also be deleted from the store if you are the owner.

---
# Advanced - Npm Export

Exporting your AventusJs code to npm (Node Package Manager) is a powerful way to share and reuse your code across multiple projects. By publishing your code as an npm package, you can easily integrate it into any JavaScript project, streamline updates, and collaborate with others.

## Setup for the example

First of all you need to create a new empty project <mark>test</mark> with a component named <mark>Button</mark>

```typescript filename=/test/src/Button/Button.wcl.avt
export class Button extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region events

    //#endregion

    //#region methods

    //#endregion

}
```

```css filename=/test/src/Button/Button.wcs.avt
:host {
	/*
	* description2
	* @type color
	*/
	--_button-background-color: var(--button-background-color, var(--primary-color, #3c95d0));
}


:host {
	background-color: var(--_button-background-color);
	border: 1px solid transparent;
	border-radius: 10px;
	padding: 5px 15px;
}


:host([outline]) {
	background-color: #ffffff;
	border-color: var(--_button-background-color);
	color: var(--_button-background-color);
}
```

```html filename=/test/src/Button/Button.wcv.avt
<slot>test</slot>
```

```typescript filename=/test/aventus.conf.avt
{
	"module": "test",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [{
				"output": "./dist/test.js"
			}]
		}
	]
}
```

Now, add the section <mark>build.compile.outputNpm</mark> with the path <mark>./npm</mark>.

```typescript filename=/test/src/Button/Button.wcl.avt
export class Button extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region events

    //#endregion

    //#region methods

    //#endregion

}
```

```css filename=/test/src/Button/Button.wcs.avt
:host {
	/*
	* description2
	* @type color
	*/
	--_button-background-color: var(--button-background-color, var(--primary-color, #3c95d0));
}


:host {
	background-color: var(--_button-background-color);
	border: 1px solid transparent;
	border-radius: 10px;
	padding: 5px 15px;
}


:host([outline]) {
	background-color: #ffffff;
	border-color: var(--_button-background-color);
	color: var(--_button-background-color);
}
```

```html filename=/test/src/Button/Button.wcv.avt
<slot>test</slot>
```

```typescript filename=/test/aventus.conf.avt
{
    "module": "test",
    "componentPrefix": "av",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ],
            "compile": [{
                "output": "./dist/test.js",
                "outputNpm": "./npm"
            }]
        }
    ]
}
```

On save, this will create a new folder <mark>npm</mark> with all files ready for the deployment

```javascript filename=/test/npm/__src/src/Button/Button.wcl.js
import { WebComponent, WebComponentInstance } from "@aventusjs/main/Aventus/index.js";

export const Button = class Button extends WebComponent {
    static __style = `:host{--_button-background-color: var(--button-background-color, var(--primary-color, #3c95d0))}:host{background-color:var(--_button-background-color);border:1px solid rgba(0,0,0,0);border-radius:10px;padding:5px 15px}:host([outline]){background-color:#fff;border-color:var(--_button-background-color);color:var(--_button-background-color)}`;
    __getStatic() {
        return Button;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Button.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot>test</slot>` },
        blocks: { 'default':`<slot>test</slot>` }
    });
}
    getClassName() {
        return "Button";
    }
}
Button.Namespace=`test`;
Button.Tag=`av-button`;
if(!window.customElements.get('av-button')){window.customElements.define('av-button', Button);WebComponentInstance.registerDefinition(Button);}
```

```typescript filename=/test/npm/test/index.d.ts
import { WebComponent, DefaultComponent, WebComponentInstance } from "@aventusjs/main/Aventus";

export class Button extends WebComponent implements DefaultComponent {
}
```

```javascript filename=/test/npm/test/index.js
export { Button } from "../__src/src/Button/Button.wcl.js"
```

```typescript filename=/test/npm/index.d.ts
import * as test from "./test";


export { test };
```

```javascript filename=/test/npm/index.js
import * as test from "./test/index.js";
export { test };
```

```json filename=/test/npm/package.json
{
  "name": "@test/main",
  "displayName": "test Main",
  "description": "Aventus build for @test/Main",
  "version": "1.0.0",
  "author": {
    "name": "Cobwebsite",
    "email": "info@cobwebsite.ch",
    "url": "https://cobwesbite.ch"
  },
  "main": "index.js",
  "types": "index.d.ts",
  "dependencies": {}
}
```

```typescript filename=/test/src/Button/Button.wcl.avt
export class Button extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region events

    //#endregion

    //#region methods

    //#endregion

}
```

```css filename=/test/src/Button/Button.wcs.avt
:host {
	/*
	* description2
	* @type color
	*/
	--_button-background-color: var(--button-background-color, var(--primary-color, #3c95d0));
}


:host {
	background-color: var(--_button-background-color);
	border: 1px solid transparent;
	border-radius: 10px;
	padding: 5px 15px;
}


:host([outline]) {
	background-color: #ffffff;
	border-color: var(--_button-background-color);
	color: var(--_button-background-color);
}
```

```html filename=/test/src/Button/Button.wcv.avt
<slot>test</slot>
```

```typescript filename=/test/aventus.conf.avt
{
    "module": "test",
    "componentPrefix": "av",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ],
            "compile": [{
                "output": "./dist/test.js",
                "outputNpm": "./npm"
            }]
        }
    ]
}
```

Now run the command <mark>npm publish --access public</mark> to publish your script to npm so that you can use it everywhere.

---
# Advanced - Storybook

Exporting your AventusJs code to Storybook is a powerful way to visualize and document your UI components and your
    code. Storybook provides an interactive environment for developing, testing, and showcasing components in isolation,
    making it an invaluable tool for both development and collaboration.

## Setup for the example

First of all you need to create a new empty project <mark>test</mark> with a component named <mark>Button</mark>

```typescript filename=/test/src/Button/Button.wcl.avt
export class Button extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region events

    //#endregion

    //#region methods

    //#endregion

}
```

```css filename=/test/src/Button/Button.wcs.avt
:host {
	--_button-background-color: var(--button-background-color, var(--primary-color, #3c95d0));
}


:host {
	background-color: var(--_button-background-color);
	border: 1px solid transparent;
	border-radius: 10px;
	padding: 5px 15px;
}


:host([outline]) {
	background-color: #ffffff;
	border-color: var(--_button-background-color);
	color: var(--_button-background-color);
}
```

```html filename=/test/src/Button/Button.wcv.avt
<slot>test</slot>
```

```typescript filename=/test/aventus.conf.avt
{
	"module": "test",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [{
				"output": "./dist/test.js"
			}]
		}
	]
}
```

Now, add the section <mark>build.compile.outputNpm</mark> with the path <mark>./npm</mark>.

```typescript filename=/test/src/Button/Button.wcl.avt
export class Button extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region events

    //#endregion

    //#region methods

    //#endregion

}
```

```css filename=/test/src/Button/Button.wcs.avt
:host {
	--_button-background-color: var(--button-background-color, var(--primary-color, #3c95d0));
}


:host {
	background-color: var(--_button-background-color);
	border: 1px solid transparent;
	border-radius: 10px;
	padding: 5px 15px;
}


:host([outline]) {
	background-color: #ffffff;
	border-color: var(--_button-background-color);
	color: var(--_button-background-color);
}
```

```html filename=/test/src/Button/Button.wcv.avt
<slot>test</slot>
```

```typescript filename=/test/aventus.conf.avt
{
    "module": "test",
    "componentPrefix": "av",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ],
            "compile": [{
                "output": "./dist/test.js"
            }],
            "stories": {
                "output": "./storybook"
            }
        }
    ]
}
```

On save, nothing happen. It's because by default stories don't compile on live. You can change the behaviour by
    adding the property <mark>live: true</mark> inside the <mark>stories</mark> section. For this
    example, you will keep live: false.

To export stories, you can press <mark>ctrl + shift + p</mark> to open the command launcher and search for
    &nbsp;<mark>Aventus : Build storybook</mark>. When you hit enter, a new folder named <mark>storybook</mark> is created.


This folder contains a storybook projet with the following structure.

- <mark>.storybook</mark> : contains the configuration files for storybook. You can find more [here](https://storybook.js.org/docs/configure).
- <mark>assets</mark> : contains assets for your stories.
- <mark>auto</mark> : contains stories exported from Aventus. You shouldn't write inside the folder.
    &nbsp;
- <mark>generated</mark> : contains your aventus project exported as npm package. You shouldn't write
        inside the folder.
- <mark>static</mark> : static folder mounted by storybook

You can now write custom documentation with <mark>.mdx</mark> files or custom stories.

First of all, run the command <mark>npm i</mark> inside the folder <mark>storybook</mark> to
    install node_modules then run <mark>npm run storybook</mark> to start storybook. A new page will open
    inside your default browser with the storybook project.

![](https://aventusjs.com/img/doc/advanced/storybook/first-storybook.png)

The meta for each story is build based on the documentation you provide inside your code. There is custom
    documentation you can add to improve your story content.

## Document slots

To document slots, you can add a comment over you component class with the tag <mark>@slot (slotName)? -
        description</mark>. The default value for slotName is <mark>default</mark>.

```typescript filename=test/src/Button/Button.wcl.avt
/**
 * This is an aventus button
 * @slot default - Content for your button
 */
export class Button extends Aventus.WebComponent implements Aventus.DefaultComponent {
}
```

![](https://aventusjs.com/img/doc/advanced/storybook/slots.png)

As you can see, the component has now a description and the slot default has also a description.

## Style variables

To add documentation to your style variables, you can add a comment over the variable. Two tags are available to extends your documentation

- <mark>@type</mark> : to define the type of your variable. Actually only <mark>color</mark> will apply change to the docuementation.
- <mark>@default</mark> : to define the default value of your css variable. By default the value is the last static value inside the var chain

```css filename=test/src/Button/Button.wcs.avt
:host {
    /**
    * Background color for the button
    * @type color
    */
    --_button-background-color: var(--button-background-color, var(--primary-color, #3c95d0));
}


:host {
    background-color: var(--_button-background-color);
    border: 1px solid transparent;
    border-radius: 10px;
    padding: 5px 15px;
}


:host([outline]) {
    background-color: #ffffff;
    border-color: var(--_button-background-color);
    color: var(--_button-background-color);
}
```

![](https://aventusjs.com/img/doc/advanced/storybook/css-vars.png)

As you can see, the variable has now a type and a description. Furthermore, inside the <mark>Live section</mark>, you can see that the control change to be a color picker.

## Customize storybook

To customize export you can add the decorator <mark>@Storybook</mark> or edit <mark>aventus.conf.avt</mark>.

### General configuration

- 
        &nbsp;<mark>Format</mark> : Define how to export.
        &nbsp;
            &nbsp;All : Export public, protected and private
            &nbsp;Protected : Export public, protected
            &nbsp;Public : Export public
            &nbsp;Manual : Export only elements with decorator @Storybook
        &nbsp;
    &nbsp;
- 
        &nbsp;<mark>Live</mark> : Define if storybook must be recompiled when source code is saved.
    &nbsp;
- 
        &nbsp;<mark>Output</mark> : Define where to export stories.
    &nbsp;
- 
        &nbsp;<mark>Prefix</mark> : Define a prefix for all your stories.
    &nbsp;
- 
        &nbsp;<mark>SrcBaseUrl</mark> : Define the link to your repo so that Aventus can create link to source code (only tested on github).
    &nbsp;
- 
        &nbsp;<mark>Workspace</mark> : Define where the folder .storybook must be added
    &nbsp;

### Override general configuration

You can override general configuration inside the decorator <mark>@Storybook</mark>. This is useful to change value of :

- <mark>Export</mark>
- <mark>Prefix</mark>

### Write custom stories

If you need to write custom stories, you can add the decorator <mark>@Storybook</mark> with the configuration <mark>noDefaultStory: true</mark>. Now only the meta is created. No more documentation is created for your button

```typescript filename=test/src/Button/Button.wcl.avt
/**
 * This is an aventus button
 * @slot default - Content for your button
 */
@Storybook({
    noDefaultStory: true
})
export class Button extends Aventus.WebComponent implements Aventus.DefaultComponent {
}
```

To write custom story, you can create a new file named <mark>Button.stories.ts</mark> inside the folder <mark>storybook</mark>

```typescript filename=test/storybook/Button.stories.ts
import { type Meta, type Story } from '@aventusjs/storybook';

import ButtonMeta from './auto/Button.stories';

const meta: Meta = { ...ButtonMeta }

export default meta;


export const MyCustomStory: Story = {}
```

In this file, you can write custom stories. You can read the [storybook documentation](https://storybook.js.org/docs) to learn how stories are working.

If you use custom stories, you need to redefine the title inside the meta constant. Otherwhise the file name will be used as title. 

```typescript filename=test/storybook/Button.stories.ts
import { type Meta, type Story } from '@aventusjs/storybook';

import ButtonMeta from './auto/Button.stories';

const meta: Meta = {
    ...ButtonMeta,
    title: "Button" // if you want a custom name or group
}

export default meta;


export const MyCustomStory: Story = {}
```

### Live section

You can disable live section for your webcomponent by adding the decorator <mark>@Storybook</mark> and define the configuration as <mark>noLive : true</mark>.

```typescript filename=test/src/Button/Button.wcl.avt
/**
 * This is an aventus button
 * @slot default - Content for your button
 */
@Storybook({
    noLive: true
})
export class Button extends Aventus.WebComponent implements Aventus.DefaultComponent {
}
```

Now the documentation will be generated but the live section won't exist anymore.

### Grouping story

You can customize how stories are grouped by adding the <mark>@Storybook</mark> decorator with the configuration <mark>group: "..."</mark>.

By default, the group will be the current namespace.

```typescript filename=test/src/Button/Button.wcl.avt
/**
 * This is an aventus button
 * @slot default - Content for your button
 */
@Storybook({
    group: "UI"
})
export class Button extends Aventus.WebComponent implements Aventus.DefaultComponent {
}
```

![](https://aventusjs.com/img/doc/advanced/storybook/group.png)

### Slot content

If you need to render content inside your slots for your stories, you can use the <mark>slots</mark> configuration.

```typescript filename=test/src/Button/Button.wcl.avt
/**
 * This is an aventus button
 * @slot default - Content for your button
 */
@Storybook({
    slots: {
        values: {
            default: "Click me"
        }
    }
})
export class Button extends Aventus.WebComponent implements Aventus.DefaultComponent {
}
```

You can also write html inside your configuration. If you use others customs elements, you have to inject them inside the configuration.

```typescript filename=test/src/Button/Button.wcl.avt
/**
 * This is an aventus button
 * @slot default - Content for your button
 */
@Storybook({
    slots: {
        values: {
            default: "<av-icon icon="home"></av-icon>"
        },
        inject: [Icon]
    }
})
export class Button extends Aventus.WebComponent implements Aventus.DefaultComponent {
}
```

## Write custom documentation pages

If you want to write custom document page, you can create a <mark>.mdx file</mark>. Most of the time, you will need diagram to explain how things are working togther. By default, the tag <mark>av-diagram</mark> is available to create mermaid diagram. You can read the mermaid documentation [here](https://mermaid.js.org/intro/getting-started.html).

```js filename=test/storybook/MyPage.mdx
import { Meta } from "@storybook/blocks";

<Meta title="My Page" />

<av-diagram>
{`---
title: Node
---
flowchart LR
    id
`}
</av-diagram>
```

We also suggest to download the extension <mark>Draw.io Integration</mark> inside your vscode. With this extension you can create asset file named <mark>MyPage.drawio.svg</mark> inside the <mark>asset</mark> folder and edit it live inside vscode. Then you can import this file inside your mdx to render the svg.

![](https://aventusjs.com/img/doc/advanced/storybook/drawio.png)

```js filename=test/storybook/MyPage.mdx
import { Meta } from "@storybook/blocks";
import DrawIO from "./assets/MyPage.drawio.svg";

<Meta title="My Page" />

<av-diagram>
{`---
title: Node
---
flowchart LR
    id
`}
</av-diagram>

<img src={DrawIO} />
```

![](https://aventusjs.com/img/doc/advanced/storybook/custom.png)
