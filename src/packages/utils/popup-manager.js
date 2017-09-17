import { addClass } from './dom.js';

export default class PopupManager {
    static zIndex = 2000;
    static instances = [];
    static modalStack = [];
    static modal = null;

    static nextZindex() {
        return PopupManager.zIndex++;
    }

    static getInstance(instance) {
        const index = PopupManager.instances.indexOf(instance);
        return PopupManager.instances[index];
    }

    static getTopInstance() {
        const length = PopupManager.instances.length;
        return length > 0 ? PopupManager.instances[length - 1] : null;
    }

    static openInstance(instance) {

        if (PopupManager.getInstance(instance)) {
            return;
        }
        if (PopupManager.instances.length === 0) {
            PopupManager.openModal();
        }
        const length = PopupManager.modalStack.push(PopupManager.nextZindex());
        PopupManager.setModalZindex(PopupManager.modalStack[length - 1]);
        instance.style.zIndex = PopupManager.nextZindex();
        PopupManager.instances.push(instance);

    }

    static closeInstance(instance) {
        const index = PopupManager.instances.indexOf(instance);
        if (index === -1) {
            return;
        }
        instance.style.zIndex = null;
        PopupManager.instances.splice(index, 1);
        if (PopupManager.instances.length === 0) {
            PopupManager.closeModal();
            PopupManager.modalStack = [];
            return;
        }
        PopupManager.modalStack.pop();
        const currentZIndex = PopupManager.modalStack[PopupManager.modalStack.length - 1];
        PopupManager.setModalZindex(currentZIndex);
    }

    static createModal() {
        const modal = document.createElement('div');
        addClass(modal, 'v-modal');
        document.body.appendChild(modal);
        PopupManager.modal = modal;
    }

    static setModalZindex(index) {
        PopupManager.modal.style.zIndex = index;
    }

    static openModal() {
        if (!PopupManager.modal) {
            PopupManager.createModal();
        }
    }

    static closeModal() {
        if (PopupManager.modal) {
            PopupManager.modal.remove();
            PopupManager.modal = null;
        }
    }
}