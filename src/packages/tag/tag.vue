<template>
    <span :class="computedClass">
        <slot></slot>
        <DIcon v-if="icon" class="tag-icon" @click="handleClick" :name="icon" />
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
            default: 'default'
        },
        icon: {
            type: String,
            default: ''
        }
    },
    computed: {
        computedClass() {
            return 'd-tag d-tag-' + this.type;
        }
    },
    methods: {
        handleClick(e) {
            if (!this.icon) {
                return;
            }
            this.$emit('icon-click', e);
        }
    }
}
</script>
<style scoped>
.d-tag {
    display: inline;
    padding: .2em .6em .3em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: .25em;
}

.d-tag-primary {
    background-color: #337ab7;
}

.d-tag-warning {
    background-color: #f0ad4e;
}

.d-tag-success {
    background-color: #5cb85c;
}

.d-tag-info {
    background-color: #5bc0de;
}

.d-tag-default {
    background-color: #777;
}

.d-tag-danger {
    background-color: #d9534f;
}

.d-tag .tag-icon {
    cursor: pointer;
}
</style>
