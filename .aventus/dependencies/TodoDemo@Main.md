# TodoDemo@Main

## Overview

| Nom | Type | Description |
| --- | --- | --- |
| [TodoDemo.GenericPage](tododemo.genericpage) | Class (Webcomponent) |  |
| [TodoDemo.Icon](tododemo.icon) | Class (Webcomponent) | (&lt;td-icon&gt;&lt;/td-icon&gt;) |
| [TodoDemo.Input](tododemo.input) | Class (Webcomponent) | (&lt;td-input&gt;&lt;/td-input&gt;) |
| [TodoDemo.MainApp](tododemo.mainapp) | Class (Webcomponent) | The MainApp for the Demo.The parent Aventus.Navigation.Router is a component that allows routing management (&lt;td-main-app&gt;&lt;/td-main-app&gt;) |
| [TodoDemo.Task](tododemo.task) | Class | A task represents what you have to do to complete the Todo |
| [TodoDemo.Todo](tododemo.todo) | Class | Represent a todo |
| [TodoDemo.TodoCreatePage](tododemo.todocreatepage) | Class (Webcomponent) | The page to create new todo (&lt;td-todo-create-page&gt;&lt;/td-todo-create-page&gt;) |
| [TodoDemo.TodoCreateState](tododemo.todocreatestate) | Class |  |
| [TodoDemo.TodoDisplay](tododemo.tododisplay) | Class (Webcomponent) | (&lt;td-todo-display&gt;&lt;/td-todo-display&gt;) |
| [TodoDemo.TodoListPage](tododemo.todolistpage) | Class (Webcomponent) | The page to list all todos (&lt;td-todo-list-page&gt;&lt;/td-todo-list-page&gt;) |
| [TodoDemo.TodoRAM](tododemo.todoram) | Class |  |

## TodoDemo.GenericPage

 - Type : Class (Webcomponent)
 - Import : import { GenericPage } from "TodoDemo@Main:TodoDemo.package.avt"
 - Parent : Aventus.Navigation.Page

### Methods

| Name | Return | Description |
| --- | --- | --- |
| definePageTitle() | string | (abstract) |

### HTML Slots

| Name | Description |
| --- | --- |
| default |  |

## TodoDemo.Icon

 - Type : Class (Webcomponent)
 - Tag : &lt;td-icon&gt;&lt;/td-icon&gt;
 - Import : import { Icon } from "TodoDemo@Main:TodoDemo.package.avt"
 - Parent : Aventus.WebComponent

### JS Props

| Name | Type | Description | Decorator |
| --- | --- | --- | --- |
| icon | TodoDemo.IconType | Icon from https://fonts.google.com/icons | @Property() |
| type | 'sharp' &vert; 'rounded' &vert; 'outlined' | The type of the icon | @Property() |

## TodoDemo.Input

 - Type : Class (Webcomponent)
 - Tag : &lt;td-input&gt;&lt;/td-input&gt;
 - Import : import { Input } from "TodoDemo@Main:TodoDemo.package.avt"
 - Parent : Aventus.WebComponent

### JS Props

| Name | Type | Description | Decorator |
| --- | --- | --- | --- |
| label | string | Label for the input | @Property() |
| value | string | Current value of the input | @Property() |
| onChange | Aventus.Callback&lt;(value: string) =&gt; void(value: string): void&gt; | A function trigger when the input value changeOnly trigger when a manual input change the vaue |  |

## TodoDemo.MainApp

The MainApp for the Demo.
The parent Aventus.Navigation.Router is a component that allows routing management

 - Type : Class (Webcomponent)
 - Tag : &lt;td-main-app&gt;&lt;/td-main-app&gt;
 - Import : import { MainApp } from "TodoDemo@Main:TodoDemo.package.avt"
 - Parent : Aventus.Navigation.Router

### JS Props Static

| Name | Type | Description | Decorator |
| --- | --- | --- | --- |
| instance | MainApp |  |  |

### HTML Slots

| Name | Description |
| --- | --- |
| default |  |
| after |  |

## TodoDemo.Task

A task represents what you have to do to complete the Todo

 - Type : Class
 - Import : import { Task } from "TodoDemo@Main:TodoDemo.package.avt"
 - Parent : Aventus.Data

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| id | number |  |
| description | string |  |

## TodoDemo.Todo

Represent a todo

 - Type : Class
 - Import : import { Todo } from "TodoDemo@Main:TodoDemo.package.avt"
 - Parent : Aventus.Data

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| id | number |  |
| name | string |  |
| tasks | TodoDemo.Task |  |

## TodoDemo.TodoCreatePage

The page to create new todo

 - Type : Class (Webcomponent)
 - Tag : &lt;td-todo-create-page&gt;&lt;/td-todo-create-page&gt;
 - Import : import { TodoCreatePage } from "TodoDemo@Main:TodoDemo.package.avt"
 - Parent : TodoDemo.GenericPage

### JS Props

| Name | Type | Description | Decorator |
| --- | --- | --- | --- |
| todo | TodoDemo.Todo |  | @Watch() |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| configure() | Aventus.Asyncable&lt;Aventus.Navigation.PageConfig&gt; |  |
| definePageTitle() | string |  |
| onShow() | void |  |

## TodoDemo.TodoCreateState

 - Type : Class
 - Import : import { TodoCreateState } from "TodoDemo@Main:TodoDemo.package.avt"
 - Parent : Aventus.State

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| newTodo | TodoDemo.Todo | This is the Todo that is currently created |
| name | string |  |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| onActivate() | void | This function is called when the current state is activated |
| askChange(state: Aventus.State, nextState: Aventus.State) | Promise&lt;boolean&gt; | This function is called when the state will change |

## TodoDemo.TodoDisplay

 - Type : Class (Webcomponent)
 - Tag : &lt;td-todo-display&gt;&lt;/td-todo-display&gt;
 - Import : import { TodoDisplay } from "TodoDemo@Main:TodoDemo.package.avt"
 - Parent : Aventus.WebComponent

### JS Props

| Name | Type | Description | Decorator |
| --- | --- | --- | --- |
| todo_id | number |  | @Attribute() |
| todo | TodoDemo.Todo |  | @Watch() |

## TodoDemo.TodoListPage

The page to list all todos

 - Type : Class (Webcomponent)
 - Tag : &lt;td-todo-list-page&gt;&lt;/td-todo-list-page&gt;
 - Import : import { TodoListPage } from "TodoDemo@Main:TodoDemo.package.avt"
 - Parent : TodoDemo.GenericPage

### JS Props

| Name | Type | Description | Decorator |
| --- | --- | --- | --- |
| todos | TodoDemo.Todo |  | @Watch() |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| configure() | Aventus.Asyncable&lt;Aventus.Navigation.PageConfig&gt; |  |
| definePageTitle() | string |  |

## TodoDemo.TodoRAM

 - Type : Class
 - Import : import { TodoRAM } from "TodoDemo@Main:TodoDemo.package.avt"
 - Parent : Aventus.Ram

### Methods

| Name | Return | Description |
| --- | --- | --- |
| defineIndexKey() | typeof TodoDemo.Todo |  |

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| getInstance() | any | Create a singleton to store data |
