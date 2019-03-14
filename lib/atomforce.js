'use babel';

import { CompositeDisposable } from 'atom';
import AtomforceStatusBar from './status-bar';
import AtomforceTab from './tab/';
import Notifications from './components/notifications-mgr';
import config from './config/';

export default {
    config: config,
    activate () {
        this.subscriptions = new CompositeDisposable();
        this.atomforceStatusBar = new AtomforceStatusBar();
        this.notify = new Notifications();

        this.subscriptions.add(
            atom.commands.add('atom-workspace', {
                'atomforce:attach': () => this.attach()
            })
        );

        this.subscriptions.add(
            atom.commands.add('atom-workspace', {
                'atomforce:watch': () => this.showPopover()
            })
        );

        this.subscriptions.add(
            atom.commands.add('atom-workspace', {
                'atomforce:disablewatch': () => this.showPopover(true)
            })
        );

        this.subscriptions.add(
            atom.commands.add('atom-workspace', {
                'atomforce:cartridges': () => this.uploadCartridges()
            })
        );

        this.subscriptions.add(
            atom.commands.add('atom-workspace', {
                'atomforce:toggletab': () => this.toggleTab()
            })
        );

        this.atomforceStatusBar.init();
    },
    deactivate () {
        this.subscriptions.dispose();
        if (this.tab) this.tab.destroy();

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
    showPopover (disablewatch) {
        this.tileCheck();
        this.atomforceStatusBar.showPopover(disablewatch);
    },
    uploadCartridges () {
        this.tileCheck();
        this.atomforceStatusBar.cartridges();
    },
    tileCheck () {
        if (!this.statusBarTile) {
            return this.notify.watchinfo();
        }
    },
    toggleTab () {
        if (!this.tab) this.tab = new AtomforceTab();

        atom.workspace.addOpener(uri => {
            if (uri === 'atom://atomforce-tab') {
                return this.tab;
            }
        });
        atom.workspace.toggle('atom://atomforce-tab');
    },
    performInit () {}
};
