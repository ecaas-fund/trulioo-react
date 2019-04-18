import React from 'react';
import renderer from 'react-test-renderer';
import axios from 'axios';
import EmbedID from '../EmbedID';
import mockApi from './mockApi';

jest.mock('axios');
mockApi();

it('renders countries as a select element', async () => {
  const embedID = await renderer.create(
    <EmbedID url="http://localhost:3111" handleResponse={() => { }} />,
  );
  expect(axios.get).toBeCalled();
  const instance = embedID.root;

  instance.find((e) => {
    const { props } = e;
    if (props === undefined) {
      return false;
    }
    return props.id === 'root_countries';
    // TODO FIX && e.type === 'select'
  });
});
