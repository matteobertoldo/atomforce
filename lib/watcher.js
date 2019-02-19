'use babel';

import chokidar from 'chokidar';
import utils from './watcher-utils';
import DWDAV from './dwdav';

export default class Watcher {
    constructor () {
        this.watcher = null;
    }

    create (p) {
        this.watcher = chokidar.watch(p, {
            followSymlinks: atom.config.get('atomforce.followSymlinks'),
            ignored: this.glob(),
            ignoreInitial: true
        });
    }

    glob () {
        const ignored = atom.config.get('atomforce.ignoredList');
        if (!atom.config.get('atomforce.followDots')) ignored.push(/(^|[/\\])\../);

        return ignored;
    }

    watch (props) {
        const log = atom.config.get('atomforce.log');

        this.dwdav = DWDAV(props.dwFileParse.data);
        this.create(utils.watchlist(props));

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
        this.dwdav.post(p, utils.remoteroot(props)).then(() => {
            console.log(`File uploaded: ${utils.relativize(p, props)}`);
        }).catch(err => {
            console.log(err);
        });
    }

    delete (p, props) {
        this.dwdav.delete(p, utils.remoteroot(props)).then(() => {
            console.log(`Path deleted: ${utils.relativize(p, props)}`);
        }).catch(err => {
            console.log(err);
        });
    }

    unwatch () {
        this.watcher.close();
        this.watcher = null;
    }
}
