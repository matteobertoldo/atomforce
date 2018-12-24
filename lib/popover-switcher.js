'use babel';

import etch from 'etch';

/** @jsx etch.dom */
export default class PopoverSwitcher {
    constructor (props) {
        this.props = props;
        etch.initialize(this);
    }

    render () {
        if (this.props.await) {
            return (
                <label class="input-label">
                    <input id="atomforce-toggle" class="input-toggle" type="checkbox" disabled />
                </label>
            );
        } else if (this.props.dwFileExists && this.props.dwFileParse.parse && this.props.rootDirectories === 1) {
            return (
                <label class="input-label">
                    <input id="atomforce-toggle" class="input-toggle" type="checkbox" onChange={this.props.click} />
                </label>
            );
        } else {
            return (
                <label class="input-label">
                    <input id="atomforce-toggle" class="input-toggle" type="checkbox" checked={false} disabled />
                </label>
            );
        }
    }

    update (props) {
        this.props = props;
        etch.update(this);
    }
}
