<template>
    <div class="container">
        <h3>Table 组件</h3>
        <br>
        <h4>Basic</h4>
        <d-button @click="toggleShow">toggle</d-button>
        <d-table :table-data="tableData" :columns="columns" :table-height="200" border stripe></d-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            columns: [
                {
                    label: 'ID', prop: 'id', width: 70, visible: true, render(row) {
                        return row.id + '!';
                    }
                },
                {
                    label: '名字', prop: 'name', width:120
                },
                {
                    label: '年龄', prop: 'age'
                },
                {
                    label: '性别', prop: 'sex'
                },
                {
                    label: '名字', prop: 'name'
                },
                {
                    label: '年龄', prop: 'age'
                },
                {
                    label: '性别', prop: 'sex'
                },
                {
                    label: '名字', prop: 'name'
                },
                {
                    label: '年龄', prop: 'age'
                },
                {
                    label: '性别', prop: 'sex'
                },
                {
                    label: '名字', prop: 'name'
                },
                {
                    label: '年龄', prop: 'age'
                },
                {
                    label: '性别', prop: 'sex'
                },
                {
                    label: '年龄', prop: 'age'
                },
                {
                    label: '性别', prop: 'sex'
                },
                {
                    label: '名字', prop: 'name'
                },
                {
                    label: '年龄', prop: 'age'
                },
                {
                    label: '性别', prop: 'sex'
                },
                {
                    label: '操作', width: 140, render(h, row) {
                        return '<a>操作</a>'
                    }
                }
            ],
            tableData: [{
                name: 'aaaaaaaa',
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
            this.columns = this.columns.map((col, index) => {
                if (index === 0) {
                    col.visible = !col.visible;
                }
                return col;
            })
        }
    }
}
</script>
