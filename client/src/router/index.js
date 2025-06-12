import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/HomePage.vue";
import About from "../pages/AboutPage.vue";
import SachaCv from "../pages/CvPage.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/cv", component: SachaCv },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
