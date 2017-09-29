<template>
    <div class="container">
        <h3>Table 组件</h3>
        <br>
        <h4>Basic</h4>
        <d-table :data="tableData">
            <d-table-column label="ID" prop="id" width="80"></d-table-column>
            <d-table-column label="名字" prop="name"></d-table-column>
            <d-table-column label="年龄" prop="age"></d-table-column>
            <d-table-column label="性别" prop="sex"></d-table-column>
            <d-table-column label="婚姻状况" prop="status"></d-table-column>
            <d-table-column label="婚姻状况" prop="status"></d-table-column>
            <d-table-column label="婚姻状况" prop="status"></d-table-column>
            <d-table-column label="婚姻状况" prop="status"></d-table-column>
            <d-table-column label="婚姻状况" prop="status"></d-table-column>
            <d-table-column label="婚姻状况" width="120" prop="status"></d-table-column>
            <d-table-column label="婚姻状况" width="120" prop="status"></d-table-column>
            <d-table-column label="操作" width="120"></d-table-column>
        </d-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
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
            }]
        }
    }
}
</script>
