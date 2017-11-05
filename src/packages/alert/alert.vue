<template>
    <transition name="alert-fade">
        <div :class="['d-alert', type ? 'd-alert--'+type: '', bigIcon ? 'big-icon':'']" v-if="showAlert">
            <d-icon v-if="showIcon" class="d-alert__icon" :name="icon"></d-icon>
            <div class="d-alert__content">
                <slot></slot>
            </div>
            <d-icon v-if="closable" class="d-alert__close" name="android-close" @click="closeAlert"></d-icon>
        </div>
    </transition>
</template>
<script>
import DIcon from '../icon/icon';

export default {
    name: 'DAlert',
    components: { DIcon },
    props: {
        type: {
            type: String,
            default: 'success'
        },
        showIcon: {
            type: Boolean,
            default: false
        },
        closable: {
            type: Boolean,
            default: false
        },
        bigIcon: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            showAlert: true
        }
    },
    computed: {
        icon() {
            return {
                'info': 'information-circled',
                'success': 'checkmark-circled',
                'warning': 'android-alert',
                'error': 'close-circled',
                'danger': 'close-circled'
            }[this.type] || '';
        }
    },
    methods: {
        closeAlert() {
            this.showAlert = false;
            this.$emit('close');
        }
    }
};
</script>
