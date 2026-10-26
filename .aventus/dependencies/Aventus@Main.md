# Aventus@Main

Core package for AventusJs

## Overview

| Nom | Type | Description |
| --- | --- | --- |
| [Aventus.ActionGuard](aventus.actionguard) | Class | Class that manages unique execution of asynchronous actions based on specified keys. |
| [Aventus.Animation](aventus.animation) | Class |  |
| [Aventus.Callback](aventus.callback) | Class |  |
| [Aventus.CallbackGroup](aventus.callbackgroup) | Class |  |
| [Aventus.Computed](aventus.computed) | Class | Computed will recomputed each time a watchable variable or effect or computed are changedWhen no change occured you can get the value by calling the value propertyEach time the function is called, dependencies tree is updated. It's usefull when you have array or conditional inside |
| [Aventus.ComputedNoRecomputed](aventus.computednorecomputed) | Class | Computed will recomputed each time a watchable variable or effect or computed are changedWhen no change occured you can get the value by calling the value propertyThe dependencies tree is created only during the first execution |
| [Aventus.Converter](aventus.converter) | Class | Utility class for data conversion and manipulation. |
| [Aventus.ConverterTransform](aventus.convertertransform) | Class |  |
| [Aventus.Data](aventus.data) | Class | Abstract class implementing IData with additional properties and methods for namespace and JSON handling. |
| [Aventus.Date](aventus.date) | Class | Immutable ISO calendar date. Months are numbered from 1 to 12. Requires Temporal. |
| [Aventus.DateConverter](aventus.dateconverter) | Class |  |
| [Aventus.DateSettings](aventus.datesettings) | Class | Shared implementation behind Date.configure and DateTime.configure. |
| [Aventus.DateTime](aventus.datetime) | Class | Immutable date and time. Offset inputs are normalized to UTC; offset-free inputs remain unspecified. |
| [Aventus.DragAndDrop](aventus.draganddrop) | Class |  |
| [Aventus.Effect](aventus.effect) | Class | Effect will recomputed each time a watchable variable or effect or computed are changedEach time the function is called, dependencies tree is updated. It's usefull when you have array or conditional inside |
| [Aventus.EffectNoRecomputed](aventus.effectnorecomputed) | Class | Effect will recomputed each time a watchable variable or effect or computed are changedThe dependencies tree is created only during the first execution |
| [Aventus.ElementExtension](aventus.elementextension) | Class |  |
| [Aventus.EmptyState](aventus.emptystate) | Class |  |
| [Aventus.GenericError](aventus.genericerror) | Class | Represents a generic error with a code, message, and optional details. |
| [Aventus.GenericRam](aventus.genericram) | Class |  |
| [Aventus.HttpCache](aventus.httpcache) | Class |  |
| [Aventus.HttpError](aventus.httperror) | Class |  |
| [Aventus.HttpRequest](aventus.httprequest) | Class |  |
| [Aventus.HttpResponse](aventus.httpresponse) | Class |  |
| [Aventus.HttpRoute](aventus.httproute) | Class |  |
| [Aventus.HttpRouter](aventus.httprouter) | Class |  |
| [Aventus.Instance](aventus.instance) | Class |  |
| [Aventus.Json](aventus.json) | Class | Utility class for JSON serialization and deserialization of objects. |
| [Aventus.Mutex](aventus.mutex) | Class | Represents a mutual exclusion (mutex) mechanism for synchronizing access to a shared resource. |
| [Aventus.NormalizedEvent](aventus.normalizedevent) | Class |  |
| [Aventus.PressManager](aventus.pressmanager) | Class |  |
| [Aventus.Ram](aventus.ram) | Class | Default Ram with number as Index |
| [Aventus.RamError](aventus.ramerror) | Class | Class representing a specific RAM error.Inherits from GenericError with the error code type RamErrorCode. |
| [Aventus.Request](aventus.request) | Class |  |
| [Aventus.ResizeObserver](aventus.resizeobserver) | Class |  |
| [Aventus.Resource](aventus.resource) | Class |  |
| [Aventus.ResourceLoader](aventus.resourceloader) | Class |  |
| [Aventus.ResultRamWithError](aventus.resultramwitherror) | Class | Class representing the result of an action that may contain RAM-specific errors with a result of a generic type. |
| [Aventus.ResultWithError](aventus.resultwitherror) | Class | Represents a result of an action that may contain errors and includes a result value. |
| [Aventus.Signal](aventus.signal) | Class |  |
| [Aventus.State](aventus.state) | Class |  |
| [Aventus.StateManager](aventus.statemanager) | Class |  |
| [Aventus.StorableRoute](aventus.storableroute) | Class |  |
| [Aventus.Style](aventus.style) | Class |  |
| [Aventus.Template](aventus.template) | Class |  |
| [Aventus.TemplateContext](aventus.templatecontext) | Class |  |
| [Aventus.TemplateInstance](aventus.templateinstance) | Class |  |
| [Aventus.Time](aventus.time) | Class | Immutable wall-clock time without date or timezone. Arithmetic wraps at midnight. |
| [Aventus.Uri](aventus.uri) | Class |  |
| [Aventus.VoidRamWithError](aventus.voidramwitherror) | Class | Class representing the result of an action that may contain RAM-specific errors without a result.Inherits from VoidWithError with the error type RamError. |
| [Aventus.VoidWithError](aventus.voidwitherror) | Class | Represents a result of an action that may contain errors. |
| [Aventus.Watcher](aventus.watcher) | Class |  |
| [Aventus.WebComponent](aventus.webcomponent) | Class (Webcomponent) |  |
| [Aventus.WebComponentInstance](aventus.webcomponentinstance) | Class |  |

## Aventus.ActionGuard

Class that manages unique execution of asynchronous actions based on specified keys.

 - Type : Class
 - Import : import { ActionGuard } from "Aventus@Main:Aventus.package.avt"

### Methods

| Name | Return | Description |
| --- | --- | --- |
| run<T extends any>(action: () =&gt; Promise&lt;T&gt;(): Promise&lt;T&gt;) | Promise&lt;T&gt; |  |

## Aventus.Animation

 - Type : Class
 - Import : import { Animation } from "Aventus@Main:Aventus.package.avt"

### Methods

| Name | Return | Description |
| --- | --- | --- |
| start() | void | Start the of animation |
| stop() | void | Stop the animation |
| immediateStop() | void | Stop the animation |
| getFPS() | number | Get the FPS |
| setFPS(fps: number) | void | Set the FPS |
| isStarted() | boolean | Get the animation status (true if animation is running) |

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| FPS_DEFAULT | number | Default FPS for all Animation if not set inside options |

## Aventus.Async<T>(el: Aventus.Asyncable&lt;T&gt;)

 - Return : Promise&lt;T&gt;
## Aventus.Callback<U extends (...args: any) =&gt; T(args: any): T, T = void>

 - Type : Class
 - Import : import { Callback } from "Aventus@Main:Aventus.package.avt"

### Methods

| Name | Return | Description |
| --- | --- | --- |
| clear() | void | Clear all callbacks |
| add(cb: U, scope: any) | void | Add a callback |
| remove(cb: U) | void | Remove a callback |
| trigger(args: Parameters&lt;U&gt;) | T | Trigger all callbacks |

