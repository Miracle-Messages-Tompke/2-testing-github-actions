# @aileron/tabs

Tabs are used to quickly navigate between views within the same context.

In terms of page architecture and information hierarchy, tabs sit above the
content switcher in organizing larger more distinct groups of content. It is
appropriate to use content switcher within tabbed content, however avoid using
tabs within tabs where possible.

## Prerequisites

If this is your first time using an internal package using [packages.aa.com](https://packages.aa.com),
please take a moment to read through the [Get Started](https://aileron.aa.com/developing/get-started)
guide before continuing.

## Installation

There are two ways to install the radio button package:

```bash
npm install -S @aileron/tabs
```

or via cdn:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" src="https://cdn.aa.com/aileron/tabs@latest/tabs.js"></script>
    ...
  </head>
  ...
</html>
```

## `<adc-tabs>` Example Usage

```html
<adc-tabs auto label="group label">
  <adc-tab label-text="Select Item 2" value="value_02">Select Item 2</adc-tab>
  <adc-tab label-text="Select Item 3" value="value_03">Select Item 3</adc-tab>
  <adc-tab-panel label-text="Select Item 4" value="value_04">Select Item 4</adc-tab-panel>
  <adc-tab-panel label-text="Select Item 4" value="value_04">Select Item 4</adc-tab-panel>
</adc-tabs>
```

## `<adc-tabs>` attributes and properties

|Name|Description|Default|
|----|-----------|-------|
|auto| Will switch to the next tab without having to select it first.<br />`boolean`|`false`|
|disabled| Sets all tabs to disabled.<br />`boolean`|`false`|
|direction| Set the tab direction, horizontal is only supported for now.<br />`"horizontal"`|`"horizontal"`|
|shouldAnimate| Sets if the tabs should animate.<br />`boolean`|`false`|
|selectionIndicatorStyle| Sets the animation style for
the selection indicator.<br />`string`|`""`|
|label| Sets the aria-label to define the group of tabs.<br />`string`|`""`|
|selected| Sets the selected tab and tab-panel.<br />`string`|`""`|

## `<adc-tabs>` slots

|Name|Description|
|----|-----------|
| - |Default content slot, used for the tabs.|
|adc-tab-panel|Default content slot, used for the tab panels.|

## `<adc-tab>` attributes and properties

|Name|Description|Default|
|----|-----------|-------|
|label| Sets the label text for the tab.<br />`boolean`|`false`|
|selected| Sets the tab as selected.<br />`boolean`|`false`|
|disabled| Sets the tab as disabled.<br />`boolean`|`false`|
|value| Sets the value of the tab to be associated with the tab-panel.<br />`string`|`""`|

## `<adc-tab>` slots

|Name|Description|
|----|-----------|
| - |Default content slot, used for the tab label.|

## `<adc-tab-panel>` attributes and properties

|Name|Description|Default|
|----|-----------|-------|
|selected| Sets the tab panel as selected.<br />`boolean`|`false`|
|id| Sets the id for the tab-panel.<br />`string`|`""`|
|tabindex| Sets the tabindex for the tab-panel.<br />`number`|`0`|
|value| Sets the value to be associated with the tab.<br />`string`|`""`|

## `<adc-tab-panel>` slots

|Name|Description|
|----|-----------|
| - |Default content slot, used for the content.|
