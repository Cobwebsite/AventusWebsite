# GenericError

When you create function that can fail you can use the error strategy developed by Aventus. Instead of returning the
    function result, the result is wrapped inside an container named <mark>GenericError</mark>, <mark>VoidWithError</mark>, and <mark>ResultWithError</mark>. They are all
    useful tools for managing errors and results in your application. They provide a structured way to represent error
    conditions and action outcomes, helping you write more robust and maintainable code.

<mark>Aventus.GenericError</mark> is a generic error class that provides a structured way to represent
    errors in your application. It
    allows you to define an error code along with a message to describe the error. The error code can be of any type
    that extends either number or an enumeration (Enum). By extending GenericError, you can create specific error types
    tailored to different error scenarios in your application.

```typescript filename=Example.lib.avt
// Define an enumeration for error codes
export enum MyErrorCode {
    NotFound = 404,
    InvalidInput = 400,
    InternalServerError = 500
}
// Create a specific error class extending GenericError
export class MyError extends GenericError<MyErrorCode> { }
```
