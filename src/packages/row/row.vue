<template>
    <div :class="rowClass" :style="gutterStyle">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'DRow',
    props: {
        gutter: {
            type: Number,
            default: 0
        },
        type: {
            type: String,
            default: '' // '' , flex
        },
        justify: {
            type: String,
            default: '' // start, end, center, space-around, space-between
        },
        align: {
            type: String,
            default: '' // top, middle, bottom
        }
    },
    computed: {
        gutterStyle() {
            return this.gutter ? {
                marginLeft: -this.gutter / 2 + 'px',
                marginRight: -this.gutter / 2 + 'px'
            } : null;
        },
        rowClass() {
            const { type, justify, align } = this;
            const base = ['d-row'];
            if (type) {
                base.push('d-row-' + type);
            }
            if (justify) {
                base.push('d-row-justify-' + justify);
            }
            if (align) {
                base.push('d-row-align-' + align);
            }
            return base;
        }
    }
};
</script>

