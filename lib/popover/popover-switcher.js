'use babel';

import etch from 'etch';

/** @jsx etch.dom */
export default class PopoverSwitcher {
    constructor(props) {
        this.props = props;
        etch.initialize(this);
    }

    render() {
        return (
            <label className="input-label">
                {this.props.await ? (
                    <input id="atomforce-toggle" className="input-toggle" type="checkbox" checked={true} disabled />
                ) : this.props.dwFileExists && this.props.dwFileParse.parse && this.props.rootDirectories === 1 ? (
                    <input
                        id="atomforce-toggle"
                        className="input-toggle"
                        type="checkbox"
                        checked={this.props.auth}
                        disabled={this.props.cartridges}
                        onChange={this.props.cartridges ? undefined : this.props.click}
                    />
                ) : (
                    <input
                        id="atomforce-toggle"
                        className="input-toggle"
                        type="checkbox"
                        checked={false || null}
                        disabled
                    />
                )}
            </label>
        );
    }

    update(props) {
        this.props = props;
        etch.update(this);
    }
}
