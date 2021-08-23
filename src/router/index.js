import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'newsform',
    component: () => import(/* webpackChunkName: "NewsForm" */ '../views/NewsForm.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
