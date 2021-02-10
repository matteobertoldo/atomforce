'use babel';

import cartridge from '../dw/cartridges';
import etch from 'etch';
import status from '../utils/status-icon';
import utils from '../watcher/watcher-utils';
import Auth from '../dw/auth-mgr';
import DWDAV from '../dw/dwdav';
import Init from '../utils/init';
import Notifications from '../components/notifications-mgr';
import PopoverHeader from './popover-header';
import PopoverInfo from './popover-info';
import PopoverInfoConnection from './popover-info-connection';
import Tab from '../tab/';
import Watcher from '../watcher/';
let tab = {};

/** @jsx etch.dom */
export default class PopoverComponents {
  constructor() {
    this.auth = new Auth();
    this.notify = new Notifications();
    this.props = new Init();
    this.progressname = 'atomforce-progress-percentage';
    this.statusbar = 'atomforce-status-bar';
    this.tab = new Tab();
    this.watcher = new Watcher(this.tab);
    tab = this.tab;
    etch.initialize(this);
  }

  render() {
    return (
      <div className="atomforce-popover-components">
        <PopoverHeader {...this.props} click={() => this.watch(true)} />
        <div className="atomforce-popover-body">
          {this.props.connection ? (
            <PopoverInfoConnection {...this.props} />
          ) : (
            <PopoverInfo {...this.props} click={() => this.reload()} />
          )}
        </div>
      </div>
    );
  }

  async watch(enablewatcher, cartridgemode) {
    if (this.props.watchFiles) {
      this.props = new Init();
      this.watcher.unwatch();
      this.auth.highlight();
      status.icon(null);
    } else {
      this.props = new Init();

      if (this.props.dwFileExists && this.props.dwFileParse.parse && this.props.rootDirectories === 1) {
        this.props.await = true;
        this.props.loader = true;

        if (enablewatcher) {
          this.watcher.watch(this.props);
        }

        this.update();
        this.tab.update(this.props);

        await this.auth.webdav(this.props, cartridgemode);
        if (!this.props.auth && !cartridgemode) {
          this.watcher.unwatch();
        }

        this.update();
        this.tab.update(this.props);
      } else {
        this.props.watchState = 'disabled';
        this.notify.fileerr();
        status.icon('error');
      }
    }

    this.update();
    this.tab.update(this.props);
  }

  reload() {
    this.props.loader = true;
    this.update();
    this.spinner();
  }

  async spinner() {
    const promise = new Promise((resolve) => {
      setTimeout(() => resolve((this.props.loader = false)), 1500);
    });

    await promise;
    this.props = new Init();
    status.icon(null);
    this.update();
  }

  async cartridges() {
    if (this.props.uploading) {
      return this.notify.uploading();
    } else if (!this.props.auth) {
      await this.watch(false, true);
      if (this.props.auth) this.process();
    } else {
      this.props.cartridges = true;
      this.props.connection = true;
      if (this.watcher) this.watcher.unwatch();
      this.update();
      this.process();
    }
  }

  async process() {
    const watchlist = utils.watchlist(this.props);
    const settings = {
      DEFER: 0,
      STEPS: 4,
      data: [],
      dwdav: DWDAV(this.props.dwFileParse.data),
      tasks: Array.isArray(watchlist) ? watchlist : utils.dirs(watchlist, this.props),
      percentage: atom.config.get('atomforce.cartridgesOptions.showProgressPercentage'),
      statusbar: document.getElementById(this.statusbar),
      span: document.createElement('span')
    };

    const queue = (task, notify) => {
      return task.reduce((promise, path) => {
        return promise
          .then(() => {
            return cartridge(path, settings.dwdav, this.props, notify);
          })
          .catch((err) => {
            settings.data.push(err);
          });
      }, Promise.resolve());
    };

    if (settings.percentage && settings.statusbar) {
      settings.span.setAttribute('id', this.progressname);
      settings.span.classList.add(this.progressname);
      settings.span.innerHTML = `${0}%`;
      settings.statusbar.appendChild(settings.span);
    }

    await queue(settings.tasks, (notify) => {
      if (notify) {
        settings.DEFER += settings.STEPS;
      } else {
        settings.DEFER++;
      }

      this.props.progress = Math.round((settings.DEFER * 100) / (settings.STEPS * settings.tasks.length));
      if (settings.percentage && settings.statusbar) {
        settings.span.innerHTML = `${this.props.progress}%`;
      }

      this.update();
    });

    this.resolver(settings.data);
  }

  resolver(errors) {
    if (errors.length) {
      this.notify.cartridgeserr(errors[0]);
      this.props = new Init();
      this.props.connection = true;
      this.props.cartridgeserr = true;
      tab.update(this.props);
    } else {
      this.notify.cartridges(this.props.dwFileParse.data.hostname);
      this.props.cartridges = false;
      this.watcher.watch(this.props);
    }

    this.props.progress = 0;
    this.update();
    this.popover();
    status.icon(errors.length ? 'error' : 'connected');
  }

  popover() {
    const statusbar = document.getElementById(this.statusbar);
    const progress = document.getElementById(this.progressname);

    if (!document.contains(this.element) && statusbar) statusbar.click();
    if (progress) progress.remove();
  }

  update() {
    etch.update(this);
  }
}

export { tab };
