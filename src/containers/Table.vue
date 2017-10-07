<template>
    <div class="container">
        <h3>Table 组件</h3>
        <br>
        <h4>Basic</h4>
        <d-table :table-data="tableData" :columns="columns1" :table-height="200" border stripe></d-table>
        <h4>Complex</h4>
        <d-table :table-data="tableData" :columns="columns" :table-height="200" border stripe></d-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            columns1: [
                {
                    type: 'expand',
                    label: '',
                    width: 50,
                    render(h, row) {
                        return h({
                            template: `<div style="padding:10px;">
                            <strong>姓名: ${row.name}</strong>&nbsp;&nbsp;
                            <strong>性别: ${row.sex}</strong>&nbsp;&nbsp;
                            <strong>年龄: ${row.age}</strong></div>
                            `
                        })
                    }
                },
                {
                    label: 'ID', prop: 'id', width: 70, visible: true, render(h, row) {
                        return h('span', row.id);
                    }
                },
                {
                    label: '名字', prop: 'name'
                },
                {
                    label: '年龄', prop: 'age'
                },
                {
                    label: '性别', prop: 'sex', width: 80
                },
            ],
            columns: [
                {
                    label: 'ID', prop: 'id', width: 70, fixed: 'left', visible: true, render(h, row) {
                        return row.id + '!';
                    }
                },
                {
                    label: '名字', prop: 'name', fixed: 'left', width: 120
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
                    label: '名字', fixed: 'right', prop: 'name'
                },
                {
                    label: '年龄', prop: 'age'
                },
                {
                    label: '性别', prop: 'sex'
                },
                {
                    label: '操作', fixed: 'right', width: 140, render(h, row) {
                        return h('a', '操作')
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
