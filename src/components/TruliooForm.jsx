import React from "react"
import { connect } from 'react-redux'
import { getCountries, getFields, getSubdivisions, submitForm } from '../actions'
import Form from "react-jsonschema-form"
import { getName } from "country-list"
import { CountryRegionData } from "react-country-region-selector"
/** @jsx jsx */
import { jsx, css } from '@emotion/core'


class TruliooForm extends React.Component {

    componentDidMount() {
        this.props.getCountries(this.props.url)
    }

    handleChange = (e) => {
        let shouldUpdateFormData = (this.props.fields.formData === undefined) || (e.formData.countries !== this.props.fields.formData.countries)
        if (shouldUpdateFormData) {
            this.props.getFields(e.formData.countries)
            this.props.getSubdivisions(e.formData.countries)
        }
    }

    handleSubmit = (e) => {
        this.props.submitForm(e).then(res => {
            this.props.handleResponse(res)
        })
    }

    triggerSubmitResponse = (e) => {
        this.props.handleResponse(e)
    }

    render() {
        const style = css`padding: 2rem;`
        return <div css={style}>
            <Form
                schema={this.props.schema}
                onChange={e => this.handleChange(e)}
                onSubmit={e => this.handleSubmit(e)}
                formData={this.props.fields.formData}
            />
        </div>
    }
}

const findSubRegions = (countryCode) => {
    let country = CountryRegionData.find(x => {
        return x[1] === countryCode 
    }) 
    let subRegions = country[2]
    return parseSubRegions(subRegions)
}

const parseSubRegions = (subRegionString) => {
    let regionArray = subRegionString.split("|")
    return regionArray.map(x => {
        let nameCode = x.split("~")
        return {
            name: nameCode[0], 
            regionCode: nameCode[1]
        }
    })
}

const recursivelyUpdateStateProvince_old = (obj, countryCode) => {
    Object.keys(obj).forEach((k) => {
        if (k === "StateProvinceCode") {
            let subRegions = findSubRegions(countryCode)
            obj[k] = {
                ...obj[k],
                enum: subRegions.map(x => x.regionCode),
                enumNames: subRegions.map(x => x.name)
            }
        } else if (obj[k] !== null && typeof obj[k] === 'object') {
            recursivelyUpdateStateProvince_old(obj[k], countryCode);
        }
    });
}

const recursivelyUpdateStateProvince = (obj, subdivisions) => {
    Object.keys(obj).forEach((k) => {
        if (k === "StateProvinceCode") {
            obj[k] = {
                ...obj[k],
                enum: subdivisions.map(x => x.Code),
                enumNames: subdivisions.map(x => x.Name)
            }
        } else if (obj[k] !== null && typeof obj[k] === 'object') {
            recursivelyUpdateStateProvince(obj[k], subdivisions);
        }
    });
}

const mapStateToProps = (state) => {
    let schema = {
        type: "object",
        properties: {
            countries: {
                title: "Country",
                type: "string",
                enum: state.getCountries.countries,
                enumNames: state.getCountries.countries && state.getCountries.countries.map(x => getName(x))
            }
        }
    }
    if (state.fields && state.fields.fields && state.fields.fields.properties) {
        console.log(state.fields)
        schema.properties.Properties = {
            title: "Properties",
            type: "object",
            properties: state.fields && state.fields.fields && state.fields.fields.properties
        }
    }
    console.log("state")
    console.log(state)
    console.log("schema before")
    console.log(schema)
    // if (state.fields && state.fields.formData && state.fields.formData.countries) {
    //     let countryCode = state.fields.formData.countries
    if (state.fields && state.fields.subdivisions) {
        recursivelyUpdateStateProvince(schema, state.fields.subdivisions)
    }
        // recursivelyUpdateStateProvince(schema, countryCode)
    // }
    console.log("schema after")
    console.log(schema)
    return {
        fields: state.fields,
        schema,
        formdata: state.formData
    }
}

export default connect(mapStateToProps, { getCountries, getFields, getSubdivisions, submitForm })(TruliooForm)