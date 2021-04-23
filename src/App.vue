<template>
    <header class="o-container">
        <nav class="main-nav">
            <ul class="main-nav__list">
                <li class="main-nav__list-item">
                    <router-link to="/" class="main-nav__link"
                        >Home</router-link
                    >
                </li>
                <li class="main-nav__list-item" v-if="!isLoggedIn()">
                    <router-link to="/login" class="main-nav__link"
                        >Login</router-link
                    >
                </li>
                <li class="main-nav__list-item" v-if="isLoggedIn()">
                    <a @click.prevent="handleLogout" class="main-nav__link"
                        >Logout</a
                    >
                </li>
            </ul>
        </nav>
    </header>

    <router-view></router-view>
</template>

<style lang="scss">
.main-nav {
    &__list {
        display: flex;
        justify-content: flex-end;
    }

    &__list-item {
        position: relative;
        padding: 0 map-get($spacing, 'sm');

        &:before {
            content: '|';
            position: absolute;
            left: 0;
            top: 0;
        }

        &:first-of-type:before {
            content: '';
        }

        &:last-of-type {
            padding-right: 0;
        }
    }

    &__link {
        cursor: pointer;
    }
}
</style>

<script>
import { useAuth } from '@/firebase/useAuth';

export default {
    name: 'App',
    setup() {
        const { isLoggedIn, logout } = useAuth();

        return { isLoggedIn, logout };
    },
    methods: {
        async handleLogout() {
            await this.logout();
            this.$router.push({ name: 'Login' });
        },
    },
};
</script>
