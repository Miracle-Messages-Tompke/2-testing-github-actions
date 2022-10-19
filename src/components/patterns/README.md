# @aileron/patterns

Patterns are organisms that are used to structure content or provide
pre-fabricated components that can be used to make your life easier.

Currently, we have the `<adc-form-generator>` component available and
more will be added over time.

## Prerequisites

If this is your first time using an internal package using [packages.aa.com](https://packages.aa.com),
please take a moment to read through the [Get Started](https://aileron.aa.com/developing/get-started)
guide before continuing.

## Installation

There are two ways to install the patterns package:

```bash
npm install -S @aileron/patterns
```

or via cdn:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" src="https://cdn.aa.com/aileron/patterns@latest/patterns.js"></script>
    ...
  </head>
  ...
</html>
```

## `<adc-form-generator>` Example Usage

```html
<adc-form-generator config="..."></adc-form-generator>
```

## `<adc-form-generator>` Example Config

```json
[
  [
    {
      "component": "select",
      "label-text": "Card type",
      "required": true,
      "value": [
        {
          "label-text": "American Express",
          "value": "American Express"
        },
        {
          "label-text": "Visa",
          "value": "Visa"
        },
        {
          "label-text": "Mastercard",
          "value": "Mastercard"
        }
      ],
      "placeholder": "Select card type"
    },
    {
      "component": "text",
      "pattern": "",
      "label-text": "Card number",
      "required": true,
      "value": "",
      "placeholder": "",
      "validity-message": "Card number is required. Please enter card number."
    },
    {
      "component": "text",
      "pattern": "",
      "label-text": "Expiration Date",
      "required": true,
      "value": "",
      "placeholder": "MM/YY"
    },
    {
      "component": "text",
      "pattern": "",
      "label-text": "Security code",
      "required": true,
      "value": "",
      "placeholder": "",
      "validity-message": "Security code required"
    }
  ],
  [
    {
      "component": "text",
      "pattern": "",
      "label-text": "First name",
      "required": true,
      "value": "",
      "placeholder": "",
      "autocomplete": "given-name"
    },
    {
      "component": "text",
      "pattern": "",
      "label-text": "Middle name",
      "value": "",
      "placeholder": ""
    },
    {
      "component": "text",
      "pattern": "",
      "label-text": "Last name",
      "required": true,
      "value": "",
      "placeholder": "",
      "autocomplete": "family-name"
    }
  ],
  [
    {
      "component": "divider",
      "style": ""
    }
  ],
  [
    {
      "component": "select",
      "label-text": "Country / region",
      "required": true,
      "disabled": true,
      "value": [
        {
          "label-text": "United States",
          "value": "United States",
          "default": true
        },
        {
          "label-text": "Canada",
          "value": "Canada"
        },
        {
          "label-text": "Mexico",
          "value": "Mexico"
        }
      ],
      "placeholder": "Select Country"

    }
  ],
  [
    {
      "component": "text",
      "pattern": "",
      "label-text": "Billing address 1",
      "required": true,
      "value": "",
      "placeholder": ""
    },
    {
      "component": "text",
      "pattern": "",
      "label-text": "Billing address 2",
      "value": "",
      "placeholder": ""
    }
  ],
  [
    {
      "component": "text",
      "pattern": "",
      "label-text": "City",
      "value": "",
      "placeholder": ""
    },
    {
      "component": "text",
      "pattern": "",
      "label-text": "State",
      "required": false,
      "value": "",
      "placeholder": ""
    },
    {
      "component": "text",
      "pattern": "",
      "label-text": "Postal code",
      "required": false,
      "value": "",
      "placeholder": ""
    }
  ]
]
```

## `<adc-form-generator>` attributes and properties

|Name|Description|Default|
|----|-----------|-------|
|config| Stringified JSON configuration for the form.<br />`string`|`""`|
