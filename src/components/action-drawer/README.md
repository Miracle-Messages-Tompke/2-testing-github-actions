# @aileron/action-drawer

Drawers are surfaces containing supplementary content and actions commonly anchored to the bottom or side of the screen.

If more information pertaining to a particular piece of primary on-screen content needs to be displayed, it can be housed in an action drawer. What triggers the action drawer is fully customizable depending upon use case, but most commonly includes buttons or links.

## Prerequisites

If this is your first time using an internal package using [packages.aa.com](https://packages.aa.com),
please take a moment to read through the [Get Started](https://aileron.aa.com/developing/get-started)
guide before continuing.

## Installation

There are two ways to install the action-drawer package:

```bash
  npm install -S @aileron/action-drawer
```

or via cdn:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" src="https://cdn.aa.com/aileron/action-drawer@latest/dist/action-drawer.js"></script>
    ...
  </head>
    ...
</html>
```

## Example Usage

```html
<adc-button @click=${handleOpen}>Open Action Drawer</adc-button>
<adc-action-drawer
id="actiondrawer"
?open="${open}"
transactional
drawer-position="${drawerPosition}"
>
    <adc-action-drawer-header>
        <adc-action-drawer-close-button></adc-action-drawer-close-button>
        <adc-action-drawer-heading>Heading</adc-action-drawer-heading>
    </adc-action-drawer-header>
    <adc-action-drawer-body>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </adc-action-drawer-body>
    <adc-action-drawer-footer>
        <adc-button kind='secondary' position='left' size='fullwidth'>Button</adc-button>
        <adc-button kind='primary' position='right' size='fullwidth'>Button</adc-button>
    </adc-action-drawer-footer>
</adc-action-drawer>
```

## Attributes and Properties

|Name|Description|Default|
|----|-----------|-------|
|open|`true` if the action drawer is open.<br />`boolean`|`false`|
|transactional|`true` if action is required to be take in order for the drawer to close.<br />`boolean`|`false`|
|drawer-position|The position of the action drawer on the page (E.g. Left, Right).<br />`string`|`""`|
