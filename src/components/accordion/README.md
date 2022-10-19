# @aileron/accordion

An accordion is a vertically stacked list of headers that reveal or hide associated
sections of content. The Aileron accordion allows multiple sections of content
be collapsed and expanded simultaneously.

You can build an accordion using a combination of the `adc-accordion` and
`adc-accordion-item` components. The `adc-accordion` components accepts a list
of `adc-accordion-item` components as children and each `adc-accordion-item`
is responsible for displaying the accordion's heading and panel content.

You can configure the accordion item's heading using the `label-text` prop.
Everything you pass in as a child of `adc-accordion-item` will be rendered
in the accordion's panel.

Below, find guidance on how to install the accordion web component and examples
of the accordion in use. Visit the components storybook page for a live demo
and full code usage documentation.

## Prerequisites

If this is your first time using an internal package using [packages.aa.com](https://packages.aa.com),
please take a moment to read through the [Get Started](https://aileron.aa.com/developing/get-started)
guide before continuing.

## Installation

There are two ways to install the accordion package:

```bash
npm install -S @aileron/accordion
```

or via cdn:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" src="https://cdn.aa.com/aileron/accordion@latest/accordion.js"></script>
    ...
  </head>
    ...
</html>
```

## Example Usage

```html
<adc-accordion>
  <adc-accordion-item label-text="Section 1">
    <p>lorem ipsum Explicabo ducimus vel voluptatem officiis.</p>
  </adc-accordion-item>
  <adc-accordion-item label-text="Section 2">
    <p>lorem ipsum Explicabo ducimus vel voluptatem officiis.</p>
  </adc-accordion-item>
</adc-accordion>
```

## `<adc-accordion-item>` attributes and properties

|Name|Description|Default|
|----|-----------|-------|
|open|`true` if the accordion item should be open.<br />`boolean`|`false`|
|disabled|`true` if the accordion item should be disabled.<br />`boolean`|`false`|
|label-text|The title text of the accordion item, could also be the
`<slot name="label">` content.<br />`string`|`""`|
|label-position|The position of the label in relationship to the icon.<br />
`"left"` `"right"`|`"left"`|

## `<adc-accordion-item>` events

|Name|Description|
|----|-----------|
|adc-accordion-item-beingtoggled|Event fired when the item is being opened or
closed.<br />`function`|
|adc-accordion-item-toggled|Event fired when the item is opened or closed.<br />`function`|

## `<adc-accordion-item>` slots

|Name|Description|
|----|-----------|
|label|Slot for the label-text.|
| - |This is the default slot.
