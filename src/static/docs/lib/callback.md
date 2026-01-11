# Library - Callback

Aventus script files are based on Typescript. The main advantage is that everything is typed but when you will use
    &nbsp;<mark>custom event</mark> it will be a nightmare to keep your type. This is why inside Aventus you can
    find two classes that are doing the same jobs as Event but are type friendly : <mark>Callback</mark> and
    &nbsp;<mark>CallbackGroup</mark>.


```typescript filename=/Callback/src/Emitter/Emitter.wcl.avt
export class Emitter extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    private emitMyEvent() {
        setInterval(() => {
            this.dispatchEvent(new CustomEvent("myEvent", {
                detail: {
                    time: Date.now()
                }
            }));
        }, 1000);
    }
    protected override postCreation(): void {
        this.emitMyEvent();
    }
    //#endregion

}
```

```css filename=/Callback/src/Emitter/Emitter.wcs.avt
:host {
}
```

```html filename=/Callback/src/Emitter/Emitter.wcv.avt
<slot></slot>
```

```typescript filename=/Callback/src/Receiver/Receiver.wcl.avt
import { Emitter } from "../Emitter/Emitter.wcl.avt";

export class Receiver extends Aventus.WebComponent implements Aventus.DefaultComponent {

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
        let emitter = document.querySelector<Emitter>("av-emitter");
        if(emitter) {
            emitter.addEventListener("myEvent", (e: CustomEvent) => {
                this.shadowRoot.innerHTML = 'Time is ' + e.detail.time;
            });
        }
    }
    //#endregion

}
```

```css filename=/Callback/src/Receiver/Receiver.wcs.avt
:host {
}
```

```html filename=/Callback/src/Receiver/Receiver.wcv.avt
<slot></slot>
```

```html filename=/Callback/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Callback</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-emitter></av-emitter>
    <av-receiver></av-receiver>
</body>
</html>
```

```json filename=/Callback/aventus.conf.avt
{
	"module": "Callback",
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

There are many problems inside the code :

- You don't know that an event <mark>myEvent</mark> can be emitted.
- You don't know what the event will have as details ( time ).
- If the event name change, you won't be able to detect errors inside your code.
- If more details will be added, nothing told you that you can use it.

As you can see, you really dependend on the documentation. What a nightmare when you create bigger project. Now, have
    a look at the code below with <mark>Callback</mark>.

```typescript filename=/Callback/src/Emitter/Emitter.wcl.avt
export class Emitter extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    public readonly myEvent: Aventus.Callback<(time: number) => void> = new Aventus.Callback();
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    private emitMyEvent() {
        setInterval(() => {
            this.myEvent.trigger(Date.now());
        }, 1000);
    }
    protected override postCreation(): void {
        this.emitMyEvent();
    }
    //#endregion

}
```

```css filename=/Callback/src/Emitter/Emitter.wcs.avt
:host {
}
```

```html filename=/Callback/src/Emitter/Emitter.wcv.avt
<slot></slot>
```

```typescript filename=/Callback/src/Receiver/Receiver.wcl.avt
import { Emitter } from "../Emitter/Emitter.wcl.avt";

export class Receiver extends Aventus.WebComponent implements Aventus.DefaultComponent {

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
        let emitter = document.querySelector<Emitter>("av-emitter");
        if(emitter) {
            emitter.myEvent.add((time: number) => {
                this.shadowRoot.innerHTML = 'Time is ' + time;
            });
        }
    }
    //#endregion

}
```

```css filename=/Callback/src/Receiver/Receiver.wcs.avt
:host {
}
```

```html filename=/Callback/src/Receiver/Receiver.wcv.avt
<slot></slot>
```

```html filename=/Callback/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Callback</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-emitter></av-emitter>
    <av-receiver></av-receiver>
</body>
</html>
```

```json filename=/Callback/aventus.conf.avt
{
	"module": "Callback",
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

As you can see, the behavior is almost the same but typing is preserved.

The <mark>CallbackGroup</mark> class is doing the same thing as the <mark>Callback</mark> but
    when you <mark>add</mark>, <mark>remove</mark> or <mark>trigger</mark>, you must
    provide a key (string or number) to trigger or store only a group of callbacks.

```typescript filename=/Callback/src/LogEmitter/LogEmitter.wcl.avt
export enum LogLvl {
    Info,
    Warning,
    Error
}

export class LogEmitter extends Aventus.WebComponent implements Aventus.DefaultComponent {
    public readonly onNewLog: Aventus.CallbackGroup<(msg: string) => void> = new Aventus.CallbackGroup();

    /**
    * Trigger the log callback only for the lvl concerned
    */
    public addLog(msg: string, lvl: LogLvl) {
        this.onNewLog.trigger(lvl, msg);
    }

    public readError() {
        this.onNewLog.add(LogLvl.Error, (msg) => {
			console.error(msg);
        });
    }
}
```

```css filename=/Callback/src/LogEmitter/LogEmitter.wcs.avt
:host {
}
```

```html filename=/Callback/src/LogEmitter/LogEmitter.wcv.avt
<slot></slot>
```

```html filename=/Callback/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Callback</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-emitter></av-emitter>
    <av-receiver></av-receiver>
</body>
</html>
```

```json filename=/Callback/aventus.conf.avt
{
	"module": "Callback",
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
