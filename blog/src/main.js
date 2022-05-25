import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import axios from "axios"
import 'element-ui/lib/theme-chalk/index.css'
import "@/assets/scss/reset.scss"
import "@/assets/font/iconfont.css"
import "@/assets/scss/common.scss"
import mavonEditor from 'mavon-editor'
import "mavon-editor/dist/css/index.css"
import setAxios from './setAxios'
import Cookie from 'js-cookie';

setAxios()
Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.use(mavonEditor)
Vue.config.productionTip = false;

router.beforeEach((to,from,next)=>{
  store.commit('setToken',Cookie.get('token'))
  if(store.state.token){
    store.commit('changIsSignIn',1)
    next()
  }
  if(to.meta.requireAuth){
    if(store.state.token){
      next()
    }else{
      next({path:'/login'})
    }
  }else{
    next()
  }  
  
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
