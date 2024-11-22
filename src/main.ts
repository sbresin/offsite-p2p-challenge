import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createBaseRounds } from "./data";

createApp(App).mount("#app");

createBaseRounds();
