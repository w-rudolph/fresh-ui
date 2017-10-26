<template>
    <div class="d-timeline-item">
        <div class="d-timeline-item__line" :style="lineStyle"></div>
        <div :class="['d-timeline-item__endpoint', $slots.point ? 'custom' : '']" :style="pointStyle">
            <slot name="point"></slot>
        </div>
        <div class="d-timeline-item__content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        lineStyle: {
            type: Object,
            default: () => {}
        },
        pointStyle: {
            type: Object,
            default: () => {}
        }
    },
    name: 'DTimelineItem'
}
</script>