## Aventus.CallbackGroup<U extends (...args: any) =&gt; void(args: any): void>

 - Type : Class
 - Import : import { CallbackGroup } from "Aventus@Main:Aventus.package.avt"

### Methods

| Name | Return | Description |
| --- | --- | --- |
| clearAll() | void | Clear all callbacks |
| clear(group: string &vert; number) | void | Clear all callbacks for a specific group |
| add(group: string &vert; number, cb: U, scope: any) | void | Add a callback for a group |
| remove(group: string &vert; number, cb: U) | void | Remove a callback for a group |
| trigger(group: string &vert; number, args: Parameters&lt;U&gt;) | void | Trigger all callbacks inside a group |

## Aventus.clone<X>(item: X)

 - Return : any
## Aventus.compareObject(obj1: any, obj2: any, tableOrder: boolean)

Compare two objects for equality, recursively checking nested arrays, objects, and dates.

 - Return : boolean
## Aventus.Computed<T = any>

Computed will recomputed each time a watchable variable or effect or computed are changed
When no change occured you can get the value by calling the value property
Each time the function is called, dependencies tree is updated. It's usefull when you have array or conditional inside

 - Type : Class
 - Import : import { Computed } from "Aventus@Main:Aventus.package.avt"
 - Parent : Aventus.Effect

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| value | T &vert; undefined |  |

## Aventus.ComputedNoRecomputed<T = any>

Computed will recomputed each time a watchable variable or effect or computed are changed
When no change occured you can get the value by calling the value property
The dependencies tree is created only during the first execution

 - Type : Class
 - Import : import { ComputedNoRecomputed } from "Aventus@Main:Aventus.package.avt"
 - Parent : Aventus.Computed

## Aventus.Converter

Utility class for data conversion and manipulation.

 - Type : Class
 - Import : import { Converter } from "Aventus@Main:Aventus.package.avt"

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| info | Map&lt;string, new () =&gt; any()&gt; | Map storing information about registered types. |

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| setConverter(converter: Aventus.IConverterTransform) | void | Sets the converter instance. |
| register($type: string, cst: new () =&gt; any(), schema: Aventus.Schema) | void | Registers a unique string type for any class. |
| transform<T = any>(data: any, converter: Aventus.IConverterTransform) | T | Transforms the provided data using the current converter instance. |
| copyValuesClass<T extends Object>(to: T, from: T, options: Aventus.ClassCopyOptions, converter: Aventus.IConverterTransform) | any | Copies values from one class instance to another using the current converter instance. |

## Aventus.ConverterTransform

 - Type : Class
 - Import : import { ConverterTransform } from "Aventus@Main:Aventus.package.avt"

### Methods

| Name | Return | Description |
| --- | --- | --- |
| transform<T = any>(data: any) | T |  |
| copyValuesClass<T extends Object>(target: T, src: T, options: Aventus.ClassCopyOptions) | void |  |

## Aventus.Data

Abstract class implementing IData with additional properties and methods for namespace and JSON handling.

 - Type : Class
 - Import : import { Data } from "Aventus@Main:Aventus.package.avt"

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| namespace | string | The current namespace |
| $type | string | Get the unique type for the data. Define it as the namespace + class name |
| className | string | Get the name of the class |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| toJSON() | { [key: string &vert; number]: any; } | Get a JSON for the current object |
| clone() | this | Clone the object by transforming a parsed JSON string back into the original type |

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| $schema | { [prop: string]: string; } | The schema for the class |
| Namespace | string | The current namespace |
| Fullname | string | Get the unique type for the data. Define it as the namespace + class name |

## Aventus.Date

Immutable ISO calendar date. Months are numbered from 1 to 12. Requires Temporal.

 - Type : Class
 - Import : import { Date } from "Aventus@Main:Aventus.package.avt"

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| year | number |  |
| month | number |  |
| day | number |  |
| dayOfWeek | number | Sunday = 0, Monday = 1, ..., Saturday = 6. |
| dayOfYear | number |  |
| daysInMonth | number |  |
| quarter | number |  |
| isLeapYear | boolean |  |
| isToday | boolean |  |
| isPast | boolean |  |
| isFuture | boolean |  |
| numericValue | number |  |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| with(values: { year?: number; month?: number; day?: number; }) | Date |  |
| addYears(years: number) | Date |  |
| addMonths(months: number) | Date |  |
| addDays(days: number) | Date |  |
| compareTo(other: Date) | number |  |
| equals(other: unknown) | boolean |  |
| isBefore(other: Date) | boolean |  |
| isAfter(other: Date) | boolean |  |
| isSameOrBefore(other: Date) | boolean |  |
| isSameOrAfter(other: Date) | boolean |  |
| startOfYear() | Date |  |
| endOfYear() | Date |  |
| startOfQuarter() | Date |  |
| endOfQuarter() | Date |  |
| startOfMonth() | Date |  |
| endOfMonth() | Date |  |
| startOfWeek(firstDay: Aventus.DateWeekday) | Date |  |
| endOfWeek(firstDay: Aventus.DateWeekday) | Date |  |
| yearsUntil(other: Date) | number |  |
| monthsUntil(other: Date) | number |  |
| daysUntil(other: Date) | number |  |
| diffYears(other: Date) | number | Absolute number of complete calendar years. |
| diffMonths(other: Date) | number | Absolute number of complete calendar months. |
| diffDays(other: Date) | number | Absolute whole-day distance. |
| toLocaleString(options: Intl.DateTimeFormatOptions, locale: string &vert; string) | string | Localized display. A civil date never shifts with the display timezone. Explicit options replace defaults. |
| getMonthName(format: Aventus.DateNameFormat, locale: string &vert; string) | string |  |
| getDayName(format: Aventus.DateNameFormat, locale: string &vert; string) | string |  |
| valueOf() | number |  |
| toString() | string |  |
| toJSON() | string |  |
| toTemporal() | Temporal.PlainDate |  |

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| configuration | Aventus.DateConfiguration |  |
| today | Date |  |

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| configure(options: Partial&lt;Aventus.DateConfiguration&gt;) | void |  |
| parse(text: string) | Date |  |
| tryParse(text: string) | Date &vert; null |  |
| getMonthNames(format: Aventus.DateNameFormat, locale: string &vert; string) | string | January through December, regardless of the configured first weekday. |
| getDayNames(format: Aventus.DateNameFormat, locale: string &vert; string, firstDay: Aventus.DateWeekday) | string | Weekday names starting at firstDay (the configured first weekday by default). |

## Aventus.DateConverter

 - Type : Class
 - Import : import { DateConverter } from "Aventus@Main:Aventus.package.avt"

### Methods

| Name | Return | Description |
| --- | --- | --- |
| isStringDate(txt: string) | boolean |  |
| fromString(txt: string) | Aventus.Date &vert; Aventus.DateTime &vert; null |  |
| toString(date: Aventus.Date &vert; Aventus.DateTime &vert; Aventus.Time) | string |  |

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| converter | DateConverter |  |
| converter | any |  |

## Aventus.DateSettings

