# UI - Shortcut

The <mark>ShortcutManager</mark> class provides a global keyboard shortcut management system.
It allows developers to register and handle keyboard combinations (shortcuts) with customizable behavior such as:

- Replacing temporary shortcuts,
- Automatically preventing default browser actions,
- Handling async callbacks,
- And restoring previous shortcut states when temporary ones are removed.

## Overview

Keyboard shortcuts are essential for improving productivity and providing advanced user interactions in web applications.

This utility lets you easily bind custom key combinations (like <mark>Ctrl+S</mark> or <mark>Alt+Enter</mark>) to specific actions while handling complex states such as modifier keys and overlapping combinations.

## Example

```ts
// Register a simple shortcut: Ctrl+S
ShortcutManager.subscribe([SpecialTouch.Control, "s"], () => console.log("saving"));
// Register a temporary shortcut that replaces the existing Ctrl+S
const overriding = () => {
    console.log("Temporary override for Ctrl+S");
}
ShortcutManager.subscribe([SpecialTouch.Control, "s"], overriding, { replaceTemp: true });
// Later, remove the temporary shortcut and restore the previous one
ShortcutManager.unsubscribe([SpecialTouch.Control, "s"], overriding);
```

## Internal Behavior

The combination order doesn't matter. <mark>Ctrl+S</mark>, <mark>S+Ctrl</mark>, or <mark>s+Control</mark> are treated identically.

Certain browser shortcuts (like <mark>Ctrl+P</mark> or <mark>Ctrl+S</mark>) are automatically prevented to avoid conflicts. This can be useful in single-page applications (SPAs) to prevent the browser from executing system actions like Print, Open File, or Save Page. You can customize this behavior with :

```ts
ShortcutManager.setAutoPrevents([[SpecialTouch.Control, "s"], [SpecialTouch.Control, "p"]]);
```

## Conditional Shortcuts

In some cases, you may want a shortcut to be conditionally active. For example, only when a certain modal is open, a form is focused, or the user is in edit mode.

The <mark>ShortcutManager</mark> makes this easy: You can return <mark>false</mark> from a shortcut callback to indicate that <mark>no action</mark> was performed, and that the shortcut should be considered "ignored" in this context.

```ts
let isModalOpen = false;

ShortcutManager.subscribe(
  [SpecialTouch.Control, "Enter"],
  () => {
    if (!isModalOpen) {
      // Do nothing — signal that shortcut did not apply
      return false;
    }

    console.log("Submitting modal form...");
    submitModalForm();
  }
);
```

## Temporary Shortcut Replacement

The <mark>replaceTemp</mark> option lets you temporarily override a shortcut without losing the original.

```ts
const saveShortcut = () => console.log("Save file");
const tempSave = () => console.log("Temporary override");

// Register base shortcut
ShortcutManager.subscribe([SpecialTouch.Control, "s"], saveShortcut);

// Temporarily replace
ShortcutManager.subscribe(
  [SpecialTouch.Control, "s"],
  tempSave,
  { replaceTemp: true }
);

// Later restore
ShortcutManager.unsubscribe([SpecialTouch.Control, "s"], tempSave);
// The original saveShortcut is automatically restored
```
