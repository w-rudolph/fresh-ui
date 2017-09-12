<template>
    <div>
        <h1>Dropdown</h1>
        <div>
            <d-dropdown placement="bottom">
                <d-button type="link">dropdown <d-icon name="arrow-down-b"></d-icon></d-button>
                <d-dropdown-menu slot="dropdown">
                    <d-dropdown-menu-item>A</d-dropdown-menu-item>
                    <d-dropdown-menu-item>B</d-dropdown-menu-item>
                    <d-dropdown-menu-item>C</d-dropdown-menu-item>
                    <d-dropdown-menu-item>D</d-dropdown-menu-item>
                    <d-dropdown-menu-item>E</d-dropdown-menu-item>
                    <d-dropdown-menu-item>F</d-dropdown-menu-item>
                </d-dropdown-menu>
            </d-dropdown>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
