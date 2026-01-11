# Webcomponent - Conditional rendering

Conditional rendering is a fundamental concept in web development that allows developers to display different content
    based on certain conditions or criteria. It enables dynamic content presentation, enabling web applications to
    respond and adapt to user interactions, data changes, or specific scenarios.

In conditional rendering, sections of a web page are conditionally displayed or hidden depending on the evaluation of
    logical expressions or variables. This capability is particularly useful for scenarios such as displaying
    personalized greetings to logged-in users, rendering error messages when data is missing, or showing different views
    based on user preferences.

Conditional rendering is seamlessly integrated into the template syntax. Developers can use control flow constructs
    such as if statements to conditionally include or exclude content within the template markup. This approach empowers
    developers to create dynamic and interactive user interfaces that cater to diverse user scenarios and requirements.


```typescript filename=/Conditional/src/Example/Example.wcl.avt
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props
    @Property()
    public number!: number;
    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    protected increment() {
        this.number++;
    }
    //#endregion

}
```

```css filename=/Conditional/src/Example/Example.wcs.avt
:host {
}
```

```html filename=/Conditional/src/Example/Example.wcv.avt
<p>The current number is {{ this.number }}</p>

if (this.number % 2 === 0) {
    <p style="background:blue">{{ this.number }} is even.</p>
} else {
    <p style="background:red">{{ this.number }} is odd.</p>
}

<button @click="increment">Increment</button>
```

```html filename=/Conditional/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Conditional</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
</body>
</html>
```

```typescript filename=/Conditional/aventus.conf.avt
{
	"module": "Conditional",
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
	"static": [
		{
			"name": "Static",
			"input": "./static/*",
			"output": "./dist/"
		}
	]
}
```
