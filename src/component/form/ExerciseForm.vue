<template>
    <div class="exercise">
        <h2>Exercise</h2>

        <em v-if="entries.length === 0">No exercises found</em>

        <ul class="exercise__list">
            <li
                v-for="(entry, index) in entries"
                :key="index"
                class="exercise__list-item"
            >
                {{ getTypeLabel(entry.type) }}: {{ entry.sets }} x
                {{ entry.repetitions }} x {{ entry.weight }}kg
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

        <form class="exercise__form" v-if="showForm">
            <div class="exercise__form__field">
                <label for="form-field-type" class="exercise__form__label"
                    >Type</label
                >
                <select
                    id="form-field-type"
                    v-model="type"
                    class="exercise__form__select"
                >
                    <option v-for="t in types" :key="t.name" :value="t.name">
                        {{ t.label }}
                    </option>
                </select>
            </div>
            <div class="exercise__form__field exercise__form__field--small">
                <label for="form-field-sets" class="exercise__form__label"
                    >Sets</label
                >
                <input
                    id="form-field-sets"
                    type="number"
                    v-model.number="sets"
                    class="exercise__form__input"
                    @focus="handleFocus($event)"
                />
            </div>
            <div class="exercise__form__field exercise__form__field--small">
                <label
                    for="form-field-repetitions"
                    class="exercise__form__label"
                    >Reps</label
                >
                <input
                    id="form-field-repetitions"
                    type="number"
                    v-model.number="repetitions"
                    class="exercise__form__input"
                    @focus="handleFocus($event)"
                />
            </div>
            <div class="exercise__form__field exercise__form__field--small">
                <label for="form-field-weight" class="exercise__form__label"
                    >Weight</label
                >
                <input
                    id="form-field-weight"
                    type="number"
                    v-model.number="weight"
                    class="exercise__form__input"
                    @focus="handleFocus($event)"
                />
            </div>
            <div class="exercise__form__actions">
                <button
                    type="button"
                    @click="add()"
                    class="exercise__form__button"
                >
                    add
                </button>
                <button
                    type="button"
                    @click="cancel()"
                    class="exercise__form__button"
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
            type: 'squad',
            types: [
                {
                    name: 'squads',
                    label: 'Squads',
                },
                {
                    name: 'lunges',
                    label: 'Lunges',
                },
                {
                    name: 'leg-extension',
                    label: 'Leg extension',
                },
                {
                    name: 'one-lge-squads',
                    label: 'One leg squads',
                },
            ],
        };
    },
    methods: {
        getTypeLabel(type) {
            return (
                this.types.find((t) => {
                    return t.name === type;
                })?.label ?? ''
            );
        },
        reset() {
            this.sets = 0;
            this.repetitions = 0;
            this.weight = 0;
            this.type = 'squad';
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
                type: this.type,
            });
            this.$emit('update:exercise', this.entries);
            this.reset();
            this.showForm = false;
        },
        cancel() {
            this.reset();
            this.showForm = false;
        },
        handleFocus(event) {
            event.target.select();
        },
    },
};
</script>

<style lang="scss">
.exercise {
    margin-bottom: map-get($spacing, 'lg');
    padding: map-get($spacing, 'md');
    border: 1px solid $black;

    &__list {
        list-style: disc;
        margin-left: 1em;
    }

    &__form {
        display: flex;

        &__field {
            width: 150px;
            margin-right: map-get($spacing, 'md');

            &--small {
                width: 50px;
            }
        }

        &__label {
            font-size: map-get($font-size, 'sm');
            color: $grey--dark-gray;
        }

        &__input {
            width: 100%;
        }

        &__select {
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
}
</style>
