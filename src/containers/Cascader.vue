<template>
    <div class="container">
        <h3>Cascader 组件</h3>
        <hr>
        <h4>Basic</h4>
        <d-cascader-panel v-model="values" :options="options" @active-item-change="handleActiveChange" @change="handleChange"></d-cascader-panel>
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        <h4>Popper</h4>
        <h5>Basic</h5>
        <d-cascader style="width:200px;" v-model="values" :options="options" @active-item-change="handleActiveChange" @change="handleChange"></d-cascader>
        <h5>clearable</h5>
        <d-cascader clearable style="width:200px;" v-model="values" :options="options" @active-item-change="handleActiveChange" @change="handleChange"></d-cascader>
        <h5>changeOnSelect</h5>
        <d-cascader changeOnSelect clearable style="width:200px;" v-model="values" :options="options" @active-item-change="handleActiveChange" @change="handleChange"></d-cascader>
        <h5>displayRender</h5>
        <d-cascader :display-render="displayRender" style="width:200px;" v-model="values" :options="options" @active-item-change="handleActiveChange" @change="handleChange"></d-cascader>
    </div>
</template>
<script>
export default {
    data() {
        return {
            values: ["zhinan", "daohang", "dingbudaohang"],
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
                value: 'zhinan2',
                label: '指南2',
                children: []
            }]
        }
    },
    methods: {
        handleActiveChange(v) {
            // console.log(v);
        },
        handleChange(v) {
            console.log(JSON.stringify(v, null, 2));
        },
        displayRender(items) {
            return items.map(item => item.label).join(':');
        }
    }
}
</script>

