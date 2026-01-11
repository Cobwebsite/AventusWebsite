# Library - Instance

Sometimes you must create unique instance of a class. This pattern is named <mark>[Singleton](https://www.tutorialspoint.com/design_pattern/singleton_pattern.htm)</mark>. Despite the controversy over whether this pattern is a good choice for
    use or not, Aventus include a way to create singleton quickly. You just need to call the function <mark>Aventus.Instance.get</mark> to obtain your singleton instance.

```typescript filename=Singleton.lib.avt
export class MySingleton {

	public static getInstance(): MySingleton {
		return Aventus.Instance.get(MySingleton);
	}

	// To prevent class being created from outside
	private constructor(){}
}
```
