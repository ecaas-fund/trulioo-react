import React from "react"
import { connect } from 'react-redux'
import { getCountries, getFields, submitForm } from '../actions'
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

const getCountryInputSchema = (countries) => {
    let result = {
        title: "Country",
        type: "string",
        anyOf: countries && countries.map(x => { 
            // console.log("Regions")
            // console.log(findSubRegions(x))
                    return {
                        type: "string",
                        title: getName(x),
                        enum: [x]
                    }
                }),
    }
    console.log("country input")
    console.log(result)
    return result
}

const getStateProvinceSchema = (countryCode) => {
    let subRegions = findSubRegions(countryCode)
    let result =  subRegions.map(x => { 
            // console.log("Regions")
            // console.log(findSubRegions(x))
                    return {
                        type: "string",
                        title: x.name,
                        enum: [x.regionCode]
                    }
                })
    
    console.log("country input")
    console.log(result)
    return result
}

const mapStateToProps = (state) => {
    let schema = {
        type: "object",
        properties: {
            countries: getCountryInputSchema(state.getCountries.countries)
        }
    }
    if (state.fields && state.fields.fields && state.fields.fields.properties) {
        console.log(state.fields)
        schema.properties.Properties = {
            title: "Properties",
            type: "object",
            properties: state.fields && state.fields.fields && state.fields.fields.properties
        }
        // let stateProvince = state.fields.fields.properties.Properties.properties.Location.properties.StateProvinceCode
        // stateProvince.anyOf = 
    }
    console.log("state")
    console.log(state)
    return {
        fields: state.fields,
        schema,
        formdata: state.formData
    }
}

export default connect(mapStateToProps, { getCountries, getFields, submitForm })(TruliooForm)