Shared implementation behind Date.configure and DateTime.configure.

 - Type : Class
 - Import : import { DateSettings } from "Aventus@Main:Aventus.package.avt"

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| current | Aventus.DateConfiguration |  |

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| configure(options: Partial&lt;Aventus.DateConfiguration&gt;) | void | Partial update. Each supplied format replaces the previous format in full. |

## Aventus.DateTime

Immutable date and time. Offset inputs are normalized to UTC; offset-free inputs remain unspecified.

 - Type : Class
 - Import : import { DateTime } from "Aventus@Main:Aventus.package.avt"

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| kind | 'unspecified' &vert; 'utc' |  |
| year | number |  |
| month | number |  |
| day | number |  |
| hour | number |  |
| minute | number |  |
| second | number |  |
| millisecond | number |  |
| microsecond | number |  |
| nanosecond | number |  |
| date | Aventus.Date |  |
| time | Aventus.Time |  |
| dayOfWeek | number | Sunday = 0, Monday = 1, ..., Saturday = 6. |
| dayOfYear | number |  |
| daysInMonth | number |  |
| quarter | number |  |
| isLeapYear | boolean |  |
| timestamp | number | Unix timestamp in milliseconds. Unspecified values must first be resolved with toUtc(). |
| isToday | boolean |  |
| isPast | boolean |  |
| isFuture | boolean |  |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| with(values: { year?: number; month?: number; day?: number; hour?: number; minute?: number; second?: number; millisecond?: number; microsecond?: number; nanosecond?: number; }) | DateTime |  |
| addYears(years: number) | DateTime |  |
| addMonths(months: number) | DateTime |  |
| addDays(days: number) | DateTime |  |
| addHours(hours: number) | DateTime |  |
| addMinutes(minutes: number) | DateTime |  |
| addSeconds(seconds: number) | DateTime |  |
| addMilliseconds(milliseconds: number) | DateTime |  |
| addMicroseconds(microseconds: number) | DateTime |  |
| addNanoseconds(nanoseconds: number) | DateTime |  |
| compareTo(other: DateTime) | number |  |
| equals(other: unknown) | boolean |  |
| equalsToMinute(other: unknown) | boolean |  |
| isBefore(other: DateTime) | boolean |  |
| isAfter(other: DateTime) | boolean |  |
| isSameOrBefore(other: DateTime) | boolean |  |
| isSameOrAfter(other: DateTime) | boolean |  |
| startOfYear() | DateTime |  |
| endOfYear() | DateTime |  |
| startOfQuarter() | DateTime |  |
| endOfQuarter() | DateTime |  |
| startOfMonth() | DateTime |  |
| endOfMonth() | DateTime |  |
| startOfWeek(firstDay: Aventus.DateWeekday) | DateTime |  |
| endOfWeek(firstDay: Aventus.DateWeekday) | DateTime |  |
| startOfDay() | DateTime |  |
| endOfDay() | DateTime |  |
| yearsUntil(other: DateTime) | number |  |
| monthsUntil(other: DateTime) | number |  |
| daysUntil(other: DateTime) | number |  |
| hoursUntil(other: DateTime) | number |  |
| minutesUntil(other: DateTime) | number |  |
| secondsUntil(other: DateTime) | number |  |
| millisecondsUntil(other: DateTime) | number |  |
| diffYears(other: DateTime) | number | Absolute number of complete calendar years. |
| diffMonths(other: DateTime) | number | Absolute number of complete calendar months. |
| diffDays(other: DateTime) | number | Absolute number of complete units. UTC values represent instants; unspecified values represent wall-clock times. |
| diffHours(other: DateTime) | number |  |
| diffMinutes(other: DateTime) | number |  |
| diffSeconds(other: DateTime) | number |  |
| diffMilliseconds(other: DateTime) | number |  |
| toUtc(timeZone: string) | DateTime | Resolve an unspecified time in an explicit zone. Reject ambiguous/nonexistent local times. |
| toTimestamp(timeZone: string) | number | Unix timestamp in milliseconds. Unspecified values require an explicit time zone. |
| toLocaleString(options: Intl.DateTimeFormatOptions, locale: string &vert; string) | string |  |
| getMonthName(format: Aventus.DateNameFormat, locale: string &vert; string) | string |  |
| getDayName(format: Aventus.DateNameFormat, locale: string &vert; string) | string |  |
| toInputString() | string | Wall-clock representation for datetime-local inputs. |
| toString() | string |  |
| toJSON() | string |  |
| toTemporal() | Temporal.PlainDateTime |  |

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| configuration | Aventus.DateConfiguration |  |
| now | DateTime |  |
| utcNow | DateTime |  |

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| configure(options: Partial&lt;Aventus.DateConfiguration&gt;) | void |  |
| fromTimestamp(timestamp: number) | DateTime |  |
| parse(text: string) | DateTime |  |
| tryParse(text: string) | DateTime &vert; null |  |

## Aventus.DragAndDrop

 - Type : Class
 - Import : import { DragAndDrop } from "Aventus@Main:Aventus.package.avt"

### Methods

| Name | Return | Description |
| --- | --- | --- |
| getMatchingTargets() | Aventus.TargetableElement | Get targets within the current element position is matching |
| getElementDrag() | Aventus.DragElement | Get element currently dragging |
| setTargets(targets: Aventus.TargetableElement) | void | Set targets where to drop |
| setTargetsFct(targets: () =&gt; ___Aventus.TargetableElement[](): ___Aventus.TargetableElement) | void | Set targets where to drop |
| destroy() | void | Destroy the current drag&drop instance |

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| defaultOffsetDrag | number | Default offset before drag element |

## Aventus.Effect

Effect will recomputed each time a watchable variable or effect or computed are changed
Each time the function is called, dependencies tree is updated. It's usefull when you have array or conditional inside

 - Type : Class
 - Import : import { Effect } from "Aventus@Main:Aventus.package.avt"

### Methods

| Name | Return | Description |
| --- | --- | --- |
| canChange(fct: Aventus.WatcherAllowed) | void |  |
| destroy() | void |  |
| subscribe(fct: Aventus.WatcherChange) | void |  |
| unsubscribe(fct: Aventus.WatcherChange) | void |  |

## Aventus.EffectNoRecomputed

Effect will recomputed each time a watchable variable or effect or computed are changed
The dependencies tree is created only during the first execution

 - Type : Class
 - Import : import { EffectNoRecomputed } from "Aventus@Main:Aventus.package.avt"
 - Parent : Aventus.Effect

