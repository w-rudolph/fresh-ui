<template>
    <div :class="['d-form', inlineClass, labelPositionClass]">
        <slot></slot>
    </div>
</template>
<script>
import Schema from 'async-validator';
import EventEmitter from '../mixins/event_emitter';

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
        model: {
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
            validateRules: {}
        };
    },
    watch: {
        model: {
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
            this.validate().then(_ => { }).catch(_ => { });
        },
        validate() {
            const validator = new Schema(this.mergedRules);
            return new Promise((resolve, reject) => {
                validator.validate(this.model, (errors, fields) => {
                    if (errors) {
                        reject(errors)
                        if (this.showErrors) {
                            this.broadcast('DFormItem', 'form.item.errors', errors);
                        }
                    } else {
                        resolve(true);
                        this.broadcast('DFormItem', 'form.item.errors', []);
                    }
                })
            });
        },
        validateField() {

        },
        resetFields() {
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
    }
}
</script>
