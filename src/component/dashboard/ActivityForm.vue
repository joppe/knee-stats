<template>
    <div class="activity">
        <h2>Activity</h2>

        <em v-if="entries.length === 0 && showForm === false"
            >No activities found</em
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
                        class="activity__form__select"
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

                <FormField
                    id="form-field-duration"
                    label="Duration"
                    is-inline
                    is-small
                >
                    <input
                        id="form-field-duration"
                        type="number"
                        v-model.number="duration"
                        class="activity__form__input"
                        @focus="handleFocus($event)"
                    />
                </FormField>

                <FormField
                    id="form-field-intensity"
                    label="Intensity"
                    is-inline
                >
                    <input
                        id="form-field-intensity"
                        type="range"
                        min="0"
                        max="5"
                        step="1"
                        v-model.number="intensity"
                        class="activity__form__input"
                        @focus="handleFocus($event)"
                    />
                </FormField>
            </template>

            <template v-slot:actions>
                <button
                    type="button"
                    @click="add()"
                    class="activity__form__button"
                >
                    add
                </button>
                <button
                    type="button"
                    @click="cancel()"
                    class="activity__form__button"
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
    name: 'ActivityForm',
    emits: ['update:activities'],
    props: {
        activities: {
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
            entries: this.activities,
            showForm: false,
            intensity: 0,
            duration: 0,
            type: 'walking',
            types: [
                {
                    name: 'cycling',
                    label: 'Cycling',
                },
                {
                    name: 'tandem',
                    label: 'Tandem',
                },
                {
                    name: 'walking',
                    label: 'Walking',
                },
                {
                    name: 'surfing',
                    label: 'Surfing',
                },
            ],
        };
    },
    computed: {
        listData() {
            return this.entries.map((entry) => {
                return `${this.getTypeLabel(entry.type)}: ${
                    entry.duration
                } minutes - ${entry.intensity} intensity`;
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
            this.intensity = 0;
            this.duration = 0;
            this.type = 'walking';
        },
        handleRemove(index) {
            this.entries = [
                ...this.entries.slice(0, index),
                ...this.entries.slice(index + 1),
            ];
            this.$emit('update:activities', this.entries);
        },
        add() {
            this.entries.push({
                intensity: this.intensity,
                duration: this.duration,
                type: this.type,
            });
            this.$emit('update:activities', this.entries);
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
.activity {
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
