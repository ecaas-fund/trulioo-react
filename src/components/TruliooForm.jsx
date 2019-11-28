import React from 'react';
import { connect } from 'react-redux';
import Form from 'react-jsonschema-form';
import { getName } from 'country-list';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { getCountries, getFields, submitForm } from '../actions';

export class TruliooForm extends React.Component {
  componentDidMount() {
    if (this.props.getCountries) {
      this.props.getCountries(this.props.url);
    }
  }

  handleChange = (e) => {
    /* istanbul ignore next */
    const shouldUpdateFormData = this.props.fields.formData === undefined
      || e.formData.countries !== this.props.fields.formData.countries;
    /* istanbul ignore next */
    console.log(e.formData.countries);
    // if (shouldUpdateFormData) {
    this.props.getFields('AU', this.props.additionalFields, this.props.whiteListedTruliooFields);
    // }
  };

  handleSubmit = (e) => {
    /* istanbul ignore next */
    // eslint-disable-next-line no-unused-expressions
    this.props.handleSubmit && this.props.handleSubmit(e);
    this.props.submitForm(e.formData).then((res) => {
      /* istanbul ignore if */
      if (this.props.handleResponse) {
        this.props.handleResponse(res);
      }
    });
  };

  render() {
    const style = css`
      padding: 2rem;
    `;
    const formData = this.props.fields && this.props.fields.formData;
    if (!this.props.schema) {
      return <div>No Schema Defined</div>;
    }
    return (

      <div css={style}>
        <Form
          schema={this.props.schema}
          uiSchema={this.props.uiSchema}
          onChange={(e) => this.handleChange(e)}
          onSubmit={(e) => this.handleSubmit(e)}
          formData={formData}
        />
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  const schema = {
    type: 'object',
    properties: {
      countries: {
        title: 'Countries',
        type: 'string',
        enum: state.getCountries.countries,
        enumNames:
          state.getCountries.countries
          && state.getCountries.countries.map(getName),
      },
    },
  };
  /* istanbul ignore if */
  if (state.fields && state.fields.fields && state.fields.fields.properties) {
    schema.properties.TruliooFields = {
      title: 'Properties',
      type: 'object',
      properties: state.fields && state.fields.fields && state.fields.fields.properties,
    };
    /* istanbul ignore if */
    if (state.fields.additionalFields) {
      schema.properties = { ...schema.properties, ...state.fields.additionalFields };
    }
    if (state.fields.consents) {
      schema.properties.Consents = state.fields.consents;
    }
  }
  return {
    fields: state.fields,
    schema,
    formdata: state.formData,
  };
};

export default connect(
  mapStateToProps,
  { getCountries, getFields, submitForm },
)(TruliooForm);
