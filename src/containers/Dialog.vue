<template>
    <div class="container">
        <h3>Dialog 组件</h3>
        <hr>
        <d-dialog :visible.sync="visible" :body-scroll-lock="false">
            <div style="width:200px;height:300px;background:#fff">
                <button @click="show1">show</button>
            </div>
        </d-dialog>
        <d-dialog :visible.sync="visible1" size="large" title="dialog title">
            <div style="width:200px;height:300px;background:#fff">
                <button @click="show2">show</button>
            </div>
        </d-dialog>
         <d-dialog :visible.sync="visible2" size="full">
            <div>Full dialog</div>
        </d-dialog>
        <button @click="show">show</button>
        <button @click="close">close</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            visible: false,
            visible1: true,
            visible2: false,
        }
    },
    methods: {
        close() {
            this.visible = false;
        },
        show() {
            this.visible = true;
        },
        show1(){
            this.visible1 = true;
        },
        show2(){
            this.visible2 = true;
        }
    }
}
</script>
