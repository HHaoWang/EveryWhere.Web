import axios from 'axios'
import store from '../../src/store/index'
import router from "@/router";

export let baseUrl = window.location.hostname //'118.190.97.125:8080'
export let wsPort = 8080
export let basePort = window.location.port
let baseURL = 'https://'+baseUrl
if (process.env.NODE_ENV === 'development')
 baseURL = ""

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
        if (res.status === 401) {
            store.commit('setToken',null);
            router.replace({
                path:'/login'
            })
            return;
        }
        return res.data;
    },error => {
        console.log('request ');
    })

    query.interceptors.request.use(config => {
        config.headers.Authorization = 'bearer ' + store.state.token
        return config
    })

    return query(config);
}