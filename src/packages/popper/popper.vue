<template>
    <div class="d-popper" v-show="showPopper">
        <div class="d-popper__title">{{title}}</div>
        <div class="d-popper__content">
            <slot name="content"></slot>
        </div>
        <i class="d-popper__arrow"></i>
    </div>
</template>
<script>
import Popper from 'popper.js';
import '../utils/popper_directive';

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
            showPopper: false,
            timer: null,
            popper: null
        }
    },
    watch: {
        placement(v) {
            this.createPopper();
        },
        showPopper() {
            this.popper ? this.updatePopper() : this.createPopper();
        }
    },
    methods: {
        updatePopper() {
            this.popper.update();
        },
        createPopper() {
            if (this.popper) {
                this.popper.destroy();
            }
            const reference = this.reference;
            const popper = this.$el;
            const arrow = popper.querySelector('.d-popper__arrow');
            arrow.setAttribute('x-arrow', '');
            if (this.appendToBody) {
                document.body.appendChild(popper);
            }
            this.popper = new Popper(
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
            if (!this.reference.contains(e.target) && !this.$el.contains(e.target) && this.showPopper) {
                this.showPopper = false;
            }
        }
    },
    mounted() {
        this.createPopper();
        const { reference, trigger } = this;
        if (trigger === 'click') {
            reference.addEventListener('click', this.handleToggleClick);
            if (this.hideWhenClickOutside) {
                document.addEventListener('click', this.handleDocumentClick);
            }
        }
        if (trigger === 'hover') {
            reference.addEventListener('mouseover', this.handleMouseEnter);
            reference.addEventListener('mouseleave', this.handleMouseLeave);
            this.$el.addEventListener('mouseover', this.handleMouseEnter);
            this.$el.addEventListener('mouseleave', this.handleMouseLeave);
        }
    },
    destroyed() {
        const { reference, trigger } = this;
        if (trigger === 'click') {
            reference.removeEventListener('click', this.handleToggleClick);
            if (this.hideWhenClickOutside) {
                document.removeEventListener('click', this.handleDocumentClick);
            }
        }
        if (trigger === 'hover') {
            reference.removeEventListener('mouseover', this.handleMouseEnter);
            reference.removeEventListener('mouseleave', this.handleMouseLeave);
            this.$el.removeEventListener('mouseover', this.handleMouseEnter);
            this.$el.removeEventListener('mouseleave', this.handleMouseLeave);
        }
        this.popper.destroy();
    }
}
</script>
<style>
.d-popper {
    display: inline-block;
    background: #fff;
    min-width: 150px;
    border-radius: 2px;
    border: 1px solid #d1dbe5;
    padding: 10px;
    z-index: 2000;
    font-size: 12px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    margin-top: -10px;
}

.d-popper__arrow {
    position: absolute;
    width: 8px;
    height: 8px;
    border-color: transparent;
    border-style: solid;
    border-width: 1px;
    background: #fff;
    border-right-color: #d1dbe5;
    border-bottom-color: #d1dbe5;
}

.d-popper[x-placement^=top] {
    margin: 0 0 10px 0;
}

.d-popper[x-placement^=right] {
    margin: 0 0 0 10px;
}

.d-popper[x-placement^=bottom] {
    margin: 10px 0 0 0;
}

.d-popper[x-placement^=left] {
    margin: 0 10px 0 0;
}

.d-popper[x-placement^=top] .d-popper__arrow {
    bottom: -5px;
    transform: rotate(45deg);
}

.d-popper[x-placement^=right] .d-popper__arrow {
    left: -5px;
    transform: rotate(135deg);
}


.d-popper[x-placement^=bottom] .d-popper__arrow {
    top: -5px;
    transform: rotate(-135deg);
}

.d-popper[x-placement^=left] .d-popper__arrow {
    right: -5px;
    transform: rotate(-45deg);
}
</style>
