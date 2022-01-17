import Vue from 'vue'
import App from './App.vue'

export const EventBus = new Vue();

import VueRouter from 'vue-router'
import routers from './routes'

import "@frontend/css/font-awesome.min.css"
import "@frontend/css/bootstrap.min.css"
import "@frontend/css/custom.css"
import "@frontend/css/admin.css"
import VueClipboard from 'vue-clipboard2'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import axios from 'axios'
import VueAxios from 'vue-axios'

import store from './store/store'

Vue.use(VueClipboard)
Vue.use(VueLoading)
Vue.use(Toast, {});
Vue.use(require('vue-moment'));
Vue.use(VueRouter);
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

const router = new VueRouter({
    mode: 'history',
    routes: routers,
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
