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
  {
    path: "/settings",
    name: "Settings",
    component: () => import(/* webpackChunkName: "settings" */ "../views/Settings.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
