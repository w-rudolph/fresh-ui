<template>
    <span :class="computedClass" v-if="show">
        <slot></slot>
        <DIcon class="d-icon" v-if="closable" name="close" @click="handleClick" />
    </span>
</template>
<script>
import DIcon from '../icon/icon';

export default {
    name: 'DTag',
    components: [DIcon],
    props: {
        type: {
            type: String,
            default: ''
        },
        closable: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            show: true,
        };
    },
    computed: {
        computedClass() {
            const type = this.type ? ' d-tag--' + this.type : '';
            return 'd-tag' + type;
        }
    },
    methods: {
        handleClick(e) {
            if (!this.closable) {
                return;
            }
            this.show = false;
            this.$emit('icon-click', e);
        }
    }
}
</script>