# Tile

<!--
  `adc-tile` was generated and this content should be expanded upon and a summary should replace this message.

  SUMMARY HERE
-->

Below, find guidance on how to install the tile web component and examples
of `adc-tile` in use. Visit the components storybook page for a live demo and
full code usage documentation.

## Prerequisites

If this is your first time using an internal package using [packages.aa.com](https://packages.aa.com),
please take a moment to read through the [Get Started](https://aileron.aa.com/developing/get-started)
guide before continuing.

## Installation

There are two ways to install the tile package:

```bash
npm install -S @aileron/tile
```

or via cdn:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" src="https://cdn.aa.com/aileron/tile@latest/dist/tile.js"></script>
    ...
  </head>
    ...
</html>
```

## Example Usage

```html
<adc-tile name="Tile">
  <p>This is slot text!</p>
</adc-tile>
```

## `<adc-tile>` Attributes and Properties

|Name|Description|Default|
|----|-----------|-------|
|name|Sets a name to be used with `tile`.<br />`string`|``|

## `<adc-tile>` Slots

|Name|Description|
|----|-----------|
| - | This is the default slot.
