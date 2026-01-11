# Library - ResizeObserver

To know when an element is changing you can use the native function <mark>[ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)</mark>. Inside Aventus, you can find an optimized version of
    ResizeObserver under <mark>Aventus.ResizeObserver</mark>. The behavior is the same as the native one but
    behind, a <mark>single instance</mark> of native ResizeObserver is used and the callback function is
    limited to one trigger each <mark>1000 / 60 ms</mark>.

```typescript filename=/ResizeObserver/src/Example/Example.wcl.avt
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
		const observer = new Aventus.ResizeObserver(() => {
			if(this.offsetWidth < 50) {
				this.style.backgroundColor = 'red'
			}
			else {
				this.style.backgroundColor = 'blue'
			}
		})

		observer.observe(this);
    }
    //#endregion

}
```

```css filename=/ResizeObserver/src/Example/Example.wcs.avt
:host {
	animation-name: resize;
    animation-duration: 5s;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
	height: 30px;
}

@keyframes resize {
	0% {
		width: 30px;
	}

	100% {
		width: 70px;
	}
}
```

```html filename=/ResizeObserver/src/Example/Example.wcv.avt

                     
        
    
```

```html filename=/ResizeObserver/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ResizeObserver</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
</body>
</html>
```

```json filename=/ResizeObserver/aventus.conf.avt
{
	"module": "ResizeObserver",
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
