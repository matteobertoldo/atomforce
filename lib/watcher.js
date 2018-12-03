'use babel';

import chokidar from 'chokidar';

export default class Watcher {
    constructor () {
        this.watcher = null;
    }

    create (root, symlinks, ignored) {
        this.watcher = chokidar.watch(root, {
            followSymlinks: symlinks,
            ignored: ignored,
            ignoreInitial: true
        });
    }

    watch (root, symlinks, ignored) {
        this.create(root, symlinks, ignored);
        this.watcher
            .on('add', path => console.log(`File ${path} has been added`))
            .on('change', path => console.log(`File ${path} has been changed`))
            .on('unlink', path => console.log(`File ${path} has been removed`))
            .on('addDir', path => console.log(`Directory ${path} has been added`))
            .on('unlinkDir', path => console.log(`Directory ${path} has been removed`));
    }

    unwatch () {
        this.watcher.close();
    }
}
