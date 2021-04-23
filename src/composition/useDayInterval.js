import { fromString } from '@/date/fromString';
import { startOfWeek } from '@/date/startOfWeek';
import { eachDayOfInterval } from '@/date/eachDayOfInterval';
import { onMounted, ref, watch } from 'vue';

export function useDayInterval(startDate, interval) {
    const days = ref([]);

    function getInterval() {
        const date = fromString(startDate.value);
        const start = startOfWeek(date);

        days.value = eachDayOfInterval(start, interval);
    }

    onMounted(getInterval);
    watch(startDate, getInterval);

    return days;
}
