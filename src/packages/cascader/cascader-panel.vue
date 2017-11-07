<template>
    <div class="d-cascader-panel">
        <div class="d-cascader-menus">
            <cascader-menu :items="cascaderData" :active-items="selectedMenus"></cascader-menu>
            <cascader-menu v-for="menu in subMenus" :items="menu.children" :key="menu.nid" :active-items="selectedMenus"></cascader-menu>
        </div>
    </div>
</template>
<script>
import CascaderMenu from './cascader-menu';
import { guid } from '../utils/guid';
import { isArray, deepCopy } from '../utils/util';
import EventEmitter from '../mixins/event_emitter';

export default {
    name: 'DCascaderPanel',
    components: { CascaderMenu },
    mixins: [EventEmitter],
    props: {
        options: {
            type: Array,
            default: () => []
        },
        mapProps: {
            type: Object,
            default: () => {
                return { children: 'children', label: 'label', value: 'value' };
            }
        },
        value: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            cascaderData: this.transformProps(deepCopy(this.options), this.mapProps),
            subMenus: [],
            selectedMenus: [],
        }
    },
    computed: {
        sMenus() {
            return this.selectedMenus.map(menu => {
                return { label: menu.label, value: menu.value };
            });
        }
    },
    watch: {
        value() {
            this.initSelectedItems();
        }
    },
    methods: {
        initSelectedItems() {
            const res = [];
            let items = this.cascaderData;
            this.value.forEach((val, idx) => {
                let it = this.findNode(items, val);
                if (it) {
                    res.push(it);
                    items = it.children;
                }
            });
            this.selectedMenus = res;
            res.forEach(item => {
                this.handleItemClick(item, true);
            })
            if(!res.length){
                this.subMenus = [];
            }
            this.dispatch('DCascader', 'selected.items', res);
        },
        findNode(items, val) {
            return items.find(item => item.value === val);
        },
        refresh() {
            this.initSelectedItems();
        },
        transformProps(data, props, level = 1, pid = null) {
            if (!isArray(data) || isArray(data) && !data.length) {
                return [];
            }
            const res = [];
            const childrenKey = props['children'];
            const labelKey = props['label'];
            const valueKey = props['value'];
            data.forEach(node => {
                let nid = guid();
                let newNode = {
                    ...node,
                    label: node[labelKey] || '',
                    value: node[valueKey] || '',
                    nid: nid,
                    pid: pid,
                    children: node[childrenKey] ? this.transformProps(node[childrenKey], props, level + 1, nid) : [],
                    level
                };
                res.push(newNode);
            })
            return res;
        },
        handleItemClick(item, notTriggerEvent = false) {
            const { children, level, value, label, nid } = item;
            let menus = this.subMenus.filter(menu => menu.level < level);
            if (children.length) {
                menus = menus.concat(item);
                this.selectedMenus = menus;
                if (!notTriggerEvent) {
                    this.$nextTick(() => {
                        this.$emit('active-item-change', this.sMenus);
                    });
                }
            } else {
                this.selectedMenus = menus.concat(item);
                if (!notTriggerEvent) {
                    this.$nextTick(() => {
                        this.$emit('change', this.sMenus);
                        this.$emit('input', this.sMenus.map(item => item.value));
                        this.$emit('active-item-change', this.sMenus);
                    });
                }
            }
            this.subMenus = menus;
        },

    },
    created() {
        this.subscribe('cascader.item.click', this.handleItemClick)
        this.initSelectedItems();
    }
}
</script>

