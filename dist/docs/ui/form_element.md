# UI - FormElement

<mark>FormElement</mark> is the foundation of all input components in Aventus.
    It bridges the gap between your UI (the visible input field) and the form logic managed by <mark>FormHandler</mark>.

Just like the rest of the Aventus UI framework, it is completely design-agnostic: you define how your input looks and
    behaves. Aventus handles the logic, validation, and data synchronization.

## Philosophy

Traditional form systems often couple validation, layout, and styling.
    Aventus takes a different route: logic and UI are separate, but synchronized.

Each <mark>FormElement</mark>:

- Knows its current value
- Syncs automatically with its parent <mark>FormHandler</mark>
- Reacts to validation events
- Exposes change and error callbacks
- Integrates natively with browser forms through <mark>ElementInternals</mark>

This design allows developers to create fully custom input components, from simple text fields to rich custom
    widgets, without rewriting boilerplate logic.

## Overview

<mark>FormElement&lt;T&gt;</mark> is an abstract class that provides:

- Automatic registration inside a Form
- Two-way binding with the FormHandler
- Integrated validation and error reporting
- Native form association (formAssociated = true)
- Built-in event callbacks (onChange, onFormValidation)
- Internal state management (via ElementInternals)

```typescript filename=/MyInput.wcl.avt
import { FormElement } from "Aventus@UI:Aventus.Form.package.avt";

export class MyInput extends FormElement<string> implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props
    @Property()
    public name?: string;
    @Property()
    public label?: string;
    @Attribute()
    public type: string = "text";
    @Attribute()
    public placeholder?: string;

    @Property((target: DocUIFormElementEditor1Input) => {
        target.inputEl.value = target.value ?? "";
    })
    public override value: string = "";
    //#endregion


    //#region variables
    @ViewElement()
    protected inputEl!: HTMLInputElement;
    private focusValue: string = "";
    //#endregion


    //#region constructor

    //#endregion


    //#region methods

    /**
     *
     */
    protected focusInput() {
        this.inputEl.focus();
    }

    /**
     *
     */
    public select() {
        this.inputEl.select();
    }

    /**
     *
     */
    protected onFocus() {
        this.clearErrors();
        this.focusValue = this.inputEl.value;
    }
    /**
    *
    */
    protected onBlur() {
        if(this.inputEl.value == this.focusValue) {
            this.validate();
        }
    }
    /**
    *
    */
    protected onInput() {
        this.triggerChange(this.inputEl.value);
    }

    //#endregion

}
```

```css filename=/MyInput.wcs.avt
:host {
	color: black;
	width: 100%;

	.label {
		color: #eee;
		cursor: pointer;
		display: block;
		font-size: 14px;
		margin-bottom: 6px;
	}

	.input {
		background-color: #eee;
		border: 1px solid gray;
		border-radius: 4px;
		cursor: pointer;
		display: flex;
		padding: 0 8px;
		width: 100%;


		input {
			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
			background-color: transparent;
			border: none;
			color: inherit;
			flex-grow: 1;
			font-size: 15px;
			outline: none;
			outline-style: none;
			padding: 8px 0;
		}
	}

	.errors {
		color: red;
		font-size: 13px;
		margin-top: 6px;
	}
}

:host(:not([label])),
:host([label=""]) {
	.label {
		display: none;
	}
}

:host(:not([has_errors])) {
	.errors {
		display: none;
	}
}

:host([disabled]) {
	.input {
		input {
			background-color: #9e9e9e;
			border-color: #888888;
			box-shadow: none;
			cursor: not-allowed;
		}
	}
}
```

```html filename=/MyInput.wcv.avt
<label for="{{ this.name }}" class="label" @press="focusInput">{{ this.label }}</label>
<div class="input">
    <slot name="before"></slot>
    <input @element="inputEl" type="{{ this.type }}" name="{{ this.name }}" id="{{ this.name }}" placeholder="{{ this.placeholder }}" @focus="onFocus" @blur="onBlur" @input="onInput">
    <slot name="after"></slot>
</div>
<div class="errors">
    for(let error of this.errors) {
        <div>{{ error }}</div>
    }
</div>
```

## Core Behavior

### Automatic Registration

When a <mark>FormElement</mark> is created, it automatically registers itself with its nearest parent
    &nbsp;<mark>Form</mark>. This ensures that the form knows about all inputs and can include them in validation
    or submission processes.


