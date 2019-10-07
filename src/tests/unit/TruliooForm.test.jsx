import React from 'react';
import TestRenderer from 'react-test-renderer';
import { TruliooForm } from '../../components/TruliooForm';

it('renders and node server URL are set correctly', async () => {
  const proxyURL = 'http://localhost:3111';
  const testRenderer = TestRenderer.create(<TruliooForm
    url={proxyURL}
    handleResponse={() => { }}
    schema={{ type: 'object', properties: { countries: [] } }}
    fields={{}}
    getCountries={jest.fn()}
    getFields={jest.fn()}
  />);
  const testInstance = testRenderer.root;
  expect(testInstance.findByType(TruliooForm).props.url).toBe(proxyURL);
});
