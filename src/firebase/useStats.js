import { db } from '@/firebase/firebase';
import { ref, onUnmounted } from 'vue';

const collection = db.collection('entries');

export function addEntry(entry) {
    return collection.add(entry);
}

export function updateEntry(id, entry) {
    return collection.doc(id).update(entry);
}

export function deleteEntry(id) {
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
