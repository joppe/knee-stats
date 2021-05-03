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

        <Form is-inline v-if="showForm">
            <template v-slot:fields>
                <FormField id="form-field-type" label="Type" is-inline>
                    <select
                        id="form-field-type"
                        v-model="type"
                        class="exercise__form__select"
                    >
                        <option
                            v-for="t in types"
                            :key="t.name"
                            :value="t.name"
                        >
                            {{ t.label }}
                        </option>
                    </select>
                </FormField>
                <FormField id="form-field-sets" label="Sets" is-inline is-small>
                    <input
                        id="form-field-sets"
                        type="number"
                        v-model.number="sets"
                        class="exercise__form__input"
                        @focus="handleFocus($event)"
                    />
                </FormField>
                <FormField
                    id="form-field-repetitions"
                    label="Reps"
                    is-inline
                    is-small
                >
                    <input
                        id="form-field-repetitions"
                        type="number"
                        v-model.number="repetitions"
                        class="exercise__form__input"
                        @focus="handleFocus($event)"
                    />
                </FormField>
                <FormField
                    id="form-field-weight"
                    label="Weight"
                    is-inline
                    is-small
                >
                    <input
                        id="form-field-weight"
                        type="number"
                        v-model.number="weight"
                        class="exercise__form__input"
                        @focus="handleFocus($event)"
                    />
                </FormField>
            </template>

            <template v-slot:actions>
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
            </template>
        </Form>
    </div>
</template>

<script>
import Form from './Form';
import FormField from './FormField';

export default {
    name: 'ExerciseForm',
    emits: ['update:exercise'],
    props: {
        exercise: {
            type: Array,
        },
    },
    components: {
        Form,
        FormField,
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
        &__input {
            width: 100%;
        }

        &__select {
            width: 100%;
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
