import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/login',
  //   children: [{
  //     path: 'login',
  //     name: '登录',
  //     component: () => import('@/views/login/index'),
  //     meta: { title: '登录', icon: 'el-icon-s-home' }
  //   }]
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '数据概况',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '数据概况', icon: 'el-icon-s-home' }
    }]
  },
  /* {
    path: '/game_manage',
    component: Layout,
    redirect: '/game_manage/form',
    name: '游戏管理',
    meta: { title: '游戏管理真', icon: 'el-icon-bangzhu' },
    children: [
      {
        path: 'game-lists',
        component: () => import('@/views/game_manage/game-list'),
        name: '游戏列表',
        meta: { title: '游戏列表' }
      },
      {
        path: '/add-game',
        name: '新增游戏',
        component: () => import('@/views/game_manage/feature/add-game.vue'),
        hidden: true
      },
      {
        path: '/edit-game',
        name: '编辑游戏',
        component: () => import('@/views/game_manage/feature/edit_game.vue'),
        hidden: true
      },
      {
        path: '/game-detail',
        name: '游戏详情',
        component: () => import('@/views/game_manage/feature/game_detail.vue'),
        hidden: true
      },
      {
        path: '/add-review',
        name: '插入评论',
        component: () => import('@/views/game_manage/feature/add-review.vue'),
        hidden: true
      },
    ]
  },
  {
    path: '/review_manage',
    component: Layout,
    redirect: '/review_manage/table',
    name: '评论管理',
    meta: { title: '评论管理', icon: 'advertisement' },
    children: [
      {
        path: '/review_manage',
        name: '评论列表',
        component: () => import('@/views/review_manage/index'),
        meta: { title: '评论列表' }
      },
      {
        path: '/reply',
        name: '回复评论',
        component: () => import('@/views/review_manage/feature/add_reply.vue'),
        hidden: true
      }
    ]
  }, */
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
