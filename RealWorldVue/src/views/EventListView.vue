<script setup>
import { ref, onMounted } from 'vue';
import EventService from '@/services/EventService';
import EventCard from '@/components/EventCard.vue';

const events = ref(null);

onMounted(async () => {
  try {
    const response = await EventService.getEvents();

    events.value = response.data;
  } catch(exception) {
    console.log(exception);
  }

});

</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <event-card v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
