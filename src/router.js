// import { defineAsyncComponent } from 'vue';

import { createRouter, createWebHistory } from 'vue-router';

// import CoachDetails from './pages/coaches/CoachDetails.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
// import CoachRegistration from './pages/coaches/CoachRegistration.vue';
// import ContactCoach from './pages/requests/ContactCoach.vue';
// import RequestReceived from './pages/requests/RequestReceived.vue';
// import UserAuth from './pages/auth/UserAuth.vue';
import NotFound from './pages/NotFound.vue';
import store from './store/index.js';

const CoachDetails = () => import('./pages/coaches/CoachDetails.vue');

const CoachRegistration = () => import('./pages/coaches/CoachRegistration.vue');

const ContactCoach = () => import('./pages/requests/ContactCoach.vue');

const RequestReceived = () => import('./pages/requests/RequestReceived.vue');

const UserAuth = () => import('./pages/auth/UserAuth.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetails,
      props: true,
      children: [
        { path: 'contact', component: ContactCoach } // /coaches/c1/contact
      ]
    },
    {
      path: '/register',
      component: CoachRegistration,
      meta: { requiresAuth: true }
    },
    {
      path: '/requests',
      component: RequestReceived,
      meta: { requiresAuth: true }
    },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

router.beforeEach(function(to, _from, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
