import { addClass, removeClass } from './dom.js';

export default class PopupManager {
    static zIndex = 2000;
    static instances = [];
    static modalStack = [];
    static modal = null;

    static nextZIndex() {
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

    static register(instance) {
        if (PopupManager.getInstance(instance)) {
            return;
        }
        if (instance.modal) {
            const length = PopupManager.modalStack.push(PopupManager.nextZIndex());
            PopupManager.openModal();
            PopupManager.setModalZIndex(PopupManager.modalStack[length - 1]);
        }
        if (instance.bodyScrollLock) {
            addClass(document.body, 'body-scroll-lock');
        }
        instance.$el.style.zIndex = PopupManager.nextZIndex();
        PopupManager.instances.push(instance);
    }

    static unregister(instance) {
        const index = PopupManager.instances.indexOf(instance);
        if (index === -1) {
            return;
        }
        instance.$el.style.zIndex = null;
        PopupManager.instances.splice(index, 1);
        const instancesWithModal = PopupManager.instances.filter(i => i.modal === true);
        const instanceWithScrollLock = PopupManager.instances.filter(i => i.bodyScrollLock === true);
        if (instanceWithScrollLock.length === 0) {
            removeClass(document.body, 'body-scroll-lock');
        }
        if (instancesWithModal.length === 0) {
            PopupManager.closeModal();
            PopupManager.modalStack = [];
            return;
        }
        if (instance.modal) {
            PopupManager.modalStack.pop();
            const currentZIndex = PopupManager.modalStack[PopupManager.modalStack.length - 1];
            PopupManager.setModalZIndex(currentZIndex);
        }
    }

    static createModal() {
        const modal = document.createElement('div');
        addClass(modal, 'v-modal');
        document.body.appendChild(modal);
        PopupManager.modal = modal;
        modal.addEventListener('click', () => {
            const topInstance = PopupManager.getTopInstance();
            if (topInstance && topInstance.modal && topInstance.closeOnClickModal) {
                topInstance.close();
            }
        })
    }

    static setModalZIndex(index) {
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