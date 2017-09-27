<template>
    <div>
        <h1>Dropdown</h1>
        <div>
            <d-dropdown placement="bottom" :hide-on-click="true" @select="handleSelect" @visible-change="visibleChange">
                <d-button type="link">dropdown
                    <d-icon name="arrow-down-b"></d-icon>
                </d-button>
                <d-dropdown-menu slot="dropdown">
                    <d-dropdown-item index="1" label="A">A</d-dropdown-item>
                    <d-dropdown-item index="2" label="B">B</d-dropdown-item>
                    <d-dropdown-item index="3" label="C">C</d-dropdown-item>
                    <d-dropdown-item index="4" label="D">D</d-dropdown-item>
                    <d-dropdown-item index="5" label="E">E</d-dropdown-item>
                    <d-dropdown-item index="6" label="F">F</d-dropdown-item>
                </d-dropdown-menu>
            </d-dropdown>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            show: false
        }
    },
    methods: {
        handleSelect({ $attrs: { label, index } }) {
            console.log(label, index);
        },
        visibleChange(v) {
            this.show = v;
        }
    }
}
</script>
