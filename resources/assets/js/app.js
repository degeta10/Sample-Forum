
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import Vue from 'vue';
import Vuetify from 'vuetify';
Vue.use(Vuetify);

import VueSimplemde from 'vue-simplemde';
Vue.use(VueSimplemde);

import md from 'marked'
window.md = md

import User from './Helpers/User';

window.User = User;
window.EventBus = new Vue();


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import router from './Router/router.js'; 

Vue.component('AppHome',require('./components/AppHome'));
const app = new Vue({
    el: '#app',
    router,
});
