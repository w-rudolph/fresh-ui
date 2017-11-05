<template>
    <div class="container">
        <h3>Alert 组件</h3>
        <hr>
        <h4>Basic</h4>
        <d-alert>alert message</d-alert>
        <h4>Show Icon</h4>
        <d-alert type="info" show-icon>alert message</d-alert>
        <d-alert type="warning" show-icon>alert message</d-alert>
        <d-alert type="error" show-icon>alert message</d-alert>
        <h4>Closeable</h4>
        <d-alert type="info" show-icon closable>alert message</d-alert>
        <h4>Big icon</h4>
        <d-alert type="info" show-icon closable big-icon>
            <div style="font-size: 20px;">
                <strong>Title</strong>
            </div>
            <div>
                Measge......................<br> Measge......................
                <br> Measge......................
            </div>
        </d-alert>
    </div>
</template>

<script>
export default {

};
</script>
<style>
.d-alert {
  width: 500px;
}
</style>

