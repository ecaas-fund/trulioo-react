import React from 'react';
import EmbedID from '../EmbedID';
import renderer from 'react-test-renderer';
import axios from 'axios';

// mocking proxy server responses
jest.mock('axios') 
const countries = '["CA", "US"]';
const fields = '{ "title": "DataFields", "type": "object", "properties": { "Location": { "title": "Location", "type": "object", "properties": { "StateProvinceCode": { "type": "string", "description": "State of primary residence. US sources expect 2 characters. Australian sources expect 2 or 3 characters.", "label": "State" }, "PostalCode": { "type": "string", "description": "ZIP Code or Postal Code of primary residence", "label": "Postal Code" }}, "required": [ "PostalCode" ]}}}'
const subDivisions = '[{"code": "AL", "Name": "Alabama", "ParentCode": ""}, {"Code": "AK", "Name": "Alaska", "ParentCode": "" }]'
const response = data => { 
  return {status: 200, data: { response: data } }
}

axios.get.mockImplementation(url => {
  if (url.includes('countryCodes')) {
    return Promise.resolve(response(countries))
  }
  if (url.includes('getFields')) {
    return Promise.resolve(response(fields))
  }
  if (url.includes('getCountrySubdivisions')) {
    return Promise.resolve(response(subDivisions))
  }
});

it('renders countries as a select element', async () => {
  const embedID = await renderer.create(<EmbedID url='http://localhost:3111' handleResponse={e => { }} />);
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