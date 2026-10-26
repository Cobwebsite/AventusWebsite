# Aventus@UI

## Overview

| Nom | Type | Description |
| --- | --- | --- |
| [Aventus.Collapse](aventus.collapse) | Class (Webcomponent) | Provides a simple web component to toggle the visibility of content, often with a collapsing/expanding animation driven by CSS. (&lt;av-collapse&gt;&lt;/av-collapse&gt;) |
| [Aventus.Form.ButtonElement](aventus.form.buttonelement) | Class (Webcomponent) | Base class for form button elements, handling submission logic and integration with the Aventus form system. |
| [Aventus.Form.Form](aventus.form.form) | Class (Webcomponent) | Core web component for managing forms, including data handling, validation, and submission. It acts as an orchestrator for child form elements and can integrate with backend API routes. (&lt;av-form&gt;&lt;/av-form&gt;) |
| [Aventus.Form.FormElement](aventus.form.formelement) | Class (Webcomponent) | Abstract base class for all individual form input elements in the Aventus framework. It provides core functionality for value management, validation, error display, and integration with the parent Form component. |
| [Aventus.Form.FormHandler](aventus.form.formhandler) | Class | Provides core logic for handling forms, including data management, validation, and submission. |
| [Aventus.Form.FormHandlerController](aventus.form.formhandlercontroller) | Class | Extends FormHandler to integrate with Aventus HttpRoute controllers for form submissions. |
| [Aventus.Form.Validator](aventus.form.validator) | Class | Abstract base class for creating custom form validators. |
| [Aventus.Form.Validators.Email](aventus.form.validators.email) | Class | Validator for checking if a string is a valid email address. |
| [Aventus.Form.Validators.Required](aventus.form.validators.required) | Class | Validator for checking if a field has a value. |
| [Aventus.Img](aventus.img) | Class (Webcomponent) | A sophisticated image display component that handles responsive sizing, different content modes (stretch, contains, cover), and asynchronous loading of both raster images and SVG files. It ensures images are displayed correctly within their container, even with dynamic resizing. (&lt;av-img&gt;&lt;/av-img&gt;) |
| [Aventus.Layout.Col](aventus.layout.col) | Class (Webcomponent) | A foundational element for creating responsive grid layouts. Its behavior (sizing, offsetting, centering) is driven by CSS rules applied based on its attributes. (&lt;av-col&gt;&lt;/av-col&gt;) |
| [Aventus.Layout.GridGuideHelper](aventus.layout.gridguidehelper) | Class (Webcomponent) | Utility component for providing visual guides (like rulers or snap lines) within a grid layout. It allows users to drag these guides and snap them to a predefined grid, aiding in precise UI alignment. (&lt;av-grid-guide-helper&gt;&lt;/av-grid-guide-helper&gt;) |
| [Aventus.Layout.GridHelper](aventus.layout.gridhelper) | Class (Webcomponent) | Provides a comprehensive visual grid system and guide management for UI development. Features include configurable grid lines, rulers, draggable guides with magnetic snapping, and persistent storage for guide positions. (&lt;av-grid-helper&gt;&lt;/av-grid-helper&gt;) |
| [Aventus.Layout.Row](aventus.layout.row) | Class (Webcomponent) | A fundamental building block for creating flexible and responsive layouts. It acts as a container for Col components, arranging them horizontally, and is configured to work with CSS Container Queries. (&lt;av-row&gt;&lt;/av-row&gt;) |
| [Aventus.Layout.Scrollable](aventus.layout.scrollable) | Class (Webcomponent) | A highly customizable and interactive scroll container web component. It supports advanced features like zooming, pinch-to-zoom, custom scrollbars, auto-hide scrollbars, momentum scrolling, mouse-dragging for scrolling, and auto-scrolling. (&lt;av-scrollable&gt;&lt;/av-scrollable&gt;) |
| [Aventus.Layout.Tabs.Tab](aventus.layout.tabs.tab) | Class (Webcomponent) | Abstract base class for individual tab content panels within a tabbed interface. It manages its selected state and maintains a reference to its corresponding tab header. |
| [Aventus.Layout.Tabs.TabHeader](aventus.layout.tabs.tabheader) | Class (Webcomponent) | Abstract base class for the clickable header of an individual tab within a tabbed interface. It manages its active state, links to its corresponding Tab content, and handles user interaction to activate the tab. |
| [Aventus.Layout.Tabs.Tabs](aventus.layout.tabs.tabs) | Class (Webcomponent) | Abstract web component that serves as a container for a tabbed interface. It manages the loading, rendering, and activation of Tab content components and their corresponding TabHeader components. |
| [Aventus.Lib.ShortcutManager](aventus.lib.shortcutmanager) | Class | Manages global keyboard shortcuts, allowing subscription and unsubscription for custom key combinations. |
| [Aventus.Modal.ModalElement](aventus.modal.modalelement) | Class (Webcomponent) | Abstract base class for creating various types of modal dialogs or pop-ups. It provides core functionality for showing, closing, and configuring modal behavior, including options for closing with the Escape key or outside clicks. |
| [Aventus.Navigation.Default404](aventus.navigation.default404) | Class (Webcomponent) | A specialized Page component intended to be displayed when a requested route or resource is not found (a "404 Not Found" error). (&lt;av-default-404&gt;&lt;/av-default-404&gt;) |
| [Aventus.Navigation.Link](aventus.navigation.link) | Class (Webcomponent) | Provides declarative navigation within an Aventus application. It functions similarly to an HTML tag but integrates with the application's router for client-side routing, applying an "active" class based on the current route. (&lt;av-link&gt;&lt;/av-link&gt;) |
| [Aventus.Navigation.Page](aventus.navigation.page) | Class (Webcomponent) | Abstract base class for all routable pages within an Aventus application. It provides core functionality for page lifecycle management, visibility control, data loading, and access control. |
| [Aventus.Navigation.Router](aventus.navigation.router) | Class (Webcomponent) | The central navigation mechanism for Aventus applications. It manages application states, loads pages dynamically, handles URL changes, and provides mechanisms for defining routes, showing 404 pages, and controlling page lifecycles. |
| [Aventus.Navigation.RouterLink](aventus.navigation.routerlink) | Class (Webcomponent) | Provides declarative navigation within an Aventus application. It functions similarly to an HTML tag but integrates with the application's router for client-side routing, applying an "active" class based on the current route/state. (&lt;av-router-link&gt;&lt;/av-router-link&gt;) |
| [Aventus.Process](aventus.process) | Class | Utility class for executing asynchronous processes and handling errors. |
| [Aventus.ProgressCircle](aventus.progresscircle) | Class (Webcomponent) | Renders a circular progress indicator using SVG. It allows customization of the progress value and the thickness of the circle stroke. (&lt;av-progress-circle&gt;&lt;/av-progress-circle&gt;) |
| [Aventus.RouterStateManager](aventus.routerstatemanager) | Class | Manages the state and history of routes within an Aventus application. |
| [Aventus.Toast.ToastElement](aventus.toast.toastelement) | Class (Webcomponent) | Abstract base class for individual toast notifications. It provides core functionality for displaying, timing, and closing toasts, including animation handling and integration with a ToastManager. |
| [Aventus.Toast.ToastManager](aventus.toast.toastmanager) | Class (Webcomponent) | A web component that manages the display, positioning, and lifecycle of toast notifications. It provides functionality for adding new toasts, configuring default behaviors, and handling toast stacking and removal. (&lt;av-toast-manager&gt;&lt;/av-toast-manager&gt;) |
| [Aventus.TouchRecord](aventus.touchrecord) | Class | Records and manages multiple touch/pointer events for gestures like pinch-to-zoom. |
| [Aventus.Tracker](aventus.tracker) | Class | Tracks touch or pointer events to calculate movement, delta, and velocity. |

