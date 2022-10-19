# @aileron/text-input

Text fields enable the user to interact with and input data. A single line field
is used when the input anticipated by the user is a single line of text. In the
case where the user needs to input multiple lines of text, use the text area
variant component.

## Prerequisites

If this is your first time using an internal package using [packages.aa.com](https://packages.aa.com),
please take a moment to read through the [Get Started](https://aileron.aa.com/developing/get-started)
guide before continuing.

## Installation

There are two ways to install the radio button package:

```bash
npm install -S @aileron/text-input
```

or via cdn:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" src="https://cdn.aa.com/aileron/text-input@latest/dist/text-input.js"></script>
    ...
  </head>
  ...
</html>
```

## `<adc-text-input>` Example Usage

```html
<adc-text-input label-text="Regular tag"></adc-text-input>
```

## `<adc-text-input>` attributes and properties

|Name|Description|Default|
|----|-----------|-------|
|autocomplete| May be any of the standard HTML autocomplete options.<br />`string`|`""`|
|name| The form name for the native input element.<br />`string`|`""`|
|label-text| The label text for the native input element.<br />`string`|`""`|
|pattern| The regexp pattern to validate the native input element.<br />`regexp`|`""`|
|id| Sets the id for the component.<br />`string`|`""`|
|min| If the native input element is of type number, this is minimum value.<br />`number`|`undefined`|
|max| If the native input element is of type number, this is maximum value.<br />`number`|`undefined`|
|min-length| The minimum length of the native input element.<br />`number`|`undefined`|
|max-length| The maximum length of the native input element.<br />`number`|`undefined`|
|type| Sets the type of the native input element.
<br />`"text"` `"number"` `"email"` `"password"` `"search"` `"tel"` `"url"`|`"text"`|
|placeholder| Sets a placeholder for the native input element.<br />`string`|`""`|
|autofocus| Sets the autofocus attribute on the native input element.<br />`boolean`|`false`|
|readonly| Sets the native input element to readonly.<br />`boolean`|`false`|
|disabled| Sets disabled attribute on the native input element.<br />`boolean`|`false`|
|required| Sets the required attribute on the native input element.<br />`boolean`|`false`|
|invalid| Sets the validity of the native input element.<br />`boolean`|`false`|
|helper-text| Set the message for contextual text below the input.<br />`string`|`""`|
|required-validity-message| Sets the message for validity when an input
is required.<br />`string`|`"Please fill out this field"`|
|validity-message| Sets the validity message for the native input element.<br />`string`|`""`|
|value| Sets the value of the native input element.<br />`string`|`""`|
|can-clear| Sets the state of clear button for the native input element.<br />`boolean`|`true`|

## `<adc-text-input>` events

|Name|Description|
|----|-----------|
|adc-input|Fires when the native input element is changed.|
|adc-change|Fires when the native input element is changed.|
|adc-focus|Fires when the native input element is focused.|
|adc-blur|Fires when the native input element is blurred.|
|adc-clear|Fires when the native input element is cleared.|

## `<adc-text-input>` slots

|Name|Description|
|----|-----------|
|label|The label slot is used to render the label for the native input element.|
|button-icon|The button-icon slot is used to render the button icon for the native input element.|
|helper-text|Helper text to display below the input.|
|validity-message|Validity message to display below the input.|
