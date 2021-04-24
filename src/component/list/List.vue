<template>
    <table class="list">
        <tr class="list__row--head">
            <th
                v-for="field in fields"
                :key="field.prop"
                class="list__cell list__cell--column"
            >
                {{ field.label }}
            </th>
        </tr>
        <tr v-for="entry in data" :key="entry.id" class="list__row--body">
            <td
                v-for="field in fields"
                :key="field.prop"
                class="list__cell list__cell--row"
            >
                {{
                    field.mapper
                        ? field.mapper(entry[field.prop])
                        : entry[field.prop]
                }}
            </td>
        </tr>
    </table>
</template>

<script>
export default {
    name: 'List',
    props: {
        fields: [Object],
        data: [Object],
    },
};
</script>

<style lang="scss">
.list {
    border-spacing: 0;
    width: 100%;

    &__cell {
        padding: 3px 10px 3px 0;

        &--column {
            text-align: left;
            border-bottom: 1px solid #000;
        }
    }

    &__row {
        &--body:nth-of-type(odd) {
            background-color: #aaa;
        }

        &--body:hover {
            background-color: $green--de-york;
            cursor: pointer;
        }
    }
}
</style>
