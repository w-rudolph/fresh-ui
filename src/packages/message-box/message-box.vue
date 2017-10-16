<template>
    <transition name="message-box-fade">
        <div class="d-message-box__wrapper" v-show="visible">
            <div :class="['d-message-box', type]">
                <div class="d-message-box__header">
                    <div class="d-message-box__title">{{title}}</div>
                    <d-icon v-if="showClose" class="d-message-box__close" name="close" @click="handleClose('cancel')"></d-icon>
                </div>
                <div class="d-message-box__content">
                    <slot name="message"></slot>
                    <template v-if="!$slots.message">{{message}}</template>
                    <template v-if="type === 'prompt'">
                        <d-input v-model="input_value" class="d-message-box__input"></d-input>
                    </template>
                </div>
                <div class="d-message-box__footer">
                    <d-button type="default" v-if="cancelText" @click="handleClose('cancel')">{{cancelText}}</d-button>
                    <d-button type="primary" class="confirm_btn" v-if="confirmText" @click="handleClose('confirm')">{{confirmText}}</d-button>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import DIcon from '../icon/icon';
import DButton from '../button/button';
import DInput from '../input/input';
import Popup from '../mixins/popup.js';
import { addClass, removeClass } from '../utils/dom.js';

export default {
    mixins: [Popup],
    components: { DIcon },
    props: {
        title: '',
        message: '',
        type: '',
        cancelText: '',
        confirmText: '',
        visible: false,
        showClose: true,
        beforeClose: null,
        callback: null
    },
    data() {
        return {
            input_value: '',
        }
    },
    methods: {
        close(action) {
            this.visible = false;
            this.updatePopupManager(false);
            setTimeout(_ => {
                if (typeof this.callback === 'function') {
                    this.callback(action);
                }
                this.$el.remove();
                this.toggleBodyScrollClass(false);
            }, 200);
        },
        handleClose(action) {
            const data = this.type === 'prompt' ? { action, value: this.input_value } : action;
            if (typeof this.beforeClose === 'function') {
                this.beforeClose(data, this.close);
            } else {
                this.close(data);
            }
        },
        show() {
            this.visible = true;
            this.updatePopupManager(true);
            this.toggleBodyScrollClass(true);
        },
        toggleBodyScrollClass(flag) {
            if (this.bodyScrollLock) {
                (flag ? addClass : removeClass)(document.body, 'body-scroll-lock--messageBox');
            }
        }
    },
    created() {
        if (this.message.hasOwnProperty('componentOptions')) {
            this.$slots.message = [this.message];
        }
    },
    mounted() {

    }
}
</script>
