<template>
    <div class="d-timeline-item">
        <div class="d-timeline-item__line"></div>
        <div class="d-timeline-item__endpoint">
            <div class="d-timeline-item__endpoint-icon">
                <span class="icon">222</span>
            </div>
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
