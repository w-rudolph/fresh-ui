<template>
    <div class="d-slider" style="width:200px;">
        <button ref="btn" :style="posStyle" @mouseup="handleMouseUp" @mousedown="handleMOuseDown" @mousemove="handleMouseMove">move</button>
    </div>
</template>

<script>
export default {
    name: 'DSlider',
    data() {
        return {
            value: 0,
            startMouseDrag: false,
        }
    },
    computed: {
        posStyle() {
            return {
                transform: 'translate(' + this.value + 'px)'
            }
        }
    },
    methods: {
        handleMOuseDown() {
            this.startMouseDrag = true;
        },
        handleMouseMove(e) {
            const pos = {
                left: this.$el.offsetLeft,
                top: this.$el.offsetTop,
                width: this.$el.offsetWidth,
                cX: e.clientX,
                cY: e.clientY,
                sliderW: this.$refs.btn.offsetWidth
            }
            if (this.startMouseDrag) {
                let d = pos.cX - pos.left;
                d = d < 0 ? 0 : (d > pos.width - pos.sliderW ? pos.width - pos.sliderW : d);
                this.value = d;
                console.log(this.value);
            }
        },
        handleMouseUp() {
            this.startMouseDrag = false;
        }
    },
    mounted() {
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp)
    }
}
</script>
