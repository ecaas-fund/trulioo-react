import React from 'react';
import EmbedID from '../EmbedID';
import renderer from 'react-test-renderer';
import axios from 'axios';

jest.mock('axios')

it('renders countries as select', async () => {
  const countries = '["CA", "US"]';
  const response = { status: 200, data: { response: countries } };
  axios.get.mockImplementation(() => {
    return Promise.resolve(response)
  });

  const embedID = await renderer.create(<EmbedID url='http://localhost:3111' handleResponse={(e) => { }} />);
  expect(axios.get).toBeCalled();
  const instance = embedID.root;

  instance.find(e => {
    const { props } = e;
    if (props === undefined) {
      return false;
    }
    return props.id === 'root_countries' && e.type === 'select'
  })
});