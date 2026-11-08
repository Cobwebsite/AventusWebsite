# sleep

If you need to wait a specific time of ms you can use the <mark>Aventus.sleep</mark> function.

```typescript filename=Example.lib.avt
export class Example {

	public async test() {
		console.log(Aventus.DateTime.now);
		await Aventus.sleep(5000);
		console.log(Aventus.DateTime.now);
	}

}
```
