'use babel';

import status from '../utils/status-icon';
import DWDAV from './dwdav';
import Notifications from '../components/notifications-mgr';

export default class Auth {
    async webdav (props, cardidgemode) {
        const response = await DWDAV(props.dwFileParse.data)
            .auth()
            .catch(() => {
                const notify = new Notifications();
                notify.autherr();
            });

        return (
            response ? this.cb(props, true, cardidgemode) : this.cb(props, false, cardidgemode),
            status.icon(response ? 'connected' : 'error')
        );
    }

    cb (props, state, cartridgemode) {
        props.auth = state;
        props.await = false;
        props.connection = true;
        props.loader = false;
        props.watchFiles = state;
        props.watchState = state ? 'enabled' : 'disabled';
        if (cartridgemode) props.cartridges = state;
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
