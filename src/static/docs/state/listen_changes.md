# State - Listen changes

Changing state is great, but for sure you will need to listen when a state change. Three methods compose the <mark>State</mark> lifecylce. This tuple is named <mark>StateAction</mark> inside Aventus.

- <mark>active</mark>: when a state become active.
- <mark>inactive</mark>: when a state become inactive.
- <mark>askChange</mark>: a way to define if the state change can be done or not.

## Callback on the StateManager

For the example, we are going to listen a state to display a user.

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
import { MainStateManager } from "./Main.state.avt";

export async function subscribe() {
    MainStateManager.getInstance().subscribe("/user/{id:number}", {
        active: (state: Aventus.State, slugs: Aventus.StateSlug) => {
            console.log("user active is " + slugs.id);
        },
        inactive: (state: Aventus.State, nextState: Aventus.State, oldSlugs: Aventus.StateSlug) => {
            console.log("new state is " + nextState.name);
        },
        askChange: async (state: Aventus.State, nextState: Aventus.State, slugs: Aventus.StateSlug) => {
            if(slugs.id == 3) {
                return false;
            }
            return true;
        }
    });
}

export async function setUser(id: number) {
    MainStateManager.getInstance().setState("/user/" + id);
}

export async function removeUser() {
    MainStateManager.getInstance().setState("/other");
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

We subscribe to the state <mark>/user/{id:number}</mark> what means that the manager will trigger active
    when the current state is matching <mark>/^\/user\/([0-9]+)$/g</mark>. The type available are <mark>number</mark> and <mark>string</mark>. If you don't set type, string will be use by
    default. You can also use the star (<mark>*</mark>) to match anything.

When the <mark>setUser</mark> function is called, the log <mark>user active is...</mark> will
    be displayed. If you set the current state to <mark>/other</mark>, the inactive state will be called.
    It's important to know that if your state stay active between two state changes, the function <mark>inactive</mark> won't be fired.

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
import { MainStateManager } from "./Main.state.avt";

export async function subscribe() {
    MainStateManager.getInstance().subscribe("/user/{id:number}", {
        active: (state: Aventus.State, slugs: Aventus.StateSlug) => {
            console.log("user active is " + slugs.id);
        },
        inactive: (state: Aventus.State, nextState: Aventus.State, oldSlugs: Aventus.StateSlug) => {
            console.log("new state is " + nextState.name);
        },
        askChange: async (state: Aventus.State, nextState: Aventus.State, slugs: Aventus.StateSlug) => {
            if(slugs.id == 3) {
                return false;
            }
            return true;
        }
    });
}

export async function setUser(id: number) {
    MainStateManager.getInstance().setState("/user/" + id);
}

export async function removeUser() {
    MainStateManager.getInstance().setState("/other");
}

export async function inactiveNotFired() {
    await MainStateManager.getInstance().setState("/user/1");
    await MainStateManager.getInstance().setState("/user/2");
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

If we come back to the previous example, if we set the user to <mark>id = 3</mark> the function <mark>askChange</mark> will return a false what involves that no more state changes are allowed. A use case
    for this feature is when the user is editing data and he decides to change state without saving item. You can
    display a popup to confirm if edition must be dropped or not.

If you need to know the current state of the manager, you can at any time call the function <mark>getState</mark> to obtain the current state object instance. Furthermore, you can use operator <mark>instanceof</mark> to obtain more information and share some data between subscribers.

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
import { MainStateManager } from "./Main.state.avt";

export async function subscribe() {
    MainStateManager.getInstance().subscribe("/user/{id:number}", {
        active: (state: Aventus.State, slugs: Aventus.StateSlug) => {
            console.log("user active is " + slugs.id);
            // process a type of state
            if(state instanceof CreatePerson){
                console.log(state.editingPerson?.id);
            }
        },
        inactive: (state: Aventus.State, nextState: Aventus.State, oldSlugs: Aventus.StateSlug) => {
            console.log("new state is " + nextState.name);
        },
        askChange: async (state: Aventus.State, nextState: Aventus.State, slugs: Aventus.StateSlug) => {
            if(slugs.id == 3) {
                return false;
            }
            return true;
        }
    });
}

export async function setUser(id: number) {
    MainStateManager.getInstance().setState("/user/" + id);
}

export async function removeUser() {
    MainStateManager.getInstance().setState("/other");
}

export async function inactiveNotFired() {
    await MainStateManager.getInstance().setState("/user/1");
    await MainStateManager.getInstance().setState("/user/2");
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

## Callback on the State

You can also override the three methods directly inside a <mark>State</mark> class.

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

    /**
    * @inheritdoc
    */
    public override onActivate(): void {
        console.log("active");
    }

    /**
    * @inheritdoc
    */
    public override onInactivate(nextState: Aventus.State): void {
        console.log("inactive");
    }

    /**
    * @inheritdoc
    */
    public override async askChange(state: Aventus.State, nextState: Aventus.State): Promise<boolean> {
        return true;
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
import { MainStateManager } from "./Main.state.avt";

export async function subscribe() {
    MainStateManager.getInstance().subscribe("/user/{id:number}", {
        active: (state: Aventus.State, slugs: Aventus.StateSlug) => {
            console.log("user active is " + slugs.id);
            // process a type of state
            if(state instanceof CreatePerson){
                console.log(state.editingPerson?.id);
            }
        },
        inactive: (state: Aventus.State, nextState: Aventus.State, oldSlugs: Aventus.StateSlug) => {
            console.log("new state is " + nextState.name);
        },
        askChange: async (state: Aventus.State, nextState: Aventus.State, slugs: Aventus.StateSlug) => {
            if(slugs.id == 3) {
                return false;
            }
            return true;
        }
    });
}

export async function setUser(id: number) {
    MainStateManager.getInstance().setState("/user/" + id);
}

export async function removeUser() {
    MainStateManager.getInstance().setState("/other");
}

export async function inactiveNotFired() {
    await MainStateManager.getInstance().setState("/user/1");
    await MainStateManager.getInstance().setState("/user/2");
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
