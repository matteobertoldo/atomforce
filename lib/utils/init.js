'use babel';

import dwfile from '../dw/dwfile';

export default class Init {
    constructor() {
        const root = atom.project.getPaths()[0] || '.';
        return (this.prop = {
            dwFileExists: dwfile.exists(root, 'dw.json'),
            dwFileParse: dwfile.parse(`${root}/dw.json`),
            root,
            rootDirectories: atom.project.getPaths().length,
            watchState: 'disabled',
            webDAVFilesList: []
        });
    }
}
