# @aileron/date-picker

Date and time pickers allow users to select a single or a range of dates and times.

Pickers are used to display past, present, or future dates or times. The kind of date (exact, approximate, memorable) you are requesting from the user will determine which picker is best to use. Each picker’s format can be customized depending on location or need.

## Preresiquites
<!-- add section here about the doc for conneting to packages.aa.com -->

## Installation

There are two ways to install the date-picker package:

```bash
  npm install -S @aileron/date-picker
```

or via cdn:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" src="https://cdn.aa.com/aileron/date-picker@latest/dist/date-picker.js"></script>
    ...
  </head>
    ...
</html>
```

## Example Usage Single Picker

```html
<adc-date-picker
    dateFormat="${dateFormat}"
    ?open="${open}"
>
    <adc-date-picker-input
        ?invalid=${invalid}
        ?readonly=${readonly}
        label-text="${labelText}"
        placeholder="${placeholder}"
        value="${value}"
        validity-message="${validityMessage}"
        kind="single"
        @input="${onInput}"
    >
    </adc-date-picker-input>
</adc-date-picker>
```

## Example Usage Range Picker

```html
<adc-date-picker
    dateFormat="${dateFormat}"
    ?open="${open}"
>
    <adc-date-picker-input
        ?invalid=${invalid}
        ?readonly=${readonly}
        label-text="${labelText}"
        placeholder="${placeholder}"
        value="${value}"
        validity-message="${validityMessage}"
        kind="from"
        @input="${onInput}"
    >
    </adc-date-picker-input>
    <adc-date-picker-input
        ?invalid=${invalid}
        ?readonly=${readonly}
        label-text="${labelText}"
        placeholder="${placeholder}"
        value="${value}"
        validity-message="${validityMessage}"
        kind="to"
        @input="${onInput}"
    >
    </adc-date-picker-input>
</adc-date-picker>
```

## Attributes and Properties

|Name|Description|Default|
|----|-----------|-------|
|invalid|`true` if the user has experienced an error such as incomplete or
empty state.<br />`boolean`|`false`|
|readonly|`true` if the input is in a read-only state.<br />`boolean`|`false`|
|disabled|`true` if the input is disabled.<br />`boolean`|`false`|
|open|`true` when the datepicker is open.<br />`boolean`|`false`|
|mobileView|`true` if the calendar should display single month view.<br />`boolean`|`false`|
|label-text|The text-content of the date picker label, could also be the
`<slot>` content.<br />`string`|`""`|
|date-format|The desired format for flatpickr plugin to use.<br />`string`|`""`|
|showMonths|The number of months displayed by the calendar.<br />`number`|`""`|
|placeholder|The placeholder that describes the expected value for the
input field.<br />`string`|`""`|
|enabled-range|The date range that a user can pick in the calendar.<br />`string`|`""`|
|value|Specifies the initial value of the input field.<br />`string`|`""`|
|name|The name for the input in FormData.<br />`string`|`""`|
|type|The 'type' attribute for the 'input' in the shadow DOM.<br />`string`|`""`|
|pattern|The 'pattern' attribute for the 'input' in the shadow DOM.<br />`string`|`""`|
|validity-message|Validation message displayed to user.<br />`string`|`""`|
|required-validity-message|Validation message when input is required.<br />`string`|`""`|
|kind|Specifies kind of picker (E.g. Single, Range). Range picker will have
both a 'from' input and a 'to' input.<br />`string`|`""`|
|locale|The localization data for flatpickr plugin.<br />`array`|`""`|

## Events

|Name|Description|
|----|-----------|
|adc-date-picker|Selector used to return the parent Date Picker.<br />`function`|
|adc-date-picker-input[kind="to"]|Selector used to return the 'input' to enter
end date.<br />`function`|
|adc-date-picker-input[kind="single"]|Selector used to return the 'input' to enter
starting date.<br />`function`|
|adc-date-picker-input[kind="from"]|Selector used to return the 'input' to enter
starting date.<br />`function`|
|adc-date-picker-changed|Event fired when flatpickr plugin updates
it's value.<br />`function`|
|adc-date-picker-flatpickr-error|Event fired when flatpickr plugin
throws an error.<br />`function`|

## Slots

|Name|Description|
|----|-----------|
