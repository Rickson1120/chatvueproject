<template>
  <button @click="getTime">Login in Alex Account</button>
  <div>Date is: {{ firstName }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Use ref to make firstName reactive
const firstName = ref<number |null>(null);

async function getTime() {
  // Update the reactive firstName value
  firstName.value = 1;
}
</script>

