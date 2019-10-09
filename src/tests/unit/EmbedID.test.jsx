import React from 'react';
import TestRenderer from 'react-test-renderer';
import axios from 'axios';
import EmbedID from '../../EmbedID';

jest.mock('axios');

it('renders countries as a select element', async () => {
  const sectionExamplePayload = {
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
  const embedID = TestRenderer.create(
    <EmbedID
      url="http://localhost:3111"
      handleResponse={() => { }}
      customFields={sectionExamplePayload}
    />,
  );
  expect(axios.get).toBeCalled();
  const rootInstance = embedID.root;

  rootInstance.find((e) => {
    const { props } = e;
    if (props === undefined) {
      return false;
    }
    return props.id === 'root_countries';
  });
});
