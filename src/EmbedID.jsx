import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import PropTypes from 'prop-types';
import reducers from './reducers';
import { TruliooForm } from './components/TruliooForm';

const store = createStore(reducers, applyMiddleware(reduxThunk));

export default function EmbedID({
  handleResponse, url, handleSubmit, customFields,
}) {
  return (
    <Provider store={store}>
      <TruliooForm
        handleResponse={handleResponse}
        url={url}
        handleSubmit={handleSubmit}
        customFields={customFields}
      />
    </Provider>
  );
}

EmbedID.propTypes = {
  handleResponse: PropTypes.func,
  handleSubmit: PropTypes.func,
  url: PropTypes.string,
  customFields: PropTypes.objectOf(PropTypes.object),
};

EmbedID.defaultProps = {
  handleResponse: false,
  url: true,
  handleSubmit: undefined,
  customFields: undefined,
};
