# @aileron/data-table

The data table’s features are ideal for organizing and displaying data in a UI. The column headers can sort data in ascending or descending order, rows can be expanded to progressively disclose information, and single or batch actions can be taken on rows.

The data table toolbar gives a location for primary buttons, search, filtering, table display settings, and other utilities.

Below, find guidance on how to install the data table web component and examples
of the data table in use. Visit the components storybook page for a live demo
and full code usage documentation.

## Preresiquites

If this is your first time using an internal package using [packages.aa.com](https://packages.aa.com),
please take a moment to read through the [Get Started](https://aileron.aa.com/developing/get-started)
guide before continuing.

## Installation

There are two ways to install the data-table package:

```bash
  npm install -S @aileron/data-table
```

or via cdn:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" src="https://cdn.aa.com/aileron/data-table@latest/dist/data-table.js"></script>
    ...
  </head>
    ...
</html>
```

## Example Usage Default Table

```html
<adc-table>
    <adc-table-head>
    <adc-table-header-row divider="$divider}" size="${size}">
        <adc-table-header-cell>Heading 1</adc-table-header-cell>
        <adc-table-header-cell>Heading 2</adc-table-header-cell>
    </adc-table-header-row>
    </adc-table-head>
    <adc-table-body>
    <adc-table-row divider="${divider}" size="${size}">
        <adc-table-cell divider="${divider}">Cell Text</adc-table-cell>
        <adc-table-cell divider="${divider}">Cell Text</adc-table-cell>
    </adc-table-row>
    <adc-table-row divider="${divider}" size="${size}">
        <adc-table-cell divider="${divider}">Cell Text</adc-table-cell>
        <adc-table-cell divider="${divider}">Cell Text</adc-table-cell>
    </adc-table-row>
    </adc-table-body>
</adc-table>
```

## Example Usage Expandable Table

```html
<adc-table
    size="${size}"
    icon-position="${iconPosition}"
    divider="${divider}"
>
    <adc-table-head size="${size}">
        <adc-table-header-expand-row
        size="${size}"
        icon-position="${iconPosition}"
        ?divider="${divider}"
        >
            <adc-table-header-cell>Expandable Header 1</adc-table-header-cell>
            <adc-table-header-cell>Expandable Header 2</adc-table-header-cell>
        </adc-table-header-expand-row>
    </adc-table-head>
    <adc-table-body>
        <adc-table-expand-row
        size="${size}"
        icon-position="${iconPosition)"
        ?divider="${divider}"
        data-row-id="1"
        >
            <adc-table-cell>Expandable Cell 1</adc-table-cell>
            <adc-table-cell>Expandable Cell 2</adc-table-cell>
        </adc-table-expand-row>
        <adc-table-expanded-row colspan="2">
            <p>Expanded Content</p>
        </adc-table-expanded-row>
        <adc-table-expand-row
        size="${size}"
        icon-position="${iconPosition}"
        ?divider="${divider}"
        data-row-id="2"
        >
            <adc-table-cell>Expandable Cell 1</adc-table-cell>
            <adc-table-cell>Expandable Cell 2</adc-table-cell>
        </adc-table-expand-row>
        <adc-table-expanded-row colspan="2">
            <p>Expanded Content</p>
        </adc-table-expanded-row>
    </adc-table-body>
</adc-table>
```

## Attributes and Properties

|Name|Description|Default|
|----|-----------|-------|
|expanded|`true` if the table row should be expanded.<br />`boolean`|`false`|
|highlighted|`true` if the table row should be highlighted.<br />`boolean`|`false`|
|size|Size of the header/cell rows (E.g. Default, Short, Tall).<br />`string`|`""`|
|divider|Optional divider between header and cell rows.<br />`string`|`""`|
|icon-position|Position of the icon for expandable rows (E.g. Left, Right).<br />`string`|`""`|
|colSpan|The number of columns spanned by the table.<br />`number`|``|

## Events

|Name|Description|
|----|-----------|
|adc-table-header-row|Selector used to find header rows.<br />`function`|
|adc-table-row|Selector used to find rows.<br />`function`|
|adc-table|Selector used to find the table.<br />`function`|
|adc-table-expanded-row|Selector used to find the corresponding expanded row.<br />`function`|
|adc-table-row-change-selection|Event fired before row is selected/unselected.<br />`function`|
|adc-table-change-selection-all|Event fired before row is selected/unselected.<br />`function`|
|adc-table-row-expando-beingtoggled|Event fired before the expand state of the row is toggled.<br />`function`|
|adc-table-row-expando-beingtoggled-all|Event fired before the expand state of the row is toggled.<br />`function`|
|adc-table-row-expando-toggled|Event fired after the expand state of the row is toggled.<br />`function`|
|adc-table-row-expando-toggled-all|Event fired after the expand state of the row is toggled.<br />`function`|
