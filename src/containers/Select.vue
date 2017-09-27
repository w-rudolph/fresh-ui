<template>
    <div class="container">
        <h3>Select 组件</h3>
        <br>
        <h2>Basic</h2>
        <d-select v-model="city" style="width: 200px">
            <d-select-option value="上海">上海</d-select-option>
            <d-select-option value="浙江">浙江</d-select-option>
            <d-select-option value="宁波">宁波</d-select-option>
            <d-select-option value="北京">北京</d-select-option>
            <d-select-option value="杭州">杭州</d-select-option>
        </d-select>
        <h2>Clearable & size</h2>
        <d-select v-model="city" size="small" style="width: 200px" clearable>
            <d-select-option value="上海">上海</d-select-option>
            <d-select-option value="浙江">浙江</d-select-option>
            <d-select-option value="宁波">宁波</d-select-option>
            <d-select-option value="北京">北京</d-select-option>
            <d-select-option value="杭州">杭州</d-select-option>
        </d-select>
        <h2>Group</h2>
        <d-select v-model="city" style="width: 200px">
            <d-select-group label="分组1">
                <d-select-option value="上海">上海</d-select-option>
                <d-select-option value="浙江">浙江</d-select-option>
            </d-select-group>
            <d-select-group label="分组2">
                <d-select-option value="宁波">宁波</d-select-option>
                <d-select-option value="杭州">杭州</d-select-option>
            </d-select-group>
        </d-select>
        <h2>Disabled</h2>
        <d-select v-model="city" :disabled="disabled" size="large" style="width: 200px" clearable>
            <d-select-option value="上海">上海</d-select-option>
            <d-select-option value="浙江">浙江</d-select-option>
            <d-select-option value="宁波">宁波</d-select-option>
            <d-select-option value="北京">北京</d-select-option>
            <d-select-option value="杭州">杭州</d-select-option>
        </d-select>
        <d-button @click="disabled = !disabled">toggle</d-button>

        <h2>Multiple</h2>
        {{cities}}<br>
        <d-select v-model="cities" size="large" style="width: 200px" multiple :disabled="disabled">
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
            city: '上海',
            disabled: true,
            cities: ["上海", "北京"]
        }
    }
}
</script>
