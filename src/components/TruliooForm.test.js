import React from 'react';
import EmbedID from '../EmbedID';
import renderer from 'react-test-renderer';
import axios from 'axios';

jest.mock('axios')


it('EmbedID did not change', () => {
  const embedID = renderer.create(<EmbedID url='http://localhost:3111' handleResponse={(e) => { }} />).toJSON();
  expect(embedID).toMatchSnapshot();
});


it('renders country as select', async () => {
  const countries = '["CA", "US"]';
  const response = { status: 200, data: {response: countries}}
  axios.get.mockImplementation(() => {
      return Promise.resolve(response)
    });

  const embedID = await renderer.create(<EmbedID url='http://localhost:3111' handleResponse={(e) => { }} />);
  expect(axios.get).toBeCalled()
  const instance = embedID.root;

  instance.find(
    (e) => e.type == 'select' 
    && e.props 
    && e.props.id == 'root_countries'
  )

  expect(axios.get).toBeCalled()
})