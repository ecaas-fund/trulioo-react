# Styling 🦩
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
return <div>
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

## Input

// TODO can't be done from css