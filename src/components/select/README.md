# @aileron/select

Select is a type of input that is used in forms where a user is submitting
data and needs to choose one option from a list.

While the select and dropdown components look similar, they have different functions.

- Use the select component inside a form where users are selecting from a list
of options and submitting data.
- Use the dropdown component to filter or sort content on a page.

The select component’s appearance will be determined by the browser being used.

## Prerequisites

If this is your first time using an internal package using [packages.aa.com](https://packages.aa.com),
please take a moment to read through the [Get Started](https://aileron.aa.com/developing/get-started)
guide before continuing.

## Installation

There are two ways to install the radio button package:

```bash
npm install -S @aileron/select
```

or via cdn:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" src="https://cdn.aa.com/aileron/select@latest/select.js"></script>
    ...
  </head>
  ...
</html>
```

## `<adc-select>` Example Usage

```html
<adc-select name="example-radios" label-text="group label">
  <adc-select-item-group label-text="Select Item Group">
    <adc-select-item label-text="Select Item 1" value="value_01">Select Item 1</adc-select-item>
  </adc-select-item-group>
  <adc-select-item label-text="Select Item 2" value="value_02">Select Item 2</adc-select-item>
  <adc-select-item label-text="Select Item 3" value="value_03">Select Item 3</adc-select-item>
  <adc-select-item label-text="Select Item 4" value="value_04">Select Item 4</adc-select-item>
</adc-select>
```

## `<adc-select>` attributes and properties

|Name|Description|Default|
|----|-----------|-------|
|helper-text| Text below the select used to provide context.<br />`string`|`""`|
|disabled| Sets the select element to disabled.<br />`boolean`|`false`|
|autocomplete| Set autocomplete to the select element.<br />`boolean`|`false`|
|id| Set the id of the select element.<br />`string`|`""`|
|placeholder| Sets a placeholder to be used by default for an
option element.<br />`string`|`""`|
|label-text| Sets the label for the select element.<br />`string`|`""`|
|value| Sets the value of the select element.<br />`string`|`""`|
|invalid| Sets the select element validity.<br />`boolean`|`false`|
|readonly| Sets native readonly to the select element.<br />`boolean`|`false`|
|required| Sets required for validation of the select element.<br />`boolean`|`false`|
|name| Set the name to the select element.<br />`string`|`""`|
|required-validity-message| Sets a required message to be used
whenever the select element is invalid.<br />`string`|`""`|
|validity-message| Sets a generic validity message to be used whenever the
select element is invalid.<br />`string`|`""`|
|pattern| Sets native pattern validation to the select element.<br />`regexp`|`""`|
|multiple| Always sets multiple to false.<br />`boolean`|`false`|
|selectedIndex| Sets the selected option from the select element.<br />`number`|`0`|

## `<adc-select>` events

|Name|Description|
|----|-----------|
|adc-select-item-selected|Fires whenever an option is selected.|

## `<adc-select>` slots

|Name|Description|
|----|-----------|
| - |This is the default slot for label text.|
|validity-message|Validity message slot for invalid state messaging.|
|helper-text|Helper text slot for context.|

## `<adc-select-item>` attributes and properties

|Name|Description|Default|
|----|-----------|-------|
|disabled| Sets the disabled state for the select item.<br />`boolean`|`false`|
|selected| Sets selected for the select field.<br />`boolean`|`false`|
|label-text| Sets the label text for the select item.<br />`string`|`""`|
|value| Sets the value for the select field.<br />`string`|`""`|

## `<adc-select-item-group>` attributes and properties

|Name|Description|Default|
|----|-----------|-------|
|disabled| Sets the disabled state for the group item.<br />`boolean`|`false`|
|label-text| Sets the label text for the group item.<br />`string`|`""`|
