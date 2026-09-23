# AventusJs Overview

AventusJs is a modern frontend framework designed to build complex, scalable, and maintainable user interfaces using **Web Components**. It builds upon standard technologies (HTML, CSS, TypeScript) while providing a robust architecture for state management, data synchronization, and component lifecycles.

Unlike libraries that only focus on the view layer, AventusJs provides a complete ecosystem including data management (RAM), routing, state machines, and a logic-first UI kit.

## Core Philosophy

1.  **Native Standards**: Aventus compiles to standard Web Components, making your application compatible with any browser and usable inside other frameworks if needed.
2.  **Separation of Concerns**: Components are split into three distinct files to keep code clean:
    * **Logic** (`.wcl.avt`): Written in TypeScript.
    * **View** (`.wcv.avt`): HTML template with special binding syntax.
    * **Style** (`.wcs.avt`): SCSS scoped to the component.
3.  **Strict Architecture**: Forces a clean structure (Data, RAM, State, Components) to avoid "spaghetti code" in large applications.
4.  **Tooling Integration**: Heavily relies on a VSCode extension for compilation, auto-completion, and scaffolding.

## Architecture & Concepts

### 1. Web Components
Components are the building blocks. They extend `Aventus.WebComponent`.
* **Reactivity**: Uses decorators like `@Property` (syncs with HTML attributes), `@Watch` (deep object observation), and `@Signal` to update the view automatically.
* **Shadow DOM**: Styles are scoped by default using Shadow DOM, preventing CSS conflicts.
* **Lifecycle**: Standard callbacks like `postCreation` (similar to `connectedCallback`).

### 2. Data Management (RAM)
Aventus introduces a pattern called **RAM** (In-Memory Storage) to handle data consistency.
* **Data**: Classes defining object structures implementing `Aventus.IData`.
* **RAM**: Singleton stores (e.g., `PersonRAM`) that handle CRUD operations (`create`, `update`, `delete`).
* **Reactivity**: Components listening to a RAM item (`onUpdate`, `onDelete`) update automatically when data changes anywhere in the app.

### 3. State Management
Instead of a simple router, Aventus uses a **StateManager**.
* **States**: Objects representing a specific view or application state (e.g., `/user/edit`).
* **Manager**: Handles transitions and strictly defines which state is active.
* **Router**: A specialized StateManager that syncs with the browser URL.

### 4. Aventus UI (Logic-First Kit)
Aventus provides a library of "naked" components.
* **Concept**: Aventus provides the logic (e.g., `ModalElement`, `ButtonElement`, `FormHandler`), but **you** provide the CSS.
* **Goal**: total design freedom without implementing complex behaviors (accessibility, keyboard navigation, validation) from scratch.

## File Structure

A typical Aventus project is organized as follows:


```

/src
  /MyComponent
    MyComponent.wcl.avt  # Logic (TS)
    MyComponent.wcv.avt  # View (HTML)
    MyComponent.wcs.avt  # Style (SCSS)
  /Data
    User.data.avt        # Data Structure
  /RAM
    User.ram.avt         # Data Store
  /State
    Main.state.avt       # State Manager
aventus.conf.avt         # Project Configuration

```

## Syntax Example

Here is how a simple interactive component looks in AventusJs:

**Logic (`Counter.wcl.avt`)**
```typescript
export class Counter extends Aventus.WebComponent implements Aventus.DefaultComponent {
    @Property()
    private count: number = 0; // Syncs with <av-counter count="0">

    private increment() {
        this.count++;
    }
}

```

**View (`Counter.wcv.avt`)**

```html
<span>Current count: {{ this.count }}</span>
<button @click="increment">Add +1</button>

```

**Style (`Counter.wcs.avt`)**

```css
:host {
    display: block;
    span { color: blue; }
}

```

## Key Differentiators

* **Not Virtual DOM**: Aventus updates the DOM directly based on reactive triggers, offering high performance.
* **Dependency Injection**: Uses `Aventus.Instance` for Singletons and Service injection.
* **Strong Typing**: Built entirely around TypeScript for type safety from Database to UI.
* **No Build Step (External)**: The VSCode extension handles compilation instantly on save; no need for complex Webpack/Vite configuration manually.

