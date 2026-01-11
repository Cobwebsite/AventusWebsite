# Webcomponent - Event

In this section you are going to learn how you can listen to event trigger.

## Add event

To bind an event on a child inside the shadowroot, you can use the following syntax : <mark>@eventname=""</mark>

With the code below, an alert saying "Hello" will be opened when the button is clicked.

```typescript filename=/Event/src/Example/Example.wcl.avt
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
    /**
     *
     */
    protected sayHello() {
        alert("Hello");
    }
    //#endregion

}
```

```css filename=/Event/src/Example/Example.wcs.avt
:host {

}
```

```html filename=/Event/src/Example/Example.wcv.avt
<button @click="sayHello">Say hello</button>
```

```html filename=/Event/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
</body>
</html>
```

```json filename=/Event/aventus.conf.avt
{
	"module": "Event",
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

If you have an Aventus.Callback instead of an event, you
    can use
    this syntax to subscribe to the trigger.

```typescript filename=/Event/src/Button/Button.wcl.avt
export class Button extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    public onCustomClick: Aventus.Callback<() => void> = new Aventus.Callback();
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    private triggerCustomClick() {
        this.onCustomClick.trigger();
    }
    //#endregion

}
```

```css filename=/Event/src/Button/Button.wcs.avt
:host {
}
```

```html filename=/Event/src/Button/Button.wcv.avt
<button @click="triggerCustomClick">Custom click</button>
```

```typescript filename=/Event/src/Example/Example.wcl.avt
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
    /**
     *
     */
    protected sayHello() {
        alert("Hello");
    }
    //#endregion

}
```

```css filename=/Event/src/Example/Example.wcs.avt
:host {

}
```

```html filename=/Event/src/Example/Example.wcv.avt
<av-button @customClick="sayHello">Say hello</av-button>
```

```html filename=/Event/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
</body>
</html>
```

```json filename=/Event/aventus.conf.avt
{
	"module": "Event",
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

If it's an Aventus.Callback, the compiler will take the name of your event and check if the property <mark>$event</mark>, <mark>on$event</mark> or <mark>on$Event</mark> exists on the
    element. For the example above, you can use <mark>@onCustomClick</mark>, <mark>@customClick</mark> or <mark>@CustomClick</mark>.
