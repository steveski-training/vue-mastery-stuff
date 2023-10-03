<script setup>
const props = defineProps({
  id: {
    type: Number,
    required: true
  }
});

import { ref, onMounted } from 'vue';
//import { useRoute } from 'vue-router';

import EventService from '@/services/EventService';

//const route = useRoute();
const event = ref(null);

onMounted(async () => {
  try {
    //const response = await EventService.getEvent(route.params.id);
    const response = await EventService.getEvent(props.id);

    event.value = response.data;
  } catch(exception) {
    console.log(exception);
  }

});
</script>

<template>
    <div v-if="event">
        <h1>{{ event.title }}</h1>
        <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
        <p>{{ event.description }}</p>
    </div>
</template>


