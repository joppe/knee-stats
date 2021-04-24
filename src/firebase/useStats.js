import { db } from '@/firebase/firebase';
import { ref, onUnmounted } from 'vue';

const collection = db.collection('stats');

export function createStat(entry) {
    return collection.add(entry);
}

export function updateStat(id, entry) {
    return collection.doc(id).update(entry);
}

export function deleteStat(id) {
    return collection.doc(id).delete();
}

export function useStats() {
    const stats = ref([]);
    const unsubscribe = collection.onSnapshot((snapshot) => {
        stats.value = snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        });
    });

    onUnmounted(unsubscribe);

    return stats;
}
