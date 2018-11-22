'use babel';

import etch from 'etch';

/** @jsx etch.dom */
export default class Button {
    constructor (props) {
        this.props = props;
        etch.initialize(this);
    }

    render () {
        if (this.props.type === 'reload') {
            return (
                <div>
                    <button class="btn btn-sm" onClick={this.props.click}>Reload Atomforce</button>
                </div>
            );
        } else {
            return (
                <span> Read <button class="underline" onClick={() => this.openSettings()}>this step</button> to configure one correctly.</span>
            );
        }
    }

    openSettings () {
        return atom.workspace.open('atom://config/packages/atomforce/');
    }

    update () {
        return etch.update(this);
    }
}
