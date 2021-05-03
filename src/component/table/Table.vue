<template>
    <table class="c-table table">
        <tr class="table__row--head">
            <th
                v-for="field in fields"
                :key="field.prop"
                class="table__cell table__cell--column"
            >
                {{ field.label }}
            </th>
        </tr>
        <tr
            v-for="entry in data"
            :key="entry.id"
            :class="className(entry)"
            @click="$emit('selected', entry)"
        >
            <td
                v-for="field in fields"
                :key="field.prop"
                class="table__cell table__cell--row"
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
    name: 'Table',
    props: {
        fields: [Object],
        data: [Object],
        styler: Function,
    },
    emits: ['selected'],
    methods: {
        className(entry) {
            return `table__row--body  ${this.styler(entry)}`;
        },
    },
};
</script>

<style lang="scss">
.table {
    border-spacing: 0;
    width: 100%;

    &__cell {
        padding: map-get($spacing, 'md');

        &--column {
            text-align: left;
            border-bottom: 1px solid #000;
        }
    }

    &__row {
        &--body.current {
            background-color: $blue--maya;
        }

        &--body:nth-of-type(odd):not(.active) {
            background-color: #aaa;
        }

        &--body:hover:not(.disabled) {
            background-color: $green--de-york;
            cursor: pointer;
        }
    }
}
</style>
