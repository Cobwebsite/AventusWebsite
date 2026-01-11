# Create your first project

## Init the project

In your file explorer create a new folder <mark>HelloAventus</mark> and open it with vscode.

You can create a new file named <mark>aventus.conf.avt</mark>. The minimal content for your config file is
    the following


```json filename=/HelloAventus/aventus.conf.avt
{
    "module": "HelloAventus",
    "componentPrefix": "ha",
    "build": [
        {
            "name": "Main",
            "src": [],
            "compile": [{
                "output": "./dist/helloaventus.js"
            }]
        }
    ]
}
```

The section <mark>module</mark> define the container name for the compiled code. Following the best
    practice, we minimize
    the use of global variables by wrapping the final code inside module. In this example, you can reach your compiled
    code
    by typing  *HelloWorld.**  inside the dev console.

The section <mark>componentPrefix</mark> define the prefix for the webcomponents. For example the tag name
    for a
    webcomponent class  *Test*  will be  *ha-test* .

The section <mark>build</mark> define all builds information. A build is a set of Aventus input file
    compiled as a single
    js file. You must provide at least 3 fields. <mark>name</mark> that define the unique name for your
    build,
    &nbsp;<mark>src</mark> that define where the compiler must look for Aventus file and <mark>compile[0].output</mark> that define where
    the compiler must write the compiled file. For the example the field  *includeBase*  is added to auto import
    Aventus source code.


When you save the config file a new file is created inside your workspace :  */dist/helloaventus.js* . The js file
    is your code compiled. Actually the file is empty because we didn't write any code.


There are more options for the config file that you can read here

Now you can create a new folder named <mark>src</mark> and edit the field build.src like that

```json filename=/HelloAventus/aventus.conf.avt
{
    "module": "HelloAventus",
    "componentPrefix": "ha",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ],
            "compile": [{
                "output": "./dist/helloaventus.js"
            }]
        }
    ]
}
```

This means that any <mark>*.avt</mark> file found will be compiled inside this build.

Now it's time to create your first webcomponent. You can right click inside the explorer part and click on <mark>Aventus
        : Create...</mark>

![](https://aventusjs.com/img/doc/install/firstapp/create_option.png)

A dropdown appears. Select the option : <mark>Component</mark>

![](https://aventusjs.com/img/doc/install/firstapp/create_menu.png)

Then you must enter the name for your WebComponent, call it MyComponent
    (<mark>&lt;ha-my-component&gt;&lt;/ha-my-component&gt;</mark>), press enter and select multiple files.
    Three new files are
    created

- <mark>MyComponent.wcl.avt</mark> - the file for the logic written in Typescript
- <mark>MyComponent.wcs.avt</mark> - the file for the style written in SCSS
- <mark>MyComponent.wcv.avt</mark> - the file for the view written in HTML

We will add some code inside the component to write an hello Aventus text in orange

```typescript filename=/HelloAventus/src/MyComponent.wcl.avt
export class MyComponent extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods

    //#endregion

}
```

```css filename=/HelloAventus/src/MyComponent.wcs.avt
/* :host is the style apply on your component */
:host {
    background-color: gray;
    .orange {
        color: #e5540e;
    }
}
```

```html filename=/HelloAventus/src/MyComponent.wcv.avt
<p>Hello <span class="orange">Aventus</span></p>
```

```json filename=/HelloAventus/aventus.conf.avt
{
    "module": "HelloAventus",
    "componentPrefix": "ha",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ],
            "compile": [{
                "output": "./dist/helloaventus.js"
            }]
        }
    ]
}
```

To show your first component you need an index file. Create a <mark>/static</mark> folder and a <mark>/static/index.html</mark> and add
    the content below:

```typescript filename=/HelloAventus/src/MyComponent.wcl.avt
export class MyComponent extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods

    //#endregion

}
```

```css filename=/HelloAventus/src/MyComponent.wcs.avt
/* :host is the style apply on your component */
:host {
    background-color: gray;
    .orange {
        color: #e5540e;
    }
}
```

```html filename=/HelloAventus/src/MyComponent.wcv.avt
<p>Hello <span class="orange">Aventus</span></p>
```

```html filename=/HelloAventus/static/index.html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hello Aventus</title>
        <script src="/helloaventus.js"></script>
    </head>
    <body>
        <ha-my-component></ha-my-component>
    </body>
</html>
```

```json filename=/HelloAventus/aventus.conf.avt
{
    "module": "HelloAventus",
    "componentPrefix": "ha",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ],
            "compile": [{
                "output": "./dist/helloaventus.js"
            }]
        }
    ]
}
```

This code will load the compiled file  *helloaventus.js*  in your dist folder. To export static file, you need to
    add a new section inside your config.

```typescript filename=/HelloAventus/src/MyComponent.wcl.avt
export class MyComponent extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods

    //#endregion

}
```

```css filename=/HelloAventus/src/MyComponent.wcs.avt
/* :host is the style apply on your component */
:host {
    background-color: gray;
    .orange {
        color: #e5540e;
    }
}
```

```html filename=/HelloAventus/src/MyComponent.wcv.avt
<p>Hello <span class="orange">Aventus</span></p>
```

```html filename=/HelloAventus/static/index.html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hello Aventus</title>
        <script src="/helloaventus.js"></script>
    </head>
    <body>
        <ha-my-component></ha-my-component>
    </body>
</html>
```

```json filename=/HelloAventus/aventus.conf.avt
{
    "module": "HelloAventus",
    "componentPrefix": "ha",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ],
            "compile": [
                {
                    "output": "./dist/helloaventus.js"
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

This code will export every file from <mark>/static</mark> to <mark>/dist</mark>. You can
    save your config file.

Now you can launch the Aventus live server by clicking on the start server button.

![](https://aventusjs.com/img/doc/install/firstapp/start_server.png)

Well done, you created your first Aventus App.
