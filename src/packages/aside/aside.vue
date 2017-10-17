<template>
    <div :class="['d-aside', visible || value ? 'visible' : '', placement]">
        <d-icon class="d-aside__icon" name="close" @click="close"></d-icon>
        <slot></slot>
    </div>
</template>
<script>
import Popup from '../mixins/popup.js';
import DIcon from '../icon/icon';

export default {
    name: 'DAside',
    mixins: [Popup],
    components: { DIcon },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        visible: {
            type: Boolean,
            default: false
        },
        placement: {
            type: String,
            default: 'left'
        },
        hasWrapper: {
            type: Boolean,
            default: false
        },
        closeOnClickModal: {
            type: Boolean,
            default: true
        }
    }
}
</script>
