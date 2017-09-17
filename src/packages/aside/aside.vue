<template>
    <div :class="['d-aside', visible ? 'visible' : '', placement]">
        <d-icon class="d-aside__icon" name="close" @click="handleClick"></d-icon>
        <slot></slot>
    </div>
</template>
<script>
import DIcon from '../icon/icon';

export default {
    name: 'DAside',
    components: { DIcon },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        placement: {
            type: String,
            default: 'left'
        }
    },

    watch: {
        visible(val) {
            this.$emit('update:visible', val);
        }
    },
    methods: {
        handleClick() {
            this.$emit('update:visible', false);
            this.$emit('visible-change', false);
        }
    }
}
</script>
