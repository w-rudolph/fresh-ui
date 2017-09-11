import Popper from 'popper.js';

export default {
    props: {
        placement: {
            type: String,
            default: 'top',
        },
        title: {
            type: String,
            default: ''
        },
        content: {
            type: String,
            default: ''
        },
        appendToBody: {
            type: Boolean,
            default: false
        },
        popper: {},
        reference: {},
        arrow: {},
        showArrow: {
            type: Boolean,
            default: true
        },
        gpuAcceleration: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            showPopper: false,
            timer: null,
            popperInstance: null
        }
    },
    watch: {
        placement(v) {
            this.createPopper();
        },
        showPopper() {
            this.popperInstance ? this.updatePopper() : this.createPopper();
        }
    },
    methods: {
        createPopper() {
            if (this.popperInstance) {
                this.destroyPopper();
            }
            const popper = this.popper || this.$refs.popper
            const reference = this.reference || this.$refs.reference;
            const arrow = this.arrow || this.$refs.arrow;
            if (this.appendToBody) {
                document.body.appendChild(popper);
            }
            if (this.showArrow) {
                arrow.setAttribute('x-arrow', '');
            }
            this.popperInstance = new Popper(
                reference,
                popper,
                {
                    placement: this.placement,
                    modifiers: {
                        computeStyle: { gpuAcceleration: this.gpuAcceleration },
                        onCreate: {
                            enabled: true,
                            fn: data => this.resetTransformOrigin(data)
                        },
                    }
                }
            );
        },
        resetTransformOrigin(_popper) {
            const placementMap = {
                top: 'bottom',
                bottom: 'top',
                left: 'right',
                right: 'left'
            };
            const placement = _popper.placement.split('-')[0];
            const origin = placementMap[placement];
            _popper.styles.transformOrigin = ['top', 'bottom'].indexOf(placement) > -1 ? `center ${origin}` : `${origin} center`;
            return _popper;
        },
        updatePopper() {
            this.popperInstance.update();
        },
        destroyPopper() {
            this.popperInstance.destroy();
        }
    }
}