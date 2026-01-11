# Library - PressManager

The <mark>PressManager</mark> class is a home class to deal with <mark>pointer</mark>, <mark>touch</mark> and <mark>mouse</mark> event. The main job of this class is to prevent the
    parent to have a trigger on an event catch by the child. The options for the PressManager are the following:

- 
        &nbsp;<mark>element</mark>: The element to which the events must be added.
    &nbsp;
- 
        &nbsp;<mark>delayDblPress</mark>: The delay allowed between two click/touch to
        trigger a double press event.
    &nbsp;
- 
        &nbsp;<mark>delayLongPress</mark>: The delay allowed before triggering a long press
        event.
    &nbsp;
- 
        &nbsp;<mark>forceDblPress</mark>: Force trigger double press event to parent (use
        it only if you know that the parent has a double press event because it will create latency).
    &nbsp;
- 
        &nbsp;<mark>offsetDrag</mark>: The distance in pixel that the user must move before
        triggering a drag event.
    &nbsp;
- 
        &nbsp;<mark>stopPropagation</mark>: If the lib must stop propagation of the event
    &nbsp;
- 
        &nbsp;<mark>buttonAllowed</mark>: List of mouse buttons allowed
    &nbsp;
- 
        &nbsp;<mark>onDblPress</mark>: Fired when double press event is detected.
    &nbsp;
- 
        &nbsp;<mark>onDrag</mark>: Fired when a drag event is detected.
    &nbsp;
- 
        &nbsp;<mark>onDragEnd</mark>: Fired when a drag event stopped.
    &nbsp;
- 
        &nbsp;<mark>onDragStart</mark>: Fired when a drag event started.
    &nbsp;
- 
        &nbsp;<mark>onLongPress</mark>: Fired when a long press event is detected.
    &nbsp;
- 
        &nbsp;<mark>onPress</mark>: Fired when a press event is detected.
    &nbsp;
- 
        &nbsp;<mark>onPressEnd</mark>: Fired when a press event stopped.
    &nbsp;
- 
        &nbsp;<mark>onPressStart</mark>: Fired when a press event started.
    &nbsp;

You must use only the property you need because your options will change the behavior of the PressManager. For
    example, if you set a callback on <mark>onDblPress</mark>, the code must wait until the end of the <mark>delayDblPress</mark> to trigger the <mark>onPress</mark>. This is not the case if you
    don't set the options.

Inside the <mark>*.wcv.avt</mark> you can use the attribute <mark>@press</mark> to create a
    PressManager on this element.

```typescript filename=/PressManager/src/Example/Example.wcl.avt
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @ViewElement()
    protected buttonEl!: HTMLButtonElement;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    /**
     *
     */
    protected onPress() {
        alert("Press with @press");
    }

    protected override postCreation(): void {
        new Aventus.PressManager({
            element: this.buttonEl,
            onPress: () => {
				alert("Press with Aventus.PressManager");
            }
        });
    }
    //#endregion

}
```

```css filename=/PressManager/src/Example/Example.wcs.avt
:host {
}
```

```html filename=/PressManager/src/Example/Example.wcv.avt
<button @element="buttonEl">Click 1</button>
<button @press="onPress">Click 2</button>
```

```html filename=/PressManager/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PressManager</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
</body>
</html>
```

```json filename=/PressManager/aventus.conf.avt
{
	"module": "PressManager",
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
