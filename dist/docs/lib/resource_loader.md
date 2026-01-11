# Library - ResourceLoader

To load content from uri, you can use the fetch API in mordern browser. The only problem is that every time you need
    this resource, you have to reload it again and again. To avoid this you can use <mark>Aventus.ResourceLoader</mark>. Two method can be used :

- <mark>load</mark> that will return you the resource as a string (base64 for img resource).
- <mark>loadInHead</mark> that will append a style or script tag in head.

When a resource is loaded, the resource laoder will keep it in memory or prevent adding twice a tag in head.

```typescript filename=Example.wcl.avt
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

	public async load() {

		// return the content of the svg
		const svgContent = await Aventus.ResourceLoader.load('/img.svg');
		const svgContent2 = await Aventus.ResourceLoader.load({
			type: "svg",
			url: "/img.svg"
		});

		// load the tag <link rel="stylesheet" href="/style.css">
		const hasError = await Aventus.ResourceLoader.loadInHead("/style.css");
		const hasError2 = await Aventus.ResourceLoader.loadInHead({
			type: "css",
			url: "/style.css"
		});
	}

}
```

By default Aventus will try to determine the type you want by analyze the extension set inside the uri. If it fails, you can specify the type you need by adding the <mark>type</mark> parameter.
