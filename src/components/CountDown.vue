<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{ even: boolean }>();

const now = ref(new Date());

onMounted(() => {
  const countdownInterval = setInterval(() => {
    now.value = new Date();
  }, 1000);

  onBeforeUnmount(() => {
    clearInterval(countdownInterval);
  });
});

const minuteOfDay = computed(() => {
  return now.value.getHours() * 60 + now.value.getMinutes();
});

const secondsLeft = computed(() => {
  const nextisEven = minuteOfDay.value % 2 === 0;
  const waitingTime = nextisEven && props.even ? 60 : 120;
  const secondsLeft = waitingTime - now.value.getSeconds();
  return secondsLeft;
});

</script>

<template>
  <span class="">
    {{ secondsLeft }}
  </span>
</template>

<style scoped></style>
