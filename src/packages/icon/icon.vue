<template>
    <i :class="computedClass" @click="handleIconClick">
    </i>
</template>
<script>
export default {
    name: 'DIcon',
    props: {
        name: {
            type: String,
            default: false,
        },
        size: {
            type: String,
            default: ''
        }
    },
    computed: {
        computedClass() {
            return 'fa fa-' + this.name + (this.size ? ' fa-' + this.size : '');
        }
    },
    methods: {
        handleIconClick(e) {
            this.$emit('click', e);
        }
    }
}
</script>