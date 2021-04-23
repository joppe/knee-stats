<template>
    <main class="o-container">
        <h1>Dashboard</h1>
        <div class="date-nav">
            <button
                type="button"
                @click="previous"
                class="date-nav__item date-nav__item--previous"
            >
                &laquo;
            </button>
            <span class="date-nav__current">{{ startDate }}</span>
            <button
                type="button"
                @click="next"
                class="date-nav__item date-nav__item--next"
            >
                &raquo;
            </button>
        </div>

        <List :fields="fields" :data="entries" />
    </main>
</template>

<style lang="scss">
.date-nav {
    display: flex;
    align-items: center;
    margin-bottom: map-get($spacing, 'lg');

    &__item {
        &--previous {
            margin-right: map-get($spacing, 'md');
        }

        &--next {
            margin-left: map-get($spacing, 'md');
        }
    }
}
</style>

<script>
import { useStats } from '@/firebase/useStats';
import { useEntries } from '@/composition/useEntries';
import List from '@/component/list/List';
import { toString } from '@/date/toString';
import { fromTimestamp } from '@/date/fromTimestamp';
import { fromString } from '@/date/fromString';
import { addDays } from '@/date/addDays';
import { toRefs } from 'vue';
import { useDayInterval } from '@/composition/useDayInterval';

export default {
    name: 'Dashboard',
    props: {
        startDate: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            fields: [
                {
                    prop: 'date',
                    label: 'Date',
                    mapper(date) {
                        return toString(fromTimestamp(date.seconds));
                    },
                },
                { prop: 'score', label: 'Score' },
                { prop: 'stairs', label: 'Stairs' },
            ],
        };
    },
    components: {
        List,
    },
    setup(props) {
        const { startDate } = toRefs(props);
        const days = useDayInterval(startDate, 7);
        const stats = useStats();
        const entries = useEntries(days, stats);

        return { entries };
    },
    methods: {
        previous() {
            const date = fromString(this.startDate);
            const prev = addDays(date, -7);

            this.$router.push({
                path: `/period/${toString(prev)}`,
            });
        },
        next() {
            const date = fromString(this.startDate);
            const next = addDays(date, 7);

            this.$router.push({
                path: `/period/${toString(next)}`,
            });
        },
    },
};
</script>
