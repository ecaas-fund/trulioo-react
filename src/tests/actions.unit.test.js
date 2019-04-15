import axios from 'axios';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../actions/index'
import * as types from '../actions/types'

// mocking proxy server responses
jest.mock('axios') 
const country = "US"
const countries = '["CA", "US"]';
const fields = '{ "title": "DataFields", "type": "object", "properties": { "Location": { "title": "Location", "type": "object", "properties": { "StateProvinceCode": { "type": "string", "description": "State of primary residence. US sources expect 2 characters. Australian sources expect 2 or 3 characters.", "label": "State" }, "PostalCode": { "type": "string", "description": "ZIP Code or Postal Code of primary residence", "label": "Postal Code" }}, "required": [ "PostalCode" ]}}}'
const subDivisions = '[{"code": "AL", "Name": "Alabama", "ParentCode": ""}, {"Code": "AK", "Name": "Alaska", "ParentCode": "" }]'
const response = data => { 
  return {status: 200, data: { response: data } }
}

axios.get.mockImplementation((url) => {
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

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', async () => {
  it('getCountries makes get requests and dispatches correct action', () => {
    const expectedActions = [{ type: types.GET_FIELDS }]
    const store = mockStore({  })

    return store.dispatch(actions.getFields(country)).then(() => {
        let receivedActions = store.getActions()
        expect(expectedActions.length).toEqual(receivedActions.length)
        expect(expectedActions[0].type).toEqual(receivedActions[0].type)
        expect(receivedActions[0].payload.fields).toBeDefined()
    })
  })
})