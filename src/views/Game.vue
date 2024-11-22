<script setup lang="ts">
import { usePlayer } from '../stores/player.ts';

const player = usePlayer(); // Access the Pinia store
</script>

<template>
  <p>Hello {{ player.name }}</p>
</template>

<style scoped>

</style>
