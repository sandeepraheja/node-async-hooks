// import http from "http";
const http = require("http")

class RequestHandler {

    #defaultOptions = {
        hostname: 'localhost',
        port: 3000,
    }

    makeGetRequest(path, user, tenant) {
        const options = {
            ...this.#defaultOptions,
            path,
            method: 'GET',
            headers: {
                user,
                tenant
            }
        };

        return this.makeHttpRequest(options);
    }


    makePostRequest(path, method, data, user, tenant) {
        const options = {
            ...this.#defaultOptions,
            path,
            method: method,
            headers: {
                user,
                tenant,
                'Content-Type': 'application/json'
            }
        };


        // const postBody = new TextEncoder().encode(
        //     JSON.stringify(data)
        // )
        const postBody = JSON.stringify(data)

        return this.makeHttpRequest(options, postBody);
    }


    makeHttpRequest(options, postBody) {

        return new Promise((resolve, reject) => {
            const req = http.request(options, res => {
                console.log(`statusCode: ${res.statusCode}`)

                res.on('data', d => {
                    process.stdout.write(d);
                    resolve(d);
                });
            })

            req.on('error', error => {
                console.error("While making request, " + options.path);
                console.error(error);
                reject(error);
            });

            if (postBody) {
                req.write(postBody);
            }

            req.end();
        });
    }


}

module.exports = RequestHandler