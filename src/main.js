import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueGtag from 'vue-gtag'

import VueMq from 'vue-mq'
 
Vue.use(VueMq, {
  breakpoints: { // default breakpoints - customize this
    sp: 600,
    pc: 601,
  },
  defaultBreakpoint: 'sp' // customize this for SSR
})

Vue.use(VueGtag, {
  config: {id: "UA-212014227-1"}
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
