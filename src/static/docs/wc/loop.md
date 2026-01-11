# Webcomponent - Loop


    Loops are a fundamental concept in programming that allow you to iterate over collections of data, such as arrays or
    objects, and perform operations on each element. In the context of Aventus views, loops provide a powerful
    mechanism for dynamically rendering content based on the data available. They enable you to generate repetitive
    structures, such as lists or tables, and customize the display of each item.


Loops are invaluable in template development for several reasons:

- Loops enable the dynamic generation of content based on the data provided. This flexibility allows for the
        creation of interactive and data-driven user interfaces.
- Loops help reduce code duplication by automating repetitive tasks, leading to cleaner and more maintainable
        templates.
- Loops facilitate the iteration over arrays, objects, or other iterable data structures, allowing you to access
        and manipulate each element individually.

Aventus aims to prioritize developer friendliness by streamlining the template development process. One notable
    feature illustrating this commitment is the ability to use loops directly within the template code. With Aventus,
    developers can seamlessly integrate loop constructs, such as for loops, directly into their templates without the
    need for additional setup or configuration. The Aventus compiler intelligently detects loop structures within the
    template code, allowing developers to focus on building dynamic and responsive user interfaces without cumbersome
    boilerplate code. This approach enhances developer productivity and promotes a more intuitive and efficient
    workflow, ultimately contributing to a more enjoyable and streamlined development experience.

## For

The <mark>for</mark> loop is a classic iteration construct in programming, commonly used to traverse
    arrays or perform repetitive
    tasks a fixed number of times. In Aventus templates, the for loop provides a straightforward approach to iterating
    over arrays and generating dynamic content based on each element.

```typescript filename=/For/src/TodoList/TodoList.wcl.avt
import { Todo } from "../Todo.data.avt";

export class TodoList extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @Watch()
    public todos: Todo[] = [];

    private todoId: number = 0;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    protected addTodo() {
        this.todoId++;
        let todo = new Todo();
        todo.name = "My todo " + this.todoId;
        todo.tasks = ["task1", "task2"];
        this.todos.push(todo);
    }
    //#endregion

}
```

```css filename=/For/src/TodoList/TodoList.wcs.avt
:host {
}
```

```html filename=/For/src/TodoList/TodoList.wcv.avt
<h1>Todos</h1>
for(let i = 0; i < this.todos.length; i++) {
    <div class="name">{{ this.todos[i].name }}</div>
    <ul>
        for(let j = 0; j < this.todos[i].tasks.length; j++) {
            <li>{{ i + 1 }}-{{ j + 1 }}. {{ this.todos[i].tasks[j] }}</li>
        }
    </ul>
}
<button @click="addTodo">Add</button>
```

```typescript filename=/For/src/Todo.data.avt
export class Todo extends Aventus.Data implements Aventus.IData {
	public id: number = 0;
	public name: string = "";
	public tasks: string[] = [];
}
```

```html filename=/For/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>For</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-todo-list></av-todo-list>
</body>
</html>
```

```typescript filename=/For/aventus.conf.avt
{
	"module": "For",
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
	"static": [
		{
			"name": "Static",
			"input": "./static/*",
			"output": "./dist/"
		}
	]
}
```

When working with nested loops in Aventus templates, referencing properties of outer loop iterations within inner
    loops can lead to verbose and repetitive code. In the provided example, accessing properties like <mark>this.todos[i]</mark>
    within each inner loop creates code clutter and decreases readability, especially when dealing with deeply nested
    structures or long property names.

To address this issue, Aventus introduces a concept called <mark>@Context</mark>. It allows developers to
    define a context variable within the loop iteration, simplifying property references within nested loops. By
    assigning the current loop iteration to a context variable, developers can then access properties of the current
    iteration directly using the context variable within inner loops. This approach significantly reduces code
    verbosity, enhances code clarity, and improves maintainability, especially in scenarios involving complex nested
    loops and data structures. Ultimately, <mark>@Context</mark> streamlines the template development process
    and promotes cleaner and more concise code.

```typescript filename=/For/src/TodoList/TodoList.wcl.avt
import { Todo } from "../Todo.data.avt";

export class TodoList extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @Watch()
    public todos: Todo[] = [];

    private todoId: number = 0;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    protected addTodo() {
        this.todoId++;
        let todo = new Todo();
        todo.name = "My todo " + this.todoId;
        todo.tasks = ["task1", "task2"];
        this.todos.push(todo);
    }
    //#endregion

}
```

```css filename=/For/src/TodoList/TodoList.wcs.avt
:host {
}
```

