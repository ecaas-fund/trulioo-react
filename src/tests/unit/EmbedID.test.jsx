import React from 'react';
import TestRenderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { mockApiWithDetailedConstents } from './mockApi';
import EmbedID from '../../EmbedID';

jest.mock('axios');

describe('EmbedID renders correctly', () => {
  beforeAll(() => mockApiWithDetailedConstents());
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
        handleSubmit={() => { }}
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
});

describe('EmbedID events function properly', () => {
  beforeAll(() => mockApiWithDetailedConstents());

  it('is able to select from dropdown', async () => {
    const { container } = render(<EmbedID />);

    const dropdown = container.querySelector('.form-control');
    expect(dropdown).toBeTruthy();
    fireEvent.change(dropdown, { target: { value: 'CA' } });
  });

  it('is able to submit ', async () => {
    const { container } = render(<EmbedID handleResponse={jest.fn()} />);

    const submitBtn = container.querySelector('.btn.btn-info');
    expect(submitBtn).toBeTruthy();
    fireEvent.click(submitBtn, { target: { value: 'your_value_goes_here' } });
  });

  it('is able to submit without a define handleResponse function', async () => {
    const { container } = render(<EmbedID />);

    const submitBtn = container.querySelector('.btn.btn-info');
    expect(submitBtn).toBeTruthy();
    fireEvent.click(submitBtn, { target: { value: 'your_value_goes_here' } });
  });
});
