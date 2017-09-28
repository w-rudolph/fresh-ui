<template>
    <transition @beforeEnter="beforeEnter" @enter="enter" @afterEnter="afterEnter" @beforeLeave="beforeLeave" @leave="leave" @afterLeave="afterLeave">
        <slot></slot>
    </transition>
</template>
<script>
import { addClass, removeClass } from '../utils/dom.js';

export default {
    name: 'CollapseTransition',
    methods: {
        beforeEnter(el) {
            el.style.height = '0';
            addClass(el, 'collapse-transition');
        },
        enter(el) {
            el.style.height = el.scrollHeight + 'px';
        },
        afterEnter(el) {
            el.style.height = '';
            removeClass(el, 'collapse-transition');
        },

        beforeLeave(el) {
            el.style.height = el.scrollHeight + 'px';
            addClass(el, 'collapse-transition');
        },

        leave(el) {
            if (el.scrollHeight !== 0) {
                el.style.height = '0';
            }
        },
        afterLeave(el) {
            el.style.height = '';
            removeClass(el, 'collapse-transition');
        }
    }
}
</script>
