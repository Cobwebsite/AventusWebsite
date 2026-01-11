# Introduction

Aventus is a framework that allow you to create complex user interfaces by splitting common parts of a
    front-end application in several well knowned files. It builds on top of standard HTML, CSS, JavaScript
    and provide a way to keep your development under control.

Here is a minimal example:

```typescript filename=/Button/Button.wcl.avt
export class Button extends Aventus.WebComponent implements Aventus.DefaultComponent {
    @Attribute()
    private visible: boolean = true;

    @Property()
    private count: number = 0;

    @Signal()
    private msg: string = "";

    private onClick(): void {
        this.count++;

        if(this.count > 5) {
            this.msg = "That's enough!";
            this.visible = false;
        }
        else if(this.count > 3) {
            this.msg = "Go read the doc instead of clicking this dummy button"
        }
    }
}
```

```css filename=/Button/Button.wcs.avt
:host {
    button {
        background-color: #e5540e;
        border: none;
        border-radius: 5px;
        color: white;
        cursor: pointer;
        padding: 5px 15px;
    }
}
:host(:not([visible])) {
    button {
        display: none;
    }
}
```

```html filename=/Button/Button.wcv.avt
<button @click="onClick">Count is {{ this.count }}</button>
if(this.msg) {
    <p>{{ this.msg }}</p>
}
```

To understand the capabilities of Aventus, you need to learn about the following:

- <mark>Webcomponent</mark>
- <mark>Data / Storage</mark>
- <mark>States</mark>
- <mark>Http Request</mark>
