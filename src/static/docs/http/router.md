# Router

The <mark>HttpRouter</mark> class defines the base endpoint configuration for HTTP requests in the Aventus
    framework.
    It acts as the root router used by all requests to determine the base URL and to perform RESTful operations.

## Overview

A HttpRouter instance is responsible for:

- Defining the base URL (via its options).
- Providing helper methods for common HTTP verbs (get, post, put, delete, option).
- Automatically integrating with the <mark>HttpRequest</mark> system, which handles body parsing,
        headers, and response transformation.

You can subclass <mark>HttpRouter</mark> to customize its endpoint behavior or base URL.

By default, the router's base URL is set to the current domain:

```ts
location.protocol + "//" + location.host
```

## Example

```ts
export class PersonRouter extends Aventus.HttpRouter {
    protected override defineOptions(options: Aventus.HttpRouterOptions): Aventus.HttpRouterOptions {
        options.url = location.protocol + "//" + location.host + "/person";
        return options;
    }
}

// Usage:
const router = new PersonRouter();
const result = await router.get<Person[]>("/units");
```
