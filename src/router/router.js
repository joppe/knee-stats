import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/page/Home.vue';
import Period from '@/page/Period';
import NotFound from '@/page/NotFound.vue';
import { auth } from '@/firebase/firebase';

const routes = [
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            authRequired: true,
        },
    },
    {
        path: '/period/:date',
        name: 'Period',
        component: Period,
        meta: {
            authRequired: true,
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import(/* webpackChunkName: "about" */ '../page/Login.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.authRequired)) {
        if (auth.currentUser) {
            next();
        } else {
            next({
                name: 'Login',
            });
        }
    } else {
        next();
    }
});

export { router };
