'use babel';

import AtomforceStatusBar from './components/status-bar';
import Notifications from './components/notifications-mgr';
import config from './config/';
import { CompositeDisposable } from 'atom';
import { tab } from './popover/';

export default {
    config: config,
    activate () {
        this.atomforceStatusBar = new AtomforceStatusBar();
        this.notify = new Notifications();
        this.subscriptions = new CompositeDisposable();

        this.subscriptions.add(
            atom.workspace.addOpener(uri => {
                if (uri === tab.uri) {
                    return tab;
                }
            }),
            atom.commands.add('atom-workspace', {
                'atomforce:toggletab': () => tab.toggleURI()
            }),
            atom.commands.add('atom-workspace', {
                'atomforce:attach': () => this.attach()
            }),
            atom.commands.add('atom-workspace', {
                'atomforce:watch': () => this.showPopover()
            }),
            atom.commands.add('atom-workspace', {
                'atomforce:disablewatch': () => this.showPopover(true)
            }),
            atom.commands.add('atom-workspace', {
                'atomforce:cartridges': () => this.uploadCartridges()
            })
        );

        this.atomforceStatusBar.init();
    },
    deactivate () {
        if (this.statusBarTile) {
            this.statusBarTile.destroy();
            this.atomforceStatusBar.destroy();
        }

        tab.destroy();
        this.subscriptions.dispose();
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
    showPopover (disablewatch) {
        return !this.statusBarTile ? this.notify.watchinfo() : this.atomforceStatusBar.showPopover(disablewatch);
    },
    uploadCartridges () {
        return !this.statusBarTile ? this.notify.watchinfo() : this.atomforceStatusBar.cartridges();
    }
};
