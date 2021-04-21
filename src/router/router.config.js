/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', keepAlive: false }
      },

      {
        path: '/refund',
        name: 'Refund',
        component: () => import('@/views/home/refund'),
        meta: { title: '退费', keepAlive: false }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/home/about'),
        meta: { title: '关于我', keepAlive: false }
      }
    ]
  },

  {
    path: '/h5pay',
    component: () => import('@/views/h5pay/index'),
    meta: {
      title: 'aaaa',
      keepAlive: false
    },
  }
]
