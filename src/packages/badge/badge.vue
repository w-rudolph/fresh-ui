<template>
    <div :class="['d-badge', isDot ? 'is-dot' : '']">
        <slot></slot>
        <span class="d-badge__num">{{getValue()}}</span>
    </div>
</template>
<script>
export default {
    name: 'DBadge',
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        max: {
            type: Number,
            default: -Infinity
        },
        isDot: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        getValue() {
            if (this.isDot) {
                return '';
            }
            if (
                parseInt(this.value) == this.value &&
                this.max !== -Infinity &&
                parseInt(this.value) > this.max
            ) {
                return this.max + '+'
            }
            return this.value;
        }
    }
}
</script>
