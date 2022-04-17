import axios from 'axios'
import store from '../../src/store/index'
export let baseUrl = window.location.hostname //'118.190.97.125:8080'
export let wsPort = 8080
export let basePort = window.location.port
let baseURL = '/api'

export function request(config) {
    axios.defaults.withCredentials = true;

    const query = axios.create({
        baseURL
    });

    query.interceptors.response.use(res => {
        return res.data;
    },error => {

    })

    return query(config);
}

export function userRequest(config) {
    axios.defaults.withCredentials=true;
    const query = axios.create({
        baseURL,
    });

    query.interceptors.response.use(res => {
        if (res.data != null) {

        }
        return res.data;
    },error => {
    })

    query.interceptors.request.use(config => {
        config.headers.Authorization = 'bearer ' + localStorage.getItem('token')
        return config
    })

    return query(config);
}