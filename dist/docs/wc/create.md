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
- <mark>@Dependances({ type: Type, strong?:boolean}[])</mark> : to add dependance not written inside
        component. The
        strong boolean define if the dependance must be loaded before the class.
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
