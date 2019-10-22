import Vue from 'vue'
import Router from 'vue-router'
import machineList from '@/components/machineList'
import admin from '@/components/admin'
import main from '@/main.vue'
import login from '@/login'
import { appendFile } from 'fs'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main,
      redirect: '/login',
      children: [
        {
          path: '/login',
          name: 'login',
          component: login,
        },
        {
          path: '/machineList',
          name: 'machineList',
          component: machineList,
          meta: {
            auth: true,
          }
        },
        {
          path: '/admin',
          name: 'admin',
          component: admin,
        }
      ]
    },

  ]
})
