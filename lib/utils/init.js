'use babel';

import { exists, parse } from '../dw/dwfile';

export default class Init {
  constructor() {
    const root = atom.project.getPaths()[0] || '.';
    return (this.prop = {
      dwFileExists: exists(root, 'dw.json'),
      dwFileParse: parse(`${root}/dw.json`),
      root,
      rootDirectories: atom.project.getPaths().length,
      watchState: 'disabled',
      webDAVFilesList: []
    });
  }
}
