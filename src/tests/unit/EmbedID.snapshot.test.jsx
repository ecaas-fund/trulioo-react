import React from 'react';
import renderer from 'react-test-renderer';
import EmbedID from '../../EmbedID';

it('EmbedID did not change', () => {
  const embedID = renderer
    .create(<EmbedID
      url="http://localhost:3111"
      handleResponse={() => { }}
      handleSubmit={() => { }}
      customFields={() => { }}
    />)
    .toJSON();
  expect(embedID).toMatchSnapshot();
});
