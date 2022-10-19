# @aileron/layout

Layout is a page-level component that provides a wrapper for the entire page.

Within the layout, it'll add main html element to the page that all content
will be rendered into. It also provides all media queries and breakpoints for
rendering down to mobile.

Use this in combination with the `<adc-grid>` component to create a responsive
page layout easily.

## Prerequisites

If this is your first time using an internal package using [packages.aa.com](https://packages.aa.com),
please take a moment to read through the [Get Started](https://aileron.aa.com/developing/get-started)
guide before continuing.

## Installation

There are two ways to install the layout package:

```bash
npm install -S @aileron/layout
```

or via cdn:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" src="https://cdn.aa.com/aileron/layout@latest/layout.js"></script>
    ...
  </head>
  ...
</html>
```

## Example Usage

```html
<adc-layout>
  <div class="some-content">
    <p>Aperiam aut a voluptatem excepturi sit ut repellat reiciendis.</p>
  </div>
</adc-layout>
```

## `<adc-layout>` slots

|Name|Description|
|----|-----------|
| - | This is the default slot for the page.
