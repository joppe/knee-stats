<style lang="scss">
table {
    border-spacing: 0;
    width: 100%;

    th,
    td {
        padding: 3px 10px 3px 0;
    }

    thead {
        th {
            text-align: left;
            border-bottom: 1px solid #000;
        }
    }

    tbody {
        tr:nth-of-type(odd) {
            background-color: #aaa;
        }
    }
}
</style>

<template>
    <table>
        <thead>
            <tr>
                <th v-for="field in fields" :key="field.prop">
                    {{ field.label }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="entry in data" :key="entry.id">
                <td v-for="field in fields" :key="field.prop">
                    {{ entry[field.prop] }}
                </td>
            </tr>
        </tbody>
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
