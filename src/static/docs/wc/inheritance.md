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
