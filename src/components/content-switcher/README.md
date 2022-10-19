# @aileron/content-switcher

Content switcher manipulates the content shown following an exclusive
or "either/or" pattern, frequently used to let users toggle between
different formatting, like with a grid view and a table view. They are also
often used to narrow content groups, toggling between two or more content
sections within the same space on screen. Only one section can be shown at a time.

## Prerequisites

If this is your first time using an internal package using [packages.aa.com](https://packages.aa.com),
please take a moment to read through the [Get Started](https://aileron.aa.com/developing/get-started)
guide before continuing.

## Installation

There are two ways to install the content-switcher package:

```bash
  npm install -S @aileron/content-switcher
```

or via cdn:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" src="https://cdn.aa.com/aileron/content-switcher@latest/dist/content-switcher.js"></script>
    ...
  </head>
    ...
</html>
```

## Example Usage

```html
<adc-content-switcher label="Label">
  <adc-content-switch label="Switch One" value="one" selected>Switch One</adc-content-switch>
  <adc-content-switch label="Switch Two" value="two">Switch Two</adc-content-switch>
  <adc-content-switch-panel value="one" selected>
    <p>This is panel one</p>
  </adc-content-switch-panel>
  <adc-content-switch-panel value="two">
    <p>This is panel two</p>
  </adc-content-switch-panel>
</adc-content-switcher>
```

## `<adc-content-switcher>` attributes and properties

|Name|Description|Default|
|----|-----------|-------|
|auto| Sets the ability to move focus to the next/previous element by arrow
keys.<br />`boolean`|`false`|
|disabled|`true` if the content switcher should be disabled.<br />`boolean`|`false`|
|direction| Sets the property for the direction of the content switcher, only
horizontal is supported currently.<br />`"horizontal"`|`"horizontal"`|
|label| Sets the label for the content switcher.<br />`string`|`""`|
|selected| Sets the selected content switch and panel. Forces a render.<br />`string`|`""`|

## `<adc-content-switcher>` slots

|Name|Description|
|----|-----------|
| - |This is the default slot, used for content switches.
| adc-content-switch-panel | Slot for the content switch panel.

## `<adc-content-switch>` attributes and properties

|Name|Description|Default|
|----|-----------|-------|
|disabled| `true` if the content switch should be disabled.<br />`boolean`|`false`|
|selected| `true` if the content switch is selected.<br />`boolean`|`false`|
|value| The value connects the switch to the panel, should match.<br />`string`|`""`|
|label| Sets the button text.<br />`string`|`""`|

## `<adc-content-switch>` slots

|Name|Description|
|----|-----------|
| - | This is the default slot, used for the label of the button.

## `<adc-content-switch-panel>` attributes and properties

|Name|Description|Default|
|----|-----------|-------|
|selected| `true` if the content-switch is selected.<br />`boolean`|`false`|
|id| Sets the id of the panel.<br />`string`|`""`|
|value| The value connects the panel to the switch, should match.<br />`string`|`""`|

## `<adc-content-switch-panel>` slots

|Name|Description|
|----|-----------|
| - | This is the default slot, used for content children.
