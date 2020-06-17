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
    path: '/intersections',
    name: 'Intersections',
    // route level code-splitting
    // this generates a separate chunk (intersections.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "intersections" */ '../views/Intersections/index.vue'),
    redirect: { name: 'AllIntersections' },
    children: [
      {
        path: 'all',
        name: 'AllIntersections',
        component: () => import(/* webpackChunkName: "intersections" */ '../views/Intersections/AllIntersections.vue'),
      },
      {
        path: ':id',
        name: 'IntersectionProfile',
        component: () => import(/* webpackChunkName: "intersections" */ '../views/Intersections/IntersectionProfile.vue'),
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
