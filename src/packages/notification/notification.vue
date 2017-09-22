<template>
    <transition-group name="notification-slide" tag="div" class="d-notification__container">
        <div class="d-notification" v-for="item in items" :key="item.id" v-if="item.visible">
            <div class="d-notification__header">
                <div class="d-notification__title">
                    {{item.title}}
                </div>
                <d-icon class="d-notification__close" name="close" @click="removeItem(item)"></d-icon>
            </div>
            <div class="d-notification__content">
                {{item.content}}
            </div>
        </div>
    </transition-group>
</template>
<script>
import DIcon from '../icon/icon';
import { guid } from '../utils/guid.js';

export default {
    components: { DIcon },
    data() {
        return {
            items: [],
        }
    },
    methods: {
        addItem(item) {
            item = {
                ...item,
                visible: true,
                id: guid()
            };
            this.items.push(item);

            if (item.duration !== 0) {
                this.antoRemoveItem(item);
            }
        },
        antoRemoveItem(item) {
            setTimeout(_ => {
                this.removeItem(item);
            }, item.duration);
        },
        removeItem(item) {
            item.visible = false;
        }
    }
}
</script>
