import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue';
import Game from '../views/Game.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome,
    },
    {
      path: '/game',
      name: 'Game',
      component: Game,
    },
  ],
})

export default router
