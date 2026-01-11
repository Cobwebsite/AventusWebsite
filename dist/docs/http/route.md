# Route

The <mark>HttpRoute</mark> class represents a controller layer that uses a <mark>HttpRouter</mark> to perform requests.
It's designed to group related endpoints under a single class, just like a controller in traditional MVC frameworks.

## Overview

A HttpRoute:

- Holds a reference to a <mark>HttpRouter</mark> (either provided or automatically created).
- Defines a base prefix for its routes via <mark>getPrefix()</mark>.
- Can expose multiple request methods that use this router to perform actions.

## Constructor

```ts
public constructor(router?: HttpRouter)
```

- If a router is provided, it will be used for all requests.
- If not, a default new HttpRouter instance is created.

## Example: Basic Controller

```ts
export class AuthLoginController extends Aventus.HttpRoute {
    @BindThis()
    public async request(body: Request): Promise<Aventus.ResultWithError<string>> {
        const request = new Aventus.HttpRequest(
            `${this.getPrefix()}/api/login`,
            Aventus.HttpMethod.POST
        );
        request.setBody(body);
        return await request.queryJSON<string>(this.router);
    }
}
```

This controller:

- Uses the router from the base HttpRoute.
- Sends a POST request to /api/login.
- Returns a typed response (ResultWithError&lt;string&gt;).

## Example: Advanced Usage with Custom Router

You can also extend both <mark>HttpRouter</mark> and <mark>HttpRoute</mark> together:

```ts
export class SettingsRouter extends Aventus.HttpRouter {
    protected override defineOptions(options: Aventus.HttpRouterOptions): Aventus.HttpRouterOptions {
        options.url = location.protocol + "//" + location.host + "/settings";
        return options;
    }
}

export class SettingsRoute extends Aventus.HttpRoute {
    public constructor(router?: Aventus.HttpRouter) {
        super(router ?? new SettingsRouter());
    }

    @BindThis()
    public async save(body: Settings | FormData): Promise<Aventus.VoidWithError> {
        const request = new Aventus.HttpRequest(`${this.getPrefix()}/save`, Aventus.HttpMethod.POST);
        request.setBody(body);
        return await request.queryVoid(this.router);
    }

    @BindThis()
    public async get(): Promise<Aventus.ResultWithError<Settings>> {
        const request = new Aventus.HttpRequest(`${this.getPrefix()}/get`, Aventus.HttpMethod.GET);
        return await request.queryJSON<Settings>(this.router);
    }
}
```

Together, they form a modular, extensible HTTP layer where:

- Routers define where requests go.
- Routes define what requests do.
