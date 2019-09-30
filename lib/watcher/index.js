'use babel';

import chokidar from 'chokidar';
import filesize from 'filesize';
import utils from './watcher-utils';
import DWDAV from '../dw/dwdav';

export default class Watcher {
    constructor (tab) {
        this.tab = tab;
        this.watcher = null;
    }

    watch (props) {
        this.dwdav = DWDAV(props.dwFileParse.data);
        this.create(utils.watchlist(props));
        this.watcher.on('all', (event, location, stats) => {
            this.stats = {
                event: event,
                extension: this.extension(location),
                isFile: stats ? stats.isFile() : false,
                isSymbolicLink: stats ? stats.isSymbolicLink() : false,
                size: stats ? filesize(stats.size) : false
            };

            if (!props.await && props.auth) {
                if (event === 'add' || event === 'change') {
                    this.put(location, props, this.stats);
                } else if (event === 'unlink' || event === 'unlinkDir') {
                    this.delete(location, props, this.stats);
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

    extension (filename) {
        const ext = filename.lastIndexOf('.');
        return ext < 0 ? '' : filename.substr(ext);
    }

    put (path, props, stats) {
        this.dwdav
            .post(path, utils.remoteroot(props))
            .then(() => {
                this.report(stats, null, utils.relativize(path, props));
            })
            .catch(err => {
                this.report(stats, err);
            });
    }

    delete (path, props, stats) {
        this.dwdav
            .delete(path, utils.remoteroot(props))
            .then(() => {
                this.report(stats, null, utils.relativize(path, props));
            })
            .catch(err => {
                this.report(stats, err);
            });
    }

    report (stats, err, msg) {
        return this.tab.getData({
            ...stats,
            ...{
                path: err ? `Error status: ${err.message}` : msg
            }
        });
    }

    unwatch () {
        this.watcher.close();
        this.watcher = null;
    }
}
