# UI - Page With Form

The <mark>PageForm</mark> class extends the base Page component to provide a ready-to-use structure for
    form-based pages (e.g., login, signup, profile edit, etc.).

It integrates seamlessly with the <mark>FormHandler</mark> and
    manages form elements, validation, submission, and optional loading states automatically.

## Overview

<mark>PageForm</mark> simplifies creating interactive pages that include forms.

It:

- Automatically manages form creation through a FormHandler.
- Links FormElement and ButtonElement components.
- Provides configurable automatic submission on Enter key press.
- Handles loading states on submit buttons.
- Keeps the form logic self-contained inside the page.

## Example

```typescript filename=/LoginPage/LoginPage.wcl.avt
import { PageForm } from "Aventus@UI:Aventus.Navigation.package.avt";
import { LoginAction, type LoginForm, type LoginResponse } from "../LoginAction.lib.avt";
import { Email, Required } from "Aventus@UI:Aventus.Form.Validators.package.avt";
import type { FormSchema, SubmitFunction } from "Aventus@UI:Aventus.Form.package.avt";
import type { ResultWithError } from "Aventus@Main:Aventus.package.avt";
import type { PageConfig } from "Aventus@UI:Aventus.Navigation.Page.package.avt";

export class LoginPage extends PageForm<LoginForm, LoginResponse> implements Aventus.DefaultComponent {

    //#region methods
    /**
     * @inheritdoc
     */
    protected override formSchema(): FormSchema<LoginForm> {
        return {
            email: [Required, Email],
            password: Required
        };
    }
    /**
     * @inheritdoc
     */
    protected override async defineSubmit(submit: (fct: SubmitFunction<LoginForm, LoginResponse>) => Promise<ResultWithError<LoginResponse> | null>): Promise<ResultWithError<LoginResponse> | null> {
        return await submit(LoginAction);
    }
    /**
     * @inheritdoc
     */
    public override configure(): PageConfig {
        return {
            title: "Login",
            description: "Login page",
            destroy: true
        };
    }

    //#endregion

}
```

```css filename=/LoginPage/LoginPage.wcs.avt
:host {

}
```

```html filename=/LoginPage/LoginPage.wcv.avt
<my-input name="email" :form="this.form.parts.email"></my-input> <!-- Link input to the form -->
<my-input type="password" name="password" :form="this.form.parts.password"></my-input>
<button-element type="submit">Login</button-element> <!-- will submit the form -->
```

```typescript filename=/LoginAction.lib.avt
import type { ResultWithError } from "Aventus@Main:Aventus.package.avt";

export type LoginForm = { email: string; password: string; };
export type LoginResponse = { token: string; };

export function LoginAction(form: LoginForm): Promise<ResultWithError<LoginResponse>> {
    // login action
}
```

## Configuration

You can override <mark>pageConfig()</mark> to change these behaviors:

```ts filename=LoginPage.wcl.avt
protected override pageConfig(): Aventus.Navigation.PageFormConfig {
    return {
        autoLoading: true, // if true, any registered submit buttons will automatically show a loading state during form submission. Default is true.
        submitWithEnter: true, // if true, pressing Enter on the last registered form field automatically submits the form. Default is true.
    }
}
```

## Integration with FormHandler

<mark>PageForm</mark> automatically creates a <mark>FormHandler</mark> instance:

```ts
this._form = new FormHandler(this.formSchema(), this.formConfig());
// you can access the form via : this.form
```

## Behavior Summary

|Feature|Description|
|---|---|
|Automatic FormHandler setup|Creates and manages a form based on a schema.|
|Keyboard Submission|Optional automatic submission on Enter.|
|Automatic Button Loading|Applies loading animation to registered buttons.|
|Type-safe schema|Ensures validation and submission logic matches form types.|
|Built-in lifecycle|Works seamlessly with the Page system (visibility, navigation, etc.).|
