# Webcomponent - Select element

In this section you are going to learn how to select a element from your shadowroot to use it inside your logical
    part.

## Normal case

Inside the <mark>*.wcv.avt</mark> file you can add an attribute <mark>@element</mark> to tag
    your element.

```html filename=Img.wcv.avt
<div class="img-container" @element="container">
	<img @element="imgEl"/>
</div>
```

When you save your file, the attribute <mark>@element</mark> will be underlined in red because you didn't
    declare the variable
    inside the <mark>*.wcl.avt.</mark> You can open this file and if you have sections, the variables section
    will be underline. You
    can <mark>ctrl + .</mark> and click on <mark>"Import missing view element"</mark>. This will create the two variables with a <mark>protected</mark>
    modifier and a decorator <mark>@ViewElement</mark>. This decorator is set to have a quick vision on which
    variables are
    used inside your view.

```typescript filename=Img.wcl.avt
export class Img extends Aventus.WebComponent implements Aventus.DefaultComponent {

	//#region static

	//#endregion

	//#region props

	//#endregion

	//#region variables
	@ViewElement()
	protected container: HTMLDivElement;

	@ViewElement()
	protected imgEl: HTMLImageElement;
	//#endregion

	//#region constructor

	//#endregion

	//#region methods

	//#endregion

}
```

## Multiple selection

In addition, you can use the same element name for different tags. It will select all the tags marked by the element
    name.

```html filename=List.wcv.avt
<div class="list">
	<div class="item" @element="items"></div>
	<div class="item" @element="items"></div>
	<p class="item" @element="items"></p>
</div>
```

```typescript filename=List.wcl.avt
export class List extends Aventus.WebComponent implements Aventus.DefaultComponent {

	//#region static

	//#endregion

	//#region props

	//#endregion

	//#region variables
	@ViewElement()
	protected items: (HTMLDivElement | HTMLParagraphElement)[];
	//#endregion

	//#region constructor

	//#endregion

	//#region methods

	//#endregion

}
```

## Expert use only

If you change your <mark>shadowroot</mark> by cloning node or something else, you can add a
    useLive option inside the decorator <mark>@ViewElement</mark> to do a <mark>querySelector</mark> instead of using saved values.

```typescript filename=Img.wcl.avt
export class Img extends Aventus.WebComponent implements Aventus.DefaultComponent {

	//#region static

	//#endregion

	//#region props

	//#endregion

	//#region variables
	@ViewElement({
		useLive: true // this code ll do a this.shadowroot.querySelector.
	})
	protected container: HTMLDivElement;

	@ViewElement()
	protected imgEl: HTMLImageElement;
	//#endregion

	//#region constructor

	//#endregion

	//#region methods

	//#endregion

}
```
