<template>
    <div class="exercise">
        <h2>Exercise</h2>

        <em v-if="entries.length === 0">No exercises found</em>

        <ul>
            <li v-for="(entry, index) in entries" :key="index">
                {{ entry.sets }} x {{ entry.repetitions }} x
                {{ entry.weight }}kg
                <button type="button" @click="remove(index)">x</button>
            </li>
        </ul>

        <button
            type="button"
            v-if="showForm === false"
            @click="showForm = true"
        >
            +
        </button>

        <form class="exercise-form" v-if="showForm">
            <div class="exercise-form__field">
                <label for="form-field-sets" class="exercise-form__label"
                    >Sets</label
                >
                <input
                    id="form-field-sets"
                    type="number"
                    v-model.number="sets"
                    class="exercise-form__input"
                />
            </div>
            <div class="exercise-form__field">
                <label for="form-field-repetitions" class="exercise-form__label"
                    >Repetitions</label
                >
                <input
                    id="form-field-repetitions"
                    type="number"
                    v-model.number="repetitions"
                    class="exercise-form__input"
                />
            </div>
            <div class="exercise-form__field">
                <label for="form-field-weight" class="exercise-form__label"
                    >Weight</label
                >
                <input
                    id="form-field-weight"
                    type="number"
                    v-model.number="weight"
                    class="exercise-form__input"
                />
            </div>
            <div class="exercise-form__actions">
                <button
                    type="button"
                    @click="add()"
                    class="exercise-form__button"
                >
                    add
                </button>
                <button
                    type="button"
                    @click="cancel()"
                    class="exercise-form__button"
                >
                    cancel
                </button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'ExerciseForm',
    emits: ['update:exercise'],
    props: {
        exercise: {
            type: Array,
        },
    },
    data() {
        return {
            entries: this.exercise,
            showForm: false,
            sets: 0,
            repetitions: 0,
            weight: 0,
        };
    },
    methods: {
        reset() {
            this.sets = 0;
            this.repetitions = 0;
            this.weight = 0;
        },
        remove(index) {
            this.entries = [
                ...this.entries.slice(0, index),
                ...this.entries.slice(index + 1),
            ];
            this.$emit('update:exercise', this.entries);
        },
        add() {
            this.entries.push({
                sets: this.sets,
                repetitions: this.repetitions,
                weight: this.weight,
            });
            this.$emit('update:exercise', this.entries);
            this.reset();
            this.showForm = false;
        },
        cancel() {
            this.reset();
            this.showForm = false;
        },
    },
};
</script>

<style lang="scss">
.exercise {
    margin-bottom: map-get($spacing, 'lg');
    padding: map-get($spacing, 'md');
    border: 1px solid $black;
}
.exercise-form {
    display: flex;

    &__field {
        width: 100px;
        margin-right: map-get($spacing, 'md');
    }

    &__label {
        font-size: map-get($font-size, 'sm');
        color: $grey--dark-gray;
    }

    &__input {
        width: 100%;
    }

    &__actions {
        display: flex;
    }

    &__button {
        margin-top: auto;

        &:first-of-type {
            margin-right: map-get($spacing, 'sm');
        }
    }
}
</style>
