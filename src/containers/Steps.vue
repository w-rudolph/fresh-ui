<template>
    <div class="container">
        <h3>Steps 组件</h3>
        <hr>
        <h4>Basic</h4>
        <d-steps style="width:800px;" :active="active">
            <d-step title="title1">
                Content1Content1Content1Content1Content1Content1Content1
            </d-step>
            <d-step title="title2">
                Content2Content2Content2Content2Content2Content2Content2aaa
            </d-step>
            <d-step title="title3">
                Content3Content3Content3Content3Content3Content3Content3
            </d-step>
            <d-step title="title4">
                Content4Content4Content4Content4Content4Content4Content4
            </d-step>
        </d-steps>
        <d-button @click="handleClick">Next</d-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: 1
        }
    },
    methods: {
        handleClick() {
            this.active = (this.active + 1) % 4;
        }
    }
};
</script>