## Aventus.Collapse

Provides a simple web component to toggle the visibility of content, often with a collapsing/expanding animation driven by CSS.

 - Type : Class (Webcomponent)
 - Tag : &lt;av-collapse&gt;&lt;/av-collapse&gt;
 - Import : import { Collapse } from "Aventus@UI:Aventus.package.avt"
 - Parent : Aventus.WebComponent

### JS Props

| Name | Type | Description | Decorator |
| --- | --- | --- | --- |
| open | boolean | Controls the collapsed/expanded state of the component. When true, the content is visible; when false, it's hidden. | @Attribute() |
| no_animation | boolean | When true, disables the collapsing/expanding animation. | @Attribute() |
| horizontal | boolean |  | @Attribute() |
| reverse | boolean |  | @Attribute() |

### HTML Slots

| Name | Description |
| --- | --- |
| header |  |
| default |  |

### CSS Props

| Name | Type | Description |
| --- | --- | --- |
| --collapse-transition-duration |  |  |
| --collapse-transition-timing-function |  |  |

## Aventus.Form.ButtonElement

Base class for form button elements, handling submission logic and integration with the Aventus form system.

 - Type : Class (Webcomponent)
 - Import : import { ButtonElement } from "Aventus@UI:Aventus.Form.package.avt"
 - Parent : Aventus.WebComponent

### JS Props

| Name | Type | Description | Decorator |
| --- | --- | --- | --- |
| type | 'button' &vert; 'submit' &vert; 'reset' &vert; 'menu' | Defines the behavior of the button. - 'button': A generic button with no default behavior. - 'submit': Submits the form data. - 'reset': Resets the form to its initial state. - 'menu': A button that opens a menu. | @Property() |

### JS Props Static

| Name | Type | Description | Decorator |
| --- | --- | --- | --- |
| formAssociated | boolean | Indicates that this web component can be associated with a form. |  |

### HTML Slots

| Name | Description |
| --- | --- |
| default |  |

## Aventus.Form.Form<T extends any = any, R = any>

Core web component for managing forms, including data handling, validation, and submission. It acts as an orchestrator for child form elements and can integrate with backend API routes.

 - Type : Class (Webcomponent)
 - Tag : &lt;av-form&gt;&lt;/av-form&gt;
 - Import : import { Form } from "Aventus@UI:Aventus.Form.package.avt"
 - Parent : Aventus.WebComponent

### JS Props

| Name | Type | Description | Decorator |
| --- | --- | --- | --- |
| form | Aventus.Form.FormHandler&lt;any, R&gt; | The injected FormHandler instance managing form data, validation, and submission logic. |  |
| request | Aventus.Form.SubmitFunction&lt;T, R&gt; | An injected function for custom submission handling. |  |
| onSubmit | Aventus.Callback&lt;() =&gt; void(): void&gt; | Callback triggered when the form is successfully submitted after validation, and no custom request function is provided. |  |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| registerElement(element: Aventus.Form.FormElement&lt;any&gt;) | Aventus.Form.Form | Registers a FormElement instance with this form. It ensures only the latest registered element has the 'keyup' event listener for "Enter" key. |
| registerSubmit(element: Aventus.Form.ButtonElement) | Aventus.Form.Form | Registers a ButtonElement instance as a submit button for this form. |
| requestSubmit() | Promise&lt;void&gt; | Asynchronously handles the form submission process. It finds the associated FormHandler if not already set, manages loading states of buttons, and either calls a custom submission function or triggers validation and the onSubmit callback. |

### JS Props Static

| Name | Type | Description | Decorator |
| --- | --- | --- | --- |
| defaultConfig | Aventus.Form.FormHandlerConfig&lt;any&gt; &vert; undefined | Gets the global default configuration for FormHandler instances. |  |
| formElements | any | Sets the list of constructors for IForm implementing elements. |  |
| formElements | Aventus.Form.Constructor&lt;Aventus.Form.IForm, true&gt; | Gets the list of constructors for IForm implementing elements. |  |

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| createFromController<T extends Aventus.HttpRoute, M extends Aventus.Form.MethodName&lt;T&gt;>(controller: new () =&gt; T(), name: M, schema: Aventus.Form.FormSchema&lt;Aventus.Form.MethodBody&lt;T, M&gt;&gt;, config: Aventus.Form.FormHandlerControllerConfig&lt;T, M&gt;) | Aventus.Form.FormHandlerController&lt;T, M&gt; |  |
| create<T, R = any>(schema: Aventus.Form.FormSchema&lt;T&gt;, config: Aventus.Form.FormHandlerConfig&lt;T, R&gt;) | Aventus.Form.FormHandler&lt;T, R&gt; | Factory method to create a FormHandler instance directly from a FormSchema. |
| configure(value: Aventus.Form.FormHandlerConfig&lt;any&gt;) | void | Sets a global default configuration for all FormHandler instances. |

### HTML Slots

| Name | Description |
| --- | --- |
| default |  |

## Aventus.Form.FormElement<T>

Abstract base class for all individual form input elements in the Aventus framework. It provides core functionality for value management, validation, error display, and integration with the parent Form component.

 - Type : Class (Webcomponent)
 - Import : import { FormElement } from "Aventus@UI:Aventus.Form.package.avt"
 - Parent : Aventus.WebComponent

### JS Props

