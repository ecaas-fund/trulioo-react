import React from 'react';
import TestRenderer from 'react-test-renderer';
import { render, fireEvent, prettyDOM } from '@testing-library/react';
import axios from 'axios';
import { mockApiWithDetailedConstents } from './mockApi';
import EmbedID from '../../EmbedID';

jest.mock('axios');
mockApiWithDetailedConstents();

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
describe('EmbedID events function properly', () => {
  beforeAll(() => mockApiWithDetailedConstents());
  // TODO define getFields and see how DOM changes
  it('is able to select from dropdown', async () => {
    const { container } = render(<EmbedID />);

    const dropdown = container.querySelector('.form-control');// select
    // console.log('dropdown', dropdown);
    fireEvent.change(dropdown, { target: { value: 'Canada' } });
  });
});
