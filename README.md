# Trulioo Embed ID (Beta)

## Install

`npm install trulioo-react`

## Use

```
import EmbedID from 'trulioo-react/EmbedID'

const handleResponse = (e) => {
    // handle verification submission result here ...
}

<EmbedID url='PROXY_URL' handleResponse={handleResponse} />
```

## Add Bootstrap CSS for better looks 💇🏼

`<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">`

## Proxy Server

To make requests at Trulioo GlobalGateway and get around [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), it is required that an intermediate server (proxy) in-between is used.

You have the option to develop your own, or simply use [Trulioo-Proxy](https://github.com/Trulioo/trulioo-proxy), a lightweight server implemented in Node 🚀 which reduces boilerplate code.

```
git clone https://github.com/Trulioo/trulioo-proxy.git
node bin/trulioo-proxy
```

Simply edit the `.env` file with your credentials, and you are ready to start verifying!

## Learn More

Learn more about  [Trulioo](https://www.trulioo.com/).

## License

Apache 2
