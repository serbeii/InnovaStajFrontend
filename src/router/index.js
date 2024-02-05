import {createRouter, createWebHistory} from 'vue-router'
import Login from '../views/LoginView.vue'
import Register from '../views/RegisterView.vue'
import AdminView from "@/views/AdminView.vue";
import UserView from "@/views/UserView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/',
            name: 'user',
            component: UserView
        },
        {
            path: '/admin',
            name: 'admin',
            component: AdminView
        }
    ]
})

export default router
