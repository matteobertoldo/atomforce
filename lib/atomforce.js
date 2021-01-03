'use babel';

import * as deps from 'atom-package-deps';
import AtomforceStatusBar from './components/status-bar';
import Notifications from './components/notifications-mgr';
import config from './config/';
import fileUrl from 'file-url';
import { CompositeDisposable } from 'atom';
import { join } from 'path';
import { shell } from 'electron';
import { tab } from './popover/';

export default {
  config,
  activate() {
    atom.config.unset('atomforce.filesInTab');
    deps.install('atomforce', true).then(() => {});
    this.atomforceStatusBar = new AtomforceStatusBar();
    this.notify = new Notifications();
    this.subscriptions = new CompositeDisposable();
    this.init = 0;
    this.atomforceStatusBar.init();
    this.subscriptions.add(
      atom.workspace.addOpener((uri) => {
        if (uri === tab.uri) return tab;
      }),
      atom.commands.add('atom-workspace', {
        'atomforce:toggletab': () => tab.toggleURI(),
        'atomforce:attach': () => this.attach(),
        'atomforce:watch': () => this.showPopover(),
        'atomforce:disablewatch': () => this.showPopover(true),
        'atomforce:cartridges': () => this.uploadCartridges(),
        'atomforce:documentation': () => this.openDocumentation()
      }),
      atom.config.onDidChange('atomforce.statusBar', () => {
        const confirm = () => {
          atom.confirm(
            {
              message: 'Atomforce Status Bar',
              detail: 'Are you sure you want to reload Atom for see Atomforce Status Bar changed?',
              buttons: ['Reload', 'Cancel']
            },
            (cb) => {
              return cb === 0 ? atom.reload() : null;
            }
          );
        };

        return setTimeout(confirm, 125);
      })
    );
  },
  deactivate() {
    if (this.statusBarTile) {
      this.statusBarTile.destroy();
      this.atomforceStatusBar.destroy();
    }

    tab.destroy();
    this.subscriptions.dispose();
  },
  consumeDwJsonSchemaProvider() {
    return {
      getSchemaURI() {
        return fileUrl(join(__dirname, '..', '/providers/dw.schema.json'));
      },
      getFilePattern() {
        return join(atom.project.getPaths()[0] || '.', 'dw.json');
      }
    };
  },
  consumeStatusBar(statusBar) {
    this.statusBar = statusBar;
    if (atom.config.get('atomforce.statusBar')) this.attach();
  },
  attach() {
    if (this.init === 0) {
      this.statusBarTile = this.statusBar.addRightTile({
        item: this.atomforceStatusBar,
        priority: -1
      });
    }

    this.init++;
    if (this.init > 1) this.notify.statusbar();
  },
  showPopover(disablewatch) {
    return !this.statusBarTile ? this.notify.watchinfo() : this.atomforceStatusBar.showPopover(disablewatch);
  },
  uploadCartridges() {
    return !this.statusBarTile ? this.notify.watchinfo() : this.atomforceStatusBar.cartridges();
  },
  openDocumentation() {
    return shell.openExternal('https://documentation.b2c.commercecloud.salesforce.com');
  }
};
