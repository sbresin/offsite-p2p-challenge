import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { addAnswer, createBaseRounds, fetchLastFiveRounds } from "./data";

createApp(App).mount("#app");

// Add answers
addAnswer("testRound", "Alice", "Category1", "Answer-Round1");
addAnswer("testRound", "Alice", "Category2", "Answer-Round2");
addAnswer("testRound", "Bob", "Category2", "Answer-Round2");

addAnswer("testRound2", "Alice", "Category1", "Answer-Round2-1");
addAnswer("testRound2", "Alice", "Category2", "Answer-Round2-2");
addAnswer("testRound2", "Bob", "Category1", "Answer-Round2-1");
addAnswer("testRound2", "Bob", "Category2", "Answer-Round2-2");

createBaseRounds();
