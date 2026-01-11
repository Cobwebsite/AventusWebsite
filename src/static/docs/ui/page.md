# UI - Page

The <mark>Page</mark> class is the foundational building block for every navigable screen in an Aventus application.
Each route in your app corresponds to a Page component, which defines its content, metadata, and lifecycle behavior.

## Overview

A <mark>Page</mark> is automatically managed by the <mark>Router</mark> component:

- When a route is activated, its associated <mark>Page</mark> is shown.
- When deactivated, it is hidden or destroyed (depending on configuration).
- The Router updates the browser's metadata (<mark>title</mark>, <mark>description</mark>, <mark>keywords</mark>) based on the page's configuration.

You can extend <mark>Page</mark> to create your own screens, and optionally override lifecycle methods like <mark>onShow</mark>, <mark>onHide</mark>, and <mark>isAllowed</mark>.

```ts
import { Page } from "Aventus@Main:Aventus.package.avt";

export class HomePage extends Page {
	public override async configure() {
		return {
			title: "Home - Aventus App",
			description: "Welcome to the home page of the Aventus demo application.",
			keywords: ["home", "aventus", "demo"],
		};
	}

	public override onShow() {
		console.log("HomePage is now visible!");
	}

	public override onHide() {
		console.log("HomePage was hidden!");
	}
}
```

```html
<div>
	<h1>Welcome!</h1>
	<p>This is the home page content.</p>
</div>
```

## Properties

|Property|Type|Description|
|---|---|---|
|visible|boolean|Automatically managed by the router. When set to <mark>true</mark>, the page becomes visible.|
|router|Router|Reference to the router managing this page.|
|state|State|Holds the current state object for the route, if any.|

The visible property is reactive when its value changes:

- If true, onShow() is called
- If false, onHide() is called

## Lifecycle Methods

|Method|Description|
|---|---|
|configure()|Abstract. Must return a PageConfig object defining metadata and optional destruction rules.|
|show(state?: State)|Called by the router when the page is activated. Sets visible = true.|
|hide()|Called by the router when the page is deactivated. Sets visible = false.|
|onShow()|Hook executed when the page becomes visible. Use it to start animations, load data, etc.|
|onHide()|Hook executed when the page is hidden. Use it to stop timers, clean up listeners, etc.|
|isAllowed(state, pattern, router)|Optional access control. Return true to allow, false to block, or a redirect path/state.|
|loadData(state)|Optional loading data function. Return true if evrything is ok, false to block, or a redirect path/state.|

## Access Control Example

You can control page visibility by overriding <mark>isAllowed</mark>:

```ts
public override async isAllowed(state: State, pattern: string, router: Router) {
	const isAuthenticated = await AuthService.isLoggedIn();
	if (!isAuthenticated) {
		// Redirect unauthorized users to /login
		return "/login";
	}
	return true;
}
```

If the method returns:

- true → The page is displayed.
- false → The navigation is canceled.
- string or State → The router redirects to the given route or state.

## Loading Data Example

You can load data for the page by overriding <mark>loadData</mark>:

```ts
public override async loadData(state: State) {
	const data = await api.loadData() as Data | null;
	if (!data) {
		return "/home";
	}
    this.appData = data;
	return true;
}
```

If the method returns:

- true → The page is displayed.
- false → The navigation is canceled.
- string or State → The router redirects to the given route or state.

## Page Configuration

Each page defines its configuration via the <mark>configure()</mark> method.

```ts
public async configure(): Promise<PageConfig> {
	return {
		title: "Dashboard", // Browser tab title for this page.
		description: "User dashboard overview", // Meta description for SEO.
		keywords: ["dashboard", "user", "aventus"], // Meta keywords for SEO.
		destroy: false, // If true, the page is destroyed (removed from the DOM) when hidden.
	};
}
```
