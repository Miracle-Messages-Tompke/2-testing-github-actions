# @aileron/notification

Notifications are messages that communicate information to the user. There are
two notification variants:

- Page notifications show up at page level and are used to display short
messages; they usually appear at the top or bottom of the screen.
- Title is a required property that can be added through attribute or slot.
- Notification Component automatically creates the expand/collapse feature if body content or links are found.

## Prerequisites

If this is your first time using an internal package using [packages.aa.com](https://packages.aa.com),
please take a moment to read through the [Get Started](https://aileron.aa.com/developing/get-started)
guide before continuing.

## Installation

There are two ways to install the notification package:

```bash
npm install -S @aileron/notification
```

or via cdn:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" src="https://cdn.aa.com/aileron/notification@latest/notification.js"></script>
    ...
  </head>
  ...
</html>
```

## `<adc-notification>` Example Usage

```html
    <adc-notification 
    kind="success"
    ?fullwidth=true
    title="Example title header"
      >
      This is a sample section of body copy that spans more than one line. This was written to show an accurate representation of what this may look like when content is being added to the notification component. If you’re seeing this, thank you for reading.

      <a slot="link" target="_blank" href="https://www.google.com">Make sure to go here!</a>

      <a slot="link" target="_blank" href="https://www.google.com">Read important facts here.</a>

      </adc-notification>
```

## `<adc-notification>` attributes and properties

|Name|Description|Default|
|----|-----------|-------|
|* title| Sets the title heading for the notification.<br />`string`|`""`|
|kind| Sets the icon to be used with the notification. | `"success"` `"information"` `"warning"` `"error"`|`"information"`|
|inline| Sets whether the notification should take up one line or multiple.<br />`boolean`|`false`|
|can-close| Toggle if the notification can be closed.<br />`boolean`|`false`|
|fullwidth| Gives the notification full width styling.<br />`boolean`|`false`|
|is-collapsible| Gives collapse/expand functionality. <br />`boolean`|`false`|

## `<adc-notification>` Events

|Name|Description|
|----|-----------|
|adc-close|listens for a close event on the tooltip.<br />`function`|
|adc-expand|listens for a expand event on the tooltip.<br />`function`|
|adc-collapse|listens for a collapse event on the tooltip.<br />`function`|


## `<adc-notification>` slots

|Name|Description|
|----|-----------|
| - | This is the default slot for body text.|
| link | This is the slot used for DOM anchors, and to properly positions them. |
| * title | slot to set the header title text |

`* - required by either attribute or slot`
