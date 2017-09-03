<template>
  <div class="container">
    <h3>Checkbox 组件</h3>
    <hr>
    <d-checkbox v-model="isChecked">是否选中：{{isChecked ? '是' : '否' }}</d-checkbox>
    <br><br> {{selectedCities}}
    <d-checkbox-group v-model="selectedCities">
      <d-checkbox v-for="(city, idx) in cities" :key="idx" :label="city">{{city}}</d-checkbox>
    </d-checkbox-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isChecked: false,
      cities: ['上海', '北京', '广州', '浙江'],
      selectedCities: ['北京']
    }
  }
}
</script>
