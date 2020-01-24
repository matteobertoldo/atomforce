'use babel';

import elements from './entries';
import etch from 'etch';
import { remote } from 'electron';

/** @jsx etch.dom */
export default class TabHeader {
    constructor(props) {
        this.props = props;
        etch.initialize(this);
    }

    render() {
        return (
            <header className="atomforce-tab-header">
                <span className="icon icon-database" />
                <span className="hostname">Files Uploaded</span>
                <button className="button-list-count icon icon-ellipses" onClick={this._showActionsMenu} />
                <button className="button-list-clear icon icon-circle-slash" onClick={this.props.clearAll}>
                    Clear All
                </button>
            </header>
        );
    }

    _showActionsMenu(event) {
        event.preventDefault();

        const { Menu, MenuItem } = remote;
        const menu = new Menu();

        const list = this.props.webDAVFilesList;
        const validEntries = list.filter(elements.entries);
        const pluralization = list.length > 1 && validEntries.length > 1 ? 's' : '';
        const MIN = this.props.minFilesToShow;

        menu.append(
            new MenuItem({
                label: `${
                    this.props.showFileSize && validEntries.length > 0 ? 'Hide' : 'Show'
                } file${pluralization} size`,
                click: () => {
                    this.props.manageFilesSize();
                },
                enabled: list.length > 0 && validEntries.length > 0
            })
        );

        menu.append(
            new MenuItem({
                label: `Show latest ${MIN} files`,
                click: () => {
                    this.props.showLatestElements();
                },
                enabled: list.length > MIN
            })
        );

        menu.popup(remote.getCurrentWindow());
    }

    update(props) {
        this.props = props;
        etch.update(this);
    }
}
