<script setup>
import { useRouter } from 'vue-router';
import { inject } from 'vue';
const props = defineProps({
  event: {
    type: Object,
    required: true
  }
});

const router = useRouter();
const store = inject('GStore');

const register = () => {
    // Call to API
    // If registered then redirect tro event details
    store.flashMessage = 'You are successfully registered for ' + props.event.title;

    setTimeout(() => {
        store.flashMessage = ''
    }, 3000);

    router.push({
        name: 'EventDetails',
        //params: { id: this.event.id } // Not needed as this component is on a child route of layout
    });
};

</script>

<template>
  <p>Register for the event</p>
  <button @click="register">Register Me</button>
</template>


