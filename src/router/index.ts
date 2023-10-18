import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHashHistory(),
  routes: Object.values(routes),
});

router.beforeEach((to, from, next) => {
  return next();
});

export { router };
