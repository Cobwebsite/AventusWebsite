# RAM - Listen changes

## Item scoped functions

Because your component must be refreshed when your RAM item changed, the item coming from a RAM has 4 new functions.


- <mark>onUpdate</mark> : Add a callback trigger when data updated
- <mark>offUpdate</mark> : Remove a callback trigger when data updated
- <mark>onDelete</mark> : Add a callback trigger when data deleted
- <mark>offDelete</mark> : Remove a callback trigger when data deleted

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

export async function loadFirstPerson() {
    let person1 = await PersonRAM.getInstance().get(1);
    if(!person1) return;

    person1.onUpdate(onUpdate);
    person1.onDelete(onDelete);
}

export function onUpdate(person: Person) {
    console.log("person updated : " + person.firstname);
}

export function onDelete(person: Aventus.RamItem<Person>) {
    person.offUpdate(onUpdate);
    person.offDelete(onDelete);
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

You must care of the function scope. When you provide a function as parameter sometimes the scope of the function isn't right. To avoid scope error your can use <mark>@BindThis()</mark>.

```typescript filename=/ExampleRAM/src/DisplayPerson/DisplayPerson.wcl.avt
import { PersonRAM } from "../Person.ram.avt";
import type { Person } from "../Person.data.avt";

export class DisplayPerson extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props
    @Attribute()
    public person_id!: number;
    //#endregion


    //#region variables
    private person?: Aventus.RamItem<Person>;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    public printUpdate() {
        console.log(this.person);
    }
    public async getItem() {
        const person = await PersonRAM.getInstance().get(this.person_id);
        if(!person) return

        this.person = person;
        person.onUpdate(this.onUpdateFail)
        person.onUpdate(this.onUpdateCorrect)
    }

    private onUpdateFail(newData: Aventus.RamItem<Person>) {
        // will fail because this isn't scoped to the DisplayPerson component
        this.printUpdate();
    }

    @BindThis()
    private onUpdateCorrect(newData: Aventus.RamItem<Person>) {
        // will be ok because this is scoped to the DisplayPerson component
        this.printUpdate();
    }

    protected override postCreation(): void {
        this.getItem();
    }

    //#endregion

}
```

```typescript filename=/ExampleRAM/src/DisplayPerson/DisplayPerson.wcs.avt
:host {
}
```

```typescript filename=/ExampleRAM/src/DisplayPerson/DisplayPerson.wcv.avt
<slot></slot>
```

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

export async function loadFirstPerson() {
    let person1 = await PersonRAM.getInstance().get(1);
    if(!person1) return;

    person1.onUpdate(onUpdate);
    person1.onDelete(onDelete);
}

export function onUpdate(person: Person) {
    console.log("person updated : " + person.firstname);
}

export function onDelete(person: Aventus.RamItem<Person>) {
    person.offUpdate(onUpdate);
    person.offDelete(onDelete);
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

## RAM scoped functions

To listen what is happening inside your RAM. You can subscribe to 3 listeners:

- <mark>onCreated</mark> : trigger when a new data is created
- <mark>onUpdated</mark> : trigger when a data is updated
- <mark>onDeleted</mark> : trigger when a data is deleted

To remove your listeners you can use the following functions

- <mark>offCreated</mark>
- <mark>offUpdated</mark>
- <mark>offDeleted</mark>

```typescript filename=/ExampleRAM/src/DisplayPerson/DisplayPerson.wcl.avt
import { PersonRAM } from "../Person.ram.avt";
import type { Person } from "../Person.data.avt";

export class DisplayPerson extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables

    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    @BindThis()
    private onCreated(createdData: Aventus.RamItem<Person>) {

    }

    @BindThis()
    private onUpdated(updatedData: Aventus.RamItem<Person>) {

    }

    @BindThis()
    private onDeleted(deletedData: Aventus.RamItem<Person>) {

    }

    protected override postCreation(): void {
        PersonRAM.getInstance().onCreated(this.onCreated);
        PersonRAM.getInstance().onUpdated(this.onUpdated);
        PersonRAM.getInstance().onDeleted(this.onDeleted);
    }
    //#endregion

}
```

```typescript filename=/ExampleRAM/src/DisplayPerson/DisplayPerson.wcs.avt
:host {
}
```

```typescript filename=/ExampleRAM/src/DisplayPerson/DisplayPerson.wcv.avt
<slot></slot>
```

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

export async function loadFirstPerson() {
    let person1 = await PersonRAM.getInstance().get(1);
    if(!person1) return;

    person1.onUpdate(onUpdate);
    person1.onDelete(onDelete);
}

export function onUpdate(person: Person) {
    console.log("person updated : " + person.firstname);
}

export function onDelete(person: Aventus.RamItem<Person>) {
    person.offUpdate(onUpdate);
    person.offDelete(onDelete);
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
