# UI - Process

The <mark>Process</mark> class is a lightweight helper designed to standardize API or asynchronous
    operation handling — especially when using Aventus <mark>ResultWithError</mark> or <mark>VoidWithError</mark> patterns.

It provides a unified way to:

- Execute async operations that return an Aventus.ResultWithError or Aventus.VoidWithError.
- Automatically handle and display errors via a configurable global handler.
- Extract the success result when no errors occur.

## Overview

When working with backend routes, forms, or other async processes in Aventus, many functions return structured
    results containing both <mark>value</mark> and <mark>errors</mark>.
    The <mark>Process</mark> utility simplifies how you handle these cases by centralizing error parsing and
    handling.

## Example

```ts
// Sets up a global error handler that is automatically invoked whenever an operation fails.
Process.configure({
    handleErrors: (msg) => {
        Alert.open({
            title: "Execution error",
            content: msg,
        });
    }
});
// Use the utility to handle an async route call
async function login() {
	const result = await Process.execute(new AuthRoute().login({
		email: "user@test.com",
		password: "secret"
	}));
	if (result) {
		console.log("Login success:", result);
	} else {
		console.log("Login failed — errors were handled globally");
	}
}
```
