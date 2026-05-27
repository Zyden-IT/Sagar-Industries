import { IsQueryParamsEncryption } from "@/utils/AppSetting";
import { decryptAES, decryptionAPI, encryptAES } from "@/utils/Encryption";
import Router from "next/router";

export const Navigate = (routePath, params = []) => {
    if (routePath) {
        if (params.length > 0) {
            let queryParams = "";
            if (IsQueryParamsEncryption && routePath.isEncryptParams) {
                params.forEach((element) => {
                    queryParams = queryParams + "/" + encryptAES(element, 0);
                });
            } else {
                params.forEach((element) => {
                    (queryParams = queryParams + "/" + element), 0;
                });
            }
            Router.push(routePath.rawPath, routePath.urlPath + queryParams);
        } else {
            Router.push(routePath.rawPath, routePath.urlPath);
        }
    } else {
    }
};

export const NavigateWithData = (routePath, data, params = []) => {
    if (routePath) {
        if (params.length > 0) {
            let queryParams = "";
            if (IsQueryParamsEncryption && routePath.isEncryptParams) {
                params.forEach((element) => {
                    queryParams = queryParams + "/" + encryptAES(element, 0);
                });
            } else {
                params.forEach((element) => {
                    (queryParams = queryParams + "/" + element), 0;
                });
            }
            if (data) {
                if (data) {
                    Object.keys(data).forEach((key) => {
                        data[key] = encryptAES(data[key], false);
                    });
                }
                Router.push({
                    pathname: routePath.urlPath + queryParams,
                    query: data,
                });
            } else {
                Router.push(routePath.rawPath, routePath.urlPath + queryParams);
            }
        } else {
            if (data) {
                Router.push({
                    pathname: routePath.urlPath,
                    query: data,
                });
            } else {
                Router.push(routePath.rawPath, routePath.urlPath);
            }
        }
    } else {
        //TODO: Redirect to page not found
    }
};

//Common navigation method
export const NavigateBack = () => {
    Router.back();
};

export const GetRouteParams = (
    isEncryptedParams = false,
    isAPIEncrypted = false
) => {
    if (isEncryptedParams && IsQueryParamsEncryption) {
        let params = { ...Router.query };

        if (params) {
            if (!params.isRenewal && isAPIEncrypted === true) {
                Object.keys(params).forEach((key) => {
                    let req = {
                        isEnType: true,
                        responseData: atob(params[key]),
                        responseType: 1,
                    };
                    params[key] = decryptionAPI(req);
                });
            } else {
                Object.keys(params).forEach((key) => {
                    params[key] = decryptAES(params[key], false);
                });
            }
        }
        return params;
    } else {
        return Router.query;
    }
};