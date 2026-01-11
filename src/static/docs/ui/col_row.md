# UI - Col / Row

The Layout module provides a lightweight and responsive 12-column grid system based on two Web Components:
    &lt;av-row&gt; and &lt;av-col&gt;.

It’s inspired by modern grid frameworks like Bootstrap or Tailwind but designed to be framework-agnostic,
    flexbox-based, and natively responsive thanks to container queries.

## Core Concept

The grid layout is composed of:

- &lt;av-row&gt;: defines a row container (a flex context with container sizing).
- &lt;av-col&gt;: defines a column inside the row, with a width ranging from 1 to 12.

```html
<av-row>
    <av-col size="6">Column 1</av-col>
    <av-col size="6">Column 2</av-col>
</av-row>
```

Each column will automatically wrap to the next line when there’s not enough horizontal space.

## Col Component

|Attribute|Type|Description|
|---|---|---|
|size|0-12|Column width over 12 columns.|
|size_xs, size_sm, size_md, size_lg, size_xl|0-12|Responsive width for each breakpoint.|
|offset|0-12|Adds a left offset (empty space before the column).|
|offset_right|0-12|Adds a right offset (empty space after the column).|
|center|boolean|Centers the column's content horizontally.|
|use_container|boolean|Enables container query mode for local responsiveness.|

### Basic Example

```html
<av-row>
    <av-col size="12" size_md="6" size_lg="4">
        Responsive column
    </av-col>
</av-row>
```

Behavior:

- XS (mobile) → full width (12/12)
- MD (≥720px) → half width (6/12)
- LG (≥960px) → one-third width (4/12)

### Breakpoints

The grid supports five responsive breakpoints:

|Label|Min width|Description|
|---|---|---|
|xs|300px|Extra small|
|sm|540px|Small|
|md|720px|Medium|
|lg|960px|Large|
|xl|1140px|Extra large|

Each label can be used in size, offset, and offset-right attributes.

### Offsets & Centering

Offsets are useful to create proportional spacing in your layout:

```html
<av-row>
    <av-col size="4" center offset="2">Offset by 2</av-col>
    <av-col size="4" center offset_right="2">Offset to the right</av-col>
</av-row>
```

To center content horizontally inside a column:

```html
<av-row>
    <av-col size="6" center>Centered content</av-col>
</av-row>
```

### Container Queries vs Media Queries

The grid can adapt using two distinct responsive modes:

|Mode|Description|Activation|
|---|---|---|
|Media Queries|Reacts to the viewport width.|Default (use_container = false)|
|Container Queries|Reacts to the width of its parent &lt;av-row&gt;.|Set use_container on &lt;av-col&gt; or globally via config|

Local container example

```html
<av-row>
    <av-col use_container size_xs="12" size_md="6" size_lg="4">
        Responsive to its container width
    </av-col>
</av-row>
```

You can enable container query mode globally for all columns:

```ts
Layout.Col.configure({
    use_container: true
});
```

All &lt;av-col&gt; components will then behave responsively based on their container width.

### CSS Variables

You can customize spacing easily using CSS variables:

|Variable|Description|Default|
|---|---|---|
|--col-padding|Internal padding of a column|8px|
|--col-gap|Horizontal gap between columns|0px|

## Row component

The &lt;av-row&gt; component:

- Creates the grid container (display: flex; flex-wrap: wrap;)
- Defines a container context (container-name: row; container-type: inline-size;)
- Manages horizontal gaps between columns.

### Technical Details

- Widths are computed dynamically with <mark>calc(100% / 12 * n)</mark> adjusted by the column gap.
- Columns with <mark>size="0"</mark> are hidden (<mark>display: none</mark>).
- The <mark>container-name: row</mark> enables container query behavior for <mark>av-col[use_container]</mark>.
- <mark>use_container</mark> mode allows nested responsive layouts that adapt to their parent width, not the entire viewport.
