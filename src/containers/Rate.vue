<template>
  <div class="container">
    <h3>Rate 组件</h3>
    <br>
    <d-rate v-model="rate"></d-rate>
    <br>
    <d-rate v-model="rate" disabled></d-rate>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rate: 3,
    }
  }
}
</script>
