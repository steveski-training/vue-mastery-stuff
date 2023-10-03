import { createRouter, createWebHistory } from 'vue-router';
import EventListView from '../views/EventListView.vue';
import EventDetailsView from '../views/EventDetailsView.vue';
import AboutView from '../views/AboutView.vue';
import PageNotFoundView from '../views/PageNotFoundView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'EventList',
      component: EventListView
    },
    {
      path: '/event/:id',
      name: 'EventDetails',
      component: EventDetailsView,
      props: true
    },
    {
      path: '/about',
      name: 'About',
      component: AboutView
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: PageNotFoundView,
      meta: {
        requiresAuth: false
      }
    }
  ]
})

export default router;
