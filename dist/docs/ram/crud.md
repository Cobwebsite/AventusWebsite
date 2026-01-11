# RAM - Operations

To manage data inside your RAM, can perfom 4 kind of operations :

- Create - To add data inside your RAM
- Read - To read data inside your RAM
- Update - To update data inside your RAM
- Delete - To delete data from your RAM

## Basic operations

Inside Aventus RAM, each function to perfom operation can be written in two format. The first format is the normal.
    You call the function and get the result.

The second format is the detailed. You call the function with <mark>WithError</mark> at the end to obtain more
    information.

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

```typescript filename=/ExampleRAM/src/Test.lib.avt
import { PersonRAM } from "./Person.ram.avt";

/**
* Return a person
*/
export async function query() {
    const p1 = await PersonRAM.getInstance().get(1);
}

/**
* Check if the get contains errors
*/
export async function queryWithError() {
    const { success, errors, result } = await PersonRAM.getInstance().getWithError(1);
    if(success) {
        const p1 = result;
    }
    else {
        for(let error of errors) {
            console.log(error.code + " " + error.message);
        }
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

For the future explanations, only the functions in normal format will be explained

### Read

|Function|Description|
|---|---|
|getAll|Return all items stored inside the RAM like {[index: Index] : T}         &nbsp;|
|getList|Return all items stored inside the RAM like T[]         &nbsp;|
|getById|Return the item where the index is egal to the parameter             provide|
|get|Alias for <mark>getById</mark>|
|getByIds|Return all items where the index is inside the first parameter             provide|

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

```typescript filename=/ExampleRAM/src/Test.lib.avt
import type { Person } from "./Person.data.avt";
import { PersonRAM } from "./Person.ram.avt";

/**
* All the read actions available on a RAM
*/
export async function readFunction() {
    const person1: Aventus.RamItem<Person> | undefined = await PersonRAM.getInstance().get(1);
    const person2: Aventus.RamItem<Person> | undefined = await PersonRAM.getInstance().getById(1);
    const people1: Map<number, Aventus.RamItem<Person>> = await PersonRAM.getInstance().getAll();
    const people2: Aventus.RamItem<Person>[] = await PersonRAM.getInstance().getList();
    const people3: Aventus.RamItem<Person>[] = await PersonRAM.getInstance().getByIds([1, 2]);
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

### Create

|Function|Description|
|---|---|
|create|Store an item inside the RAM and return the element stored.|
|createList|Store a set of items inside the RAM and return the elements             stored.|

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

```typescript filename=/ExampleRAM/src/Test.lib.avt
import { PersonRAM } from "./Person.ram.avt";
import { Person } from "./Person.data.avt";

export async function createFunctions() {
    let person1: Person = new Person();
    person1.id = 1;
    person1.firstname = "John";
    person1.lastname = "Doe";

    let person2: Person = new Person();
    person2.id = 2;
    person2.firstname = "Jane";
    person2.lastname = "Doe";

    const person: Aventus.RamItem<Person> | undefined = await PersonRAM.getInstance().create(person1);
    const people: Aventus.RamItem<Person>[] = await PersonRAM.getInstance().createList([person1, person2]);
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

### Update

|Function|Description|
|---|---|
|update|Update an item inside the RAM and return the element updated.|
|updateList|Update a set of items inside the RAM and return the elements             stored.|

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

```typescript filename=/ExampleRAM/src/Test.lib.avt
import { PersonRAM } from "./Person.ram.avt";
import { Person } from "./Person.data.avt";

export async function udpateFunctions() {
    let person1: Aventus.RamItem<Person> | undefined = await PersonRAM.getInstance().get(1);
    if(!person1) return;
    let person2: Aventus.RamItem<Person> | undefined = await PersonRAM.getInstance().get(2);
    if(!person2) return;

    person1.firstname = "John 2";
    person2.firstname = "Jane 2";
    const person: Aventus.RamItem<Person> | undefined = await PersonRAM.getInstance().update(person1);
    const people: Aventus.RamItem<Person>[] = await PersonRAM.getInstance().updateList([person1, person2]);

    person1.update({firstname: "John 3"});
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

### Delete

|Function|Description|
|---|---|
|delete|Delete an item inside the RAM and return the element updated.|
|deleteById|Delete an item inside the RAM and return the element updated.|
|deleteList|Delete a set of items inside the RAM and return the elements             stored.|

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

```typescript filename=/ExampleRAM/src/Test.lib.avt
import { PersonRAM } from "./Person.ram.avt";
import { Person } from "./Person.data.avt";

export async function deleteFunctions() {
    let person1: Aventus.RamItem<Person> | undefined = await PersonRAM.getInstance().get(1);
    if(!person1) return;
    let person2: Aventus.RamItem<Person> | undefined = await PersonRAM.getInstance().get(2);
    if(!person2) return;

    await PersonRAM.getInstance().delete(person1);
    await PersonRAM.getInstance().deleteById(1);
    await PersonRAM.getInstance().deleteList([person1, person2]);

    person1.delete();
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

The last thing to know is that once an item a stored inside the ram, the item reference is always the same.

```typescript filename=Test.lib.avt
export async function test() {
	let person1: Person = await PersonRAM.getInstance().get(1);
	person1.name = "John Doe 2";
	const person: Person = await PersonRAM.getInstance().update(person1);
	// person == person1 => true
}
```
