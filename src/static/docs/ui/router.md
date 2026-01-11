# UI - Router Component

The <mark>Router</mark> component provides the core navigation system for Aventus-based applications.
It defines, registers, and manages application routes, dynamically loads and displays pages, and keeps browser navigation in sync with the active state.

## Overview

The Router acts as a central route controller, coordinating between the app's state manager and the rendered pages.

It supports both synchronous and asynchronous route loading, custom 404 handling, URL synchronization, and smooth transitions between pages.

It must be extended to define your own route structure and optionally override its behavior.

## Example

```ts
import { Router } from "Aventus@Main:Aventus.package.avt";
import { HomePage } from "../pages/Home.page.avt";
import { AboutPage } from "../pages/About.page.avt";
import { NotFoundPage } from "../pages/NotFound.page.avt";
export class AppRouter extends Router {
	protected defineRoutes(): void {
		this.addRoute("/", HomePage);
		this.addRoute("/about", AboutPage);
		this.addRouteAsync({
			route: "/contact",
			scriptUrl: "/pages/contact.js",
			render: () => ContactPage,
		});
	}
	protected override error404() {
		return NotFoundPage;
	}
}
```

```html
<app-router></app-router>
```

## Template

```html
<slot name="before"></slot>
<div class="content" @element="contentEl"></div>
<slot name="after"></slot>
```

This structure allows you to insert additional UI before or after the router content, such as headers, sidebars, or footers.

## Configuration

You can globally configure the Router's default behavior:

```ts
Router.configure({
	page404: NotFoundPage,
	destroyPage: true,
});
```

## Defining Routes

Routes are defined in the abstract defineRoutes() method.

```ts
this.addRoute("/home", HomePage);
this.addRouteAsync({
    route: "/settings",
    scriptUrl: "/pages/settings.js",
    render: () => SettingsPage,
});
```

Async routes are useful for lazy-loading parts of your application.

## Page Lifecycle

Each page is a component extending <mark>Page</mark>.
When a route becomes active, the Router:

- Instantiates or reuses the corresponding <mark>Page</mark> class.
- Calls <mark>isAllowed()</mark> on the page to check access control.
- Invokes <mark>show()</mark> on the new page and <mark>hide()</mark> on the previous one.
- Updates document metadata (<mark>title</mark>, <mark>description</mark>, <mark>keywords</mark>).
- Synchronizes the browser URL and navigation history.

Inactive pages are either removed or kept in memory depending on <mark>destroyPage</mark>.

## 404 Handling

If no route matches the current state, the Router:

- Instantiates the <mark>page404</mark> page (default or overridden)
- Displays it in the <mark>contentEl</mark>
- Optionally updates the URL to a "not found" path.

You can customize 404 logic by overriding error404():

```ts
protected override error404(): new () => Page {
	return CustomNotFoundPage;
}
```

## Navigation Control

### Programmatic Navigation

You can navigate to a new route manually:

```ts
await this.navigate("/dashboard");
```

Replace the current history entry:

```ts
await this.navigate("/login", { replace: true });
```

### Access Control

Override <mark>canChangeState()</mark> to control route transitions:

```ts
protected override async canChangeState(newState: Aventus.State): Promise<boolean> {
	const isAuthenticated = await AuthService.isLoggedIn();
	return isAuthenticated;
}
```

### Before/After Page Change Hooks

```ts
protected override onNewPage(oldUrl: string, oldPage: Page | undefined, newUrl: string, newPage: Page) {
	console.log("Navigated from", oldUrl, "to", newUrl);
}
```

## URL Binding

By default, the Router binds to the browser URL:

- Keeps window.location in sync.
- Supports back/forward navigation using popstate.

You can disable this by overriding:

```ts
protected override bindToUrl(): boolean {
	return false;
}
```

Or set a fallback:

```ts
protected override defaultUrl(): string {
	return "/home";
}
```

## Methods

|Method|Description|
|---|---|
|addRoute(route: string, elementCtr: new () =&gt; Page)|Registers a synchronous route.|
|addRouteAsync(options: RouteAsyncOption)|Registers a lazy-loaded route.|
|navigate(state: string | Aventus.State, options?: { replace: boolean })|Navigates to a specific route.|
|getSlugs()|Returns the parameters extracted from the current route (if any).|
|bindToUrl()|Determines whether navigation updates the browser URL.|
|shouldDestroyFrame(page: Page)|Determines if a page should be destroyed when hidden.|
