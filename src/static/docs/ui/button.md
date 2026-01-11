# UI - Button

The <mark>ButtonElement</mark> class provides the core logic for button components in Aventus.
    Just like other UI elements in the framework, it focuses purely on behavior and interaction, leaving style and
    presentation entirely up to you.

## Overview

Buttons are one of the most fundamental interactive elements in any UI.
    In Aventus, a ButtonElement is not a styled component. It's a behavioral foundation that handles:

- Different button types (button, submit, reset, menu)
- Form association and submission logic
- Keyboard and mouse interactions
- Optional loading state handling

This allows you to design your own visual button components with custom HTML, CSS, or frameworks like Tailwind while
    relying on a robust, consistent behavior layer.

## Core Concepts

### 1. Form Association

The <mark>ButtonElement</mark> integrates seamlessly with the <mark>Form</mark> system in
    Aventus. By default, it's form-associated, meaning it automatically connects to the nearest parent <mark>Form</mark> element.

This enables:

- Automatic form registration
- Form submission handling via the <mark>requestSubmit()</mark> API
- Compatibility with both standard and custom forms

If no native HTML form is detected, the button uses the Aventus Form handler system to trigger submissions
    programmatically.

### 2. Button Types

Aventus supports the four standard button types:

- <mark>button</mark>: Default; performs no automatic action.
- <mark>submit</mark>: Triggers form submission logic.
- <mark>reset</mark>: (Future extension) Designed to reset form state.
- <mark>menu</mark>: For custom interactive UI controls.

The type is declared using the <mark>@Property()</mark> decorator:

```typescript
@Property()
public type: 'button' | 'submit' | 'reset' | 'menu' = 'button';
```

### 3. Press and Keyboard Handling

User interactions are managed through the <mark>PressManager</mark> utility, which standardizes press
    events across devices (mouse, touch, keyboard).

For submit buttons:

- A click or touch event triggers <mark>triggerSubmit().</mark>
- Pressing the <mark>Enter</mark> key also triggers submission.

This ensures accessibility and consistent behavior across all input methods.

### 4. Loading State Integration

If your custom button class includes a loading property, ButtonElement will automatically respect it:

- Prevents double submissions when already loading.
- Resets loading state once the form submission completes.

This makes it easy to integrate visual feedback such as spinners or disabled states

## Why It Matters

By abstracting out repetitive button behavior (submission, keyboard handling, and event management) the ButtonElement
    lets you:

- Build consistent, accessible buttons across your UI.
- Focus entirely on design and UX, not low-level logic.
- Extend behavior easily for custom needs (async actions, tooltips, etc.).

Every Aventus button you create inherits reliable interaction patterns without any extra boilerplate.

## Summary

|Feature|Description|
|---|---|
|Behavior-first|Handles logic, not style|
|Form-aware|Automatically connects to forms|
|Keyboard-friendly|Submits with Enter|
|Extensible|Add custom logic and visuals|
|Reusable|Core logic shared across all projects|

 **In short:** 

The ButtonElement provides all the behavioral logic you expect from a modern button, while giving you complete
    freedom over how it looks.
