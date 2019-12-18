// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from '@/api/api'
import './../static/css/style.less'
import { InfiniteScroll  } from 'mint-ui';
Vue.use(InfiniteScroll);
Vue.config.productionTip = false;
Vue.prototype.$api = api;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
