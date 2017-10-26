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
            <d-form label-width="80px" inline>
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
                <d-button :type="labelPosition === 'right' ? 'primary' : ''" @click="labelPosition='right'">right</d-button>
                <d-button :type="labelPosition === 'top' ? 'primary' : ''" @click="labelPosition='top'">top</d-button>
            </d-button-group><br>
            <d-form label-width="80px" :label-position="labelPosition">
                <d-form-item label="姓名">
                    <d-input style="width: 200px" placeholder="请输入用户名"></d-input>
                </d-form-item>
                <d-form-item label="密码">
                    <d-input style="width: 200px" placeholder="请输入密码"></d-input>
                </d-form-item>
            </d-form>
            <h4>Validate</h4>
            <d-form ref="vform" label-width="80px" v-model="model" :label-position="labelPosition">
                <d-form-item label="姓名" required prop="name" :rules="[{ required: true, message: '姓名不能为空' }]">
                    <d-input v-model="model.name" style="width: 200px" placeholder="请输入用户名"></d-input>
                </d-form-item>
                <d-form-item label="密码" required prop="password" :rules="[{ required: true, message: '密码不能为空' }]">
                    <d-input v-model="model.password" style="width: 200px" placeholder="请输入密码"></d-input>
                </d-form-item>
                <d-form-item v-if="show" label="性别" required prop="sex" :rules="[{ required: true, message: '性别不能为空' }]">
                    <d-input v-model="model.sex" style="width: 200px" placeholder="请输入性别"></d-input>
                </d-form-item>
                <d-form-item>
                    <d-button type="primary" @click="validateForm">validate</d-button>
                    <d-button @click="resetForm">reset</d-button>
                </d-form-item>
            </d-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            labelPosition: '',
            show: false,
            model: {
                name: '',
                password: '',
                sex: ''
            }
        }
    },
    methods: {
        validateForm() {
            this.$refs.vform.validate()
                .then(() => {
                    // console.log('done!');
                })
                .catch(errors => {
                    // console.log('catch:', errors);
                })
        },
        resetForm() {
            this.$refs.vform.resetFields();
        },
    }
}
</script>
