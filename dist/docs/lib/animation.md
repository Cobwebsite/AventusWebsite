# Library - Animation

The animation class allow you to execute a function at specific frames. The code is based on the <mark>[](https://developer.mozilla.org/fr/docs/Web/API/window/requestAnimationFrame)requestAnimationFrame</mark>. One use case for the class can be the following : You have
    a to run some complex calculations when the user has the mouse press and moves the cursor on the screen. The event
    can be fired at anytime and can overload your website. To avoid that you can use the <mark>Animation</mark> like that.

```typescript filename=/Animation/src/Example/Example.wcl.avt
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @ViewElement()
    protected squareEl!: HTMLDivElement;

    protected animation?: Aventus.Animation;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    protected startAnimation(fps: number) {
        const max = 200;
        const step = 10;
        let value = 0;
		if(this.animation) {
			this.animation.immediateStop();
		}
		let animation = new Aventus.Animation({
            animate: () => {
                value += step;
                this.squareEl.style.left = value + 'px';
                if(value >= max) {
                    animation.stop();
                }
            },
            fps: fps,
            stopped: () => {
                // trigger when the animation is ended
            }
        });
		this.animation = animation;
        animation.start();
    }

    protected startAnimation1fps() {
        this.startAnimation(1);
    }
    protected startAnimation10fps() {
        this.startAnimation(10);
    }
    protected startAnimation30fps() {
        this.startAnimation(30);
    }
    protected startAnimation60fps() {
        this.startAnimation(60);
    }
    //#endregion

}
```

```css filename=/Animation/src/Example/Example.wcs.avt
:host {
	position: relative;
    padding-top: 30px;
	.square {
		background-color: red;
		height: 20px;
		left: 0;
		position: absolute;
		top: 0;
		width: 20px;
	}
}
```

```html filename=/Animation/src/Example/Example.wcv.avt
<div class="square" @element="squareEl"></div>
<button @click="startAnimation1fps">Start 1fps</button>
<button @click="startAnimation10fps">Start 10fps</button>
<button @click="startAnimation30fps">Start 30fps</button>
<button @click="startAnimation60fps">Start 60fps</button>
```

```html filename=/Animation/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Animation</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
</body>
</html>
```

```json filename=/Animation/aventus.conf.avt
{
	"module": "Animation",
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
