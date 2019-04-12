import React from 'react';
import EmbedID from '../EmbedID';
import renderer from 'react-test-renderer';

it('EmbedID did not change', () => {
  const embedID = renderer.create(<EmbedID url='http://localhost:3111' handleResponse={(e) => { }} />).toJSON();
  expect(embedID).toMatchSnapshot();
});


