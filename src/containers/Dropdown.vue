<template>
    <div>
        <h1>Dropdown</h1>
        <div>
            <d-dropdown placement="bottom">
                <d-button type="link">dropdown <d-icon name="arrow-down-b"></d-icon></d-button>
                <d-dropdown-menu slot="dropdown">
                    <d-dropdown-item>A</d-dropdown-item>
                    <d-dropdown-item>B</d-dropdown-item>
                    <d-dropdown-item>C</d-dropdown-item>
                    <d-dropdown-item>D</d-dropdown-item>
                    <d-dropdown-item>E</d-dropdown-item>
                    <d-dropdown-item>F</d-dropdown-item>
                </d-dropdown-menu>
            </d-dropdown>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
