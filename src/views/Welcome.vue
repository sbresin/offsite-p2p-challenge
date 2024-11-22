<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePlayer } from '../stores/player.ts';

const router = useRouter(); // Use the Vue Router instance
const player = usePlayer(); // Access the Pinia store

const playerName = ref('');

const addName = () => {
  player.addName(playerName.value); // Call the action to update the name
  router.push({ path: '/game' }); // Navigate to the "game" route
};
</script>

<template>
  <p>Enter your Name:</p>
  <input type="text" v-model="playerName" placeholder="Player Name" />
  <div class="card">
    <button @click="addName">Start</button>
  </div>
</template>

<style scoped>
/* Scoped styles for your component */
.card {
  margin-top: 20px;
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
