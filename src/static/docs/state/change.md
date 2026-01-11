# State - Change

To change the current state of a manager, you can use different methods.

## On the manager

You can change current state directly on the manager by calling the function <mark>setState</mark> with a
    &nbsp;<mark>string</mark> or a <mark>State</mark> item.


```typescript filename=/StateExample/src/CreatePerson.state.avt
import type { Person } from "./Person.data.avt";

export class CreatePerson extends Aventus.State implements Aventus.IState {

    public editingPerson?: Person;

    /**
    * @inheritdoc
    */
    public override get name(): string {
        return "/person/create";;
    }
}
```

```typescript filename=/StateExample/src/Main.state.avt
export class MainStateManager extends Aventus.StateManager implements Aventus.IStateManager {
    /**
     * Get the instance of the StateManager
     */
    public static getInstance() {
        return Aventus.Instance.get(MainStateManager);
    }
}
```

```typescript filename=/StateExample/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/StateExample/src/Person.ram.avt
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

```typescript filename=/StateExample/src/Test.lib.avt
import { PersonRAM } from "./Person.ram.avt";
import { CreatePerson } from "./CreatePerson.state.avt";
import { MainStateManager } from "./Main.state.avt";

export async function changeStateTxt() {
    const isApplied = await MainStateManager.getInstance().setState("/user/");
}
export async function changeState() {
    let state = new CreatePerson();
    state.editingPerson = await PersonRAM.getInstance().get(1);
    const isApplied = await MainStateManager.getInstance().setState(state);
}
```

```json filename=/StateExample/aventus.conf.avt
{
    "module": "StateExample",
    "build": [
        {
            "name": "Main",
            "src": [
                './src/*'
            ]
        }
    ]
}
```

If you set a string, an <mark>EmptyState</mark> will be created with the name provided.

## On the state - static

You can also activate a state with the static method <mark>activate</mark> on the class <mark>Aventus.State</mark>.

```typescript filename=/StateExample/src/CreatePerson.state.avt
import type { Person } from "./Person.data.avt";

export class CreatePerson extends Aventus.State implements Aventus.IState {

    public editingPerson?: Person;

    /**
    * @inheritdoc
    */
    public override get name(): string {
        return "/person/create";;
    }
}
```

```typescript filename=/StateExample/src/Main.state.avt
export class MainStateManager extends Aventus.StateManager implements Aventus.IStateManager {
    /**
     * Get the instance of the StateManager
     */
    public static getInstance() {
        return Aventus.Instance.get(MainStateManager);
    }
}
```

```typescript filename=/StateExample/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/StateExample/src/Person.ram.avt
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

```typescript filename=/StateExample/src/Test.lib.avt
import { PersonRAM } from "./Person.ram.avt";
import { CreatePerson } from "./CreatePerson.state.avt";
import { MainStateManager } from "./Main.state.avt";

export async function changeStateTxt() {
    const isApplied = await MainStateManager.getInstance().setState("/user/");
}
export async function changeState() {
    let state = new CreatePerson();
    state.editingPerson = await PersonRAM.getInstance().get(1);
    const isApplied = await MainStateManager.getInstance().setState(state);
}

export async function changeStateStatic() {
    const isApplied = await Aventus.State.activate("/user/", MainStateManager.getInstance());
}
```

```json filename=/StateExample/aventus.conf.avt
{
    "module": "StateExample",
    "build": [
        {
            "name": "Main",
            "src": [
                './src/*'
            ]
        }
    ]
}
```

## On the state - instance

Finally, you can activate the state with the method <mark>activate</mark> on a state instance.

```typescript filename=/StateExample/src/CreatePerson.state.avt
import type { Person } from "./Person.data.avt";

export class CreatePerson extends Aventus.State implements Aventus.IState {

    public editingPerson?: Person;

    /**
    * @inheritdoc
    */
    public override get name(): string {
        return "/person/create";;
    }
}
```

```typescript filename=/StateExample/src/Main.state.avt
export class MainStateManager extends Aventus.StateManager implements Aventus.IStateManager {
    /**
     * Get the instance of the StateManager
     */
    public static getInstance() {
        return Aventus.Instance.get(MainStateManager);
    }
}
```

```typescript filename=/StateExample/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    public id: number = 0;
    public firstname!: string;
    public lastname!: string;
}
```

```typescript filename=/StateExample/src/Person.ram.avt
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

```typescript filename=/StateExample/src/Test.lib.avt
import { PersonRAM } from "./Person.ram.avt";
import { CreatePerson } from "./CreatePerson.state.avt";
import { MainStateManager } from "./Main.state.avt";

export async function changeStateTxt() {
    const isApplied = await MainStateManager.getInstance().setState("/user/");
}
export async function changeState() {
    let state = new CreatePerson();
    state.editingPerson = await PersonRAM.getInstance().get(1);
    const isApplied = await MainStateManager.getInstance().setState(state);
}

export async function changeStateStatic() {
    const isApplied = await Aventus.State.activate("/user/", MainStateManager.getInstance());
}

export async function changeStateInstance() {
    let state = new CreatePerson();
    state.editingPerson = await PersonRAM.getInstance().get(1);
    const isApplied = await state.activate(MainStateManager.getInstance());
}
```

```json filename=/StateExample/aventus.conf.avt
{
    "module": "StateExample",
    "build": [
        {
            "name": "Main",
            "src": [
                './src/*'
            ]
        }
    ]
}
```
