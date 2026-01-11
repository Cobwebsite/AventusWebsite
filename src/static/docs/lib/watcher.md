# Library - Watcher

In the Aventus framework, watchable objects serve as dynamic data structures that enable developers to monitor
    changes to their properties. These objects are created using the <mark>Aventus.Watcher.get()</mark> function, which initializes a
    watchable object with optional initial properties and a callback function to handle property changes.

Consider the following example:

```typescript filename=Example.lib.avt
export function runWatcher() {
    const watchableObj = Aventus.Watcher.get({}, (action: Aventus.WatchAction, path: string, value: any) => {
        console.log(Aventus.WatchAction[action] + " on " + path + " with value " + value);
    });
    watchableObj.name = "John"; // Triggers a CREATED action
    // Log: CREATED on name with value "John"
    watchableObj.name = "John Doe"; // Triggers an UPDATED action
    // Log: UPDATED on name with value "John Doe"
    delete watchableObj.name; // Triggers a DELETED action
    // Log: DELETED on name with value "John Doe"
}
```

In this code snippet, <mark>watchableObj</mark> is a watchable object initialized without any initial
    properties. The <mark>Aventus.Watcher.get()</mark> function also accepts a callback function, which is
    invoked whenever a
    property of the watchable object is created, updated, or deleted. This callback function receives parameters
    indicating the action type (<mark>CREATED</mark>, <mark>UPDATED</mark>, or <mark>DELETED</mark>), the path of the property being modified, and its new
    value.

Watchable objects enable developers to reactively respond to changes in data, facilitating real-time updates and
    synchronization across different parts of their applications. By monitoring changes to watchable object properties,
    developers can implement dynamic behaviors and ensure that their applications remain responsive and up-to-date.

The watcher lib is similar to <mark>Signals</mark> that you can find in others frameworks. You can also
    find a <mark>computed</mark> and an <mark>effect</mark> that are functions.

## Signal

You can also use a signal to create a constant that triggers a change when the content is updated. The only difference is that the signal does not track changes in the object's children.

```typescript filename=Example.lib.avt
export function createSignal() {
    const signal = Aventus.Watcher.signal(1);
    // trigger change
    signal.value = 2;

    const signal2 = Aventus.Watcher.signal({ name: "" });
    // don't trigger change
    signal2.value.name = "test";
}
```

## Effect

In Aventus, effects are functions that are executed in response to changes in state or data within your application.
    Effects are created using the <mark>Aventus.Watcher.effect(fn: () =&gt;
        void)</mark> function. Effects are used to perform side-effects such as logging, updating the user
    interface, or interacting with external services.

Effects encapsulate logic to perform specific actions or behaviors whenever their dependencies change. For instance,
    you can define an effect to log a message whenever there is a change in the first name or last name properties of a
    person object.

By separating side-effects from the core logic of your application, effects help to keep your code organized,
    maintainable, and predictable. They promote a declarative programming style, allowing you to focus on what your
    application should do rather than how it should do it.

```typescript filename=Example.lib.avt
export function createEffect() {
    const watchableObj = Aventus.Watcher.get({
        firstname: "John",
        lastname: "Doe"
    });

    Aventus.Watcher.effect(() => {
        console.log(`My name is ${watchableObj.firstname} ${watchableObj.lastname}`);
    })

    watchableObj.firstname = "Jane"; // this will print My name is Jane Doe
}
```

## Computed

In the Aventus framework, computed values are a fundamental concept that allows developers to derive new data based
    on existing data within their applications. Computed values are created using the <mark>Aventus.Watcher.computed(fn: () =&gt; any)</mark> function,
    which enables you to define a function that computes a value based on other data or state variables.

Unlike traditional effects, computed values are expected to return a value. They encapsulate logic to calculate a new
    value based on changes to their dependencies, ensuring that the computed value remains up-to-date whenever its
    dependencies change.

For example, in Aventus, you can define a computed value to calculate the full name of a person based on their first
    name and last name properties. Whenever either the first name or last name changes, the computed value automatically
    updates to reflect the new full name, ensuring consistency and accuracy throughout your application.

Computed values provide a powerful tool for managing derived data and ensuring that your application remains
    responsive to changes in state or data dependencies. By leveraging computed values, developers can streamline their
    code, improve performance, and maintain a clear and consistent data model within their applications.

```typescript filename=Example.lib.avt
export function createComputed() {
    const watchableObj = Aventus.Watcher.get({
        firstname: "John",
        lastname: "Doe"
    });

    const fullName = Aventus.Watcher.computed(() => {
        return `${watchableObj.firstname} ${watchableObj.lastname}`;
    });

    console.log(fullName.value); // write "John Doe"

    watchableObj.firstname = "Jane"; // this will recompute the fullName

    console.log(fullName.value); // write "Jane Doe"
}
```
