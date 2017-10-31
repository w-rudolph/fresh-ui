export default class Upload {

    xhr = null;
    url = null;

    constructor({ headers, withCredentials, url, type = 'POST', async = true, uploadComplete, uploadProgress, uploadCanceled, uploadFailed }) {
        this.xhr = new XMLHttpRequest();
        for (let k in headers) {
            xhr.setRequestHeader(k, headers[k]);
        }
        if (withCredentials) {
            xhr.withCredentials = true;
        }
        this.url = url;
        this.xhr.addEventListener("load", uploadComplete, false);
        this.xhr.addEventListener("progress", uploadProgress, false);
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