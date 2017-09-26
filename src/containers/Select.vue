<template>
    <div class="container">
        <h3>Select 组件</h3>
        <br>
        <d-select v-model="city" style="width: 200px" clearable>
            <d-select-option value="上海">上海</d-select-option>
            <d-select-option value="浙江">浙江</d-select-option>
            <d-select-option value="宁波">宁波</d-select-option>
            <d-select-option value="北京">北京</d-select-option>
            <d-select-option value="杭州">杭州</d-select-option>
        </d-select>
    </div>
</template>

<script>
export default {
    data() {
        return {
            city: ''
        }
    }
}
</script>
