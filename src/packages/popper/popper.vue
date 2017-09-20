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
        transition: {
            type: String,
            default: 'popper-fade',
        }
    },
    data() {
        return {
            ns: 'popper',
        }
    },
}
</script>