import Vue from 'vue'
import App from './App'
import router from './router'
import DCUI from './packages';
import './assets/font-awesome/css/font-awesome.min.css';
import './styles/base.scss';

Vue.config.productionTip = false
Vue.use(DCUI);

new Vue({
  el: '#app',
  router,
  components: { App },
  render: h => h(App)
})
