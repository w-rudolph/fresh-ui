export default class Upload {

    xhr = null;
    url = null;

    constructor({ headers, withCredentials, url, type = 'POST', async = true }) {
        this.xhr = new XMLHttpRequest();
        for (let k in headers) {
            xhr.setRequestHeader(k, headers[k]);
        }
        if (withCredentials) {
            xhr.withCredentials = true;
        }
        this.url = url;
        this.xhr.addEventListener("load", this.uploadComplete, false);
        this.xhr.addEventListener("progress", this.uploadProgress, false);
        this.xhr.addEventListener("error", this.uploadFailed, false);
        this.xhr.addEventListener("abort", this.uploadCanceled, false);
    }

    send(data) {
        this.xhr.open('POST', this.url, true);
        const fd = new FormData();
        for (let k in data) {
            console.log(k);
            fd.append(k, data[k]);
        }
        this.xhr.send(data);
    }

    uploadComplete(res) {
        // console.log(res)
    }

    uploadProgress(res) {
        // console.log(res)
    }

    uploadFailed() {

    }

    uploadCanceled() {

    }
}