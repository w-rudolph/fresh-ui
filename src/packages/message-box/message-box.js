import Vue from 'vue';
import PopupManager from '../utils/popup-manager.js';
import MessageBoxComponent from './message-box.vue';
const MessageBoxConstructor = Vue.extend(MessageBoxComponent);

export default class MessageBox {
    static instances = [];

    static create = (message, type) => new MessageBox({ message, type });
    static alert = (message) => MessageBox.create(message, 'info');
    static prompt = message => MessageBox.create(message, 'success');
    static cinfirm = message => MessageBox.create(message, 'warning');
    static $mount = obj => {
        obj.$messageBox = options => new MessageBox(options);
        ['alert', 'prompt', 'cinfirm'].forEach(i => obj[i] = MessageBox[i])
    };

    constructor(options) {
        if (typeof options === 'string') {
            options = {
                message: options,
            };
        }
        const instance = new MessageBoxConstructor({
            propsData: {
                title: '',
                message: '',
                showClose: true,
                closeOnClickModal: false,
                ...options,
            }
        });
        instance.$mount();
        this.instance = instance;
        const el = this.instance.$el;
        el.style.zIndex = PopupManager.nextZIndex();
        document.body.appendChild(el);
        this.instance.show();
    }

    close() {
        const idx = MessageBox.instances.indexOf(this.instance);
        if (idx > -1) {
            MessageBox.instances.splice(idx, 1);
            this.instance.close();
        }
    }
}
