<template>
    <Dashboard :startDate="date" />
</template>

<script>
import Dashboard from '@/component/dashboard/Dashboard';

export default {
    name: 'Period',
    components: {
        Dashboard,
    },
    computed: {
        date() {
            return this.$router.currentRoute.value.params.date;
        },
    },
};
</script>
