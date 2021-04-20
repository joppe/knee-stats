<template>
    <button type="button" @click="open">{{ label }}</button>

    <teleport to="body">
        <Modal v-if="show" @close="close" :title="label">
            <slot :closeHandler="close"></slot>
        </Modal>
    </teleport>
</template>

<script>
import Modal from './Modal';

export default {
    name: 'Trigger',
    components: {
        Modal,
    },
    props: {
        label: String,
    },
    data() {
        return {
            show: false,
        };
    },
    methods: {
        open() {
            this.show = true;
        },
        close() {
            this.show = false;
        },
    },
};
</script>
