# @aileron/tag

Tags are used for items that need to be labeled, categorized, or organized using
keywords that describe them.

Multiple or single tags can be used to categorize items.

Use tags when content is mapped to multiple categories, and the user needs a way
to differentiate between them.

## Prerequisites

If this is your first time using an internal package using [packages.aa.com](https://packages.aa.com),
please take a moment to read through the [Get Started](https://aileron.aa.com/developing/get-started)
guide before continuing.

## Installation

There are two ways to install the radio button package:

```bash
npm install -S @aileron/tag
```

or via cdn:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" src="https://cdn.aa.com/aileron/tag@latest/tag.js"></script>
    ...
  </head>
  ...
</html>
```

## `<adc-tag>` Example Usage

```html
<adc-tag label-text="Regular tag"></adc-tag>
```

## `<adc-tag>` attributes and properties

|Name|Description|Default|
|----|-----------|-------|
|variant| Sets whether the tag is a ribbon or regular.<br />`"ribbon"` `""`|`""`|
|kind| The kind of tag to display. This will be used to determine the
color of the tag.<br />`"success"` `"error"` `"information"` `"warning"` `""`|`""`|
|label-text| The text label of the tag.<br />`string`|`""`|
|position| The position of the icon in relation to the label.<br />`"ltr"` `"rtl"`|`"ltr"`|

## `<adc-tag>` slots

|Name|Description|
|----|-----------|
|icon|Slot used to place the icon.|
