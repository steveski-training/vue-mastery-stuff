<script setup>
import { inject } from 'vue';

const GStore = inject('GStore');
//const event = ref(null);


</script>

<template>
    <div v-if="GStore.event">
        <h1>{{ GStore.event.title }}</h1>
        <div id="nav">
          <router-link :to="{ name: 'EventDetails' }">Details</router-link> |
          <router-link :to="{ name: 'EventRegister' }">Register</router-link> |
          <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
        </div>
        
        <router-view :event="GStore.event" />
    </div>
</template>


