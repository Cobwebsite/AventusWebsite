# Configuration - Static

Even if Aventus is great for your project, you will need others files like .html, .png, etc. You can put your source file inside a static folder that will be exported.

## Properties

|Name|Description|
|---|---|
|name|This is the name for the static part. This name is only use if you use the command "Aventus : Copy static" to allow the user to choose the right folder to export.         &nbsp;|
|input|This is a string to define which folder Aventus will watch. For             example, if you set "./src/static/*", all files inside the folder "src/static" will be exported.         &nbsp;|
|output|This is string to define where the static files will be exported.         &nbsp;|

## Special files

Inside the static folder, you can write some specials files that will be compiled to be supported by the browser.

### Sass

You can write sass file inside the static folder that will be compiled to a css file. If your file name starts with a <mark>_</mark> Aventus will ignore it. (ex: _reset.scss)

### Global Style

A good practice to develop a website is to declare theme variables and then use it inside your webcomponent. To do that, you can write a file <mark>*.gs.avt</mark> that will be compiled to a css file. The only goal of this file is to provide autocompletion for your css variables declared inside the <mark>:root</mark>.

```css filename=theme.gs.avt
:root {
    --primary-color: #20232a;
    --light-primary-color: #282c34;
    --aventus-color: #e5540e;
    --primary-font-color: white;
    --link-color: #5680ed;
    ...
}
```
