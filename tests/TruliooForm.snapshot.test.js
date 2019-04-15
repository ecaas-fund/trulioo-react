"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _EmbedID = _interopRequireDefault(require("../EmbedID"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

it('EmbedID did not change', function () {
  var embedID = _reactTestRenderer.default.create(_react.default.createElement(_EmbedID.default, {
    url: "http://localhost:3111",
    handleResponse: function handleResponse(e) {}
  })).toJSON();

  expect(embedID).toMatchSnapshot();
});