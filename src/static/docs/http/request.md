# Request

The <mark>HttpRequest</mark> class provides a robust abstraction over the native fetch API.
    It integrates tightly with Aventus error management system (<mark>ResultWithError</mark>, <mark>VoidWithError</mark>) and supports advanced features like automatic JSON/FormData handling,
    middleware, and method spoofing.

## Overview

The class is designed to simplify request management while remaining flexible and framework-agnostic.

Key features:

- Automatic serialization (JSON or FormData)
- Optional method spoofing (_method fields for PUT/DELETE)
- Unified error/result handling
- Lifecycle hooks for pre- and post-processing requests
- Built-in support for file uploads and nested object serialization

## Static Configuration

Registers global configuration options that affect all HTTP requests.

```ts
HttpRequest.configure({
  beforeSend: async (request) => {
    // Add auth headers or cancel request
    request.setHeader("Authorization", "Bearer token");
    return new VoidWithError();
  },
  responseMiddleware: async (response, request) => {
    // Global response interceptor
    if(response.containsCode(401)) {
        location.path = "/login";
    }
    return response;
  },
});
```

## Create a request

Creates a new HTTP request via constructor:

```ts
const request = new HttpRequest("/api/users", HttpMethod.POST, {
    name: "Alice",
    age: 28,
});
```

Or with setters:

```ts
const request = new HttpRequest("/api/users");
request.setMethod(HttpMethod.POST);
request.setBody({
    name: "Alice",
    age: 28,
});
// request.enableMethodSpoofing();
```

## Body Serialization

The <mark>HttpRequest</mark> class automatically detects how to encode the body:

- If it contains File objects or arrays of files → it uses <mark>FormData</mark>.
- Otherwise → it serializes the body as JSON

## Query Methods

All query methods return either a <mark>ResultWithError&lt;T&gt;</mark> or a <mark>VoidWithError</mark>, ensuring safe and typed responses.

### query

Executes the request and returns the raw Response object, wrapped in a ResultWithError.

```ts
const result = await request.query();
if (!result.success) return console.error(result.errors);
```

### queryJSON

Parses the response as JSON and automatically transforms it into the expected type.

```ts
const result = await request.queryJSON<User>();
if (result.success) console.log(result.result);
```

### queryTxt

Reads the response as plain text.

```ts
const result = await request.queryTxt();
console.log(result.result);
```

### queryBlob

Reads the response as a binary blob, useful for files or images.

```ts
const result = await request.queryBlob();
saveAs(result.result, "file.pdf");
```

### queryVoid

For endpoints that return no data (e.g., DELETE requests or 204 No Content responses).

```ts
const result = await request.queryVoid();
if (!result.success) console.error(result.errors);
```

## Integration with HttpRouter

You can optionally provide a <mark>HttpRouter</mark> instance to prefix relative URLs or manage base routes dynamically.

```ts
const userRouter = new HttpRouter({ url: "/api/users" });
const req = new HttpRequest("/1", HttpMethod.GET);
const result = await req.queryJSON<User>(userRouter);
```

This produces a request to /api/users/1.
