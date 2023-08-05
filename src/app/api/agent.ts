import axios, { AxiosResponse } from 'axios';
import { TranslateFormValues } from '../models/translate';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Translate = {
    translateText: (translate: TranslateFormValues, from?: string, to?: string) => requests.post<any>(`translate/to=${to}&from=${from}`, translate)
}
const agent = {
    Translate
}
export default agent;