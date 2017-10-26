<template>
    <div class="container">
        <h3>Breadcrumb 组件</h3>
        <hr>
        <h4>Basic</h4>
        <d-breadcrumb>
            <d-breadcrumb-item>
                <router-link to="/">Home</router-link>
            </d-breadcrumb-item>
            <d-breadcrumb-item>
                <router-link to="table">Table</router-link>
            </d-breadcrumb-item>
            <d-breadcrumb-item>Breadcrumb</d-breadcrumb-item>
        </d-breadcrumb>
        <h4>Separator</h4>
        <d-breadcrumb separator=">>">
            <d-breadcrumb-item>
                <router-link to="/">Home</router-link>
            </d-breadcrumb-item>
            <d-breadcrumb-item>
                <router-link to="table">Table</router-link>
            </d-breadcrumb-item>
            <d-breadcrumb-item>Breadcrumb</d-breadcrumb-item>
        </d-breadcrumb>
        <h4>Custom style( link-style, link-class, separator-style, separatorClass)</h4>
        <d-breadcrumb separator-class="b-separator">
            <d-breadcrumb-item :link-style="{backgroundColor: '#f00'}">
                <router-link to="/">Home</router-link>
            </d-breadcrumb-item>
            <d-breadcrumb-item :link-style="{backgroundColor: '#f0f'}">
                <router-link to="table">Table</router-link>
            </d-breadcrumb-item>
            <d-breadcrumb-item link-class="b-breadcrumb">Breadcrumb</d-breadcrumb-item>
        </d-breadcrumb>
    </div>
</template>
<script>
export default {
    data() {
        return {}
    }
}
</script>
<style>
.b-separator {
  font-weight: bold;
  color: #f00;
}
.b-breadcrumb {
  font-size: 20px;
  font-weight: bold;
}
</style>

