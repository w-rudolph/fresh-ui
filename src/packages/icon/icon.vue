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
        }
    },
    computed: {
        computedClass() {
            return 'd-icon d-icon-' + this.name;
        }
    },
    methods: {
        handleIconClick(e) {
            this.$emit('click', e);
        }
    }
}
</script>