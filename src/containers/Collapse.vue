<template>
    <div class="container">
        <h3>Collapse 组件</h3>
        <hr>
        <d-collapse accordion active-index="4">
            <d-collapse-item v-for="(cl, idx) in collapseList" :key="idx" :title="cl.title">
                <div v-html="cl.content"></div>
            </d-collapse-item>
            <d-collapse-item title="nested">
                <d-collapse active-index="0">
                    <d-collapse-item title="sub">sub content</d-collapse-item>
                </d-collapse>
            </d-collapse-item>
        </d-collapse>
        <hr>
        <d-collapse>
            <d-collapse-item v-for="(cl, idx) in collapseList" :key="idx" :title="cl.title">
                <div v-html="cl.content"></div>
            </d-collapse-item>
        </d-collapse>
    </div>
</template>

<script>
export default {
    data() {
        return {
            collapseList: [
                {
                    title: 'collapse 1',
                    content: 'collapse content1'
                },
                {
                    title: 'collapse 2',
                    content: `collapse content2<br>collapse content2<br>
          collapse content2<br>collapse content2<br>
          collapse content2<br>collapse content2<br>
          collapse content2<br>collapse content2<br>
          collapse content2<br>collapse content2<br>
          `
                },
                {
                    title: 'collapse 2',
                    content: 'collapse content2'
                },
                {
                    title: 'collapse 2',
                    content: 'collapse content2'
                }
            ]
        }
    }
}
</script>
