'use babel';

import etch from 'etch';
import status from '../status-icon';
import utils from '../watcher/watcher-utils';
import Auth from '../dw/auth-mgr';
import Cartridges from '../dw/cartridges';
import Init from '../init';
import PopoverHeader from './popover-header'; // eslint-disable-line no-unused-vars
import PopoverInfo from './popover-info'; // eslint-disable-line no-unused-vars
import PopoverInfoConnection from './popover-info-connection'; // eslint-disable-line no-unused-vars
import Queue from 'p-queue';
import Watcher from '../watcher/';
import Notifications from '../components/notifications-mgr';

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
            <div class="atomforce-popover-components">
                <PopoverHeader {...this.props} click={() => this.watch(true)} />
                <div class="atomforce-popover-body">
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

            if (this.props.auth) {
                this.process();
            }
        } else {
            this.props.cartridges = true;
            this.props.connection = true;
            if (this.watcher) this.watcher.unwatch();
            this.update();
            this.process();
        }
    }

    process () {
        const _err = [];
        const cartridges = new Cartridges(this.props);
        const queue = new Queue({ concurrency: 1 });
        const iterable = cartridges.upload(utils.watchlist(this.props));
        const resolver = errors => {
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
        };

        queue.addAll(iterable).catch(err => {
            _err.push(err);
        });

        queue.onIdle().then(() => {
            return resolver(_err);
        });
    }

    popover () {
        const elem = document.getElementById('atomforce-status-bar');

        if (!document.contains(this.element) && elem) elem.click();
    }

    update () {
        etch.update(this);
    }
}
