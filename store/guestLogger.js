import { API_URL_GUEST, API_X_KEY } from "@/utils/constants";
import CryptoJS from "crypto-js";

let cachedEncryptedKey = null;
let cachedDataTz = null; 

export const guestLogger = async ({ method, url, body, additionalHeaders }) => {
    const isFile = body instanceof FormData;

    if (!method) {
        throw Error("Please specify method for this API call");
    }

    if (!url) {
        throw Error("Please specify url for this API call");
    }

    if (url.includes('/permit/details')) {
        const searchParams = new URLSearchParams(url.split('?')[1]);
        const userId = searchParams.get('user_id');

        const newEncryptedKey = await fetchAndEncryptKey(userId);
        cachedEncryptedKey = newEncryptedKey;
    }

    let encryptedKey = cachedEncryptedKey;
    if (!cachedEncryptedKey) {
        encryptedKey = await fetchAndEncryptKey();
        cachedEncryptedKey = encryptedKey;
    }

    const config = {
        method,
        cache: "no-cache",
        headers: {
            ...(method !== "GET" && !isFile && { "Content-Type": "application/json" }),
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
            "x-api-key": encryptedKey?.iv || '',
            "x-api": encryptedKey?.ciphertext || '',
            ...(additionalHeaders ? additionalHeaders : {}),
        },
        body: isFile ? body : JSON.stringify(body)
    };

    return new Promise(async (resolve, reject) => {
        try {
            let response = await fetch(url, config);

            if (response.ok) {
                const result = await response.json();
                resolve(result);
            } else {
                const result = await response.json();
                if (response.status === 403) {
                    cachedDataTz = null;
                    const newEncryptedKey = await fetchAndEncryptKey();
                    cachedEncryptedKey = newEncryptedKey;

                    config.headers["x-api-key"] = newEncryptedKey.iv;
                    config.headers["x-api"] = newEncryptedKey.ciphertext;
                    response = await fetch(url, config);

                    if (response.ok) {
                        const retryResult = await response.json();
                        resolve(retryResult);
                    } else {
                        reject({ result, status: response.status });
                    }
                } else {
                    reject({ result, status: response.status });
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};

const fetchAndEncryptKey = async (userId) => {

    // Use cached data.tz if available
    if (!cachedDataTz) {
        const userLocalId = JSON.parse(localStorage.getItem("userId"));
        if (userLocalId || userId) {
            const laravelKeyUrl = `${API_URL_GUEST}/next`;
            try {
                const response = await fetch(laravelKeyUrl);
                if (!response.ok) {
                    throw new Error("Failed to fetch Laravel key");
                }
                const { data } = await response.json();
                cachedDataTz = data.tz; 
            } catch (error) {
                console.error("Error fetching Laravel key:", error);
                throw error;
            }
        }
    }

    // Now use the cached data.tz for encryption
    const dataToEncrypt = `${cachedDataTz}_user_${userId || JSON.parse(localStorage.getItem("userId"))}`;
    
    const laravelKey = API_X_KEY;
    const base64Key = laravelKey.split(":")[1];
    const key = CryptoJS.enc.Base64.parse(base64Key);
    const iv = CryptoJS.lib.WordArray.random(128 / 8);

    const encryptedData = CryptoJS.AES.encrypt(dataToEncrypt, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });

    return {
        ciphertext: encryptedData.toString(),
        iv: iv.toString(),
    };
};