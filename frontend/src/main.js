// main.js

import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import HomePage from './components/HomePage.vue';
import AnimalsView from './components/AnimalsView.vue';
import AnimalPage from './components/AnimalPage.vue';
import AddAnimal from "@/components/AddAnimal.vue";
import StatisticsPage from "@/components/StatisticsPage.vue";

Vue.use(VueRouter);

const routes = [
  { path: '/', component: HomePage },
  { path: '/animals/:id', component: AnimalPage },
  { path: '/animals', component: AnimalsView },
  { path: '/add-animal', component: AddAnimal },
  { path: '/statistics', component: StatisticsPage }

];

const router = new VueRouter({
  mode: 'history', // Use history mode
  routes,
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
