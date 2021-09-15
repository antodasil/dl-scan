import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Download from "../views/Download.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Download",
    component: Download,
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: () => import(/* webpackChunkName: "favorites" */ "../views/Favorites.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
