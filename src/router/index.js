import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
//import RouteGuard from '../router/routeGuard.js'

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
    path: "/projects/reaction-timer",
    name: 'Reaction Timer',
    component: () => import('../views/Projects/ReactionTimer.vue')
  },
  {
    path: '/projects/file-reader',
    name: 'File Reader',
    component: () => import('../views/Projects/ReadFile.vue')
  },
  {
    path: '/learnings',
    name: 'Learnings',
    component: () => import('../views/Learnings.vue')
  },
  {
    path: '/projects/linearmotionconverter',
    name: 'Linear Motion Converter',
    component: () => import("../views/Projects/LinearMotionConverter.vue")
  },
  {
    path: '/projects/cityweather',
    name: 'Current Weather of City',
    component: () => import("../views/Projects/CityWeather.vue")
  },
  {
    path: '/projects/f1live',
    name: 'F1 Live',
    component: () => import("../views/Projects/F1Live.vue")
  },
  {
    path: '/projects/f1live/:id',
    name: 'F1 Race',
    component: () => import("../views/Projects/F1LiveStat.vue"),
    props: true
  },
  {
    path: '/projects/apis',
    name: 'Maps',
    component: () => import("../views/Projects/Maps.vue")
  },
  {
    path: '/projects/covid',
    name: 'Covid',
    component: () => import("../views/Projects/Covid.vue")
  },
  {
    path: '/projects/revisionprogress/dashboard',
    name: 'Revision Progress Tracker Dashboard',
    component: () => import("../views/Projects/RevisionTracker/RevisionTrackerDashboard.vue"),
    //beforeEnter: RouteGuard
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
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes
})

export default router
