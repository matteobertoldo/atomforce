'use babel';

import etch from 'etch';
import PopoverSwitcher from './popover-switcher'; // eslint-disable-line no-unused-vars

/** @jsx etch.dom */
export default class PopoverHeader {
    constructor (props) {
        this.props = props;
        etch.initialize(this);
    }

    render () {
        return (
            <div class="atomforce-popover-header">
                <div class="atomforce-icon-cloud">
                    <div class="icon-cloud"></div>
                    <span class="input-label">
                        Watching files is <span class="watch-state">disabled</span>
                    </span>
                </div>
                <div class="atomforce-render-watch">
                    <PopoverSwitcher {...this.props} />
                </div>
            </div>
        );
    }

    async update (props) {
        this.props = props;
        etch.update(this);
    }
}
