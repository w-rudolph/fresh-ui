import Vue from 'vue';
import PopupManager from '../utils/popup-manager.js';
import NotificationComponent from './notification.vue';

const NotificationConstructor = Vue.extend(NotificationComponent);

export default class Notification {

    static notification = null;
    static mounted = false;
    static duration = 5000;
    static $mount = obj => {
        obj.$notify = item => Notification.show(item);
    };

    static show(options) {
        let notification = Notification.notification;
        if (!notification) {
            notification = new NotificationConstructor();
            Notification.notification = notification;
            notification.$mount();
            notification.$el.style.zIndex = PopupManager.nextZIndex();
            document.body.appendChild(notification.$el);
        }
        notification.addItem(new NotificationItem(options))
    }

}

class NotificationItem {
    constructor(options) {
        const { title = '', content = '', duration = Notification.duration } = options
        this.title = title;
        this.content = content;
        this.duration = duration;
    }
}