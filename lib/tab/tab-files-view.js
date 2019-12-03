'use babel';

import etch from 'etch';

/** @jsx etch.dom */
export default class TabFilesView {
    constructor(props) {
        this.props = props;
        etch.initialize(this);
    }

    render() {
        return (
            <section
                className={`atomforce-tab-files-view${this.props.webDAVFilesList.length !== 0 ? '' : '-empty'} ${
                    this.props.showFileSize ? 'show' : 'hide'
                }-files-size`}>
                {this.props.webDAVFilesList.length !== 0 ? (
                    <div className="dwdav-pathame-items">{this.props.webDAVFilesList}</div>
                ) : this.props.webDAVFilesList.length === 0 && this.props.miniloader ? (
                    <div className="loader loading-spinner-tiny" />
                ) : (
                    <div className="dwdav-pathame-items-empty">
                        <em>No data view</em>
                    </div>
                )}
            </section>
        );
    }

    update(props) {
        this.props = props;
        etch.update(this);
    }
}
