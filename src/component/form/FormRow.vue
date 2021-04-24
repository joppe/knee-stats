<template>
    <div class="form-row">
        <label :for="id" class="form-row__label">{{ label }}</label>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'FormRow',
    props: {
        id: String,
        label: String,
    },
};
</script>

<style lang="scss">
.form-row {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    &__label {
        margin-bottom: 10px;
    }
}
</style>
