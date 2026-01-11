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
