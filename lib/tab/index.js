'use babel';

import etch from 'etch';
import Init from '../utils/init';
import TabHeader from './tab-header';
import TabFileComponent from './tab-file-component';
import TabFilesView from './tab-files-view';
import TabFooter from './tab-footer';

/** @jsx etch.dom */
export default class AtomforceTab {
    constructor() {
        this.props = new Init();
        this.uri = 'atom://atomforce-tab';
        etch.initialize(this);
    }

    render() {
        return (
            <div className={`atomforce-tab${this.props.auth ? '' : '-empty'}`}>
                {this.props.loader ? (
                    <div className="atomforce-tab-components loading">
                        <div className="loader loading-spinner-large" />
                    </div>
                ) : this.props.auth ? (
                    <div className="atomforce-tab-components">
                        <TabHeader
                            {...this.props}
                            clearAll={() => this.clearAll()}
                            manageFilesSize={() => this.manageFilesSize()}
                        />
                        <TabFilesView {...this.props} />
                        <TabFooter {...this.props} />
                    </div>
                ) : (
                    <div className="atomforce-dwdav-empty">
                        <h1 className="title">No data preview available</h1>
                        <span>Upload your files on Sandbox for view details.</span>
                    </div>
                )}
            </div>
        );
    }

    async clearAll() {
        const promise = new Promise(resolve => {
            setTimeout(() => resolve((this.props.miniloader = false)), 425);
        });

        this.props.webDAVFilesList = [];
        this.update(this.props);
        await promise;
        this.update(this.props);
    }

    getAllowedLocations() {
        return ['center', 'right'];
    }

    getData(props) {
        this.props.webDAVFilesList.unshift(<TabFileComponent {...{ webDAVData: props }} />);
        this.update(this.props);
    }

    getDefaultLocation() {
        return 'right';
    }

    getElement() {
        return this.element;
    }

    getIconName() {
        return 'cloud-upload';
    }

    getPreferredWidth() {
        return 400;
    }

    getTitle() {
        return 'Atomforce';
    }

    getURI() {
        return this.uri;
    }

    manageFilesSize() {
        if (this.props.showFileSize) {
            this.props.showFileSize = false;
        } else {
            this.props.showFileSize = true;
        }

        this.update(this.props);
    }

    toggleURI() {
        atom.workspace.toggle(this.uri);
    }

    update(props) {
        this.props = props;
        etch.update(this);
    }

    destroy() {
        const pane = atom.workspace.paneForURI(this.uri);
        if (!pane) return;
        pane.destroyItem(this);
    }
}
