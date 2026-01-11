# UI - Tabs System

The <mark>Tabs system</mark> provides a flexible structure for managing and displaying tabbed interfaces. It separates the logic of tab content, tab headers, and overall container behavior, allowing developers to easily customize the appearance and interaction model.

## Overview

The <mark>Tabs</mark> component manages a collection of <mark>Tab</mark> elements, each associated with a <mark>TabHeader</mark>.
It handles tab switching, active state management, and layout rendering.

Developers can extend the abstract classes <mark>Tabs</mark>, <mark>Tab</mark>, and <mark>TabHeader</mark> to define their own UI and behavior while keeping consistent tab logic.

## Example

```typescript filename=/Example/Example.wcl.avt
export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

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

```css filename=/Example/Example.wcs.avt
:host {

}
```

```html filename=/Example/Example.wcv.avt
<av-tabs>
    <av-tab label="Page1" icon="home">
        <p>Page 1</p>
    </av-tab>
    <av-tab label="Page2">
        <p>Page 2</p>
    </av-tab>
    <av-tab label="Page3" count="3">
        <p>Page 3</p>
    </av-tab>
</av-tabs>
```

```typescript filename=/Tab/Tab.wcl.avt
import type { IconType } from "MaterialIcon:MaterialIcon.package.avt";

export class Tab extends Aventus.Layout.Tabs.Tab implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props
    @Property()
    public label: string = "";
    @Property()
    public count!: number;
    @Property()
    public icon?: IconType;
    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    /**
     * @inheritdoc
     */
    public override identifier(): string {
        return this.label;
    }

    //#endregion

}
```

```css filename=/Tab/Tab.wcs.avt
:host {
	width: 100%;
}
```

```html filename=/Tab/Tab.wcv.avt
<slot></slot>
```

```typescript filename=/TabHeader/TabHeader.wcl.avt
import type { Tab } from "../Tab/Tab.wcl.avt";

export class TabHeader extends Aventus.Layout.Tabs.TabHeader<Tab> implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @ViewElement()
    protected countEl!: HTMLSpanElement;
    @ViewElement()
    protected iconEl!: MaterialIcon.Icon;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    /**
     * @inheritdoc
     */
    public override render(): Aventus.Asyncable<void> {
        this.innerHTML = this.tab.label;
        if(this.tab.count) {
            this.countEl.innerHTML = this.tab.count + '';
        }
        if(this.tab.icon) {
            this.iconEl.icon = this.tab.icon;
        }
    }

    //#endregion

}
```

```css filename=/TabHeader/TabHeader.wcs.avt
:host {
	align-items: center;
	background: none;
	border: none;
	border-bottom: 2px solid transparent;
	color: #94a3b8;
	cursor: pointer;
	display: flex;
	font-size: 0.875rem;
	font-weight: 500;
	padding: 1rem 0.5rem;

	mi-icon {
		font-size: 1rem;
		margin-right: 0.5rem;
	}

	mi-icon[icon=""] {
		display: none;
	}

	.count {
		background-color: #334155;
		border-radius: 9999px;
		color: #cbd5e1;
		font-size: 0.75rem;
		margin-left: 0.5rem;
		padding: 0.125rem 0.5rem;
	}

	.count:empty {
		display: none;
	}
}

:host(:hover) {
	border-color: #334155;
	color: #cbd5e1;
}

:host([active]) {
	border-color: #e5540e;
	color: #e5540e;
}
```

```html filename=/TabHeader/TabHeader.wcv.avt
<mi-icon icon="" @element="iconEl"></mi-icon>
<span><slot></slot></span>
<span class="count" @element="countEl"></span>
```

```typescript filename=/Tabs/Tabs.wcl.avt
import type { Tab } from "../Tab/Tab.wcl.avt";
import { TabHeader } from "../TabHeader/TabHeader.wcl.avt";

export class Tabs extends Aventus.Layout.Tabs.Tabs<Tab, TabHeader> implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    /**
     * @inheritdoc
     */
    protected override defineTabHeader(): new (...args: any[]) => TabHeader {
        return TabHeader;
    }

    //#endregion

}
```

```css filename=/Tabs/Tabs.wcs.avt
:host {
	width: 100%;

	.header {
		border-bottom: 1px solid var(--border);
		display: flex;
		gap: 2rem;
		margin-top: 2rem;
	}

	.body {
		width: 100%;
	}
}
```

```html filename=/Tabs/Tabs.wcv.avt
<slot></slot>
```

## Tabs Class

<mark>Tabs&lt;T extends Tab, U extends TabHeader&lt;T&gt;&gt;</mark> is an abstract class that manages:

- the list of tabs and their headers
- which tab is currently active
- tab visibility and selection state

Developers must implement the <mark>defineTabHeader()</mark> method to specify which header component should be used.

Developers can also use the method <mark>setActive(tabHeader: TabHeader&lt;T&gt; | number | string)</mark> to set the active tab by reference, index, or tab identifier.

 **Behavior** 

- Tabs are hidden until selected.
- The first tab is automatically activated unless another one is marked as selected.
- The <mark>Tabs</mark> component controls both visual state and logical state (selected attribute).

## Tab Class

<mark>Tab</mark> represents the  **content**  of a tab, and provides the connection point between tab data and its header. To implement a <mark>Tab</mark>, the method <mark>identifier() : string</mark> have to be implemented.

When the tab is active, the attribute <mark>selected</mark> is set to true.

## TabHeader Class

<mark>TabHeader&lt;T extends Tab&gt;</mark> represents the clickable tab title associated with a <mark>Tab</mark>. It handles user interaction and manages synchronization between UI and logic.

The method <mark>render()</mark> must be implemented. The property <mark>tab : T</mark> is useful to get data from the <mark>Tab</mark> during rendering.

```ts
/**
 * @inheritdoc
 */
public override render(): Aventus.Asyncable<void> {
    this.innerHTML = this.tab.label;
}
```

When the tab is active, the attribute <mark>active</mark> is set to true.

## Lifecycle

- Tabs and their headers are initialized in <mark>postCreation()</mark>.
- Each Tab registers itself with a dynamically created <mark>TabHeader</mark>.
- The first tab (or the one marked as <mark>selected</mark>) becomes active.
- When a header is pressed, <mark>Tabs.setActive()</mark> hides the previous tab and shows the new one.
