# Data

In this section you are going to learn what is a data and how you can create it inside Aventus.

## Definition

A data is a class that define an object structure. This class reflects what the application will contain. This is the
    backbone of your application and most of the times, all data structures will be a copy from your backend object.

## Inside Aventus

Inside Aventus you can create a new Data class by right clicking on the explorer part inside vscode, choose
    &nbsp; *Aventus
        : Create...*  and choose  *Data* . Inside the input you can enter the name for the class. This will create
    a basic data class:


```typescript filename=/ExampleData/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
	public id: number = 0;
}
```

```json filename=/ExampleData/aventus.conf.avt
{
    "module": "ExampleData",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ],
            "compile": [
                {
                    "output": "./dist/helloaventus.js"
                }
            ]
        }
    ]
}
```

All classes inside a <mark>*.data.avt</mark> must implements <mark>Aventus.IData</mark>. This
    will ensure that each data class instance can be identified by the <mark>$type</mark> field that must be
    unique. Furthermore, a static field named <mark>Fullname</mark> must be implemented.

```typescript filename=/ExampleData/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
	public id: number = 0;
}
```

```typescript filename=/ExampleData/src/Test.lib.avt
import { Person } from "./Person.data.avt";

export class Test {
    public demo() {
        console.log(Person.Fullname);
        let p = new Person();
        console.log(p.$type);
        // $type and Fullname must be identical
    }
}
```

```json filename=/ExampleData/aventus.conf.avt
{
    "module": "ExampleData",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ],
            "compile": [
                {
                    "output": "./dist/helloaventus.js"
                }
            ]
        }
    ]
}
```


    By default your data class extends <mark>Aventus.Data</mark> with the following impletemented properites
    :


```typescript filename=Data.data.avt
export abstract class Data implements IData {
    /**
    * The class schema / This field is defined during compilation
    */
    public static get $schema(): { [prop: string]: string; };
    /**
    * The current namespace / This field is defined during compilation
    */
    public static get Namespace(): string { return ""; }
    /**
    * Get the unique type for the data. Define it as the namespace + class name
    */
    public static get Fullname(): string { return this.Namespace + "." + this.name; }
    /**
    * The current namespace
    */
    public get namespace(): string {
        return this.constructor['Namespace'];
    }
    /**
    * Get the unique type for the data. Define it as the namespace + class name
    */
    public get $type(): string {
        return this.constructor['Fullname'];
    }
    /**
    * Get the name of the class
    */
    public get className(): string {
        return this.constructor.name;
    }
    /**
    * Get a JSON for the current object
    */
   public toJSON() {...}
}
```


    During the compilation of a data class, the static field <mark>Namespace</mark> is defined. With this
    field you can create an unique type name that allows to clearly identify each data inside your application. Because
    Javascript is not typed, a <mark>$schema</mark> is created for each class to keep information about what
    the class must contain. In future version of Aventus, this will help the manager to synchronize data between each
    instances.


The last thing to know is that every properties must have an initializer.

```typescript filename=Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0; // This is ok
    public firstname?: string; // This will trigger an error
    public lastname: string = ''; // This is ok
    public fullname?: string = undefined; // This is ok
    public birthday!: string; // This is ok
}
```
