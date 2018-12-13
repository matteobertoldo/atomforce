'use babel';

import dwfile from './dwfile';

export default class Init {
    constructor () {
        this.root = atom.project.getPaths()[0] ? atom.project.getPaths()[0] : '.';
        this.prop = {
            auth: false,
            await: false,
            connection: false,
            dwFileExists: dwfile.exists(this.root, 'dw.json'),
            dwFileParse: dwfile.parse(`${this.root}/dw.json`),
            followSymlinks: atom.config.get('atomforce.followSymlinks'),
            ignoredList: atom.config.get('atomforce.ignoredList'),
            loader: false,
            log: atom.config.get('atomforce.log'),
            root: this.root,
            rootDirectories: atom.project.getPaths().length,
            watchFiles: false,
            watchState: 'disabled'
        };

        return this.prop;
    }
}
