<template>
    <div class="range">
        <div class="range__value">{{ val }}</div>
        <input
            type="range"
            min="0"
            max="10"
            step="1"
            :id="id"
            :value="value"
            @input="update($event.target.value)"
            class="range__input"
        />
    </div>
</template>

<script>
export default {
    name: 'RangeField',
    props: {
        id: String,
        min: Number,
        max: Number,
        step: Number,
        value: Number,
    },
    emits: ['update:value'],
    data() {
        return {
            val: this.value,
        };
    },
    methods: {
        update(value) {
            this.val = value;
            this.$emit('update:value', value);
        },
    },
};
</script>

<style lang="scss">
.range {
    display: flex;
}

.range__value {
    margin-right: map-get($spacing, 'lg');
    padding: map-get($spacing, 'md');
    border: 1px solid $black;
    border-radius: 3px;
    font-size: map-get($font-size, 'xl');
}

.range__input {
    width: 100%;
}
</style>
