# UI - Toast

The <mark>Toast</mark> system provides a way to display small, temporary notifications in your Aventus
    application.
    It is composed of two main parts:

- <mark>ToastElement</mark>: the base class for creating custom toast notifications
- <mark>ToastManager</mark>: a global controller that manages positioning, stacking, and lifecycle of
        toasts

Toasts can appear in multiple positions on the screen, close automatically after a delay, or stay visible
    indefinitely.

## Example

## ToastElement Class

ToastElement&lt;T extends ToastOptions = ToastOptions&gt; is the base class used to define how individual toast
    notifications behave and appear.
    It handles visibility, automatic hiding after a timeout, and transitions.

### Methods

|Method|Description|
|---|---|
|static add(options: ToastOptions): Promise&lt;boolean&gt;|Displays a new toast.|
|setOptions(options: T): Asyncable&lt;void&gt;|Must be implemented to define how your toast handles the provided options (e.g., set text, color, or             icon).|
|close()|Manually closes the toast and removes it from the DOM.|

## ToastManager Class

<mark>ToastManager</mark> handles displaying, positioning, and stacking toasts on the screen.
    It ensures that multiple notifications do not overlap and automatically manages their lifecycle.

### Global Configuration

You can define global defaults using:

```ts
Toast.ToastManager.configure({
    defaultToast: MyToast,
    defaultPosition: 'top right',
    defaultDelay: 4000,
    heightLimitPercent: 90,
    gap: 12,
});
```

 **ToastManagerOptions** 

|Option|Type|Description|
|---|---|---|
|defaultToast|Constructor&lt;ToastElement&gt;|Defines the default toast class used when none is provided.|
|defaultToastManager|Constructor&lt;ToastManager&gt;|Allows using a custom toast manager implementation.|
|defaultPosition|ToastPosition|Default screen position for new toasts. Default : 'top right'|
|defaultDelay|number|Default auto-close delay for toasts.. Default : 5000|
|heightLimitPercent|number|Max vertical space (in % of viewport height) that toasts can occupy. Default: 100|
|gap|number|Space in pixels between stacked toasts. Default: 10|

## Behavior

- The toast slides in at the specified position.
- Automatically disappears after delay milliseconds.
- If delay = -1, it stays visible until manually closed.
- Stack recalculation waits for active CSS transitions before measuring toast sizes.
