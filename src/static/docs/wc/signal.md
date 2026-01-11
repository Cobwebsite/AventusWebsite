# Webcomponent - Signal

In the Aventus framework, the <mark>@Signal()</mark> decorator provides a way to create reactive
    properties that are monitored at the first level only. Unlike <mark>@Watch()</mark> or full watchable
    objects, @Signal() does <mark>not observe nested or child properties</mark>. This makes it lightweight and ideal for scenarios
    where you only need to track changes to a property's immediate value.

## Using Signal

To declare a signal variable, you must add the decorator <mark>@Signal</mark>.

```typescript filename=Example.wcl.avt
import { Person } from "../Person.data.avt";

export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region variables
    @Signal((target: Example) => {
        console.log("person set");
    })
    public person?: Person;
    //#endregion


    //#region methods
    protected override postCreation(): void {
        // This will trigger the signal
        this.person = new Person();
        // This won't trigger the signal
        this.person.name = "John Doe";
    }
    //#endregion

}
```

You can notice that the callback function contains only one parameter not like the Watch decorator. This is due to the signal that need less complexity than Watch.
