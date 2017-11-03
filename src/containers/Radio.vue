<template>
    <div class="container">
        <h3>Radio 组件</h3>
        <br>
        <d-radio v-model="radio" v-for="r in radios" :label="r.id" :key="r.id">{{r.text}}</d-radio>
        <br>
        <d-radio disabled>aaa</d-radio>
        <d-radio value="1" label="1" disabled>bbb</d-radio>
    </div>
</template>

<script>
export default {
    data() {
        return {
            radio: 1,
            radios: [
                { id: 1, text: 'radio1' },
                { id: 2, text: 'radio2' },
                { id: 3, text: 'radio3' }
            ]
        }
    }
}
</script>
