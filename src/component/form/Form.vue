<template>
    <form class="form">
        <slot name="fields"></slot>

        <div class="form__actions">
            <slot name="actions"></slot>
        </div>
    </form>
</template>

<script>
export default {
    name: 'Form',
};
</script>

<style lang="scss">
.form {
    padding: map-get($spacing, 'md');

    &__actions {
        display: flex;
        justify-content: flex-end;
    }
}
</style>
