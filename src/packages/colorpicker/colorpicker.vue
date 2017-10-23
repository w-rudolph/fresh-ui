<template>
    <div class="d-colorpicker">
        <div ref="reference" class="d-colorpicker-reference">
            <span :class="['d-colorpicker-input', alpha ? 'alpha' : '']">
                <span class="d-colorpicker-input__inner" :style="bgColor"></span>
                <d-icon class="d-colorpicker-empty" v-if="!color" name="close"></d-icon>
            </span>
            <d-icon class="d-colorpicker-arrow" name="arrow-down-b"></d-icon>
        </div>
        <transition name="dropdown-slide">
            <div ref="popper" class="d-colorpicker-popper" v-show="showPopper">
                <d-colorpicker-panel :format="format" :alpha="alpha" v-model="color"></d-colorpicker-panel>
                <div class="d-colorpicker-addons">
                    <div class="d-colorpicker-input__value">
                        <d-button type="text" size="small">{{formatColor(color)}}</d-button>
                    </div>
                    <div class="d-colorpicker-btns">
                        <d-button type="link" size="small" @click="handleValueChange('')">清空</d-button>
                        <d-button type="primary" size="small" @click="handleValueChange(color)">确定</d-button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import DColorpickerPanel from './colorpicker-panel';
import Popper from '../mixins/popper.js';
import tinycolor from 'tinycolor2';

export default {
    name: 'DColorpicker',
    mixins: [Popper],
    components: { DColorpickerPanel },
    props: {
        trigger: {
            type: String,
            default: 'click'
        },
        placement: {
            type: String,
            default: 'bottom',
        },
        size: {
            type: String,
            default: ''
        },
        value: {
            type: String,
            default: ''
        },
        alpha: {
            type: Boolean,
            default: false
        },
        format: {
            type: String, // hsl、hsv、hex、rgb
            default() {
                return this.alpha ? 'rgb' : 'hex';
            }
        }
    },
    data() {
        return {
            color: this.value
        }
    },
    watch: {
        showPopper() {
            this.color = this.value;
        },
        color(val) {
            this.$emit('active-change', val);
        }
    },
    computed: {
        bgColor() {
            return {
                backgroundColor: this.color
            };
        },

    },
    methods: {
        handleValueChange(value) {
            this.color = value;
            this.$emit('input', value ? this.formatColor(value) : '');
            this.$emit('change', value ? this.formatColor(value) : '');
            this.showPopper = false;
        },
        formatColor(color) {
            const map = { 'hsl': 'toHslString', 'hsv': 'toHsvString', 'hex': 'toHexString', 'rgb': 'toRgbString' };
            return tinycolor(color)[map[this.format]]();
        }
    }
}
</script>

