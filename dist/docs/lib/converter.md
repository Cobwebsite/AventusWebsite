# Converter

The <mark>Aventus.Converter.transform</mark> method is essential for converting data from one format to
    another, particularly useful when
    dealing with complex object structures. It's a versatile tool that simplifies the process of transforming data by
    providing a consistent interface for conversion operations.

Suppose you have an application that receives JSON data from an API and needs to convert it into JavaScript objects
    for further processing. In this case, you can utilize the Converter.transform method to perform the conversion
    seamlessly.

By default, the Converter will populate the class instances through the method <mark>fromJSON</mark> on
    your object or through the method <mark>Json.classFromJson</mark>.

```typescript filename=/Tools/src/Parser.lib.avt
import { Person } from "./Person.data.avt";

export class Parser {
    public static parse() {
        // JSON data received from an API with $type indicating the class name
        const jsonDataWithType = JSON.parse('{"$type": "Tools.Person", "id": 1, "name": "John", "age": 30}');

        // Convert JSON data to JavaScript object using Converter.transform
        const personWithType = Aventus.Converter.transform<Person>(jsonDataWithType);

        console.log(personWithType); // Output: Person { id: 1, name: 'John', age: 30 }
        console.log(personWithType instanceof Person); // Output: true
    }
}
```

```typescript filename=/Tools/src/Person.data.avt
export class Person extends Aventus.Data implements Aventus.IData {
    // The static field Fullname = 'Tools.Person'
	public id: number = 0;
	public name: string = "";
	public age: number = 0;
}
```

```json filename=/Tools/aventus.conf.avt
{
	"module": "Tools",
	"componentPrefix": "av",
	"build": [
		{
			"name": "Main",
			"src": [
				"./src/*"
			],
			"compile": [
				{
					"output": "./dist/demo.js"
				}
			]
		}
	],
	"static": [{
		"name": "Static",
		"input": "./static/*",
		"output": "./dist/"
	}]
}
```

By default, <mark>Aventus.Data</mark> is convertible. You can also create custom convertible class by adding the decorator <mark>@Convertible</mark>. You must define an unique key so that the converter can transform your json into the object.

```typescript
@Convertible()
export class Test {
    public static get Fullname(): string { return "MyNamespace.Test"; }
    public get $type(): string { return Test.Fullname; }
}
```
