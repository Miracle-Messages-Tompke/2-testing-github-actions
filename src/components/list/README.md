# @aileron/list

A list is a vertically stacked group of text content which can either be
ordered or unordered.

You can build a list using the `adc-unordered-list` or `adc-ordered-list` in
combination with the `adc-list-item` components. The `list` components accepts
the `add-list-item` components as children, and each `add-list-item` is
responsible for displaying the list's content.

You can configure the list item's content using the `label-text` prop.

Below, find guidance on how to install the list web component and examples of
the list in use. Visit the components storybook page for a live demo and full
code usage documentation.

## Prerequisites

If this is your first time using an internal package using [packages.aa.com](https://packages.aa.com),
please take a moment to read through the [Get Started](https://aileron.aa.com/developing/get-started)
guide before continuing.

## Installation

There are two ways to install the list package:

```bash
npm install -S @aileron/list
```

or via cdn:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" src="https://cdn.aa.com/aileron/list@latest/list.js"></script>
    ...
  </head>
  ...
</html>
```

## `<adc-unordered-list>` Example Usage

```html
<adc-unordered-list>
  <adc-list-item>List item</adc-list-item>
  <adc-list-item>List item</adc-list-item>
  <adc-list-item>List item</adc-list-item>
  <adc-list-item>List item</adc-list-item>
</adc-unordered-list>
```

## `<adc-unordered-list>` slots

|Name|Description|
|----|-----------|
| - | This is the default slot for list items.|

## `<adc-ordered-list>` Example Usage

```html
<adc-ordered-list>
  <adc-list-item>List item</adc-list-item>
  <adc-list-item>List item</adc-list-item>
  <adc-list-item>List item</adc-list-item>
  <adc-list-item>List item</adc-list-item>
</adc-ordered-list>
```

## `<adc-ordered-list>` slots

|Name|Description|
|----|-----------|
| - | This is the default slot for list items.|

## `<adc-list-item>` Example Usage

```html
<adc-ordered-list>
  <adc-list-item>
    <adc-unordered-list>
      <!-- nested property is applied automatically -->
      <adc-list-item nested>List item</adc-list-item>
    </adc-unordered-list>
  <adc-list-item>List item</adc-list-item>
  <adc-list-item>List item</adc-list-item>
  <adc-list-item>List item</adc-list-item>
</adc-ordered-list>
```

## `<adc-list-item>` attributes and properties

|Name|Description|Default|
|----|-----------|-------|
|kind| Display an icon if the list item is a `success`, `error`, and nothing
when `default`.<br />`"success"` `"error"` `""`|`""`|
|nested| Determine if the list item has a nested list.<br />`boolean`|`false`|

## `<adc-list-item>` slots

|Name|Description|
|----|-----------|
| - | This is the default slot for list items.|
|nested| This slot is used to render nested list items.|
