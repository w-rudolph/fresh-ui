import Vue from 'vue';
import PopupManager from '../utils/popup-manager.js';
import MessageComponent from './message.vue';
const MessageConstructor = Vue.extend(MessageComponent);

export default class Message {
    static instances = [];
    constructor(options) {
        const instance = new MessageConstructor(options);
        instance.$mount();
        this.instance = instance;
    }

    show() {
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

