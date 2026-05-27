import Cookies from 'universal-cookie';
import { encryptAES, decryptAES } from "./Encryption";
import { value3, value4 } from "./AppSetting";

const cookies = new Cookies();

export const createCookie = (props) => {
    let cookieValue = props.cookieValue;
    let cookieName = props.cookieName;
    let str = JSON.stringify(cookieValue);
    cookieValue = encryptAES(str, 1);
    const isSecure = typeof window !== 'undefined' && window.location.protocol === 'https:';
    cookies.set(cookieName, cookieValue, { path: props.path || '/', sameSite: 'strict', secure: isSecure });
};

export const setCookie = (props) => {
    let cookieValue = props.cookieValue;
    let cookieName = props.cookieName;
    let str = JSON.stringify(cookieValue);
    cookieValue = encryptAES(str, 1);
    const isSecure = typeof window !== 'undefined' && window.location.protocol === 'https:';
    cookies.set(cookieName, cookieValue, { path: '/', sameSite: 'strict', secure: isSecure });
}

export const setCookieForRequest = (props) => {
    let cookieValue = props.cookieValue;
    let cookieName = props.cookieName;
    let str = JSON.stringify(cookieValue);
    cookieValue = encryptAES(str, 1);
    const isSecure = typeof window !== 'undefined' && window.location.protocol === 'https:';
    cookies.set(cookieName, cookieValue, { path: '/', sameSite: 'strict', secure: isSecure });
    const isCookieExistOrNot = cookies.get(cookieName, { doNotParse: false });
    if (isCookieExistOrNot) {
        return true;
    } else {
        return false;
    }
}

export function getCookie(cookieName, doNotParse = false) {
    const cookieValue = cookies.get(cookieName, { doNotParse: doNotParse });
    if (cookieValue) {
        let decObj = decryptAES(cookieValue, true);
        if (decObj !== 'error 1' && decObj !== 'error 2' && decObj !== 'error 3')
            return JSON.parse(decObj);
        else
            return decObj;
    }
    return undefined;
}

export const getAllCookies = (doNotParse = false) => {
    return cookies.getAll({ doNotParse: doNotParse });
};

export const removeCookie = (cookieName, options = {}) => {
    cookies.remove(cookieName, options);
};

export const removeAllCookies = () => {
    Object.keys(cookies.getAll()).forEach(element => {
        cookies.remove(element, { path: '/' });
    });
};

export const isCookieExist = (cookieName) => {
    const cookieDetail = getCookie(cookieName);
    if (cookieDetail) {
        return true;
    }
    else {
        return false;
    }
}

export const isTokenExist = (cookieName = value4) => {
    let cookieStatus = isCookieExist(cookieName);
    if (cookieStatus) {
        const cookieDetail = getCookie(cookieName);
        let currentDate = new Date().getTime();
        let expire = new Date(cookieDetail.expires).getTime();
        if (cookieDetail && cookieDetail.token && expire > currentDate) {
            return true;
        } else
            return false;
    }
    else {
        return false;
    }
}

export const removeAllCookiesLogOut = () => {
    cookies.remove(value3, { path: '/' });
    cookies.remove(value4, { path: '/' });
    return true;
};
