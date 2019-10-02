# trulioo-react  &middot; [![GitHub license](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](https://github.com/Trulioo/trulioo-react/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/trulioo-react.svg?style=flat-square)](https://www.npmjs.com/package/trulioo-react) [![npm downloads](https://img.shields.io/npm/dy/trulioo-react.svg?style=flat-square)](https://www.npmjs.com/package/trulioo-react) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/Trulioo/trulioo-react/pulls)

## Install

`npm install trulioo-react`

## Description

⚡**Trulioo EmbedID**⚡ provides identity verification utilizing Trulioo.  For demonstration purposes Trulioo provides the **[trulioo-react-sample-app](https://github.com/Trulioo/trulioo-react-sample-app)** (sample code of a lightweight Node.js proxy server). Get your API key from [gateway-admin.trulioo.com](https://gateway-admin.trulioo.com).

## Use

```
import EmbedID from 'trulioo-react/EmbedID'

const handleResponse = (e) => {
    // handle verification submission result here ...
}

<EmbedID url='TRULIOO_PROXY_SERVER_URL' handleResponse={handleResponse} />
```

## Customize your fields

### Example of custom fields on base level:

```
const simpleExample = {
  field1: {
    title: 'What is your name?',
    type: 'string',
  },
  field2: {
    title: 'What is your age?',
    type: 'number',
  },
  field3: {
    title: 'What is your favourite color?',
    type: 'string',
    enum: ['red', 'yellow', 'blue'],
  },
};
```

### Example of custom fields section with **required** fields:

```
const sectionExample = {
  CustomFieldObj: {
    title: 'Custom Fields',
    type: 'object',
    required: ['name', 'age'],
    properties: {
      name: {
        title: 'What is your name?',
        type: 'string',
      },
      age: {
        title: 'What is your age?',
        type: 'number',
      },
      color: {
        title: 'What is your favourite color?',
        type: 'string',
        enum: ['red', 'yellow', 'blue'],
      },
    },
  },
};
```
Render `<EmbedID/>` :
```
render(
  <EmbedID
    url="http://localhost:3111"
    handleResponse={handleResponse}
    customFields={sectionExample}
    handleSubmit={handleSubmit}
  />,
  document.getElementById('root'),
);
```

## Add Bootstrap CSS for better looks 💇🏼

`<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">`

# Best Practice

Trulioo EmbedID passes user input data to your server. When developing systems that consume internet exposed fields for the purpose of data collection, ensure you take all necessary precautions to protect your system from from denial of service attacks, exploits or security vulnerabilities. Please refer to the [Legal disclaimer](https://developer.trulioo.com/docs/legal) on the Trulioo Developer Portal.

## Learn More <a href="https://twitter.com/intent/follow?screen_name=trulioo"><img align="right" src="https://img.shields.io/twitter/follow/trulioo.svg?style=social&label=Follow%20@trulioo" alt="Follow on Twitter"></a>

Trulioo is a global identity verification company that provides secure access to reliable and independent data sources to instantly verify individuals and business entities online. Hundreds of organizations across the world use GlobalGateway, Trulioo’s RESTful API used to verify five billion people and 250 million businesses across 195 countries. In addition to helping organizations meet compliance requirements, GlobalGateway also streamlines the customer onboarding process, mitigates risk, and performs the first layer of defense against fraud. Learn more about [Trulioo](https://www.trulioo.com/).

## License

Apache 2
