'use babel';

import etch from 'etch';
import { remote } from 'electron';

/** @jsx etch.dom */
export default class TabHeader {
    constructor (props) {
        this.props = props;
        etch.initialize(this);
    }

    render () {
        return (
            <header className="atomforce-tab-header">
                <span className="icon icon-database"></span>
                <span className="hostname">Files Uploaded</span>
                <button className="button-list-count icon icon-ellipses" onClick={this.showActionsMenu}></button>
                <button className="button-list-clear icon icon-circle-slash" onClick={this.props.clearAll}>
                    Clear All
                </button>
            </header>
        );
    }

    showActionsMenu (event) {
        event.preventDefault();

        const { Menu, MenuItem } = remote;
        const menu = new Menu();

        menu.append(
            new MenuItem({
                label: `${this.props.showFileSize ? 'Hide' : 'Show'} files size`,
                click: () => {
                    this.props.manageFilesSize();
                },
                enabled: this.props.webDAVFilesList.length > 0
            })
        );

        menu.append(
            new MenuItem({
                label: 'Show latest 100 files',
                click: () => {},
                enabled: this.props.webDAVFilesList.length > 100
            })
        );

        menu.append(
            new MenuItem({
                label: 'Show latest 50 files',
                click: () => {},
                enabled: this.props.webDAVFilesList.length > 50
            })
        );

        menu.popup(remote.getCurrentWindow());
    }

    update (props) {
        this.props = props;
        etch.update(this);
    }
}
