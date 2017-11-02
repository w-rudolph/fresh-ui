<template>
    <div class="container" style="padding-bottom: 20px;">
        <h3>Carousel 组件</h3>
        <hr>
        <h4>Basic</h4>
        <d-carousel :initial-index="2" :height="250" style="width: 250px;display:inline-block">
            <d-carousel-item v-for="i in 4" :key="i">
                <div class="demo-carousel-content">{{i}}</div>
            </d-carousel-item>
        </d-carousel>
        <h4>Show Arrow</h4>
        <d-carousel arrow="always" :height="250" style="width: 250px;display:inline-block">
            <d-carousel-item v-for="i in 4" :key="i">
                <div class="demo-carousel-content">{{i}}</div>
            </d-carousel-item>
        </d-carousel>
        <h4>Trigger: click</h4>
        <d-carousel trigger="click" :height="250" style="width: 250px;display:inline-block">
            <d-carousel-item v-for="i in 4" :key="i">
                <div class="demo-carousel-content">{{i}}</div>
            </d-carousel-item>
        </d-carousel>
        <h4>Indicator: outside</h4>
        <d-carousel indicator="outside" :height="250" style="width: 250px;display:inline-block">
            <d-carousel-item v-for="i in 4" :key="i">
                <div class="demo-carousel-content">{{i}}</div>
            </d-carousel-item>
        </d-carousel>
        <h4>Indicator type: dot</h4>
        <d-carousel indicator-type="dot" :height="250" style="width: 250px;display:inline-block">
            <d-carousel-item v-for="i in 4" :key="i">
                <div class="demo-carousel-content">{{i}}</div>
            </d-carousel-item>
        </d-carousel>
        <h4>Auto play</h4>
        <d-carousel autoplay :height="250" style="width: 250px;display:inline-block">
            <d-carousel-item v-for="i in 4" :key="i">
                <div class="demo-carousel-content">{{i}}</div>
            </d-carousel-item>
        </d-carousel>
        <h4>Multi items</h4>
        <d-carousel :item-width="200" :height="250" style="width: 550px;display:inline-block">
            <d-carousel-item v-for="i in count" :key="i">
                <div class="demo-carousel-content" style="border:1px solid #fff">{{i}}</div>
            </d-carousel-item>
        </d-carousel>
        <h4>Add/Remove item</h4>
        <d-carousel trigger="click" arrow="always" :height="250" style="width: 450px;display:inline-block">
            <d-carousel-item v-for="i in count" :key="i">
                <div class="demo-carousel-content">{{i}}</div>
            </d-carousel-item>
        </d-carousel>
        <d-button icon="plus" @click="updateCount(1)"></d-button>
        <d-button icon="minus" @click="updateCount(-1)"></d-button>

        <h4>disable loop</h4>
        <d-carousel :loop="false" :height="250" style="width: 250px;display:inline-block">
            <d-carousel-item v-for="i in 4" :key="i">
                <div class="demo-carousel-content">{{i}}</div>
            </d-carousel-item>
        </d-carousel>
    </div>
</template>
<script>
export default {
    data() {
        return {
            count: 9,
        }
    },
    methods: {
        updateCount(f) {
            let count = this.count + f;;
            if (count < 0) {
                count = 0;
            }
            this.count = count;
        }
    }
}
</script>
<style>
.demo-carousel-content {
  text-align: center;
  vertical-align: middle;
  height: 250px;
  line-height: 250px;
  background: #ddd;
}
</style>

