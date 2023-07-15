import authMiddleware from 'src/middlewares/authMiddleware'
import guestMiddleware from 'src/middlewares/guestMiddleware'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: guestMiddleware,
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/DashboardLayout.vue'),
    beforeEnter: authMiddleware,
    meta:{
      requiresAuth: true,
    },
    children: [
      { path: '', component: () => import('pages/DashboardPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
