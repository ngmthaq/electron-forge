/**
 * Vue-Router Configurations
 * @author Nguyen Manh Thang
 */

import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";
import { PATH_CONSTANTS } from "../const/path";
import PathNotFoundView from "../views/PathNotFoundView.vue";

const publicRoutes = Object.values(PATH_CONSTANTS.publicRoutes).map((route) => ({
  ...route,
  meta: { ...route.meta, accessType: "public" },
}));

const privateRoutes = Object.values(PATH_CONSTANTS.privateRoutes).map((route) => ({
  ...route,
  meta: { ...route.meta, accessType: "private" },
}));

const notFoundRoute: RouteRecordRaw = {
  path: "/:pathMatch(.*)*",
  component: PathNotFoundView,
  meta: { accessType: "public" },
};

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes, ...privateRoutes, notFoundRoute],
});

router.beforeEach((to, from, next) => {
  return next();
});

export { router };
