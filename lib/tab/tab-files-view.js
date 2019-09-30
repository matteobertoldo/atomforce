'use babel';

import etch from 'etch';

/** @jsx etch.dom */
export default class TabFilesView {
    constructor (props) {
        this.props = props;
        etch.initialize(this);
    }

    render () {
        return (
            <section className={`atomforce-tab-files-view${this.props.dwdav ? '' : '-empty'}`}>
                {this.props.dwdav ? (
                    <div className="dwdav-pathame-items">
                        <span
                            className={`icon icon-file${
                                !this.props.dwdav.isFile && this.props.dwdav.extension === '' ? '-directory' : ''
                            } status-${this.status(this.props.dwdav)}`}></span>
                        <span className="pathame">{this.props.dwdav.path}</span>
                    </div>
                ) : (
                    <div className="dwdav-pathame-items-empty">
                        <em>No data view</em>
                    </div>
                )}
            </section>
        );
    }

    status (props) {
        let status;

        if (props.event === 'add') {
            status = 'added';
        } else if (props.event === 'change') {
            status = 'modified';
        } else if (props.event === 'unlink' || props.event === 'unlinkDir') {
            status = 'removed';
        }

        return status;
    }

    update (props) {
        this.props = props;
        etch.update(this);
    }
}