## Aventus.ElementExtension

 - Type : Class
 - Import : import { ElementExtension } from "Aventus@Main:Aventus.package.avt"

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| findParent<T>(element: Element, check: (node: Node) =&gt; boolean(node: Node): boolean, untilNode: Element) | T &vert; null | Find a parent by custom check |
| findParents<T>(element: Element, check: (node: Node) =&gt; boolean(node: Node): boolean, untilNode: Element) | T | Find a list of parent by custom check |
| findParentByTag<T>(element: Element, tagname: string &vert; string, untilNode: Element) | T &vert; null | Find a parent by tagname if exist Static.findParentByTag(this, "av-img") |
| findParentByClass<T>(element: Element, classname: string &vert; string, untilNode: Element) | T &vert; null | Find a parent by class name if exist Static.findParentByClass(this, "my-class-img") = querySelector('.my-class-img') |
| findParentByType<T extends { prototype: any; }>(element: Element, type: [any], untilNode: Element) | T[number]['prototype'] &vert; null |  |
| findParentsByTag<T>(element: Element, tagname: string &vert; string, untilNode: Element) | T | Find list of parents by tagname |
| containsChild(element: Element, child: Element) | boolean | Check if element contains a child |
| getElementsInSlot(element: Element, slotName: string) | HTMLElement | Get element inside slot |
| getNodesInSlot(element: Element, slotName: string) | Node | Get element inside slot |
| getElementAtPosition(x: number, y: number, startFrom: Element) | Element | Get deeper element inside dom at the position X and Y |
| getActiveElement(root: Document &vert; ShadowRoot &vert; null) | Element &vert; null | Get active element from the define root |

## Aventus.EmptyState

 - Type : Class
 - Import : import { EmptyState } from "Aventus@Main:Aventus.package.avt"
 - Parent : Aventus.State

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| name | string |  |

## Aventus.GenericError<T extends number &vert; Aventus.Enum = any>

Represents a generic error with a code, message, and optional details.

 - Type : Class
 - Import : import { GenericError } from "Aventus@Main:Aventus.package.avt"

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| code | Aventus.EnumValue&lt;T&gt; | Code for the error |
| message | string | Description of the error |
| details | any &vert; { [key: string]: any; } | Additional details related to the error. |

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| Fullname | string |  |

## Aventus.GenericRam<Index, Item extends Aventus.IRamData, Request extends Aventus.Request &vert; Item = Aventus.KeysObject&lt;Item&gt;, ResourceSimple extends Aventus.Resource &vert; Item = Item, ResourceDetails extends ResourceSimple = ResourceSimple>

 - Type : Class
 - Import : import { GenericRam } from "Aventus@Main:Aventus.package.avt"

### Methods

| Name | Return | Description |
| --- | --- | --- |
| defineIndexKey() | typeof ResourceDetails | (abstract) Define the field where the index key is locationExample : 'id'; |
| getIdWithError(item: Aventus.KeysObject&lt;ResourceDetails&gt; &vert; ResourceDetails) | Aventus.ResultRamWithError&lt;Index&gt; | Get item id |
| getId(item: Aventus.KeysObject&lt;ResourceDetails&gt; &vert; ResourceDetails) | Index | Get item id |
| save(item: Request, args: any) | Promise&lt;Aventus.RamItem&lt;ResourceDetails, Request&gt; &vert; undefined&gt; | Create or update the item |
| saveWithError(item: Request, args: any) | Promise&lt;Aventus.ResultRamWithError&lt;Aventus.RamItem&lt;ResourceDetails, Request&gt;&gt;&gt; | Create or update the item |
| onCreated(cb: (item: Aventus.RamItem&lt;ResourceDetails, Request&gt;) =&gt; void(item: Aventus.RamItem&lt;ResourceDetails, Request&gt;): void) | void | Add a callback that ll be triggered when a new item is stored |
| offCreated(cb: (item: Aventus.RamItem&lt;ResourceDetails, Request&gt;) =&gt; void(item: Aventus.RamItem&lt;ResourceDetails, Request&gt;): void) | void | Remove a created callback |
| onUpdated(cb: (item: Aventus.RamItem&lt;ResourceDetails, Request&gt;) =&gt; void(item: Aventus.RamItem&lt;ResourceDetails, Request&gt;): void) | void | Add a callback that ll be triggered when an item is updated |
| offUpdated(cb: (item: Aventus.RamItem&lt;ResourceDetails, Request&gt;) =&gt; void(item: Aventus.RamItem&lt;ResourceDetails, Request&gt;): void) | void | Remove an updated callback |
| onDeleted(cb: (item: Aventus.RamItem&lt;ResourceDetails, Request&gt;) =&gt; void(item: Aventus.RamItem&lt;ResourceDetails, Request&gt;): void) | void | Add a callback that ll be triggered when an item is deleted |
| offDeleted(cb: (item: Aventus.RamItem&lt;ResourceDetails, Request&gt;) =&gt; void(item: Aventus.RamItem&lt;ResourceDetails, Request&gt;): void) | void | Remove an deleted callback |
| get(id: Index) | Promise&lt;Aventus.RamItem&lt;ResourceDetails, Request&gt; &vert; undefined&gt; | Get an item by id if exist (alias for getById) |
| getWithError(id: Index) | Promise&lt;Aventus.ResultRamWithError&lt;Aventus.RamItem&lt;ResourceDetails, Request&gt;&gt;&gt; | Get an item by id if exist (alias for getById) |
| getById(id: Index) | Promise&lt;Aventus.RamItem&lt;ResourceDetails, Request&gt; &vert; undefined&gt; | Get an item by id if exist |
| getByIdWithError(id: Index) | Promise&lt;Aventus.ResultRamWithError&lt;Aventus.RamItem&lt;ResourceDetails, Request&gt;&gt;&gt; | Get an item by id if exist |
| getByIds(ids: Index) | Promise&lt;Aventus.RamItem&lt;ResourceDetails, Request&gt;&gt; | Get multiple items by ids |
| getByIdsWithError(ids: Index) | Promise&lt;Aventus.ResultRamWithError&lt;Aventus.RamItem&lt;ResourceDetails, Request&gt;&gt;&gt; | Get multiple items by ids |
| getAll() | Promise&lt;Aventus.RamItem&lt;ResourceSimple, Request&gt;&gt; | Get all elements inside the Ram |
| getAllWithError() | Promise&lt;Aventus.ResultRamWithError&lt;Aventus.RamItem&lt;ResourceSimple, Request&gt;&gt;&gt; | Get all elements inside the Ram |
| getList() | Promise&lt;Aventus.RamItem&lt;ResourceSimple, Request&gt;&gt; | Get all elements inside the Ram |
| getListWithError() | Promise&lt;Aventus.ResultRamWithError&lt;Aventus.RamItem&lt;ResourceSimple, Request&gt;&gt;&gt; | Get all elements inside the Ram |
| getRecords() | Promise&lt;Map&lt;Index, Aventus.RamItem&lt;ResourceSimple, Request&gt;&gt;&gt; | Get all elements inside the Ram |
| getRecordsWithError() | Promise&lt;Aventus.ResultRamWithError&lt;Map&lt;Index, Aventus.RamItem&lt;ResourceSimple, Request&gt;&gt;&gt;&gt; | Get all elements inside the Ram |
| createList(list: Request) | Promise&lt;Aventus.RamItem&lt;ResourceDetails, Request&gt;&gt; | Create a list of items inside ram |
| createListWithError(list: Request) | Promise&lt;Aventus.ResultRamWithError&lt;Aventus.RamItem&lt;ResourceDetails, Request&gt;&gt;&gt; | Create a list of items inside ram |
| create(item: Request, args: any) | Promise&lt;Aventus.RamItem&lt;ResourceDetails, Request&gt; &vert; undefined&gt; | Create an item inside ram |
| createWithError(item: Request, args: any) | Promise&lt;Aventus.ResultRamWithError&lt;Aventus.RamItem&lt;ResourceDetails, Request&gt;&gt;&gt; | Create an item inside ram |
| updateList(list: Request) | Promise&lt;Aventus.RamItem&lt;ResourceDetails, Request&gt;&gt; | Update a list of items inside ram |
| updateListWithError(list: Request) | Promise&lt;Aventus.ResultRamWithError&lt;Aventus.RamItem&lt;ResourceDetails, Request&gt;&gt;&gt; | Update a list of items inside ram |
| update(item: Request, args: any) | Promise&lt;Aventus.RamItem&lt;ResourceDetails, Request&gt; &vert; undefined&gt; | Update an item inside ram |
| updateWithError(item: Request, args: any) | Promise&lt;Aventus.ResultRamWithError&lt;Aventus.RamItem&lt;ResourceDetails, Request&gt;&gt;&gt; | Update an item inside ram |
| deleteList(list: ResourceDetails) | Promise&lt;Aventus.RamItem&lt;ResourceDetails, Request&gt;&gt; | Delete a list of items inside ram |
| deleteListWithError(list: ResourceDetails) | Promise&lt;Aventus.ResultRamWithError&lt;Aventus.RamItem&lt;ResourceDetails, Request&gt;&gt;&gt; | Delete a list of items inside ram |
| delete(item: ResourceDetails, args: any) | Promise&lt;Aventus.RamItem&lt;ResourceDetails, Request&gt; &vert; undefined&gt; | Delete an item inside ram |
| deleteWithError(item: ResourceDetails, args: any) | Promise&lt;Aventus.ResultRamWithError&lt;Aventus.RamItem&lt;ResourceDetails, Request&gt;&gt;&gt; | Delete an item inside ram |
| deleteById(id: Index) | Promise&lt;Aventus.RamItem&lt;ResourceDetails, Request&gt; &vert; undefined&gt; | Delete an item by id inside ram |
| deleteByIdWithError(id: Index) | Promise&lt;Aventus.ResultRamWithError&lt;Aventus.RamItem&lt;ResourceDetails, Request&gt;&gt;&gt; | Delete an item by id inside ram |

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| info | Map&lt;Aventus.IRam, new () =&gt; any()&gt; |  |
| Namespace | string | The current namespace |
| Fullname | string | Get the unique type for the data. Define it as the namespace + class name |

