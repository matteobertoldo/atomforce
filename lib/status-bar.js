'use babel';

import { CompositeDisposable } from 'atom';
import PopoverComponents from './popover-components';

class AtomforceStatusBar extends HTMLElement {
    init () {
        this.classList.add('atomforce-status-bar', 'inline-block');
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

        this.subscriptions.add(atom.tooltips.add(this, {
            placement: 'top',
            class: 'atomforce-tooltip',
            item: this.popoverComponents,
            trigger: 'click'
        }));
    }

    destroy () {
        this.subscriptions.dispose();
    }
}

export default document.registerElement('atomforce-status-bar', {
    prototype: AtomforceStatusBar.prototype,
    extends: 'div'
});
