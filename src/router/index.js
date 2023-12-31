import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../pages/HomeView.vue';
import ProjectsView from '../pages/ProjectsView.vue';
import AboutView from '../pages/AboutView.vue';
import NotFound from '../components/404.vue';

// Crea el router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/:catchAll(.*)',
      component: NotFound
    }
  ]
});

export default router;
