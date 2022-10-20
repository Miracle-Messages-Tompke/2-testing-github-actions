# @aileron/button

changes here

`adc-button` are clickable elements that are used to trigger actions. They
communicate calls to action to the user and allow users to interact with pages
in a variety of ways. Button `label-text` express what action will occur when
the user interacts with it.

There are three variants, configured by the `kind` prop:

- `primary` buttons are for the principal call to action on the page. Primary
buttons should only appear once per screen
- `secondary` buttons are used for secondary, less important, actions on each page.
- `ghost` buttons are used for the least pronounced actions; often used in
conjunction with a primary button.

Below, find guidance on how to install the button web component and examples
of `adc-button` in use. Visit the components storybook page for a live demo and
full code usage documentation.

## Prerequisites

If this is your first time using an internal package using [packages.aa.com](https://packages.aa.com),
please take a moment to read through the [Get Started](https://aileron.aa.com/developing/get-started)
guide before continuing.

## Installation

There are two ways to install the button package:

```bash
npm install -S @aileron/button
```

or via cdn:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" src="https://cdn.aa.com/aileron/button@latest/button.js"></script>
    ...
  </head>
    ...
</html>
```

## Example Usage

```html
<adc-button label-text="Button Text" @click="${handleButtonClick}"></adc-button>
```

## `<adc-button>` Attributes and Properties

|Name|Description|Default|
|----|-----------|-------|
|autofocus|`true` if the button should have input focus when the page loads.<br />`boolean`|`false`|
|disabled|`true` if the button should be disabled.<br />`boolean`|`false`|
|label-text|The text-content of the button, could also be the `<slot>`
content.<br />`string`|`""`|
|position|The position of the button. Used for icon positioning.<br />`"left"` `"right"`|`"left"`|
|kind|Button kind.<br />`"primary"` `"secondary"` `"ghost"`|`"primary"`|
|size|Button size.<br />`"small"` `""`|`""`|
|type|Button type.<br />`"button"` `"submit"`|`"button"`|

## `<adc-button>` Events

|Name|Description|
|----|-----------|
|click|Fired when the button is clicked.<br />`function`|

## `<adc-button>` Slots

|Name|Description|
|----|-----------|
|icon| This is a slot for an icon.|
| - | This is the default slot.
