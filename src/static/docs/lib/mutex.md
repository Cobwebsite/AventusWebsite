# Mutex

A Mutex (short for Mutual Exclusion) is a synchronization mechanism used in concurrent programming to control access
    to a shared resource, ensuring that only one thread or process can access the resource at a time. This prevents race
    conditions and ensures data consistency in multi-threaded or multi-process environments.

```typescript filename=/Tools/src/Test.lib.avt
export class Test {
    // Create a mutex instance
    private static mutex: Aventus.Mutex = new Aventus.Mutex();

    private static counter: number = 0;
    private static numThreads: number = 100;

    // Function to update the shared counter variable
    private static async updateCounter() {
        // Wait for the mutex to become available
        await this.mutex.waitOne();
        try {
            // Increment the counter
            this.counter++;
            console.log(this.counter);
            await Aventus.sleep(100);
        } finally {
            // Release the mutex
            this.mutex.release();
        }
    }

    private static async updateCounter2() {
        // Wait for the mutex to become available
        await this.mutex.safeRunAsync(async () => {
            this.counter++;
            console.log(this.counter);
            await Aventus.sleep(100);
        })
    }


    public static run() {
        // Multiple threads call the updateCounter function concurrently
        for(let i = 0; i < this.numThreads; i++) {
            this.updateCounter();
        }
        console.log("loop done");
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

In this example:

- Each thread waits for the mutex before updating the counter.
- Only one thread can acquire the mutex at a time, ensuring that counter updates are performed sequentially.
- Once a thread completes its task, it releases the mutex, allowing other threads to acquire it.
