# UI - Form

The Form system in Aventus provides a powerful and flexible foundation for managing form logic (validation, state
    tracking, data submission, and error handling) all without enforcing any visual design.

Just like the rest of Aventus UI, it focuses on behavior over presentation. You bring the HTML and CSS; Aventus
    brings the logic, validation, and lifecycle.

## Overview

The <mark>Form</mark> module allows you to define, validate, and handle complex forms in a structured and
    reusable way.

It separates form logic from UI rendering, giving you a system that can handle:

- Input registration and tracking
- Field-level and global validation
- Form submission and execution
- Error mapping and feedback
- Async submission functions
- Custom validator classes

Aventus forms can be used both declaratively (via Web Components) and programmatically (via the FormHandler API).

## Core Architecture

### Form

The <mark>Form</mark> class represents a logical container for form elements and submit buttons. It
    coordinates validation and submission by connecting to a <mark>FormHandler</mark>.

Key responsibilities:

- Registers input elements (<mark>FormElement</mark>) and submit buttons (<mark>ButtonElement</mark>)
- Tracks keyboard interactions (e.g. pressing Enter)
- Delegates validation and submission to the associated <mark>FormHandler</mark>
- Provides <mark>onSubmit</mark> event callbacks

### FormHandler

The <mark>FormHandler</mark> class is the engine behind every form. It manages the internal state,
    validation rules, and submission flow.

A <mark>FormHandler</mark> is typically created from a schema that describes the structure and validation
    logic of your data:

```ts
const form = Aventus.Form.FormHandler.create({
    email: Aventus.Form.Validators.Email,
    password: [Aventus.Form.Validators.Required],
});
```

or equivalently:

```ts
const form = new Aventus.Form.FormHandler({
    email: { validate: new Aventus.Form.Validators.Email() },
    password: { validate: new Aventus.Form.Validators.Required() },
});
```

You can also specify a global configuration or default validation behavior using:

```ts
Aventus.Form.FormHandler.configure({
    validateOnChange: true,
});
```

## How It Works

### 1. Schema Definition

A schema defines each field in the form and its validation rules:

```typescript
type LoginSchema = {
    name: string;
    email: string;
    password: string;
};
const schema: Aventus.Form.FormSchema<LoginSchema> = {
    name: {},
    email: new Aventus.Form.Validators.Email(),
    password: new Aventus.Form.Validators.Required(),
};
```

This schema tells the form handler how to validate each field.

### 2. FormHandler Creation

```ts
const handler = Aventus.Form.Form.create(schema, {
    validateOnChange: true,
});
```

You can attach this handler to a Form component:

```html
<av-form :form="this.handler"></av-form>
```

### 3. Validation

Validation is performed at two levels:

- Field-level validation (defined in the schema)
- Global validation (defined via FormHandlerConfig.validate)

Aventus supports both synchronous and asynchronous validators.

Example :

```ts
const valid = await handler.validate(); // validates all fields
const emailValid = await handler.validate("email"); // only one field
```

If validation fails and there’s no registered UI element for a field, Aventus calls the handler’s error function:

```ts
handleValidateNoInputError: (errors) => {
    console.warn("Unmapped validation errors:", errors);
}
```

### 4. Submission

Once validation passes, you can submit your form:

```ts
await handler.submit(async (body) => {
    // simulate API call
    return api.login(body);
});
```

<mark>submit()</mark> automatically:

- Validates the form
- Calls your submission function
- Handles and maps any backend errors

If an input is associated with a field that produced an error, the handler pushes the error message into that element’s errors array automatically. Otherwise, the function <mark>handleExecuteNoInputError</mark> is called.

## Validators

Validators in Aventus are simple classes that implement a single method: validate().

### Example: Required

```ts
export class Required extends Validator<any> {
    public static msg = "The field {name} is required";
    public override validate(value: any | undefined, name: string): string | boolean {
        const msg = Required.msg.replace(/{ *name *}/g, name);
        if (value == null || value === "") return msg;
        return true;
    }
}
```

You can also chain validators in a schema:

```ts
const schema = {
    email: [Aventus.Form.Validators.Required, Aventus.Form.Validators.Email],
};
```

## Key Features

|Feature|Description|
|---|---|
|Schema-based validation|Define form logic declaratively|
|Two-way data binding|Auto-syncs between form data and UI|
|Two-way data binding|Works with async or server-side validators|
|Global config|Default validation and error handlers|
|Automatic error mapping|Links backend or validator errors to form fields|
|No styling enforced|You handle visuals, Aventus handles logic|

## Example: Complete Login Form

## Summary

Aventus Forms provide a logic-first, design-free approach to handling forms:

- Smart: automatic validation, submission, and state tracking
- Modular: validators, fields, and forms are decoupled and reusable
- Design-free: you control every pixel of UI
- Efficient: less repetitive code, consistent behavior everywhere
