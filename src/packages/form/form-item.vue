<template>
    <div :class="['d-form-item', required ? 'required' : '', error ? 'error' : '']">
        <div class="d-form-item__label" :style="labelStyle">{{label}}</div>
        <div class="d-form-item__content" :style="contentStyle">
            <slot></slot>
            <transition name="form-item-fade">
                <div class="d-form-item__error" v-if="error">{{error.message}}</div>
            </transition>
        </div>
    </div>
</template>
<script>
import EventEmitter from '../mixins/event_emitter';

export default {
    name: 'DFormItem',
    mixins: [EventEmitter],
    props: {
        label: {
            type: String,
            default: ''
        },
        prop: {
            type: String,
            default: ''
        },
        rules: {
            type: [Object, Array],
            default: () => { }
        },
        required: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            error: null
        }
    },
    computed: {
        labelWidth() {
            return this.$parent.labelPosition === 'top' ? null : this.$parent.labelWidth;
        },
        labelStyle() {
            return {
                width: this.labelWidth
            }
        },
        contentStyle() {
            return {
                marginLeft: this.labelWidth
            }
        }
    },
    methods: {
        dispatchItemRules(type) {
            const { prop, rules } = this;
            if (prop && rules) {
                this.dispatch('DForm', `form.item.rules.${type}`, { prop, rules, type });
            }
        },
        displayErrors({ errors, fields, validateFields }) {
            validateFields.forEach(f => {
                if (fields.indexOf(f) > -1 && f === this.prop) {
                    this.error = (errors || []).find(err => err.field === this.prop);
                }
            })
        }
    },
    created() {
        this.subscribe('form.item.errors', this.displayErrors);
        this.dispatchItemRules('add');
    },
    beforeDestroy() {
        this.dispatchItemRules('remove');
    }
}
</script>
