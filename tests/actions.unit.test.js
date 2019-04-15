"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var _reduxMockStore = _interopRequireDefault(require("redux-mock-store"));

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var actions = _interopRequireWildcard(require("../actions/index"));

var types = _interopRequireWildcard(require("../actions/types"));

// mocking proxy server responses
jest.mock('axios');
var country = "US";
var countries = '["CA", "US"]';
var fields = '{ "title": "DataFields", "type": "object", "properties": { "Location": { "title": "Location", "type": "object", "properties": { "StateProvinceCode": { "type": "string", "description": "State of primary residence. US sources expect 2 characters. Australian sources expect 2 or 3 characters.", "label": "State" }, "PostalCode": { "type": "string", "description": "ZIP Code or Postal Code of primary residence", "label": "Postal Code" }}, "required": [ "PostalCode" ]}}}';
var subDivisions = '[{"code": "AL", "Name": "Alabama", "ParentCode": ""}, {"Code": "AK", "Name": "Alaska", "ParentCode": "" }]';

var response = function response(data) {
  return {
    status: 200,
    data: {
      response: data
    }
  };
};

_axios.default.get.mockImplementation(function (url) {
  if (url.includes('countryCodes')) {
    return Promise.resolve(response(countries));
  }

  if (url.includes('getFields')) {
    return Promise.resolve(response(fields));
  }

  if (url.includes('getCountrySubdivisions')) {
    return Promise.resolve(response(subDivisions));
  }
});

var middlewares = [_reduxThunk.default];
var mockStore = (0, _reduxMockStore.default)(middlewares);
describe('async actions',
/*#__PURE__*/
(0, _asyncToGenerator2.default)(
/*#__PURE__*/
_regenerator.default.mark(function _callee() {
  return _regenerator.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          it('getCountries makes get requests and dispatches correct action', function () {
            var expectedActions = [{
              type: types.GET_FIELDS
            }];
            var store = mockStore({});
            return store.dispatch(actions.getFields(country)).then(function () {
              var receivedActions = store.getActions();
              expect(expectedActions.length).toEqual(receivedActions.length);
              expect(expectedActions[0].type).toEqual(receivedActions[0].type);
              expect(receivedActions[0].payload.fields).toBeDefined();
            });
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));