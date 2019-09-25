'use babel';

import etch from 'etch';
import PopoverComponents from '../popover/';
import TabHeader from './tab-header';

/** @jsx etch.dom */
export default class AtomforceTab {
    constructor () {
        this.popover = new PopoverComponents();
        this.props = this.popover.props;
        etch.initialize(this);
    }

    render () {
        if (!sessionStorage.getItem('dwdav')) {
            return <div className="atomforce-tab">{this.emptyView()}</div>;
        } else {
            const rootPrepare =
                this.props.dwFileExists && this.props.dwFileParse.parse && this.props.rootDirectories === 1;
            const className = rootPrepare ? 'atomforce-tab' : 'atomforce-tab-empty';

            return <div className={className}>{rootPrepare ? <TabHeader {...this.props} /> : this.emptyView()}</div>;
        }
    }

    emptyView () {
        return (
            <div className="atomforce-dwdav-empty">
                <h1 className="title">No data preview available</h1>
                <span>Upload your files on Sandbox for view details.</span>
            </div>
        );
    }

    getAllowedLocations () {
        return ['center', 'right'];
    }

    getDefaultLocation () {
        return 'right';
    }

    getElement () {
        return this.element;
    }

    getIconName () {
        return 'cloud-upload';
    }

    getPreferredWidth () {
        return 400;
    }

    getTitle () {
        return 'Atomforce';
    }

    getURI () {
        return 'atom://atomforce-tab';
    }

    update (props) {
        this.props = props;
        etch.update(this);
    }

    destroy () {}
}
