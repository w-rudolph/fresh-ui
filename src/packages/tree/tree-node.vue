<template>
    <div :class="['d-tree-node', node.children.length ? 'has-children' : 'is-leaf', node.expand ? 'is-expand' : '']">
        <div class="d-tree-node__content">
            <span v-for="lv in node.level" class="d-tree-node__indent" :key="lv"></span>
            <span :class="['d-tree-node__icon', node.expand ? 'is-expand' : '']" @click="handleClick(node)">
                <d-icon name="arrow-down-b" v-if="node.children.length"></d-icon>
            </span>
            <template v-if="!renderContent">
                <span class="d-tree-node__checkbox" v-if="node.checkbox" @click="handleCheckboxClick">
                    <d-checkbox :checked="node.checked" :indeterminate="checkNodeIndeterminate(node)" v-model="node.checked" @change="handleCheckValueChange(node)"></d-checkbox>
                </span>
                <span class="d-tree-node__label">{{node.label}}</span>
            </template>
            <template v-else>
                <d-render class="d-tree-node__custom-render" :render="() => renderContent($createElement, node)"></d-render>
            </template>
        </div>
        <collapse-transition>
            <div class="d-tree-node__children" v-show="node.expand">
                <DTreeNode :store="store" v-for="child in node.children" :node="child" :key="child.nid" :render-content="renderContent"></DTreeNode>
            </div>
        </collapse-transition>
    </div>
</template>
<script>
import DIcon from '../icon/icon';
import DCheckbox from '../checkbox/checkbox';
import CollapseTransition from '../transition/collapse-transition.vue';
import DRender from '../base/render.vue';

export default {
    name: 'DTreeNode',
    components: { DIcon, DCheckbox, CollapseTransition, DRender },
    props: {
        node: {
            type: Object,
            default: () => { }
        },
        store: {
            type: Array,
            default: () => []
        },
        renderContent: {
            type: Function,
            default: null
        }
    },
    computed: {
        checkbox() {
            return this
        }
    },
    methods: {
        handleClick(node) {
            if (node.children.length) {
                node.expand = !node.expand;
            }
        },
        handleCheckboxClick(e) {
            e.stopPropagation();
        },
        handleCheckValueChange(node) {
            node.children.forEach(child => child.checked = node.checked);
            const parentNode = this.findNodeById(this.store, node.pid);
            if (parentNode === null) {
                return;
            }
            const checkedLength = parentNode.children.filter(n => n.checked === true).length;
            if (parentNode.checked && checkedLength === 0) {
                parentNode.checked = false;
            }
            if (!parentNode.checked && checkedLength > 0 && parentNode.children.length === checkedLength) {
                parentNode.checked = true;
            }
        },
        checkNodeIndeterminate(node) {
            const n1 = node.children.filter(n => n.checked === true).length;
            const n2 = node.children.length;
            return n1 > 0 && n1 < n2;
        },
        findNodeById(nodes, nid) {
            if (!nid) {
                return null;
            }
            for (let i = 0; i < nodes.length; i++) {
                let node = nodes[i];
                if (node.nid === nid) {
                    return node;
                } else {
                    if (node.children.length) {
                        return this.findNodeById(node.children, nid);
                    }
                }
            }
        }
    }
}
</script>
