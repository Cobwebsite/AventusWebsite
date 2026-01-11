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
