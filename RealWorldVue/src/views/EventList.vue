<script setup>
import { ref, computed, onMounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import EventService from '@/services/EventService';
import EventCard from '@/components/EventCard.vue';
import NProgress from 'nprogress';

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

const router = useRouter();
const events = ref(null);
const totalEvents = ref(0);

onMounted(() => {
  watchEffect(async () => {
    NProgress.start();
    try {
      const response = await EventService.getEvents(props.perPage, props.page);
      events.value = response.data;
      totalEvents.value = parseInt(response.headers['x-total-count']);
    } catch {
      router.push({ name: 'NetworkError'});
    }
    finally {
      NProgress.done();
    }
  });

});

const totalPages = computed(() => {
  const total = Math.ceil(totalEvents.value / 2);
  if(total === undefined || total !== null)
    return 0;

  return total;
});

const hasNextPage = computed(() => {
  let totalPages = Math.ceil(totalEvents.value / 2);
  return props.page < totalPages;
});

</script>

<script>
//export default {
  // beforeRouteEnter(to, from, next) {
  //   EventService.getEvents(2, to.query.page || 1)
  //     .then(response => {
  //       next(comp => {
  //         comp.$props.events = response.data;
  //         comp.$props.totalEvents = parseInt(response.headers['x-total-count']);
  //       })
  //     })
  //     .catch(() => {
  //       next({ name: 'NetworkError'});
  //     });
  // }

  // async beforeRouteEnter(to, from, next) {
  //   try {
  //     const response = await EventService.getEvents(2, to.query.page || 1);
  //     next(comp => {
  //       comp.$props.events = response.data;
  //       comp.$props.totalEvents = parseInt(response.headers['x-total-count']);
  //     })
      
  //   } catch {
  //     next({ name: 'NetworkError'});
  //   }

  // }
//}
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <event-card v-for="event in events" :key="event.id" :event="event" />

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