## Aventus.getValueFromObject(path: string, obj: any)

Retrieves the value from an object based on the provided path.

 - Return : any
## Aventus.HttpCache

 - Type : Class
 - Import : import { HttpCache } from "Aventus@Main:Aventus.package.avt"

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| fetch(fullUrl: string, request: RequestInit) | Promise&lt;Aventus.HttpResponse&gt; |  |
| clear(fullUrl: string, request: RequestInit) | void |  |

## Aventus.HttpError

 - Type : Class
 - Import : import { HttpError } from "Aventus@Main:Aventus.package.avt"
 - Parent : Aventus.GenericError

## Aventus.HttpRequest

 - Type : Class
 - Import : import { HttpRequest } from "Aventus@Main:Aventus.package.avt"

### Methods

| Name | Return | Description |
| --- | --- | --- |
| setUrl(url: string) | void |  |
| toString() | string |  |
| setBody(body: { [key: string &vert; number]: any; } &vert; FormData) | void |  |
| setMethod(method: Aventus.HttpMethod) | void |  |
| enableMethodSpoofing() | void | Replace method Put/Delete by _method:"put" inside a form |
| enableCache() | void |  |
| disableCache() | void |  |
| jsonReplacer(key: string, value: any) | any |  |
| setHeader(name: string, value: string) | void |  |
| setCredentials(credentials: RequestCredentials) | void |  |
| query(router: Aventus.HttpRouter) | Promise&lt;Aventus.ResultWithError&lt;Aventus.HttpResponse&gt;&gt; |  |
| queryVoid<T>(router: Aventus.HttpRouter) | Promise&lt;Aventus.VoidWithError&gt; |  |
| queryJSON<T>(router: Aventus.HttpRouter) | Promise&lt;Aventus.ResultWithError&lt;T&gt;&gt; |  |
| queryTxt(router: Aventus.HttpRouter) | Promise&lt;Aventus.ResultWithError&lt;string&gt;&gt; |  |
| queryBlob(router: Aventus.HttpRouter) | Promise&lt;Aventus.ResultWithError&lt;Blob&gt;&gt; |  |
| clearCache(router: Aventus.HttpRouter) | void |  |

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| configure(options: Aventus.HttpRequestOptions) | void |  |

## Aventus.HttpResponse

 - Type : Class
 - Import : import { HttpResponse } from "Aventus@Main:Aventus.package.avt"

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| status | number |  |
| statusText | string |  |
| redirected | boolean |  |
| ok | boolean |  |
| type | ResponseType |  |
| url | string |  |
| headers | Headers |  |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| json<T = any>() | Promise&lt;T&gt; |  |
| blob() | Promise&lt;Blob&gt; |  |
| text() | Promise&lt;string&gt; |  |

## Aventus.HttpRoute

 - Type : Class
 - Import : import { HttpRoute } from "Aventus@Main:Aventus.package.avt"

### Methods

| Name | Return | Description |
| --- | --- | --- |
| getPrefix() | string |  |

## Aventus.HttpRouter

 - Type : Class
 - Import : import { HttpRouter } from "Aventus@Main:Aventus.package.avt"

### Methods

| Name | Return | Description |
| --- | --- | --- |
| get<T>(url: string) | Promise&lt;Aventus.ResultWithError&lt;T&gt;&gt; |  |
| post<T>(url: string, data: { [key: string &vert; number]: any; } &vert; FormData) | Promise&lt;Aventus.ResultWithError&lt;T&gt;&gt; |  |
| put<T>(url: string, data: { [key: string &vert; number]: any; } &vert; FormData) | Promise&lt;Aventus.ResultWithError&lt;T&gt;&gt; |  |
| delete<T>(url: string, data: { [key: string &vert; number]: any; } &vert; FormData) | Promise&lt;Aventus.ResultWithError&lt;T&gt;&gt; |  |
| option<T>(url: string, data: { [key: string &vert; number]: any; } &vert; FormData) | Promise&lt;Aventus.ResultWithError&lt;T&gt;&gt; |  |

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| configure(options: Aventus.HttpRouterOptions) | void |  |

## Aventus.Instance

 - Type : Class
 - Import : import { Instance } from "Aventus@Main:Aventus.package.avt"

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| get<X>(type: Aventus.InstanceCst2&lt;X&gt;) | X |  |
| set<X extends Aventus.InstanceCst>(el: X) | boolean |  |
| destroy<X extends Aventus.InstanceCst>(el: X) | boolean |  |

## Aventus.isClass(v: any)

 - Return : boolean
## Aventus.isSubclassOf(subClass: Function, superClass: Function)

 - Return : boolean
## Aventus.Json

