'use babel';

export default class AtomforceTab {
    constructor () {
        this.element = document.createElement('div');
        this.element.classList.add('atomforce-tab');

        const message = document.createElement('div');
        this.element.appendChild(message);

        this.subscriptions = atom.workspace.getCenter().observeActivePaneItem(item => {
            if (!atom.workspace.isTextEditor(item)) return;
            message.innerHTML =
                `<ul>
                    <li><b>File Title:</b> ${item.getFileName()}</li>
                    <li><b>Soft Wrap:</b> ${item.softWrapped}</li>
                    <li><b>Tab Length:</b> ${item.getTabLength()}</li>
                    <li><b>Encoding:</b> ${item.getEncoding()}</li>
                    <li><b>Line Count:</b> ${item.getLineCount()}</li>
                </ul>`;
        });
    }

    getAllowedLocations () {
        return ['center', 'right'];
    }

    getDefaultLocation () {
        return 'right';
    }

    getElement () {
        return this.element;
    }

    getIconName () {
        return 'cloud-upload';
    }

    getPreferredWidth () {
        return 400;
    }

    getTitle () {
        return 'Atomforce';
    }

    getURI () {
        return 'atom://atomforce-tab';
    }

    destroy () {
        this.element.remove();
        this.subscriptions.dispose();
    }
}
