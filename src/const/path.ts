import type { RouteRecordRaw } from "vue-router";
import HomeViewVue from "../views/HomeView.vue";

/**
 * This file contains links to application pages
 */
export class PATH_CONSTANTS {
  public static publicRoutes: PublicRoutes = {
    home: {
      path: "/",
      name: "home",
      component: HomeViewVue,
    },
  };

  public static privateRoutes: PrivateRoutes = {};
}

export type PublicRouteKeys = "home";

export type PublicRoutes = Record<PublicRouteKeys, RouteRecordRaw>;

export type PrivateRouteKeys = string;

export type PrivateRoutes = Record<PrivateRouteKeys, RouteRecordRaw>;
