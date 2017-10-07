<template>
    <div>
        <slot name="rendered"></slot>
    </div>
</template>
<script>

export default {
    name: 'DRender',
    props: {
        render: {
            type: Function,
            default() {
                return () => { };
            }
        }
    },
    created() {
        const rendered = this.render();
        this.$slots.rendered = [rendered];
    }
}
</script>
