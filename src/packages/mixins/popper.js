import Popper from 'popper.js';
import PopupManager from '../utils/popup-manager.js';

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
        showArrow: {
            type: Boolean,
            default: true
        },
        gpuAcceleration: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            showPopper: false,
            timer: null,
            popperInstance: null,
            reference: null,
            popper: null,
            arrow: null
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
                        computeStyle: { gpuAcceleration: this.gpuAcceleration }
                    },
                    onUpdate: popper => {
                        this.resetTransformOrigin(popper);
                    }
                },
            );
            this.updatePopperIndex();
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
            this.popperInstance.popper.style.transformOrigin = ['top', 'bottom'].indexOf(placement) > -1 ? `center ${origin}` : `${origin} center`;
        },
        popperToggle() {
            this.showPopper = !this.showPopper;
        },
        handleMouseEnter() {
            if (this.disabled) {
                return;
            }
            clearTimeout(this.timer);
            this.showPopper = true;
        },
        handleMouseLeave() {
            if (this.disabled) {
                return;
            }
            this.timer = setTimeout(_ => {
                this.showPopper = false;
            }, 200);
        },
        handleMouseUp() {
            this.showPopper = false;
        },
        handleMouseDown(e) {
            e.preventDefault();
            e.stopPropagation();
            this.showPopper = true;
        },
        handleToggleClick() {
            if (this.disabled) {
                return;
            }
            this.showPopper = !this.showPopper;
        },
        handleDocumentClick(e) {
            const reference = this.reference || this.$refs.reference;
            const popper = this.popper || this.$refs.popper;
            if (!reference.contains(e.target) && !popper.contains(e.target) && this.showPopper) {
                this.showPopper = false;
            }
        },
        bindEvents() {
            const trigger = this.trigger;
            const reference = this.reference || this.$refs.reference;
            const popper = this.popper || this.$refs.popper;
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
            if (trigger === 'focus') {
                reference.addEventListener('mousedown', this.handleMouseDown);
                reference.addEventListener('mouseup', this.handleMouseUp);
                window.addEventListener('mouseup', this.handleMouseUp);
            }
        },
        offEvents() {
            const trigger = this.trigger;
            const reference = this.reference || this.$refs.reference;
            const popper = this.popper || this.$refs.popper;
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
            if (trigger === 'focus') {
                reference.removeEventListener('mousedown', this.handleMouseDown);
                reference.removeEventListener('mouseup', this.handleMouseUp);
                window.addEventListener('mouseup', this.handleMouseUp);
            }
            this.popperInstance.destroy();
        },
        updatePopper(updateIndex = true) {
            if (updateIndex) {
                this.updatePopperIndex();
            }
            this.popperInstance.update();
        },
        updatePopperIndex() {
            const popper = this.popper || this.$refs.popper;
            popper.style.zIndex = PopupManager.nextZIndex();
        },
        destroyPopper() {
            this.popperInstance.destroy();
            this.popperInstance.popper.remove();
            this.popperInstance = null;
        }
    },
    mounted() {
        if (this.$slots.reference) {
            this.reference = this.$slots.reference[0].elm;
        }
        if (this.$slots.popper) {
            this.popper = this.$slots.popper[0].elm;
        }
        if (this.$slots.arrow) {
            this.arrow = this.$slots.arrow[0].elm;
        }
        this.createPopper();
        this.bindEvents();
    },
    beforeDestroy() {
        this.offEvents();
        this.destroyPopper();
    }
}