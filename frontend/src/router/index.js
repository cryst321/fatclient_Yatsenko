import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/HomePage.vue';
import AnimalsView from '../components/AnimalsView.vue';
import AnimalPage from '../components/AnimalPage.vue';
import AddAnimal from '../components/AddAnimal.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/animals/:id',
        name: 'AnimalPage',
        component: AnimalPage
    },
    {
        path: '/animals',
        name: 'Animals',
        component: AnimalsView
    },
    {
        path: '/add-animal',
        name: 'AddAnimal',
        component: AddAnimal
    },

];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
