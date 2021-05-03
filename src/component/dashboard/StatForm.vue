<template>
    <Form class="stat-form">
        <template v-slot:fields>
            <FormField id="form-field-date" label="Date">
                <input
                    type="date"
                    id="form-field-date"
                    v-model="date"
                    disabled
                />
            </FormField>

            <FormField id="form-field-score" label="Sore">
                <RangeField
                    id="form-field-score"
                    :min="0"
                    :max="10"
                    :step="1"
                    v-model:value="score"
                />
            </FormField>

            <FormField id="form-field-stairs" label="Stairs">
                <RangeField
                    id="form-field-stairs"
                    :min="0"
                    :max="10"
                    :step="1"
                    v-model:value="stairs"
                />
            </FormField>

            <FormField id="form-field-muscle-strain" label="Muscle strain">
                <RangeField
                    id="form-field-muscle-strain"
                    :min="0"
                    :max="10"
                    :step="1"
                    v-model:value="muscleStrain"
                />
            </FormField>

            <ActivityForm v-model:activities="activities" />

            <ExerciseForm v-model:exercises="exercises" />

            <FormField id="form-field-remark" label="Remark">
                <textarea id="form-field-remark" v-model="remark" />
            </FormField>
        </template>

        <template v-slot:actions>
            <button type="button" @click="save()" class="stat-form__button">
                save
            </button>
            <button type="button" @click="cancel()" class="stat-form__button">
                cancel
            </button>
        </template>
    </Form>
</template>

<script>
import Form from '@/component/form/Form';
import FormField from '@/component/form/FormField';
import RangeField from '@/component/form/field/RangeField';
import ActivityForm from '@/component/dashboard/ActivityForm';
import ExerciseForm from '@/component/dashboard/ExerciseForm';
import { fromString } from '@/date/fromString';
import { fromTimestamp } from '@/date/fromTimestamp';
import { toString } from '@/date/toString';
import { toTimestamp } from '@/date/toTimestamp';

export default {
    name: 'StatForm',
    emits: ['save', 'cancel'],
    props: {
        stat: {
            type: Object,
            required: true,
        },
    },
    components: {
        ActivityForm,
        ExerciseForm,
        Form,
        FormField,
        RangeField,
    },
    data() {
        const date = fromTimestamp(this.stat.date.seconds);

        return {
            date: toString(date),
            score: this.stat.score,
            stairs: this.stat.stairs,
            exercises: this.stat.exercises ? this.stat.exercises.slice() : [],
            activities: this.stat.activities
                ? this.stat.activities.slice()
                : [],
            muscleStrain: this.stat.muscleStrain,
            remark: this.stat.remark,
        };
    },
    methods: {
        save() {
            const date = fromString(this.date);

            this.$emit('save', {
                id: this.stat.id,
                date: {
                    seconds: toTimestamp(date),
                    nanoseconds: 0,
                },
                score: this.score,
                stairs: this.stairs,
                exercises: this.exercises,
                activities: this.activities,
                muscleStrain: this.muscleStrain,
                remark: this.remark,
            });
        },
        cancel() {
            this.$emit('cancel');
        },
    },
};
</script>

<style lang="scss">
.stat-form {
    &__button {
        margin-left: map-get($spacing, 'md');
    }
}
</style>
