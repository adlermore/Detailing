export const logger = ({method, url, body, additionalHeaders}) => {
    const isFile = body instanceof FormData;

    if (!method) {
        throw Error("Please specify method for this api call");
    }

    if (!url) {
        throw Error("Please specify url for this api call");
    }

    const config = {
        method,
        cache: "no-cache",
        headers: {
            ...(method !== "GET" && !isFile &&  {"Content-Type": "application/json"}),
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
            ...(additionalHeaders ? additionalHeaders : {}),
        },
        body: isFile ? body: JSON.stringify(body)
    };

    return new Promise(async (resolve, reject) => {

        try {
            const response = await fetch(url, config);

            if (response.ok) {
                const result = await response.json();
                resolve(result);

            } else {
                const result = await response.json();
                reject({result, status: response.status});
            }
        } catch (error) {
            resolve(error);
        }
    });
};