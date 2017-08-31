import Vue from 'vue';

Vue.directive('popper', {
    bind(el, binding, vnode) {
        const $popper = vnode.context.$refs[binding.arg];
        $popper.reference = el;
    }
});