<template>
    <div class="d-checkout-group">
        <slot></slot>
    </div>
</template>
<script>
import EventEmitter from '../../mixins/event_emitter';

export default {
    name: 'DCheckboxGroup',
    props: {
        value: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    mixins: [EventEmitter],
    data() {
        return {
            currentValue: this.value
        }
    },
    watch: {
        value(v) {
            this.setCurrentValue(v);
            this.broadcastValues(v);
        }
    },
    methods: {
        setCurrentValue(v) {
            this.currentValue = v;
            this.$emit('input', v);
        },
        broadcastValues(v) {
            this.broadcast('DCheckbox', 'init_values', v);
        },
    },
    created() {
        this.subscribe('set_values', ({ value, append }) => {
            const values = JSON.parse(JSON.stringify(this.currentValue));
            const index = values.indexOf(value);
            if (append && index > -1) {
                return;
            }
            if (append) {
                values.push(value);
            } else if (index > -1) {
                values.splice(index, 1);
            }
            this.setCurrentValue(values)
        })
    },
    mounted() {
        this.broadcastValues(this.value);
    }
}
</script>
<style scoped>

</style>


