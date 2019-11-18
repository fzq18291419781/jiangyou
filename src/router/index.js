import Vue from 'vue'
import Router from 'vue-router'
import index from "../components/index.vue"
import History from "../components/History.vue"

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'index',component: index},
    {path:'/index',component:index},
    {path:'/History',component:History},
    {path:'/Product/:id',component: resolve => require(['../components/Product.vue'], resolve),props:true},
    {path:'/Product_detail/:Jid',component: resolve => require(['../components/Product_detail.vue'], resolve),props:true},
    {path:'/Free',component: resolve => require(['../components/free.vue'], resolve)},
    {path:'/collection',component: resolve => require(['../components/collection.vue'], resolve)},
    {path:'/History',component: resolve => require(['../components/History.vue'], resolve)},
    {path:'/login',component: resolve => require(['../components/login.vue'], resolve)},
    {path:'/register',component: resolve => require(['../components/register.vue'], resolve)},
    {path:'/comment/:Jid',component: resolve => require(['../components/comment.vue'], resolve),props:true},
    {path:'/position',component: resolve => require(['../components/position.vue'], resolve)},
    {path:'/self',component: resolve => require(['../components/self.vue'], resolve)},
  ]
})
