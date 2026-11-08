# UI - Scrollable

<mark>av-scrollable</mark> provides horizontal and vertical scrolling with custom scrollbars. It supports floating and automatically hidden scrollbars, mouse dragging, a flex content layout, and a <mark>zoom</mark> property.

For momentum scrolling, pinch zoom, percent-based scrolling, and the <mark>autoScroll*</mark> methods, see Advanced Scrollable.

## Example

```html filename=/index.html
<av-scrollable x_scroll y_scroll mouse_drag>
    <div style="width: 2000px;
    height: 1500px;
    background-image: linear-gradient(to bottom, transparent 50%, #28487d 50%),  linear-gradient(to right, #617ca2 50%, #28487d 50%);
    background-size: 10px 10px, 10px 10px;">
        Large content here
    </div>
</av-scrollable>
```

## Attributes and properties

|Name|Behavior|
|---|---|
|x_scroll|Enable horizontal scrolling.|
|y_scroll|Enable vertical scrolling; enabled by default.|
|floating_scroll|Place scrollbars over the content.|
|auto_hide|Hide scrollbars when inactive.|
|mouse_drag|Allow dragging the content with the mouse.|
|disable|Disable scrolling interaction.|
|flex|Use a vertical flex layout for the content.|
|zoom|Scale the content; defaults to 1.|

## JavaScript API

Read <mark>x</mark>, <mark>y</mark>, <mark>xMax</mark>, and <mark>yMax</mark> for the current position and bounds. Call <mark>scrollX(x)</mark> or <mark>scrollY(y)</mark> to scroll programmatically. Subscribe to <mark>onScrollChange</mark> and <mark>onZoomChange</mark> for updates.
