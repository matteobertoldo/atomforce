'use babel';

import etch from 'etch';

/** @jsx etch.dom */
export default class AtomforceTab {
    constructor () {
        this.props = {};
        etch.initialize(this);
    }

    render () {
        if (!sessionStorage.getItem('dwdav') && !this.props.auth) {
            return (
                <div className="atomforce-tab-empty">
                    <div className="atomforce-dwdav-empty">
                        <h1 className="title">No data preview available</h1>
                        <span>Upload your files on Sandbox for view details.</span>
                    </div>
                </div>
            );
        } else {
            return <div className="atomforce-tab" />;
        }
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