Utility class for JSON serialization and deserialization of objects.

 - Type : Class
 - Import : import { Json } from "Aventus@Main:Aventus.package.avt"

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| classToJson<T extends Object>(obj: T, options: Aventus.JsonToOptions) | { [key: string &vert; number]: any; } | Converts a JavaScript class instance to a JSON object. |
| classFromJson<T extends Object>(obj: T, data: any, options: Aventus.JsonFromOptions) | T | Converts a JSON object to a JavaScript class instance. |

## Aventus.Mutex

Represents a mutual exclusion (mutex) mechanism for synchronizing access to a shared resource.

 - Type : Class
 - Import : import { Mutex } from "Aventus@Main:Aventus.package.avt"

### Methods

| Name | Return | Description |
| --- | --- | --- |
| waitOne() | any | Waits for the mutex to become available and then acquires it. |
| release() | void | Release the mutex |
| releaseOnlyLast() | void | Releases the mutex, allowing only the last function in the waiting list to acquire it. |
| dispose() | void | Clears the mutex, removing all waiting functions and releasing the lock. |
| safeRun<T = void>(cb: () =&gt; T(): T) | Promise&lt;T &vert; null&gt; | Executes a callback function safely within the mutex lock and releases the lock afterward. |
| safeRunAsync<T = void>(cb: () =&gt; Promise&lt;T&gt;(): Promise&lt;T&gt;) | Promise&lt;T &vert; null&gt; | Executes an asynchronous callback function safely within the mutex lock and releases the lock afterward. |
| safeRunLast<T = void>(cb: () =&gt; T(): T) | Promise&lt;T &vert; null&gt; | Executes a callback function safely within the mutex lock, allowing only the last function in the waiting list to acquire the lock, and releases the lock afterward. |
| safeRunLastAsync<T = void>(cb: () =&gt; Promise&lt;T&gt;(): Promise&lt;T&gt;) | Promise&lt;T &vert; undefined&gt; | Executes an asynchronous callback function safely within the mutex lock, allowing only the last function in the waiting list to acquire the lock, and releases the lock afterward. |

## Aventus.NormalizedEvent

 - Type : Class
 - Import : import { NormalizedEvent } from "Aventus@Main:Aventus.package.avt"

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| event | PointerEvent &vert; TouchEvent |  |
| clientX | number |  |
| clientY | number |  |
| pageX | number |  |
| pageY | number |  |
| type | string |  |
| target | EventTarget &vert; null |  |
| timeStamp | number |  |
| pointerType | string &vert; undefined |  |
| button | number &vert; undefined |  |
| isTouch | boolean |  |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| getProp<T>(prop: typeof PointerEvent &vert; typeof TouchEvent) | T &vert; undefined |  |
| stopImmediatePropagation() | void |  |

## Aventus.PressManager

 - Type : Class
 - Import : import { PressManager } from "Aventus@Main:Aventus.package.avt"

### Methods

| Name | Return | Description |
| --- | --- | --- |
| getElement() | Element | Get the current element focused by the PressManager |
| destroy() | void | Destroy the Press instance byremoving all events |

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| onEvent | Aventus.Callback&lt;(e: Aventus.NormalizedEvent, instance: PressManager) =&gt; void(e: Aventus.NormalizedEvent, instance: PressManager): void&gt; |  |

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| configure(options: Partial&lt;Aventus.PressManagerOptions&gt;) | void |  |
| create(options: Aventus.PressManagerOptions &amp; { element: Element[]; }) | PressManager |  |

## Aventus.Ram<Item extends Aventus.IRamData, Request extends Aventus.Request &vert; Item = Item, ResourceSimple extends Aventus.Resource &vert; Item = Item, ResourceDetails extends ResourceSimple = ResourceSimple>

Default Ram with number as Index

 - Type : Class
 - Import : import { Ram } from "Aventus@Main:Aventus.package.avt"
 - Parent : Aventus.GenericRam

## Aventus.RamError

Class representing a specific RAM error.
Inherits from GenericError with the error code type RamErrorCode.

 - Type : Class
 - Import : import { RamError } from "Aventus@Main:Aventus.package.avt"
 - Parent : Aventus.GenericError

## Aventus.Request

 - Type : Class
 - Import : import { Request } from "Aventus@Main:Aventus.package.avt"

## Aventus.ResizeObserver

 - Type : Class
 - Import : import { ResizeObserver } from "Aventus@Main:Aventus.package.avt"

### Methods

| Name | Return | Description |
| --- | --- | --- |
| observe(target: Element) | void | Observe size changing for the element |
| unobserve(target: Element) | void | Stop observing size changing for the element |
| disconnect() | void | Destroy the resize observer |

## Aventus.Resource

 - Type : Class
 - Import : import { Resource } from "Aventus@Main:Aventus.package.avt"

## Aventus.ResourceLoader

 - Type : Class
 - Import : import { ResourceLoader } from "Aventus@Main:Aventus.package.avt"

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| loadInHead(options: Aventus.ResourceLoaderHeadOptions &vert; string) | Promise&lt;boolean&gt; | Load the resource inside the head tag |
| load(options: Aventus.ResourceLoaderOptions &vert; string) | Promise&lt;string&gt; |  |

## Aventus.ResultRamWithError<T>

Class representing the result of an action that may contain RAM-specific errors with a result of a generic type.

 - Type : Class
 - Import : import { ResultRamWithError } from "Aventus@Main:Aventus.package.avt"
 - Parent : Aventus.ResultWithError

## Aventus.ResultWithError<U, T extends Aventus.GenericError = Aventus.GenericError>

Represents a result of an action that may contain errors and includes a result value.

 - Type : Class
 - Import : import { ResultWithError } from "Aventus@Main:Aventus.package.avt"
 - Parent : Aventus.VoidWithError

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| result | U &vert; undefined | The result value of the action. |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| toGeneric() | ResultWithError&lt;U&gt; | Converts the current instance to a ResultWithError object. |
| run(fct: () =&gt; T[] &vert; () =&gt; Aventus.VoidWithError&lt;T&gt; &vert; () =&gt; ResultWithError&lt;U, T&gt;) | this |  |
| runAsync(fct: () =&gt; Promise&lt;T[]&gt; &vert; () =&gt; Promise&lt;Aventus.VoidWithError&lt;T&gt;&gt; &vert; () =&gt; ResultWithError&lt;U, T&gt;) | Promise&lt;this&gt; |  |

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| Fullname | string |  |

## Aventus.setValueToObject(path: string, obj: any, value: any)

Sets the value in an object based on the provided path.

 - Return : void
## Aventus.Signal<T>

 - Type : Class
 - Import : import { Signal } from "Aventus@Main:Aventus.package.avt"

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| value | T |  |
| value | any |  |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| subscribe(fct: Aventus.WatcherChange) | void |  |
| unsubscribe(fct: Aventus.WatcherChange) | void |  |
| destroy() | void |  |

## Aventus.sleep(ms: number)

It ll wait the number provided in ms
Async setTimeout

 - Return : Promise&lt;void&gt;
