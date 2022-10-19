# @aileron/overflow

Overflow holds content that the user has the ability to toggle in or out of visiblity with a "read more" and "read less" button.

- The overflow content should be placed as a child to the overflow element.

## Prerequisites

If this is your first time using an internal package using [packages.aa.com](https://packages.aa.com),
please take a moment to read through the [Get Started](https://aileron.aa.com/developing/get-started)
guide before continuing.


## Installation

There are two ways to install the overflow package:

```bash
npm install -S @aileron/overflow
```

or via cdn:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" src="https://cdn.aa.com/aileron/overflow@latest/overflow.js"></script>
    ...
  </head>
  ...
</html>
```

## `<adc-overflow>` Example Usage

```html
    <p>
      This content is always visible
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat.
    </p>
    <adc-overflow
      ?disabled=false
      readMoreButtonText="Read More"
      readLessButtonText="Read Less"
      ?hasReadLessButton=true
    >
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <p>
        Duis Overflow aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum.
      </p>
      <img alt="" src="http://placekitten.com/g/200/300" />
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
      <img alt="" src="http://placekitten.com/g/400/300" />
    </adc-overflow>
```


## `<adc-overflow>` attributes and properties

|Name|Description|Default|
|----|-----------|-------|
|disabled| Disabled the buttons.<br />`boolean`|`false`|
|hasReadLessButton| Adds or Removes the "Read Less" button to the component.<br />`boolean`|`false`|
|open| Open state of the component.<br />`boolean`|`false`|
|readMoreButtonText| Sets the  "Read More" button text.<br />`string`|`"Read More"`|
|readLessButtonText| Sets the  "Read Less" button text.<br />`string`|`"Read Less"`|


## `<adc-overflow>` Events

|Name|Description|
|----|-----------|
|adc-overflow-close|listens for a close event.<br />`function`|
|adc-overflow-open|listens for a close event.<br />`function`|


## `<adc-overflow>` slots

|Name|Description|
|----|-----------|
| - | Default slot for overflow body content.|
