import React from 'react'
import { render } from 'react-dom'
import EmbedID from '../../src/EmbedID'

const handleResponse = (e) => {
    console.log('Client Recieved Response: ', e)
}

const handleCustomFields = (fields) => {
    console.log("Custom fields: ", fields)
}

let customFields = {
    field1: {
        title: "What is your name?",
        type: "string"
    }, 
    field2: {
        title: "What is your quest?", 
        type: "string",
    },
    field3: {
        title: "What is your favourite color?", 
        type: "string",
        enum: ["red", "yellow", "blue"]
    }
}

render(<EmbedID url='http://localhost:3111' handleResponse={handleResponse} customFields={customFields} handleCustomFields={handleCustomFields} />, 
document.getElementById("root"))