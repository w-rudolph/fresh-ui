<template>
    <div :class="['d-step', activeIndex === currentIndex ? 'active' : '']" :style="computedStyle">
        <div class="d-step__icon">
            <span :class="['icon', !$slots.icon ? 'default-style' : 'custom']">
                <slot name="icon"></slot>
                <template v-if="!$slots.icon">
                    <d-icon v-if="activeIndex >= currentIndex" name="checkmark-round"></d-icon>
                    <span v-else>{{currentIndex + 1}}</span>
                </template>
            </span>
        </div>
        <div class="d-step__title">
            <template v-if="title">{{title}}</template>
            <template v-else>
                <slot name="title"></slot>
            </template>
        </div>
        <div class="d-step__content">
            <template v-if="content">{{content}}</template>
            <template v-else>
                <slot></slot>
            </template>
        </div>
    </div>
</template>
<script>
import EventEmitter from '../mixins/event_emitter.js';
import DIcon from '../icon/icon';

export default {
    name: 'DStep',
    components: { DIcon },
    mixins: [EventEmitter],
    props: {
        title: {
            type: String,
            default: ''
        },
        content: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: ''
        }
    },
    computed: {
        itemsCount() {
            return this.$parent.itemsCount;
        },
        computedStyle() {
            return {
                width: this.itemsCount ? Math.floor(100 / this.itemsCount) + '%' : 0
            };
        },
        currentIndex() {
            return this.$parent.stepItems.indexOf(this);
        },
        activeIndex() {
            return this.$parent.active;
        }
    },
    created() {
        this.dispatch('DSteps', 'Step.add', this);
    }
}
</script>

