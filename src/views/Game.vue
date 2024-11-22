<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { usePlayer } from '../stores/player';
import { useLetter } from '../stores/letter';
import { Category } from "../lib/types";
import { addAnswer } from "../data";

// Access the Pinia letter store
const player = usePlayer();
const letter = useLetter();

const categories: Category[] = ['city', 'country', 'river', 'tech', 'bvgStations'];
const gameTime = ref(60);

onMounted(() => {
  letter.startLetterSequence();

  const countdownInterval = setInterval(() => {
    if (gameTime.value > 0) {
      gameTime.value -= 1;
    }
  }, 1000);

  onBeforeUnmount(() => {
    clearInterval(countdownInterval);
  });
});

const handleSubmit = () => {
  categories.forEach((category) => {
    addAnswer('1', player.name, player.name, category, player[category])
  });
  console.log(letter.answer);
};
</script>

<template>
  <h2>Time: {{ gameTime }}</h2>
  <h2>Letter: {{ letter.randomLetter }}</h2>
  <p>Hello {{ player.name }}</p>

  <div v-for="category in categories" :key="category">
    <label :for="category">{{ category }}:</label>
    <input
      :id="category"
      v-model="player[category]"
      type="text"
      :placeholder="'Enter ' + category"
    />
  </div>

  <button class="button" @click="handleSubmit">Submit</button>
</template>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

input {
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
  max-width: 300px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
