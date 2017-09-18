<template>
    <div class="d-dialog__wrapper" v-show="visible">
        <transition>
            <div :class="['d-dialog', size ? 'd-dialog--'+size : '']">
                <div class="d-dialog__header">
                    <div class="d-dialog__title">{{title}}</div>
                    <d-icon class="d-dialog__icon" name="close" @click="close"></d-icon>
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
import Popup from '../mixins/popup.js';
export default {
    name: 'DDialog',
    mixins: [Popup],
}
</script>
