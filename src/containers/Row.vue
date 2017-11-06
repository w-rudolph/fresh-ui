<template>
    <div class="container" style="padding:10px;">
        <h3>Grid</h3>
        <hr>
        <h4>Basic</h4>
        <d-row>
            <d-col :span="4" class="demo-col">span 4</d-col>
            <d-col :span="4" class="demo-col">span 4</d-col>
            <d-col :span="4" class="demo-col">span 4</d-col>
            <d-col :span="6" class="demo-col">span 6</d-col>
            <d-col :span="6" class="demo-col">span 6</d-col>
            <d-col :span="12" class="demo-col">span 12</d-col>
            <d-col :span="12" class="demo-col">span 12</d-col>
            <d-col :span="24" class="demo-col">span 24</d-col>
        </d-row>
        <h4>Gutter</h4>
        <d-row :gutter="10">
            <d-col :span="4" class="demo-col">span 4</d-col>
            <d-col :span="8" class="demo-col">span 8</d-col>
            <d-col :span="4" class="demo-col">span 4</d-col>
        </d-row>
        <h4>Pull, Push</h4>
        <d-row>
            <d-col :span="8" :push="16" class="demo-col">span 4 / push 16</d-col>
            <d-col :span="16" :pull="8" class="demo-col">span 16 / pull 8</d-col>
        </d-row>
        <h4>Offset</h4>
        <d-row>
            <d-col :span="8" class="demo-col">span 4</d-col>
            <d-col :span="12" :offset="4" class="demo-col">span 12 / offset 4</d-col>
        </d-row>
        <br>
        <hr>
        <h4>Flex</h4>
        <h5>Basic</h5>
        <d-row type="flex">
            <d-col :span="8" class="demo-col">span 4</d-col>
            <d-col :span="12" class="demo-col">span 12 / offset 4</d-col>
        </d-row>
        <br>
        <h5>justify：center</h5>
        <d-row type="flex" justify="center">
            <d-col :span="8" class="demo-col">span 4</d-col>
            <d-col :span="12" class="demo-col">span 12 / offset 4</d-col>
        </d-row>
        <h5>align：center</h5>
        <d-row type="flex" align="center">
            <d-col :span="8" class="demo-col" style="height:100px;">span 4</d-col>
            <d-col :span="12" class="demo-col" style="height:150px;">span 12 / offset 4</d-col>
        </d-row>
        <h5>Order</h5>
        正常
        <d-row>
            <d-col :span="4" class="demo-col">span 4</d-col>
            <d-col :span="4" class="demo-col">span 4</d-col>
            <d-col :span="4" class="demo-col">span 4</d-col>
            <d-col :span="6" class="demo-col">span 6</d-col>
            <d-col :span="6" class="demo-col">span 6</d-col>
        </d-row>
        排序
        <d-row type="flex">
            <d-col :span="4" :order="4" class="demo-col">span 4 / order 4</d-col>
            <d-col :span="4" :order="3" class="demo-col">span 4 / order 3</d-col>
            <d-col :span="4" :order="2" class="demo-col">span 4 / order 2</d-col>
            <d-col :span="6" :order="1" class="demo-col">span 6 / order 1</d-col>
            <d-col :span="6" :order="5" class="demo-col">span 6 / order 5</d-col>
        </d-row>
        <h4>Responsive layout</h4>
        <d-row>
            <d-col :xs="5" :sm="5" :md="{span: 4, offset:2}" class="demo-col">xs5/sm5/md4-offset2</d-col>
            <d-col :xs="5" :sm="5" :md="3" class="demo-col">xs5/sm5/md3</d-col>
            <d-col :xs="5" :sm="5" :md="3" class="demo-col">xs5/sm5/md3</d-col>
            <d-col :xs="5" :sm="5" :md="6"class="demo-col">xs5/sm5/md6</d-col>
            <d-col :xs="4" :sm="4" :md="6" class="demo-col">xs4/sm4/md6</d-col>
        </d-row>
    </div>
</template>

<script>
export default {

};
</script>

<style scoped>
.demo-col {
  border: 1px solid #ddd;
  background: #eee;
}
</style>
