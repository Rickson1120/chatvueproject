

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import chat from './src/components/HelloWorld.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/chat', component: chat },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
