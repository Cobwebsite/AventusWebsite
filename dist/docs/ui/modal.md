# UI - Modal

The <mark>Modal</mark> component provides a flexible framework for creating modal dialogs in Aventus
    applications.
    It supports promise-based resolution and rejection, allowing developers to use modals as asynchronous prompts that
    return data or cancellation results.

## Overview

ModalElement is an abstract base class designed to handle modal logic such as:

- showing and hiding modals
- resolving or rejecting user actions
- automatic closure via Escape key or click outside
- customizable options for behavior and rejection values

Developers should extend this class to create specific modal components (confirmation dialogs, forms, alerts, etc.).


## Example

```typescript filename=/Example/Example.wcl.avt
import { Modal } from "../Modal/Modal.wcl.avt";

export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @Watch()
    public txt?: string;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods

    /**
     *
     */
    protected async openModal() {
        const confirm = new Modal();
        confirm.question = "Do you accept?"
        const isAccepted = await confirm.show();
        if(isAccepted) {
			this.txt = "Accepted"
        }
		else {
			this.txt = "Refused"
		}
    }

    //#endregion

}
```

```css filename=/Example/Example.wcs.avt
:host {

}
```

```html filename=/Example/Example.wcv.avt
<button @press="openModal">Open modal</button>
<div>Result is : {{ this.txt }}</div>
```

```typescript filename=/Modal/Modal.wcl.avt
import { ModalElement } from "Aventus@UI:Aventus.Modal.package.avt";

export class Modal extends ModalElement<boolean> implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @Watch()
    public question?: string;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    /**
     * @inheritdoc
     */
    public override configure(): Aventus.Modal.ModalOptions<boolean> {
        return {
            closeWithClick: false,
            closeWithEsc: false,
        };
    }


    /**
     *
     */
    protected accept() {
        this.resolve(true);
    }


    //#endregion

}
```

```css filename=/Modal/Modal.wcs.avt
:host {
	align-items: center;
	background: rgba(0, 0, 0, 0.7);
	display: flex;
	inset: 0;
	justify-content: center;
	position: fixed;
	z-index: 60;
	font-size: 16px;

	.modal {
		background-color: var(--secondary-color);
		border-radius: 12px;
		box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
		max-width: 500px;
		padding: 24px;
		position: relative;
		text-align: left;
		transform: translateZ(0);
		transition: all 0.2s ease-in-out;
		width: 100%;

		.modal-header {
			align-items: flex-start;
			display: flex;
			justify-content: space-between;

			.modal-title {
				color: #ffffff;
				line-height: 24px;
				margin: 0;
			}

			.close {
				cursor: pointer;
				margin-right: -12px;
				margin-top: -12px;
			}
		}

		.modal-body {
			color: var(--color-light);
			margin-top: 16px;

			::slotted(p) {
				margin-bottom: 16px;
			}
		}

		.footer {
			display: flex;
			gap: 8px;
			justify-content: flex-end;
			margin-top: 16px;

			av-button {
				font-size: 14px;
			}
		}
	}

}
```

```html filename=/Modal/Modal.wcv.avt
<div class="modal-header">
    <h3 class="modal-title">Confirm</h3>
    <mi-icon icon="close" class="close" @press="reject"></mi-icon>
</div>
<div class="modal-body">{{this.question}}</div>
<div class="footer">
    <av-button @press="reject">No</av-button>
    <av-button @press="accept">Yes</av-button>
</div>
```

## ModalElement Class

ModalElement&lt;T, U extends ModalOptions&lt;T&gt; = ModalOptions&lt;T&gt;&gt; defines the core functionality for
    modals.
    It manages showing, closing, resolving, and rejecting, using built-in support for keyboard and click interactions.


|Method|Description|
|---|---|
|show(element?: Element): Promise&lt;T | null&gt;|Displays the modal and returns a Promise that resolves when the modal is either resolved or rejected.|
|resolve(response: T, no_close?: boolean)|Resolves the modal with a given response value. If no_close=true, the modal remains open after resolving.|
|reject(no_close?: boolean)|Rejects the modal with the defined rejectValue. If no_close=true, the modal remains open after rejecting.|

Developpers can also add custom options to modal by providing an interface that extends from <mark>ModalOptions</mark>.

## ModalOptions Interface

Defines the modal's configurable behaviors.

|Option|Type|Default|Description|
|---|---|---|---|
|closeWithEsc|boolean|true|Whether the modal should close when pressing the Escape key.|
|closeWithClick|boolean|true|Whether clicking outside the modal should close it.|
|rejectValue|T | null|null|The value returned when the modal is dismissed or canceled.|

Developers can extends this interface to allow more options. For example if the modal has the close icon that is
    configurable.

```ts
interface ModalOptions<T = any> =  Aventus.Modal.ModalOptions<T> & {
    closeIcon?: boolean
}

export abstract class Modal extends ModalElement<boolean, ModalOptions<boolean>> implements Aventus.DefaultComponent {

}
```

## Static Configuration

You can globally configure default modal behavior:

```ts
Aventus.Modal.ModalElement.configure({
    closeWithClick: false,
    rejectValue: null
});
```
