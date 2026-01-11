# Json

The Json utility class is useful when you need to serialize JavaScript class instances into JSON objects and
    deserialize JSON data into JavaScript class instances. This is particularly helpful when working with data transfer
    between client and server, storing data in databases, or communicating with external APIs.

```typescript filename=Example.lib.avt
// Define the User class
class User {
    private name?: string;
    private age?: number;

    public constructor(name?: string, age?: number) {
        this.name = name;
        this.age = age;
    }
}

// Create an instance of the User class
const user = new User("John", 30);

// Serialize the class instance to JSON
const jsonUser = Aventus.Json.classToJson(user);

// Deserialize JSON data into a new instance of the User class
const newUser = new User();
Aventus.Json.classFromJson(newUser, jsonUser);

// Output the deserialized user
console.log(newUser); // User { name: 'John', age: 30 }
```
