'use babel';

import path from 'path';
import chokidar from 'chokidar';
import DWDAV from './dwdav';

export default class Watcher {
    constructor () {
        this.watcher = null;
    }

    create (p) {
        this.watcher = chokidar.watch(p, {
            followSymlinks: atom.config.get('atomforce.followSymlinks'),
            ignored: atom.config.get('atomforce.ignoredList'),
            ignoreInitial: true
        });
    }

    watch (props) {
        const log = atom.config.get('atomforce.log');

        this.dwdav = new DWDAV(props.dwFileParse.data);
        this.create(this.watchlist(props));

        this.watcher.on('add', p => {
            if (!props.await && props.auth) {
                if (log) console.log(`File ${p} has been added`);
                this.put(p, props);
            }
        }).on('change', p => {
            if (!props.await && props.auth) {
                if (log) console.log(`File ${p} has been changed`);
                this.put(p, props);
            }
        }).on('unlink', p => {
            if (!props.await && props.auth) {
                if (log) console.log(`File ${p} has been removed`);
                this.delete(p, props);
            }
        }).on('unlinkDir', p => {
            if (!props.await && props.auth) {
                if (log) console.log(`Directory ${p} has been removed`);
                this.delete(p, props);
            }
        });
    }

    put (p, props) {
        this.dwdav.post(p, this.remoteroot(props)).then(() => {
            console.log(`File uploaded: ${this.relativize(p, props)}`);
        }).catch(err => {
            console.log(err);
        });
    }

    delete (p, props) {
        this.dwdav.delete(p, this.remoteroot(props)).then(() => {
            console.log(`Path deleted: ${this.relativize(p, props)}`);
        }).catch(err => {
            console.log(err);
        });
    }

    watchlist (props) {
        const cartridges = props.dwFileParse.data.cartridges;

        if (cartridges) {
            if (Array.isArray(cartridges)) {
                let arr = [];

                for (let i = 0; i < cartridges.length; i++) {
                    arr.push(`${props.root}/${cartridges[i]}`);
                }

                return arr;
            } else {
                return `${props.root}/${cartridges}`;
            }
        } else {
            return props.root;
        }
    }

    remoteroot (props) {
        const dataroot = props.dwFileParse.data.root;

        if (dataroot) {
            return (dataroot === '.') ? props.root : `${props.root}/${dataroot}`;
        } else {
            return props.root;
        }
    }

    relativize (p, props) {
        return path.relative(path.join(process.cwd(), props.root), p);
    }

    unwatch () {
        this.watcher.close();
        this.watcher = null;
    }
}
