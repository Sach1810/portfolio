import {
  createRouter,
  createWebHashHistory,
  // createWebHistory
} from "vue-router";
import Home from "../pages/HomePage.vue";
// import About from "../pages/AboutPage.vue";
import SachaCv from "../pages/CvPage.vue";
import GameController from "../pages/GameController.vue";
import JobSearch from "../pages/JobSearch.vue";
const routes = [
  { path: "/", component: Home },
  // { path: "/about", component: About },
  { path: "/cv", component: SachaCv },
  { path: "/controller", component: GameController },
  { path: "/jobsearch", component: JobSearch },
];

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
