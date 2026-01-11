# State - Create

In this section you are going to learn what is a state and how you can create it inside Aventus.

## Definition

A state is a way to define a unique state of your application. The state concept is divided in two part:
    &nbsp;<mark>StateManager</mark> and <mark>State</mark>. The StateManager will manage the transition from one state to another. The
    state is an object with a name. The best state example inside Aventus is the <mark>Router</mark>. Inside the router, you
    must declare unique route matching to a single <mark>Page</mark>.


## Inside Aventus

Inside Aventus you can create a new state class by right clicking on the explorer part inside vscode, choose
    &nbsp; *Aventus : Create...*  and choose  *State* . You must select between <mark>State</mark> or <mark>Manager</mark> and then
    inside the input you can enter the name for the class. This will create a basic class:


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
