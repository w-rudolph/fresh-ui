<template>
    <div :class="['d-form', inlineClass, labelPositionClass]">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'DForm',
    props: {
        labelWidth: {
            type: String,
            default: ''
        },
        inline: {
            type: Boolean,
            default: false
        },
        labelPosition: {
            type: String,
            default: ''  // [right, left, top]
        }
    },
    computed: {
        inlineClass() {
            return this.inline ? 'd-form--inline' : '';
        },
        labelPositionClass() {
            return this.labelPosition ? 'd-form__label-' + this.labelPosition : ''
        }
    }
}
</script>
