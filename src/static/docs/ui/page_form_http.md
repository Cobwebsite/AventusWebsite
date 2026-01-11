# UI - Page With Form And Http

The <mark>PageFormRoute</mark> class extends <mark>PageForm</mark> to provide an automatic bridge between form pages and HTTP
    route classes (<mark>Aventus.HttpRoute</mark>).

It simplifies submitting forms directly to backend routes by automatically resolving the corresponding HTTP method
    and handling the response.

## Overview

<mark>PageFormRoute</mark> is a specialized version of <mark>PageForm</mark> designed for
    API-backed pages.
    It automatically connects a form's submission to a backend route (defined by an <mark>Aventus.HttpRoute</mark> class).
    This eliminates repetitive code for sending form data to API endpoints and processing responses.

## Example

```typescript filename=/LoginPage/LoginPage.wcl.avt
import { PageFormRoute } from "Aventus@UI:Aventus.Navigation.package.avt";
import { LoginController, type LoginRequest } from "../LoginAction.lib.avt";
import type { ResultWithError } from "Aventus@Main:Aventus.package.avt";
import { Required } from "Aventus@UI:Aventus.Form.Validators.package.avt";

export class LoginPage extends PageFormRoute<typeof LoginController> implements Aventus.DefaultComponent {


    //#region methods
    /**
     * @inheritdoc
     */
    public override route(): typeof LoginController {
        return LoginController;
    }
    /**
     * @inheritdoc
     */
    public override onResult(result: ResultWithError<string> | null): Aventus.Asyncable<void> {
        if(result?.success) {
            //...
        }
    }
    /**
     * @inheritdoc
     */
    protected override formSchema(): Aventus.Form.FormSchema<LoginRequest> {
        return {
            username: Required,
            password: Required
        };
    }
    /**
     * @inheritdoc
     */
    public override configure(): Aventus.Asyncable<Aventus.Navigation.Page.PageConfig> {
        return {
            title: "Login"
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
<my-input name="username" :form="this.form.parts.username"></my-input> <!-- Link input to the form -->
<my-input type="password" name="password" :form="this.form.parts.password"></my-input>
<button-element type="submit">Login</button-element> <!-- will submit the form -->
```

```typescript filename=/LoginAction.lib.avt
export class LoginRequest {
    public username!: string;
    public password!: string;
}


export class LoginController extends Aventus.HttpRoute {
    @BindThis()
    public async request(body: LoginRequest): Promise<Aventus.ResultWithError<string>> {
        const request = new Aventus.HttpRequest(`${this.getPrefix()}/api/login`, Aventus.HttpMethod.POST);
        request.setBody(body);
        return await request.queryJSON<string>(this.router);
    }
}
```

Or if controller contains multiple function

## How It Works

When a PageFormRoute is submitted:

- It calls this.beforeSubmit() (optional override hook).
- It retrieves the route via the abstract route() method.
- It automatically calls the corresponding HTTP method (router[key]) of your defined route.
- The response is passed to this.onResult(result) for custom handling.

If the route class has multiple public methods but you don't specify one explicitly, an error is thrown to prevent
    ambiguity.
