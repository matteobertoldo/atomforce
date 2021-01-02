'use babel';

import elements from './entries';
import etch from 'etch';

/** @jsx etch.dom */
export default class TabFilesView {
  constructor(props) {
    this.props = props;
    etch.initialize(this);
  }

  render() {
    const list = this.props.webDAVFilesList;
    const items = list.length > 0 && !this.props.miniloader;
    const validEntries = list.filter(elements.entries);

    if (validEntries.length === 0 && !atom.config.get('atomforce.tabOptions.filesSize')) {
      this.props.showFileSize = false;
    }

    this.props.showFileSize =
      this.props.showFileSize === undefined
        ? atom.config.get('atomforce.tabOptions.filesSize')
        : this.props.showFileSize;

    return (
      <section
        className={`atomforce-tab-files-view${items ? '' : '-empty'} ${
          this.props.showFileSize ? 'show' : 'hide'
        }-files-size`}>
        {items ? (
          <div className="dwdav-pathame-items">{this.props.webDAVFilesList}</div>
        ) : (list.length === 0 || this.props.showLatestElements) && this.props.miniloader ? (
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
