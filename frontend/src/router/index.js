import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/pages/Home.vue')
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/pages/About.vue')
      },
      {
        path: '/materials',
        name: 'Materials',
        component: () => import('@/pages/Materials.vue')
      },
      {
        path: '/materials/:id',
        name: 'MaterialDetail',
        component: () => import('@/pages/MaterialDetail.vue')
      },
      {
        path: '/class/:classId',
        name: 'ClassMaterials',
        component: () => import('@/pages/ClassMaterials.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: () => import('@/pages/admin/Dashboard.vue')
      },
      {
        path: 'materials',
        name: 'AdminMaterials',
        component: () => import('@/pages/admin/Materials.vue')
      },
      {
        path: 'upload',
        name: 'AdminUpload',
        component: () => import('@/pages/admin/Upload.vue')
      },
      {
        path: 'classes',
        name: 'AdminClasses',
        component: () => import('@/pages/admin/Classes.vue')
      },
      {
        path: 'subjects',
        name: 'AdminSubjects',
        component: () => import('@/pages/admin/Subjects.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
