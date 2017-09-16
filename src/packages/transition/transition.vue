<template>
    <transition @enter="enter" @leave="leave">
        <slot></slot>
    </transition>
</template>
<script>
import velocity from 'velocity-animate';

const EffectMaps = {
    '': ['', ''],
    'fade': ['fadeIn', 'fadeOut'],
    'slide': ['slideDown', 'slideUp'],
};
const DurationExceptEffects = ['fadeOut'];

export default {
    name: 'DTransition',
    props: {
        duration: {
            type: Number,
            default: 200
        },
        name: {
            type: String,
            default: 'slide'
        }
    },
    methods: {
        animation(el, effect, done) {
            if (!effect) {
                done();
                return;
            }
            velocity(el, effect, {
                duration: DurationExceptEffects.indexOf(effect) > -1 ? 0 : this.duration,
                easing: 'easeInOutQuad',
                complete: done
            });
        },
        enter(el, done) {
            this.animation(el, EffectMaps[this.name][0], done);
        },
        leave(el, done) {
            this.animation(el, EffectMaps[this.name][1], done);
        }
    }
}
</script>
