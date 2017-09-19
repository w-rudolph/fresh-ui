<template>
    <transition name="message-slide">
        <div class="d-message" @mouseenter="clearTimer" @mouseleave="scheduleClose" v-show="visible">
            <d-icon :class="['d-message__icon', this.type || '']" :name="typeName"></d-icon>
            <div class="d-message__content">
                <slot name="message"></slot>
                <template v-if="!$slots.message">{{message}}</template>
            </div>
            <d-icon v-if="showClose" class="d-message__close" name="close" @click="close"></d-icon>
        </div>
    </transition>
</template>
<script>
import DIcon from '../icon/icon';

export default {
    components: { DIcon },
    data() {
        return {
            visible: false,
            message: '',
            duration: 3000,
            type: 'info',
            onClose: null,
            showClose: false,
            timer: null,
            type_maps: {
                'info': 'information-circled',
                'success': 'checkmark-circled',
                'warning': 'android-alert',
                'error': 'alert-circled',
            }
        }
    },
    computed: {
        typeName() {
            return this.type_maps[this.type] || 'info';
        }
    },
    methods: {
        close() {
            this.visible = false;
            this.$el.addEventListener('transitionend', _ => {
                if (this.onClose) {
                    this.onClose();
                }
                this.$el.remove();
            })
        },
        show() {
            this.visible = true;
        },
        scheduleClose() {
            if (this.duration <= 0) {
                return;
            }
            this.timer = setTimeout(_ => {
                this.close();
            }, this.duration);
        },
        clearTimer() {
            clearTimeout(this.timer);
            this.timer = null
        }
    },
    created() {
        if (this.message.hasOwnProperty('componentOptions')) { //VNode
            this.$slots.message = [this.message];
        }
    }
}
</script>
