# @aileron/grid

The grid provides an easy to use grid system for creating responsive layouts
without the need for any css.

## Prerequisites

If this is your first time using an internal package using [packages.aa.com](https://packages.aa.com),
please take a moment to read through the [Get Started](https://aileron.aa.com/developing/get-started)
guide before continuing.

## Installation

There are two ways to install the grid package:

```bash
  npm install -S @aileron/grid
```

or via cdn:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" src="https://cdn.aa.com/aileron/grid@latest/grid.js"></script>
    ...
  </head>
  ...
</html>
```

## Example Usage

```html
<adc-grid>
  <adc-row>
    <adc-column>Three</adc-column>
    <adc-column>Three</adc-column>
    <adc-column>Three</adc-column>
    <adc-column>Three</adc-column>
  </adc-row>
  <adc-row>
    <adc-column>Six</adc-column>
    <adc-column>Six</adc-column>
  </adc-row>
</adc-grid>
```

## `<adc-grid>` attributes and properties

|Name|Description|Default|
|----|-----------|-------|
|position| Sets the position of the grid based on flex.<br />
`"start"` `"center"` `"end"` `""`|`""`|
|reverse| Sets the child rows to render in reverse order.<br />`boolean`|`false`|
|flush| Sets the flush property on the grid, which uses padding instead of
margin.<br />`boolean`|`false`|
|form| Set to true if the grid is used within a form.<br />`boolean`|`false`|
|nested| Set nested to true if the grid is used within another grid.<br />`boolean`|`false`|

## `<adc-grid>` slots

|Name|Description|
|----|-----------|
| - | This is the default slot, expects adc-row as content.

## `<adc-row>` attributes and properties

|Name|Description|Default|
|----|-----------|-------|
|reverse| Set to `true` whenever parent `adc-grid` is true.<br />`boolean`|`false`|
|form| Set to `true` whenever parent `adc-grid` is true.<br />`boolean`|`false`|

## `<adc-row>` slots

|Name|Description|
|----|-----------|
| - | This is the default slot, expects adc-column as content.

## `<adc-column>` attributes and properties

|Name|Description|Default|
|----|-----------|-------|
|col-desktop| Sets the column width for desktop by number of columns.<br />`number`|`0`|
|col-tablet| Sets the column width for tablet by number of columns.<br />`number`|`0`|
|col-phone| Sets the column width for phone by number of columns.<br />`number`|`0`|
|col-offset-desktop| Sets the column offset for desktop by number of columns.
<br />`number`|`0`|
|col-offset-tablet| Sets the column offset for tablet by number of columns.<br />`number`|`0`|
|col-offset-phone| Sets the column offset for phone by number of columns.<br />`number`|`0`|

## `<adc-column>` slots

|Name|Description|
|----|-----------|
| - | This is the default slot.
