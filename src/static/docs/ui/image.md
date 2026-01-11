# UI - Image

The <mark>av-img</mark> component is an advanced image element that supports raster and SVG images,
    dynamic resizing, display modes (stretch, contains, cover), and optional caching.

It replaces the standard <mark>&lt;img&gt;</mark> tag when you need consistent, reactive sizing or when
    you want to embed and colorize SVGs directly.

## Concept

<mark>av-img</mark> manages the rendering and scaling of images inside flexible containers. It
    automatically adjusts its internal image or SVG to match the container's size and the selected display mode.

It supports:

- Automatic aspect ratio calculation
- SVG inline loading with color control
- Optional caching via base64 encoding
- Dynamic resizing with ResizeObserver

```html
<av-img src="/assets/example.jpg" mode="cover"></av-img>
```

## Attributes

|Attribute|Type|Description|
|---|---|---|
|src|string|Path or URL of the image (supports .svg).|
|mode|'stretch' | 'contains' | 'cover'|Defines how the image fits inside the container. Default: "contains".|
|cache|boolean|If true, loads the image as a Base64 string for faster access and offline             availability.|

## Modes

|Mode|Description|Behavior|
|---|---|---|
|stretch|Fills the entire container regardless of aspect ratio.|May distort the image.|
|contains|Scales the image to fit within the container while maintaining aspect ratio.|No cropping; may leave empty space.|
|cover|Scales the image to completely fill the container while maintaining aspect ratio.|May crop part of the image.|

```html
<av-img src="/photos/banner.svg" mode="cover"></av-img>
<av-img src="/photos/logo.svg" mode="contains"></av-img>
```

## SVG Support

If the src ends with .svg, the file is loaded inline, allowing you to style or animate it using CSS variables.

```html
<av-img src="/icons/mail.svg"></av-img>
```

You can override colors directly via CSS variables:

|Variable|Description|Default|
|---|---|---|
|--img-color|General SVG color base|none|
|--img-stroke-color|Stroke color for SVG lines|var(--img-color)|
|--img-fill-color|Fill color for SVG lines|var(--img-color)|
|--img-color-transition|Transition for color changes|none|

This allows theme-based or hover-driven color changes for inline SVGs.

## Caching

If the cache attribute is set, <mark>av-img</mark> uses the <mark>Aventus ResourceLoader</mark>
    to load and convert the image into a Base64 string.

This is useful for:

- Avoiding multiple network requests for frequently used images
- Faster rendering of static assets

```html
<av-img src="/logos/company.png" cache></av-img>
```
