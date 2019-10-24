# Styling 🦩
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
- [Styling](#styling-%F0%9F%A6%A9)
  - [Bg-colour](#bg-colour)
  - [Text Colour](#text-colour)
  - [Logo](#logo)
  - [Fonts](#fonts)
  - [Button](#button)
  - [Dropdown](#dropdown)
  - [File Upload](#file-upload)
  - [Rename fields](#rename-fields)
  - [Pass in custom Elements:](#pass-in-custom-elements)
  - [Display (Whitelist) only specific fields (eg. display only "First Name"):](#display-whitelist-only-specific-fields-eg-display-only-first-name)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Styling
Applying styling to `trulioo-react` components is no different than applying styling to HTML5 components, by utilzing CSS.

## Bg-colour 

`background-color` is able to apply changes to a certain DOM element. Use IDs and classnames to target a certain element in the DOM i.e: 

```
#root_TruliooFields .form-group.field.field-object:nth-child(2) {
    background-color: lightblue;
}
```

## Text Colour

```
// assing color to all inputs
input {
  color: blue;
}

// assing color to all placeholders
input::placeholder {
  color: red;
  opacity: 1;
}
```

## Logo

```
<div>
    <img src="https://www.trulioo.com/wp-content/uploads/Trulioo_tagline_600px.png">
    <EmbedID/>
</div>
```

## Fonts

```
// change fonts of all the select elements
select {
    font-family: "Times New Roman", Times, serif;
}
```

## Button

```
.btn-info {
    color: black;
    background-color: lightgreen;
    border-color: lightgreen;
}
```

## Dropdown

No different to other DOM elements.

## File Upload

[Codepen example](https://codepen.io/adamlaki/pen/VYpewx)

## Rename fields

Renaming of 'countries' name to 'Please select a country':

```
const uiSchema = {
  countries: {
    'ui:title': 'Please select your country of residence: ',
  },
};
<EmbedID uiSchema={uiSchema} />;
````

To style a Trulioo-formed field (not CustomField), the same logic applied by including `TruliooFields` key on top of the object:

```
TruliooFields: {
  PersonInfo: {
    FirstGivenName: {
      'ui:title': 'Testing First Name Title',
      'ui:description': 'Testing First Name Description',
      'ui:placeholder': 'insert me',
    },
  }
}
```

## Pass in custom Elements:

Define a React component and pass it down to UISchema:

```
const reactComponent = (
      <div>
        <FontAwesomeIcon icon={faThLarge} />
        {' '}
        Country select with custom Icon
      </div>
    );
    const uiSchema = {
      countries: {
        'ui:title': complexElement,
      },
    };
```

## Display (Whitelist) only specific fields (eg. display only "First Name"):

```
const whiteListedTruliooFields = {
  properties: {
    PersonInfo: {
      properties: {
        FirstGivenName: {
        },
      },
    },
  },
};

<EmbedID whiteListedTruliooFields={whiteListedTruliooFields}/>
```

Labels contain a certain ID, which can be in [TRULIOO_FIELDS.md file]((https://github.com/Trulioo/trulioo-react/blob/master/TRULIOO_FIELDS)). The label-ID can also be retrieved by inspecting the id of the element in the DOM, right after `EmbedID` is rendered.