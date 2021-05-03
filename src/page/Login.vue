<template>
    <div class="o-container">
        <Form class="login">
            <template v-slot:fields>
                <FormField id="form-field-username" label="Username">
                    <input
                        type="text"
                        id="form-field-username"
                        v-model="username"
                        autocomplete
                    />
                </FormField>
                <FormField id="form-field-password" label="Password">
                    <input
                        type="password"
                        id="form-field-password"
                        v-model="password"
                    />
                </FormField>
            </template>

            <template v-slot:actions>
                <button type="button" @click="handleLogin()">Login</button>
            </template>
        </Form>
    </div>
</template>

<script>
import Form from '@/component/form/Form';
import FormField from '@/component/form/FormField';
import { useAuth } from '@/firebase/useAuth';

export default {
    name: 'Login',
    components: {
        Form,
        FormField,
    },
    setup() {
        const { user, login } = useAuth();

        return { user, login };
    },
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        async handleLogin() {
            const result = await this.login(this.username, this.password);

            if (result === true) {
                this.redirect();
            }
        },
        redirect() {
            this.$router.push({ name: 'Home' });
        },
    },
};
</script>

<style lang="scss">
.login {
    max-width: 400px;
    border: 1px solid $black;
}
</style>
