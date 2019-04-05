import React from "react"
import { connect } from 'react-redux'
import { getCountries, getFields, submitForm } from '../actions'
import Form from "react-jsonschema-form"
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

let reservedFormDataKeys = new Set(["countries", "Properties"])

class TruliooForm extends React.Component {

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
        let splitForm = this.splitForm(e.formData)
        e.formData = splitForm[0]
        let customFields = splitForm[1]

        this.props.handleCustomFields && this.props.handleCustomFields(customFields)

        this.props.submitForm(e).then(res => {
            this.props.handleResponse(res)
        })
    } 

    triggerSubmitResponse = (e) => {
        this.props.handleResponse(e)
    }

    joinCustomFields = (schema) => {
        if (schema.properties && this.props.customFields) {
            // check that user hasn't used a reserved field key 
            Object.keys(this.props.customFields).forEach(key => {
                if (reservedFormDataKeys.has(key)) {
                    throw Error(key + " is a reserved field key. Please use another key for your custom field.")
                }
            })
            schema.properties = {...this.props.customFields, ...schema.properties}
        } 
        return schema
    }

    splitForm = (formData) => {
        let customFields = {}
        let truliooFields = {}
        Object.keys(formData).forEach(key => {
            if (reservedFormDataKeys.has(key)) {
                truliooFields[key] = formData[key]
            } else {
                customFields[key] = formData[key]
            }
        })
        return [truliooFields, customFields]
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
                title: "Country",
                type: "string",
                enum: state.getCountries.countries,
            },
        }
    }
    if (state.fields && state.fields.fields && state.fields.fields.properties) {
        schema.properties.Properties = {
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