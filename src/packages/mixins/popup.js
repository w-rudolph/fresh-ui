import PopupManager from '../utils/popup-manager.js';

export default {
    name: 'DDialog',
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        appendToBody: {
            type: Boolean,
            default: false
        },
        closeOnClickModal: {
            type: Boolean,
            default: true
        },
        modal: {
            type: Boolean,
            default: true
        },
        bodyScrollLock: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: ''
        },
    },
    watch: {
        visible(val) {
            this.$emit('update:visible', val);
            this.updatePopupManager(val);
        },
    },
    methods: {
        updatePopupManager(val) {
            if (val) {
                PopupManager.register(this);
            } else {
                PopupManager.unregister(this);
            }
        },
        close() {
            this.$emit('update:visible', false);
        }
    },
    mounted() {
        if (this.appendToBody) {
            document.body.appendChild(this.$el);
        }

        if (this.closeOnClickModal) {
            this.$el.addEventListener('click', e => {
                if (e.target === this.$el && PopupManager.modal) {
                    PopupManager.modal.click();
                }
            });
        }
    }
}
