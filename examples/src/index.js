import React from 'react'
import { render } from 'react-dom'
import EmbedID from '../../src/EmbedID'

const handleResponse = (e) => {
    console.log('Client Recieved Response: ', e)
}

render(<EmbedID url='http://localhost:49160' handleResponse={handleResponse} />, document.getElementById("root"))