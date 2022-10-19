# @aileron/tooltip

`adc-tooltip` is a tooltip element that displays informative content to the user. `adc-tooltip` is tied to the element that is right before it.

There are two different types of the `adc-tooltip`. The default is a larger display with more features like `heading` and `toggle`. The other type is `label` which is a smaller display with only text showing.

Below, find guidance on how to install the tooltip web component and examples
of `adc-tooltip` in use. Visit the components storybook page for a live demo and
full code usage documentation.

## Prerequisites

If this is your first time using an internal package using [packages.aa.com](https://packages.aa.com),
please take a moment to read through the [Get Started](https://aileron.aa.com/developing/get-started)
guide before continuing.

## Installation

There are two ways to install the tooltip package:

```bash
npm install -S @aileron/tooltip
```

or via cdn:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" src="https://cdn.aa.com/aileron/tooltip@latest/dist/tooltip.js"></script>
    ...
  </head>
    ...
</html>
```

## Example Usage of a Label Tooltip
The tooltip is tied to the element it immediately follows after.

```html
<div>Element You want tooltip Tied to</div>
<adc-tooltip placement="bottom" type="label">
  Tooltip Text content
</adc-tooltip>
```
## Example Usage of a Default Tooltip

```html
<div>Element You want tooltip Tied to</div>
<adc-tooltip heading="This is a Heading" placement="bottom" >
        Tooltip text content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit eu pellentesque egestas adipiscing vel viverra posuere ipsum. Ut vulputate risus amet id et proin. 
</adc-tooltip>
```



## `<adc-tooltip>` Attributes and Properties

|Name|Description|Default|
|----|-----------|-------|
|placement|The position of the tooltip in relation to the element it's tied to.<br />`"top"` `"bottom"` `"left"` `"right"`|`bottom`|
|type|The type of tooltip the user wants to show.<br />`"default"` `"label"`|`"default"`|
|heading|The text-content for the heading of the default tooltip.<br />`string`|`""`|
|toggle|Set to `true` if you want the tooltip to be triggered on click instead of hover.<br />`boolean`|`false`|

## `<adc-tooltip>` Events

|Name|Description|
|----|-----------|
|adc-close-tooltip|Fired when the close button is clicked on the tooltip.<br />`function`|
|adc-show|listens for a show event on the tooltip.<br />`function`|
|adc-hide|listens for a hide event on the tooltip.<br />`function`|
|adc-finish-hide|listens for a finish hide event on the tooltip. Runs after the style transition is completed.<br />`function`|

## `<adc-tooltip>` Slots

|Name|Description|
|----|-----------|
| - | This is the default slot for the tooltip content.