| Name | Type | Description | Decorator |
| --- | --- | --- | --- |
| disabled | boolean | Indicates whether the form element is disabled. This is a property that can be reflected from a disabled state of the form. | @Property() |
| value | Aventus.Form.DefinedFormValue&lt;T&gt; &vert; undefined | The current value of the form element. Changes to this property trigger onValueChange(). | @Watch() |
| errors | string | List of error messages for the current form element. Changes to this property trigger onErrorsChange(). | @Watch() |
| form | Aventus.Form.InternalFormPart&lt;Aventus.Form.DefinedFormValue&lt;T&gt;&gt; &vert; undefined | Gets or sets the element's part within the overall form handler. Setting this property will unlink and relink the form part. |  |
| form | any |  |  |
| onChange | Aventus.Callback&lt;(value: Aventus.Form.DefinedFormValue&lt;T&gt; &vert; undefined) =&gt; void(value: Aventus.Form.DefinedFormValue&lt;T&gt; &vert; undefined): void&gt; | Callback triggered when the value of the form element changes. |  |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| onFormValidation(errors: string) | Promise&lt;string&gt; | Handles validation results from the parent form, combining its own validation errors. |
| validate() | Promise&lt;boolean&gt; | Triggers the element's custom validation or delegates to the form's validation if linked. |

### JS Props Static

| Name | Type | Description | Decorator |
| --- | --- | --- | --- |
| formAssociated | boolean | Indicates that this web component can be associated with a form. |  |

### HTML Slots

| Name | Description |
| --- | --- |
| default |  |

## Aventus.Form.FormHandler<T, R = any>

Provides core logic for handling forms, including data management, validation, and submission.

 - Type : Class
 - Import : import { FormHandler } from "Aventus@UI:Aventus.Form.package.avt"

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| item | T | The data item associated with the form. |
| item | any | Sets the data item associated with the form. |
| parts | Aventus.Form.InternalForm&lt;T&gt; | Provides access to the internal form parts for the schema. |
| elements | { [K in typeof T]?: Aventus.Form.IFormElement; } | Provides access to the registered form elements. |
| hasSubmitFct | boolean | Checks if a submission function is defined for the form. |
| defaultValues | T | The default values for the form fields. |
| onItemChange | Aventus.Callback&lt;(action: Aventus.WatchAction, path: string, value: any) =&gt; void(action: Aventus.WatchAction, path: string, value: any): void&gt; | Callback triggered when an item's property changes. |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| validate() | Promise&lt;boolean&gt; |  |
| submit<X>(query: Aventus.Form.SubmitFunction&lt;T, X&gt;) | Promise&lt;Aventus.Form.WithError&lt;X&gt; &vert; null&gt; | Handles form submission, including validation and execution of the submission function. |
| execute<X>(query: Aventus.Form.SubmitFunction&lt;T, X&gt;) | Promise&lt;Aventus.Form.WithError&lt;X&gt;&gt; | Executes the form's submission function after validation. |
| parseErrors<X>(queryResult: Aventus.Form.WithError&lt;X&gt;) | Aventus.GenericError | Parse errors and display them inside the FormElement if possible |
| reset() | void | Reset form with default values |

## Aventus.Form.FormHandlerController<T extends Aventus.HttpRoute, M extends Aventus.Form.MethodName&lt;T&gt; = Aventus.Form.MethodNameExist&lt;T&gt;, Key extends typeof Aventus.Form.ObjectParameter&lt;T[M]&gt; &vert; '' = ''>

Extends FormHandler to integrate with Aventus HttpRoute controllers for form submissions.

 - Type : Class
 - Import : import { FormHandlerController } from "Aventus@UI:Aventus.Form.package.avt"
 - Parent : Aventus.Form.FormHandler

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| controller | new () =&gt; T() | The HttpRoute controller constructor. |

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| create<T extends Aventus.HttpRoute, M extends Aventus.Form.MethodName&lt;T&gt; = Aventus.Form.MethodNameExist&lt;T&gt;>(controller: new () =&gt; T(), schema: Aventus.Form.FormSchema&lt;Aventus.Form.MethodBody&lt;T, M&gt;&gt;, config: Aventus.Form.FormHandlerControllerConfig&lt;T, M&gt;) | any | Creates a FormHandlerController instance, inferring the submission method if only one exists. |
| createWithName<T extends Aventus.HttpRoute, M extends Aventus.Form.MethodName&lt;T&gt;>(controller: new () =&gt; T(), name: M, schema: Aventus.Form.FormSchema&lt;Aventus.Form.MethodBody&lt;T, M&gt;&gt;, config: Aventus.Form.FormHandlerControllerConfig&lt;T, M&gt;) | any | Creates a FormHandlerController instance with a explicitly named submission method. |
| createSubForm<T extends Aventus.HttpRoute, M extends Aventus.Form.MethodName&lt;T&gt; = Aventus.Form.MethodNameExist&lt;T&gt;, Key extends typeof Aventus.Form.ObjectParameter&lt;T[M]&gt; &vert; '' = ''>(controller: new () =&gt; T(), formKey: Key, schema: Aventus.Form.FormSchema&lt;Aventus.Form.MethodBody&lt;T, M, Key&gt;&gt;, config: Aventus.Form.FormHandlerControllerConfig&lt;T, M, Key&gt;) | any | Creates a FormHandlerController instance, inferring the submission method if only one exists. |
| createSubFormWithName<T extends Aventus.HttpRoute, M extends Aventus.Form.MethodName&lt;T&gt;, Key extends typeof Aventus.Form.ObjectParameter&lt;T[M]&gt; &vert; '' = ''>(controller: new () =&gt; T(), name: M, formKey: Key, schema: Aventus.Form.FormSchema&lt;Aventus.Form.MethodBody&lt;T, M, Key&gt;&gt;, config: Aventus.Form.FormHandlerControllerConfig&lt;T, M, Key&gt;) | any | Creates a FormHandlerController instance with a explicitly named submission method. |

## Aventus.Form.isSubclassOf(subClass: Function, superClass: Function)

Checks if a given class is a subclass of another class.

 - Return : boolean
## Aventus.Form.Validator<T>

Abstract base class for creating custom form validators.

 - Type : Class
 - Import : import { Validator } from "Aventus@UI:Aventus.Form.package.avt"

### Methods

| Name | Return | Description |
| --- | --- | --- |
| validate(value: T &vert; undefined, name: string, globalValidation: () =&gt; Promise&lt;void&gt;(): Promise&lt;void&gt;) | Aventus.Form.FormValidateResult | (abstract) Abstract method to be implemented by subclasses for custom validation logic. |

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| msg | string &vert; () =&gt; string | The default error message for the validator. |

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| Test(validators: Aventus.Form.Constructor&lt;Aventus.Form.Validator&lt;any&gt;&gt; &vert; Aventus.Form.Constructor&lt;Aventus.Form.Validator&lt;any&gt;&gt;, value: any, name: string, globalValidation: () =&gt; Promise&lt;void&gt;(): Promise&lt;void&gt;) | Promise&lt;string &vert; undefined&gt; | Statically tests a value against one or more validators. |

