// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueI18n from './common/i18n/i18n.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import api from './api'

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueI18n)
Vue.use(VueAxios, axios)
Vue.use(api)



router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(from);

  if(to.meta.auth) {
      if(localStorage.getItem('user')) {
          next();
      } else {
          next({
              path: '/login',
        })
      }
  } else {
      next();
  }

})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n: VueI18n,
  router,
  components: { App },
  template: '<App/>'
})
