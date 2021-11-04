import Vue from 'vue';
import Router from 'vue-router';

import Typing from './views/typing.vue';

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: '/typing',
            component: Typing,   
        },
    ],

})