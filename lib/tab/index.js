'use babel';

import etch from 'etch';
import Init from '../utils/init';
import TabHeader from './tab-header';
import TabFilesView from './tab-files-view';

/** @jsx etch.dom */
export default class AtomforceTab {
    constructor () {
        this.props = new Init();
        etch.initialize(this);
    }

    render () {
        const rootPrepare = this.props.dwFileExists && this.props.dwFileParse.parse && this.props.rootDirectories === 1;

        return (
            <div className={`atomforce-tab${rootPrepare ? '' : '-empty'}`}>
                {rootPrepare ? (
                    this.props.loader ? (
                        <div className="atomforce-tab-components loading">
                            <div className="loader loading-spinner-large"></div>
                        </div>
                    ) : (
                        <div className="atomforce-tab-components">
                            <TabHeader {...this.props} />
                            <TabFilesView {...this.props} />
                        </div>
                    )
                ) : (
                    <div className="atomforce-dwdav-empty">
                        <h1 className="title">No data preview available</h1>
                        <span>Upload your files on Sandbox for view details.</span>
                    </div>
                )}
            </div>
        );
    }

    getAllowedLocations () {
        return ['center', 'right'];
    }

    async getData (data) {
        this.update({
            ...this.props,
            ...{
                dwdav: data
            }
        });
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
