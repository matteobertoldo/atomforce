'use babel';

import { CompositeDisposable } from 'atom';
import AtomforceStatusBar from './status-bar';
import config from './config';

export default {
    config: config,
    activate () {
        this.subscriptions = new CompositeDisposable();
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'atomforce:attach': () => this.attach()
        }));

        this.atomforceStatusBar = new AtomforceStatusBar();
        this.atomforceStatusBar.init();
    },
    deactivate () {
        this.subscriptions.dispose();

        if (this.statusBarTile) {
            this.statusBarTile.destroy();
            this.atomforceStatusBar.destroy();
        }
    },
    consumeStatusBar (statusBar) {
        this.statusBar = statusBar;

        if (atom.config.get('atomforce.statusBar')) {
            this.attach();
        }
    },
    attach () {
        this.statusBarTile = this.statusBar.addRightTile({
            item: this.atomforceStatusBar,
            priority: -1
        });
    },
    performInit () {}
};
