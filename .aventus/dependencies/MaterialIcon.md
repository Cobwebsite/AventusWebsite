# MaterialIcon

Webcomponent for Google Material Icons

## Overview

| Nom | Type | Description |
| --- | --- | --- |
| [MaterialIcon.Icon](materialicon.icon) | Class (Webcomponent) | (&lt;mi-icon&gt;&lt;/mi-icon&gt;) |

## MaterialIcon.Icon

 - Type : Class (Webcomponent)
 - Tag : &lt;mi-icon&gt;&lt;/mi-icon&gt;
 - Import : import { Icon } from "MaterialIcon:MaterialIcon.package.avt"
 - Parent : Aventus.WebComponent

### JS Props

| Name | Type | Description | Decorator |
| --- | --- | --- | --- |
| icon | MaterialIcon.IconType | Icon from https://fonts.google.com/icons | @Property() |
| type | 'sharp' &vert; 'rounded' &vert; 'outlined' | The type of the iconThe default value can be set with the property Icon.DefaultType | @Property() |
| fill | boolean |  | @Property() |
| no_check | boolean |  | @Attribute() |

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| configure(config: Partial&lt;MaterialIcon.IconConfig&gt;) | void | Configure how icon will be handled |

### CSS Props

| Name | Type | Description |
| --- | --- | --- |
| --material-icon-animation-duration |  |  |
