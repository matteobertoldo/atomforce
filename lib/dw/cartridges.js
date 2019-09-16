'use babel';

import del from 'del';
import fs from 'fs';
import match from 'multimatch';
import path from 'path';
import status from '../status-icon';
import utils from '../watcher/watcher-utils';
import walk from 'walk';
import yazl from 'yazl';

export default (cartridge, dwdav, props, notify) => {
    if (!fs.existsSync(cartridge)) {
        notify(true);
        return Promise.reject(new Error(`${cartridge} does not exist`));
    }

    const remoteroot = utils.remoteroot(props);
    const zippath = path.resolve(remoteroot, `${path.basename(cartridge)}.zip`);
    const _watchlist = utils.watchlist(props);

    return new Promise(async (resolve, reject) => {
        props.uploading = true;
        return del(zippath).then(() => {
            const archive = new yazl.ZipFile();
            const ignored = atom.config.get('atomforce.ignoredList');
            const filters = [];

            for (let i = 0; i < ignored.length; i++) {
                filters.push(ignored[i].replace(/[*/]/g, ''));
            }

            const walker = walk.walk(cartridge, {
                followLinks: atom.config.get('atomforce.followSymlinks'),
                filters: filters
            });

            walker
                .on('file', (root, filestats, next) => {
                    const realpath = path.resolve(root, filestats.name);
                    const file = path.relative(path.dirname(cartridge), realpath);
                    const rootdata = path.relative(path.basename(cartridge), file);
                    const data = Array.isArray(_watchlist) ? file : rootdata;

                    if (atom.config.get('atomforce.followDots')) {
                        if (!match([root, filestats.name], filters).length) archive.addFile(realpath, data);
                    } else {
                        if (
                            root.indexOf('.') === -1 &&
                            !filestats.name.startsWith('.') &&
                            !match([root, filestats.name], filters).length
                        ) {
                            archive.addFile(realpath, data);
                        }
                    }

                    next();
                })
                .on('end', () => {
                    archive.end();
                })
                .on('errors', (root, stats, next) => {
                    props.uploading = false;
                    notify(true);
                    reject(new Error(`Error reading file in: ${root}`));
                    next();
                });

            archive.outputStream
                .pipe(fs.createWriteStream(zippath))
                .on('error', err => {
                    props.uploading = false;
                    notify(true);
                    reject(new Error(err));
                })
                .on('close', () => {
                    status.icon('uploading');
                    resolve();
                });
        });
    })
        .then(() => {
            notify();
            return dwdav.delete(cartridge, remoteroot);
        })
        .then(() => {
            notify();
            return dwdav.postAndUnzip(zippath, remoteroot);
        })
        .then(() => {
            notify();
            return dwdav.delete(zippath, remoteroot);
        })
        .then(async () => {
            return del(zippath).then(() => {
                props.uploading = false;
                notify();
                return `Successfully uploaded cartridge: ${utils.relativize(cartridge, props)}`;
            });
        })
        .catch(async err => {
            return del(zippath).then(() => {
                props.uploading = false;
                notify(true);
                return Promise.reject(err);
            });
        });
};
