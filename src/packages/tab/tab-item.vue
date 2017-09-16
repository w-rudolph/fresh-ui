<template>
    <d-transition :name="transition">
        <div :class="['d-tab__item']" v-show="visible">
            <slot></slot>
        </div>
    </d-transition>
</template>
<script>
import DTransition from '../transition/transition.vue';

export default {
    name: 'DTabItem',
    components: { DTransition },
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
