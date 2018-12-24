'use babel';

export default {
    stats (props) {
        const elem = document.getElementById('atomforce-status-bar');

        if (elem) {
            if (props.auth && !props.uploading) {
                elem.classList.add('connected');
                this.clean('connected', elem);
            } else if (props.uploading) {
                elem.classList.add('uploading');
                this.clean('uploading', elem);
            } else if (props.autherr || props.fileerr) {
                elem.classList.add('error');
                this.clean('error', elem);
            } else {
                this.clean('', elem);
            }
        }
    },
    clean (cl, elem) {
        const arr = ['connected', 'uploading', 'error'];
        const index = arr.indexOf(cl);

        if (index > -1) arr.splice(index, 1);

        for (const value of arr.values()) {
            elem.classList.remove(value);
        }
    }
};
