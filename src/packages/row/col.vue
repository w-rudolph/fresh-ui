<template>
    <div :class="colClass" :style="colStyle">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'DCol',
    props: {
        span: {
            type: Number,
            default: 0
        },
        pull: {
            type: Number,
            default: 0
        },
        push: {
            type: Number,
            default: 0
        },
        offset: {
            type: Number,
            default: 0
        },
        order: {
            type: Number,
            default: 0
        },
        xs: {
            type: [Number, Object],
            default: 0
        },
        sm: {
            type: [Number, Object],
            default: 0
        },
        md: {
            type: [Number, Object],
            default: 0
        },
        lg: {
            type: [Number, Object],
            default: 0
        }
    },
    computed: {
        colStyle() {
            const { gutter, type } = this.$parent;
            const style = gutter ? {
                marginLeft: gutter / 2 + 'px',
                marginRight: gutter / 2 + 'px'
            } : {};
            if (this.order && type === 'flex') {
                style.order = this.order;
            }
            return style;
        },
        colClass() {
            const base = ['d-col'];
            const { span, pull, push, offset, xs, sm, md, lg } = this;
            if (span) {
                base.push('d-col-span-' + span);
            }
            if (pull) {
                base.push('d-col-pull-' + pull);
            }
            if (push) {
                base.push('d-col-push-' + push);
            }
            if (offset) {
                base.push('d-col-offset-' + offset);
            }
            const xsStyle = this.getResponseSizeStyle('xs', xs);
            const smStyle = this.getResponseSizeStyle('sm', sm);
            const mdStyle = this.getResponseSizeStyle('md', md);
            const lgStyle = this.getResponseSizeStyle('lg', lg);
            return base.concat(xsStyle, smStyle, mdStyle, lgStyle);
        }
    },
    methods: {
        getResponseSizeStyle(type, obj) {
            const res = [];
            if (typeof obj === 'number') {
                obj = { span: obj, pull: 0, push: 0, offset: 0};
            } else {
                obj = { span: 0, pull: 0, push: 0, offset: 0, ...obj };
            }
            for (let k in obj) {
                if (obj[k] && typeof obj[k] === 'number') {
                    res.push(`d-col-${type}-${k}-` + obj[k]);
                }
            }
            return res;
        }
    }
};
</script>

