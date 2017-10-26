<template>
    <div :class="['d-card', shadow ? 'shadow' : '', shadowOnHover ? 'shadow-on-hover' : '']">
        <div class="d-card__header" v-if="$slots.header">
            <slot name="header"></slot>
        </div>
        <div class="d-card__body">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import { addClass, removeClass } from '../utils/dom.js';

export default {
    name: 'DCard',
    props: {
        shadow: {
            type: Boolean,
            default: false
        },
        shadowOnHover: {
            type: Boolean,
            default: false
        }
    }
}
</script>
