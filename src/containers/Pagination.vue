<template>
    <div class="container">
        <h3>Pagination 组件</h3>
        {{currentPage}}
        <h4>Basic</h4>
        <d-pagination :total="200" show-total v-model="currentPage" :current-page="currentPage" @current-change="hanleCurrentChange"></d-pagination>
        <h4>Util</h4>
        <d-pagination :total="50" show-total show-sizer show-jumper :current-page="currentPage1" @current-change="hanleCurrentChange"></d-pagination>
        <h4>small</h4>
        <d-pagination :total="200" v-model="currentPage2" small></d-pagination>
    </div>
</template>
<script>
export default {
    data() {
        return {
            currentPage: 3,
            currentPage1: 1,
            currentPage2: 2,
        }
    },
    methods: {
        hanleCurrentChange(v) {
            console.log(v);
        }
    }
}
</script>
