'use babel';

import etch from 'etch';

/** @jsx etch.dom */
export default class Button {
  constructor(props) {
    this.props = props;
    etch.initialize(this);
  }

  render() {
    if (this.props.type === 'reload') {
      return (
        <div>
          <button className="btn btn-sm" onClick={this.props.click}>
            Reload Atomforce
          </button>
        </div>
      );
    } else {
      return (
        <span>
          {' '}
          Read{' '}
          <a className="underline" href="https://github.com/matteobertoldo/atomforce#dwjson">
            this step
          </a>{' '}
          to configure one correctly.
        </span>
      );
    }
  }

  update() {
    return etch.update(this);
  }
}
