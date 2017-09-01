<template>
    <div class="d-collapse-item">
        <div class="d-collapse-item__title" @click="handleItemClick">
            <d-icon name="angle-right" :class="'d-collapse-item__arrow' + (expand ? ' open' : '') " size="lg"></d-icon>
            <slot name="title"></slot>
            <template v-if="$slots.title.length > 0">
                {{title}}
            </template>
        </div>
        <transition name="fade">
            <div class="d-collapse-item__content" v-show="expand">
                <slot></slot>
                <slot name="content"></slot>
                <template v-if="$slots.content.length > 0">
                    {{content}}
                </template>
            </div>
        </transition>
    </div>
</template>
<script>
import DIcon from '../icon/icon';
import EventEmitter from '../../mixins/event_emitter';

export default {
    name: 'DCollapseItem',
    components: [DIcon],
    mixins: [EventEmitter],
    data() {
        return {
            expand: false,
            showContent: false
        }
    },
    props: {
        title: {
            type: String,
            default: '',
        },
        content: {
            type: String,
            default: '',
        }
    },
    methods: {
        handleItemClick() {
            this.expand = !this.expand;
            this.dispatch('DCollapse', 'item-click', this);
        }
    },
    mounted() {
        this.subscribe('sibling-item-click', vnode => {
            if (this !== vnode && this.expand) {
                this.expand = false;
            }
        });
    },
}
</script>
<style scoped>
.d-collapse-item__title {
    height: 43px;
    line-height: 43px;
    padding-left: 15px;
    background-color: #fff;
    color: #48576a;
    cursor: pointer;
    border-bottom: 1px solid #dfe6ec;
    font-size: 13px;
}

.d-collapse-item__content {
    will-change: height;
    background-color: #fbfdff;
    overflow: hidden;
    box-sizing: border-box;
    border-bottom: 1px solid #dfe6ec;
    padding: 10px 15px;
    font-size: 13px;
    color: #1f2d3d;
    line-height: 1.769230769230769;
}

.d-collapse-item__arrow {
    margin-right: 5px;
    transition: all .3s ease;
    font-size: 18px;
}

.d-collapse-item__arrow.open {
    transform: rotate(90deg);
}
</style>
