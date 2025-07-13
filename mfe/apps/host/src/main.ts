import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import ReactApp from './views/ReactApp.vue'
import JobSearch from './views/JobSearch.vue'
import CreateNewApp from './views/CreateNewApp.vue'
import "@sacha/theme/dist/sd-theme.css";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/react-app', component: ReactApp },
    { path: '/job-search', component: JobSearch },
    { path: '/create_new_app', component: CreateNewApp }
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app') 