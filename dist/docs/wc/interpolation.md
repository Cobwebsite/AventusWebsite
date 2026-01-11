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
