import axios from 'axios';

it('can make requests to backend', async () => {
    const BASE_URL = "http://localhost:3111"
    const URL = `${BASE_URL}/api/countryCodes`
    const promise = await axios.get(URL)
    expect(promise).toBeDefined()
});
