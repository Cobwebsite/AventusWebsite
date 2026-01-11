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
