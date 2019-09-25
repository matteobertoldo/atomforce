'use babel';

import etch from 'etch';

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
                <span className="hostname">{this.props.dwFileParse.data.hostname}</span>
                <button className="button-list-count icon icon-ellipses"></button>
                <button className="button-list-clear icon icon-circle-slash">Clear All</button>
            </header>
        );
    }

    update (props) {
        this.props = props;
        etch.update(this);
    }
}
