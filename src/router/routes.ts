import type { RouteRecordRaw } from "vue-router";
import HomePageVue from "../pages/HomePage.vue";
import AboutPageVue from "../pages/AboutPage.vue";

export const routes: Routes = {
  home: {
    path: "/",
    component: HomePageVue,
  },
  about: {
    path: "/about",
    component: AboutPageVue,
  },
};

export type RouteName = "home" | "about";

export type Routes = Record<RouteName, RouteRecordRaw>;
