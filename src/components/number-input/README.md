# @aileron/number-input

Number inputs are used to let the user enter a number and are best used when:

- Incrementing and decrementing makes sense.
- The number doesn’t have a leading zero.
- The value doesn’t contain letters, slashes, minus signs, and decimal points.
- The number isn’t very large.

## Prerequisites

If this is your first time using an internal package using [packages.aa.com](https://packages.aa.com),
please take a moment to read through the [Get Started](https://aileron.aa.com/developing/get-started)
guide before continuing.

## Installation

There are two ways to install the number-input package:

```bash
  npm install -S @aileron/number-input
```

or via cdn:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" src="https://cdn.aa.com/aileron/number-input@latest/dist/number-input.js"></script>
    ...
  </head>
    ...
</html>
```

## Example Usage

```html
<adc-number-input
      ?autofocus="${autofocus}"
      ?disabled="${disabled}"
      ?required="${required}"
      ?invalid="${invalid}"
      name="${name}"
      placeholder="${placeholder}"
      validity-message="${validityMessage}"
      required-validity-message="${requiredValidityMessage}"
      validity-message-max="${validityMessageMax}"
      validity-message-min="${validityMessageMin}"
      min="${min}"
      max="${max}"
      step="${step}"
      @input="${onInput}"
      >
    </adc-number-input>
```

## Attributes and Properties

|Name|Description|Default|
|----|-----------|-------|
|autofocus|`true` if the number input should have input focus
when the page loads.<br />`boolean`|`false`|
|disabled|`true` if the number input should be disabled.<br />`boolean`|`false`|
|required|`true` if the number input is required.<br />`boolean`|`false`|
|invalid|`true` if invalid data has been submitted to the number input.<br />`boolean`|`false`|
|name|Attribute that specifies the name for the element.<br />`string`|`""`|
|placeholder|Describes the expected value for the input field.<br />`string`|`""`|
|validity-message|Validation message displayed to user.<br />`string`|`""`|
|required-validity-message|Required validation message displayed to user when
number-input is required.<br />`string`|`""`|
|validity-message-min|Validation message displayed to user when value input
is less than expected amount.<br />`string`|`""`|
|validity-message-max|Validation message displayed to user when value input
is greater than expected amount.<br />`string`|`""`|
|min|Minimum value expected.<br />`number`|`""`|
|max|Maximum value expected.<br />`number`|`""`|
|step|Stepping interveral set on the input.<br />`number`|`""`|

## Events

|Name|Description|
|----|-----------|
|adc-number-input-input-value|Fires whenever value is changed upon user gesture|

## Slots

|Name|Description|
| validity-message | Slot for the validity-message when number input is invalid|
| required-validity-message | Slot for required validity message when input is required|
| validity-message-min | Slot for message displayed when value entered is less than
minimum expected value|
| validity-message-max | Slot for message displayed when value is greater than
maximum expected value|
