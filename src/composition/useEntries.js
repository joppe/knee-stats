import { ref, watch } from 'vue';
import { toTimestamp } from '@/date/toTimestamp';

function findStat(stats, timestamp) {
    return stats.find((stat) => {
        return stat.date.seconds === timestamp;
    });
}

function emptyStat(timestamp) {
    return {
        date: {
            seconds: timestamp,
            nanoseconds: 0,
        },
        exercises: [],
        activities: [],
        muscleStrain: 0,
        remark: '',
        score: 0,
        stairs: 0,
    };
}

export function useEntries(days, stats) {
    const entries = ref([]);

    function getEntries() {
        entries.value = days.value.map((day) => {
            const timestamp = toTimestamp(day);

            return findStat(stats.value, timestamp) ?? emptyStat(timestamp);
        });
    }

    watch(days, getEntries);
    watch(stats, getEntries);

    return entries;
}
