import Vue from 'vue'
import App from './App'
import router from './router'
import Vuelazyload from 'vue-lazyload'
Vue.use(Vuelazyload,{
  preload:1,
  loading:require("./assets/loading.png")
})
//引入Vuex模块
import Vuex from "vuex"
//注册Vuex
Vue.use(Vuex);
//引入第三方组件库vant
import Vant from 'vant';
import 'vant/lib/index.css';
//vant注册
Vue.use(Vant);
//引入axios模块
import axios from "axios"
import qs from "qs"
import md5 from "js-md5"
Vue.prototype.$md5 = md5;
//配置服务器基础了路径
axios.defaults.baseURL="/api/";
Vue.prototype.utilUrl = "/api/";
//配置保存session信息
axios.defaults.withCredentials=true;
//axios注册
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
Vue.config.productionTip = false;
/* eslint-disable no-new */

var store = new Vuex.Store({
  //共享数据
  state:{
    place:'西安市'
  },
  // 获取共享数据
  getters:{
    getCity(state){
      return state.place;
    }
  },
  // 修改共享数据
  mutations:{
    modify(state,cname){
      state.place = cname;
    }
  }
})
new Vue({
  el: '#app',
  //把store对象提供给“store”选项，这可以吧store的实例注入所有子组件
  store,
  router,
  components: { App },
  template: '<App/>'
})
