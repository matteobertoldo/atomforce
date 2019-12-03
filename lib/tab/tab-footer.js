'use babel';

import etch from 'etch';

/** @jsx etch.dom */
export default class TabFooter {
    constructor(props) {
        this.props = props;
        etch.initialize(this);
    }

    render() {
        const version = this.props.dwFileParse.data.version || this.props.dwFileParse.data['code-version'];
        return (
            <div className="atomforce-tab-footer">
                <div className="tab-footer-row">
                    <span className="icon icon-person" title={`Last login on: ${this.props.authTimestamp}`} />
                    <span className="label">Username:</span>
                    <span className="value" title={this.props.dwFileParse.data.username}>
                        {this.props.dwFileParse.data.username}
                    </span>
                </div>
                <div className="tab-footer-row">
                    <span className="icon icon-versions" />
                    <span className="label">Code Version:</span>
                    <span className="value" title={version}>
                        {version}
                    </span>
                </div>
            </div>
        );
    }

    update(props) {
        this.props = props;
        etch.update(this);
    }
}
