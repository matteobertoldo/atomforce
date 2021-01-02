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
    this.minFilesToShow = 20;
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
              clearAll={() => this._clearAll()}
              manageFilesSize={() => this._manageFilesSize()}
              minFilesToShow={this.minFilesToShow}
              showLatestElements={() => this._showLatestElements()}
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

  getAllowedLocations() {
    return ['center', 'right'];
  }

  getData(props) {
    const component = <TabFileComponent {...{ webDAVData: props }} />;
    const list = this.props.webDAVFilesList;

    if (list.length >= props.indexes) list.pop();
    list.unshift(component);
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

  toggleURI() {
    atom.workspace.toggle(this.uri);
  }

  _manageFilesSize() {
    return (
      this.props.showFileSize ? (this.props.showFileSize = false) : (this.props.showFileSize = true),
      this.update(this.props)
    );
  }

  async _showLatestElements() {
    this.props.miniloader = true;
    this.props.showLatestElements = true;
    this.update(this.props);

    await this._miniloader(this.props);
    this.props.webDAVFilesList.length = this.minFilesToShow;
    this.update(this.props);
  }

  async _clearAll() {
    const list = this.props.webDAVFilesList;
    if (list.length === 0) return;

    list.length = 0;
    this.props.miniloader = true;
    this.props.showFileSize = atom.config.get('atomforce.tabOptions.filesSize');
    this.update(this.props);

    await this._miniloader(this.props);
    this.update(this.props);
  }

  _miniloader(props) {
    return new Promise((resolve) => {
      setTimeout(() => resolve((props.miniloader = false)), 425);
    });
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
