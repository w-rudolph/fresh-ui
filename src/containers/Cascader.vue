<template>
    <div class="container">
        <h3>Cascader 组件</h3>
        <hr>
        <h4>Basic</h4>
        <d-cascader-panel :options="options"></d-cascader-panel>
    </div>
</template>
<script>
export default {
    data() {
        return {
            options: [{
                value: 'zhinan',
                label: '指南',
                children: [{
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [{
                        value: 'yizhi',
                        label: '一致'
                    }, {
                        value: 'fankui',
                        label: '反馈'
                    }, {
                        value: 'xiaolv',
                        label: '效率'
                    }, {
                        value: 'kekong',
                        label: '可控'
                    }]
                },
                {
                    value: 'daohang',
                    label: '导航',
                    children: [{
                        value: 'cexiangdaohang',
                        label: '侧向导航'
                    }, {
                        value: 'dingbudaohang',
                        label: '顶部导航',
                        children: [
                            {
                                value: 'zhinan',
                                label: '指南2',
                                children: []
                            }
                        ]
                    }]
                }]
            }, {
                value: 'zhinan',
                label: '指南2',
                children: []
            }]
        }
    }}
</script>

