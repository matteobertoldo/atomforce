'use babel';

import { tab } from './';
import etch from 'etch';

/** @jsx etch.dom */
export default class PopoverInfoConnection {
  constructor(props) {
    this.props = props;
    etch.initialize(this);
  }

  render() {
    if (this.props.cartridgeserr) {
      return (
        <div className="info fit-content">
          Failed to upload cartridges on <br />{' '}
          <span className="text-highlight ellipsis" title={this.props.dwFileParse.data.hostname}>
            {this.props.dwFileParse.data.hostname}
          </span>
          <br />
          One or more cartridges have not been fully uploaded.
        </div>
      );
    } else if (this.props.cartridges) {
      return (
        <div className="info">
          Uploading cartridges in progress on <br />{' '}
          <span className="text-highlight ellipsis" title={this.props.dwFileParse.data.hostname}>
            {this.props.dwFileParse.data.hostname}
          </span>
          {this.props.progress !== 0 ? (
            <progress
              className="atomforce-ui-progressbar"
              id="atomforce-ui-progressbar"
              value={this.props.progress}
              max="100"
            />
          ) : (
            <progress className="atomforce-ui-progressbar" id="atomforce-ui-progressbar" max="100" />
          )}
        </div>
      );
    } else if (this.props.auth && this.props.dwFileParse.data) {
      return (
        <div className="info">
          Currently file and cartridges are uploaded on{' '}
          <span className="hostname" onClick={() => this.toggleTab()}>
            <span className="name highlight" title={this.props.dwFileParse.data.hostname}>
              {this.props.dwFileParse.data.hostname}
            </span>
          </span>
        </div>
      );
    } else {
      return (
        <div className="info fit-content">
          Unable to establish a connection with the Sandbox. Check your credentials on{' '}
          <span className="text-highlight">dw.json</span> file.
        </div>
      );
    }
  }

  toggleTab() {
    return tab.toggleURI();
  }

  update(props) {
    this.props = props;
    etch.update(this);
  }
}
