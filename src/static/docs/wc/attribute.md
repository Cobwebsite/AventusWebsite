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
- <mark>literal</mark> (ex: 'value1'|'value2')

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