## Aventus.Form.Validators.Email

Validator for checking if a string is a valid email address.

 - Type : Class
 - Import : import { Email } from "Aventus@UI:Aventus.Form.Validators.package.avt"
 - Parent : Aventus.Form.Validator

### Methods

| Name | Return | Description |
| --- | --- | --- |
| validate(value: string &vert; undefined, name: string, globalValidation: () =&gt; Promise&lt;void&gt;(): Promise&lt;void&gt;) | boolean &vert; string |  |

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| msg | string &vert; () =&gt; string | The default error message for invalid email addresses. |

## Aventus.Form.Validators.Required

Validator for checking if a field has a value.

 - Type : Class
 - Import : import { Required } from "Aventus@UI:Aventus.Form.Validators.package.avt"
 - Parent : Aventus.Form.Validator

### Methods

| Name | Return | Description |
| --- | --- | --- |
| validate(value: any &vert; undefined, name: string, globalValidation: () =&gt; Promise&lt;void&gt;(): Promise&lt;void&gt;) | string &vert; boolean |  |

### JS Props Static

| Name | Type | Description |
| --- | --- | --- |
| msg | string &vert; () =&gt; string | The default error message for a required field. |

## Aventus.Img

A sophisticated image display component that handles responsive sizing, different content modes (stretch, contains, cover), and asynchronous loading of both raster images and SVG files. It ensures images are displayed correctly within their container, even with dynamic resizing.

 - Type : Class (Webcomponent)
 - Tag : &lt;av-img&gt;&lt;/av-img&gt;
 - Import : import { Img } from "Aventus@UI:Aventus.package.avt"
 - Parent : Aventus.WebComponent

### JS Props

| Name | Type | Description | Decorator |
| --- | --- | --- | --- |
| cache | boolean | If true, the image will be loaded and cached as a base64 string. | @Attribute() |
| src | string | The URL of the image to display. Changes to this property trigger onSrcChanged(). | @Property() |
| mode | 'stretch' &vert; 'contains' &vert; 'cover' | Determines how the image content should fit within its container. - 'stretch': Stretches the image to fill the container. - 'contains': Scales the image to fit within the container while preserving its aspect ratio. - 'cover': Scales the image to cover the entire container while preserving its aspect ratio. | @Property() |

### CSS Props

| Name | Type | Description |
| --- | --- | --- |
| --img-color |  |  |
| --img-stroke-color |  |  |
| --img-fill-color |  |  |
| --img-color-transition |  |  |

## Aventus.Layout.Col

A foundational element for creating responsive grid layouts. Its behavior (sizing, offsetting, centering) is driven by CSS rules applied based on its attributes.

 - Type : Class (Webcomponent)
 - Tag : &lt;av-col&gt;&lt;/av-col&gt;
 - Import : import { Col } from "Aventus@UI:Aventus.Layout.package.avt"
 - Parent : Aventus.WebComponent

### JS Props

| Name | Type | Description | Decorator |
| --- | --- | --- | --- |
| use_container | boolean | Indicates if the column should act as a container. Can be configured globally or overridden per instance. | @Attribute() |
| size | number | Defines the column's width. | @Attribute() |
| size_xs | number | Defines the column's width for extra small screens. | @Attribute() |
| size_sm | number | Defines the column's width for small screens. | @Attribute() |
| size_md | number | Defines the column's width for medium screens. | @Attribute() |
| size_lg | number | Defines the column's width for large screens. | @Attribute() |
| size_xl | number | Defines the column's width for extra large screens. | @Attribute() |
| offset | number | Defines the column's left offset. | @Attribute() |
| offset_xs | number | Defines the column's left offset for extra small screens. | @Attribute() |
| offset_sm | number | Defines the column's left offset for small screens. | @Attribute() |
| offset_md | number | Defines the column's left offset for medium screens. | @Attribute() |
| offset_lg | number | Defines the column's left offset for large screens. | @Attribute() |
| offset_xl | number | Defines the column's left offset for extra large screens. | @Attribute() |
| offset_right | number | Defines the column's right offset. | @Attribute() |
| offset_right_xs | number | Defines the column's right offset for extra small screens. | @Attribute() |
| offset_right_sm | number | Defines the column's right offset for small screens. | @Attribute() |
| offset_right_md | number | Defines the column's right offset for medium screens. | @Attribute() |
| offset_right_lg | number | Defines the column's right offset for large screens. | @Attribute() |
| offset_right_xl | number | Defines the column's right offset for extra large screens. | @Attribute() |
| center | boolean | When true, centers the content within the column. | @Attribute() |

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| configure(options: Aventus.Layout.ColOptions) | void | Allows global configuration of Col components. |

### HTML Slots

| Name | Description |
| --- | --- |
| default |  |

### CSS Props

| Name | Type | Description |
| --- | --- | --- |
| --col-padding |  |  |

## Aventus.Layout.GridGuideHelper

Utility component for providing visual guides (like rulers or snap lines) within a grid layout. It allows users to drag these guides and snap them to a predefined grid, aiding in precise UI alignment.

 - Type : Class (Webcomponent)
 - Tag : &lt;av-grid-guide-helper&gt;&lt;/av-grid-guide-helper&gt;
 - Import : import { GridGuideHelper } from "Aventus@UI:Aventus.Layout.package.avt"
 - Parent : Aventus.WebComponent

### JS Props

| Name | Type | Description | Decorator |
| --- | --- | --- | --- |
| direction | "y" &vert; "x" | Specifies the orientation of the guide: "x" for vertical, "y" for horizontal. | @Attribute() |
| moving | boolean | Indicates whether the guide is currently being dragged. | @Attribute() |
| container | Aventus.Layout.GridHelper | Reference to the parent GridHelper component, which provides context for grid properties like step and magnetic snap. |  |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| displayValue(v: number) | void | Updates the inner HTML of the component to display the guide's current position, converted to the appropriate unit by the container. |
| onStart() | void | Callback executed when dragging starts. Sets the moving attribute to true. |
| onMoveX(e: Aventus.NormalizedEvent) | void | Callback executed during horizontal dragging. Updates the guide's top style and positionEl's left style, applying magnetic snapping and displaying the new value. |
| onMoveY(e: Aventus.NormalizedEvent) | void | Callback executed during vertical dragging. Updates the guide's left style and positionEl's top style, applying magnetic snapping and displaying the new value. |
| onStop() | void | Callback executed when dragging stops. Sets moving to false and calls the save() method on the parent container. |

