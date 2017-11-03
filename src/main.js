import Vue from 'vue'
import App from './App'
import router from './router'
import FreshUI from './packages';
import './packages/sass/index.scss';

Vue.config.productionTip = false
Vue.use(FreshUI);

new Vue({
    el: '#app',
    router,
    components: { App },
    render: h => h(App)
})