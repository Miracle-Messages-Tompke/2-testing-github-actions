# @aileron/loading

Loading spinners are used when retrieving data or performing slow computations,
and help to notify users that loading is underway.

Use a loading spinner whenever the wait time is anticipated to be longer
than three seconds.

## Prerequisites

If this is your first time using an internal package using [packages.aa.com](https://packages.aa.com),
please take a moment to read through the [Get Started](https://aileron.aa.com/developing/get-started)
guide before continuing.

## Installation

There are two ways to install the loading package:

```bash
  npm install -S @aileron/loading
```

or via cdn:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" src="https://cdn.aa.com/aileron/loading@latest/loading.js"></script>
    ...
  </head>
    ...
</html>
```

## Example Usage Large Loading

```html
<adc-loading
    state="${state}"
    label-text="${label}"
>
</adc-loading>
```

## Attributes and Properties

|Name|Description|Default|
|----|-----------|-------|
|state|The current state of the loading component. (E.g. Active, Success, Error)<br />`string`|`""`|
|label-text|The text-content of the loading component, could also be the `<slot>` content.<br />`string`|`""`|
