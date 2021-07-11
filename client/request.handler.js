import http from "http";

export class RequestHandler {

    #defaultOptions = {
        hostname: 'localhost',
        port: 3000,
    }

    makeGetRequest(path) {
        const options = {
            ...this.#defaultOptions,
            path,
            method: 'GET'
        };

        return this.makeHttpRequest(options);
    }


    makePostRequest(path, data) {
        const options = {
            ...this.#defaultOptions,
            path,
            method: 'POST'
        };


        const postBody = new TextEncoder().encode(
            JSON.stringify(data)
        )

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
                console.error("While making request, " + path);
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