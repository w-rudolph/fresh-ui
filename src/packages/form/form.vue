<template>
    <div :class="['d-form', inlineClass, labelPositionClass]">
        <slot></slot>
    </div>
</template>
<script>
import AsyncValidator from 'async-validator';
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
        },
        validateOnChange: {
            type: Boolean,
            default: false
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
                if (!this.validateOnChange) {
                    return;
                }
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
        validate(model = this.value, rules = this.mergedRules, single = false) {
            if (this.validator) {
                this.validator = null;
            }
            model = deepCopy(model);
            this.validator = new AsyncValidator(rules);
            const fields = Object.keys(this.mergedRules);
            const validateFields = Object.keys(rules);

            return new Promise((resolve, reject) => {
                this.validator.validate(model, errors => {
                    const error = { errors, validateFields, fields };
                    if (this.showErrors) {
                        this.broadcast('DFormItem', 'form.item.errors', error);
                    }
                    if (errors) {
                        reject(errors);

                    } else {
                        resolve(true);
                    }
                })
            });
        },
        validateField(key) {
            if (!key || !this.value.hasOwnProperty(key) || !this.mergedRules.hasOwnProperty(key)) {
                throw new Error(`${key} is not a valid prop`);
                retrun;
            }
            const model = { [key]: this.value[key] };
            const rules = { [key]: this.mergedRules[key] };
            return this.validate(model, rules, true);
        },
        resetFields() {
            this.isResetingForm = true;
            this.$emit('input', deepCopy(this.copyModel));
            this.$nextTick(() => {
                this.isResetingForm = false;
                const fields = Object.keys(this.mergedRules);
                this.broadcast('DFormItem', 'form.item.errors', { errors: [], validateFields: fields, fields });
            })
        },
        collectionRules({ prop, rules, type }) {
            this.$nextTick(() => {
                if (type === 'add') {
                    this.validateRules = { ...this.validateRules, [prop]: rules };
                } else {
                    let res = {};
                    for (let k in this.validateRules) {
                        if (k !== prop) {
                            res[k] = this.validateRules[k];
                        }
                    }
                    this.validateRules = res;
                }
            })
        }
    },
    created() {
        this.subscribe('form.item.rules.add', this.collectionRules);
        this.subscribe('form.item.rules.remove', this.collectionRules)
    },
    beforeDestroy() {
        this.validator = null;
    }
}
</script>
