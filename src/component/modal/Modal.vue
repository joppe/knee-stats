<template>
    <div class="modal">
        <div class="modal__backdrop" />
        <div class="modal__content">
            <header class="modal__header">
                <h1>{{ title }}</h1>
                <button type="button" @click="close" class="modal__close">
                    x
                </button>
            </header>

            <section class="modal__body">
                <slot></slot>
            </section>
        </div>
    </div>
</template>

<style lang="scss">
$space: 10px;

.modal {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    &__backdrop {
        position: absolute;
        z-index: 1;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.8);
    }

    &__header {
        margin-bottom: 20px;
    }

    &__content {
        position: absolute;
        z-index: 2;
        top: $space;
        right: $space;
        bottom: $space;
        left: $space;
        padding: 20px;
        background-color: #fff;
    }

    &__close {
        position: absolute;
        top: $space;
        right: $space;
    }
}
</style>

<script>
export default {
    name: 'Modal',
    props: {
        title: String,
    },
    emits: ['close'],
    methods: {
        close() {
            this.$emit('close');
        },
    },
};
</script>
