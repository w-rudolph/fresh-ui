<template>
  <div class="container">
    <h3>Input 组件</h3>
    <br>
    <d-input style="width:200px;" size="large" placeholder="large"></d-input>
    <br>
    <d-input style="width:200px;" placeholder="default"></d-input>
    <br>
    <d-input style="width:200px;" size="small" placeholder="small"></d-input>
    <br>
    <d-input style="width:200px;" disabled placeholder="disabled"></d-input>
    <br>
    <d-input style="width:200px;" icon="ios-search-strong"></d-input>
    <br>
    <d-input type="textarea" v-model="txtValue" style="width:200px;"></d-input> {{txtValue}}
  </div>
</template>

<script>
export default {
  data(){
    return {
      txtValue: '2222222222'
    }
  }
}
</script>
