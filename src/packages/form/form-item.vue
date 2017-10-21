<template>
    <div class="d-form-item">
        <div class="d-form-item__label" :style="labelStyle">{{label}}</div>
        <div class="d-form-item__content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'DFormItem',
    props: {
        label: {
            type: String,
            default: ''
        }
    },
    computed: {
        labelStyle() {
            return {
                width: this.$parent.labelWidth
            }
        }
    }
}
</script>