### Value and Error Binding

Aventus provides two-way synchronization between:

- The field's value
- The associated FormHandler's internal state
- The browser's native form API (<mark>ElementInternals</mark>)

### Validation Flow

Every <mark>FormElement</mark> can:

- Define custom validation rules through the <mark>validation()</mark> method
- Participate in form-wide validation triggered by the <mark>FormHandler</mark>

When a validation occurs:

- The element checks its own <mark>validation()</mark> rules.
- The form merges its result with any global validation errors.
- The element updates its <mark>errors</mark> array and sets the proper validity state.

You can override <mark>validation()</mark> in your custom components:

```ts
protected async validation(): Promise<string[]> {
    const errors: string[] = [];
    if (!this.value) errors.push("This field is required");
    return errors;
}
```

### Native Form Integration

Aventus elements are natively compatible with browser <mark>&lt;form&gt;</mark> elements using
    ElementInternals.
    This means:

- You can use them directly inside standard HTML forms.
- The <mark>form.submit()</mark> and <mark>form.reset()</mark> methods will behave normally.
    &nbsp;
- Validation states (<mark>setValidity</mark>) and disabled states are managed automatically.

### Creating a Custom Form Element

Creating a custom form element is simple: extend <mark>FormElement</mark> and implement the rendering
    logic.

## Lifecycle Hooks

|Feature|Description|
|---|---|
|postCreation()|Called after the element is initialized. Registers to the parent Form.|
|postDestruction()|Called when the element is removed. Unregisters from the form.|
|formAssociatedCallback(form)|Invoked when linked to a native HTML form.|
|formDisabledCallback(disabled)|Called when the form or element is disabled.|
|onFormValidation(errors)|Receives and merges validation results.|
|validation()|Define your own validation logic here.|
|triggerChange(value)|Emits value change and updates the handler.|

## Key Features

- Two-way data binding between the UI and the FormHandler
- Integrated validation system with custom and shared rules
- Automatic registration inside forms
- Extendable: build any input component
- Smart error handling and ElementInternals integration
- Design freedom: full control over rendering and layout

## Example Integration

```ts
const loginForm = Form.FormHandler.create({
    email: [Form.Validators.Required, Form.Validators.Email],
});
```

```html
<form-element :form="loginForm">
    <text-input name="email"></text-input>
    <button-element type="submit">Submit</button-element>
</form-element>
```

Each text-input updates and validates through the shared handler. No glue code required.

## Injectable form part (manual wiring)

If your input is used outside of the <mark>Form</mark> web component, you can still connect it to a <mark>FormHandler</mark> by injecting the form part directly. FormElement exposes an <mark>form property</mark> of type <mark>InternalFormPart&lt;T&gt;</mark> that you can set to link the element with the <mark>FormHandler's</mark> field.

When a <mark>form</mark> is injected:

- The element registers itself into the <mark>InternalFormPart</mark> (<mark>register</mark>) so the handler knows about it.
- The element subscribes to <mark>onValueChange</mark> and <mark>onValidation</mark> callbacks from the part.
- Value and error synchronization work the same way as when the element is registered via the <mark>Form</mark> container.

If your framework templating supports binding (example follows AventusJS syntax), you can bind the element directly to the FormHandler part:

```ts
const loginForm = Avenuts.Form.FormHandler.create({
  email: [Avenuts.Form.Validators.Required, Avenuts.Form.Validators.Email],
});
```

```html
<div>
  <!-- declarative injection of the email form part -->
  <text-input name="email" :form="loginForm.parts.email"></text-input>
</div>
```

After assignment input will:

- receive the current value (onValueChange → refreshValueFromForm)
- receive validation callbacks (onFormValidation)
- push value changes back to loginForm.item when triggerChange() is called

Manual wiring is useful when:

- You need to place inputs outside a &lt;form&gt; container (e.g. component composition, portal, popovers).
- You want fine-grained control over which elements are bound to which field.
- You build dynamic forms where fields are created programmatically.

## Summary

<mark>FormElement</mark> is the bridge between visual components and logical form management. It encapsulates:

- Value and error synchronization
- Form registration
- Validation behavior
- Native browser integration

It's the building block for all input components in Aventus : logic-driven, design-free, and extensible by design.
