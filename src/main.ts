import Vue from 'vue';
// @ts-ignore
import App from '@/App.vue';
import router from './router';
import './plugins/vant.js';
import 'normalize.css'
import '@/styles/index.scss'
import VueJsonp from 'vue-jsonp'

import VueClipboard from 'vue-clipboard2'

VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
Vue.use(VueJsonp)

Vue.config.productionTip = false;

Vue.prototype.$bus = new Vue();

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
