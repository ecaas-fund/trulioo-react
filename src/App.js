import React from 'react';
import TruliooForm from './components/TruliooForm';

export default function App(props) {
  return <div>
    <TruliooForm handleResponse={props.handleResponse} url={props.url} customFields={props.customFields} handleCustomFields={props.handleCustomFields}  />
    
  </div>
}
