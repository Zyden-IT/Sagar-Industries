import { IsEncryption } from "../../utils/AppSetting.js";
import { getAuthProps } from "../../utils/AuthenticationLibrary.js";
import { axiosInstance, axiosInstanceWithoutEnrypt } from "../../utils/AxiosInterceptor.js";
import { isTokenExist } from "../../utils/CookieHandler.js";
import { encryptionAPI } from "../../utils/Encryption.js";
import { APIURL } from "./ApiEndPoints.js";


// common get request with encryption and one parameter
export function axiosGet(url, param) {
    return axiosInstance.get(APIURL + url.replace("{0}", (IsEncryption) ? encryptionAPI(param, 0) : param));
}

export function axiosGetWithencryptionWithoutToken(url, param) {
    return axiosInstance.get(APIURL + url.replace("{0}", (IsEncryption) ? param : param));
}

// common post request with encryption
export function axiosPost(url, request) {
    var data = { data: (IsEncryption) ? encryptionAPI(request, 1) : request };
    return axiosInstance.post(APIURL + url, data);
}

export function axiosGetMultiParams(url, params) {
    let loginUser = getAuthProps();
    if (loginUser) {
        // if (isTokenExist()) {
        let headers = {
            Authorization: `Bearer ${loginUser.token}`,
        };

        params.forEach((value, key) => {
            url = url.replace("{" + key + "}", (IsEncryption) ? encryptionAPI(value, 0) : value)
        });
        return axiosInstance.get(APIURL + url, { headers });
        // }
    }
}

export function axiosGetWithencryption(url, param) {
    // return axiosInstance.get(APIURL + url.replace("{0}", (IsEncryption) ? encryptionAPI(param, 0) : param));

    let loginUser = getAuthProps();
    if (loginUser) {
        // if (isTokenExist()) {
        let headers = {
            // Authorization: `Bearer ${loginUser.token}`,
            Authorization: `Bearer ${loginUser.token}`,
        };
        return axiosInstance.get(APIURL + url.replace("{0}", (IsEncryption) ? encryptionAPI(param, 0) : param), { headers });
        // } else {
        //     window.location.href = "/";
        // }
    }
    else {
        window.location.href = "/";
    }

}

export function axiosPostWithencryption(url, request, isFormData) {
    let loginUser = getAuthProps();
    if (loginUser) {
        // if (isTokenExist()) {
        var data = { data: (IsEncryption) ? encryptionAPI(request, 1) : request };
        if (isFormData) {
            let headers = {
                Authorization: `Bearer ${loginUser.token}`,
                'content-type': 'multipart/form-data',
            };

            return axiosInstance.post(APIURL + url, request, { headers });

        }
        let headers = {
            Authorization: `Bearer ${loginUser.token}`,
        };

        return axiosInstance.post(APIURL + url, data, { headers });
        // } else {
        //     window.location.href = "/";
        // }

    }
    else {
        window.location.href = "/";
    }
}

// common post request with encryption
export function axiosPostWithoutEncryption(url, request, isFormData) {
    if (isFormData) {
        let headers = {
            // Authorization: `Bearer ${loginUser.token.token}`,
            'content-type': 'multipart/form-data',
        };

        return axiosInstance.post(APIURL + url, request, { headers });

    }
    return axiosInstance.post(APIURL + url, request);
}

export function axiosPostFileAuthorizeblob(url, request, isFormData) {
    let loginUser = getAuthProps();
    if (loginUser) {
        // if (isTokenExits()) {
        var data = { data: (IsEncryption) ? encryptionAPI(request, 1) : request };
        // let tokenProp = getTokenProps();
        // let abc = 'Bearer ' + tokenProp.data;
        let headers = { Authorization: `Bearer ${loginUser.token}` };

        return axiosInstanceWithoutEnrypt.post(APIURL + url, data, { headers, responseType: 'blob' });
        // } else {
        //     window.location.href = "/";
        // }
    } else {
        window.location.href = "/";
    }
}
export function axiosGetFileAuthorizeblob(url, params) {
    let loginUser = getAuthProps();
    if (loginUser) {
        params.forEach((value, key) => {
            url = url.replace("{" + key + "}", (IsEncryption) ? encryptionAPI(value, 0) : value)
        });
        let headers = { Authorization: `Bearer ${loginUser.token}` };
        return axiosInstanceWithoutEnrypt.get(APIURL + url, { headers, responseType: 'blob' });
    }
    else {
        window.location.href = "/";
    }

}