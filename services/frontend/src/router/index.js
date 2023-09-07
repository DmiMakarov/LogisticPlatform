import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue';
import RegisterView from '@/views/RegisterView.vue';
import LoginView from '@/views/LoginView.vue';
import DashboardView from '@/views/DashboardView.vue';
import ProfileView from '@/views/ProfileView.vue';
import NoteView from '@/views/NoteView.vue';
import EditNoteView from '@/views/EditNoteView.vue';
import store from '@/store';


const routes = [
  {
    path: '/',
    name: "Home",
    component: HomeView,
    meta: {requiresNavBar: true}
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    meta: {requiresNavBar: true}
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: {requiresNavBar: true}
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true, requiresNavBar: true },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
    meta: { requiresAuth: true, requiresNavBar: true },
  },
  {
    path: '/note/:id',
    name: 'Note',
    component: NoteView,
    meta: { requiresAuth: true, requiresNavBar: true },
    props: true,
  },
  {
    path: '/editnote/:id',
    name: 'EditNote',
    component: EditNoteView,
    meta: { requiresAuth: true, requiresNavBar: true },
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});

export default router;
