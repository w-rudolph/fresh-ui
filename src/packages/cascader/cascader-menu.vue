<template>
    <ul class="d-cascader-menu">
        <li :class="['d-cascader-menu__item', checkActiveItem(item)]" v-for="item in items" @click="handleClick(item)" :key="item.nid">
            {{item.label}}
            <d-icon v-if="!!item.children.length" name="ios-arrow-right"></d-icon>
        </li>
    </ul>
</template>
<script>
import EventEmitter from '../mixins/event_emitter';
import DIcon from '../icon/icon';

export default {
    name: 'DCascaderMenu',
    components: { DIcon },
    mixins: [EventEmitter],
    props: {
        items: {
            type: Array,
            default: () => []
        },
        activeItems: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        handleClick(item) {
            this.dispatch('DCascaderPanel', 'cascader.item.click', item);
        },
        checkActiveItem(item) {
            return this.activeItems.find(it => it.nid === item.nid) ? 'active' : '';
        }
    }
}
</script>

