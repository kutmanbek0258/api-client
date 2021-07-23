import Vue from 'vue';
import Router from 'vue-router';

/*import HomePage from '../home/HomePage'
import LoginPage from '../login/LoginPage'
import RegisterPage from '../register/RegisterPage'

import Inbox from '../messages/Inbox'
import Outbox from '../messages/Outbox'
//import CreateMessage from "../messages/CreateMessage";
import OpenMessage from "../messages/OpenMessage";
import ControllerMessages from "../messages/ControllerMessages";
import OpenControllerMessage from "@/messages/OpenControllerMessage";
import CreateMessageAutoComplete from "@/messages/CreateMessageAutoComplete";*/
import DashboardLayout from "@/layout/DashboardLayout";
import AuthLayout from "@/layout/AuthLayout";

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    /*{ path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },

    { path: '/messages/inbox', name: 'Inbox', component: Inbox},
    { path: '/messages/controller_messages', name: 'ControllerMessages', component: ControllerMessages},
    { path: '/messages/outbox', name: 'Outbox', component: Outbox},
    { path: '/messages/send', name: 'CreateMessage', component: CreateMessageAutoComplete},
    { path: '/messages/message/:id', name: 'OpenMessage', component: OpenMessage},
    { path: '/messages/control/:id', name: 'OpenControllerMessage', component: OpenControllerMessage},*/

    // otherwise redirect to home
    { path: '*', redirect: '/' },

    {
      path: '/',
      redirect: 'inbox',
      component: DashboardLayout,
      children: [
        {
          path: '/inbox',
          name: 'inbox',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ '../views/Inbox')
        },
        {
          path: '/outbox',
          name: 'outbox',
          component: () => import(/* webpackChunkName: "demo" */ '../views/Outbox')
        },
        {
          path: '/controlbox',
          name: 'controlbox',
          component: () => import(/* webpackChunkName: "demo" */ '../views/Controlbox')
        },
        {
          path: '/write_message',
          name: 'write message',
          component: () => import(/* webpackChunkName: "demo" */ '../views/WriteMessage')
        },
        {
          path: '/open_message/:id',
          name: 'open message',
          component: () => import(/* webpackChunkName: "demo" */ '../views/OpenMessage')
        }
      ]
    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ '../views/Login.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "demo" */ '../views/Register.vue')
        }
      ]
    },

  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})