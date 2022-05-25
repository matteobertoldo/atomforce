'use babel';

import { readdirSync } from 'fs';
import { join, relative } from 'path';

export default {
  dirs(source, props) {
    const symlinks = atom.config.get('atomforce.watcherOptions.followSymlinks');
    const hiddens = atom.config.get('atomforce.watcherOptions.followDots');

    return readdirSync(source, { withFileTypes: true })
      .filter(
        (dirent) =>
          (dirent.isDirectory() || (symlinks ? dirent.isSymbolicLink() : true)) &&
          !dirent.name.match(/^.git|node_modules/g) &&
          (!hiddens ? !dirent.name.startsWith('.') : true)
      )
      .map((dirent) => join(this.remoteroot(props), dirent.name));
  },
  watchlist(props) {
    const cartridges = props.dwFileParse.data.cartridges;

    if (cartridges && Array.isArray(cartridges)) {
      const arr = [];

      for (let i = 0; i < cartridges.length; i++) {
        if (cartridges[i].length && cartridges[i].trim() !== '' && cartridges[i].trim() !== '.') {
          arr.push(`${this.remoteroot(props)}/${cartridges[i]}/**`);
        }
      }

      return arr.length > 0 ? arr : `${this.remoteroot(props)}/**`;
    } else {
      return `${this.remoteroot(props)}/**`;
    }
  },
  remoteroot(props) {
    const dataroot = props.dwFileParse.data.root;

    if (dataroot) {
      return dataroot === '.' ? props.root : `${props.root}/${dataroot}`;
    } else {
      return props.root;
    }
  },
  relativize(source, props) {
    return relative(join(process.cwd(), props.root), source);
  }
};
