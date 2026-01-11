# UI - Collapse

The <mark>Collapse</mark> component provides a lightweight expandable/collapsible container that hides or reveals its content with a smooth grid-based transition.
It's designed to handle open/close logic automatically while letting you define your own layout and header appearance.

Unlike pre-styled accordions, this component handles only the logic and transitions, leaving full styling control to you.

## Concept

&lt;av-collapse&gt; consists of two main parts:

- A header slot (<mark>slot="header"</mark>) that acts as the clickable trigger.
- A content area that expands or collapses depending on the <mark>open</mark> state.

By default, clicking the header toggles the open state with an animated transition.

## Attributes

|Attribute|Type|Description|
|---|---|---|
|open|boolean|Whether the collapse is currently expanded.|
|no_animation|boolean|Disables the transition animation.|

## CSS Variables

You can customize the animation behavior using these CSS variables:

|Attribute|Description|Default value|
|---|---|---|
|--collapse-transition-duration|Duration of the open/close transition|0.5s|
|--collapse-transition-timing-function|Timing function for the transition|cubic-bezier(0.65, 0, 0.15, 1)|

## Example

```html filename=/index.html
<av-collapse>
    <div slot="header">Show details</div>
    <div>
        <p>This is the hidden content that appears when open.</p>$slotBlock$gt;
    </div>
</av-collapse>
```
