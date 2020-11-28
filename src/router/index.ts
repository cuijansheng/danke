import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
    {
        path: '/',
        redirect: '/index',
    },
    // {
    //     path: '/guest',
    //     name: 'guest',
    //     component: () => import('@/views/index.vue'),
    // },
    {
        path: '/guest/:token',
        name: 'guest',
        component: () => import('@/views/index.vue'),
    },
    {
        path: '/index',
        name: 'index',
        component: () => import('@/views/index.vue'),
    },
    {
        path: '/guest/:token/detail',
        name: 'guestDetail',
        component: () => import('@/views/detail.vue'),
    },
    {
        path: '/detail',
        name: 'detail',
        component: () => import('@/views/detail.vue'),
    },
    {
        path: '/addurl',
        name: 'addUrl',
        component: () => import('@/views/addUrl.vue'),
    },
    {
        path: '*',
        name: '404',
        component: () => import('@/views/404.vue'),
    },

];

const router = new VueRouter({
    routes,
});

export default router;