## Aventus.State

 - Type : Class
 - Import : import { State } from "Aventus@Main:Aventus.package.avt"

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| name | string |  |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| activate(manager: Aventus.StateManager) | Promise&lt;boolean&gt; | Activate this state inside a specific manager |
| onActivate() | Aventus.Asyncable&lt;void&gt; |  |
| onInactivate(nextState: State) | Aventus.Asyncable&lt;void&gt; |  |
| askChange(state: State, nextState: State) | Promise&lt;boolean&gt; |  |

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| activate(stateName: string, manager: Aventus.StateManager) | Promise&lt;boolean&gt; | Activate a custom state inside a specific managerIt ll be a generic state with no information inside exept name |

## Aventus.StateManager

 - Type : Class
 - Import : import { StateManager } from "Aventus@Main:Aventus.package.avt"

### Methods

| Name | Return | Description |
| --- | --- | --- |
| subscribe(statePatterns: string &vert; string, callbacks: Aventus.StateAction, autoActiveState: boolean) | void | Subscribe actions for a state or a state list |
| activateAfterSubscribe(statePatterns: string &vert; string, callbacks: Aventus.StateAction) | void |  |
| unsubscribe(statePatterns: string &vert; string, callbacks: Aventus.StateAction) | void | Unsubscribe actions for a state or a state list |
| onAfterStateChanged(cb: () =&gt; void(): void) | void |  |
| offAfterStateChanged(cb: () =&gt; void(): void) | void |  |
| canChangeState(cb: (newState: Aventus.State) =&gt; Promise&lt;boolean&gt;(newState: Aventus.State): Promise&lt;boolean&gt;) | void |  |
| setState(state: Aventus.State &vert; string) | Promise&lt;boolean&gt; | Activate a current state |
| getState() | Aventus.State &vert; undefined |  |
| isStateActive(statePattern: string) | boolean | Check if a state is in the subscribers and active, return true if it is, false otherwise |
| getStateSlugs(statePattern: string) | Aventus.UriParamsValue &vert; null | Get slugs information for the current state, return null if state isn't active |

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| canBeActivate(statePattern: string, stateName: string) | boolean |  |

## Aventus.StorableRoute<T extends Aventus.IData>

 - Type : Class
 - Import : import { StorableRoute } from "Aventus@Main:Aventus.package.avt"
 - Parent : Aventus.HttpRoute

### Methods

| Name | Return | Description |
| --- | --- | --- |
| GetAll() | unknown |  |
| Create(body: { item: T; } &vert; FormData) | unknown |  |
| GetById(id: number) | unknown |  |
| Update(id: number, body: { body: T; } &vert; FormData) | unknown |  |
| Delete(id: number) | unknown |  |
| StorableName() | string | (abstract) |

## Aventus.Style

 - Type : Class
 - Import : import { Style } from "Aventus@Main:Aventus.package.avt"

### Methods

| Name | Return | Description |
| --- | --- | --- |
| load(name: string, url: string) | Promise&lt;void&gt; |  |
| store(name: string, content: string) | any |  |
| get(name: string) | CSSStyleSheet |  |
| getAsString(name: string) | string |  |
| sheetToString(stylesheet: CSSStyleSheet) | string |  |

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| noAnimation | CSSStyleSheet |  |

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| store(name: string, content: string) | void |  |
| get(name: string) | CSSStyleSheet |  |
| getAsString(name: string) | string |  |
| sheetToString(stylesheet: CSSStyleSheet) | string |  |
| load(name: string, url: string) | Promise&lt;void&gt; |  |
| appendToHead(name: string) | void |  |
| refreshHead(name: string) | void |  |

## Aventus.Template

 - Type : Class
 - Import : import { Template } from "Aventus@Main:Aventus.package.avt"

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| cst | typeof Aventus.WebComponent |  |
| template | HTMLTemplateElement |  |
| actions | Aventus.Actions |  |
| loops | Aventus.Loop |  |
| ifs | Aventus.If |  |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| setHTML(data: Aventus.TemplateHTML) | void |  |
| generateTemplate() | void |  |
| setTemplate(template: string) | void | Used by the for loop and the if |
| setActions(actions: Aventus.Actions) | void |  |
| addLoop(loop: Aventus.Loop) | void |  |
| addIf(_if: Aventus.If) | void |  |
| createInstance(component: Aventus.WebComponent) | any |  |

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| validatePath(path: string, pathToCheck: string) | boolean |  |

## Aventus.TemplateContext

 - Type : Class
 - Import : import { TemplateContext } from "Aventus@Main:Aventus.package.avt"

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| data | { [name: string]: any; } |  |
| comp | Aventus.WebComponent |  |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| print(value: any) | string |  |
| registerIndex() | string |  |
| registerLoop(dataName: string, _indexValue: number, _indexName: string, indexName: string &vert; undefined, itemName: string &vert; undefined, onThis: boolean) | void |  |
| increaseIndex(_indexName: string) | void |  |
| decreaseIndex(_indexName: string) | void |  |
| destructor() | void |  |
| registerWatch(name: string, value: any) | void |  |
| updateWatch(name: string, value: any, dones: any) | void |  |
| normalizePath(path: string) | string |  |
| getValueFromItem(name: string) | any |  |
| setValueToItem(name: string, value: any) | void |  |

## Aventus.TemplateInstance

 - Type : Class
 - Import : import { TemplateInstance } from "Aventus@Main:Aventus.package.avt"

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| content | DocumentFragment |  |
| firstChild | HTMLElement &vert; null |  |
| lastChild | HTMLElement &vert; null |  |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| render() | void |  |
| destructor() | void |  |
| removeFromDOM(avoidTrigger: boolean) | void |  |

## Aventus.Time

Immutable wall-clock time without date or timezone. Arithmetic wraps at midnight.

 - Type : Class
 - Import : import { Time } from "Aventus@Main:Aventus.package.avt"

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| hour | number |  |
| minute | number |  |
| second | number |  |
| millisecond | number |  |
| microsecond | number |  |
| nanosecond | number |  |
| isPast | boolean |  |
| isFuture | boolean |  |
| nanosecondsSinceMidnight | number |  |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| with(values: { hour?: number; minute?: number; second?: number; millisecond?: number; microsecond?: number; nanosecond?: number; }) | Time |  |
| addHours(hours: number) | Time |  |
| addMinutes(minutes: number) | Time |  |
| addSeconds(seconds: number) | Time |  |
| addMilliseconds(milliseconds: number) | Time |  |
| addMicroseconds(microseconds: number) | Time |  |
| addNanoseconds(nanoseconds: number) | Time |  |
| compareTo(other: Time) | number |  |
| equals(other: unknown) | boolean |  |
| equalsToMinute(other: unknown) | boolean |  |
| isBefore(other: Time) | boolean |  |
| isAfter(other: Time) | boolean |  |
| isSameOrBefore(other: Time) | boolean |  |
| isSameOrAfter(other: Time) | boolean |  |
| hoursUntil(other: Time) | number | Signed number of complete units on the same day; does not assume an overnight interval. |
| minutesUntil(other: Time) | number |  |
| secondsUntil(other: Time) | number |  |
| millisecondsUntil(other: Time) | number |  |
| diffHours(other: Time) | number | Absolute number of complete units on the same day; does not assume an overnight interval. |
| diffMinutes(other: Time) | number |  |
| diffSeconds(other: Time) | number |  |
| diffMilliseconds(other: Time) | number |  |
| toLocaleString(options: Intl.DateTimeFormatOptions, locale: string &vert; string) | string |  |
| toInputString(precision: 'minute' &vert; 'second' &vert; 'auto') | string | Stable input representation; minute precision is explicit and does not alter the value. |
| valueOf() | number |  |
| toString() | string |  |
| toJSON() | string |  |
| toTemporal() | Temporal.PlainTime |  |

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| configuration | Aventus.DateConfiguration |  |
| now | Time |  |

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| configure(options: Partial&lt;Aventus.DateConfiguration&gt;) | void |  |
| parse(text: string) | Time |  |
| tryParse(text: string) | Time &vert; null |  |

