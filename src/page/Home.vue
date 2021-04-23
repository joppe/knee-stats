<template>
    <Dashboard :startDate="today" />
</template>

<script>
import { toString } from '@/date/toString';
import Dashboard from '@/component/dashboard/Dashboard';

export default {
    name: 'Home',
    components: {
        Dashboard,
    },
    setup() {
        const now = new Date();

        return {
            today: toString(now),
        };
    },
};
</script>
