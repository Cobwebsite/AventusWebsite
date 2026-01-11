# UI - Introduction

The UI layer of Aventus is designed around one simple philosophy: <mark>Provide all the logic you need for
        building powerful interfaces without enforcing any visual style.</mark>

## Philosophy

Modern UI frameworks often mix logic and style, forcing developers to adapt their design to predefined components.
    Aventus takes the opposite approach.
    It separates UI behavior (modals, inputs, events, states, keyboard shortcuts, etc.) from UI presentation (CSS,
    animations, layout).

This separation ensures:

- Full control over design : No default styling or opinionated CSS.
- Reusable logic : The same behavior can be reused across projects or customized easily.
- Reduced boilerplate : Core patterns like event handling, keyboard shortcuts, or asynchronous UI responses are
        already managed.

## Example: The Modal System

The ModalElement class is a perfect example of this philosophy.

It provides all the necessary behavior to manage modal dialogs (open, close, resolve, reject, keyboard shortcuts, and
    click-to-close) without enforcing any design.

```ts
import { PressManager } from "Aventus@Main:Aventus.package.avt";
import { ShortcutManager, SpecialTouch } from "../../../lib/ShortcutManager.lib.avt";

namespace Modal {
    export interface ModalOptions<T = any> {
        closeWithEsc?: boolean;
        closeWithClick?: boolean;
        rejectValue?: T | null;
    }

    export abstract class ModalElement<T, U extends ModalOptions<T> = ModalOptions<T>>
        extends Aventus.WebComponent
        implements Aventus.DefaultComponent {

        // Full logic for modal lifecycle and event handling...
    }
}
```

With this foundation, you can create your own modal UI library while relying on a consistent and tested interaction
    logic.

For example:

- Decide whether the modal should close when pressing Escape or clicking outside.
- Manage user confirmation and rejection through a unified promise-based API.
- Avoid repeating boilerplate code like event cleanup or state management.

## Key Benefits

- 
        Logic-first approach: You focus on what your component does, not how it looks.
    &nbsp;
- 
        Style freedom: Apply your own design system, Tailwind setup, or raw CSS.
    &nbsp;
- 
        Extensible foundation: Build and publish your own component libraries using Aventus logic.
    &nbsp;
- 
        Developer efficiency: Handle repetitive interaction logic once — reuse it everywhere.
    &nbsp;

## Vision

Aventus UI aims to be a neutral, behavior-oriented foundation for building user interfaces.
Instead of dictating design, it empowers you to:

- Prototype quickly without reimplementing interaction logic.
- Customize deeply to fit your brand or style.
- Scale consistently by reusing the same behavioral patterns across projects.

In short, Aventus provides the logic. You provide the design.
