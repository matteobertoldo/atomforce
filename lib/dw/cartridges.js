'use babel';

import del from 'del';
import fs from 'fs';
import match from 'multimatch';
import path from 'path';
import status from '../utils/status-icon';
import utils from '../watcher/watcher-utils';
import walk from 'walk';
import yazl from 'yazl';

export default async (cartridge, dwdav, props, notify) => {
  if (!fs.existsSync(cartridge)) {
    notify(true);
    return Promise.reject(new Error(`${cartridge} does not exist`));
  }

  const remoteroot = utils.remoteroot(props);
  const zippath = path.resolve(remoteroot, `${path.basename(cartridge)}.zip`);
  const force = { force: true };

  return new Promise((resolve, reject) => {
    props.uploading = true;
    return del(zippath, force).then(() => {
      const archive = new yazl.ZipFile();
      const ignored = atom.config.get('atomforce.watcherOptions.ignoredList');
      const filters = [];

      for (let i = 0; i < ignored.length; i++) {
        filters.push(ignored[i].replace(/[*/]/g, ''));
      }

      const walker = walk.walk(cartridge, {
        followLinks: atom.config.get('atomforce.watcherOptions.followSymlinks'),
        filters
      });

      walker
        .on('file', (root, filestats, next) => {
          const matchers = !match([root, filestats.name], filters).length;
          const realpath = path.resolve(root, filestats.name);
          const file = path.relative(path.dirname(cartridge), realpath);

          if (atom.config.get('atomforce.watcherOptions.followDots') && matchers) {
            archive.addFile(realpath, file);
          } else if (!filestats.name.startsWith('.') && matchers) {
            archive.addFile(realpath, file);
          }

          next();
        })
        .on('end', () => {
          archive.end();
        })
        .on('errors', (root) => {
          props.uploading = false;
          notify(true);
          reject(new Error(`Error reading file in: ${root}. There are some corrupted files?`));
        });

      archive.outputStream
        .pipe(fs.createWriteStream(zippath))
        .on('error', (err) => {
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
      return atom.config.get('atomforce.cartridgesOptions.cleanWebDAV')
        ? dwdav.delete(cartridge, remoteroot).then(() => notify())
        : Promise.resolve(notify());
    })
    .then(() => {
      return dwdav.postAndUnzip(zippath, remoteroot).then(() => notify());
    })
    .then(() => {
      return dwdav.delete(zippath, remoteroot).then(() => notify());
    })
    .then(async () => {
      return del(zippath, force).then(() => {
        props.uploading = false;
        notify();
      });
    })
    .catch(async (err) => {
      return del(zippath, force).then(() => {
        props.uploading = false;
        notify(true);
        return Promise.reject(err);
      });
    });
};
