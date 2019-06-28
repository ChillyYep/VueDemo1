import Vue from 'vue'
// import './plugins/axios'
import App from './App.vue'
import router from './router'
// import store from './store'
import axios from 'axios';
import VueAxios from 'vue-axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch,faWindowClose,faRetweet,faFilter,faPlus,faBars,faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import JsonExcel from 'vue-json-excel'

library.add(faSearch,faWindowClose,faRetweet,faFilter,faPlus,faBars,faTimes);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('download-excel',JsonExcel);

Vue.use(VueAxios,axios);
Vue.config.productionTip = false;
// Vue.prototype.$ajax=axios;
axios.interceptors.request.use(config=>{
  console.log(config);
  return config;
})
axios.interceptors.response.use(response=>{
  console.log(response);
  return response;
})
var store={
  state:{
    loginState:true
  }
}
new Vue({
  router,
  data:{
    state:store.state
  },
  mounted(){
    if(sessionStorage.getItem("isLogin")=="true")
      this.state.loginState=true;
      console.log('mounted')
    //添加用户信息
  },
  methods: {
    getIdentity(){
      let uIdentity=sessionStorage.getItem("uIdentity");
      return uIdentity===null?"user":uIdentity;
    },
    getUId(){
        let uId=sessionStorage.getItem("uId");
        return uId===null?"233":uId;
    },
  },
  // store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if(to.matched.some(record=>record.meta.loginRequire)){
    if(!store.state.loginState){
      next({name:"login"});
    }else{
      next();
    }
  }
  else{
    next();
  }
  console.log('beforeEach')
})