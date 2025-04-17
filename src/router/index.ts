import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/research",
      name: "research",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Research.vue"),
    },
    {
      path: "/team",
      name: "team",
      component: () => import("../views/Team.vue"),
    },
    {
      path: "/publications",
      name: "publications",
      component: () => import("../views/Publications.vue"),
    },
    {
      path: "/resources",
      name: "resources",
      component: () => import("../views/Resources.vue"),
    },
    {
      path: "/moments",
      name: "moments",
      component: () => import("../views/Moments.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/Contact.vue"),
    }
  ],
});

export default router;
