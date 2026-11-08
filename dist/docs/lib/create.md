# Library

In this section you are going to learn what is a library and how you can create it inside Aventus.

## Definition

A library is a piece of code that isn't matching any previous file type. This is the only file type that can contain
    exported functions. You can also declare and export constants or variables at the root of a library file.


```typescript filename=Test.lib.avt
export const answer = 42;

export function myFunction(){
...
}

export class MyClass {
...
}

export type MyType = ...

export interface MyInterface {
...
}

export enum MyEnum {
...
}
```

To keep a clean project, we advise you to not write all your code inside <mark>*.lib.avt</mark> even if
    you can do it. The goal of Aventus is to keep everything tidy.

The following sections are libraries that are included inside Aventus.
