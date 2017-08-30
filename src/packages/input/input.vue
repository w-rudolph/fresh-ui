<template>
    <input :class="'d-input' + computedClass " :value="currentValue" :disabled="disabled" @input="handleInputChange" @keyup.enter="handleInputKeyUp" :type="type">
</template>
<script>
export default {
    name: 'DInput',
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'text'
        },
        value: [String, Number],
        size: {
            type: String,
            default: ''
        }
    },
    computed: {
        computedClass() {
            return this.size ? ' d-input--' + this.size : '';
        }
    },
    data() {
        return {
            currentValue: this.value,
        }
    },
    watch: {
        value(val, oldValue) {
            this.setCurrentValue(val);
        }
    },
    methods: {
        handleInputChange(e) {
            const value = e.target.value;
            this.$emit('input', value, e);
            if (this.currentValue === value) {
                return;
            }
            this.setCurrentValue(value);
            this.$emit('change', value, e);
        },
        handleInputKeyUp(e) {
            this.$emit('enter', e.target.value, e);
        },
        setCurrentValue(val) {
            this.currentValue = val;
        }
    }
}
</script>
<style scoped>
.d-input {
    display: block;
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}

.d-input[disabled] {
    background-color: #eee;
    opacity: 1;
    cursor: not-allowed;
}

.d-input--lg {
    height: 46px;
    padding: 10px 16px;
    font-size: 18px;
    line-height: 1.3333333;
    border-radius: 6px;
}

.d-input--sm {
    height: 30px;
    padding: 5px 10px;
    font-size: 12px;
    line-height: 1.5;
    border-radius: 3px
}

</style>
