'use babel';

import dwfile from './dw/dwfile';

export default class Init {
    constructor () {
        this.root = atom.project.getPaths()[0] ? atom.project.getPaths()[0] : '.';
        this.prop = {
            dwFileExists: dwfile.exists(this.root, 'dw.json'),
            dwFileParse: dwfile.parse(`${this.root}/dw.json`),
            root: this.root,
            rootDirectories: atom.project.getPaths().length,
            watchState: 'disabled'
        };

        return this.prop;
    }
}
