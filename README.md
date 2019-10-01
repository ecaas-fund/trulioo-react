# trulioo-react  &middot; [![GitHub license](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](https://github.com/Trulioo/trulioo-react/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/trulioo-react.svg?style=flat-square)](https://www.npmjs.com/package/trulioo-react) [![npm downloads](https://img.shields.io/npm/dy/trulioo-react.svg?style=flat-square)](https://www.npmjs.com/package/trulioo-react) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/Trulioo/trulioo-react/pulls)

## Install

`npm install trulioo-react`

## Description

⚡**Trulioo EmbedID**⚡ leverages the GlobalGateway RestFul API, this API can not be invoked directly through web browser, therefore an intermediary (proxy) hosted on your web server is required to complete the request. For demonstration purposes Trulioo provides the **[trulioo-react-sample-app](https://github.com/Trulioo/trulioo-react-sample-app)** (sample code of a lightweight Node.js proxy server). Trulioo recommends developing your own intermediary (proxy) for production purposes.

## Use

```
import EmbedID from 'trulioo-react/EmbedID'

const handleResponse = (e) => {
    // handle verification submission result here ...
}

<EmbedID url='TRULIOO_PROXY_SERVER_URL' handleResponse={handleResponse} />
```

## Add Bootstrap CSS for better looks 💇🏼

`<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">`

# Quickstart

You have the option to develop your own, or simply use [trulioo-quickstart project](https://github.com/Trulioo/trulioo-react-sample-app), an easy to follow guide to boostrap your server 🚀.

# Best Practice

Trulioo EmbedID passes user input data to the "proxy" on your server. When developing systems that consume internet exposed fields for the purpose of data collection, ensure you take all necessary precautions to protect your system from from denial of service attacks, exploits or security vulnerabilities. Please refer to the [Legal disclaimer](https://developer.trulioo.com/docs/legal) on the Trulioo Developer Portal.

## Learn More <a href="https://twitter.com/intent/follow?screen_name=trulioo"><img align="right" src="https://img.shields.io/twitter/follow/trulioo.svg?style=social&label=Follow%20@trulioo" alt="Follow on Twitter"></a>

Trulioo is a global identity verification company that provides secure access to reliable and independent data sources to instantly verify individuals and business entities online. Hundreds of organizations across the world use GlobalGateway, Trulioo’s RESTful API used to verify five billion people and 250 million businesses across 195 countries. In addition to helping organizations meet compliance requirements, GlobalGateway also streamlines the customer onboarding process, mitigates risk, and performs the first layer of defense against fraud. Learn more about [Trulioo](https://www.trulioo.com/).

## License

Apache 2
