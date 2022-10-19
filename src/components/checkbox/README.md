# @aileron/checkbox

A checkbox is a type of data input typically found in forms with simple
true/false values. Multiple checkboxes can be grouped under a single label
where one or more choices are available.

You can build a checkbox using the `adc-checkbox` in combination with
a `adc-checkbox-group` element to group controls and `label-text` element for
the label.

You can configure the checkbox group's orientation using the `orientation` prop.
Everything you pass in as a child of `adc-checkbox-group` will be rendered
underneath the group label

Below, find guidance on how to install the checkbox web component and examples
of the checkbox in use. Visit the components storybook page for a live demo and
full code usage documentation.

## Prerequisites

If this is your first time using an internal package using [packages.aa.com](https://packages.aa.com),
please take a moment to read through the [Get Started](https://aileron.aa.com/developing/get-started)
guide before continuing.

## Installation

There are two ways to install the checkbox package:

```bash
  npm install -S @aileron/checkbox
```

or via cdn:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" src="https://cdn.aa.com/aileron/checkbox@latest/checkbox.js"></script>
    ...
  </head>
    ...
</html>
```

## Example Usage

```html
<adc-checkbox label-item="Label" value="yes"></adc-checkbox>
```

## `<adc-checkbox>` attributes and properties

|Name|Description|Default|
|----|-----------|-------|
|checked| The checked state of the checkbox.<br />`boolean`|`false`|
|indeterminate|`true` if the checkbox should be indeterminate.<br />`boolean`|`false`|
|orientation| Sets the orientation of the checkbox.<br />`"vertical"` `"horizontal"`|`"horizontal"`|
|disabled|`true` if the checkbox should be disabled.<br />`boolean`|`false`|
|invalid|`true` if the checkbox should be invalid.<br />`boolean`|`false`|
|name| The name of the checkbox.<br />`string`|`""`|
|value| Sets the value of the checkbox.<br />`string`|`""`|
|hide-label|`true` if the label of the checkbox is hidden.<br />`boolean`|`false`|
|label-text|The title text of the checkbox, could also be the `<slot>`
content.<br />`string`|`""`|
|label-position|The position of the label in relationship to the
checkbox.<br />`"left"` `"right"`|`"left"`|

## `<adc-checkbox>` events

|Name|Description|
|----|-----------|
|adc-checkbox-changed|Event fired when the checkbox is changed.<br />`function`|

## `<adc-checkbox>` slots

|Name|Description|
|----|-----------|
| - |This is the default slot, used for the label of checkbox.

## `<adc-checkbox-group>` attributes and properties

|Name|Description|Default|
|----|-----------|-------|
|orientation| Sets the orientation of the checkbox group.<br />`"vertical"` `"horizontal"`|`"horizontal"`|
|disabled|`true` if the checkbox group should be disabled.<br />`boolean`|`false`|
|required|`true` if the checkbox group should be required.<br />`boolean`|`false`|
|invalid|`true` if the checkbox group should be invalid.<br />`boolean`|`false`|
|value| Sets the value of the selected checkbox within group.<br />`string`|`""`|
|label-text|The title text of the checkbox group, could also be
the `<slot name="label-text">` content.<br />`string`|`""`|
|label-position|The position of the label in relationship to the checkbox
group.<br />`"left"` `"right"`|`"left"`|

## `<adc-checkbox-group>` events

|Name|Description|
|----|-----------|
|adc-checkbox-group-changed|Event fired when the checkbox is changed within a
group.<br />`function`|

## `<adc-checkbox-group>` slots

|Name|Description|
|----|-----------|
| - | This is the default slot, used for the `adc-checkbox` children.
| label-text | Slot for the label text of the checkbox group.
