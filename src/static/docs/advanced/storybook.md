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
