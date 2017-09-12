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
            if (this.showArrow && arrow) {
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
        popperToggle() {
            this.showPopper = !this.showPopper;
        },
        handleMouseEnter() {
            clearTimeout(this.timer);
            this.showPopper = true;
        },
        handleMouseLeave() {
            this.timer = setTimeout(_ => {
                this.showPopper = false;
            }, 200);
        },
        handleToggleClick() {
            this.showPopper = !this.showPopper;
        },
        handleDocumentClick(e) {
            const reference = this.$refs.reference;
            const popper = this.$refs.popper;
            if (!reference.contains(e.target) && !popper.contains(e.target) && this.showPopper) {
                this.showPopper = false;
            }
        },
        bindEvents() {
            const trigger = this.trigger;
            const reference = this.$refs.reference;
            const popper = this.$refs.popper;
            if (trigger === 'click') {
                reference.addEventListener('click', this.handleToggleClick);
                if (this.hideWhenClickOutside) {
                    document.addEventListener('click', this.handleDocumentClick);
                }
            }
            if (trigger === 'hover') {
                reference.addEventListener('mouseover', this.handleMouseEnter);
                reference.addEventListener('mouseleave', this.handleMouseLeave);
                popper.addEventListener('mouseover', this.handleMouseEnter);
                popper.addEventListener('mouseleave', this.handleMouseLeave);
            }
        },
        offEvents() {
            const trigger = this.trigger;
            const reference = this.$refs.reference;
            const popper = this.$refs.popper;
            if (trigger === 'click') {
                reference.removeEventListener('click', this.handleToggleClick);
                if (this.hideWhenClickOutside) {
                    document.removeEventListener('click', this.handleDocumentClick);
                }
            }
            if (trigger === 'hover') {
                reference.removeEventListener('mouseover', this.handleMouseEnter);
                reference.removeEventListener('mouseleave', this.handleMouseLeave);
                popper.removeEventListener('mouseover', this.handleMouseEnter);
                popper.removeEventListener('mouseleave', this.handleMouseLeave);
            }
            this.popperInstance.destroy();
        },
        updatePopper() {
            this.popperInstance.update();
        },
        destroyPopper() {
            this.popperInstance.destroy();
        }
    },
    mounted() {
        this.createPopper();
        this.bindEvents();
    },
    beforeDestroy() {
        this.offEvents();
        this.destroyPopper();
    }
}