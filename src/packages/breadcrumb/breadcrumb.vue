<template>
    <div class="d-breadcrumb">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'DBreadcrumb',
    props: {
        separator: {
            type: String,
            default: '/'
        },
        separatorStyle: {
            type: Object,
            default: () => {}
        },
        separatorClass: {
            type: String,
            default: ''
        }
    }
}
</script>
