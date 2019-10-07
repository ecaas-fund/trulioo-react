import React from 'react';
import renderer from 'react-test-renderer';
import { TruliooForm } from '../../components/TruliooForm';

it('TruliooForm did not change', () => {
  const embedID = renderer
    .create(<TruliooForm />)
    .toJSON();
  expect(embedID).toMatchSnapshot();
});
