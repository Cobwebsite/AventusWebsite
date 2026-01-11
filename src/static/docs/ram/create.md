# RAM - Create

In this section you are going to learn what is a RAM and how you can create it inside Aventus.

## Definition

A RAM is a class that store all your data instances. This class
    is most of the time a singleton because we want only one storage by type. This piece of code is in charge of all
    CRUD (Create / Read / Update / Delete) operations.

## Inside Aventus

Inside Aventus you can create RAM by right clicking on the explorer part inside vscode, choose  *Aventus
        : Create...*  and choose  *RAM* . Inside the input you can enter the name of the class for which you create
    a store (ex: Person will create a PersonRAM class). This will create a basic RAM class:

```typescript filename=/ExampleRAM/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/ExampleRAM/src/Person.ram.avt
import { Person } from "./Person.data.avt";

export class PersonRAM extends Aventus.Ram<Person> implements Aventus.IRam {

    /**
    * Create a singleton to store data
    */
    public static getInstance() {
        return Aventus.Instance.get(PersonRAM);
    }

    /**
    * @inheritdoc
    */
    public override defineIndexKey(): keyof Person {
        return 'id';
    }

    /**
    * @inheritdoc
    */
    protected override getTypeForData(objJson: Aventus.KeysObject<Person> | Person): new () => Person {
        return Person;
    }

}
```

```json filename=/ExampleRAM/aventus.conf.avt
{
    "module": "ExampleRAM",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ]
        }
    ]
}
```

By default, the Aventus.RAM store data by index that must be a <mark>number</mark>. The method <mark>defineIndexKey</mark> ask
    you to define which key of your object is the primary key to index data. For example if you want to get a data
    inside your RAM you must provide a number that is egal to the index key defined. With the previous example, the code
    &nbsp;<mark>PersonRAM.getInstance().get(1)</mark> will check if the storage contains a Person where id is egal to 1.

If you need another kind of index key, you can extend <mark>Aventus.GenericRam</mark> instead of Aventus.Ram

```typescript filename=/ExampleRAM/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: string = "";
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/ExampleRAM/src/Person.ram.avt
import { Person } from "./Person.data.avt";

// now the key to identify a person must be a string
export class PersonRAM extends Aventus.GenericRam<string, Person> implements Aventus.IRam {

    /**
    * Create a singleton to store data
    */
    public static getInstance() {
        return Aventus.Instance.get(PersonRAM);
    }

    /**
    * @inheritdoc
    */
    public override defineIndexKey(): keyof Person {
        return 'id';
    }

    /**
    * @inheritdoc
    */
    protected override getTypeForData(objJson: Aventus.KeysObject<Person> | Person): new () => Person {
        return Person;
    }

}
```

```json filename=/ExampleRAM/aventus.conf.avt
{
    "module": "ExampleRAM",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ]
        }
    ]
}
```

The <mark>getTypeForData</mark> method allows you to define which object must be instanciated for a specific data. This
    isn't usefull when you work with concrete classes but if you have abstract classes or interfaces, you have to define
    which child must be stored inside RAM.

```typescript filename=/ExampleRAM/src/Shape.data.avt
export abstract class Shape extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
}

export class Square extends Shape implements Aventus.IData {

}
export class Triangle extends Shape implements Aventus.IData {

}
```

```typescript filename=/ExampleRAM/src/Shape.ram.avt
import { Square, type Shape, Triangle } from "./Shape.data.avt";

export class ShapeRAM extends Aventus.Ram<Shape> implements Aventus.IRam {

    /**
    * Create a singleton to store data
    */
    public static getInstance() {
        return Aventus.Instance.get(ShapeRAM);
    }

    /**
    * @inheritdoc
    */
    public override defineIndexKey(): keyof Shape {
        return 'id';
    }

    /**
    * @inheritdoc
    */
    protected override getTypeForData(objJson: Aventus.KeysObject<Shape> | Shape): new () => Shape {
        if(objJson.$type == Square.Fullname) return Square;
        if(objJson.$type == Triangle.Fullname) return Triangle;

        throw 'Impossible'
    }

}
```

```json filename=/ExampleRAM/aventus.conf.avt
{
    "module": "ExampleRAM",
    "build": [
        {
            "name": "Main",
            "src": [
                "./src/*"
            ]
        }
    ]
}
```
