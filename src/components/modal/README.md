# @aileron/modal

Modals interrupt user workflow by design. They are most effective when a task
must be completed before a user can continue. While effective when used
correctly, modals should be used sparingly to limit disruption to a user experience.

## Prerequisites

If this is your first time using an internal package using [packages.aa.com](https://packages.aa.com),
please take a moment to read through the [Get Started](https://aileron.aa.com/developing/get-started)
guide before continuing.

## Installation

There are two ways to install the modal package:

```bash
npm install -S @aileron/modal
```

or via cdn:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" src="https://cdn.aa.com/aileron/modal@latest/modal.js"></script>
    ...
  </head>
  ...
</html>
```

## `<adc-modal>` Example Usage

```html
<adc-modal>
  <adc-modal-header>
    <adc-modal-close-button></adc-modal-close-button>
    <adc-modal-heading>Modal Heading</adc-modal-heading>
  </adc-modal-header>
  <adc-modal-body>
    Ut consequatur adipisci magnam quis vitae quos fuga deleniti. Porro molestiae
    id voluptas qui et. Molestias architecto modi exercitationem dolores rerum iste
    velit voluptate. Inventore adipisci et non qui. Eos velit deserunt dolorem
    ipsum et voluptatem voluptatem rem unde.
  </adc-modal-body>
  <adc-modal-footer>
    Modal Footer Content
  </adc-modal-footer>
</adc-modal>
```

## `<adc-modal>` attributes and properties

|Name|Description|Default|
|----|-----------|-------|
|containerClass| Href to pass to the html anchor element.<br />`string`|`""`|
|open| Sets when the modal is open.<br />`"new-window"` `boolean`|`false`|
|size| Sets the size of the modal.<br />`"sm"` `""`|`""`|

## `<adc-modal>` events

|Name|Description|
|----|-----------|
|adc-modal-beingclosed|Event fired when the modal is has been told to close.<br />`function`|
|adc-modal-closed|Event fired when the modal is closed.<br />`function`|

## `<adc-modal>` slots

|Name|Description|
|----|-----------|
| - | This is the default slot for list items.|
