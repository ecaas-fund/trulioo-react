import React from "react"
import { connect } from 'react-redux'
import { getCountries, getFields, submitForm } from '../actions'
import Form from "react-jsonschema-form"
import { getName } from "country-list"
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

let reservedFormDataKeys = new Set(["countries", "TruliooFields"])

export class TruliooForm extends React.Component {

    componentDidMount() { 
        this.props.getCountries(this.props.url)
    }

    handleChange = (e) => {
        let shouldUpdateFormData = (this.props.fields.formData === undefined) || (e.formData.countries !== this.props.fields.formData.countries)
        if (shouldUpdateFormData) {
            this.props.getFields(e.formData.countries)
        }
    }

    handleSubmit = (e) => {
        this.props.handleSubmit && this.props.handleSubmit(e)
        let truliooFormData = this.parseTruliooFields(e.formData)
        this.props.submitForm(truliooFormData).then(res => {
            this.props.handleResponse(res)
        })
    }

    triggerSubmitResponse = (e) => {
        this.props.handleResponse(e)
    }

    joinCustomFields = (schema) => {
        // we check schema.properties.TruliooFields so that custom fields aren't populated until getFields is called
        if (schema.properties && schema.properties.TruliooFields && this.props.customFields) {
            // check that user hasn't used a reserved field key 
            Object.keys(this.props.customFields).forEach(key => {
                if (reservedFormDataKeys.has(key)) {
                    throw Error(key + " is a reserved field key. Please use another key for your custom field.")
                }
            })
            schema.properties = {...schema.properties, ...this.props.customFields}
        } 
        return schema
    }

    parseTruliooFields = (formData) => {
        let truliooFields = {}
        Object.keys(formData).forEach(key => {
            if (reservedFormDataKeys.has(key)) {
                truliooFields[key] = formData[key]
            } 
        })
        return truliooFields
    }

    render() {
        const style = css`padding: 2rem;`
        let schema = JSON.parse(JSON.stringify(this.props.schema))
        schema = this.joinCustomFields(schema)
        return <div css={style}>
            <Form
                schema={schema}
                onChange={e => this.handleChange(e)}
                onSubmit={e => this.handleSubmit(e)}
                formData={this.props.fields.formData}
            />
        </div>
    }
}

const mapStateToProps = (state) => {
    let schema = {
        type: "object",
        properties: {
            countries: {
                title: "Countries",
                type: "string",
                enum: state.getCountries.countries,
                enumNames: state.getCountries.countries && state.getCountries.countries.map(country => getName(country))
            },
        }
    }
    if (state.fields && state.fields.fields && state.fields.fields.properties) {
        schema.properties.TruliooFields = {
            title: "Properties",
            type: "object",
            properties: state.fields && state.fields.fields && state.fields.fields.properties
        }
    }

    if (this && this.props && this.props.customFields) {
        schema.customFields = this.props.customFields
    }
    
    return {
        fields: state.fields,
        schema,
        formdata: state.formData
    }
}

export default connect(mapStateToProps, { getCountries, getFields, submitForm })(TruliooForm)