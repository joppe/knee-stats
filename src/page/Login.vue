<template>
    <div class="o-container">
        <Form class="login">
            <template v-slot:fields>
                <FormRow id="form-field-username" label="Username">
                    <input
                        type="text"
                        id="form-field-username"
                        v-model="username"
                        autocomplete
                    />
                </FormRow>
                <FormRow id="form-field-password" label="Password">
                    <input
                        type="password"
                        id="form-field-password"
                        v-model="password"
                    />
                </FormRow>
            </template>

            <template v-slot:actions>
                <button type="button" @click="handleLogin()">Login</button>
            </template>
        </Form>
    </div>
</template>

<script>
import Form from '@/component/form/Form';
import FormRow from '@/component/form/FormRow';
import { useAuth } from '@/firebase/useAuth';

export default {
    name: 'Login',
    components: {
        Form,
        FormRow,
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