### HTML Slots

| Name | Description |
| --- | --- |
| default |  |

## Aventus.Layout.GridHelper

Provides a comprehensive visual grid system and guide management for UI development. Features include configurable grid lines, rulers, draggable guides with magnetic snapping, and persistent storage for guide positions.

 - Type : Class (Webcomponent)
 - Tag : &lt;av-grid-helper&gt;&lt;/av-grid-helper&gt;
 - Import : import { GridHelper } from "Aventus@UI:Aventus.Layout.package.avt"
 - Parent : Aventus.WebComponent

### JS Props

| Name | Type | Description | Decorator |
| --- | --- | --- | --- |
| unit | 'px' &vert; 'rem' &vert; 'cm' &vert; 'mm' &vert; 'in' | The unit of measurement for grid and ruler calculations. Changes update CSS variables for ruler styling. | @Property() |
| nb_col | number | The number of columns in the grid. If 0, col_width is used. | @Property() |
| nb_row | number | The number of rows in the grid. If 0, row_height is used. | @Property() |
| col_width | number | The width of each column. Used if nb_col is 0. | @Property() |
| row_height | number | The height of each row. Used if nb_row is 0. | @Property() |
| show_rulers | boolean | Whether to display the rulers. | @Attribute() |
| show_grid | boolean | Whether to display the grid lines. | @Attribute() |
| show_ruler | boolean | Whether to display the rulers. | @Attribute() |
| show_guides | boolean | Whether to display the draggable guides. | @Attribute() |
| lock | boolean | If true, guides cannot be dragged or created. | @Attribute() |
| visible | boolean | Overall visibility of the GridHelper component. | @Attribute() |
| ruler_size | number | The size (thickness) of the rulers in the specified unit. | @Property() |
| step | number | The base step size for grid lines and guide snapping in the specified unit. | @Property() |
| step_big | number | A larger step size for major grid lines, if different from step. | @Property() |
| magnetic | number | The magnetic snap distance for guides in the specified unit. | @Property() |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| inPx(nb: number) | number | Converts a given number from the component's unit to pixels. |
| fromPx(nbPx: number) | number | Converts a given number from pixels to the component's unit. |
| createGuideFromLeft(left: number) | void | Programmatically creates a vertical guide at a specified left position. |
| createGuideFromTop(top: number) | void | Programmatically creates a horizontal guide at a specified top position. |
| save() | void | Saves the positions of the currently active GridGuideHelper instances to localStorage for persistence. |
| reload() | void | Loads saved guide positions from localStorage and recreates GridGuideHelper instances. |

## Aventus.Layout.Row

A fundamental building block for creating flexible and responsive layouts. It acts as a container for Col components, arranging them horizontally, and is configured to work with CSS Container Queries.

 - Type : Class (Webcomponent)
 - Tag : &lt;av-row&gt;&lt;/av-row&gt;
 - Import : import { Row } from "Aventus@UI:Aventus.Layout.package.avt"
 - Parent : Aventus.WebComponent

### HTML Slots

| Name | Description |
| --- | --- |
| default |  |

### CSS Props

| Name | Type | Description |
| --- | --- | --- |
| --col-gap |  |  |
| --col-gap-y |  |  |
| --col-gap-x |  |  |

## Aventus.Layout.Scrollable

A highly customizable and interactive scroll container web component. It supports advanced features like zooming, pinch-to-zoom, custom scrollbars, auto-hide scrollbars, momentum scrolling, mouse-dragging for scrolling, and auto-scrolling.

 - Type : Class (Webcomponent)
 - Tag : &lt;av-scrollable&gt;&lt;/av-scrollable&gt;
 - Import : import { Scrollable } from "Aventus@UI:Aventus.Layout.package.avt"
 - Parent : Aventus.WebComponent

### JS Props

| Name | Type | Description | Decorator |
| --- | --- | --- | --- |
| zoom | number | Sets the zoom level to apply to the container's content. Changes trigger a recalculation of dimensions and transformations. | @Property() |
| min_zoom | number | The minimum allowed zoom level for the content. | @Attribute() |
| max_zoom | number | The maximum allowed zoom level for the content. | @Attribute() |
| floating_scroll | boolean | Determines if the custom scrollbars will be floating over the content or occupy space. | @Attribute() |
| x_scroll | boolean | Determines if horizontal scrolling is allowed. | @Attribute() |
| y_scroll | boolean | Determines if vertical scrolling is allowed. | @Attribute() |
| auto_hide | boolean | If true, the custom scrollers will hide when not in use and reappear on interaction. | @Attribute() |
| break | number | Controls the decay rate of momentum scrolling (value between 0 and 1). | @Attribute() |
| disable | boolean | If true, disables all user interaction (scrolling, zooming, dragging) with the component. | @Attribute() |
| mouse_drag | boolean | If true, allows scrolling by dragging with the mouse. | @Attribute() |
| pinch | boolean | If true, enables pinch-to-zoom functionality for touch devices. | @Attribute() |
| flex | boolean | If true, sets the internal content containers to display: flex and flex-direction: column, useful for allowing content to take up remaining space. | @Attribute() |
| x | number | Getter for the current horizontal scroll position. |  |
| y | number | Getter for the current vertical scroll position. |  |
| xMax | number | Getter for the maximum horizontal scroll position. |  |
| yMax | number | Getter for the maximum vertical scroll position. |  |
| onScrollChange | Aventus.Callback&lt;(x: number, y: number) =&gt; void(x: number, y: number): void&gt; | Callback triggered whenever the scroll position changes. |  |
| onZoomChange | Aventus.Callback&lt;(zoom: number) =&gt; void(zoom: number): void&gt; | Callback triggered whenever the zoom level changes. |  |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| scrollToPosition(x: number, y: number) | void | Scrolls the content to a specific absolute (x, y) pixel position. |
| scrollX(x: number) | void | Scrolls the content horizontally to a specific absolute pixel position. |
| scrollXPercent(x: number) | void | Scrolls the content horizontally to a specific percentage of its total width. |
| scrollY(y: number) | void | Scrolls the content vertically to a specific absolute pixel position. |
| scrollYPercent(y: number) | void | Scrolls the content vertically to a specific percentage of its total height. |
| autoScrollRight(percent: number) | void | Starts auto-scrolling the content to the right with a specified speed percentage. |
| stopAutoScrollRight() | void | Stops any active auto-scrolling to the right. |
| autoScrollLeft(percent: number) | void | Starts auto-scrolling the content to the left with a specified speed percentage. |
| stopAutoScrollLeft() | void | Stops any active auto-scrolling to the left. |
| autoScrollTop(percent: number) | void | Starts auto-scrolling the content upwards with a specified speed percentage. |
| stopAutoScrollTop() | void | Stops any active auto-scrolling upwards. |
| autoScrollBottom(percent: number) | void | Starts auto-scrolling the content downwards with a specified speed percentage. |
| stopAutoScrollBottom() | void | Stops any active auto-scrolling downwards. |
| zoomOnPoint(clientX: number, clientY: number, newZoom: number) | void | Zooms the content around a specific client coordinate. |

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| lock(element: Aventus.WebComponent) | void | Locks scrolling for a Scrollable component that is a parent of the given element. |
| unlock(element: Aventus.WebComponent) | void | Unlocks scrolling for a Scrollable component that is a parent of the given element. |

