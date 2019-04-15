"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _react = _interopRequireDefault(require("react"));

var _EmbedID = _interopRequireDefault(require("../EmbedID"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _axios = _interopRequireDefault(require("axios"));

// mocking proxy server responses
jest.mock('axios');
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

  if (url.includes('countrysubdivisions')) {
    return Promise.resolve(response(subDivisions));
  }
});

it('renders countries as a select element',
/*#__PURE__*/
(0, _asyncToGenerator2.default)(
/*#__PURE__*/
_regenerator.default.mark(function _callee() {
  var embedID, instance;
  return _regenerator.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _reactTestRenderer.default.create(_react.default.createElement(_EmbedID.default, {
            url: "http://localhost:3111",
            handleResponse: function handleResponse(e) {}
          }));

        case 2:
          embedID = _context.sent;
          expect(_axios.default.get).toBeCalled();
          instance = embedID.root;
          instance.find(function (e) {
            var props = e.props;

            if (props === undefined) {
              return false;
            }

            return props.id === 'root_countries' && e.type === 'select';
          });

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));