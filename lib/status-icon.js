'use babel';

export default {
    icon (cl) {
        const elem = document.getElementById('atomforce-status-bar');

        if (elem) {
            return ((cl) ? elem.classList.add(cl) : void (0), this.clean(cl, elem));
        }
    },
    clean (cl, elem) {
        const arr = ['connected', 'uploading', 'error'];
        const index = arr.indexOf(cl);
        const child = elem.childNodes[0];

        if (index > -1) arr.splice(index, 1);

        for (let i = 0; i < arr.length; i++) {
            elem.classList.remove(arr[i]);
        }

        if (elem.classList.contains('uploading')) {
            child.className = 'icon icon-arrow-up';
        } else {
            child.className = 'icon icon-cloud-upload';
        }
    }
};
