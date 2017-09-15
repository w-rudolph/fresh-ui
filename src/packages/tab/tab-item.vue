<template>
    <div class="d-tab__item" v-show="visible">
        <slot></slot>
    </div>
</template>
<script>

export default {
    name: 'DTabItem',
    props: {
        transition: {
            type: String,
            default: 'fade'
        }
    },
    data() {
        return {
            visible: false,
        }
    },

    methods: {
        show() {
            this.visible = true;
        },
        hide() {
            this.visible = false;
        },
    },
}
</script>
