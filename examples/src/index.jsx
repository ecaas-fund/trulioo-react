import React from 'react';
import { render } from 'react-dom';
import { EmbedID } from '../../src/index';

const handleResponse = (e) => {
  // eslint-disable-next-line no-console
  console.log('Client Recieved Response: ', e);
};

const handleSubmit = (e) => {
  // eslint-disable-next-line no-console
  console.log('Submitted form: ', e);
};

// example custom fields section with required fields
const uiSchema = {
  countries: {
    'ui:title': 'Please Select you country',
  },
};

const customFields = {
  CustomFieldObj: {
    title: 'Custom Fields',
    type: 'object',
    required: ['name', 'age'],
    properties: {
      name: {
        title: 'What is your name?',
        type: 'string',
      },
      age: {
        title: 'What is your age?',
        type: 'number',
      },
      color: {
        title: 'What is your favourite color?',
        type: 'string',
        enum: ['red', 'yellow', 'blue'],
      },
    },
  },
};

const truliooFields = {
  Properties: {
    PersonInfo: {
      FirstGivenName: {
      },
    },
  },
};

render(
  <EmbedID
    url="http://localhost:3111"
    handleResponse={handleResponse}
    handleSubmit={handleSubmit}
    customFields={customFields}
    truliooFields={truliooFields}
    uiSchema={uiSchema}
  />,
  document.getElementById('root'),
);
