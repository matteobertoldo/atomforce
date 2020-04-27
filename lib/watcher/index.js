'use babel';

import chokidar from 'chokidar';
import filesize from 'filesize';
import status from '../utils/status-icon';
import utils from './watcher-utils';
import DWDAV from '../dw/dwdav';

export default class Watcher {
    constructor(tab) {
        this.tab = tab;
        this.tasks = 0;
        this.watcher = null;
    }

    watch(props) {
        this.dwdav = DWDAV(props.dwFileParse.data);
        this._create(utils.watchlist(props));
        this.indexes = atom.config.get('atomforce.filesInTab');

        this.watcher.on('all', (event, location, stats) => {
            const data = {
                event: event,
                extension: this._extension(location),
                isFile: stats ? stats.isFile() : false,
                isSymbolicLink: stats ? stats.isSymbolicLink() : false,
                size: stats ? filesize(stats.size) : false
            };

            if (!props.await && props.auth) {
                if (event === 'add' || event === 'change') {
                    this.put(location, props, data);
                } else if (event === 'unlink' || event === 'unlinkDir') {
                    this.delete(location, props, data);
                }
            }
        });
    }

    _create(path) {
        this.watcher = chokidar.watch(path, {
            followSymlinks: atom.config.get('atomforce.watcherOptions.followSymlinks'),
            ignored: this._glob(),
            ignoreInitial: true,
            awaitWriteFinish: {
                stabilityThreshold: 125,
                pollInterval: 100
            }
        });
    }

    _glob() {
        const ignored = atom.config.get('atomforce.watcherOptions.ignoredList');
        if (!atom.config.get('atomforce.watcherOptions.followDots')) ignored.push(/(^|[/\\])\../);

        return ignored;
    }

    _extension(filename) {
        const ext = filename.lastIndexOf('.');
        return ext < 0 ? '' : filename.substr(ext);
    }

    put(path, props, stats) {
        this._updateStatusIcon();
        this.dwdav
            .post(path, utils.remoteroot(props))
            .then(() => {
                this._report(stats, null, utils.relativize(path, props));
            })
            .catch((err) => {
                this._report(stats, err);
            });
    }

    delete(path, props, stats) {
        this._updateStatusIcon();
        this.dwdav
            .delete(path, utils.remoteroot(props))
            .then(() => {
                this._report(stats, null, utils.relativize(path, props));
            })
            .catch((err) => {
                this._report(stats, err);
            });
    }

    _report(stats, err, path) {
        this.tasks--;
        this.tab.getData({
            ...stats,
            ...{
                indexes: this.indexes,
                path: err ? `Error status: ${err.message.trim() === '' ? 'ETIMEDOUT' : err.message}` : path,
                timestamp: `${new Date().toLocaleTimeString()}`,
                uploaded: !err
            }
        });

        if (this.tasks === 0) status.icon(!err ? 'connected' : 'error');
    }

    _updateStatusIcon() {
        this.tasks++;
        status.icon('uploading');
    }

    unwatch() {
        this.watcher.close();
        this.watcher = null;
    }
}
