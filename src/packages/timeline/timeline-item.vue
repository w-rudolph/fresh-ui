<template>
    <div class="d-timeline-item">
        <div class="d-timeline-item__line"></div>
        <div :class="['d-timeline-item__endpoint', $slots.point ? 'custom' : '']">
            <slot name="point"></slot>
        </div>
        <div class="d-timeline-item__content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'DTimelineItem'
}
</script>
