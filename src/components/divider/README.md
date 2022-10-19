# @aileron/divider

The `adc-divider` provides thematic breaks between content.

You can customize dividers to fit your specific use case leveraging the
following properties:

- `dashed`: Dashed dividers are used to break up subsections of content.
- `size`: Sets margin size and adjusts overall page width of the divider.
- `label`: Allows for a text label to be applied to the divider, center-aligned.

Below, find guidance on how to install the divider web component and examples of
the divider in use. Visit the components storybook page for a live demo and full
code usage documentation.

## Prerequisites

If this is your first time using an internal package using [packages.aa.com](https://packages.aa.com),
please take a moment to read through the [Get Started](https://aileron.aa.com/developing/get-started)
guide before continuing.

## Installation

There are two ways to install the divider package:

```bash
  npm install -S @aileron/divider
```

or via cdn:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" src="https://cdn.aa.com/aileron/divider@latest/divider.js"></script>
    ...
  </head>
  ...
</html>
```

## Example Usage

```html
<adc-divider></adc-divider>
```

## `<adc-divider>` attributes and properties

|Name|Description|Default|
|----|-----------|-------|
|dashed| Sets the stroke from solid to dashed.<br />`boolean`|`false`|
|size| [DEPRECATED] Sets the margin size of the divider.<br />
`"x-small"` `"small"` `"medium"` `"large"`|`"small"`|
|spacing| New property to set the margin size of the divider.<br />
`"12"` `"16"` `"24"` `"32"` `"40"` `"48"` `"64"`|`"12"`|
