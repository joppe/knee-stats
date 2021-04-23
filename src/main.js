import { createApp } from 'vue';
import App from '@/App.vue';
import { router } from '@/router/router';
import { isReady } from '@/firebase/firebase';

(async () => {
    await isReady();

    createApp(App).use(router).mount('#app');
})();
