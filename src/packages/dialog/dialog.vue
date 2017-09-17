<template>
    <div class="d-dialog__wrapper" v-show="visible" @click="handleWrapperClick">
        <transition>
            <div :class="['d-dialog', size ? 'd-dialog--'+size : '']" @click="handleDialogClick">
                <div class="d-dialog__header">
                    <div class="d-dialog__title">{{title}}</div>
                    <d-icon class="d-dialog__icon" name="close" @click="handleClose"></d-icon>
                </div>
                <div class="d-dialog__content">
                    <slot></slot>
                </div>
                <div class="d-dialog__footer">
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import PopupManager from '../utils/popup-manager.js';

export default {
    name: 'DDialog',
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: ''
        },
        closeOnClickModal: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: ''
        }
    },
    watch: {
        visible(val) {
            this.$emit('update:visible', val);
            this.updatePopupManager(val);
        }
    },
    methods: {
        updatePopupManager(val) {
            if (val) {
                PopupManager.openInstance(this.$el);
            } else {
                PopupManager.closeInstance(this.$el);
            }
        },
        handleWrapperClick(e) {
            e.preventDefault();
            e.stopPropagation();
            this.$emit('update:visible', false);
            if (this.closeOnClickModal) {
                PopupManager.closeInstance(this.$el);
            }
        },
        handleDialogClick(e) {
            e.preventDefault();
            e.stopPropagation();
        },
        handleClose() {
            this.$emit('update:visible', false);
            this.updatePopupManager(false);
        }
    },
    mounted() {
        if (this.visible) {
            PopupManager.openInstance(this.$el);
        }
    }
}
</script>
