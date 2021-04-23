<template>
    <form class="form">
        <slot name="fields"></slot>

        <div class="form__actions">
            <slot name="actions"></slot>
        </div>
    </form>
</template>

<style lang="scss">
.form {
    padding: map-get($spacing, 'md');

    &__actions {
        display: flex;
        justify-content: flex-end;
    }
}
</style>

<script>
export default {
    name: 'Form',
};
</script>
