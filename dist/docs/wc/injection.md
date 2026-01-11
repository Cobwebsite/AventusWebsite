# Webcomponent - Injection

In this section you are going to learn how you can inject data from parent into the child.

## Add injection

To bind add an injection on a child inside the shadowroot, you can use the following syntax : <mark>:fieldOnChild=""</mark>

With the code below, the input value will be incremented each second

```typescript filename=/Injection/src/Example/Example.wcl.avt
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @Watch()
    private time: number = 0;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    protected override postCreation() {
        setInterval(() => {
            this.time++;
        }, 1000);
    }
    //#endregion

}
```

```css filename=/Injection/src/Example/Example.wcs.avt
:host {

}
```

```html filename=/Injection/src/Example/Example.wcv.avt
<input type="text" :value="this.time" />
```

```html filename=/Injection/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Injection</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
</body>
</html>
```

```json filename=/Injection/aventus.conf.avt
{
	"module": "Injection",
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

The injected value will be refreshed only if you use a <mark>Property</mark> or any <mark>watchables variables</mark>

```typescript filename=/Injection/src/Example/Example.wcl.avt
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @Watch()
    private time: number = 0;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    public getTimeTxt() {
        return 'time : ' + this.time;
    }
    protected override postCreation() {
        setInterval(() => {
            this.time++;
        }, 1000);
    }
    //#endregion

}
```

```css filename=/Injection/src/Example/Example.wcs.avt
:host {

}
```

```html filename=/Injection/src/Example/Example.wcv.avt
<input type="text" :value="this.getTimeTxt()" />
```

```html filename=/Injection/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Injection</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-example></av-example>
</body>
</html>
```

```json filename=/Injection/aventus.conf.avt
{
	"module": "Injection",
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

To help the user find out which fields are injectable into your component, you can use the <mark>@Injectable</mark> decorator.

```typescript filename=/Injection/src/Btn/Btn.wcl.avt
export class Btn extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @Watch()
    @Injectable() // this will provide autocompletion on tag
    public name: string = "";
    //#endregion


    //#region constructor

    //#endregion


    //#region methods

    //#endregion

}
```

```css filename=/Injection/src/Btn/Btn.wcs.avt
:host {
}
```

```html filename=/Injection/src/Btn/Btn.wcv.avt
<span>{{ this.name }}</span>
```

```html filename=/Injection/src/Test.wc.avt
<script>
	export class Test extends Aventus.WebComponent implements Aventus.DefaultComponent {
		private name:string = 'John';
	}
</script>

<template>
	<av-btn :name="this.name"></av-btn>
</template>

<style></style>
```

```typescript filename=/Injection/aventus.conf.avt
{
	"module": "Injection",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [{
				"output": "./dist/demo.js"
			}]
		}
	],
	"static": [
		{
			"name": "Main",
			"input": "./src/static/*",
			"output": "./dist/"
		}
	]
}
```
