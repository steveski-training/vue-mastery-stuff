<script setup>
defineProps({
  resource: {
    type: String,
    required: true,
    default: 'page'
  }
});
</script>

<template>
    <h1>Ooops!</h1>
    <div>The {{  resource }} you're looking for is not here.</div>
    <router-link :to="{ name: 'EventList'}">Back to the home page</router-link>
</template>

<style scoped>

</style>
