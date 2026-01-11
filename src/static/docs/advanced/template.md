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

## Expose the template globaly


    To use a template across multiple project, you can expose your template globaly. To complete that, you must run the
    command <mark>Aventus : Open storage</mark> and go inside the folder <mark>templates</mark>.
    Then you can copy paste the previous template here. Notice: Aventus watch the global templates folder only during
    starting process, so when you create a new global template, you must reload your Vscode instance.


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
