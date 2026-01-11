# UI - Link

The <mark>Link</mark> component provides a declarative way to navigate between application routes.
    It integrates with the Aventus Router System, automatically handling navigation, activation state, and style updates
    for active routes.

## Overview

The <mark>Link</mark> component acts similarly to a standard HTML <mark>&lt;a&gt;</mark>
    element, but instead of performing a full page reload, it uses Aventus internal router to activate the target route.


It also automatically applies the <mark>active</mark> class when the linked route (or pattern) is
    currently active, allowing developers to style active links easily.

```html
<av-link to="home">Home</av-link>
<av-link to="profile">Profile</av-link>
<av-link to="settings" active_pattern="settings*">Settings</av-link>
```

When the current route matches <mark>settings*</mark>, the Settings link automatically gets the <mark>active</mark> class.

## Navigation

When the user clicks or presses the link:

- The component prevents the default browser navigation.
- It resolves the route using <mark>RouterStateManager</mark>.
- If <mark>to</mark> starts with <mark>"."</mark>, it is treated as a relative route.
- It then activates the target state using: <mark>Aventus.State.activate(to, Aventus.Instance.get(RouterStateManager));</mark>

## Active State Handling

The link automatically subscribes to route changes through <mark>RouterStateManager</mark>.
When the current state matches its <mark>to</mark> value or <mark>active_pattern</mark>, the component:

- Adds the CSS class <mark>active</mark>
- Triggers the <mark>onActiveChange</mark> callback with <mark>true</mark>

When it becomes inactive:

- Removes the <mark>active</mark> class
- riggers <mark>onActiveChange</mark> with <mark>false</mark>
