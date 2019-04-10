import axios from 'axios';

it('makes requests to backend', () => {
    return expect(requestCountries()).resolves.toBeTruthy()
})

const requestCountries = () => {
    return new Promise((resolve, reject) => {
        const BASE_URL = "http://localhost:3111"
        const URL = `${BASE_URL}/api/countryCodes`
        axios.get(URL)
        .then((response) => {
            resolve(response)
        })
        .catch((error) => {
            reject(error)
        });
    })
}
