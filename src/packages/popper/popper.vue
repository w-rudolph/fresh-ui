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
import Popper from '../utils/popper';
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
        placement() {
            this.createPopper();
        },
        showPopper() {
            this.updatePopper();
        }
    },
    methods: {
        updatePopper() {
            this.popper.update();
        },
        createPopper() {
            const reference = this.reference;
            const popper = this.$el;
            const arrow = popper.querySelector('.d-popper__arrow');
            arrow.setAttribute('x-arrow', '');
            this.popper = new Popper(
                reference,
                popper,
                {
                    placement: this.placement,
                    arrowElement: arrow,
                    modifiers: {
                        flip: {
                            boundariesElement: document.body
                        }
                    }
                }
            );
        },
        popperToggle() {
            this.showPopper = !this.showPopper;
        }
    },
    mounted() {
        this.createPopper();
        const { reference, trigger } = this;
        if (trigger === 'click') {
            reference.addEventListener('click', _ => {
                this.popperToggle();
            });
        } else if (trigger === 'hover') {
            reference.addEventListener('mouseover', _ => {
                clearTimeout(this.timer);
                this.showPopper = true;
            });
            reference.addEventListener('mouseleave', _ => {
                this.timer = setTimeout(_ => {
                    this.showPopper = false;
                }, 200);
            });
            this.$el.addEventListener('mouseover', _ => {
                clearTimeout(this.timer);
                this.showPopper = true;
            });
            this.$el.addEventListener('mouseleave', _ => {
                this.timer = setTimeout(_ => {
                    this.showPopper = false;
                }, 100);
            });
        }

    },
    destroyed() {
        const { reference, trigger } = this;
        if (trigger === 'click') {
            reference.removeEventListener('click');
        } else if (trigger === 'hover') {
            reference.removeEventListener('mouseover');
            reference.removeEventListener('mouseleave');
            this.$el.removeEventListener('mouseover');
            this.$el.removeEventListener('mouseleave');
        }
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
