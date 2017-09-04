<template>
    <div :class="['d-input', , this.icon ? 'has-icon' : '']">
        <input :class="['d-input__inner', this.size ? 'd-input--' + this.size : '']" :value="currentValue" :placeholder="placeholder" :disabled="disabled" @input="handleInputChange" @keyup.enter="handleInputKeyUp" :type="type">
        <d-icon class="d-input__icon" v-if="this.icon" :name="icon"></d-icon>
    </div>
</template>
<script>
import DIcon from '../icon/icon';
export default {
    name: 'DInput',
    components: { DIcon },
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
        },
        placeholder: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: ''
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

</style>
