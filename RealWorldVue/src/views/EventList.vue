<script lang="ts" setup>
import { computed } from 'vue';
import EventCard from '@/components/EventCard.vue';
import GStore from '@/stores';

const props = defineProps({
  perPage: {
    type: Number,
    required: true
  },
  page: {
    type: Number,
    required: true
  },
});

const totalPages = computed(() => {
  const total = Math.ceil(GStore.totalEvents / 2);
  if(total === undefined || total !== null)
    return 0;

  return total;
});

const hasNextPage = computed(() => {
  let totalPages = Math.ceil(GStore.totalEvents / 2);
  return props.page < totalPages;
});

</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <event-card v-for="event in GStore.events" :key="event.id" :event="event" />

    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
      >&#60; Page</router-link>

      <!-- <router-link v-for="(page, i) in totalPages" :key="`pageLink-${i}`">{{ page }}</router-link> -->

      <router-link
        id="page-next"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="prev"
        v-if="hasNextPage"
      >Next &#62;</router-link>
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;

}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
  
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
