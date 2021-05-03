<template>
    <ul class="list">
        <li v-for="(entry, index) in entries" :key="index" class="list__item">
            {{ entry }}
            <button type="button" @click="$emit('remove', index)">x</button>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'List',
    props: {
        entries: Array,
    },
    emits: ['remove'],
};
</script>

<style lang="scss">
.list {
    list-style: disc;
    margin-left: 1em;
}
</style>