### HTML Slots

| Name | Description |
| --- | --- |
| default |  |

### CSS Props

| Name | Type | Description |
| --- | --- | --- |
| --scrollbar-container-color |  |  |
| --scrollbar-color |  |  |
| --scrollbar-active-color |  |  |
| --scroller-width |  |  |
| --scroller-top |  |  |
| --scroller-bottom |  |  |
| --scroller-right |  |  |
| --scroller-left |  |  |
| --scrollbar-content-padding |  |  |
| --scrollbar-container-display |  |  |

## Aventus.Layout.Tabs.Tab

Abstract base class for individual tab content panels within a tabbed interface. It manages its selected state and maintains a reference to its corresponding tab header.

 - Type : Class (Webcomponent)
 - Import : import { Tab } from "Aventus@UI:Aventus.Layout.Tabs.package.avt"
 - Parent : Aventus.WebComponent

### JS Props

| Name | Type | Description | Decorator |
| --- | --- | --- | --- |
| selected | boolean | Indicates whether this tab is currently active/selected. | @Attribute() |
| loaded | boolean |  | @Attribute() |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| identifier() | string | (abstract) Abstract method that concrete tab implementations must provide. It should return a unique string identifier for the tab, used to link the tab content with its header. |

### HTML Slots

| Name | Description |
| --- | --- |
| default |  |

## Aventus.Layout.Tabs.TabHeader<T extends Aventus.Layout.Tabs.Tab>

Abstract base class for the clickable header of an individual tab within a tabbed interface. It manages its active state, links to its corresponding Tab content, and handles user interaction to activate the tab.

 - Type : Class (Webcomponent)
 - Import : import { TabHeader } from "Aventus@UI:Aventus.Layout.Tabs.package.avt"
 - Parent : Aventus.WebComponent

### JS Props

| Name | Type | Description | Decorator |
| --- | --- | --- | --- |
| active | boolean | Indicates whether this tab header is currently active. | @Attribute() |
| tab | T | Gets the associated Tab instance. |  |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| init(tab: T, tabs: Aventus.Layout.Tabs.Tabs&lt;T, this&gt;) | any | Initializes the TabHeader by linking it to a Tab component and its parent Tabs component, then triggers its render() method. |
| render() | Aventus.Asyncable&lt;void&gt; | (abstract) Abstract method that concrete TabHeader implementations must provide to define how they visually render themselves. |
| onPress() | void | Called when the tab header is pressed. If the tab is not already active, it calls setActive() on the parent Tabs component to activate this tab. |

### HTML Slots

| Name | Description |
| --- | --- |
| default |  |

## Aventus.Layout.Tabs.Tabs<T extends Aventus.Layout.Tabs.Tab, U extends Aventus.Layout.Tabs.TabHeader&lt;T&gt;>

Abstract web component that serves as a container for a tabbed interface. It manages the loading, rendering, and activation of Tab content components and their corresponding TabHeader components.

 - Type : Class (Webcomponent)
 - Import : import { Tabs } from "Aventus@UI:Aventus.Layout.Tabs.package.avt"
 - Parent : Aventus.WebComponent

### Methods

| Name | Return | Description |
| --- | --- | --- |
| setActive(tabHeader: Aventus.Layout.Tabs.TabHeader&lt;T&gt; &vert; number &vert; string) | boolean | Sets a specific tab as active. It can accept a TabHeader instance, an index (number), or a tab identifier (string). It deactivates the previously active tab and activates the new one, managing their active and selected attributes and display styles. |

### HTML Slots

| Name | Description |
| --- | --- |
| default |  |

## Aventus.Lib.ShortcutManager

Manages global keyboard shortcuts, allowing subscription and unsubscription for custom key combinations.

 - Type : Class
 - Import : import { ShortcutManager } from "Aventus@UI:Aventus.Lib.package.avt"

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| subscribe(combinaison: Aventus.Lib.SpecialTouch &vert; string &vert; Aventus.Lib.SpecialTouch &vert; string, cb: () =&gt; void &vert; false &vert; Promise&lt;void&gt; &vert; Promise&lt;false&gt;(): void &vert; false &vert; Promise&lt;void&gt; &vert; Promise&lt;false&gt;, options: Aventus.Lib.ShortcutManagerOptions) | void | Subscribes a callback function to a specific keyboard shortcut combination. |
| unsubscribe(combinaison: Aventus.Lib.SpecialTouch &vert; string &vert; Aventus.Lib.SpecialTouch &vert; string, cb: () =&gt; void &vert; false &vert; Promise&lt;void&gt; &vert; Promise&lt;false&gt;(): void &vert; false &vert; Promise&lt;void&gt; &vert; Promise&lt;false&gt;) | void | Unsubscribes a callback function from a keyboard shortcut combination. |
| init() | void | Initializes the ShortcutManager, setting up global event listeners. |
| setAutoPrevents(combinaisons: Aventus.Lib.SpecialTouch &vert; string) | void | Sets key combinations that should automatically prevent default browser behavior. |

## Aventus.Modal.ModalElement<T, U extends Aventus.Modal.ModalOptions&lt;T&gt; = Aventus.Modal.ModalOptions&lt;T&gt;>

Abstract base class for creating various types of modal dialogs or pop-ups. It provides core functionality for showing, closing, and configuring modal behavior, including options for closing with the Escape key or outside clicks.

 - Type : Class (Webcomponent)
 - Import : import { ModalElement } from "Aventus@UI:Aventus.Modal.package.avt"
 - Parent : Aventus.WebComponent

### Methods

| Name | Return | Description |
| --- | --- | --- |
| configure() | U | (abstract) Abstract method to be implemented by subclasses to provide instance-specific modal options. |
| show(element: Element) | Promise&lt;T &vert; null&gt; | Displays the modal, appending it to the specified element or document.body. |

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| configure(options: Partial&lt;Aventus.Modal.ModalOptions&lt;any&gt;&gt;) | void | Allows global configuration of modal options for all instances. |

