<template>
    <div class="container">
        <h3>Progress 组件</h3>
        <br>
        <div>
            <h4>Type: line</h4>
            <d-progress style="width: 200px;" :percent="p">{{p + '%'}}</d-progress>
            <hr>
            <h4>Type: circle</h4>
            <h5>basic</h5>
            <d-progress :percent="p" type="circle">{{p + '%'}}</d-progress>
            <h5>stroke color</h5>
            <d-progress :percent="p" type="circle" stroke-color="#f00">
                <div style="color: red">aaaa</div>
                <div style="color: green">bbb</div>
                <div style="color: blue">ccc</div>
            </d-progress>
            <h5>set width and stroke-width</h5>
            <d-progress :percent="p" type="circle" :stroke-width="8" :width="160">{{p + '%'}}</d-progress>
            <d-button @click="handleClick">
                <d-icon name="plus"></d-icon>
            </d-button>
            <d-button @click="handleClick(false)">
                <d-icon name="minus"></d-icon>
            </d-button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            p: 50
        }
    },
    computed: {
        c() {
            return Math.PI * 2 * 100;
        },
        offset() {
            return this.c - this.p / 100 * this.c;
        }

    },
    methods: {
        handleClick(f = true) {
            if (f) {
                if (this.p + 5 > 100) {
                    this.p = 100;
                } else {
                    this.p += 5;
                }
            } else {
                if (this.p - 5 < 0) {
                    this.p = 0;
                } else {
                    this.p -= 5;
                }
            }
        }
    }
}
</script>
