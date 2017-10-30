<template>
    <div class="d-carousel">
        <div class="d-carousel-contianer" :style="{height: carouselHeight}" @mouseenter="handleMouseEvent(true)" @mouseleave="handleMouseEvent(false)">
            <d-button class="d-carousel-arrow left" v-show="indicatorCount > 1 && showArrow" @click="handleCarouselArrowClick(-1)">
                <d-icon name="chevron-left"></d-icon>
            </d-button>
            <div class="d-carousel-list" :style="transformStyle">
                <slot></slot>
            </div>
            <d-button class="d-carousel-arrow right" v-show="indicatorCount > 1 && showArrow" @click="handleCarouselArrowClick(1)">
                <d-icon name="chevron-right"></d-icon>
            </d-button>
        </div>
        <ul :class="['d-carousel-indicators', indicator ? 'd-carousel-indicators--' + indicator : '', indicatorType ? 'd-carousel-indicators--' + indicatorType : '']">
            <li :class="['d-carousel-indicator', activeIndex === i - 1 ? 'is-active' : '' ]" v-for="i in indicatorCount" :key="i" @mouseenter="handleIndicatorHover(i-1)" @click="handleIndicatorClick(i-1)">
                <div class="d-carousel-indicator__button" :style="{backgroundColor: activeIndex === i - 1 ? indicatorActiveColor : indicatorColor}"></div>
            </li>
        </ul>
    </div>
</template>
<script>
import DIcon from '../icon/icon';
import DButton from '../button/button';
import EventEmitter from '../mixins/event_emitter';
import { makeIndexArray } from '../utils/util';

export default {
    name: 'DCarousel',
    components: { DIcon },
    mixins: [EventEmitter],
    props: {
        animation: {
            type: String,
            default: 'fade'
        },
        arrow: {
            type: String,
            default: 'hover' // 'always', 'hover', 'none'
        },
        trigger: {
            type: String,
            default: 'hover' // 'hover', 'click'
        },
        height: {
            type: [Number, String],
            default: 300
        },
        indicator: {
            type: String,
            default: 'inside' // 'inside', 'outside', 'none'
        },
        indicatorActiveColor: {
            type: String,
            default: '#219BF7'
        },
        indicatorColor: {
            type: String,
            default: '#eee'
        },
        indicatorType: {
            type: String,
            default: 'line' // 'line', 'dot'
        },
        interval: {
            type: Number,
            default: 3000
        },
        autoplay: {
            type: Boolean,
            default: false
        },
        itemWidth: {
            type: Number,
            default: 0
        },
        initialIndex: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            carouselItems: [],
            showArrow: this.checkArrow(),
            transformStyle: {},
            timer: null,
            activeIndex: 0,
            indicatorCount: 0,
        }
    },
    computed: {
        carouselHeight() {
            if (typeof this.height === 'string') {
                return this.height;
            }
            if (typeof this.height === 'number') {
                return this.height + 'px';
            }
            return 0;
        }
    },
    watch: {
        activeIndex(val) {
            this.layoutCarouselItems();
            this.$emit('change', val);
        }
    },
    methods: {
        handleMouseEvent(isShow) {
            if (this.autoplay) {
                if (isShow) {
                    this.clearTimer();
                } else {
                    this.autoPlayCarousel();
                }
            }
            if (this.arrow === 'hover') {
                return this.showArrow = isShow;
            }
        },
        getIndicatorCount() {
            let count = this.carouselItems.length;
            const containerWidth = this.$el.offsetWidth;
            const itemWidth = this.itemWidth;
            if (itemWidth) {
                const n = containerWidth / itemWidth;
                if (n >= 1) {
                    count = Math.ceil(count / Math.floor(n));
                }
            }
            return count;
        },
        checkArrow() {
            if (this.arrow === 'always') {
                return true;
            }
            return false;
        },
        handleItemAdd(item) {
            const index = this.carouselItems.indexOf(item);
            if (index > -1) {
                return;
            }
            this.carouselItems.push(item);
            this.indicatorCount = this.getIndicatorCount();
            if (this.carouselItems.length === 1) {
                this.activeIndex = 0;
            }
        },
        handleItemRemove(item) {
            const res = [];
            const length = this.carouselItems.length;
            for (let i = 0; i < length; i++) {
                if (item !== this.carouselItems[i]) {
                    res.push(this.carouselItems[i]);
                }
            }
            this.carouselItems = res;
            this.indicatorCount = this.getIndicatorCount();
            if (this.itemWidth && this.activeIndex === this.indicatorCount - 1) {
                this.layoutCarouselItems();
            }
            if (this.activeIndex > this.indicatorCount - 1) {
                this.activeIndex = this.indicatorCount - 1;
            }
        },
        handleCarouselArrowClick(dir = 1) {
            dir === -1 ? this.prev() : this.next();
        },
        handleIndicatorHover(index) {
            if (this.trigger !== 'hover') {
                return;
            }
            this.handleIndicatorClick(index);
        },
        handleIndicatorClick(indicatorIndex) {
            this.activeIndex = indicatorIndex;
        },
        layoutCarouselItems() {
            const containerWidth = this.$el.offsetWidth;
            const itemCount = this.carouselItems.length;
            let itemWidth = this.itemWidth;
            let offset = containerWidth;
            if (itemWidth) {
                const n = containerWidth / itemWidth;
                if (n - parseInt(n) < 0.01) {
                    itemWidth = containerWidth;
                }
                offset = Math.floor(containerWidth / itemWidth) * itemWidth;
            }
            offset = this.activeIndex * offset;

            if (this.activeIndex > 0 && this.activeIndex === this.indicatorCount - 1 && itemWidth) {
                offset = itemCount * itemWidth - containerWidth;
            }
            this.transformStyle = {
                width: this.carouselItems.length * containerWidth + 'px',
                transform: `translateX(${-offset}px)`
            }

            itemWidth = itemWidth ? itemWidth : containerWidth;
            this.carouselItems.forEach((item, idx) => item.transformStyle = { width: itemWidth + 'px' });
        },
        clearTimer() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        },
        autoPlayCarousel() {
            this.clearTimer();
            this.timer = setInterval(_ => {
                this.activeIndex = (this.activeIndex + 1) % this.indicatorCount;
            }, this.interval);
        },
        prev() {
            this.activeIndex = (this.activeIndex - 1 + this.indicatorCount) % this.indicatorCount;
        },
        next(index) {
            this.activeIndex = (this.activeIndex + 1) % this.indicatorCount;
        },
        setActiveIndex(index) {
            if (index < 0) {
                this.activeIndex = 0;
            }
            if (index > this.indicatorCount - 1) {
                this.activeIndex = this.indicatorCount - 1;
            }
            else {
                this.activeIndex = index;
            }
        }
    },
    created() {
        this.subscribe('carousel.item.add', this.handleItemAdd);
        this.subscribe('carousel.item.remove', this.handleItemRemove);
    },
    mounted() {
        this.indicatorCount = this.getIndicatorCount();
        this.setActiveIndex(this.initialIndex);
        this.layoutCarouselItems();
        if (this.autoplay) {
            this.autoPlayCarousel();
        }
    }
}
</script>
