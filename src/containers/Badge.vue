<template>
    <div class="container">
        <h3>Badge 组件</h3>
        <hr>
        <h4>Basic</h4>
        <d-badge value="222" style="margin-right:30px;">
            <d-button size="small">Basic</d-button>
        </d-badge>
        <h4>Max</h4>
        <d-badge :value="value" style="margin-right:30px;" :max="99">
            <d-button size="small">Max</d-button>
        </d-badge>
        <d-button @click="value += 1" size="small"><d-icon name="plus"></d-icon></d-button>
        <d-button @click="value -= 1" size="small"><d-icon name="minus"></d-icon></d-button>
        <h4>String Value</h4>
        <d-badge value="aaa" style="margin-right:30px;">
            <d-button size="small">Hello</d-button>
        </d-badge>
        <h4>Dot</h4>
        <d-badge is-dot style="margin-right:30px;">
            <d-button size="small">Dot</d-button>
        </d-badge>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value: 90
        }
    }
}
</script>

