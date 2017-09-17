<template>
    <div class="container">
        <h3>Aside 组件</h3>
        <hr>
        <br>
        <d-button @click="handleToggleClick('left')">left</d-button>
        <d-button @click="handleToggleClick('right')">right</d-button>
        <d-button @click="handleToggleClick('top')">top</d-button>
        <d-button @click="handleToggleClick('bottom')">bottom</d-button>
        <d-aside :visible.sync="placement.left" placement="left">
            <div>Left Aside</div>
        </d-aside>
        <d-aside :visible.sync="placement.right" placement="right">
            <div>Right Aside</div>
        </d-aside>
        <d-aside :visible.sync="placement.top" placement="top">
            <div>Top Aside</div>
        </d-aside>
        <d-aside :visible.sync="placement.bottom" placement="bottom">
            <div>Bottom Aside</div>
        </d-aside>
    </div>
</template>

<script>
export default {
    data() {
        return {
            placement: {
                top: false,
                right: false,
                bottom: false,
                left: false
            }
        }
    },
    methods: {
        handleToggleClick(placement) {
            this.placement[placement] = !this.placement[placement];
        }
    }
}
</script>
