<template>
    <Form>
        <template v-slot:fields>
            <FormRow id="form-field-date" label="Date">
                <input
                    type="date"
                    id="form-field-date"
                    v-model="date"
                    disabled
                />
            </FormRow>
            <FormRow id="form-field-score" label="Sore">
                <RangeField
                    id="form-field-score"
                    :min="0"
                    :max="10"
                    :step="1"
                    v-model:value="score"
                />
            </FormRow>
            <FormRow id="form-field-stairs" label="Stairs">
                <RangeField
                    id="form-field-stairs"
                    :min="0"
                    :max="10"
                    :step="1"
                    v-model:value="stairs"
                />
            </FormRow>
            <FormRow id="form-field-muscle-strain" label="Muscle strain">
                <RangeField
                    id="form-field-muscle-strain"
                    :min="0"
                    :max="10"
                    :step="1"
                    v-model:value="muscleStrain"
                />
            </FormRow>
            <FormRow id="form-field-remark" label="Remark">
                <textarea id="form-field-remark" v-model="remark" />
            </FormRow>
        </template>

        <template v-slot:actions>
            <button type="button" @click="save()">save</button>
            <button type="button" @click="cancel()">cancel</button>
        </template>
    </Form>
</template>

<script>
import Form from '@/component/form/Form';
import FormRow from '@/component/form/FormRow';
import RangeField from '@/component/form/field/RangeField';
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
        Form,
        FormRow,
        RangeField,
    },
    data() {
        const date = fromTimestamp(this.stat.date.seconds);

        return {
            date: toString(date),
            score: this.stat.score,
            stairs: this.stat.stairs,
            exercise: [],
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
                exercise: this.exercise,
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
