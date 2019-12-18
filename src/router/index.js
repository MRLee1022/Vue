import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/home/index'
import list from '@/views/list/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },{
      path: '/list',
      name: 'list',
      component: list	
    }
  ]
})
