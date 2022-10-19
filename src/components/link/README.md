# @aileron/link

Links are used as navigational elements and can be used on their own or inline
with text. They provide a lightweight option for navigation but like other
interactive elements, too many links will clutter a page and make it difficult
for users to identify their next steps. This is especially true for inline links,
which should be used sparingly.

Links can be coupled with a trailing icon to provide further emphasis or clarity
as to the underlying action.

## Prerequisites

If this is your first time using an internal package using [packages.aa.com](https://packages.aa.com),
please take a moment to read through the [Get Started](https://aileron.aa.com/developing/get-started)
guide before continuing.

## Installation

There are two ways to install the link package:

```bash
npm install -S @aileron/link
```

or via cdn:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" src="https://cdn.aa.com/aileron/link@latest/link.js"></script>
    ...
  </head>
  ...
</html>
```

## Example Usage

```html
<adc-link href="#">Active Link</adc-link>
```

## `<adc-link>` attributes and properties

|Name|Description|Default|
|----|-----------|-------|
|href| Href to pass to the html anchor element.<br />`string`|`""`|
|icon| Determine what icon to show, if any.<br />`"new-window"` `"chevron"` `""`|`""`|
|hidden-label-text| Add hidden text for screen readers.<br />`string`|`""`|
|rel| Rel to pass to the html anchor element.<br />`string`|`""`|
|target| Pass the string of target to the html anchor
element.<br />`"_blank_"` `"_self"` `"_parent"` `"_top"` `undefined`|`undefined`|
|disabled| Disable the link from being clicked.<br />`boolean`|`false`|
|inline| Set if this is used within a paragraph or not standalone.<br />`boolean`|`false`|

## `<adc-link>` slots

|Name|Description|
|----|-----------|
| - | This is the default slot for text-content.
