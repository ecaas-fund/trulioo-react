import React from 'react';
import TestRenderer from 'react-test-renderer';
import { TruliooForm, mapStateToProps } from '../../components/TruliooForm';

describe('TruliooForm works correctly', () => {
  it('renders and node server URL are set correctly', async () => {
    const proxyURL = 'http://localhost:3111';
    const truliooForm = TestRenderer.create(
      <TruliooForm
        url={proxyURL}
        handleResponse={() => { }}
        schema={{}}
        fields={{}}
        getCountries={jest.fn()}
        getFields={jest.fn()}
      />,
    );
    const rootInstance = truliooForm.root;
    expect(rootInstance.findByType(TruliooForm).props.url).toBe(proxyURL);
  });

  it('mapStateToProps generates JSON schema correctly', async () => {
    const customFields = {
      customFieldsProperty: 'customFieldsValue',
    };
    const consents = {
      consentProperty: 'consentValue',
    };

    const initialState = {
      getCountries: {},
      fields: {
        fields: {
          properties: {
          },
        },
        customFields,
        consents,
      },
    };

    const result = mapStateToProps(initialState);
    const expectedSchema = {
      type: 'object',
      properties:
      {
        countries:
        {
          title: 'Countries',
          type: 'string',
          enum: undefined,
          enumNames: undefined,
        },
        TruliooFields: { title: 'Properties', type: 'object', properties: {} },
        customFieldsProperty: 'customFieldsValue',
        Consents: { consentProperty: 'consentValue' },
      },
    };
    expect(result.schema).toEqual(expectedSchema);
  });
});
