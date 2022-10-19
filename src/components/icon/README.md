# @aileron/icon

## Prerequisites

If this is your first time using an internal package using [packages.aa.com](https://packages.aa.com),
please take a moment to read through the [Get Started](https://aileron.aa.com/developing/get-started)
guide before continuing.

## Installation

There are two ways to install the icon package:

```bash
  npm install -S @aileron/icon
```

or via cdn:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" src="https://cdn.aa.com/aileron/icon@latest/icon.js"></script>
    ...
  </head>
  ...
</html>
```

## Example Usage

```html
<adc-icon icon="action:close" size="32" outlined></adc-icon>
```

## `<adc-icon>` attributes and properties

|Name|Description|Default|
|----|-----------|-------|
|src| Sets the icon to a url supplied or set when icon is set automatically.<br />`string`|`""`|
|icon| Name of the icon and size to use in format `<category>:<icon>`.<br />`string`|`""`|
|filled| Attribute used to describe an icon that has a fill.<br />`boolean`|`undefined`|
|outlined| Attribute used to describe an icon that has an outline.<br />`boolean`|`undefined`|
