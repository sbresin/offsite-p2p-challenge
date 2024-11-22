import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createBaseRounds, fetchLastFiveRounds } from "./data";

createApp(App).mount("#app");

fetchLastFiveRounds().then((rounds) => {
    console.log("Last five rounds:", rounds);
  });
  