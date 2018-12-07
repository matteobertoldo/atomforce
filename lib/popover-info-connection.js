'use babel';

import etch from 'etch';

/** @jsx etch.dom */
export default class PopoverInfoConnection {
    constructor (props) {
        this.props = props;
        etch.initialize(this);
    }

    render () {
        if (this.props.auth && this.props.dwFileParse.data) {
            return (
                <div class="info">
                    Currently file and cartridges are uploaded on
                    <span class="hostname highlight">{this.props.dwFileParse.data.hostname}</span>
                </div>
            );
        } else {
            return (
                <div class="info fit-content">
                    Unable to establish a connection with the Sandbox. Disable file watch and check your credentials.
                </div>
            );
        }
    }

    update (props) {
        this.props = props;
        etch.update(this);
    }
}
