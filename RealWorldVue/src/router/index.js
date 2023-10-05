import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import EventList from '../views/EventList.vue';
import EventLayout from '../views/event/Layout.vue';
import EventDetails from '../views/event/Details.vue';
import EventRegister from '../views/event/Register.vue';
import EventEdit from '../views/event/Edit.vue';
import NotFound from '../views/NotFound.vue';
import NetworkError from '../views/NetworkError.vue';
import EventService from '@/services/EventService';
import GStore from '@/stores';

// Lazy loaded components
const About = () => import(/* webpackChunkName: "about" */ '../views/About.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if(savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  routes: [
    {
      path: '/',
      name: 'EventList',
      component: EventList,
      beforeEnter: to => {
        //  Screwy. Needs more work here to get the pages happening again
        return EventService.getEvents(
            parseInt(to.query.perPage) || 4,
            parseInt(to.query.page) || 1
        )
        .then(response => {
          GStore.events = response.data;
          GStore.totalEvents = parseInt(response.headers['x-total-count']);
        })
        .catch(() => {
          return ({ name: 'NetworkError'});
        });
      },
      props: route => ({
        perPage: parseInt(route.query.perPage) || 4,
        page: parseInt(route.query.page) || 1    
      })
    },
    {
      path: '/events/:id',
      name: 'EventLayout',
      props: true,
      component: EventLayout,
      beforeEnter: to => {
        return EventService.getEvent(to.params.id)
          .then(response => {
            GStore.event = response.data;
          })
          .catch(error => {
            if(error.response && error.response.status === 404) {
                return ({
                    name: '404Resource',
                    params: { resource: 'event' }
                });
            } else {
                return ({ name: 'NetworkError'});
            }
          
          });
      },
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
          component: EventEdit,
          meta: { requireAuth: true }
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

router.beforeEach((to, from) => {
  NProgress.start();

  const notAuthorised = true;
  if(to.meta.requireAuth && notAuthorised) {
    GStore.flashMessage = 'Sorry, you are not authroised to view this page';

    setTimeout(() => {
      GStore.flashMessage = '';
    }, 3000);

    if(from.href) {
      return false;
    } else {
      return { path: '/' };
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