```html filename=/For/src/TodoList/TodoList.wcv.avt
<h1>Todos</h1>
for(let i = 0; i < this.todos.length; i++) {
    @Context('todo', this.todos[i])
    <div class="name">{{ todo.name }}</div>
    <ul>
        for(let j = 0; j < todo.tasks.length; j++) {
            <li>{{ i + 1 }}-{{ j + 1 }}. {{ todo.tasks[j] }}</li>
        }
    </ul>
}
<button @click="addTodo">Add</button>
```

```typescript filename=/For/src/Todo.data.avt
export class Todo extends Aventus.Data implements Aventus.IData {
	public id: number = 0;
	public name: string = "";
	public tasks: string[] = [];
}
```

```html filename=/For/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>For</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-todo-list></av-todo-list>
</body>
</html>
```

```typescript filename=/For/aventus.conf.avt
{
	"module": "For",
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
	"static": [
		{
			"name": "Static",
			"input": "./static/*",
			"output": "./dist/"
		}
	]
}
```

## For...in

The <mark>for...in</mark> loop in JavaScript iterates over the enumerable properties of an object, making it suitable for looping
    through key-value pairs. In Aventus templates, it offers a convenient way to iterate over object
    properties and render content dynamically based on each key-value pair.

```typescript filename=/For/src/TodoList/TodoList.wcl.avt
import { Todo } from "../Todo.data.avt";

export class TodoList extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @Watch()
    public todos: Todo[] = [];

    private todoId: number = 0;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    protected addTodo() {
        this.todoId++;
        let todo = new Todo();
        todo.name = "My todo " + this.todoId;
        todo.tasks = ["task1", "task2"];
        this.todos.push(todo);
    }
    //#endregion

}
```

```css filename=/For/src/TodoList/TodoList.wcs.avt
:host {
}
```

```html filename=/For/src/TodoList/TodoList.wcv.avt
<h1>Todos</h1>
for(let index in this.todos) {
    @Context('todo', this.todos[index])
    <div class="name">{{ todo.name }}</div>
    <ul>
        for(let index2 in todo.tasks) {
            <li>{{ index + 1 }}-{{ index2 + 1 }}. {{ todo.tasks[index2] }}</li>
        }
    </ul>
}
<button @click="addTodo">Add</button>
```

```typescript filename=/For/src/Todo.data.avt
export class Todo extends Aventus.Data implements Aventus.IData {
	public id: number = 0;
	public name: string = "";
	public tasks: string[] = [];
}
```

```html filename=/For/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>For</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-todo-list></av-todo-list>
</body>
</html>
```

```typescript filename=/For/aventus.conf.avt
{
	"module": "For",
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
	"static": [
		{
			"name": "Static",
			"input": "./static/*",
			"output": "./dist/"
		}
	]
}
```

## For...of


    The <mark>for...of</mark> loop is a modern iteration construct introduced in ES6, designed specifically for iterating over
    iterable objects such as arrays, strings, and other collection types. In Aventus templates, it
    simplifies the iteration process by directly accessing the values of iterable objects, enabling seamless content
    rendering based on each item.


```typescript filename=/For/src/TodoList/TodoList.wcl.avt
import { Todo } from "../Todo.data.avt";

export class TodoList extends Aventus.WebComponent implements Aventus.DefaultComponent {

    //#region static

    //#endregion


    //#region props

    //#endregion


    //#region variables
    @Watch()
    public todos: Todo[] = [];

    private todoId: number = 0;
    //#endregion


    //#region constructor

    //#endregion


    //#region methods
    protected addTodo() {
        this.todoId++;
        let todo = new Todo();
        todo.name = "My todo " + this.todoId;
        todo.tasks = ["task1", "task2"];
        this.todos.push(todo);
    }
    //#endregion

}
```

```css filename=/For/src/TodoList/TodoList.wcs.avt
:host {
}
```

```html filename=/For/src/TodoList/TodoList.wcv.avt
<h1>Todos</h1>
for(let todo of this.todos) {
    <div class="name">{{ todo.name }}</div>
    <ul>
        for(let task of todo.tasks) {
            <li>{{ task }}</li>
        }
    </ul>
}
<button @click="addTodo">Add</button>
```

```typescript filename=/For/src/Todo.data.avt
export class Todo extends Aventus.Data implements Aventus.IData {
	public id: number = 0;
	public name: string = "";
	public tasks: string[] = [];
}
```

```html filename=/For/static/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>For</title>
    <script src="/demo.js"></script>
</head>
<body>
    <av-todo-list></av-todo-list>
</body>
</html>
```

```typescript filename=/For/aventus.conf.avt
{
	"module": "For",
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
	"static": [
		{
			"name": "Static",
			"input": "./static/*",
			"output": "./dist/"
		}
	]
}
```
