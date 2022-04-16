import axios from 'axios'
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
        if (res.data.code === 401 || res.data.code === 20004) {

        }
        return res.data;
    },error => {
    })

    query.interceptors.request.use(config => {

        return config
    })

    return query(config);
}