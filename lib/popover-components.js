'use babel';

import etch from 'etch';
import Init from './init';
import PopoverHeader from './popover-header'; // eslint-disable-line no-unused-vars
import PopoverInfo from './popover-info'; // eslint-disable-line no-unused-vars
import PopoverInfoConnection from './popover-info-connection'; // eslint-disable-line no-unused-vars
import Watcher from './watcher';
import Notifications from './notifications-mgr';
import DWDAV from './dwdav';

/** @jsx etch.dom */
export default class PopoverComponents {
    constructor () {
        this.props = new Init();
        this.watcher = new Watcher();
        this.notify = new Notifications();
        etch.initialize(this);
    }

    render () {
        if (this.props.connection) {
            return (
                <div class="atomforce-popover-components">
                    <PopoverHeader {...this.props} click={() => this.watch()} />
                    <div class="atomforce-popover-body">
                        <PopoverInfoConnection {...this.props} />
                    </div>
                </div>
            );
        } else {
            return (
                <div class="atomforce-popover-components">
                    <PopoverHeader {...this.props} click={() => this.watch()} />
                    <div class="atomforce-popover-body">
                        <PopoverInfo {...this.props} click={() => this.reload()} />
                    </div>
                </div>
            );
        }
    }

    updateprops (props, watch, state) {
        if (props) this.props = new Init();
        this.props.watchFiles = watch;
        this.props.watchState = state;
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

    auth (state) {
        this.props.loader = false;
        this.props.await = false;
        this.props.auth = state;
        this.props.connection = true;
        this.updateprops(false, true, 'enabled');
    }

    watch () {
        if (this.props.watchFiles) {
            this.updateprops(true, false, 'disabled');
            this.watcher.unwatch();
        } else {
            this.props = new Init();

            if (this.props.dwFileExists && this.props.dwFileParse.parse) {
                this.props.loader = true;
                this.props.await = true;
                this.watcher.watch(this.props.root, this.props.followSymlinks, this.props.ignoredList, this.props);
                this.dwdav = new DWDAV(this.props.dwFileParse.data);

                this.dwdav.auth().then(data => {
                    this.auth(true);
                    this.update();
                }).catch(() => {
                    this.auth(false);
                    this.notify.errauth();
                    this.update();
                });
            } else {
                this.props.watchState = 'disabled';
                this.notify.errfile();
            }
        }

        this.update();
    }

    async spinner () {
        const promise = new Promise(resolve => {
            setTimeout(() => resolve(this.props.loader = false), 1500);
        });

        await promise;
        this.props = new Init();
        etch.update(this);
    }

    reload () {
        this.props.loader = true;
        this.update();
        this.spinner();
    }

    update () {
        etch.update(this);
    }
}
