import { value1, value2 } from './AppSetting';

var CryptoJS = require("crypto-js");

const Key = CryptoJS.enc.Base64.parse(value1);
const IV = CryptoJS.enc.Base64.parse(value2);

export const encryptionAPI = (data, string) => {
    const val1 = value1;
    const val2 = value2;
    if (string === 1)
        data = JSON.stringify(data);

    var encprtArray = CryptoJS.enc.Utf8.parse(data);
    var decryptedText = CryptoJS.AES.encrypt(encprtArray, CryptoJS.enc.Base64.parse(val1),
        {
            iv: CryptoJS.enc.Base64.parse(val2),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    return decryptedText.ciphertext.toString(CryptoJS.enc.based64);
}

function hexStringToBase64String(hex) {
    const byteArray = new Uint8Array(hex.length / 2);

    for (let i = 0; i < hex.length; i += 2) {
        byteArray[i / 2] = parseInt(hex.substr(i, 2), 16);
    }

    // Convert Uint8Array to a string
    let binaryString = "";
    for (let i = 0; i < byteArray.length; i++) {
        binaryString += String.fromCharCode(byteArray[i]);
    }

    // Convert binary string to Base64
    return btoa(binaryString);
}

function aesDecrypt(encryptedData, isDecrypt) {
    if (!isDecrypt) {
        return encryptedData;
    }

    const encryptedBytes = CryptoJS.enc.Base64.parse(encryptedData);

    const decryptedBytes = CryptoJS.AES.decrypt(
        { ciphertext: encryptedBytes },
        Key,
        {
            iv: IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }
    );

    const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedText;
}

export const decryptionAPI = (res) => {
    try {
        if (
            res.data.isEnType !== undefined &&
            res.data.isEnType !== "undefined" &&
            res.data.isEnType !== "null" &&
            res.data.isEnType !== null
        ) {
            if (res.data.isEnType === true) {
                if (res.data.responseData !== undefined && res.data.statusCode !== 500 && res.data.responseData !== null && res.data.responseData !== "undefined" && res.data.responseData !== "null") {
                    const encryptedData = decodeURIComponent(res.data.responseData);

                    const base64Data = hexStringToBase64String(encryptedData);

                    const decryptedData = aesDecrypt(base64Data, res.data.isEnType);

                    res.data.responseData = JSON.parse(decryptedData)

                    return res.data;
                } else {
                    res.data.responseData = []
                    return res.data;
                }
            } else {
                return { ...JSON.parse(res.typeData) };
            }
        } else {
            return res;
        }
    } catch (error) {
        return null;
    }
};

export const decryptionString = (response, responseType) => {
    const val1 = value1;
    const val2 = value2;
    var cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(response)
    });
    var decryptedText = CryptoJS.AES.decrypt(cipherParams, CryptoJS.enc.Base64.parse(val1), {
        iv: CryptoJS.enc.Base64.parse(val2),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    var data = decryptedText.toString(CryptoJS.enc.Utf8)
    if (responseType === true) {
        return { ...JSON.parse(data) };
    }
    else {
        return data.toString();
    }
}

export const encryptionData = (data, string) => {
    if (string === 1)
        data = JSON.stringify(data);

    let encryptedData = btoa(data);
    return encryptedData;
}

export const decryptionData = (res, isObject) => {
    const data = atob(res);

    if (isObject === true) {
        return { ...JSON.parse(data) };
    }
    else {
        return data.toString();
    }
}

export const encryptAES = (text, key) => {
    const val1 = value1;
    if (typeof text === "number") {
        text = text.toString();
    }
    let enctryptedText = CryptoJS.AES.encrypt(text, val1).toString();
    return btoaEnc(enctryptedText);
};

export const decryptAES = (encryptedBase64, key) => {
    const val1 = value1;
    encryptedBase64 = encryptedBase64.toString();
    encryptedBase64 = atobEnc(encryptedBase64);
    const decrypted = CryptoJS.AES.decrypt(encryptedBase64, val1);
    if (decrypted) {
        try {
            const str = decrypted.toString(CryptoJS.enc.Utf8);
            if (str.length > 0) {
                return str;
            } else {
                return 'error 1';
            }
        } catch (e) {
            return 'error 2';
        }
    }
    return 'error 3';
};

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
export const btoaEnc = (input = '') => {
    let str = input;
    let output = '';

    for (let block = 0, charCode, i = 0, map = chars;
        str.charAt(i | 0) || (map = '=', i % 1);
        output += map.charAt(63 & block >> 8 - i % 1 * 8)) {

        charCode = str.charCodeAt(i += 3 / 4);

        if (charCode > 0xFF) {
            throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
        }

        block = block << 8 | charCode;
    }

    return output;
};

export const atobEnc = (input = '') => {
    let str = input.replace(/=+$/, '');
    let output = '';

    if (str.length % 4 == 1) {
        throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (let bc = 0, bs = 0, buffer, i = 0;
        buffer = str.charAt(i++);

        ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
            bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
        buffer = chars.indexOf(buffer);
    }

    return output;
};