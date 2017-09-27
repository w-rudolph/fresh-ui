<template>
    <li class="d-select-group">
        <ul class="d-select-group__item">
            <li class="d-select-group__title">{{label}}</li>
            <slot></slot>
        </ul>
    </li>
</template>
<script>
export default {
    name: 'DSelectGroup',
    props: {
        label: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            active: false,
        }
    }
}
</script>
