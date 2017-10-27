<template>
    <div class="container">
        <h3>Tree 组件</h3>
        <br>
        <d-tree checkbox style="width: 500px;" :data="treeData" :map-props="{label: 'title', children: 'nodes'}"></d-tree>
    </div>
</template>

<script>
export default {
    data() {
        return {
            treeData: [
                {
                    title: 'level 1',
                    nodes: [{
                        title: 'level 1-1'
                    }, {
                        title: 'level 1-2',
                        nodes: [
                            { title: 'level 1-2-1' },
                            { title: 'level 1-2-2' },
                            { title: 'level 1-2-3' },
                            { title: 'level 1-2-4' },
                            { title: 'level 1-2-5' }
                        ]
                    }]
                },
                { title: 'level 2' }
            ]
        }
    }
}
</script>
