# UI - Scrollable

The <mark>av-scrollable</mark> component provides a custom, fully-featured scrollable container with
    support for:

- Horizontal and vertical scrolling
- Smooth momentum-based scrolling
- Floating or static scrollbars
- Auto-hide scrollbars
- Mouse dragging
- Touch and pinch-zoom support
- Zooming on a point
- Programmatic scrolling

It's ideal for applications that need precise control over scroll behavior, including drag-to-scroll, zoomable
    content, and custom scrollbars.

## Concept

<mark>av-scrollable</mark> wraps content in a scrollable container with custom scrollbars. Unlike native
    scroll elements, it supports momentum, pinch zoom, and dragging, with fully customizable styling.

Example:

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

## Attributes

|Attribute|Type|Description|
|---|---|---|
|x_scroll|boolean|Enable horizontal scrolling. Default: false.|
|y_scroll|boolean|Enable vertical scrolling. Default: true. |
|floating_scroll|boolean|If true, scrollbars float over content instead of pushing it. |
|auto_hide|boolean|Scrollbars hide automatically when not in use.|
|disable|boolean|Disables all user interaction with scrolling.|
|mouse_drag|boolean|Enables dragging content with a mouse.|
|pinch|boolean|Enables pinch-to-zoom on touch devices.|
|zoom|number|Current zoom level of the content. Default: 1. |
|min_zoom|number|Minimum allowed zoom level. Default: 1. |
|max_zoom|number|Maximum allowed zoom level. Default: unlimited. |
|break|number|Easing factor for momentum. Default: 0.1. |

## Features

### 1. Momentum-based scrolling

<mark>av-scrollable</mark> applies smooth momentum when dragging or using the mouse wheel. The break
    attribute controls easing.

### 2. Custom scrollbars

- Scrollbars are separate DOM elements, styled with CSS variables.
- Floating scrollbars can auto-hide after inactivity.
- Supports drag-to-scroll directly on the scrollbars.

### 3. Pinch-to-zoom

- Works on touch devices with two fingers.
- Zoom is centered on a point for precise control.
- Zoom boundaries respect min_zoom and max_zoom.
- Triggers onZoomChange callback when zoom changes.

### 4. Mouse dragging

- Drag content with mouse if mouse_drag is enabled.
- Momentum continues after release for a natural feel.

## Callbacks

|Callback|Description|
|---|---|
|onScrollChange|Triggered whenever the scroll position changes. Returns (x: number, y: number).|
|onZoomChange|Triggered when the zoom level changes. Returns the new zoom number.|

## Methods

|Method|Description|
|---|---|
|scrollToPosition(x, y)|Scrolls to specific pixel positions.|
|scrollX(x)|Scroll horizontally to pixel position.|
|scrollXPercent(percent)|Scroll horizontally as a percentage of total width.|
|scrollY(y)|Scroll vertically to pixel position.|
|scrollYPercent(percent)|Scroll vertically as a percentage of total height.|
|zoomOnPoint(clientX, clientY, newZoom)|Zoom centered at a screen point (clientX, clientY) to a specific zoom value.|
|autoScrollRight(percent)|Automatically scrolls right at a speed relative to content size.|
|stopAutoScrollRight()|Stops auto-scroll right.|
|autoScrollLeft(percent)|Automatically scrolls left.|
|stopAutoScrollLeft()|Stops auto-scroll left.|
|autoScrollTop(percent)|Automatically scrolls up.|
|stopAutoScrollTop()|Stops auto-scroll up.|
|autoScrollBottom(percent)|Automatically scrolls down.|
|stopAutoScrollBottom()|Stops auto-scroll down.|

## CSS Variables

|Variable|Default|Description|
|---|---|---|
|--scrollbar-container-color|transparent|Background color of scrollbar container.|
|--scrollbar-color|#757575|Scrollbar color.|
|--scrollbar-active-color|#858585|Scrollbar color when active/dragged.|
|--scroller-width|6px|Width of scrollbar.|
|--scroller-top|3px|Top padding of horizontal scrollbar.|
|--scroller-bottom|3px|Bottom padding of horizontal scrollbar.|
|--scroller-left|3px|Left padding of vertical scrollbar.|
|--scroller-right|3px|Right padding of vertical scrollbar.|
|--scrollbar-content-padding|0|Padding inside content-wrapper.|
|--scrollbar-container-display|inline-block|Display type of content-wrapper.|

## Notes

- Scrollbars are automatically shown or hidden based on content size.
- <mark>disable</mark> temporarily locks scrolling and zooming.
- Pinch zoom uses DOMMatrix transformations for smooth and accurate scaling.
- Supports both pixel-based and percent-based scrolling.
- Works in combination with Aventus PressManager for unified pointer/touch handling.
