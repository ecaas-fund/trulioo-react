import React from 'react';
import renderer from 'react-test-renderer';
import { TruliooForm } from '../../components/TruliooForm';

it('TruliooForm did not change', () => {
  const embedID = renderer
    .create(
      <TruliooForm
        url="http://localhost:3111"
        handleResponse={jest.fn()}
        schema={{ type: 'object', properties: { countries: [] } }}
        fields={{}}
        getCountries={jest.fn()}
        getFields={jest.fn()}
      />,
    )
    .toJSON();
  expect(embedID).toMatchSnapshot();
});
