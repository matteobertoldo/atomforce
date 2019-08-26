'use babel';

import etch from 'etch';
import PopoverSwitcher from './popover-switcher';

/** @jsx etch.dom */
export default class PopoverHeader {
    constructor (props) {
        this.props = props;
        etch.initialize(this);
    }

    render () {
        return (
            <div className="atomforce-popover-header">
                <div className="atomforce-icon-cloud">
                    <div className="icon-cloud" />
                    <span className="input-label">
                        Watching files is{' '}
                        <span id="watch-state" className="watch-state">
                            {this.props.watchState}
                        </span>
                    </span>
                </div>
                <div className="atomforce-render-watch">
                    <PopoverSwitcher {...this.props} />
                </div>
            </div>
        );
    }

    update (props) {
        this.props = props;
        etch.update(this);
    }
}
