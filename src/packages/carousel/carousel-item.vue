<template>
    <div :class="['d-carousel-item', active ? 'is-active' : '']" :style="transformStyle">
        <slot></slot>
    </div>
</template>
<script>
import DIcon from '../icon/icon';
import EventEmitter from '../mixins/event_emitter';

export default {
    name: 'DCarouselItem',
    components: { DIcon },
    mixins: [EventEmitter],
    data() {
        return {
            active: false,
            transformStyle: {}
        }
    },
    created() {
        this.dispatch('DCarousel', 'carousel.item.add', this);
    },
    beforeDestroy(){
        this.dispatch('DCarousel', 'carousel.item.remove', this);
    }
}
</script>
