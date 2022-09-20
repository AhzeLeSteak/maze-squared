import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: '/play',
        name: 'play',
        component: () => import('../views/Play.vue')
    },
    {
        path: '/edit',
        name: 'edit',
        component: () => import('../views/Edit.vue')
    },
    {
        path: '/*',
        redirect: '/play'
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})