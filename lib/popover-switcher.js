'use babel';

import etch from 'etch';

/** @jsx etch.dom */
export default class PopoverSwitcher {
    constructor (props) {
        this.props = props;
        etch.initialize(this);
    }

    render () {
        if (this.props.dwFileExists && this.props.dwFileParse.parse && this.props.rootDirectories === 1) {
            return (
                <label class="input-label">
                    <input class="input-toggle" type="checkbox" />
                </label>
            );
        } else {
            return (
                <label class="input-label">
                    <input class="input-toggle" type="checkbox" disabled />
                </label>
            );
        }
    }

    async update (props) {
        this.props = props;
        etch.update(this);
    }
}
