<template>
    <div class="container">
        <h3>Tooltip 组件</h3>
        <br>
        <d-tooltip theme="black">
            <template slot="content">
                <div>Hello World</div>
            </template>
            <d-button>tooltip</d-button>
        </d-tooltip>
        <d-tooltip theme="light" placement="right-start">
            <template slot="content">
                <div>Hello WorldHello World</div>
            </template>
            <!-- <d-button type="link">tooltip</d-button> -->
            <a href="#">tooltip</a>
        </d-tooltip>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {

    },
    mounted() {
    }
}
</script>
