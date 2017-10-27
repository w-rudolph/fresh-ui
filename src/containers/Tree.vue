<template>
    <div class="container">
        <h3>Tree 组件</h3>
        <br>
        <d-tree ref="tree" checkbox style="width: 500px;" :data="treeData" :map-props="{label: 'title', children: 'nodes'}"></d-tree>
        <br>
        <d-button @click="expandAll">ExpandAll</d-button>
        <d-button @click="closeAll">CloseAll</d-button>

        <h4>Render Content</h4>
        <d-tree :render-content="RenderContent" style="width: 500px;" :data="treeData" :map-props="{label: 'title', children: 'nodes'}"></d-tree>
    </div>
</template>

<script>
export default {
    data() {
        return {
            treeData: [
                {
                    id: '1',
                    title: 'level 1',
                    nodes: [{
                        id: '1-1',
                        title: 'level 1-1'
                    }, {
                        id: '1-2',
                        title: 'level 1-2',
                        nodes: [
                            { id: '1-2-1', title: 'level 1-2-1' },
                            { id: '1-2-2', title: 'level 1-2-2' },
                            { id: '1-2-3', title: 'level 1-2-3' },
                            { id: '1-2-4', title: 'level 1-2-4' },
                            { id: '1-2-5', title: 'level 1-2-5' }
                        ]
                    }]
                },
                { id: '2', title: 'level 2' }
            ]
        }
    },
    methods: {
        expandAll() {
            this.$refs.tree.expandAll();
        },
        closeAll() {
            this.$refs.tree.expandAll(false);
        },
        RenderContent(h, node) {
            return h('span',
                {
                    class: ['file']
                },
                [
                    h('d-icon', {
                        props: {
                            name: node.children.length ? 'ios-folder-outline' : 'ios-paper-outline'
                        },
                    }),
                    h('span', {
                        style: {
                            paddingLeft: '5px'
                        }
                    }, [node.label,])
                ]);
        }
    }
}
</script>
