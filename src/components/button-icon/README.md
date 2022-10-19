# @aileron/button-icon

`adc-button-icon` are clickable elements that are used to trigger actions. They
communicate calls to action to the user and allow users to interact with pages
in a variety of ways. Button `label-text` express what action will occur when
the user interacts with it.

Below, find guidance on how to install the button web component and examples
of `adc-button-icon` in use. Visit the components storybook page for a live demo and
full code usage documentation.

## Prerequisites

If this is your first time using an internal package using [packages.aa.com](https://packages.aa.com),
please take a moment to read through the [Get Started](https://aileron.aa.com/developing/get-started)
guide before continuing.

## Installation

There are two ways to install the button package:

```bash
npm install -S @aileron/button-icon
```

or via cdn:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" src="https://cdn.aa.com/aileron/button-icon@latest/button-icon.js"></script>
    ...
  </head>
    ...
</html>
```

## Example Usage

```html
<adc-button-icon @click="${handleButtonClick}"></adc-button-icon>
```

## `<adc-button-icon>` Attributes and Properties

|Name|Description|Default|
|----|-----------|-------|
|autofocus|`true` if the button should have input focus when the page loads.<br />`boolean`|`false`|
|disabled|`true` if the button should be disabled.<br />`boolean`|`false`|
|size|Button size.<br />`"small"` `""`|`""`|

## `<adc-button-icon>` Events

|Name|Description|
|----|-----------|
|click|Fired when the button is clicked.<br />`function`|
