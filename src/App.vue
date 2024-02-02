<script setup>
import {RouterLink, RouterView} from 'vue-router';
import axios from 'axios';
import {ref} from "vue";
import router from "@/router/index.js";
import {ElMessage} from "element-plus";

axios.defaults.withCredentials = true;
const loggedIn = ref(false);

router.beforeEach((to, from, next) => {
    console.log(to.path);
    if (to.path === '/login' || to.path === '/register') {
        next();
    }
    else {
        axios.get('http://localhost:8080/api/auth/validateLogin')
                .then(response => {
                    if (response.status === 202) {
                        loggedIn.value = true;
                        next();
                    } else {
                        loggedIn.value = false;
                        next('/login');
                    }
                })
                .catch(e => {
                    console.log(e);
                    loggedIn.value = false;
                    next('/login');
                    ElMessage({
                        message: 'Lütfen tekrar giriş yapınız.',
                        type: 'error'
                    })
                })
    }
});

</script>

<template>
    <div v-if="!loggedIn">
        <header>
            <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125"/>
            <div class="wrapper">
                <nav>
                    <RouterLink to="/login">Giriş yap</RouterLink>
                    <RouterLink to="/register">Kayıt ol</RouterLink>
                </nav>
            </div>
        </header>
    </div>
    <RouterView/>
</template>

<style scoped>
header {
    line-height: 1.5;
    max-height: 100vh;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-grid;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        //padding-right: calc(var(--section-gap) / 4);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        width: 100%;
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }

    nav {
        text-align: left;
        margin-left: -1rem;
        font-size: 1rem;

        padding: 1rem 0;
        margin-top: 1rem;
    }
}
</style>
