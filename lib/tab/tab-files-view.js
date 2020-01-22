'use babel';

import etch from 'etch';

/** @jsx etch.dom */
export default class TabFilesView {
    constructor(props) {
        this.props = props;
        etch.initialize(this);
    }

    render() {
        const list = this.props.webDAVFilesList.length;
        const items = list > 0 && !this.props.miniloader;

        return (
            <section
                className={`atomforce-tab-files-view${items ? '' : '-empty'} ${
                    this.props.showFileSize ? 'show' : 'hide'
                }-files-size`}>
                {items ? (
                    <div className="dwdav-pathame-items">{this.props.webDAVFilesList}</div>
                ) : (list === 0 || this.props.showLatestElements) && this.props.miniloader ? (
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
