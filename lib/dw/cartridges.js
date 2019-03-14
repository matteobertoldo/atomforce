'use babel';

import del from 'del';
import fs from 'fs';
import match from 'multimatch';
import path from 'path';
import status from '../status-icon';
import utils from '../watcher/watcher-utils';
import walk from 'walk';
import yazl from 'yazl';
import DWDAV from './dwdav';

export default class Cartridges {
    constructor (props) {
        this.props = props;
        this.dwdav = DWDAV(this.props.dwFileParse.data);
    }

    upload (cartridge) {
        const arr = [];

        if (Array.isArray(cartridge)) {
            for (let i = 0; i < cartridge.length; i++) {
                arr.push(zip(cartridge[i], this.dwdav, this.props));
            }
        } else {
            arr.push(zip(cartridge, this.dwdav, this.props));
        }

        return arr;
    }
}

const zip = (cartridge, dwdav, props) => {
    if (!fs.existsSync(cartridge)) {
        return () => Promise.reject(new Error(`${cartridge} does not exist`));
    }

    const remoteroot = utils.remoteroot(props);
    const zippath = path.resolve(remoteroot, `${path.basename(cartridge)}.zip`);
    const _watchlist = utils.watchlist(props);

    return () =>
        new Promise((resolve, reject) => {
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
                        reject(new Error(`Error reading file in: ${root}`));
                        next();
                    });

                archive.outputStream
                    .pipe(fs.createWriteStream(zippath))
                    .on('error', err => {
                        props.uploading = false;
                        reject(new Error(err));
                    })
                    .on('close', () => {
                        status.icon('uploading');
                        resolve();
                    });
            });
        })
            .then(() => {
                return dwdav.delete(cartridge, remoteroot);
            })
            .then(() => {
                return dwdav.postAndUnzip(zippath, remoteroot);
            })
            .then(() => {
                return dwdav.delete(zippath, remoteroot);
            })
            .then(() => {
                return del(zippath).then(() => {
                    props.uploading = false;
                    return `Successfully uploaded cartridge: ${utils.relativize(cartridge, props)}`;
                });
            })
            .catch(err => {
                return del(zippath).then(() => {
                    props.uploading = false;
                    return Promise.reject(err);
                });
            });
};
