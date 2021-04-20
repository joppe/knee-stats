<template>
    <main class="app">
        <h1 class="app__title">Knee stats</h1>

        <List
            :fields="[
                { prop: 'date', label: 'Date' },
                { prop: 'score', label: 'Score' },
                { prop: 'stairs', label: 'Stairs' },
                { prop: 'exercise', label: 'Exercise intensity' },
            ]"
            :data="history"
            class="app__list"
        />

        <div class="app__actions">
            <Trigger label="Add score">
                <template v-slot="{ closeHandler }">
                    <AddEntry
                        @save="onAdd($event), closeHandler()"
                        @cancel="closeHandler"
                    />
                </template>
            </Trigger>
        </div>
    </main>
</template>

<style lang="scss">
body {
    margin: 0;
    padding: 0;
    font-family: 'Noto Serif';
    font-size: 16px;
    line-height: 21px;
    color: #000;
}

h1 {
    margin: 0;
    padding: 0;
}

button {
    padding: 0 10px;
    border: 1px solid #000;
    border-radius: 3px;
    line-height: 25px;
    cursor: pointer;
}

textarea {
    height: 150px;
}

.app {
    padding: 20px;

    &__title {
        margin-bottom: 20px;
    }

    &__list {
        margin-bottom: 20px;
    }

    &__actions {
        display: flex;
        justify-content: flex-end;
    }
}
</style>

<script>
import List from './component/list/List';
import Trigger from './component/modal/Trigger';
import AddEntry from './component/AddEntry';

export default {
    name: 'App',
    components: {
        AddEntry,
        List,
        Trigger,
    },
    data() {
        return {
            history: [
                {
                    date: '2021-04-07',
                    score: 8,
                    stairs: 9,
                    exercise: 1,
                    muscleStrain: false,
                    remark: '',
                },
                {
                    date: '2021-04-08',
                    score: 7,
                    stairs: 7,
                    exercise: 5,
                    muscleStrain: false,
                    remark: '',
                },
                {
                    date: '2021-04-09',
                    score: 8,
                    stairs: 9,
                    exercise: 0,
                    muscleStrain: false,
                    remark: 'ran for 20m',
                },
                {
                    date: '2021-04-10',
                    score: 7,
                    stairs: 8,
                    exercise: 0,
                    muscleStrain: false,
                    remark: '',
                },
            ],
        };
    },
    methods: {
        onAdd(newEntry) {
            this.history.push(newEntry);
        },
    },
};
</script>
