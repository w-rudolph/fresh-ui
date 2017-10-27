<template>
    <div class="d-tree">
        <d-tree-node v-for="node in treeData" :key="node.node_id" :node="node" :store="treeData"></d-tree-node>
    </div>
</template>
<script>
import DTreeNode from './tree-node.vue';
import { isArray, deepCopy } from '../utils/util';
import { guid } from '../utils/guid';

export default {
    name: 'DTree',
    components: { DTreeNode },
    props: {
        data: {
            type: Array,
            default: () => []
        },
        mapProps: {
            type: Object,
            default: () => {
                return { children: 'children', label: 'label' };
            }
        },
        checkbox: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            treeData: this.transformProps(deepCopy(this.data), this.mapProps)
        }
    },
    methods: {
        transformProps(data, props, level = 1, pid = null) {
            if (!isArray(data) || isArray(data) && !data.length) {
                return [];
            }

            const res = [];
            const childrenKey = props['children'];
            const labelKey = props['label'];

            data.forEach(node => {
                let nid = guid();
                res.push({
                    expand: node['expand'] || (node[childrenKey] ? true : false),
                    label: node[labelKey] || '',
                    node_id: nid,
                    parent_id: pid,
                    children: node[childrenKey] ? this.transformProps(node[childrenKey], props, level + 1, nid) : [],
                    level,
                    checkbox: this.checkbox,
                    checked: !!node['checked'] || false,
                });
            })
            return res;
        },
        setNodeExpand(node) {

        }
    }
}
</script>
