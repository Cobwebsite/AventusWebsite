# Webcomponent - Watch

In this section you are going to learn how you can define variables for your component that will fire a callback when
    something occur. In contrast to <mark>Attribute</mark> and <mark>Property</mark>, the <mark>Watch</mark> variable won't be reflected on the tag. This allow you to set complex type for the
    variable. The watch variable is based on a <mark>[Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)</mark>.

## Create a watch

To declare a watch variable, you must add the decorator <mark>@Watch</mark>.

```typescript filename=Example.wcl.avt
import { Person } from "../Person.data.avt";

export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region variables
    @Watch((target: Example, action: Aventus.WatchAction, path: string, value: any) => {
        console.log(Aventus.WatchAction[action] + " on " + path + " with value " + value);
    })
    public person?: Person;
    //#endregion

}
```

You can notice that the callback function contains more parameters than the <mark>Property</mark>
    decorator. This is due to the object complexity you can set. If <mark>Person</mark> is defined by the
    following class

```typescript filename=Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public name: string = "John Doe";
    public children: { name: string; }[] = [{ name: "Mini John Doe" }];
}
```

A lot of actions can be done on this object like changing the name, adding/removing a child, etc. With the parameters
    defined inside the callback you can know exactly what is happening with your data. 

The <mark>action</mark> is a enum that define if the object is <mark>CREATED</mark>, <mark>UPDATED</mark> or <mark>DELETED</mark>.

The <mark>path</mark> parameter is the path where the action occured (ex: <mark>person.children[0].name</mark> if we
    change the name of the first child).

The <mark>value</mark> is the value set / remove on the path.

Like the property, the main advantage of Watch variables is that they can be used inside <mark>interpolation</mark> and others view
    transformations.

```html filename=Example.wcv.avt
<div>Person : {{ this.person?.name }}</div>
```

```typescript filename=/Watch/src/Example/Example.wcl.avt
import { Person } from "../Person.data.avt";

export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props
    @Watch((target: Example, action: Aventus.WatchAction, path: string, value: any) => {
        console.log(Aventus.WatchAction[action] + " on " + path + " with value " + value);
    })
    public person?: Person;
    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    protected change() {
        if(this.person)
            this.person.name = "Changed Name";
    }

    protected override postCreation(): void {
        this.person = new Person()
    }
    //#endregion

}
```

```css filename=/Watch/src/Example/Example.wcs.avt
:host {

}
```

```html filename=/Watch/src/Example/Example.wcv.avt
<div>Person : {{ this.person?.name }}</div>
<button @press="change">Change</button>
```

```typescript filename=/Watch/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public name: string = "John Doe";
    public children: { name: string; }[] = [{ name: "Mini John Doe" }];
}
```

```html filename=/Watch/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Watch</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
</body>
</html>
```

```json filename=/Watch/aventus.conf.avt
{
	"module": "Watch",
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

## Debug a watch

Because when you are building big application a lot of actions can modify your watch variable, we add a debug feature
    to easly understand what change my value. Over the webcomponent class you must add the decorator <mark>@Debugger</mark> with the option <mark>enableWatchHistory</mark> to true.

```typescript filename=Example.wcl.avt
import { Person } from "../Person.data.avt";

@Debugger({
    enableWatchHistory: true
})
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region variables
    @Watch((target: Example, action: Aventus.WatchAction, path: string, value: any) => {
        console.log(Aventus.WatchAction[action] + " on " + path + " with value " + value);
    })
    public person?: Person;
    //#endregion

}
```

This will add 2 functions on this component named <mark>getWatchHistory</mark> to get all changes on the
    waches variables and <mark>clearWatchHistory</mark> to clear the current history. Both functions are only
    available inside your DevTools Console.

![](https://aventusjs.com/img/doc/wc/watch/debug.png)

## Using watch outisde component

You can watch what occur on an object everywhere on your code. To achieve that, you must use the <mark>Aventus.Watcher.get</mark> and work only with the result of the function. More
        info

```typescript filename=Test.lib.avt
export function createWatcher() {
	let watchableObj = Aventus.Watcher.get({}, (action: WatchAction, path: string, element: any) => {
		console.log(Aventus.WatchAction[action] + " on " + path + " with value " + value);
	});
	return watchableObj;
}
```
