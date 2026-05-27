import { value3, value4 } from './AppSetting';
import { createCookie, getCookie, isCookieExist, setCookie, setCookieForRequest, removeAllCookiesLogOut } from "./CookieHandler";


const authCookieName = value3;
const tokenCookieName = value4;

export const setAuthProps = (data) => {
    const authProps = {
        cookieName: authCookieName,
        cookieValue: data,
    }
    createCookie(authProps);
    setTokenProps(data.token, tokenCookieName);
}

export const getAuthProps = () => {
    return getCookie(authCookieName);
}

export const isAuthorized = () => {
    return isCookieExist(authCookieName);
}

export const setTokenProps = (data, tokenName) => {
    const tokenProps = {
        cookieName: tokenName,
        cookieValue: data
    }
    setCookie(tokenProps);
}

export const setTokenPropsForRequest = (data, tokenName) => {
    const tokenProps = {
        cookieName: tokenName,
        cookieValue: data
    }
    return setCookieForRequest(tokenProps);
}

export const getTokenProps = (tokenCookie = tokenCookieName) => {
    return getCookie(tokenCookie);
}

export const signOut = async () => {
    try {
        await axiosPostWithencryption(Logout, {});
    } catch (_) {
        // if backend call fails, still log out
    } finally {
        removeAllCookiesLogOut();
        window.location.href = "/";
    }
}

export const InactivityDetector = (timeoutMs) => {
    let timer;
    const reset = () => {
        clearTimeout(timer);
        timer = setTimeout(() => signOut(), timeoutMs);
    };
    ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'].forEach(event =>
        window.addEventListener(event, reset, true)
    );
    reset();
};
