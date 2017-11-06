<template>
    <div class="d-cascader-panel">
        <div class="d-cascader-menus">
            <cascader-menu :items="cascaderData"></cascader-menu>
            <cascader-menu v-for="menu in subMenus" :items="menu.children" :key="menu.nid"></cascader-menu>
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
    },
    data() {
        return {
            cascaderData: this.transformProps(deepCopy(this.options), this.mapProps),
            subMenus: []
        }
    },
    computed: {

    },
    methods: {
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
        handleItemClick(item) {
            const { children, level, value, label, nid } = item;
            if (!children.length) {
                this.subMenus = this.subMenus.filter(menu => menu.level < level);
                return;
            }
            const found = this.subMenus.find(menu => menu.level === level);
            if(found){
                const index = this.subMenus.indexOf(found);
                this.subMenus.splice(index, 1, item);
            }else{
                this.subMenus.push(item);
            }
        }
    },
    created() {
        this.subscribe('cascader.item.click', this.handleItemClick)
    }
}
</script>

