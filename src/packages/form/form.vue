<template>
    <div :class="['d-form', inlineClass, labelPositionClass]">
        <slot></slot>
    </div>
</template>
<script>
import Schema from 'async-validator';
import EventEmitter from '../mixins/event_emitter';
import { deepCopy } from '../utils/util.js';

export default {
    name: 'DForm',
    mixins: [EventEmitter],
    props: {
        labelWidth: {
            type: String,
            default: ''
        },
        inline: {
            type: Boolean,
            default: false
        },
        labelPosition: {
            type: String,
            default: ''  // [right, left, top]
        },
        value: {
            type: Object,
            default: () => { }
        },
        rules: {
            type: Object,
            default: () => { }
        },
        showErrors: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            validateRules: {},
            copyModel: deepCopy(this.value || {}),
            validator: null,
            isResetingForm: false,
        };
    },
    watch: {
        value: {
            deep: true,
            handler() {
                this.handleModelChange();
            }
        }
    },
    computed: {
        inlineClass() {
            return this.inline ? 'd-form--inline' : '';
        },
        labelPositionClass() {
            return this.labelPosition ? 'd-form__label-' + this.labelPosition : ''
        },
        mergedRules() {
            return {
                ...this.rules,
                ...this.validateRules
            };
        }
    },
    methods: {
        handleModelChange() {
            if (this.isResetingForm) {
                return;
            }
            this.validate().then(_ => { }).catch(_ => { });
        },
        validate(model = this.value) {
            if (this.validator) {
                this.validator = null;
            }
            model = deepCopy(model);
            const keys = Object.keys(model);
            this.validator = new Schema(this.mergedRules);

            return new Promise((resolve, reject) => {
                this.validator.validate(deepCopy(model), (errors, fields) => {
                    if (errors) {
                        errors = errors.filter(err => keys.indexOf(err.field) > -1);
                        reject(errors);
                        if (this.showErrors) {
                            this.broadcast('DFormItem', 'form.item.errors', errors);
                        }
                    } else {
                        resolve(true);
                        if (this.showErrors) {
                            this.broadcast('DFormItem', 'form.item.errors', []);
                        }
                    }
                })
            });
        },
        validateField(key) {
            return this.validate({ [key]: this.value[key] });
        },
        resetFields() {
            this.isResetingForm = true;
            this.$emit('input', deepCopy(this.copyModel));
            this.$nextTick(() => {
                this.isResetingForm = false;
                this.broadcast('DFormItem', 'form.item.errors', []);
            })
        },
        collectionRules({ prop, rules }) {
            this.$nextTick(() => {
                this.validateRules = {
                    ...this.validateRules,
                    [prop]: rules
                };
            })
        }
    },
    created() {
        this.subscribe('form.item.rules', this.collectionRules)
    },
    beforeDestroy() {
        this.validator = null;
    }
}
</script>
