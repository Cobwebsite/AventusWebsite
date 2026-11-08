# compareObject

If you want compare if two objects contains the same information you can use the function <mark>Aventus.compareObject</mark>

```typescript filename=Example.lib.avt
export function test() {

    const obj1 = {
        name:"John",
        todos: ["todo1", "todo2"]
    }

    const obj2 = {
        name:"John",
        todos: ["todo2", "todo1"]
    }

    const obj3 = {
        name:"John",
        todos: ["todo1", "todo3"]
    }

    console.log(Aventus.compareObject(obj1, obj2)); // false: array order differs
    console.log(Aventus.compareObject(obj1, obj2, false)); // true: ignore array order
    console.log(Aventus.compareObject(obj1, obj3)); // false

}
```

The third parameter, <mark>tableOrder</mark>, defaults to <mark>true</mark>. Set it to
    &nbsp;<mark>false</mark> to compare arrays without considering their order. Aventus Date, DateTime, Time,
    Map and watched proxy values are compared by their underlying values.
