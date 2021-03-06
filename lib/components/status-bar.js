'use babel';

import { CompositeDisposable } from 'atom';
import PopoverComponents from '../popover/';

class AtomforceStatusBar extends HTMLElement {
  init() {
    this.classList.add('atomforce-status-bar', 'inline-block');
    this.setAttribute('id', 'atomforce-status-bar');
    this._icon(this);
    this._tooltip();
  }

  _icon(elem) {
    const icon = document.createElement('span');
    icon.classList.add('icon', 'icon-cloud-upload');
    elem.appendChild(icon);
  }

  _tooltip() {
    this.subscriptions = new CompositeDisposable();
    this.popoverComponents = new PopoverComponents();

    this.subscriptions.add(
      atom.tooltips.add(this, {
        placement: 'top',
        class: 'atomforce-tooltip',
        item: this.popoverComponents,
        trigger: 'click'
      })
    );
  }

  showPopover(disable) {
    const watcher = this.popoverComponents.watcher.watcher;
    if (!document.contains(this.popoverComponents.element)) this.click();
    return this._controls(watcher, !!disable);
  }

  _controls(watcher, disable) {
    const elem = document.getElementById('atomforce-toggle');
    return disable ? (watcher ? elem.click() : false) : watcher == null ? elem.click() : false;
  }

  cartridges() {
    if (!document.contains(this.popoverComponents.element)) this.click();
    this.popoverComponents.cartridges();
  }

  destroy() {
    const watcher = this.popoverComponents.watcher.watcher;
    if (watcher) watcher.close();
    this.subscriptions.dispose();
  }
}

export default document.registerElement('atomforce-status-bar', {
  prototype: AtomforceStatusBar.prototype,
  extends: 'div'
});
