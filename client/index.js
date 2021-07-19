const RequestHandler = require('./request.handler')

const requestHandler = new RequestHandler()

const promises = []

function makeGetRequest(path, user,tenant) {
    return requestHandler.makeGetRequest(path, user, tenant)
}

function makePostRequest(i, user, tenant) {
    return requestHandler.makePostRequest('/api/v1/products', 'POST', {
        "name":    `Product ${i}${i}`,
        "category": "E",
        "description": "some default description about the product",
        "price": 23
    }, user, tenant)
}

function makePutRequest(i, user, tenant) {
    return requestHandler.makePostRequest('/api/v1/products', 'PUT', {
        "name":    `Product ${i}${i}`,
        "category": "E",
        "description": "some default description about the product",
        "price": 23
    }, user, tenant)
}

for (let i = 0; i < 10; i++) {
    promises.push(makeGetRequest('/api/v1/products', `user_${i}`, `tenant_${i}`))
    // promises.push(makePostRequest(i, `user_${i}`, `tenant_${i}`))
    promises.push(makeGetRequest(`/api/v1/products/${i}`, `user_${9 - i}`, `tenant_${9 - i}`))
}

 

Promise.all([...promises])
.then(resp => console.log(resp))
.catch((err) => console.error(err))