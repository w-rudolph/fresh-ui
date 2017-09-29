<template>
    <button :disabled="disabled" @click="handleBtnClick" :class="computedClass">
        <template v-if="loading">
            <d-icon name="load-c"></d-icon>&nbsp;{{loadingText}}</template>
        <template v-else>
            <d-icon v-if="icon" :name="icon"></d-icon>
            <slot></slot>
        </template>
    </button>
</template>
<script>
import DIcon from '../icon/icon';

export default {
    name: 'DButton',
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: ''
        },
        loading: {
            type: Boolean,
            default: false,
        },
        loadingText: {
            type: String,
            default: '加载中',
        },
        icon: {
            type: String,
            default: '',
        }
    },
    computed: {
        computedClass() {
            const type = this.type ? ' d-btn--' + this.type : '';
            const size = this.size ? ' d-btn--' + this.size : '';
            const loading = this.loading ? ' loading' : '';
            return 'd-btn' + type + size + loading;
        }
    },
    methods: {
        handleBtnClick(e) {
            if (this.loading) {
                return;
            }
            this.$emit('click', e);
        }
    }
}
</script>