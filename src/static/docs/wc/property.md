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
- <mark>literal</mark> (ex: 'value1'|'value2')

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
