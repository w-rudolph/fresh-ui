<template>
    <div class="d-popper-container">
        <div :class="['d-popper', showPopper ? 'show' : '']" v-show="showPopper">
            <div class="d-popper__title">
                <slot name="title"></slot>
                <template v-if="!$slots.title">
                    {{title}}
                </template>
            </div>
            <div class="d-popper__content">
                <slot name="content"></slot>
                <template v-if="!$slots.content">
                    {{content}}
                </template>
            </div>
            <i class="d-popper__arrow"></i>
        </div>
        <span class="d-popper__ref">
            <slot></slot>
        </span>
    </div>
</template>
<script>
import Popper from 'popper.js';

export default {
    name: 'DPopper',
    props: {
        placement: {
            type: String,
            default: 'top',
        },
        title: {
            type: String,
            default: ''
        },
        content: {
            type: String,
            default: ''
        },
        trigger: {
            type: String,
            default: 'click'
        },
        appendToBody: {
            type: Boolean,
            default: false
        },
        hideWhenClickOutside: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            reference: null,
            popper: null,
            showPopper: false,
            timer: null,
            popperInstance: null
        }
    },
    watch: {
        placement(v) {
            this.createPopper();
        },
        showPopper() {
            this.popperInstance ? this.updatePopper() : this.createPopper();
        }
    },
    methods: {
        updatePopper() {
            this.popperInstance.update();
        },
        createPopper() {
            if (this.popperInstance) {
                this.popperInstance.destroy();
            }
            const { popper, reference } = this;
            const arrow = this.$el.querySelector('.d-popper__arrow');
            arrow.setAttribute('x-arrow', '');
            if (this.appendToBody) {
                document.body.appendChild(popper);
            }
            this.popperInstance = new Popper(
                reference,
                popper,
                {
                    placement: this.placement,
                    arrowElement: arrow,
                }
            );
        },
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
            if (!this.reference.contains(e.target) && !this.popper.contains(e.target) && this.showPopper) {
                this.showPopper = false;
            }
        }
    },
    created() {
        console.log(this.$slots.content)
    },
    mounted() {
        this.popper = this.$el.querySelector('.d-popper');
        this.reference = this.$el.querySelector('.d-popper__ref');
        this.createPopper();
        const { reference, trigger, popper } = this;
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
    destroyed() {
        const { reference, trigger, popper } = this;
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
}
</script>