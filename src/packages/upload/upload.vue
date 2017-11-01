<template>
    <div class="d-upload">
        <div class="d-upload__inner" @click="handleClick">
            <input type="file" ref="upload" @change="handleFileChange" :multiple="multiple" class="d-upload-input">
            <slot></slot>
        </div>
        <d-upload-list-text :file-list="uploadFileList"></d-upload-list-text>
    </div>
</template>
<script>
import UploadJS from '../mixins/upload';
import DUploadListText from './upload_list';

export default {
    name: 'DUpload',
    mixins: [UploadJS],
    components: { DUploadListText },
    props: {
        listType: {
            type: String,
            default: 'text' // text, picture, picture-card
        }
    },
    methods: {
        handleClick() {
            this.$refs.upload.click();
        }
    }
}
</script>
