// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './style/base.styl'
import './utils/fontSize'
import './style/font/iconfont.css'
import http from './http'
import store from './store'
import { Button } from "vant";
import { Toast } from 'vant';
Vue.use(Button);
Vue.use(Toast);
Vue.prototype.$http = http
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
