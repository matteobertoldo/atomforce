'use babel';

import chokidar from 'chokidar';
import DWDAV from './dwdav';

export default class Watcher {
    constructor () {
        this.watcher = null;
    }

    create (path, symlinks, ignored) {
        this.watcher = chokidar.watch(path, {
            followSymlinks: symlinks,
            ignored: ignored,
            ignoreInitial: true
        });
    }

    watch (props, symlinks, ignored, log) {
        this.create(this.watchlist(props), symlinks, ignored);
        this.watcher.on('add', path => {
            if (!props.await && props.auth) {
                if (log) console.log(`File ${path} has been added`);
                this.put(props, path);
            }
        }).on('change', path => {
            if (!props.await && props.auth) {
                if (log) console.log(`File ${path} has been changed`);
                this.put(props, path);
            }
        }).on('unlink', path => {
            if (!props.await && props.auth) {
                if (log) console.log(`File ${path} has been removed`);
                this.delete(props, path);
            }
        }).on('unlinkDir', path => {
            if (!props.await && props.auth) {
                if (log) console.log(`Directory ${path} has been removed`);
                this.delete(props, path);
            }
        });
    }

    put (props, path) {
        DWDAV(props.dwFileParse.data).post(path, this.remoteroot(props)).then(() => {
            console.log(`File uploaded: ${path}`);
        }).catch(err => {
            console.log(err);
        });
    }

    delete (props, path) {
        DWDAV(props.dwFileParse.data).delete(path, this.remoteroot(props)).then(() => {
            console.log(`Path removed: ${path}`);
        }).catch(err => {
            console.log(err);
        });
    }

    watchlist (prop) {
        const cartridges = prop.dwFileParse.data.cartridges;

        if (cartridges) {
            if (Array.isArray(cartridges)) {
                let arr = [];

                for (let i = 0; i < cartridges.length; i++) {
                    arr.push(`${prop.root}/${cartridges[i]}`);
                }

                return arr;
            } else {
                return `${prop.root}/${cartridges}`;
            }
        } else {
            return prop.root;
        }
    }

    remoteroot (prop) {
        const dataroot = prop.dwFileParse.data.root;

        if (dataroot) {
            return (dataroot === '.') ? prop.root : `${prop.root}/${dataroot}`;
        } else {
            return prop.root;
        }
    }

    relativize (path) {}

    unwatch () {
        this.watcher.close();
    }
}
