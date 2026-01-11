# ResultWithError

<mark>Aventus.ResultWithError</mark> is similar to Aventus.VoidWithError, but it also includes a result
    value along with
    potential errors. It represents the outcome of an action that produces a specific result, such as the result of a
    function call or an operation. This class allows you to handle both the result of the action and any errors that may
    occur during its execution.

```typescript filename=Example.lib.avt
const result = SomeOperation.execute();
if (result.success) {
    // Handle successful result
    console.log("Result:", result.result);
} else {
    // Handle errors
    console.error("Error:", result.errors[0].message);
}
```

Below you can find an implementation example for a function that must transform a string in lowercase.

```typescript filename=/Tools/src/StringExtension.lib.avt
// List of available codes
export enum StringErrorCode {
    EmptyString = 400
}

// Error
export class StringError extends Aventus.GenericError<StringErrorCode> { }

// Result of the function ( = container)
export class StringResult extends Aventus.ResultWithError<{ lower: string; }, StringError> { }

export class StringExtension {

    public static toLower(txt: string): StringResult {
        let result = new StringResult();
        if(!txt) {
            let error = new StringError(StringErrorCode.EmptyString, "Please provide a string");
            result.errors.push(error);
        }
        else {
            result.result = { lower: txt.toLowerCase() };
        }

        return result;
    }

}
```

```typescript filename=/Tools/src/Test.lib.avt
import { StringExtension } from "./StringExtension.lib.avt";

export class Test {
    public static run() {
		const result = StringExtension.toLower("");
		/*
			result.success = false
			result.errors = [ { code: 400, message: "Please provide a string" } ]
			result.result = undefined
		*/

		const result2 = StringExtension.toLower("HELLO");
		/*
			result.success = true
			result.errors = []
			result.result = { lower: 'hello' }
		*/
	}
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
