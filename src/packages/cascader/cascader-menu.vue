<template>
    <ul class="d-cascader-menu">
        <li class="d-cascader-menu__item" v-for="item in items" @click="handleClick(item)">{{item.label}}</li>
    </ul>
</template>
<script>
import EventEmitter from '../mixins/event_emitter';

export default {
    name: 'DCascaderMenu',
    mixins: [EventEmitter],
    props: {
        items: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        handleClick(item) {
            this.dispatch('DCascaderPanel', 'cascader.item.click', item);
        }
    }
}
</script>

