# RAM - Extend data

As you can see inside the previous section, new functions are added on the items. You can your custom functions too
    based on the [mixin pattern](https://www.patterns.dev/posts/mixin-pattern). This is
    useful when you auto generated your data from your backend but you just want to add some functions. The best way
    to learn this is with an example. We will add a function helloWorld on the Person item.

```typescript filename=/ExampleRAM/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/ExampleRAM/src/Person.ram.avt
// TODO : Add helloWorld function to a Person
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

First of all, we must create an interface with the action needed.

```typescript filename=/ExampleRAM/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/ExampleRAM/src/Person.ram.avt
interface PersonAction {
    // define your function here
    helloWorld(): void;
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

Then you can create a type that is the mix of the data and the extension.

```typescript filename=/ExampleRAM/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/ExampleRAM/src/Person.ram.avt
import { Person } from "./Person.data.avt";

interface PersonAction {
    // define your function here
    helloWorld(): void;
}

type PersonExtended = Person & PersonAction;
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

Then you can add your RAM.

```typescript filename=/ExampleRAM/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/ExampleRAM/src/Person.ram.avt
import { Person } from "./Person.data.avt";

interface PersonAction {
    // define your function here
    helloWorld(): void;
}

type PersonExtended = Person & PersonAction;

export class PersonRAM extends Aventus.Ram<Person, PersonExtended> implements Aventus.IRam {
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
    protected override getTypeForData(objJson: Person | Aventus.KeysObject<Person>): new () => PersonExtended {
        // this will be implemented later
        throw new Error("Method not implemented.");
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

Then you can add the the mixin pattern.

```typescript filename=/ExampleRAM/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/ExampleRAM/src/Person.ram.avt
import { Person } from "./Person.data.avt";

interface PersonAction {
    // define your function here
    helloWorld(): void;
}

type PersonExtended = Person & PersonAction;

export class PersonRAM extends Aventus.Ram<Person, PersonExtended> implements Aventus.IRam {
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
    protected override getTypeForData(objJson: Person | Aventus.KeysObject<Person>): new () => PersonExtended {
        // this will be implemented later
        throw new Error("Method not implemented.");
    }
    /**
     * Mixin pattern to add methods
     */
    private addPersonMethod<B extends (new (...args: any[]) => Person) & { className?: string; }>(Base: B) {
        return class Extension extends Base implements PersonExtended {
            // override the className to keep ref by name
            public static override get className(): string {
                return Base.className || Base.name;
            }
            public override get className(): string {
                return Base.className || Base.name;
            }
            // code your methods here
            public helloWorld(): void {
                console.log("hello world");
            };
        };
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

Now you can use the extension on the function <mark>getTypeForData</mark>.

```typescript filename=/ExampleRAM/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/ExampleRAM/src/Person.ram.avt
import { Person } from "./Person.data.avt";

interface PersonAction {
    // define your function here
    helloWorld(): void;
}

type PersonExtended = Person & PersonAction;

export class PersonRAM extends Aventus.Ram<Person, PersonExtended> implements Aventus.IRam {
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
    protected override getTypeForData(objJson: Person | Aventus.KeysObject<Person>): new () => PersonExtended {
        return this.addPersonMethod(Person);
    }
    /**
     * Mixin pattern to add methods
     */
    private addPersonMethod<B extends (new (...args: any[]) => Person) & { className?: string; }>(Base: B) {
        return class Extension extends Base implements PersonExtended {
            // override the className to keep ref by name
            public static override get className(): string {
                return Base.className || Base.name;
            }
            public override get className(): string {
                return Base.className || Base.name;
            }
            // code your methods here
            public helloWorld(): void {
                console.log("hello world");
            };
        };
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

Now you can call the function <mark>helloWorld()</mark> when you are loading data from the RAM.

```typescript filename=/ExampleRAM/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/ExampleRAM/src/Person.ram.avt
import { Person } from "./Person.data.avt";

interface PersonAction {
    // define your function here
    helloWorld(): void;
}

type PersonExtended = Person & PersonAction;

export class PersonRAM extends Aventus.Ram<Person, PersonExtended> implements Aventus.IRam {
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
    protected override getTypeForData(objJson: Person | Aventus.KeysObject<Person>): new () => PersonExtended {
        return this.addPersonMethod(Person);
    }
    /**
     * Mixin pattern to add methods
     */
    private addPersonMethod<B extends (new (...args: any[]) => Person) & { className?: string; }>(Base: B) {
        return class Extension extends Base implements PersonExtended {
            // override the className to keep ref by name
            public static override get className(): string {
                return Base.className || Base.name;
            }
            public override get className(): string {
                return Base.className || Base.name;
            }
            // code your methods here
            public helloWorld(): void {
                console.log("hello world");
            };
        };
    }
}
```

```typescript filename=/ExampleRAM/src/Test.lib.avt
import { PersonRAM } from "./Person.ram.avt";

export async function sayHello(id: number) {
    const person = await PersonRAM.getInstance().get(id)

    if(!person) return

    person.helloWorld();
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
