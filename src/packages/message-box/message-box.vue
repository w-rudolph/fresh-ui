<template>
    <transition name="message-box-fade">
        <div class="d-message-box__wrapper" v-show="visible">
            <div class="d-message-box">
                <div class="d-message-box__header">
                    <div class="d-message-box__title">{{title}}</div>
                    <d-icon v-if="showClose" class="d-message-box__close" name="close" @click="close"></d-icon>
                </div>
                <div class="d-message-box__content">
                    <slot name="message"></slot>
                    {{closeOnClickModal}}
                    <template v-if="!$slots.message">{{message}}</template>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import DIcon from '../icon/icon';
import Popup from '../mixins/popup.js';

export default {
    mixins: [Popup],
    components: { DIcon },
    props: {
        title: '',
        message: '',
        visible: true,
        showClose: true
    },
    data() {
        return {
            bodyScrollLockClass: 'scroll-lock--messageBox'
        }
    },
    methods: {
        close() {
            this.visible = false;
            this.updatePopupManager(false);
            setTimeout(_ => {
                if (this.onClose) {
                    this.onClose();
                }
                this.$el.remove();
            }, 300);
        },
        show() {
            this.visible = true;
            this.updatePopupManager(true);
        }
    },
    created() {
        if (this.message.hasOwnProperty('componentOptions')) {
            this.$slots.message = [this.message];
        }
    },
}
</script>