### HTML Slots

| Name | Description |
| --- | --- |
| default |  |

## Aventus.Navigation.Default404

A specialized Page component intended to be displayed when a requested route or resource is not found (a "404 Not Found" error).

 - Type : Class (Webcomponent)
 - Tag : &lt;av-default-404&gt;&lt;/av-default-404&gt;
 - Import : import { Default404 } from "Aventus@UI:Aventus.Navigation.package.avt"
 - Parent : Aventus.Navigation.Page

### Methods

| Name | Return | Description |
| --- | --- | --- |
| configure() | Aventus.Asyncable&lt;Aventus.Navigation.PageConfig&gt; |  |

## Aventus.Navigation.Link

Provides declarative navigation within an Aventus application. It functions similarly to an HTML tag but integrates with the application's router for client-side routing, applying an "active" class based on the current route.

 - Type : Class (Webcomponent)
 - Tag : &lt;av-link&gt;&lt;/av-link&gt;
 - Import : import { Link } from "Aventus@UI:Aventus.Navigation.package.avt"
 - Parent : Aventus.WebComponent

### JS Props

| Name | Type | Description | Decorator |
| --- | --- | --- | --- |
| to | string | Specifies the internal route path to navigate to. | @Attribute() |
| active_pattern | string | If set, defines a custom pattern to determine when the link should be considered "active", overriding the default behavior of matching to. | @Attribute() |
| onActiveChange | Aventus.Callback&lt;(isActive: boolean) =&gt; void(isActive: boolean): void&gt; | Callback triggered when the active state of the link changes. |  |

### HTML Slots

| Name | Description |
| --- | --- |
| default |  |

## Aventus.Navigation.Page<Slug extends Aventus.UriParamsValue = {}>

Abstract base class for all routable pages within an Aventus application. It provides core functionality for page lifecycle management, visibility control, data loading, and access control.

 - Type : Class (Webcomponent)
 - Import : import { Page } from "Aventus@UI:Aventus.Navigation.package.avt"
 - Parent : Aventus.WebComponent

### JS Props

| Name | Type | Description | Decorator |
| --- | --- | --- | --- |
| visible | boolean | Controls the visibility of the page. Changes to this property trigger onShow() or onHide() methods. | @Property() |
| router | Aventus.Navigation.Router | Reference to the parent Router component that manages this page. |  |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| configure() | Aventus.Asyncable&lt;Aventus.Navigation.PageConfig&gt; | (abstract) Abstract method that concrete page implementations must provide to return a PageConfig object, defining how the page should behave (e.g., whether it should be destroyed on hide). |
| show(state: Aventus.State) | any | Asynchronously makes the page visible, setting the state property and triggering onShow(). |
| hide() | any | Asynchronously makes the page hidden, clearing the state property and triggering onHide(). |
| onShow() | void | Lifecycle hook called when the page becomes visible. Subclasses can override this to implement custom logic. |
| onHide() | void | Lifecycle hook called when the page becomes hidden. Subclasses can override this to implement custom logic. |
| isAllowed(state: Aventus.State, pattern: string, router: Aventus.Navigation.Router) | Aventus.Asyncable&lt;boolean &vert; Aventus.State &vert; string&gt; | Asynchronous method that can be overridden to implement custom access control logic.Return true if evrything is okFalse will prevent showingstring or state will redirect to the page |
| loadData(state: Aventus.State, path: string) | Aventus.Asyncable&lt;boolean &vert; Aventus.State &vert; string&gt; | Asynchronous method that can be overridden to load data required by the page.Return true if evrything is okFalse will prevent showingstring or state will redirect to the page |
| getSlugs(path: string) | Partial&lt;Slug&gt; &vert; undefined |  |

### HTML Slots

| Name | Description |
| --- | --- |
| default |  |

## Aventus.Navigation.Router

The central navigation mechanism for Aventus applications. It manages application states, loads pages dynamically, handles URL changes, and provides mechanisms for defining routes, showing 404 pages, and controlling page lifecycles.

 - Type : Class (Webcomponent)
 - Import : import { Router } from "Aventus@UI:Aventus.Navigation.package.avt"
 - Parent : Aventus.WebComponent

### JS Props

| Name | Type | Description | Decorator |
| --- | --- | --- | --- |
| initializing | boolean |  | @Attribute() |
| contentEl | HTMLDivElement | Reference to the HTML element within the component's template where page content will be rendered. |  |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| getSlugs(path: string) | Aventus.UriParamsValue &vert; null | Retrieves URI parameters (slugs) for the currently active route. |
| navigate(state: Aventus.State &vert; string, options: { replace: boolean; }) | Promise&lt;boolean&gt; | Programmatically navigates to a new state or URL. |

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| configure(options: Aventus.Navigation.RouterOptions) | void | Allows global configuration of router options. |

### HTML Slots

| Name | Description |
| --- | --- |
| before |  |
| after |  |

## Aventus.Navigation.RouterLink

Provides declarative navigation within an Aventus application. It functions similarly to an HTML tag but integrates with the application's router for client-side routing, applying an "active" class based on the current route/state.

 - Type : Class (Webcomponent)
 - Tag : &lt;av-router-link&gt;&lt;/av-router-link&gt;
 - Import : import { RouterLink } from "Aventus@UI:Aventus.Navigation.package.avt"
 - Parent : Aventus.WebComponent

### JS Props

| Name | Type | Description | Decorator |
| --- | --- | --- | --- |
| state | string | Specifies the internal route state path to navigate to. | @Attribute() |
| active_state | string | If set, defines a custom pattern to determine when the link should be considered "active", overriding the default behavior of matching state. | @Attribute() |
| onActiveChange | Aventus.Callback&lt;(isActive: boolean) =&gt; void(isActive: boolean): void&gt; | Callback triggered when the active state of the link changes. |  |

### HTML Slots

| Name | Description |
| --- | --- |
| default |  |

## Aventus.Process

Utility class for executing asynchronous processes and handling errors.

 - Type : Class
 - Import : import { Process } from "Aventus@UI:Aventus.package.avt"

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| configure(config: Aventus.ProcessConfig) | void | Configures the Process utility with custom error handling. |
| execute<X extends Aventus.VoidWithError>(prom: Promise&lt;X&gt;) | Promise&lt;boolean &vert; undefined&gt; |  |
| parseErrors<X extends Aventus.VoidWithError>(result: X) | Promise&lt;boolean &vert; undefined&gt; |  |

## Aventus.ProgressCircle

Renders a circular progress indicator using SVG. It allows customization of the progress value and the thickness of the circle stroke.

 - Type : Class (Webcomponent)
 - Tag : &lt;av-progress-circle&gt;&lt;/av-progress-circle&gt;
 - Import : import { ProgressCircle } from "Aventus@UI:Aventus.package.avt"
 - Parent : Aventus.WebComponent

