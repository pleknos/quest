import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import store from './store/index.js';

import Home from './components/Home.vue';
import Registration from './components/Registration.vue';
import Map from './components/Map.vue';
import Agreement from './components/Agreement.vue';
import Login from './components/Login.vue';
import App from './App.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/register', component: Registration },
  { path: '/login', component: Login },
  { path: '/agreement', component: Agreement },
];

if (store.state.event.isStarted) {
  routes.push({ path: '/map', component: Map });
}

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
