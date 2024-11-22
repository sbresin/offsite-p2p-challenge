import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { getSomeRoundsForTests,fetchLastFiveRounds,addAnswer } from "./data";
import { createPinia } from 'pinia'


addAnswer("killround", "Alice", "Category1", "Answer-Round1");
addAnswer("killround", "Alice", "Category2", "Answer-Round2");
addAnswer("killround", "Bob", "Category2", "Answer-Round2");

fetchLastFiveRounds();

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

