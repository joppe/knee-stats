<template>
    <Form>
        <template v-slot:fields>
            <FormRow id="form-field-date" label="Date">
                <input type="date" id="form-field-date" v-model="date" />
            </FormRow>
            <FormRow id="form-field-score" label="Sore">
                <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    id="form-field-score"
                    v-model="score"
                />
            </FormRow>
            <FormRow id="form-field-stairs" label="Stairs">
                <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    id="form-field-stairs"
                    v-model="stairs"
                />
            </FormRow>
            <FormRow id="form-field-muscle-strain" label="Muscle strain">
                <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    id="form-field-muscle-strain"
                    v-model="muscleStrain"
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
                score: parseInt(this.score, 10),
                stairs: parseInt(this.stairs, 10),
                exercise: this.exercise,
                muscleStrain: parseInt(this.muscleStrain, 10),
                remark: this.remark,
            });
        },
        cancel() {
            this.$emit('cancel');
        },
    },
};
</script>
