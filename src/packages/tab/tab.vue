<template>
    <div class="d-tab">
        <div class="d-tab__header">
            <div class="d-tab__label" :class="[idx === currentIndex ? 'active' : '']" v-for="(item, idx) in tabLabelItems" :key="idx" @click="handleLabelClick(idx)">{{item}}</div>
        </div>
        <div class="d-tab__content">
            <slot></slot>
        </div>
    </div>
</template>
<script>

export default {
    name: 'DTab',
    props: {
        activeIndex: {
            type: Number,
            default: 0,
        }
    },
    data() {
        return {
            tabLabelItems: [],
            currentIndex: this.activeIndex,
        }
    },
    computed: {
        tabItems() {
            return this.$children.filter(child => child.$options.name === 'DTabItem');
        }
    },
    watch: {
        activeIndex(idx) {
            this.setActiveItem(idx);
        }
    },
    methods: {
        updateLabelItems() {
            const labelItems = [];
            this.tabItems.forEach(child => {
                const label = child.$slots.label && child.$slots.label[0].text || child.$attrs.label || '';
                if (label) {
                    labelItems.push(label);
                }
            })
            this.tabLabelItems = labelItems;
            this.setActiveItem(this.activeIndex);
        },
        handleLabelClick(idx) {
            this.currentIndex = idx;
            this.tabItems.forEach((item, index) => {
                idx === index ? item.show() : item.hide();
            });
            this.$emit('item-click', idx, this);
        },
        setActiveItem(idx) {
            this.handleLabelClick(idx);
        }
    },
    mounted() {
        this.updateLabelItems();
    }
}
</script>
