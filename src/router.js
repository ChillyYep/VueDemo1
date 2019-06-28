import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component:Home
    },
    {
      path:'/search',
      meta:{
        loginRequire:true
      },
      component:() => import('./views/search/Search.vue'),
      children:[
        {
          path:'byPosition',
          name:'byPosition',
          component:() => import('./views/search/SearchByPosition.vue'),
        },
        {
          path:'byProject',
          name:'byProject',
          component:() => import('./views/search/SearchByProject.vue'),
        },
        {
          path:'byPerson',
          name:'byPerson',
          component:() => import('./views/search/SearchByPerson.vue')
        },
        {
          path:'byTime',
          name:'byTime',
          component:() => import('./views/search/SearchByTime.vue')
        },
        {
          path:'order',
          name:'order',
          component:() => import('./views/search/Order.vue'),
          props:true
        },
        {
          path:'globalSearch/:keyword',
          component:() => import('./views/search/GlobalSearch.vue'),
          props:true
        },
        {
          path:'byCategory',
          component:()=>import('./views/search/SearchByAll.vue'),
          children:[
            {
              path:':category',
              name:':category',
              component:()=>import('./views/search/DeviceLists.vue'),
              props:true
            },
            {
              path:'',
              redirect:'all',
            }
          ]
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component:() => import('./views/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component:() => import('./views/Login.vue')
    },
    {
      path: '/user',
      name: 'user',
      meta:{
        loginRequire:true
      },
      component:() => import('./views/PersonalCenter/PersonalCenter.vue'),
      children:[
        {
          path:'userInfo',
          name:'userInfo',
          component:() => import('./views/PersonalCenter/UserInfo.vue')
        },
        {
          path:'userOrderManagement',
          name:'userOrderManagement',
          component:() => import('./views/PersonalCenter/UserOrderManagement.vue')        
        },
        {
          path:'messageCenter',
          name:'messageCenter',
          component:() => import('./views/PersonalCenter/MessageCenter.vue')   
        },
        {
          path:'',
          redirect:'userInfo'      
        },      ]
    },
    {
      path:'/management',
      name:'management',
      meta:{
        loginRequire:false
      },
      component:() => import('./views/management/Management.vue'),
      children:[
        {
          path:'userPermission',
          name:'userPermission',
          component:()=>import('./views/management/UserPermission.vue'),
        },
        {
          path:'equipmentInfo',
          name:'equipmentInfo',
          component:()=>import('./views/management/EquipmentInfo.vue'),
        },
        {
          path:'projectInfo',
          name:'projectInfo',
          component:()=>import('./views/management/ProjectInfo.vue'),
        },
        {
          path:'backups',
          name:'backups',
          component:()=>import('./views/management/Backups.vue'),
        },
        {
          path:'logs',
          name:'logs',
          component:()=>import('./views/management/Logs.vue'),
        },
        {
          path:'dataAnalysis',
          name:'dataAnalysis',
          component:()=>import('./views/management/DataAnalysis.vue'),
        },
        {
          path:'answerRequest',
          name:'answerRequest',
          component:()=>import('./views/management/AnswerRequest.vue'),
        },
        {
          path:"",
          redirect:"dataAnalysis"
        }
      ]
    }
  ]
})
