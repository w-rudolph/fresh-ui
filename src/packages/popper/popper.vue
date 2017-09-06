<template>
    <div :class="`d-${ns}-container`">
        <transition :name="`${transition}`">
            <div ref="popper" :class="[`d-${ns} ${theme}`, showPopper ? 'show' : '']" v-show="showPopper">
                <div :class="`d-${ns}__title`">
                    <slot name="title"></slot>
                    <template v-if="!$slots.title">
                        {{title}}
                    </template>
                </div>
                <div :class="`d-${ns}__content`">
                    <slot name="content"></slot>
                    <template v-if="!$slots.content">
                        {{content}}
                    </template>
                </div>
                <i v-if="showArrow" ref="arrow" :class="`d-${ns}__arrow`"></i>
            </div>
        </transition>
        <span ref="reference" :class="`d-${ns}__ref`">
            <slot></slot>
        </span>
    </div>
</template>
<script>
import Popper from 'popper.js';
import PopperMixin from '../mixins/popper.js';

export default {
    name: 'DPopper',
    mixins: [PopperMixin],
    props: {
        trigger: {
            type: String,
            default: 'click'
        },
        hideWhenClickOutside: {
            type: Boolean,
            default: false
        },
        theme: {
            type: String,
            default: 'light'
        },
        transition: { // fade, slide
            type: String,
            default: 'fade',
        }
    },
    data() {
        return {
            timer: null,
            ns: 'popper',
        }
    },
    methods: {
        popperToggle() {
            this.showPopper = !this.showPopper;
        },
        handleMouseEnter() {
            clearTimeout(this.timer);
            this.showPopper = true;
        },
        handleMouseLeave() {
            this.timer = setTimeout(_ => {
                this.showPopper = false;
            }, 200);
        },
        handleToggleClick() {
            this.showPopper = !this.showPopper;
        },
        handleDocumentClick(e) {
            const reference = this.$refs.reference;
            const popper = this.$refs.popper;
            if (!reference.contains(e.target) && !popper.contains(e.target) && this.showPopper) {
                this.showPopper = false;
            }
        },
        bindEvents() {
            const trigger = this.trigger;
            const reference = this.$refs.reference;
            const popper = this.$refs.popper;
            if (trigger === 'click') {
                reference.addEventListener('click', this.handleToggleClick);
                if (this.hideWhenClickOutside) {
                    document.addEventListener('click', this.handleDocumentClick);
                }
            }
            if (trigger === 'hover') {
                reference.addEventListener('mouseover', this.handleMouseEnter);
                reference.addEventListener('mouseleave', this.handleMouseLeave);
                popper.addEventListener('mouseover', this.handleMouseEnter);
                popper.addEventListener('mouseleave', this.handleMouseLeave);
            }
        },
        offEvents() {
            const trigger = this.trigger;
            const reference = this.$refs.reference;
            const popper = this.$refs.popper;
            if (trigger === 'click') {
                reference.removeEventListener('click', this.handleToggleClick);
                if (this.hideWhenClickOutside) {
                    document.removeEventListener('click', this.handleDocumentClick);
                }
            }
            if (trigger === 'hover') {
                reference.removeEventListener('mouseover', this.handleMouseEnter);
                reference.removeEventListener('mouseleave', this.handleMouseLeave);
                popper.removeEventListener('mouseover', this.handleMouseEnter);
                popper.removeEventListener('mouseleave', this.handleMouseLeave);
            }
            this.popperInstance.destroy();
        }
    },
    mounted() {
        this.createPopper();
        this.bindEvents();
    },
    beforeDestroy() {
        this.offEvents();
    }
}
</script>