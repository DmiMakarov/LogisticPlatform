import 'bootstrap/dist/css/bootstrap.css';
import { createApp } from "vue";
import axios from 'axios';
import ymapPlugin from 'vue-yandex-maps'

import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5000/';  // the FastAPI backend

//after understand how to update exired token

//axios.interceptors.response.use(undefined, function (error) {
//  if (error) {
//    const originalRequest = error.config;
//    if (error.response === undefined){
//      throw error;
//    }
//    if (error.response.status === 401 && !originalRequest._retry) {
//      originalRequest._retry = true;
//      store.dispatch('logOut');
//      return router.push('/login');
//    }
//  }
//});
const settings = {
    apiKey: '3ffd1556-b895-41e3-9ebc-ce6eb384f079',
    lang: 'ru_RU',
    coordorder: 'latlong',
    enterprise: false,
    version: '2.1'
}


app.use(router);
app.use(store);
app.use(ymapPlugin,settings);
app.mount("#app");
