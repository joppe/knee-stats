<template>
    <div
        class="form-field"
        :class="{
            'form-field--column': isInline,
            'form-field--row': !isInline,
            'form-field--small': isSmall,
        }"
    >
        <label :for="id" class="form-field__label">{{ label }}</label>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'FormField',
    props: {
        id: String,
        label: String,
        isInline: {
            type: Boolean,
            default: false,
        },
        isSmall: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss">
.form-field {
    &--row {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;

        .form-field__label {
            margin-bottom: 10px;
        }
    }

    &--column {
        width: 150px;
        margin-right: map-get($spacing, 'md');

        &.form-field--small {
            width: 50px;
        }

        .form-field__label {
            font-size: map-get($font-size, 'sm');
            color: $grey--dark-gray;
        }
    }
}
</style>
