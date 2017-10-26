<template>
    <div class="container">
        <h3>Card 组件</h3>
        <hr>
        <h4>Basic</h4>
        <d-card style="width:200px;">
            <div slot="header">Title</div>
            <div>Card body</div>
        </d-card>
        <br>
        <h4>Shadow</h4>
        <d-card shadow style="width:200px;">
            <div slot="header">Title</div>
            <div>Card body</div>
        </d-card>
        <h4>Shadow on hover</h4>
        <d-card shadow-on-hover style="width:200px;">
            <img src="https://w-rudolph.github.io/images/avatar.gif" width="100%" alt="">
            <hr>
            Zyc，上海市<br>
            联系电话: 110<br>
            <d-button size="small" type="primary">收藏名片</d-button>
        </d-card>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    }
}
</script>

