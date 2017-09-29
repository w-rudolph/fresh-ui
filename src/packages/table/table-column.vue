<template>
    <div class="d-table__column">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'DTableColumn',
    props: {
        label: {
            type: String,
            default: '',
        },
        prop: {
            type: String,
            default: '',
        },
        width: {
            type: String,
            default: ''
        }
    },
    data() {
        return {

        }
    }
}
</script>
