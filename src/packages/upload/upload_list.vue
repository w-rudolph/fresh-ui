<template>
    <div class="d-upload__file-list">
        <div class="d-upload__file-item" v-for="file in fileList">
            {{file.name}} - {{file.percent + '%'}}
        </div>
    </div>
</template>
<script>
export default {
    props: {
        fileList: {
            type: Array,
            default: () => []
        }
    },
}
</script>
