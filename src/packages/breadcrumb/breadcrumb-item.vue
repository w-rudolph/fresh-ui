<template>
    <div class="d-breadcrumb-item">
        <div :class="['d-breadcrumb-item__link', linkClass]" :style="linkStyle">
            <slot></slot>
        </div>
        <div :class="['d-breadcrumb-item__separator', separatorClass]" :style="separatorStyle">{{separator}}</div>
    </div>
</template>
<script>
export default {
    name: 'DBreadcrumbItem',
    props: {
        linkStyle: {
            type: Object,
            default: () => { }
        },
        linkClass: {
            type: String,
            default: ''
        }
    },
    computed: {
        separator() {
            return this.$parent.separator;
        },
        separatorStyle() {
            return this.$parent.separatorStyle;
        },
        separatorClass() {
            return this.$parent.separatorClass;
        }
    }
}
</script>
