import Vue from 'vue'
import Router from 'vue-router'
import machineList from '@/components/machineList'
import admin from '@/components/admin'
import tree1 from '@/components/tree1'
import ztree from '@/components/ztree'
import charts from '@/components/charts'
import companyList from '@/components/companyList'
import resource  from '@/components/resource'
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
        },
        {
          path: '/charts',
          name: '/charts',
          component: charts,
        },
        {
          path: '/companyList',
          name: '/companyList',
          component: companyList,
        },
        {
          path: '/tree1',
          name: '/tree1',
          component: tree1,
        },{
          path: '/ztree',
          name: '/ztree',
          component: ztree,
        },{
          path: '/resource',
          name: '/resource',
          component: resource
        }
      ]
    },

  ]
})
