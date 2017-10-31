<template>
    <div class="d-upload">
        <div class="d-upload__inner" @click="handleClick">
            <input type="file" ref="upload" @change="handleFileChange" :multiple="multiple" class="d-upload-input">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import UploadJs from '../utils/upload';

export default {
    name: 'DUpload',
    props: {
        action: {
            type: String,
            default: '/'
        },
        multiple: {
            type: Boolean,
            default: false
        },
        withCredentials: {
            type: Boolean,
            default: false
        },
        drag: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
            default: () => { }
        },
        headers: {
            type: Object,
            default: () => { }
        },
        accept: {
            type: String,
            default: ''
        },
        showFileList: {
            type: Boolean,
            default: true
        },
        autoUpload: {
            type: Boolean,
            default: true
        },
        fileList: {
            type: Array,
            default: () => []
        },
        beforeUpload: {
            type: Function,
            default: () => { }
        },
        onProgress: {
            type: Function,
            default: () => { }
        },
        onSuccess: {
            type: Function,
            default: () => { }
        },
        onError: {
            type: Function,
            default: () => { }
        },
        onRemove: {
            type: Function,
            default: () => { }
        },
        onAbort: {
            type: Function,
            default: () => { }
        },
    },
    data() {
        return {
            upload: null
        }
    },
    methods: {
        handleClick() {
            this.$refs.upload.click();
        },
        handleFileChange(evt) {
            const fileList = evt.target.files;
            if (this.autoUpload) {
                this.uploadFile(fileList);
            }
        },
        uploadFile(fileList) {
            for (let i = 0, length = fileList.length; i < length; i++) {
                this.upload.send({ file: fileList[i] });
            }
        }
    },
    created() {
        this.upload = new UploadJs({
            headers: this.headers,
            withCredentials: this.withCredentials,
        });
    }
}
</script>
