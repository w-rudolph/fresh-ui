<template>
    <transition :name="transition">
        <div :class="['d-tab__item', visible ? 'active' : '']" v-show="visible">
            <slot></slot>
        </div>
    </transition>
</template>
<script>

export default {
    name: 'DTabItem',
    props: {
        transition: {
            type: String,
            default: 'tab-fade'
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
