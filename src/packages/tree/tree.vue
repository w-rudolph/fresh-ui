<template>
    <div class="d-tree">
        <d-tree-node v-for="node in treeData" :key="node.node_id" :node="node" :store="treeData" :render-content="renderContent"></d-tree-node>
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
        },
        renderContent: {
            type: Function,
            default: null
        }
    },
    data() {
        return {
            treeData: this.transformProps(deepCopy(this.data), this.mapProps)
        }
    },
    watch: {
        data: {
            deep: true,
            handler() {
                this.treeData = this.transformProps(deepCopy(this.data), this.mapProps);
            }
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
                let newNode = {
                    ...node,
                    expand: node['expand'] || false,
                    label: node[labelKey] || '',
                    nid: nid,
                    pid: pid,
                    children: node[childrenKey] ? this.transformProps(node[childrenKey], props, level + 1, nid) : [],
                    level
                };
                if (this.checkbox) {
                    newNode.checkbox = this.checkbox;
                    newNode.checked = !!node['checked'] || false;
                }
                res.push(newNode);
            })
            return res;
        },
        expandAll(data = this.treeData, isOpen = true) {
            if (typeof data === "boolean" || data === undefined) {
                isOpen = !!data;
                data = this.treeData;
            }
            data.forEach(node => {
                node.expand = isOpen;
                if (node.children.length) {
                    this.expandAll(node.children, isOpen);
                }
            })
        }
    }
}
</script>
