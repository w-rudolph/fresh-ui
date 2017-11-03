class UploadJs {

    constructor({ headers, withCredentials, url, uploadComplete, uploadProgress, uploadCanceled, uploadFailed }) {
        this.xhr = new XMLHttpRequest();
        for (let k in headers) {
            this.xhr.setRequestHeader(k, headers[k]);
        }
        if (withCredentials) {
            this.xhr.withCredentials = true;
        }
        this.url = url;
        this.xhr.addEventListener("load", uploadComplete, false);
        this.xhr.upload.addEventListener("progress", uploadProgress, false);
        this.xhr.addEventListener("error", uploadFailed, false);
        this.xhr.addEventListener("abort", uploadCanceled, false);
    }

    send(data) {
        this.xhr.open('POST', this.url, true);
        const fd = new FormData();
        for (let k in data) {
            fd.append(k, data[k]);
        }
        this.xhr.send(fd);
    }
}

import { guid } from '../utils/guid';

export default {
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
            default: () => {}
        },
        headers: {
            type: Object,
            default: () => {}
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
            default: () => {}
        },
        onSuccess: {
            type: Function,
            default: () => {}
        },
        onError: {
            type: Function,
            default: () => {}
        },
        onRemove: {
            type: Function,
            default: () => {}
        },
        onAbort: {
            type: Function,
            default: () => {}
        },
    },
    data() {
        return {
            uploadFiles: [],
            requestQueue: []
        }
    },
    computed: {
        uploadFileList() {
            return this.uploadFiles.map(file => {
                return {
                    lastModified: file.lastModified,
                    name: file.name,
                    percent: file.percent,
                    type: file.type,
                    size: file.size
                }
            });
        }
    },
    methods: {
        handleFileChange(evt) {
            const fileList = evt.target.files;
            if (this.autoUpload) {
                this.uploadFile(fileList);
            }
            evt.target.value = '';
        },
        resetUploadState() {
            this.uploadFiles = [];
            this.requestQueue.forEach(rq => rq = null);
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
                    upload.xhr._fid = upload.xhr.upload._fid = file._fid;
                    upload.send({ file, ...this.data });
                    this.requestQueue.push(upload.xhr);
                }
                this.uploadFiles.push(file);
            }
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
        uploadSuccess() {},
        getResponseBody(xhr) {
            let response = xhr.response || xhr.responseText;
            if (!response) {
                return response
            }
            try {
                return JSON.parse(response);
            } catch (e) {
                return response;
            }
        },
        uploadProgress({ total, loaded, target: { _fid } }) {
            this.updateUploadFiles(_fid, Math.ceil(loaded / total * 100));
            this.$nextTick(() => { this.onProgress(this.uploadFileList); })
        },
        updateUploadFiles(fid, percent) {
            this.uploadFiles = this.uploadFiles.map(file => {
                if (file._fid === fid) {
                    file.percent = percent;
                }
                return file;
            });
        },
        uploadCanceled() {},
        handleCancelRequest(_fid) {
            let xhr = this.requestQueue.find(rq => rq._fid === _fid);
            if (xhr) {
                const idx = this.requestQueue.indexOf(xhr);
                xhr.abort();
                xhr = null;
                this.requestQueue.splice(idx, 1);
            }
        },
        uploadFailed() {},
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