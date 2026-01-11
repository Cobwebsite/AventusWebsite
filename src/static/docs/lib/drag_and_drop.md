# Library - Drag&Drop

If you need to drag&drop a visual element you can use <mark>Aventus.DragAndDrop</mark>. This code will
    move a target by setting a <mark>left</mark> and a <mark>top</mark>. The drag&drop can be
    instanciate with the following parameters: 

- 
        &nbsp;<mark>applyDrag</mark>: Determine if the left and top value must be set or
        not
    &nbsp;
- 
        &nbsp;<mark>element</mark>: The element that will move
    &nbsp;
- 
        &nbsp;<mark>elementTrigger</mark>: The element that listen the drag event; default
        is element
    &nbsp;
- 
        &nbsp;<mark>offsetDrag</mark>: Set the default offset for the drag trigger; default
        is DragAndDrop.defaultOffsetDrag
    &nbsp;
- 
        &nbsp;<mark>shadow.enable</mark>: If set to true, the drag and drop will create a
        shadow element while dragging and removing it on drop. It will not move the original element anymore
    &nbsp;
- 
        &nbsp;<mark>shadow.container</mark>: The container where the shadow element will be
        added, default is body
    &nbsp;
- 
        &nbsp;<mark>shadow.removeOnStop</mark>: Remove shadow from DOM tree at the end
    &nbsp;
- 
        &nbsp;<mark>shadow.transform()</mark>: Add custom transformation for the shadow
        element like adding class
    &nbsp;
- 
        &nbsp;<mark>strict</mark>: If set to false, the element will be considered as in
        the target if it touches it
    &nbsp;
- 
        &nbsp;<mark>targets</mark>: The targets for the drop action
    &nbsp;
- 
        &nbsp;<mark>usePercent</mark>: Use percent instead of pixel
    &nbsp;
- 
        &nbsp;<mark>isDragEnable()</mark>: Set a function to determine if drag is active or
        not
    &nbsp;
- 
        &nbsp;<mark>getZoom()</mark>: Set a function to determine the current zoom; default
        is 1
    &nbsp;
- 
        &nbsp;<mark>getOffsetX()</mark>: Set a function to get offset X in px related to
        element.offsetTarget
    &nbsp;
- 
        &nbsp;<mark>getOffsetY()</mark>: Set a function to get offset Y in px related to
        element.offsetTarget
    &nbsp;
- 
        &nbsp;<mark>onPointerDown()</mark>: Set a function that will be fired when pointer
        down on the elementTrigger
    &nbsp;
- 
        &nbsp;<mark>onPointerUp()</mark>: Set a function that will be fired when pointer up
    &nbsp;
- 
        &nbsp;<mark>onStart()</mark>: Set a function that will be fired when drag start
    &nbsp;
- 
        &nbsp;<mark>onMove()</mark>: Set a function that will be fired when the element
        move; trigger even if applyDrag = false
    &nbsp;
- 
        &nbsp;<mark>onStop()</mark>: Set a function that will be fired when drag stop
    &nbsp;
- 
        &nbsp;<mark>onDrop()</mark>: Set a function that will be fired after drop if at
        least one target found
    &nbsp;

The simplest example is the following :

```typescript filename=/DragDrop/src/Example/Example.wcl.avt
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
    protected override postCreation(): void {
        new Aventus.DragAndDrop({
			element: this
		});
    }
    //#endregion

}
```

```css filename=/DragDrop/src/Example/Example.wcs.avt
:host {
	width: 20px;
	height: 20px;
	background-color: red;
	position: absolute;
}
```

```html filename=/DragDrop/src/Example/Example.wcv.avt

                     
        
    
```

```html filename=/DragDrop/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Drag&Drop</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
</body>
</html>
```

```json filename=/DragDrop/aventus.conf.avt
{
	"module": "DragDrop",
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