### JS Props

| Name | Type | Description | Decorator |
| --- | --- | --- | --- |
| value | number | Represents the progress percentage (0-100). Changes to this property trigger the render() method. | @Property() |
| stroke_width | number | Defines the thickness of the progress circle's stroke. Changes to this property trigger the render() method. | @Property() |

### HTML Slots

| Name | Description |
| --- | --- |
| default |  |

### CSS Props

| Name | Type | Description |
| --- | --- | --- |
| --progress-circle-back-circle-color |  |  |
| --progress-circle-percent-circle-color |  |  |
| --progress-circle-transition |  |  |

## Aventus.RouterStateManager

Manages the state and history of routes within an Aventus application.

 - Type : Class
 - Import : import { RouterStateManager } from "Aventus@UI:Aventus.package.avt"
 - Parent : Aventus.StateManager

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| getInstance() | RouterStateManager | Retrieves the singleton instance of the RouterStateManager. |

## Aventus.Toast.ToastElement<T extends Aventus.Toast.ToastOptions = Aventus.Toast.ToastOptions>

Abstract base class for individual toast notifications. It provides core functionality for displaying, timing, and closing toasts, including animation handling and integration with a ToastManager.

 - Type : Class (Webcomponent)
 - Import : import { ToastElement } from "Aventus@UI:Aventus.Toast.package.avt"
 - Parent : Aventus.WebComponent

### JS Props

| Name | Type | Description | Decorator |
| --- | --- | --- | --- |
| position | Aventus.Toast.ToastPosition | Defines where the toast should appear on the screen. | @Attribute() |
| delay | number | The duration (in milliseconds) before the toast automatically closes. Use -1 for an infinite timer. | @Attribute() |
| timeout | number | Stores the setTimeout ID for the auto-hide delay. |  |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| setOptions(options: T) | Aventus.Asyncable&lt;void&gt; | (abstract) Abstract method to be implemented by subclasses to apply specific options to the toast's content or styling. |
| show(onHideCallback: (result: boolean) =&gt; void(result: boolean): void) | void | Displays the toast notification. If the component is ready, it sets is_active to true and starts the auto-hide delay. Otherwise, it sets showAsked to true. |
| waitTransition() | Promise&lt;void&gt; | Returns a Promise that resolves when the current CSS transition on the element completes. If no transition is active, it resolves immediately. |

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| add(options: Aventus.Toast.ToastOptions) | Promise&lt;boolean&gt; | A static factory method that delegates to ToastManager.add() to create and display a new toast notification. |

### HTML Slots

| Name | Description |
| --- | --- |
| default |  |

## Aventus.Toast.ToastManager

A web component that manages the display, positioning, and lifecycle of toast notifications. It provides functionality for adding new toasts, configuring default behaviors, and handling toast stacking and removal.

 - Type : Class (Webcomponent)
 - Tag : &lt;av-toast-manager&gt;&lt;/av-toast-manager&gt;
 - Import : import { ToastManager } from "Aventus@UI:Aventus.Toast.package.avt"
 - Parent : Aventus.WebComponent

### JS Props

| Name | Type | Description | Decorator |
| --- | --- | --- | --- |
| containerHeight | number | Gets the current height of the ToastManager container element. |  |
| heightLimit | number | Calculates the maximum height available for toasts based on containerHeight and heightLimitPercent. |  |
| not_main | boolean | If true, this ToastManager instance will not be set as the static singleton instance. | @Attribute() |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| add<T extends Aventus.Toast.ToastOptions>(toast: Aventus.Toast.ToastElement&lt;T&gt; &vert; T) | Promise&lt;boolean&gt; | Adds a new toast notification to the manager. It handles instantiation, positioning, stacking, and queuing if height limits are exceeded. |

### Methods Static

| Name | Return | Description |
| --- | --- | --- |
| add<T extends Aventus.Toast.ToastOptions>(toast: Aventus.Toast.ToastElement&lt;T&gt; &vert; T) | Promise&lt;boolean&gt; | Adds a new toast notification to be displayed. If no ToastManager instance exists, it creates one and appends it to document.body. |
| configure(options: Partial&lt;Aventus.Toast.ToastManagerOptions&gt;) | void | Configures the static default options for the ToastManager. |

### HTML Slots

| Name | Description |
| --- | --- |
| default |  |

### CSS Props

| Name | Type | Description |
| --- | --- | --- |
| --toast-space-bottom |  |  |
| --toast-space-top |  |  |
| --toast-space-right |  |  |
| --toast-space-left |  |  |
| --toast-z-index |  |  |

## Aventus.TouchRecord

Records and manages multiple touch/pointer events for gestures like pinch-to-zoom.

 - Type : Class
 - Import : import { TouchRecord } from "Aventus@UI:Aventus.package.avt"

### Methods

| Name | Return | Description |
| --- | --- | --- |
| isActive() | boolean | Checks if there is an active touch/pointer event. |
| getDelta() | any | Retrieves the delta movement of the active tracker. |
| getVelocity() | any | Retrieves the velocity of the active tracker. |
| getNbOfTouches() | any | Returns the number of active touch/pointer events. |
| getTouches() | any | Returns an array of active Tracker instances. |
| getEasingDistance(damping: number) | { x: number; y: number; } | Calculates the easing distance based on current velocity and damping. |
| track(evt: TouchEvent &vert; PointerEvent &vert; MouseEvent) | { [id: number]: Aventus.Tracker; } | Starts tracking new touch/pointer events. |
| update(evt: TouchEvent &vert; PointerEvent &vert; MouseEvent) | { [id: number]: Aventus.Tracker; } | Updates existing tracked touch/pointer events. |
| release(evt: TouchEvent &vert; PointerEvent &vert; MouseEvent) | void | Releases tracking for ended touch/pointer events. |

## Aventus.Tracker

Tracks touch or pointer events to calculate movement, delta, and velocity.

 - Type : Class
 - Import : import { Tracker } from "Aventus@UI:Aventus.package.avt"

### JS Props

| Name | Type | Description |
| --- | --- | --- |
| updateTime | number | Timestamp of the last update. |
| delta | { x: number; y: number; } | Change in position since the last update. |
| velocity | { x: number; y: number; } | Current velocity of the tracker. |
| lastPosition | { x: number; y: number; } | Last recorded position. |

### Methods

| Name | Return | Description |
| --- | --- | --- |
| update(touch: Touch &vert; PointerEvent &vert; MouseEvent) | void | Updates the tracker's position, delta, and velocity. |
