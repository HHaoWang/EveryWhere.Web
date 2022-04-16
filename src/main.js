import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'
import {Axios} from "axios";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  Axios,
  render: h => h(App)
}).$mount('#app')


