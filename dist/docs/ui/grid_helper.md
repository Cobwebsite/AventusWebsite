# UI - Grid Helper

The <mark>av-grid-helper</mark> component provides an interactive visual layout grid with rulers, guides,
    and snapping.
    It's designed to help developers and designers align elements precisely within a web layout, similar to tools found
    in Figma, Photoshop, or web editors.

## Concept

<mark>av-grid-helper</mark> overlays your interface with rulers, a customizable grid, and draggable
    guides.
    It can be toggled on or off, locked to prevent editing, and remembers guide positions between sessions (using <mark>localStorage</mark>).

The component can show:

- Horizontal and vertical rulers (with custom units)
- A configurable grid (columns and rows)
- Draggable guide lines (with magnetic snapping)
- Keyboard shortcuts for quick control

## Example

```html filename=/index.html
<div class="page">
    <av-grid-helper step="50" step_big="200" col_width="50" row_height="50" magnetic="5" lock="false"></av-grid-helper>
</div>
```

## Features

- 
        &nbsp; **Customizable Units : ** 
        &nbsp;Supports multiple measurement units: px, rem, cm, mm, in, and pt.
    &nbsp;
- 
        &nbsp; **Smart Grid Rendering : ** 
        &nbsp;Automatically calculates the number of rows and columns based on container size and settings.
    &nbsp;
- 
        &nbsp; **Rulers : ** 
        &nbsp;Displays rulers on the top and left with configurable step sizes and major ticks.
    &nbsp;
- 
        &nbsp; **Draggable Guides : ** 
        &nbsp;Drag from a ruler to create a guide. Double-click on a ruler to add a guide at a specific position.
    &nbsp;
- 
        &nbsp; **Magnetic Snapping : ** 
        &nbsp;Guides snap to grid steps if the pointer is close enough (controlled by the magnetic property).
    &nbsp;
- 
        &nbsp; **Keyboard Shortcuts : ** 
        &nbsp;Control visibility and locking with keyboard combinations.
    &nbsp;
- 
        &nbsp; **Persistent Guides : ** 
        &nbsp;Saves and restores guide positions using localStorage.
    &nbsp;

## Attributes

|Attribute|Type|Description|
|---|---|---|
|unit|'px' | 'rem' | 'cm' | 'mm' | 'in' | 'pt'|Unit of measurement used for grid and rulers.|
|nb_col|number|Number of grid columns (auto-calculated if 0).|
|nb_row|number|Number of grid rows (auto-calculated if 0).|
|col_width|number|Column width (used if nb_col = 0).|
|row_height|number|Row height (used if nb_row = 0).|
|show_grid|boolean|Toggles visibility of the grid.|
|show_ruler|boolean|Toggles visibility of rulers.|
|show_guide|boolean|Toggles visibility of guide lines.|
|visible|boolean|Shows or hides the entire helper overlay.|
|lock|boolean|Locks/unlocks interactions with guides and rulers.|
|ruler_size|number|Thickness (height/width) of rulers.|
|step|number|Base step for ruler tick marks and snapping.|
|step_big|number|Distance between major ticks on rulers. If 0, uses step.|
|magnetic|number|Magnetic snapping distance in units. Guides snap to grid when within this threshold|

## Shortcuts

Press <mark>Ctrl + K</mark> and then press one of the following keys:

|Shortcut|Action|
|---|---|
|<mark>Ctrl + K</mark> &nbsp;<mark>V</mark>|Toggle visibility|
|<mark>Ctrl + K</mark> &nbsp;<mark>G</mark>|Toggle grid|
|<mark>Ctrl + K</mark> &nbsp;<mark>R</mark>|Toggle rulers|
|<mark>Ctrl + K</mark> &nbsp;<mark>J</mark>|Toggle guides|
|<mark>Ctrl + K</mark> &nbsp;<mark>L</mark>|Toggle lock state|

## Interactions

|Action|Behavior|
|---|---|
|Double-click a ruler|Prompts for a coordinate and adds a guide.|
|Click and drag from ruler|Creates and drags a new guide interactively.|
|Double-click a guide|Deletes the guide.|
|Lock mode enabled|Prevents guide creation or movement.|

## Methods

|Method|Description|
|---|---|
|inPx(value: number): number|Converts a unit-based value to pixels.|
|fromPx(valuePx: number): number|Converts pixels to the current unit.|
|createGuideFromLeft(left: number)|Creates a vertical guide at a given position.|
|createGuideFromTop(top: number)|Creates a horizontal guide at a given position.|

## CSS Variables

|Variable|Default|Description|
|---|---|---|
|--ruler-color|white|Color of ruler background.|

## Lock Button

Located in the top-left corner, this toggle lets you enable or disable editing of guides and rulers.

- Open Lock Icon : Guides can be moved or created.
- Closed Lock Icon : Grid and guides are locked.

## Persistence

GridHelper saves its guide positions automatically in <mark>localStorage</mark>.
Each instance uses its <mark>id</mark> as a storage key (<mark>grid-helper</mark> by default).
Reloading the page restores the same guide layout.

## Developer Notes

- Use it in development environments to help with layout alignment.
- Not recommended for production UI display.
- Guides are draggable and magnetic for precision alignment.
