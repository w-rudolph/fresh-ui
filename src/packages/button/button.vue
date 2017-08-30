<template>
    <button :disabled="disabled" @click="handleBtnClick" :class="computedClass">
        <slot></slot>
    </button>
</template>
<script>
export default {
    name: 'DButton',
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'default'
        },
        size: {
            type: String,
            default: 'sm'
        }
    },
    data() {
        return {

        };
    },
    computed: {
        computedClass() {
            return 'd-btn d-btn-' + this.type + ' d-btn-' + this.size;
        }
    },
    methods: {
        handleBtnClick(e) {
            this.$emit('click', e);
        }
    }
}
</script>
<style scoped>
.d-btn {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
}

.d-tag-default {
    color: #333;
    background-color: #fff;
    border-color: #ccc;
}

.d-btn-primary {
    color: #fff;
    background-color: #337ab7;
    border-color: #2e6da4;
}

.d-btn-info {
    color: #fff;
    background-color: #5bc0de;
    border-color: #46b8da;
}

.d-btn-success {
    color: #fff;
    background-color: #5cb85c;
    border-color: #4cae4c;
}

.d-btn-warning {
    color: #fff;
    background-color: #f0ad4e;
    border-color: #eea236;
}

.d-btn-danger {
    color: #fff;
    background-color: #d9534f;
    border-color: #d43f3a;
}

.d-btn-link {
    font-weight: 400;
    color: #337ab7;
    border-radius: 0;
    background-color: transparent;
    -webkit-box-shadow: none;
    box-shadow: none;
}

.d-btn-lg {
    padding: 10px 16px;
    font-size: 18px;
    line-height: 1.3333333;
    border-radius: 6px;
}

.d-btn-xs {
    padding: 5px 10px;
    font-size: 12px;
    line-height: 1.5;
    border-radius: 3px;
}
</style>
