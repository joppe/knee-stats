import { startOfWeek } from './startOfWeek';
import { addDays } from '@/date/addDays';

export function eachDayOfInterval(currentDate, length) {
    const start = startOfWeek(currentDate);

    return Array.from({ length }, (value, i) => {
        return addDays(start, i);
    });
}
