# @aileron/radio-button

A radio button is a type of data input typically found in forms with simple
true/false values. Multiple radio buttons are grouped under a single label where
a list of two or more options are mutually exclusive, meaning the user must
select only one option.

Below, find guidance on how to install the radio button web component and
examples of the radio button in use. Visit the components storybook page for a
live demo and full code usage documentation.

## Prerequisites

If this is your first time using an internal package using [packages.aa.com](https://packages.aa.com),
please take a moment to read through the [Get Started](https://aileron.aa.com/developing/get-started)
guide before continuing.

## Installation

There are two ways to install the radio button package:

```bash
npm install -S @aileron/radio-button
```

or via cdn:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" src="https://cdn.aa.com/aileron/radio-button@latest/dist/radio-button.js"></script>
    ...
  </head>
  ...
</html>
```

## `<adc-radio-button>` Example Usage

```html
<adc-radio-group name="example-radios" label-text="group label">
  <adc-radio-button value="value_01">Radio Button 1</adc-radio-button>
  <adc-radio-button value="value_02">Radio Button 2</adc-radio-button>
  <adc-radio-button value="value_03">Radio Button 3</adc-radio-button>
</adc-radio-group>
```

## `<adc-radio-button>` attributes and properties

|Name|Description|Default|
|----|-----------|-------|
|checked| Sets the checked state of the radio button.<br />`boolean|`false`|
|disabled| Sets the disabled state of the radio button.<br />`boolean`|`false`|
|hide-label| Hides the label text on for the radio button.<br />`boolean`|`false`|
|label-position| Positions the label text to the right/left of the radio button.
<br />`"left"``"right"`|`"right"`|
|label-text| Sets the label text for the radio button.<br />`string`|`""`|
|value| Set the value for the radio button.<br />`string`|`""`|
|invalid| Sets the validity of the radio button.<br />`boolean`|`false`|
|required| Marks the radio button as required.<br />`boolean`|`false`|
|name| Sets the name of the radio button.<br />`string`|`""`|
|orientation| Sets the orientation of the radio button.<br />`"horizontal"``"vertical"`|`"horizontal"`|

## `<adc-radio-button>` events

|Name|Description|
|----|-----------|
|adc-radio-button-changed|Fires whenever a radio button delegate is checked or unchecked.|

## `<adc-radio-button>` slots

|Name|Description|
|----|-----------|
| - |This is the default slot for label text.|

## `<adc-radio-group>` attributes and properties

|Name|Description|Default|
|----|-----------|-------|
|disabled| Sets disabled to child radio buttons.<br />`boolean`|`false`|
|label-position| Positions the label text for the child radio buttons.
<br />`"left"``"right"`|`"right"`|
|label-text| Sets the label text for the radio button group.<br />`string`|`""`|
|value| Sets the value of the radio button group.<br />`string`|`""`|
|invalid| Sets the validity for the children radio buttons.<br />`boolean`|`false`|
|required| Sets required to the child radio buttons.<br />`boolean`|`false`|
|name| Sets name to the child radio buttons.<br />`string`|`""`|
|orientation| Sets the orientation for the radio button children.<br />`"horizontal"``"vertical"`|`"horizontal"`|

## `<adc-radio-group>` events

|Name|Description|
|----|-----------|
|adc-radio-group-changed|Fires whenever a radio button delegate is checked or unchecked.|

## `<adc-radio-group>` slots

|Name|Description|
|----|-----------|
| - |This is the default slot for adc-radio-button's.|
