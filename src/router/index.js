import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/profile",
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: "/projects",
    name: 'Projects',
    component: () => import('../views/Projects.vue')
  },
  {
    path: "/experience",
    name: 'Experience',
    component: () => import('../views/Experience.vue')
  },
  {
    path: "/awards",
    name: 'Awards',
    component: () => import('../views/Awards.vue')
  },
  {
    path: "/contacts",
    name: 'Contacts',
    component: () => import('../views/Contact.vue')
  },
  {
    path: "/reaction-timer",
    name: 'Reaction Timer',
    component: () => import('../views/ReactionTimer.vue')
  },
  {
    path: '/file-reader',
    name: 'File Reader',
    component: () => import('../views/ReadFile.vue')
  },
  {
    path: '/learnings',
    name: 'Learnings',
    component: () => import('../views/Learnings.vue')
  },
  {
    path: '/physics/linearmotionconverter',
    name: 'Linear Motion Converter',
    component: () => import("../views/LinearMotionConverter.vue")
  },
  {
    path: "*", //invalid path
    name: 'Error',
    component: () => import('../views/Error.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
