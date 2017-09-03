<template>
    <div :class="'d-collapse-item' + (expand ? ' open' : '') ">
        <div class="d-collapse-item__title" @click="handleItemClick">
            <d-icon name="chevron-right" class="d-collapse-item__arrow"></d-icon>
            <slot name="title"></slot>
            <template v-if="!$slots.title">
                {{title}}
            </template>
        </div>
        <div ref="ct" class="d-collapse-item__content">
            <slot></slot>
            <slot name="content"></slot>
            <template v-if="!$slots.content">
                {{content}}
            </template>
        </div>
    </div>
</template>
<script>
import DIcon from '../icon/icon';
import EventEmitter from '../mixins/event_emitter';

export default {
    name: 'DCollapseItem',
    components: { DIcon },
    mixins: [EventEmitter],
    data() {
        return {
            expand: false,
            showContent: false,
            timer: null
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
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(_ => {
                this.showToggle();
            }, 200);
        },
        showToggle() {
            this.expand = !this.expand;
            const dir = this.expand ? 'slideUp' : 'slideDown';
            this.dispatch('DCollapse', 'item-click', this);
        },
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

    overflow: hidden;
    box-sizing: border-box;
    background-color: #fbfdff;
    border-bottom: 1px solid #dfe6ec;
    color: #1f2d3d;
    font-size: 13px;
    padding: 0 15px;
    height: 0;
    transform: scaleY(0);
    transition: all 0.2s ease;
}

.d-collapse-item.open .d-collapse-item__content {
    padding: 10px 15px;
    height: auto;
    transform: scaleY(1);
}

.d-collapse-item__arrow:before {
    margin-right: 5px;
    transition: all .3s ease;
    transform: rotate(0);
}

.d-collapse-item.open .d-collapse-item__arrow:before {
    transform: rotate(90deg);
}
</style>
