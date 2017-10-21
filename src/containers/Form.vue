<template>
    <div class="container">
        <h3>Form 组件</h3>
        <div style="border: 1px solid #ddd;border-radius: 4px; padding: 10px;">
            <h4>Basic</h4>
            <d-form label-width="80px">
                <d-form-item label="姓名">
                    <d-input style="width: 200px" placeholder="请输入用户名"></d-input>
                </d-form-item>
                <d-form-item label="密码">
                    <d-input style="width: 200px" placeholder="请输入密码"></d-input>
                </d-form-item>
            </d-form>
            <h4>Inline</h4>
            <d-form label-width="80px">
                <d-form-item label="姓名">
                    <d-input style="width: 200px" placeholder="请输入用户名"></d-input>
                </d-form-item>
                <d-form-item label="密码">
                    <d-input style="width: 200px" placeholder="请输入密码"></d-input>
                </d-form-item>
            </d-form>
            <h4>Label poistion</h4>
            <d-button-group>
                <d-button :type="labelPosition === 'left' ? 'primary' : ''" @click="labelPosition='left'">left</d-button>
                <d-button :type="labelPosition === 'right' ? 'primary' : ''"@click="labelPosition='right'">right</d-button>
                <d-button :type="labelPosition === 'top' ? 'primary' : ''"@click="labelPosition='top'">top</d-button>
            </d-button-group><br>
            <d-form label-width="80px" :label-position="labelPosition">
                <d-form-item label="姓名">
                    <d-input style="width: 200px" placeholder="请输入用户名"></d-input>
                </d-form-item>
                <d-form-item label="密码">
                    <d-input style="width: 200px" placeholder="请输入密码"></d-input>
                </d-form-item>
            </d-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            labelPosition: ''
        }
    }
}
</script>
