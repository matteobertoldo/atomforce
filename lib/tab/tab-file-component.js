'use babel';

import etch from 'etch';

/** @jsx etch.dom */
export default class TabFileComponent {
  constructor(props) {
    this.props = props;
    etch.initialize(this);
  }

  render() {
    return (
      <div
        attributes={{
          ...{
            class: `dwdav-pathame-item status-${this.props.webDAVData.uploaded ? 'uploaded' : 'not-uploaded'}`
          },
          ...(this.props.webDAVData.size &&
            this.props.webDAVData.uploaded && { 'data-file-size': this.props.webDAVData.size })
        }}>
        <span
          className={`icon icon-${this.props.webDAVData.uploaded ? 'file' : 'issue-opened'}${
            this.props.webDAVData.uploaded && this.props.webDAVData.extension === '' && !this.props.webDAVData.isFile
              ? '-directory'
              : ''
          } status-${this._status(this.props.webDAVData)}`}
        />
        <span className="pathame" title={this.props.webDAVData.path}>
          {this.props.webDAVData.path}
        </span>
        <time className="webdav-data-timestamp text-subtle">{this.props.webDAVData.timestamp}</time>
      </div>
    );
  }

  _status(props) {
    let status;

    if (props.uploaded) {
      if (props.event === 'add') {
        status = 'added';
      } else if (props.event === 'change') {
        status = 'modified';
      } else if (props.event === 'unlink' || props.event === 'unlinkDir') {
        status = 'removed';
      }
    } else {
      status = 'removed';
    }

    return status;
  }

  update(props) {
    this.props = props;
    etch.update(this);
  }
}
