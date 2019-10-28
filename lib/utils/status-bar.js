'use babel';

import { CompositeDisposable } from 'atom';
import PopoverComponents from '../popover/';

class AtomforceStatusBar extends HTMLElement {
    init () {
        this.classList.add('atomforce-status-bar', 'inline-block');
        this.setAttribute('id', 'atomforce-status-bar');
        this.icon(this);
        this.tooltip();
    }

    icon (elem) {
        const icon = document.createElement('span');
        icon.classList.add('icon', 'icon-cloud-upload');
        elem.appendChild(icon);
    }

    tooltip () {
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

    destroy () {
        const watcher = this.popoverComponents.watcher.watcher;
        if (watcher) watcher.close();
        this.subscriptions.dispose();
    }

    showPopover (disable) {
        const watcher = this.popoverComponents.watcher.watcher;

        if (!document.contains(this.popoverComponents.element)) {
            this.click();
        }

        return disable ? this.controls(watcher, true) : this.controls(watcher);
    }

    controls (watcher, disable) {
        const elem = document.getElementById('atomforce-toggle');

        if (disable) {
            if (watcher) elem.click();
        } else {
            if (watcher == null) elem.click();
        }
    }

    cartridges () {
        if (!document.contains(this.popoverComponents.element)) this.click();
        this.popoverComponents.cartridges();
    }
}

export default document.registerElement('atomforce-status-bar', {
    prototype: AtomforceStatusBar.prototype,
    extends: 'div'
});
