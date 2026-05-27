import axios from 'axios';
import { APIURL } from '../services/axios/ApiEndPoints';
import { decryptionAPI } from './Encryption';
import { setCookie } from './CookieHandler';
import { value4 } from './AppSetting';
// axios.defaults.withCredentials = true;
export const axiosInstance = axios.create({
    baseURL: APIURL
})
axiosInstance.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error)
)
const isHandlerEnabled = (config = {}) => {
    return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ?
        false : true
}
// await axiosInstance.get('/v2/api-endpoint', { handlerEnabled: false }) --if we want to exclude any api from using interceptor use this
const requestHandler = (request) => {
    if (isHandlerEnabled(request)) {
    }
    return request
}
axiosInstance.interceptors.request.use(
    request => requestHandler(request)
)
const errorHandler = (error) => {
    if (isHandlerEnabled(error.config)) {
        //error page
    }
    return Promise.reject({ ...error })
}

const successHandler = (response) => {
    const newToken = response.headers?.['x-new-token'];
    if (newToken) {
        setCookie({ cookieName: value4, cookieValue: newToken });
    }
    if (isHandlerEnabled(response.config)) {
        response = decryptionAPI(response.data);
    }
    return response;
}

export const axiosInstanceWithoutEnrypt = axios.create({
    baseURL: APIURL
})
