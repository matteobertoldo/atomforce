'use babel';

import etch from 'etch';
import status from './status-icon';
import Init from './init';
import PopoverHeader from './popover-header'; // eslint-disable-line no-unused-vars
import PopoverInfo from './popover-info'; // eslint-disable-line no-unused-vars
import PopoverInfoConnection from './popover-info-connection'; // eslint-disable-line no-unused-vars
import Watcher from './watcher';
import Auth from './auth-mgr';
import Notifications from './notifications-mgr';

/** @jsx etch.dom */
export default class PopoverComponents {
    constructor () {
        this.props = new Init();
        this.watcher = new Watcher();
        this.auth = new Auth();
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

    async watch () {
        if (this.props.watchFiles) {
            this.props = new Init();
            this.watcher.unwatch();
            this.auth.highlight();
            status.stats(this.props);
        } else {
            this.props = new Init();

            if (this.props.dwFileExists && this.props.dwFileParse.parse) {
                this.props.loader = true;
                this.props.await = true;
                this.watcher.watch(this.props);
                this.update();
                await this.auth.webdav(this.props);
                this.update();
            } else {
                this.props.watchState = 'disabled';
                this.props.fileerr = true;
                this.notify.errfile();
                status.stats(this.props);
            }
        }

        this.update();
    }

    reload () {
        this.props.loader = true;
        this.update();
        this.spinner();
    }

    async spinner () {
        const promise = new Promise(resolve => {
            setTimeout(() => resolve(this.props.loader = false), 1500);
        });

        await promise;
        this.props = new Init();
        status.stats(this.props);
        etch.update(this);
    }

    update () {
        etch.update(this);
    }
}
