'use babel';

import chokidar from 'chokidar';
import utils from './watcher-utils';
import DWDAV from '../dw/dwdav';

export default class Watcher {
    constructor () {
        this.watcher = null;
    }

    watch (props) {
        this.dwdav = DWDAV(props.dwFileParse.data);
        this.create(utils.watchlist(props));

        this.watcher.on('all', (event, location) => {
            if (event === 'add' || event === 'change') {
                if (!props.await && props.auth) {
                    this.put(location, props);
                }
            } else if (event === 'unlink' || event === 'unlinkDir') {
                if (!props.await && props.auth) {
                    this.delete(location, props);
                }
            }
        });
    }

    create (path) {
        this.watcher = chokidar.watch(path, {
            followSymlinks: atom.config.get('atomforce.followSymlinks'),
            ignored: this.glob(),
            ignoreInitial: true,
            awaitWriteFinish: {
                stabilityThreshold: 125,
                pollInterval: 100
            }
        });
    }

    glob () {
        const ignored = atom.config.get('atomforce.ignoredList');
        if (!atom.config.get('atomforce.followDots')) ignored.push(/(^|[/\\])\../);

        return ignored;
    }

    put (path, props) {
        this.dwstorage();
        this.dwdav
            .post(path, utils.remoteroot(props))
            .then(() => {
                console.log(`File uploaded: ${utils.relativize(path, props)}`);
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    delete (path, props) {
        this.dwstorage();
        this.dwdav
            .delete(path, utils.remoteroot(props))
            .then(() => {
                console.log(`Path deleted: ${utils.relativize(path, props)}`);
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    dwstorage () {
        if (!sessionStorage.getItem('dwdav')) return sessionStorage.setItem('dwdav', true);
    }

    unwatch () {
        this.watcher.close();
        this.watcher = null;
    }
}
