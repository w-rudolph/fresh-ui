import Vue from 'vue';
import PopupManager from '../utils/popup-manager.js';
import MessageComponent from './message.vue';
const MessageConstructor = Vue.extend(MessageComponent);

export default class Message {
    static instances = [];
    
    static create = (message, type) => new Message({ message, type });
    static info = message => Message.create(message, 'info');
    static success = message => Message.create(message, 'success');
    static warning = message => Message.create(message, 'warning');
    static danger = message => Message.create(message, 'danger');
    static $mount = obj => {
        obj.$message = options => new Message(options);
        ['info', 'success', 'warning', 'danger'].forEach(i => obj.$message[i] = Message[i])
    };

    constructor(options) {
        if (typeof options === 'string') {
            options = {
                message: options
            };
        }
        const instance = new MessageConstructor({ data: options });
        instance.$mount();
        this.instance = instance;

        const el = this.instance.$el;
        el.style.zIndex = PopupManager.nextZIndex();
        document.body.appendChild(el);
        this.instance.show();
        this.instance.scheduleClose();
    }

    close() {
        const idx = Message.instances.indexOf(this.instance);
        if (idx > -1) {
            Message.instances.splice(idx, 1);
            this.instance.close();
        }
    }
}
