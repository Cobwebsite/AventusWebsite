# VoidWithError

<mark>Aventus.VoidWithError</mark> represents the result of an action that may produce errors but does not
    return
    a specific result value. It encapsulates the outcome of the action along with any errors that occur during its
    execution. This class is useful when you want to handle the success or failure of an action without necessarily
    needing a result value.

```typescript filename=Example.lib.avt
const validation = SomeValidation.validate(data);
if (validation.success) {
    // Proceed with further operations
} else {
    // Handle validation errors
    console.error("Validation errors:", validation.errors);
}
```
