<template>
  <div class="container">
    <h3>Rate 组件</h3>
    <br>
    <d-rate :value="rate"></d-rate>
  </div>
</template>

<script>
export default {
  date(){
    return {
      rate: 3,
    }
  }
}
</script>
