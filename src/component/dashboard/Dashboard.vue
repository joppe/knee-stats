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

        <Table
            :fields="fields"
            :data="entries"
            :styler="styler"
            @selected="handleSelected($event)"
        />

        <Modal v-if="selected !== null" @close="selected = null">
            <StatForm
                :stat="selected"
                @cancel="selected = null"
                @save="handleSave($event)"
            />
        </Modal>
    </main>
</template>

<script>
import Table from '@/component/table/Table';
import Modal from '@/component/modal/Modal';
import StatForm from '@/component/dashboard/StatForm';
import { addDays } from '@/date/addDays';
import { createStat, updateStat, useStats } from '@/firebase/useStats';
import { fromString } from '@/date/fromString';
import { fromTimestamp } from '@/date/fromTimestamp';
import { startOfDay } from '@/date/startOfDay';
import { toRefs } from 'vue';
import { NATURAL, toString } from '@/date/toString';
import { toTimestamp } from '@/date/toTimestamp';
import { useDayInterval } from '@/composition/useDayInterval';
import { useEntries } from '@/composition/useEntries';

export default {
    name: 'Dashboard',
    props: {
        startDate: {
            type: String,
            required: true,
        },
    },
    components: {
        Modal,
        StatForm,
        Table,
    },
    data() {
        const today = startOfDay(new Date());
        const tomorrow = addDays(today, 1);

        return {
            today: toTimestamp(today),
            tomorrow: toTimestamp(tomorrow),
            selected: null,
            fields: [
                {
                    prop: 'date',
                    label: 'Date',
                    mapper(date) {
                        return toString(fromTimestamp(date.seconds), NATURAL);
                    },
                },
                { prop: 'score', label: 'Score' },
                { prop: 'stairs', label: 'Stairs' },
            ],
        };
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
        handleSelected(stat) {
            if (stat.date.seconds < this.tomorrow) {
                this.selected = stat;
            }
        },
        handleSave(stat) {
            const { id, ...rest } = stat;

            if (id) {
                updateStat(id, rest);
            } else {
                createStat(rest);
            }

            this.selected = null;
        },
        styler(entry) {
            const classes = [];

            if (entry.id) {
                classes.push('with-id');
            } else {
                classes.push('no-id');
            }

            if (entry.date.seconds === this.today) {
                classes.push('current');
            } else if (entry.date.seconds > this.today) {
                classes.push('disabled');
            }

            return classes.join('  ');
        },
    },
};
</script>

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
