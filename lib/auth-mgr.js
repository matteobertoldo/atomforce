'use babel';

import DWDAV from './dwdav';
import Notifications from './notifications-mgr';
import status from './status-icon';

export default class Auth {
    async webdav (props) {
        const response = await DWDAV(props.dwFileParse.data).auth().catch(() => {
            const notify = new Notifications();
            notify.errauth();
            props.autherr = true;
        });

        return ((response) ? this.cb(props, true) : this.cb(props, false), status.stats(props));
    }

    cb (props, state) {
        props.auth = state;
        props.await = false;
        props.connection = true;
        props.loader = false;
        props.watchFiles = true;
        props.watchState = 'enabled';
        this.highlight();
    }

    async highlight () {
        const elem = document.getElementById('watch-state');

        if (elem) {
            elem.classList.add('highlight');

            const promise = new Promise(resolve => {
                setTimeout(() => resolve(elem.classList.remove('highlight')), 850);
            });

            await promise;
        }
    }
}
