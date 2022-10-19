# @aileron/card

Cards are a highly flexible component for displaying a wide variety of
content, including informational, getting started, how-to, next steps, and more.

Aileron ships a basic card structure using `adc-card` that responds to the grid.
Cards have no pre-set styles for the content within them. You can customize
cards to fit your specific use case leveraging the following properties:

- `elevation`: Used to create a sense of depth with the card.
- `size`: Comes in two variations, `large` and `regular ("")`. The large variant
describes content that spans a wider area.
- `orientation`: orientation describes the vertical or horizontal nature of the card.

When using a call-to-action (CTA) within a card, use a secondary or ghost button.
Primary buttons should be reserved for the most important action a user can
take on the page.

## Prerequisites

If this is your first time using an internal package using [packages.aa.com](https://packages.aa.com),
please take a moment to read through the [Get Started](https://aileron.aa.com/developing/get-started)
guide before continuing.

## Installation

There are two ways to install the button package:

```bash
  npm install -S @aileron/card
```

or via cdn:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" src="https://cdn.aa.com/aileron/card@latest/card.js"></script>
    ...
  </head>
    ...
</html>
```

## `<adc-card>` example usage

```html
<adc-card elevation="2">
  <p>Qui ab enim. Et ipsam est. Voluptas occaecati ratione. In odio possimus
inventore necessitatibus voluptatem corrupti hic dolor.</p>
</adc-card>
```

## `<adc-card>` attributes and properties

|Name|Description|Default|
|----|-----------|-------|
|elevation|Sets the elevation of the card, or removes it if the value
is `0`.<br />`0` `2` `4` `6` `8` `12` `16` `24`|`0`|
|orientation|Sets the orientation of the card.<br />`"vertical"` `"horizontal"`|`"vertical"`|
|size|Card size.<br />`"large"` `""`|`""`|

## `<adc-card>` slots

|Name|Description|
|----|-----------|
|media| This is a slot for `<adc-card-media>`.|
| - | This is the default slot.

## `<adc-card-media>` example usage

```html
<adc-card elevation="2" orientation="vertical">
  <adc-card-media src="https://img.url/goes/here" ratio="16-9"></adc-card-media>
  <p>Qui ab enim. Et ipsam est. Voluptas occaecati ratione. In odio possimus
inventore necessitatibus voluptatem corrupti hic dolor.</p>
</adc-card>
```

## `<adc-card-media>` attributes and properties

|Name|Description|Default|
|----|-----------|-------|
|ratio|Sets the aspect ratio of the media.<br />`"16-9"` `"square"`|`"square"`|
|orientation|Sets the orientation of the card.<br />`"vertical"` `"horizontal"`|`"vertical"`|
|src|Media card image source. Expects an url.<br />`string`|`""`|
