<template>
    <div class="d-carousel">
        <div class="d-carousel-contianer" :style="{height: carouselHeight}" @mouseenter="handleMouseEvent(true)" @mouseleave="handleMouseEvent(false)">
            <d-button class="d-carousel-arrow left" v-show="carouselItems.length > 1 && showArrow" @click="handleCarouselArrowClick(-1)">
                <d-icon name="chevron-left"></d-icon>
            </d-button>
            <div class="d-carousel-list" :style="transformStyle">
                <slot></slot>
            </div>
            <d-button class="d-carousel-arrow right" v-show="carouselItems.length > 1 && showArrow" @click="handleCarouselArrowClick(1)">
                <d-icon name="chevron-right"></d-icon>
            </d-button>
        </div>
        <ul :class="['d-carousel-indicators', indicator ? 'd-carousel-indicators--' + indicator : '', indicatorType ? 'd-carousel-indicators--' + indicatorType : '']">
            <li :class="['d-carousel-indicator', activeIndex === i - 1 ? 'is-active' : '' ]" v-for="i in carouselItems.length" :key="i" @mouseenter="handleIndicatorHover(i-1)" @click="handleIndicatorClick(i-1)">
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
        }
    },
    data() {
        return {
            carouselItems: [],
            showArrow: this.checkArrow(),
            transformStyle: {},
            timer: null
        }
    },
    computed: {
        activeIndex() {
            let index = 0;
            for (let i = 0; i < this.carouselItems.length; i++) {
                let item = this.carouselItems[i];
                if (item.active) {
                    index = i;
                    break;
                }
            }
            return index;
        },
        carouselHeight() {
            if (typeof this.height === 'string') {
                return this.height;
            }
            if (typeof this.height === 'number') {
                return this.height + 'px';
            }
            return 0;
        },
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
            if (this.carouselItems.length === 0) {
                item.active = true;
            }
            this.carouselItems.push(item);
            this.$nextTick(this.layoutCarouselItems);
        },
        handleItemRemove(item) {
            const res = [];
            const length = this.carouselItems.length;
            for (let i = 0; i < length; i++) {
                if (item !== this.carouselItems[i]) {
                    res.push(this.carouselItems[i]);
                }
            }
            const activeItem = res.find(item => item.active === true);
            if (!activeItem && res.length) {
                res[res.length - 1].active = true;
            }
            this.carouselItems = res;
            this.$nextTick(this.layoutCarouselItems);
        },
        handleCarouselArrowClick(dir = 1) {
            const length = this.carouselItems.length;
            let index = (this.activeIndex + dir) % length;
            if (index === -1) {
                index = length - 1;
            }
            this.handleIndicatorClick(index);
        },
        handleIndicatorHover(index) {
            if (this.trigger !== 'hover') {
                return;
            }
            this.handleIndicatorClick(index);
        },
        handleIndicatorClick(index) {
            if (this.activeIndex === index) {
                return;
            }
            const activeItem = this.carouselItems.find(item => item.active === true);
            const nextActiveItem = this.carouselItems[index];
            if (activeItem) {
                activeItem.active = false;
            }
            nextActiveItem.active = true;
            this.layoutCarouselItems();
        },
        layoutCarouselItems() {
            const activeIndex = this.activeIndex;
            const width = this.$el.offsetWidth;
            this.transformStyle = {
                width: this.carouselItems.length * width + 'px',
                transform: `translateX(${-activeIndex * width}px)`
            }
            this.carouselItems.forEach((item, idx) => item.transformStyle = { width: width + 'px' });
        },
        clearTimer() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        },
        autoPlayCarousel() {
            this.clearTimer();
            this.timer = setInterval(this.handleCarouselArrowClick, this.interval);
        }
    },
    created() {
        this.subscribe('carousel.item.add', this.handleItemAdd);
        this.subscribe('carousel.item.remove', this.handleItemRemove);
    },
    mounted() {
        this.layoutCarouselItems();
        if (this.autoplay) {
            this.autoPlayCarousel();
        }
    }
}
</script>