## Aventus.Uri

 - Type : Class
 - Import : import { Uri } from "Aventus@Main:Aventus.package.avt"

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| prepare(uri: string) | Aventus.PreparedUri |  |
| getParams(from: string &vert; Aventus.PreparedUri, current: string) | Aventus.UriParamsValue &vert; null |  |
| isActive(from: string &vert; Aventus.PreparedUri, current: string) | boolean |  |
| normalize(path: string) | any |  |

## Aventus.uuidv4()

Generate a new UUID

 - Return : string
## Aventus.VoidRamWithError

Class representing the result of an action that may contain RAM-specific errors without a result.
Inherits from VoidWithError with the error type RamError.

 - Type : Class
 - Import : import { VoidRamWithError } from "Aventus@Main:Aventus.package.avt"
 - Parent : Aventus.VoidWithError

## Aventus.VoidWithError<T extends Aventus.GenericError = Aventus.GenericError>

Represents a result of an action that may contain errors.

 - Type : Class
 - Import : import { VoidWithError } from "Aventus@Main:Aventus.package.avt"

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| success | boolean | Determine if the action is a success |
| errors | T | List of errors |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| toGeneric() | VoidWithError | Converts the current instance to a VoidWithError object. |
| containsCode<U extends Aventus.GenericError&lt;any&gt;, T extends number &vert; Aventus.Enum>(code: Aventus.EnumValue&lt;T&gt;, type: new (...args: any[]) =&gt; U(args: any)) | boolean | Checks if the error list contains a specific error code. |
| run(fct: () =&gt; T[] &vert; () =&gt; VoidWithError&lt;T&gt;) | this |  |
| runAsync(fct: () =&gt; Promise&lt;T[]&gt; &vert; () =&gt; Promise&lt;VoidWithError&lt;T&gt;&gt;) | Promise&lt;this&gt; |  |
| extract<X>(fct: () =&gt; Aventus.ResultWithError&lt;X, T&gt;) | X &vert; undefined |  |
| extractAsync<X>(fct: () =&gt; Promise&lt;Aventus.ResultWithError&lt;X, T&gt;&gt;) | Promise&lt;X &vert; undefined&gt; |  |

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| Fullname | string |  |

## Aventus.Watcher

 - Type : Class
 - Import : import { Watcher } from "Aventus@Main:Aventus.package.avt"

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| isNative(obj: any) | boolean |  |
| untrack<T>(fct: () =&gt; T(): T) | T | Read reactive values without registering them on the current effect. |
| get(obj: object, onDataChanged: Aventus.WatcherFunction) | any | Transform object into a watcher |
| is(obj: any) | boolean |  |
| extract<T>(obj: T, clearPath: boolean) | T |  |
| trigger<T>(type: 'CREATED' &vert; 'UPDATED' &vert; 'DELETED', target: T) | void |  |
| computed<T>(fct: () =&gt; ___Aventus.IsNotVoid&lt;T&gt;(): ___Aventus.IsNotVoid&lt;T&gt;) | Aventus.Computed&lt;T&gt; | Create a computed variable that will watch any changes |
| effect(fct: () =&gt; void(): void) | Aventus.Effect | Create an effect variable that will watch any changes |
| watch(fct: () =&gt; any(): any, cb: () =&gt; any(): any) | Aventus.Effect | Create an effect variable that will watch any changes inside the fct and trigger the cb on change |
| signal<T>(item: T, onChange: () =&gt; void(): void) | Aventus.Signal&lt;T&gt; | Create a signal variable |

## Aventus.WebComponent

 - Type : Class (Webcomponent)
 - Import : import { WebComponent } from "Aventus@Main:Aventus.package.avt"

### JS Props

| Name | Type | Description | Decorator |
| --- | --- | --- | --- |
| shadowRoot | ShadowRoot |  |  |
| isReady | boolean | Determine if the component is ready (postCreation done) |  |
| namespace | string | The current namespace |  |
| tag | string | The current tag |  |
| $type | string | Get the unique type for the data. Define it as the namespace + class name |  |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| getClassName() | string | Get the name of the component class |
| destructor() | void | Remove all listenersState + press |
| onReady(cb: Function) | void |  |
| remove(destruct: boolean) | void | Remove a component from the domIf desctruct is set to true, the component will be fully destroyed |
| findParentByTag<T>(tagname: string &vert; string, untilNode: Element) | T &vert; null | Find a parent by tagname if exist |
| findParentByClass<T>(classname: string &vert; string, untilNode: Element) | T &vert; null | Find a parent by class name if exist |
| findParentByType<T extends { prototype: any; }>(type: [any], untilNode: Element) | T[number]['prototype'] &vert; null | Find a parent by type if exist |
| findParentsByTag<T>(tagname: string &vert; string, untilNode: Element) | T | Find list of parents by tagname |
| findParents<T>(tagname: string &vert; string, check: (node: Node) =&gt; boolean(node: Node): boolean, untilNode: Element) | T | Find list of parents by custom check |
| findParent<T>(tagname: string &vert; string, check: (node: Node) =&gt; boolean(node: Node): boolean, untilNode: Element) | T &vert; null | Find list of parents by custom check |
| containsChild(el: Element) | boolean | Check if element contains a child |
| getElementsInSlot(slotName: string) | HTMLElement | Get elements inside slot |
| getNodesInSlot(slotName: string) | Node | Get nodes inside slot |
| getActiveElement(document: Document) | Element &vert; null | Get active element from the shadowroot or the document |

### JS Props Static

| Name | Type | Description | Decorator |
| --- | --- | --- | --- |
| observedAttributes | string | Add attributes informations |  |
| Namespace | string | The current namespace |  |
| Tag | string | The current Tag / empty if abstract class |  |
| Fullname | string | Get the unique type for the data. Define it as the namespace + class name |  |

## Aventus.WebComponentInstance

 - Type : Class
 - Import : import { WebComponentInstance } from "Aventus@Main:Aventus.package.avt"

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| lastDefinition | number | Last definition insert datetime |

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| getAllClassesOf<T>(type: typeof Aventus.WebComponent) | new () =&gt; Aventus.WebComponent | Get all sub classes of type |
| getAllDefinitions() | new () =&gt; Aventus.WebComponent | Get all registered definitions |
| addInstance(instance: Aventus.WebComponent) | void |  |
| removeInstance(instance: Aventus.WebComponent) | void |  |
| getAllInstances(type: new () =&gt; Aventus.WebComponent()) | {} |  |
| create<T>(type: string) | T &vert; null |  |
