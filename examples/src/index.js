import React from 'react'
import { render } from 'react-dom'
import EmbedID from '../../src/EmbedID'

const handleResponse = (e) => {
    console.log('Client Recieved Response: ', e)
}

const handleCustomFields = (fields) => {
    console.log("custom field handler: ", fields)
}

let customFields = {
    field1: {
        title: "Custom field",
        type: "string"
    }, 
    field2: {
        title: "The sky is blue", 
        type: "string",
        enum: ["true", "false"]
    },
    field3: {
        title: "Name:", 
        type: "string",
    }
}

render(<EmbedID url='http://localhost:3111' handleResponse={handleResponse} customFields={customFields} handleCustomFields={handleCustomFields} />, 
document.getElementById("root"))