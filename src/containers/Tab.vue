<template>
    <div class="container">
        <h3>Tab 组件</h3>
        <hr>
        <h4>Basic</h4>
        <d-tab :active-index="aIndex1" @item-click="handleSelect">
            <d-tab-item v-for="(item, idx) in items" :key="idx" :label="item.label">
                <div v-html="item.content"></div>
            </d-tab-item>
        </d-tab>
        <h4>Type: card</h4>
        <d-tab type="card" :active-index="aIndex" @item-click="handleSelect">
            <d-tab-item v-for="(item, idx) in items" :key="idx" :label="item.label">
                <div v-html="item.content"></div>
            </d-tab-item>
        </d-tab>
    </div>
</template>

<script>
export default {
    data() {
        return {
            aIndex: 1,
            aIndex1: 1,
            items: [
                {
                    label: 'A项目',
                    content: 'A项目内容。。。<br>A项目内容。。。<br>A项目内容。。。'
                },
                {
                    label: 'B项目',
                    content: 'B项目内容。。。<br>B项目内容。。。<br>B项目内容。。。'
                },
                {
                    label: 'C项目',
                    content: 'C项目内容。。。<br>C项目内容。。。<br>C项目内容。。。'
                }
            ]
        }
    },
    methods: {
        handleSelect(idx) {
            console.log(idx);
        }
    },
}
</script>
