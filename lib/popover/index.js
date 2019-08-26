'use babel';

import cartridge from '../dw/cartridges';
import etch from 'etch';
import status from '../status-icon';
import utils from '../watcher/watcher-utils';
import Auth from '../dw/auth-mgr';
import DWDAV from '../dw/dwdav';
import Init from '../init';
import Notifications from '../components/notifications-mgr';
import PopoverHeader from './popover-header';
import PopoverInfo from './popover-info';
import PopoverInfoConnection from './popover-info-connection';
import Watcher from '../watcher/';

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
        return (
            <div className="atomforce-popover-components">
                <PopoverHeader {...this.props} click={() => this.watch(true)} />
                <div className="atomforce-popover-body">
                    {this.props.connection ? (
                        <PopoverInfoConnection {...this.props} />
                    ) : (
                        <PopoverInfo {...this.props} click={() => this.reload()} />
                    )}
                </div>
            </div>
        );
    }

    async watch (enablewatcher, cartridgemode) {
        if (this.props.watchFiles) {
            this.props = new Init();
            this.watcher.unwatch();
            this.auth.highlight();
            status.icon(null);
        } else {
            this.props = new Init();

            if (this.props.dwFileExists && this.props.dwFileParse.parse && this.props.rootDirectories === 1) {
                this.props.await = true;
                this.props.loader = true;
                if (enablewatcher) this.watcher.watch(this.props);
                this.update();
                await this.auth.webdav(this.props, cartridgemode);
                if (!this.props.auth && !cartridgemode) this.watcher.unwatch();
                this.update();
            } else {
                this.props.watchState = 'disabled';
                this.notify.fileerr();
                status.icon('error');
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
            setTimeout(() => resolve((this.props.loader = false)), 1500);
        });

        await promise;
        this.props = new Init();
        status.icon(null);
        this.update();
    }

    async cartridges () {
        if (this.props.uploading) {
            return this.notify.uploading();
        } else if (!this.props.auth) {
            await this.watch(false, true);
            if (this.props.auth) this.process();
        } else {
            this.props.cartridges = true;
            this.props.connection = true;
            if (this.watcher) this.watcher.unwatch();
            this.update();
            this.process();
        }
    }

    async process () {
        const _data = [];
        const dwdav = DWDAV(this.props.dwFileParse.data);
        const watchlist = utils.watchlist(this.props);
        const tasks = Array.isArray(watchlist) ? watchlist : [watchlist];

        const queue = arr => {
            return arr.reduce((promise, path) => {
                return promise
                    .then(() => {
                        return cartridge(path, dwdav, this.props);
                    })
                    .catch(err => {
                        _data.push(err);
                    });
            }, Promise.resolve());
        };

        await queue(tasks);
        this.resolver(_data);
    }

    resolver (errors) {
        if (errors.length) {
            this.notify.cartridgeserr(errors[0]);
            this.props = new Init();
            this.props.connection = true;
            this.props.cartridgeserr = true;
            this.update();
            this.popover();
            status.icon('error');
        } else {
            this.notify.cartridges(this.props.dwFileParse.data.hostname);
            this.props = new Init();
            this.update();
            this.popover();
            status.icon(null);
        }
    }

    popover () {
        const elem = document.getElementById('atomforce-status-bar');
        if (!document.contains(this.element) && elem) elem.click();
    }

    update () {
        etch.update(this);
    }
}
