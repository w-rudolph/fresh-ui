<template>
    <transition @beforeEnter="beforeEnter" @enter="enter" @beforeLeave="beforeLeave">
        <slot></slot>
    </transition>
</template>
<script>

export default {
    name: 'CollapseTransition',
    methods: {
        beforeEnter(el){
            el.style.height = "0px";
            el.style.visibility = "hidden";
            el.style.transition = 'all 0.3s ease-in-out';
        },
        enter(el, done) {
            el.style.visibility = "visible";
            el.style.height = el.scrollHeight + "px";
            done();
        },
        beforeLeave(el) {
            el.style.visibility = "hidden";
            el.style.height = "0px";
        }
    }
}
</script>
