import { createRouter, createWebHistory } from 'vue-router';
import EventList from '../views/EventList.vue';
import EventLayout from '../views/event/Layout.vue';
import EventDetails from '../views/event/Details.vue';
import EventRegister from '../views/event/Register.vue';
import EventEdit from '../views/event/Edit.vue';
import About from '../views/About.vue';
import NotFound from '../views/NotFound.vue';
import NetworkError from '../views/NetworkError.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'EventList',
      component: EventList,
      props: route => ({
        perPage: parseInt(route.query.perPage) || 2,
        page: parseInt(route.query.page) || 1    
      })
    },
    {
      path: '/events/:id',
      name: 'EventLayout',
      props: true,
      component: EventLayout,
      children: [
        {
          path: '',
          name: 'EventDetails',
          component: EventDetails
        },
        {
          path: 'register',
          name: 'EventRegister',
          component: EventRegister
        },
        {
          path: 'edit',
          name: 'EventEdit',
          component: EventEdit
        }
      ]
    },
    {
      //path: '/event/:id',
      // redirect: to => {
      //   return { name: 'EventDetails', params: { id: to.params.id }};
      // }

      // or 

      // path: '/event/:id',
      // redirect: () => {
      //   return { name: 'EventDetails' };
      // },
      // children: [
      //   { path: 'register', redirect: () => ({ name: 'EventRegister' }) },
      //   { path: 'edit', redirect: () => ({ name: 'EventEdit' }) }
      // ]

      // or 

      path: '/event/:afterEvent(.*)',
      redirect: to => {
        return { path: '/events/' + to.params.afterEvent };
      }
    },
    {
      path: '/about-us',
      name: 'About',
      component: About,
      //alias: '/about' // This will have two urls pointing to the same location which can affect SEO
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
    },
    {
      path: '/about',
      redirect: { name: 'About' }
    },
    {
      path: '/:catchAll(.*)', // or ...
      //path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/404/:resource',
      name: '404Resource',
      component: NotFound,
      props: true
    },
    {
      path: '/network-error',
      name: 'NetworkError',
      component: NetworkError
    }
  ]
})

export default router;
