<template>
    <div style="padding: 0 20px">
        <h2>Switch 组件</h2>
        <hr>
        <h4>Basic</h4>
        <d-switch v-model="value">
            <span slot="off">关</span>
            <span slot="on">开</span>
        </d-switch>
        <h4>Disabled</h4>
        <d-switch disabled :value="true">
            <span slot="off">关</span>
            <span slot="on">开</span>
        </d-switch>
        <h4>Size</h4>
        <h5>large</h5>
        <d-switch size="large" :value="true">
            <span slot="off">关</span>
            <span slot="on">开</span>
        </d-switch>
        <h5>small</h5>
        <d-switch size="small" :value="true">
            <span slot="off">关</span>
            <span slot="on">开</span>
        </d-switch>
        <h4>Custom width</h4>
        <d-switch :value="false" style="width: 100px">
            <span slot="off">状态:关闭</span>
            <span slot="on">状态:开启</span>
        </d-switch>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value: true
        }
    }
}
</script>

