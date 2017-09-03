<template>
    <button :disabled="disabled" @click="handleBtnClick" :class="computedClass">
        <slot></slot>
    </button>
</template>
<script>
export default {
    name: 'DButton',
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: ''
        }
    },
    computed: {
        computedClass() {
            const type = this.type ? ' d-btn--' + this.type : ' is-default';
            const size = this.size ? ' d-btn--' + this.size : '';
            return 'd-btn' + type + size;
        }
    },
    methods: {
        handleBtnClick(e) {
            this.$emit('click', e);
        }
    }
}
</script>