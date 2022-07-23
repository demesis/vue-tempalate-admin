import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// Element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 样式初始化
import './assets/css/normalize.css';
Vue.use(ElementUI);
// mock
require('./mock/mock')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
