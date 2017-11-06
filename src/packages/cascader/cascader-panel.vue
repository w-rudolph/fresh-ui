<template>
    <div class="d-cascader-panel">
        <div class="d-cascader-menus">
            <cascader-menu></cascader-menu>
            <cascader-menu></cascader-menu>
            <cascader-menu></cascader-menu>
            <cascader-menu></cascader-menu>
        </div>
    </div>
</template>
<script>
import CascaderMenu from './cascader-menu';

export default {
    name: 'DCascaderPanel',
    components: { CascaderMenu },
    props: {
        options: {
            type: Array,
            default: () => []
        }
    }
}
</script>

