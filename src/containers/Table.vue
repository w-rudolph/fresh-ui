<template>
    <div class="container">
        <h3>Table 组件</h3>
        <br>
        <h4>Basic</h4>
        <d-button @click="toggleShow">toggle</d-button>
        <d-table :data="tableData" ref="table">
            <d-table-column v-if="column.show" v-for="column in columns" :key="column.label" :label="column.label" :prop="column.prop" :width="column.width"></d-table-column>
            <d-table-column label="操作" width="120"></d-table-column>
        </d-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            columns: [
                {
                    label: 'ID', prop: 'id', width: 80, show: false,
                },
                {
                    label: '名字', prop: 'name', show: true
                },
                {
                    label: '年龄', prop: 'age', show: true
                },
                {
                    label: '性别', prop: 'sex', show: true
                },
                {
                    label: '婚姻状况', prop: 'status', show: true
                }
            ],
            tableData: [{
                name: 'aaaa',
                id: 'a',
                age: 21,
                sex: '男',
                status: '未婚'
            },
            {
                name: 'bbbb',
                id: 'b',
                age: 23,
                sex: '女',
                status: '已婚'
            },
            {
                name: 'cccc',
                id: 'c',
                age: 26,
                sex: '女',
                status: '未婚'
            }],
        }
    },
    methods: {
        toggleShow() {
            this.columns[0].show = !this.columns[0].show;
            // console.log(this.columns);
            // console.log(this.$refs.table);
        }
    }
}
</script>
