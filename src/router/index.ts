import { createRouter, createWebHashHistory } from "vue-router";
import Welcome from "../views/Welcome.vue";
import Game from "../views/Game.vue";
import Scores from "../views/Scores.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "welcome",
      component: Welcome,
    },
    {
      path: "/game",
      name: "Game",
      component: Game,
    },
    {
      path: "/score",
      name: "Scores",
      component: Scores,
    },
  ],
});

export default router;
