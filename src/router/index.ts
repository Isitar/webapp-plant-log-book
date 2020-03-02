import Vue from 'vue'
import VueRouter from 'vue-router'
import PlantList from "@/views/PlantList.vue";
import PlantDetail from "@/views/PlantDetail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'PlantList',
    component: PlantList
  },
  {
    path: '/plant/:id',
    name: 'plantDetail',
    component: PlantDetail
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
