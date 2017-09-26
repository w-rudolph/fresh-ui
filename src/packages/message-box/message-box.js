import Vue from 'vue';
import PopupManager from '../utils/popup-manager.js';
import MessageBoxComponent from './message-box.vue';
const MessageBoxConstructor = Vue.extend(MessageBoxComponent);

export default class MessageBox {

    static create = (message, title, options, type) => {
        if (typeof options.callback === 'function') {
            return new MessageBox({ message, title, type, ...options });
        } else {
            return new Promise((resolve, reject) => {
                new MessageBox({
                    message, title, type, ...options, callback(action) {
                        return (action === 'confirm' || action.action === 'confirm') ? resolve(action) : reject(action);
                    }
                })
            })
        }
    };
    static alert = (message, title, options) => MessageBox.create(message, title, options, 'alert');
    static prompt = (message, title, options) => MessageBox.create(message, title, options, 'prompt');
    static confirm = (message, title, options) => MessageBox.create(message, title, options, 'confirm');
    static $mount = obj => {
        obj.$messageBox = options => new MessageBox(options);
        ['alert', 'prompt', 'confirm'].forEach(i => obj['$' + i] = MessageBox[i])
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
                confirmText: '',
                cancelText: '',
                showClose: true,
                bodyScrollLock: true,
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
}
