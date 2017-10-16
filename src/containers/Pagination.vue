<template>
    <div class="container">
        <h3>Pagination 组件</h3>
        {{currentPage}}
        <d-pagination :total="200" show-total v-model="currentPage" :current-page="currentPage" @current-change="hanleCurrentChange"></d-pagination><br>
        <d-pagination :total="100" show-total show-sizer show-jumper :current-page="currentPage1" @current-change="hanleCurrentChange"></d-pagination>
    </div>
</template>
<script>
export default {
    data() {
        return {
            currentPage: 3,
            currentPage1: 1
        }
    },
    methods: {
        hanleCurrentChange(v) {
            console.log(v);
        }
    }
}
</script>
