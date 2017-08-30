// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import EventEmitter from './mixins/event_emitter';
import DCUI from './packages';
import './assets/font-awesome/css/font-awesome.min.css';

Vue.config.productionTip = false
Vue.mixin(EventEmitter);
Vue.use(DCUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App @hello="sayHello"/>',
  components: { App },
  methods: {
    sayHello(msg) {
      console.log(msg)
      setTimeout(_ => {
        this.broadcast('hello', 'parant_event', { a: 2 })
      })
    }
  }
})
