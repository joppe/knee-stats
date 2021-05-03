<template>
    <form class="form" :class="{ 'form--inline': isInline }">
        <slot name="fields"></slot>

        <div class="form__actions">
            <slot name="actions"></slot>
        </div>
    </form>
</template>

<script>
export default {
    name: 'Form',
    props: {
        isInline: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss">
.form {
    padding: map-get($spacing, 'md');

    &--inline {
        display: flex;
        padding: 0;

        .form__actions * {
            margin-top: auto;

            &:first-child {
                margin-right: map-get($spacing, 'sm');
            }
        }
    }

    &__actions {
        display: flex;
        justify-content: flex-end;
    }
}
</style>
