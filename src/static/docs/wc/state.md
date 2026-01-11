# Webcomponent - State

In this section you are going to learn how you can listen to <mark>state</mark> inside Webcomponent.

You can use state and stateManager to manage the lifecycle of your application. You can subscribe manually to a state
    manager (the explanation is here). To developer
    faster, you can use <mark>Decorator</mark> over methods of Webcomponent. Each method has its own
    decorator: 

- active: <mark>@StateActive</mark>
- inactive: <mark>@StateInactive</mark>
- askChange: <mark>@StateChange</mark>

When you set a Decorator over a method, this method will be fired when the state pattern, the manager and the method
    matching

```typescript filename=/State/src/Example/Example.wcl.avt
import { MainStateManager } from "../MainStateManager.state.avt";

export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @ViewElement()
    protected debugEl!: HTMLDivElement;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    @StateActive("/state1", MainStateManager)
    protected onStateActive(state: Aventus.State, slugs: Aventus.StateSlug) {
        this.writeLog("/state1 on");
    }

    @StateInactive("/state1", MainStateManager.getInstance())
    protected onStateInactive(state: Aventus.State, nextState: Aventus.State, slugs: Aventus.StateSlug) {
        this.writeLog("/state1 off");
    }

    @StateChange("/state1", MainStateManager)
    protected async onAskChange(state: Aventus.State, nextState: Aventus.State, slugs: Aventus.StateSlug) {
        return confirm("set state1 off?");
    }

    protected writeLog(txt: string) {
        const div = document.createElement("DIV");
        div.innerHTML = txt;
        this.debugEl.appendChild(div);
    }


    protected toggleState() {
        let mainState = MainStateManager.getInstance();
        if(mainState.getState()?.name == "/state1") {
            mainState.setState("/");
        }
        else {
            mainState.setState("/state1");
        }
    }
    //#endregion

}
```

```css filename=/State/src/Example/Example.wcs.avt
:host {
}
```

```html filename=/State/src/Example/Example.wcv.avt
<div class="debug" @element="debugEl"></div>
<button @click="toggleState">Change state</button>
```

```typescript filename=/State/src/MainStateManager.state.avt
export class MainStateManager extends Aventus.StateManager implements Aventus.IStateManager {
	/**
	 * Get the instance of the StateManager
	 */
	public static getInstance() {
		return Aventus.Instance.get(MainStateManager);
	}

}
```

```html filename=/State/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>State</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
</body>
</html>
```

```json filename=/State/aventus.conf.avt
{
	"module": "State",
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

Inside the Decorator you must define which StateManager must be watched. You can provide a class object <mark>MainStateManager.getInstance()</mark> or a class definition <mark>MainStateManager</mark>.
    If you set a class definition, Aventus will create a instance by using : <mark>Aventus.Instance.get()</mark>.

You can still use parameters inside the pattern to get slugs like <mark>/state/{id:number}/{action:string}</mark>.

If you need to do actions when none of your component state is active you can add two others Decorator : <mark>@DefaultStateActive</mark> and <mark>@DefaultStateInactive</mark>.

```typescript filename=/State/src/Example/Example.wcl.avt
import { MainStateManager } from "../MainStateManager.state.avt";

export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @ViewElement()
    protected debugEl!: HTMLDivElement;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    @StateActive("/state1", MainStateManager)
    protected onStateActive(state: Aventus.State, slugs: Aventus.StateSlug) {
        this.writeLog("/state1 on");
    }

    @StateInactive("/state1", MainStateManager.getInstance())
    protected onStateInactive(state: Aventus.State, nextState: Aventus.State, slugs: Aventus.StateSlug) {
        this.writeLog("/state1 off");
    }

    @StateChange("/state1", MainStateManager)
    protected async onAskChange(state: Aventus.State, nextState: Aventus.State, slugs: Aventus.StateSlug) {
        return confirm("set state1 off?");
    }

    @DefaultStateActive(MainStateManager)
    public onDefaultStateActive() {
        this.writeLog("No state define inside the component is matching");
    }
    @DefaultStateInactive(MainStateManager)
    public onDefaultStateInactive() {
        this.writeLog("The default state is now inactive because one component state is matching the active state");
    }

    protected writeLog(txt: string) {
        const div = document.createElement("DIV");
        div.innerHTML = txt;
        this.debugEl.appendChild(div);
    }


    protected toggleState() {
        let mainState = MainStateManager.getInstance();
        if(mainState.getState()?.name == "/state1") {
            mainState.setState("/");
        }
        else {
            mainState.setState("/state1");
        }
    }
    //#endregion

}
```

```css filename=/State/src/Example/Example.wcs.avt
:host {
}
```

```html filename=/State/src/Example/Example.wcv.avt
<div class="debug" @element="debugEl"></div>
<button @click="toggleState">Change state</button>
```

```typescript filename=/State/src/MainStateManager.state.avt
export class MainStateManager extends Aventus.StateManager implements Aventus.IStateManager {
	/**
	 * Get the instance of the StateManager
	 */
	public static getInstance() {
		return Aventus.Instance.get(MainStateManager);
	}

}
```

```html filename=/State/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>State</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
</body>
</html>
```

```json filename=/State/aventus.conf.avt
{
	"module": "State",
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

When you don't need anymore a component instance inside the view, don't forget to call the method <mark>destructor</mark> to clear all state subscbriptions.
