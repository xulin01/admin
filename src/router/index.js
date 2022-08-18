import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'login',
    component:()=> import ('@/components/Login.vue')
  },
  {
    path:'/tic', 
    name:'tic',
    redirect:'/tic/con',
    component:()=> import ('@/components/Tick/Tickets.vue'),
    children:[
      { //项目首页
        path:'con',
        name:'con',
        component:()=> import ('@/views/manage/conServaTor.vue')
      },
      {//项目详情
        path:'det1',
        name:'det1',
        component:()=> import ('@/views/nav_btns/detAils.vue')
      },
      {//全部工单
        path:'wrok',
        name:'wrok',
        component:()=> import ('@/views/manage/WorkOrder.vue')
      },
       {//上线项目
        path:'wan',
        name:'wan',
        component:()=> import ('@/views/nav_btns/Wan.vue')
      },
        {//工单广场
          path:'square',
          name:'square',
          component:()=> import ('@/views/nav_btns/Square.vue')
        },
        {//售后
          path:'sales',
          name:'sales',
          component:()=> import ('@/views/nav_btns/Sales.vue')
        },
        {//客户管理
          path:'admin',
          name:'admin',
          component:()=> import ('@/views/nav_btns/admin.vue')
        },
          {//任务管理
            path:'renwu',
            name:'renwu',
            component:()=> import ('@/views/nav_btns/renwu.vue')
          },
          {//账号
              path:'chakan',
              name:'chakan',
              component:()=> import ('@/views/nav_btns/chakan.vue')
          },
           {//文件管理
            path:'mas',
            name:'mas',
            component:()=> import ('@/views/nav_btns/mas.vue')
          },
         
    ] 
  },
  {
    path:'/fan',
    name:'fan',
    redirect:'/fan/con3',
    component:()=> import ('@/components/Tick/fan.vue'),
    children:[
      { //项目首页
        path:'con3',
        name:'con3',
        component:()=> import ('@/views/technology/techNician.vue')
      },
      {//项目详情
        path:'det',
        name:'det',
        component:()=> import ('@/views/nav_btns/detAils.vue')
      },
      {//全部工单
        path:'wrok3',
        name:'wrok3',
        component:()=> import ('@/views/technology/WorkOrder.vue')
      },
       {//上线项目
        path:'wan3',
        name:'wan3',
        component:()=> import ('@/views/nav_btns/Wan.vue')
      },
        {//工单广场
          path:'square3',
          name:'square3',
          component:()=> import ('@/views/nav_btns/Square.vue')
        },
        {//售后
          path:'sales3',
          name:'sales3',
          component:()=> import ('@/views/nav_btns/Sales.vue')
        },
          {//任务管理
            path:'jk2',
            name:'jk2',
            component:()=> import ('@/views/nav_btns/jk.vue')
          },
           {//文件管理
            path:'mas3',
            name:'mas3',
            component:()=> import ('@/views/nav_btns/mas.vue')
          },
         
    ]
  },
  {
    path:'/dong',
    name:'dong',
    redirect:'/dong/listDate',
    component:()=> import ('@/components/Tick/dong.vue'),
    children:[
      { //项目首页
        path:'listDate',
        name:'listData',
        component:()=> import ('@/views/service/service.vue')
      },
      {//项目详情
        path:'det2',
        name:'det2',
        component:()=> import ('@/views/nav_btns/detAils.vue')
      },
      {//全部工单
        path:'wrok2',
        name:'wrok2',
        component:()=> import ('@/views/service/WorkOrder.vue')
      },
       {//上线项目
        path:'wan2',
        name:'wan2',
        component:()=> import ('@/views/nav_btns/Wan.vue')
      },
        {//工单广场
          path:'square2',
          name:'square2',
          component:()=> import ('@/views/nav_btns/Square.vue')
        },
        {//售后
          path:'sales2',
          name:'sales2',
          component:()=> import ('@/views/nav_btns/Sales.vue')
        },
        {//客户管理
          path:'admin2',
          name:'admin2',
          component:()=> import ('@/views/nav_btns/admin.vue')
        },
          {//任务管理
            path:'jk',
            name:'jk',
            component:()=> import ('@/views/nav_btns/jk.vue')
          },
            {//文件管理
              path:'mas2',
              name:'mas2',
              component:()=> import ('@/views/nav_btns/mas.vue')
            },
            
            
    ]
  },
]



const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {

    if (to.path === '/')
    { next()
      sessionStorage.clear()
    }
    const tk = sessionStorage.getItem('token')
    
    if (!tk && to.path !== '/') {
     next('/')
     alert('请登录')
   }else{
    next()
   }
    
   })



export default router
