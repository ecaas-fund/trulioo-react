import React from 'react'
import { render } from 'react-dom'
import EmbedID from '../../src/EmbedID'

const handleResponse = (e) => {
    console.log('Client Recieved Response: ', e)
}

const handleSubmit = (e) => {
    console.log("Submitted form: ", e)
}

// defining custom fields on base level
let simpleExample = {
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
    },
    field4: {
        title: "What is the air-speed velocity of an unladen swallow?", 
        type: "number",
    }
}

// defining custom fields section with required fields
let sectionExample = {
    CustomFieldObj: {
      title: "Keeper's Questions",
      type: "object", 
      required: ["name", "speed"],
      properties: {
        name: {
          title: "What is your name?",
          type: "string"
        }, 
        quest: {
            title: "What is your quest?", 
            type: "string",
        },
        color: {
            title: "What is your favourite color?", 
            type: "string",
            enum: ["red", "yellow", "blue"]
        }, 
        speed: {
          title: "What is the air-speed velocity of an unladen swallow?", 
          type: "number",
        }
      }
    }
  }

render(<EmbedID url='http://localhost:3111' handleResponse={handleResponse} customFields={sectionExample} handleSubmit={handleSubmit} />, 
document.getElementById("root"))