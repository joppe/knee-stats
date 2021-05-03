<template>
    <div class="exercise">
        <h2>Exercise</h2>

        <em v-if="entries.length === 0 && showForm === false"
            >No exercises found</em
        >

        <List :entries="listData" @remove="handleRemove($event)" />

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
import Form from '../form/Form';
import FormField from '../form/FormField';
import List from '../list/List';

export default {
    name: 'ExerciseForm',
    emits: ['update:exercises'],
    props: {
        exercises: {
            type: Array,
        },
    },
    components: {
        Form,
        FormField,
        List,
    },
    data() {
        return {
            entries: this.exercises,
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
    computed: {
        listData() {
            return this.entries.map((entry) => {
                return `${this.getTypeLabel(entry.type)}: ${entry.sets} x ${
                    entry.repetitions
                } x ${entry.weight}kg`;
            });
        },
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
        handleRemove(index) {
            this.entries = [
                ...this.entries.slice(0, index),
                ...this.entries.slice(index + 1),
            ];
            this.$emit('update:exercises', this.entries);
        },
        add() {
            this.entries.push({
                sets: this.sets,
                repetitions: this.repetitions,
                weight: this.weight,
                type: this.type,
            });
            this.$emit('update:exercises', this.entries);
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
