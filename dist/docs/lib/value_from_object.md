# getValueFromObject

The <mark>Aventus.getValueFromObject</mark> function is particularly useful when you need to retrieve a
    value from a nested object
    structure in JavaScript. This function helps you access specific values within complex objects without needing to
    write extensive code for traversal and error handling.

```typescript filename=Example.lib.avt
export function test() {

    const userProfile = {
        user: {
            profile: {
                address: {
                    city: 'New York'
                }
            }
        }
    };

    // Using getValueFromObject to retrieve the city value
    const city = Aventus.getValueFromObject('user.profile.address.city', userProfile);

    console.log(city); // Output: New York

}
```

# setValueToObject

The <mark>Aventus.setValueToObject</mark> function is invaluable when you need to set a value within a
    nested object structure in
    JavaScript. This function streamlines the process of updating specific properties within complex objects without the
    need for extensive manual traversal and error handling.

```typescript filename=Example.lib.avt
export function test() {

    let userProfile = {
        user: {
            profile: {
                address: {
                    city: 'New York'
                }
            }
        }
    };

    // Using setValueToObject to update the city value
    setValueToObject('user.profile.address.city', userProfile, 'Los Angeles');

}
```
