<template>
    <form class="form">
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
        <FormRow id="form-field-exercise" label="Exercise">
            <input
                type="range"
                min="0"
                max="10"
                step="1"
                id="form-field-exercise"
                v-model="exercise"
            />
        </FormRow>
        <FormRow id="form-field-muscle-strain" label="Muscle strain">
            <input
                type="checkbox"
                id="form-field-muscle-strain"
                v-model="muscleStrain"
            />
        </FormRow>
        <FormRow id="form-field-remark" label="Remark">
            <textarea id="form-field-remark" v-model="remark" />
        </FormRow>

        <div class="form__actions">
            <button type="button" @click="save()" class="form__action">
                save
            </button>
            <button type="button" @click="cancel()" class="form__action">
                cancel
            </button>
        </div>
    </form>
</template>

<script>
import FormRow from '@/component/form/FormRow';

export default {
    name: 'AddEntry',
    emits: ['save', 'cancel'],
    components: { FormRow },
    data() {
        return {
            date: this.dateToString(new Date()),
            score: 6,
            stairs: 6,
            exercise: 0,
            muscleStrain: false,
            remark: '',
        };
    },
    methods: {
        dateToString(date) {
            const year = date.getFullYear();
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            const day = ('0' + date.getDate()).slice(-2);

            return `${year}-${month}-${day}`;
        },
        reset() {
            this.date = this.dateToString(new Date());
            this.score = 6;
            this.stairs = 6;
            this.exercise = 0;
            this.muscleStrain = false;
            this.remark = '';
        },
        save() {
            this.$emit('save', {
                date: this.date,
                score: this.score,
                stairs: this.stairs,
                exercise: this.exercise,
                muscleStrain: this.muscleStrain,
                remark: this.remark,
            });
            this.reset();
        },
        cancel() {
            this.reset();
            this.$emit('cancel');
        },
    },
};
</script>

<style lang="scss">
.form {
    &__actions {
        display: flex;
        justify-content: flex-end;
    }

    &__action {
        margin-left: 20px;
    }
}
</style>
