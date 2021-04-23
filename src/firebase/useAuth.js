import { auth } from '@/firebase/firebase';
import { ref, onUnmounted, computed } from 'vue';

export function useAuth() {
    const user = ref(null);
    const unsubscribe = auth.onAuthStateChanged((u) => {
        user.value = u;
    });
    const isLoggedIn = computed(() => user.value !== null);

    onUnmounted(unsubscribe);

    return {
        user,
        isLoggedIn() {
            return isLoggedIn.value;
        },
        async login(email, password) {
            try {
                await auth.signInWithEmailAndPassword(email, password);

                return true;
            } catch (e) {
                return false;
            }
        },
        async logout() {
            await auth.signOut();
        },
    };
}
