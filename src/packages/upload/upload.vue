<template>
    <div class="d-upload">
        <div class="d-upload__inner" @click="handleClick">
            <input type="file" ref="upload" @change="handleFileChange" :multiple="multiple" class="d-upload-input">
            <slot></slot>
        </div>
        <div class="d-upload__file-list">
            <div class="d-upload__file-item" v-for="file in uploadFiles">
                {{file.name}} - {{file.percent + '%'}}
                <d-button v-if="file.percent !== 1" @click="handleCancelRequest(file._fid)">取消</d-button>
            </div>
        </div>
    </div>
</template>
<script>
import UploadJs from '../utils/upload';
import { guid } from '../utils/guid';

export default {
    name: 'DUpload',
    props: {
        action: {
            type: String,
            default: ''
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
            default: () => true
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
            uploadFiles: [],
            requestQueue: []
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
        resetUploadState() {
            this.uploadFiles = [];
            this.requestQueue.map(rq => rq = null);
            this.requestQueue = [];
        },
        uploadFile(fileList) {
            this.resetUploadState();
            for (let i = 0, length = fileList.length; i < length; i++) {
                let file = fileList[i];

                file._fid = guid();
                file.percent = 0;
                if (this.beforeUpload(file)) {
                    let upload = this.initUploadInstance();
                    upload.xhr._fid = file._fid;
                    upload.send({ file, ...this.data });
                    this.requestQueue.push(upload.xhr);
                }
                this.uploadFiles.push(file);
            }
            this.$refs.upload.value = '';
        },
        uploadComplete(rq) {
            const xhr = rq.target;
            if (xhr.readyState == 4 && xhr.status == 200) {
                this.uploadSuccess(xhr);
            }
            if (xhr.readyState == 4 && xhr.status == 404) {
                this.uploadFailed(rq);
            }
        },
        uploadSuccess(xhr) {
            this.updateUploadFiles(xhr._fid, 1);
        },
        uploadProgress({ total, loaded, target: { _fid } }) {
            const file = this.uploadFiles.find(file => file._fid === _fid);
            this.updateUploadFiles(_fid, Math.ceil(loaded / total) * 100);
        },
        updateUploadFiles(fid, percent) {
            this.uploadFiles = this.uploadFiles.map(file => {
                if (file._fid === fid) {
                    file.percent = percent;
                }
                return file;
            });
        },
        uploadCanceled(rq) {
            // console.log(rq)
        },
        handleCancelRequest(_fid) {
            const xhr = this.requestQueue.find(rq => rq._fid === _fid);
            if (xhr) {
                const idx = this.requestQueue.indexOf(xhr);
                xhr.abort();
                this.requestQueue.splice(idx, 1);
            }
        },
        uploadFailed(rq) {
            // console.log('faild', rq)
        },
        initUploadInstance() {
            return new UploadJs({
                headers: this.headers,
                withCredentials: this.withCredentials,
                url: this.action,
                uploadComplete: this.uploadComplete,
                uploadProgress: this.uploadProgress,
                uploadCanceled: this.uploadCanceled,
                uploadFailed: this.uploadFailed,
            });
        }
    },
}
</script>
